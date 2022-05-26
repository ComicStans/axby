import createView from "../createView.js";

export default function logout(props) {
    console.log("Logging out...");
    return "";
}

export function logoutEvents() {
    console.log("Calling Logout Events...");
    window.sessionStorage.removeItem("access_token");
    window.sessionStorage.removeItem("refresh_token");
    createView("/login");
}