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
workbox.routing.registerRoute(
    'http://localhost:3001/api/v1/boggle/board',
    workbox.strategies.networkFirst({
        cacheName: 'json-data'

    })
)
// workbox.routing.registerRoute(
//     new RegExp('http://localhost:3001/api/v1/boggle/board\.json'),
//     workbox.strategies.networkFirst({
//         cacheName: 'json-data'
//     })
//   )
self.addEventListener('install', event => {

    console.log("install.");
})

self.addEventListener('activate', event => {
    console.log("activate");
})
workbox.precaching.precacheAndRoute(self.__precacheManifest || [])
