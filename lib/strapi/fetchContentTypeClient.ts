import qs from "qs";

const STRAPI_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.STRAPI_API_URL || "http://localhost:1337";
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || process.env.STRAPI_API_TOKEN;

export default async function fetchContentTypeClient(
  contentType: string,
  params: Record<string, unknown> = {},
  token?: string
): Promise<any> {
  try {
    const queryString = qs.stringify(params, {
      encodeValuesOnly: true
    });
    const url = `${STRAPI_BASE}/api/${contentType}${queryString ? `?${queryString}` : ""}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    const useToken = token ?? API_TOKEN;
    if (useToken) {
      headers["Authorization"] = `Bearer ${useToken}`;
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Strapi fetch error ${response.status}: ${text}`);
    }
    return response.json();
  } catch (error) {
    console.error('FetchContentTypeError', error);
    return null;
  }
}
