import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import {
  getAllowedHosts,
  getContext,
  getTrustProxyHeaders,
} from '@netlify/angular-runtime/app-engine.js';

const angularApp = new AngularAppEngine({
  allowedHosts: getAllowedHosts(),
  trustProxyHeaders: getTrustProxyHeaders(),
});

export async function netlifyAppEngineHandler(
  request: Request,
): Promise<Response> {
  const incomingUrl = new URL(request.url);

  // Encaminha as chamadas da API para o backend no Render.
  if (
    incomingUrl.pathname === '/api' ||
    incomingUrl.pathname.startsWith('/api/')
  ) {
    const targetUrl = new URL(
      incomingUrl.pathname + incomingUrl.search,
      'https://campocerto.onrender.com',
    );

    const headers = new Headers(request.headers);
    headers.delete('host');
    headers.delete('content-length');
    headers.delete('transfer-encoding');

    const init: RequestInit = {
      method: request.method,
      headers,
      redirect: 'manual',
    };

    if (!['GET', 'HEAD'].includes(request.method)) {
      init.body = await request.arrayBuffer();
    }

    return fetch(targetUrl, init);
  }

  // Todas as demais requisições são atendidas pelo Angular SSR.
  const response = await angularApp.handle(request, getContext());

  return response || new Response('Not found', { status: 404 });
}

/**
 * Handler utilizado pelo Angular CLI e pela Netlify.
 */
export const reqHandler = createRequestHandler(netlifyAppEngineHandler);
