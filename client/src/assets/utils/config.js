import axios from "axios";
// =======  preparing to the deplyment  ========
const URL =
    window.location.hostname === `localhost`
        ? `http://localhost:4080` // 3030 should be replaced with your server port
        : `http://146.190.20.233`; // it should be replaced with actual domain during the deployment
// =============================================
const customInstance = axios.create({
    baseURL: URL,
    headers: { Accept: "application/json" },
});

export { URL };