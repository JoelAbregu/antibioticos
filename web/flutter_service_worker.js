'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "6d55ce2c07d0d124ba75b0b537dbecb2",
"index.html": "2da9a3bb31dd197827643d815c76cf41",
"/": "2da9a3bb31dd197827643d815c76cf41",
"main.dart.js": "c9879873a07b518ad689a1a3df7db9bf",
"flutter.js": "7a1d76a8729d1add7a6ce2a4b4db043f",
"favicon.png": "2d374f3330695efed40b7740f85a99d6",
"icons/Icon-192.png": "0fb25d6eb919dfcf83f39e224fdafefe",
"icons/Icon-maskable-192.png": "0fb25d6eb919dfcf83f39e224fdafefe",
"icons/Icon-maskable-512.png": "4d2e76b05763653d8fc845b925c477b7",
"icons/Icon-512.png": "4d2e76b05763653d8fc845b925c477b7",
"manifest.json": "b4eaec666304d8328e58eafbb05d9893",
"assets/AssetManifest.json": "b68a2ed93553d2bd7c92732e3202d74e",
"assets/NOTICES": "c59a72c3e54f5309d59a669a6f7dbce2",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "e9128f1511f7a1fbaa8a368f51f03ee5",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"assets/AssetManifest.bin": "b63bb4f0c45a68137d7fc563b979b101",
"assets/fonts/MaterialIcons-Regular.otf": "182d1a0a7b5de821f2b0d3bfd7a9d93c",
"assets/assets/if.json": "fdd149ad4c7103f01ba38a71c10b8d45",
"assets/assets/jarabe.png": "cee43ca1f3277c5f4028ea3af180d25e",
"assets/assets/intramuscular.png": "8e32af2110bbf7a31c5b1e04ac9b9dc8",
"assets/assets/8.png": "3ebcbb22d2bb117bfd3ea3c9d2faccad",
"assets/assets/9.png": "9a2578f92f46f71afe293b6fa096836e",
"assets/assets/tableta.png": "253c28e2bf3038bf6852cbc002b44d68",
"assets/assets/carga.png": "5e7fe6c8e1dcfa53d9eba19bcb47df67",
"assets/assets/doctor.png": "e3e19abf103f445c1c873dfd2b0637bb",
"assets/assets/anti.json": "4ab24e9d3b89698957f1116c20bd728b",
"assets/assets/pastillas.png": "06413488447d2afd42cb0cdef1018346",
"assets/assets/11.png": "3708e8a0d76162f45a776815506dbd6a",
"assets/assets/10.png": "e9d147365ddb55cac735ff6f67f0bb0e",
"assets/assets/inicioinyeccion.png": "8176108f7a9fd9017fc84419c0116a18",
"assets/assets/ig.png": "f13ffca0568de501d640e3f85ffc505d",
"assets/assets/tabletaa.png": "cc52b0fc27d7db40a362be3cbf6d2032",
"assets/assets/firma.png": "3122f8567719001296ffc63749cf0b9a",
"assets/assets/logo.png": "86219c7dad1140c001a3ad0fdf2fc312",
"assets/assets/logoow.png": "34397dd08e7c0a1f47a3efa9dc37ddc5",
"assets/assets/4.png": "444108bd57af7d15e74dfffcbb136000",
"assets/assets/5.png": "7b4aa45dd0384ddaf648cef524c11820",
"assets/assets/inyeccioninicio.png": "57a031cdc9453acd9e0e04e096b990b6",
"assets/assets/6.png": "3d33cde2b5c0b8f3c9de46dcf9ff91d5",
"assets/assets/logoumsm.png": "9e05c8568efd07e70d1ce223db338621",
"assets/assets/2.png": "4919f79026e5901ef5ceb2d9b3693112",
"assets/assets/3.png": "c0f6263bd1aedfff472d9c7ae75873eb",
"assets/assets/fondo2.png": "0d27bc5e2c5af0af66173366c6747bd2",
"assets/assets/1.png": "1fb611e61eb84a43094a1bd255bcb3d7",
"canvaskit/skwasm.js": "411f776c9a5204d1e466141767f5a8fa",
"canvaskit/skwasm.js.symbols": "36607a151127e3736083d241f6e7356b",
"canvaskit/canvaskit.js.symbols": "34eb740000df15c03210028f34bc9cf5",
"canvaskit/skwasm.wasm": "045364c77c9eedecbd12d2c77fe8fa0a",
"canvaskit/chromium/canvaskit.js.symbols": "afe994e4d3d6d23db1d643573c9839ce",
"canvaskit/chromium/canvaskit.js": "bc979fce6b4b3cc75d54b0d162cafaa7",
"canvaskit/chromium/canvaskit.wasm": "1ec8ac7ed8ea5906c2e03fc14cb2c22a",
"canvaskit/canvaskit.js": "321aa0c874f6112cabafc27a74a784b4",
"canvaskit/canvaskit.wasm": "2778fe4a13eac805b37df04590085ba3",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
