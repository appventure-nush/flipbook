//This is a service worker
//It handles caching and PWA


const version = "v1";
const cacheName = `cache-${version}`;

console.log(`Service worker version ${version}`);
self.addEventListener('install', function (e) {
  console.log(`Installed service worker version ${version}`);
  e.waitUntil((async () => {
    await self.skipWaiting();
    return caches.open(cacheName).then(function (cache) {
      const cacheArray = [
        "./assets/js/3dflipbook.min.js",
        "./assets/js/jquery.min.js",
        "./assets/js/html2canvas.min.js",
        "./assets/js/pdf.min.js",
        "./assets/js/pdf.worker.js",
        "./assets/js/three.min.js",
        "./assets/js/remap.js",
        "./assets/js/index.js",
        "./assets/sounds/end-flip.mp3",
        "./assets/sounds/start-flip.mp3",
        "./assets/templates/black-book-view.css",
        "./assets/templates/default-book-view.html",
        "./assets/templates/default-book-view.js",
        "./assets/images/dark-loader.gif",
        "./assets/images/light-loader.gif",
        "./index.html",
        "./assets/css/fontawesome.min.css",
        "./assets/css/solid.min.css",
        "./assets/webfonts/fa-solid-900.ttf",
        "./assets/webfonts/fa-solid-900.woff2",
      ];
      return cache.addAll(cacheArray);
    });
  })());
});

const createResponse = (data, headers) => new Response(
  data ? new Blob(data.data, {type: data.type}) : new Blob(),
  headers);

function addCacheHeader(response) {
  if (response.status != 200 || response.type == "opaque") {
    return response;
  }
  // cache everything
  if (response) {
    const newHeaders = new Headers(response.headers);
    newHeaders.append("Cache-Control", "public, max-age=31536000");
    const newResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
    return newResponse;
  } else {
    return response;
  }
}

const deleteOldCaches = async () => {
  const cacheKeepList = [cacheName];
  const keyList = await caches.keys();
  const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
  console.log(`Deleting ${cachesToDelete.length} old caches`)
  await Promise.all(cachesToDelete.map(deleteCache));
};

self.addEventListener("activate", (event) => {
  event.waitUntil(deleteOldCaches());
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (event) {
  if (event.request.method === "GET") {
    event.respondWith(
      caches.open(cacheName).then(async function (cache) {
        return cache.match(event.request).then(function (response) {
          const {url} = event.request;
          if (response) {
            return addCacheHeader(response);
          }
          console.log(`Loading ${url}`);
          const fetchPromise = new Promise(resolve => {
            const timer = setTimeout(() => {
              console.log(`Network timed out for ${url}`);
              resolve(createResponse({
                data: ["<h1>Request timed out</h1><h2>Please try again later</h2>"],
                type: "text/html"
              }, {
                status: 500,
                statusText: "Request timed out"
              }));
            }, 5000);
            fetch(event.request)
              .then(response => {
                clearTimeout(timer);
                resolve(response);
              });
          })
            .then(networkResponse => {
              if (networkResponse.ok) {
                // Partial content cannot be cached
                if (networkResponse.status === 206) return networkResponse;
                //Request successful, add to cache
                cache.put(event.request, networkResponse.clone());
                console.log(`Cached ${url}`);
                return networkResponse;
              } else {
                //Something went wrong
                //https://github.com/whatwg/fetch/issues/127
                if (networkResponse.ok !== false || networkResponse.type == "opaqueredirect") {
                  return networkResponse;
                }
                //Other network error
                console.log(`Failed to fetch from network ${url}: Error code ${networkResponse.status} ${networkResponse.statusText}`);
                if (!response) {
                  //Likely 404
                  console.log("No cached response, returning errored response");
                  return networkResponse;
                }
                //Maybe server down
                return response;
              }
            })
            .catch(e => {
              console.log("An error occurred:", e);
              return response;
            });
          return response || fetchPromise;
        });
      })
    );
  }
});
