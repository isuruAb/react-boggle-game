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
self.addEventListener('fetch',event=>{
    if(event.request.method==='POST'){
        event.respondWith(
            fetch(event.request).catch(err=>{
                return new Response(
                    JSON.stringify({error: "Your application runs on offline mode", status: 402}),{
                        headers:{'Content-type':'application/json'}
                    }
                )
            })
        )
    }
})
self.addEventListener('install', event => {

    console.log("install.");
})

self.addEventListener('activate', event => {
    console.log("activate");
})
workbox.precaching.precacheAndRoute(self.__precacheManifest || [])
