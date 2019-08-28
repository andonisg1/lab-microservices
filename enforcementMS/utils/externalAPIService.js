const fetch = require('node-fetch');

const URL = 'http://localhost:3000';

module.exports = function postJsonUrl(url, jsonData) {
    return new Promise((resolve, reject) => {
        let postRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        };
        fetch(URL+url, postRequest)
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            });
    });
};
