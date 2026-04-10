import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type Method,
} from "axios";

const DEFAULT_TIMEOUT = 20_000;
const EXTERNAL_BASE_URL = process.env.NEXT_PUBLIC_URL_EXTERNAL?.trim();

type HeaderMap = Record<string, string>;

const defaultJsonHeaders: HeaderMap = {
  "content-type": "application/json;charset=UTF-8",
};

function mergeHeaders(
  defaults: HeaderMap,
  headers?: HeaderMap | null,
): HeaderMap {
  // Gop header mac dinh va header truyen vao, uu tien gia tri do caller cung cap.
  return {
    ...defaults,
    ...(headers ?? {}),
  };
}

// Ham request nen dung chung cho tat ca wrapper API de tranh lap cau hinh axios.
function request(
  endpoint: string,
  method: Method = "GET",
  data?: unknown,
  headers?: HeaderMap,
  config: AxiosRequestConfig = {},
): Promise<AxiosResponse> {
  return axios({
    baseURL: EXTERNAL_BASE_URL || undefined,
    url: endpoint,
    method,
    data,
    headers,
    timeout: DEFAULT_TIMEOUT,
    ...config,
  });
}

// Goi API JSON thong dung, du lieu body giu nguyen de axios tu serialize.
function callApiJson(
  endpoint: string,
  method: Method = "GET",
  body?: unknown,
  headers: HeaderMap | null = null,
  config: AxiosRequestConfig = {},
): Promise<AxiosResponse> {
  return request(
    endpoint,
    method,
    body,
    mergeHeaders(defaultJsonHeaders, headers),
    config,
  );
}

const apiCaller = {
  callApiJson,
};

export default apiCaller;
