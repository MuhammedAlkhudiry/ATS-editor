'use strict';

// TODO: dl
let isBackEnd = false;

const axios = require('axios');

/* ------------------------------ config axios ------------------------------ */
axios.defaults.baseURL = 'http://localhost:5000';
/* -------------------------------------------------------------------------- */

if (isBackEnd) {   
    document.body.addEventListener('keydown', function (e) {
        let words = editor.getText();
        if ([' ', 'Backspace'].includes(e.key)) {
    
            axios.get(`/words/${words}`)
                .then(function (response) {
                    document.getElementById('word-number').innerText = response.data;
                })
                .catch(function (error) {
                    // TODO: dl for debugging..
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                });
        }
    })
}