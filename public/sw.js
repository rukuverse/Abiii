const V='abiii-v15',SHELL=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL).then(()=>Promise.all(['./instrument-serif-italic.woff2','./instrument-serif.woff2','./inter-tight.woff2'].map(f=>c.add(f).catch(()=>{}))))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=='GET'||u.origin!==location.origin)return;
  if(r.mode==='navigate'){
    e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put('./index.html',cp));return res}).catch(()=>caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(r).then(hit=>{
    const net=fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>hit);
    return hit||net;
  }));
});
