const baseUrl = process.env.MAL_API_URL;
const apiKey = process.env.MAL_API_KEY;

interface RequestConfig extends RequestInit {
  endpoint: string;
  query?: Record<string, string | number | string[] | undefined>;
}

export async function apiClient<T>({
  endpoint,
  query = {},
  body,
  ...customConfig
}: RequestConfig) {
  if (endpoint.startsWith("/")) {
    endpoint = endpoint.substring(1);
  }
  const url = new URL(endpoint, baseUrl);
  for (const [key, value] of Object.entries(query)) {
    if (value) {
      url.searchParams.set(key, value.toString());
    }
  }
  const headers = {
    "Content-Type": "application/json",
    "X-MAL-CLIENT-ID": apiKey,
  };

  const config: RequestInit = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url.toString(), config);

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  const data: T = await response.json();

  return data;
}
