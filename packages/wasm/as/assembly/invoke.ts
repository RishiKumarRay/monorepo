/* eslint-disable */

// Get Invoke Arguments
@external("w3", "__w3_invoke_args")
export declare function __w3_invoke_args(method_ptr: u32, args_ptr: u32): void;

// Set Invoke Result
@external("w3", "__w3_invoke_result")
export declare function __w3_invoke_result(ptr: u32, len: u32): void;

// Set Invoke Error
@external("w3", "__w3_invoke_error")
export declare function __w3_invoke_error(ptr: u32, len: u32): void;

// Keep track of all invokable functions
export type InvokeFunction = (argsBuf: ArrayBuffer) => ArrayBuffer;

export class InvokeArgs {
  constructor(
    public method: string,
    public args: ArrayBuffer
  ) { }
}

// Helper for fetching invoke args
export function w3_invoke_args(method_size: u32, args_size: u32): InvokeArgs {
  const methodBuf = new ArrayBuffer(method_size);
  const argsBuf = new ArrayBuffer(args_size);
  __w3_invoke_args(
    changetype<u32>(methodBuf),
    changetype<u32>(argsBuf)
  );
  const method = String.UTF8.decode(methodBuf);

  return new InvokeArgs(
    method,
    argsBuf
  );
}

// Helper for handling _w3_invoke
export function w3_invoke(args: InvokeArgs, fn: InvokeFunction | null): bool {
  if (fn) {
    const result = fn(args.args);
    __w3_invoke_result(
      changetype<u32>(result),
      result.byteLength
    );
    return true;
  } else {
    const message = String.UTF8.encode(
      `Could not find invoke function "${args.method}"`
    );
    __w3_invoke_error(
      changetype<u32>(message),
      message.byteLength
    );
    return false;
  }
}
