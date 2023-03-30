const PREFIX = '/opai/'
export default async (request: Request):Promise<Response> => {

    let response = null;
    let method = request.method;


    let url = new URL(request.url);
    let url_hostname = url.hostname;
    url.protocol = 'https:';
    url.host = 'api.openai.com';


    let request_headers = request.headers;
    let new_request_headers = new Headers(request_headers);
    new_request_headers.set('Host', url.host);
    new_request_headers.set('Referer', url.protocol + '//' + url_hostname);

   
    let original_response = await fetch(url.origin+url.href.substring(url.origin.length+ PREFIX.length)    , {
        method: method,
        headers: new_request_headers,
        body: request.body
    })
  

    let original_response_clone = original_response.clone();
    let original_text = null;
    let response_headers = original_response.headers;
    let new_response_headers = new Headers(response_headers);
    let status = original_response.status;

    new_response_headers.set('Cache-Control', 'no-store');
    new_response_headers.set('access-control-allow-origin', '*');
    new_response_headers.set('access-control-allow-credentials', true);
    new_response_headers.delete('content-security-policy');
    new_response_headers.delete('content-security-policy-report-only');
    new_response_headers.delete('clear-site-data');

    original_text = original_response_clone.body
    response = new Response(original_text, {
        status,
        headers: new_response_headers
    })

    return response

}

export const config = { path: "/opai**" }
