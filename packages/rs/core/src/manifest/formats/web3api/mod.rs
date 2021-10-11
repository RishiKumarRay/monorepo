pub mod migrate;
pub mod migrators;
pub mod prealpha_001_1;
pub mod prealpha_001_2;
pub mod prealpha_001_3;
pub mod prealpha_001_4;
pub mod prealpha_001_5;

pub use prealpha_001_1::Web3ApiManifest as Web3ApiManifest001Prealpha1;
pub use prealpha_001_2::Web3ApiManifest as Web3ApiManifest001Prealpha2;
pub use prealpha_001_3::Web3ApiManifest as Web3ApiManifest001Prealpha3;
pub use prealpha_001_4::Web3ApiManifest as Web3ApiManifest001Prealpha4;
pub use prealpha_001_5::Web3ApiManifest as Web3ApiManifest001Prealpha5;

pub type Web3ApiManifest = Web3ApiManifest001Prealpha5;

pub const LATEST_WEB3_API_MANIFEST_FORMAT: Web3ApiManifestFormats =
    Web3ApiManifestFormats::Prealpha001_5("0.0.1-prealpha.5");

#[derive(Copy, Clone, Debug, PartialEq)]
pub enum Web3ApiManifestFormats {
    Prealpha001_1(&'static str),
    Prealpha001_2(&'static str),
    Prealpha001_3(&'static str),
    Prealpha001_4(&'static str),
    Prealpha001_5(&'static str),
}

pub struct AnyWeb3ApiManifest {
    pub __type: String,
    pub format: Web3ApiManifestFormats,
    pub language: String,
    pub interface: bool,
    pub description: Option<String>,
    pub repository: Option<String>,
    pub mutation: Option<Mutation>,
    pub query: Option<Query>,
    pub module: Option<Module>,
    pub build: Option<String>,
    pub meta: Option<String>,
    pub modules: Option<Modules>,
    pub import_redirects: Option<Vec<ImportRedirects>>,
}

#[derive(Clone, Debug)]
pub struct Modules {
    pub mutation: Option<Mutation>,
    pub query: Option<Query>,
}

impl Default for Modules {
    fn default() -> Modules {
        Modules {
            mutation: None,
            query: None,
        }
    }
}

#[derive(Clone, Debug)]
pub struct Mutation {
    pub schema: Schema,
    pub module: Module,
}

#[derive(Clone, Debug)]
pub struct Query {
    pub schema: Schema,
    pub module: Module,
}

#[derive(Clone, Debug)]
pub struct Module {
    pub language: String,
    pub file: String,
}

#[derive(Clone, Debug)]
pub struct Schema {
    pub file: String,
}

#[derive(Clone, Debug)]
pub struct ImportRedirects {
    pub uri: String,
    pub schema: String,
}
