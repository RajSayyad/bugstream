import axios from "axios";

axios.defaults.baseURL = "/";

export const setAuthHeaders = () => {
  const csrfToken = document.querySelector('[name="csrf-token"]')?.getAttribute("content");
  axios.defaults.headers.common["Accept"] = "application/json";
  axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
  // Do not set Content-Type globally, let axios set it per request (especially for multipart/form-data)
  const token = localStorage.getItem("authToken");
  const email = localStorage.getItem("authEmail");
  if (token && email) {
    axios.defaults.headers.common["X-Auth-Email"] = email;
    axios.defaults.headers.common["X-Auth-Token"] = token;
  }
};