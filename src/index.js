export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const targetUrl = env.TARGET_URL || 'http://localhost:4566';

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
          'Access-Control-Max-Age': '86400'
        }
      });
    }

    const upstream = new URL(request.url);
    upstream.protocol = new URL(targetUrl).protocol;
    upstream.host = new URL(targetUrl).host;
    upstream.pathname = url.pathname;
    upstream.search = url.search;

    const upstreamResponse = await fetch(upstream.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.method === 'GET' || request.method === 'HEAD' ? undefined : await request.arrayBuffer()
    });

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers: upstreamResponse.headers
    });
  }
};
