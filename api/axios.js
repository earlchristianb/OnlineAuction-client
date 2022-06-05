/** @format */

import axios from "axios";

const API = axios.create({
	baseURL: "http://localhost:4000/api/v1/",
});

API.interceptors.request.use((req) => {
	if (sessionStorage.getItem("token")) {
		req.headers.authorization = `Bearer ${JSON.parse(
			sessionStorage.getItem("token")
		)}`;
	}
	return req;
});

export default API;
