import axios from 'axios';

const REQUEST_TIMEOUT = 10000;

export async function restCall(url, method = 'GET', params = {}, body = '', timeout) {
    
    try {
        const response = await restCallWithFullResponse(url, method, params, body, timeout);
        return response.data;
    } catch(e) {
        return null;
    }
    
}

function restCallWithFullResponse(url, method = 'GET', params = {}, body = '', timeout = REQUEST_TIMEOUT, responseType = '') {
    
    return axios({ method, url, params, data: body, timeout, responseType });
}