export const fetchService = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method) {
    return (url, body = null, multipart = false) => {
        const requestOptions = {
            method,
            mode: "cors",
            credentials: 'include'
        };
        if (body) {
            if (multipart) {
                let formData = new FormData();
                for(const name in body) {
                    formData.append(name, body[name]);
                }
                requestOptions.body = formData;
            } else {
                requestOptions.headers['Content-Type'] = 'application/json';
                requestOptions.body = JSON.stringify(body);
            }
        }
        return fetch(url, requestOptions).then(handleResponse);
    }
}

// helper functions

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}