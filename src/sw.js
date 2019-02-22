console.log("hello from sw");

workbox.skipWaiting();
workbox.clientsClaim();
workbox.routing.registerRoute(
    new RegExp('https:.*min\.(css|js)'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'cdn-cache'
    })
)
workbox.routing.registerNavigationRoute('/index.html', {
    whitelist: [
        new RegExp('/game/')
    ]
});

self.addEventListener('install', event => {

    console.log("install.");
})

self.addEventListener('activate', event => {
    console.log("activate");
})
workbox.precaching.precacheAndRoute(self.__precacheManifest || [])
