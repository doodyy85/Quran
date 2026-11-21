const V='rub3-shell-v10',KEEP=[V,'rub3-img','rub3-data'];
const SHELL=['./','index.html','manifest.json','markers.json','icon-192.png','icon-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL).catch(()=>{})));self.skipWaiting();});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>!KEEP.includes(x)).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
const put=(n,r,res)=>{if(res&&res.ok){const cp=res.clone();caches.open(n).then(c=>c.put(r,cp));}return res;};
self.addEventListener('fetch',e=>{
  const r=e.request,u=r.url;
  if(r.method!=='GET'||u.includes('everyayah.com'))return;
  if(/\.webp(\?|$)/.test(u)){e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>put('rub3-img',r,res))));return;}
  if(u.includes('api.alquran.cloud')){e.respondWith(fetch(r).then(res=>put('rub3-data',r,res)).catch(()=>caches.match(r)));return;}
  e.respondWith(fetch(r).then(res=>put(V,r,res)).catch(()=>caches.match(r)));
});
