import createView from "../createView.js";

export default function logout(props) {
    console.log("Logging out...");
    return "";
}

export function logoutEvents() {
    console.log("Calling Logout Events...");
    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("refresh_token");
    createView("/login");
}