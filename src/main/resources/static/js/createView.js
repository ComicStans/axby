import render from './render.js';
import router from './router.js';
import fetchData from "./fetchData.js";
import {getHeaders} from "./auth.js";

/**
 * Finds the correct route for a given view, builds a loading view, fetches data and builds the final rendered view.
 * @param URI
 */
export default function createView(URI) {
    const app = document.querySelector('#app');

    let route = router(URI);
    let currentTitle = document.title;
    if (!route) {
        render(null, router('/error'));
        return;
    }

    render(null, router('/Loading'));

    let request = {
        headers: getHeaders()
    }
    fetchData(route.state, request).then((props) => {
        document.title = currentTitle;
        app.innerHTML = ``
        history.pushState({...props, lastUri: route.uri }, null, route.uri)
        render(props, route);
    });
}

window.addEventListener('popstate', (e) => {
    if (e?.state?.lastUri) {
        console.log(`Back to ${e.state.lastUri}!`)
        const { lastUri, ...props } = e.state
        render(props, router(lastUri))
    }
});
