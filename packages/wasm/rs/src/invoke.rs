use crate::malloc::malloc;

#[link(wasm_import_module = "w3")]
extern "C" {
    /// Get Invoke Arguments
    #[link_name = "__w3_invoke_args"]
    pub fn __w3_invoke_args(method_ptr: u32, args_ptr: u32);

    /// Set Invoke Result
    #[link_name = "__w3_invoke_result"]
    pub fn __w3_invoke_result(ptr: u32, len: u32);

    /// Set Invoke Error
    #[link_name = "__w3_invoke_error"]
    pub fn __w3_invoke_error(ptr: u32, len: u32);
}

/// Keep track of all invokable functions
pub type InvokeFunction = fn(args_buf: &[u8]) -> Vec<u8>;

pub struct InvokeArgs {
    pub method: String,
    pub args: Vec<u8>,
}

/// Helper for fetching invoke args
pub fn w3_invoke_args(method_size: u32, args_size: u32) -> InvokeArgs {
    let method_size_ptr = malloc(method_size);
    let args_size_ptr = malloc(args_size);

    unsafe { __w3_invoke_args(method_size_ptr as u32, args_size_ptr as u32) };

    let method = unsafe {
        let res = std::slice::from_raw_parts(method_size_ptr, method_size as usize);
        String::from_utf8_lossy(res).to_string()
    };
    let args = unsafe {
        let res = std::slice::from_raw_parts(args_size_ptr, args_size as usize);
        res.to_vec()
    };

    InvokeArgs { method, args }
}

/// Helper for handling `_w3_invoke`
pub fn w3_invoke(args: InvokeArgs, opt_invoke_func: Option<InvokeFunction>) -> bool {
    match opt_invoke_func {
        Some(func) => {
            let result = func(args.args.as_slice());
            let res_len = result.len() as u32;
            unsafe { __w3_invoke_result(result.as_ptr() as u32, res_len) };
            true
        }
        None => {
            let message = format!("Could not find invoke function {}", &args.method);
            let msg_len = message.len() as u32;
            unsafe { __w3_invoke_error(message.as_ptr() as u32, msg_len) };
            false
        }
    }
}
