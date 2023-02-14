
const env = process.env.NODE_ENV;

let baseURL = '';

if (env == 'production') {
    baseURL = '/v2/api-docs/';
} else if (env == 'test') {
    baseURL = '/v2/api-docs/';
} else if (env == 'development') {
    baseURL = '/feapi/v2/api-docs/'
}

export default baseURL