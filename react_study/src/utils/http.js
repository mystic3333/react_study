const qs = require('querystring')

export function httpGet(url) {
    const result = fetch(url)
    return result
}

export function httpPost(url, params) {
    const result = fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-encoded',
            'Accept': 'application/json'
        },
        body: qs.stringify(params)
    })
}