!function(){let e=[],_="";e=["/app.js","/index.html","/apple-touch-icon.b30c28ca.png","/favicon.5548b786.png","/manifest.webmanifest","/pineapple-72.ad6a0100.png","/pineapple-96.b35e1bad.png","/pineapple-128.e0e06325.png","/pineapple-144.9bfa0e5a.png","/pineapple-152.4c3c82e2.png","/pineapple-192.8456f495.png","/pineapple-384.fd5ccda3.png","/pineapple-512.c57a505f.png","/safe-browsing.0e95b2b8.png","/one-free.800bbe9b.png","/private2.061ee091.png","/girl-running.2824d8ab.png","/index.107bb404.css","/index.6d887c9a.css","/ui-icons_444444_256x240.4ed2e2c5.png","/ui-icons_555555_256x240.746aeff1.png","/ui-icons_ffffff_256x240.6c71f43b.png","/ui-icons_777620_256x240.60b64fbf.png","/ui-icons_cc0000_256x240.440f01ad.png","/ui-icons_777777_256x240.c8106448.png","/index.52190948.js","/index.ff555ef5.js","/card.ab3d1c63.js","/trystero.31d87074.js","/index.55301419.js","/card.73ac4411.js","/trystero.9e389b3e.js","/card.html","/card.dc67416f.js","/giphy.356b0fc8.gif","/card.87569651.js","/giphy.356b0fc8.gif"],_="a361797f",addEventListener("install",(a=>a.waitUntil(async function(){const a=e;for(var n=a.length-1;n>=0;n--)if(a[n].indexOf("giphy")>-1){a.splice(n,1);break}caches.open(_).then((async _=>{try{await _.addAll(e)}catch(e){return console.error(`Oops! ${e}`)}}))}()))),addEventListener("activate",(e=>e.waitUntil(async function(){const e=await caches.keys();await Promise.all(e.map((e=>e!==_&&caches.delete(e))))}())))}();
//# sourceMappingURL=service-worker.js.map