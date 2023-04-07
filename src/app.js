// TODO: fix PWA part of parcel bundling configuration
// https://github.com/mischnic/parcel-plugin-sw-cache
navigator.serviceWorker.register(
    new URL('service-worker.js', import.meta.url),
    { type: 'module' }
)