import router from './router.js';

/**
 * Finds the correct route for a given view, builds a loading view, fetches data and builds the final rendered view.
 * @param URI
 */
export default function createView(URI) {

    let route = router(URI);

    // Store the title because the loading screen render overwrites it.
    let currentTitle = document.title;

    // if route is invalid, return a 404 page
    if (!route) {
        render(null, router('/error'));
        return;
    }

    // change view to loading screen
    render(null, router('/loading'));

    let request = {
        headers: getHeaders() // this is using the the getHeaders in auth.js
    }
    fetchData(route.state, request).then((props) => {
        document.title = currentTitle;
        app.innerHTML = ``
        history.pushState({...props, lastUri: route.uri }, null, route.uri)
        render(props, route);
    });
}

// When the user hits back in the browser, get the last uri from history and render it (w/ props)
window.addEventListener('popstate', (e) => {
    if (e?.state?.lastUri) {
        console.log(`Back to ${e.state.lastUri}!`)
        const { lastUri, ...props } = e.state
        render(props, router(lastUri))
    }
});
