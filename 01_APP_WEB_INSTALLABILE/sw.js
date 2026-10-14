const CACHE='cantu-ssota-mobile-v2.1.0';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install',ev=>ev.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',ev=>ev.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()])));
self.addEventListener('fetch',ev=>{if(ev.request.method!=='GET')return;const url=new URL(ev.request.url);if(url.origin!==self.location.origin)return;ev.respondWith(caches.match(ev.request).then(hit=>hit||fetch(ev.request).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(ev.request,copy));}return res;}).catch(()=>ev.request.mode==='navigate'?caches.match('./index.html'):Response.error())));});
