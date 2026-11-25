const BUILD = "1bd11e8e4693294e";
const SHELL_FILES = ["assets/About-DMxyvCqJ.js","assets/Dashboard-B1IMkXOb.js","assets/index-BE4uAC62.css","assets/index-CX2pmpTJ.js","assets/jsx-runtime-BZi9cxqW.js","assets/Login-DFumWnFw.js","assets/NotFound-BzpKhyDY.js","assets/ProductDetails-BwQDRk0K.js","assets/Products-iCXkLOK4.js","assets/Profile-CRRdfp1J.js","assets/react-BbggMMhK.js","assets/rolldown-runtime-WkwZ5CU-.js","assets/Signup-CxhZi6_d.js","assets/useProducts-sigyRW1E.js","assets/useRead-Ba968HWS.js","hero.svg","icon-192.png","icon-512.png","index.html","manifest.json","offline/index.html"];
/* global BUILD, SHELL_FILES */

const root = new URL(self.registration.scope);
const index = new URL("index.html", root).href;
const offline = new URL("offline/index.html", root).href;
const placeholder = new URL("icon-192.png", root).href;
const files = SHELL_FILES.map((path) => new URL(path, root).href);
const precached = new Set(files);

const prefix = "product-explorer-task8-";
const shell = `${prefix}shell-${BUILD}`;
const api = `${prefix}api-v1`;
const images = `${prefix}images-v1`;
const activeCaches = new Set([shell, api, images]);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(shell).then((cache) =>
      cache.addAll(files.map((url) => new Request(url, { cache: "reload" })))
    )
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(
      names
        .filter((name) => name.startsWith(prefix) && !activeCaches.has(name))
        .map((name) => caches.delete(name))
    );
    await self.clients.claim();
  })());
});

self.addEventListener("message", (event) => {
  if (event.origin !== self.location.origin) return;

  if (event.data === "ACTIVATE_UPDATE") {
    event.waitUntil(self.skipWaiting());
  }
});

const cacheWrites = new Map();

function remember(name, cache, request, response, limit) {
  const write = (cacheWrites.get(name) ?? Promise.resolve())
    .then(async () => {
      await cache.put(request, response);
      const keys = await cache.keys();
      const excess = Math.max(0, keys.length - limit);
      await Promise.all(keys.slice(0, excess).map((key) => cache.delete(key)));
    })
    .catch(() => {});

  cacheWrites.set(name, write);
  return write;
}

async function fromShell(url) {
  return (await caches.open(shell)).match(url);
}

async function navigate(request, url) {
  if (url.pathname === root.pathname || url.href === index) {
    return (await fromShell(index)) ?? fetch(request);
  }

  if (["offline", "offline/", "offline/index.html"].some(
    (path) => url.pathname === new URL(path, root).pathname
  )) {
    return (await fromShell(offline)) ?? fetch(request);
  }

  try {
    return await fetch(request);
  } catch {
    return (await fromShell(offline)) ?? Response.error();
  }
}

async function networkFirst(request) {
  const cache = await caches.open(api);
  let response;

  try {
    response = await fetch(request, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });

    if (
      response.ok &&
      !response.redirected &&
      response.headers.get("Content-Type")?.includes("application/json")
    ) {
      await remember(api, cache, request, response.clone(), 80);
    }

    if (response.status < 500) return response;
  } catch {
    // Fall back to the saved public response.
  }

  const saved = await cache.match(request);
  if (saved) {
    return new Response(saved.body, {
      headers: {
        "Content-Type": "application/json",
        "X-PWA-Source": "cache",
      },
    });
  }

  return response ?? new Response(null, {
    status: 503,
    headers: { "X-PWA-Source": "unavailable" },
  });
}

async function cacheFirstImage(request) {
  const cache = await caches.open(images);
  const saved = await cache.match(request);
  if (saved) return saved;

  try {
    const response = await fetch(request);
    if (response.ok || response.type === "opaque") {
      await remember(images, cache, request, response.clone(), 120);
      return response;
    }
  } catch {
    // Use the app icon when a product image is unavailable.
  }

  return (await fromShell(placeholder)) ?? Response.error();
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  if (request.mode === "navigate" && url.href.startsWith(root.href)) {
    event.respondWith(navigate(request, url));
    return;
  }

  if (precached.has(url.href)) {
    event.respondWith(fromShell(url.href).then((saved) => saved ?? fetch(request)));
    return;
  }

  if (
    url.origin === "https://dummyjson.com" &&
    request.credentials === "omit" &&
    !request.headers.has("Authorization") &&
    (
      (url.pathname === "/products" && url.search === "?limit=0") ||
      (/^\/products\/[1-9]\d*$/.test(url.pathname) && !url.search)
    )
  ) {
    event.respondWith(networkFirst(request));
    return;
  }

  if (
    request.destination === "image" &&
    url.origin === "https://cdn.dummyjson.com" &&
    url.pathname.startsWith("/product-images/")
  ) {
    event.respondWith(cacheFirstImage(request));
  }
});