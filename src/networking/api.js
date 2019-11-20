import axios from "axios";
 import cookies from "browser-cookies";

class Api {
    constructor() {
        let baseURL = "https://paw-trello-backend.herokuapp.com"
        this.adapter = axios.create({
            baseURL
        })
    }

    //returns object with data
    request = async ({url, method = "get", body, headers = {}}) => {
        try {
             const accessToken = cookies.get("accessToken"); //for auth and sessions
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';
            // headers['Authorization'] = 'Bearer 33mnk8wG+qSMexFwaftbgA==';
            const request = {
                url,
                method,
                data: body,
               // headers: headers,
                 headers: {Authorization: `Bearer ${accessToken}`, ...headers},// for auth
            };
            const response = await this.adapter
                .request(request)
                .catch(err => this.handleError(err, request));
            return Promise.resolve(response.data);
        } catch (err) {
            return Promise.reject(err);
        }
    };
    requestLogin = async ({url, method = "post", body, headers = {}}) => {
        try {
            // const accessToken = cookies.get("accessToken"); for auth and sessions
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';
            // headers['Authorization'] = 'Bearer 33mnk8wG+qSMexFwaftbgA==';
            const request = {
                url,
                method,
                data: body,
                headers: headers,
                // headers: {Authorization: `Bearer ${accessToken}`, ...headers}, for auth
            };
            const response = await this.adapter
                .request(request)
                .catch(err => this.handleError(err, request));
            return Promise.resolve(response.data);
        } catch (err) {
            return Promise.reject(err);
        }
    };

    handleError = async (err, request) => {
        return Promise.reject(err);
        //for auth
        // const oldAccess = cookies.get("accessToken");
        // const oldRefresh = cookies.get("refreshToken");

        // if (err.response && err.response.status === 401) {
        //     const {
        //         data: {token, refreshToken},
        //     } = await this.adapter.request({
        //         url: "/account/refresh",
        //         method: "post",
        //         data: {token: oldAccess, refreshToken: oldRefresh},
        //     });

        //     cookies.set("accessToken", token, 365);
        //     cookies.set("refreshToken", refreshToken, 365);

        //     return this.adapter.request({
        //         ...request,
        //         headers: {...request.headers, Authorization: `Bearer ${token}`},
        //     });
        // } else {
        //     return Promise.reject(err);
        // }
    };
}

export default new Api();