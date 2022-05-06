import Home from "./views/Home.js";


/** Returns the rout object of specified rout based on URI
 *
 * @param URI
 * @returns {*}
 */

export default function router(URI) {
    const routes = {
        '/': {
            returnView: Home,
            state: {},
            uri: '/',
            title: 'Home'
        }
    };
    return routes[URI];
}