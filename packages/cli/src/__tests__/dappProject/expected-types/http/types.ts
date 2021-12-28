// NOTE: This is generated by 'w3 codegen', DO NOT MODIFY

export type UInt = number;
export type UInt8 = number;
export type UInt16 = number;
export type UInt32 = number;
export type Int = number;
export type Int8 = number;
export type Int16 = number;
export type Int32 = number;
export type Bytes = Uint8Array;
export type BigInt = string;
export type Json = string;
export type String = string;
export type Boolean = boolean;

export interface Header {
  key: String;
  value: String;
}

export interface UrlParam {
  key: String;
  value: String;
}

export interface Response {
  status: Int;
  statusText: String;
  headers?: Array<Header> | null;
  body?: String | null;
}

export interface Request {
  headers?: Array<Header> | null;
  urlParams?: Array<UrlParam> | null;
  responseType: ResponseType;
  body?: String | null;
}

export enum ResponseTypeEnum {
  TEXT,
  BINARY,
}

export type ResponseTypeString =
  | "TEXT"
  | "BINARY"

export type ResponseType = ResponseTypeEnum | ResponseTypeString;

/// Imported Objects START ///

/// Imported Objects END ///
