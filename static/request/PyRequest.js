'use strict';

axios.defaults.baseURL = 'http://localhost:5000';

class PyRequest {
    constructor(route, text) {
        this.text = text;
        this.route = route;
    }

    get() {
        let url = encodeURI(`/${this.route}/${this.text}`);
        return axios.get(url);
    }
}