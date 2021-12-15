self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('fxcalc-v1')
            .then(cache => cache.addAll([
                './',
                './index.html',
                './app.js',
                './icon512.png',
                './maskable-icon512.png',
                './icon192.png',
                './icon16.png',
                './fixer.json',
                './manifest.webmanifest'
            ]))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.open('fxcalc-v1').then((cache) => {
            return fetch(event.request) // erzeug eine Anfrage an das Netzwerk
                .then((response) => { // then: falls die Anfrage erfolgreich ist (online)
                    cache.put(event.request, response.clone());
                    return response;
                })
                .catch(() => cache.match(event.request)); // catch: falls die Anfrage nicht an das Netzwerk gestellt werden konnte (offline)
        })
    );
});
