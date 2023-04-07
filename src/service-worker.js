import { manifest, version } from '@parcel/service-worker'

async function install() {
    const manifest_ = manifest
    // TODO: this is a really bad work around, removing a duplicate asset registered for PWA
    // because the manifest assets here gives a duplicate resource (giphy.gif)
    // which is imported in 'card.js'
    const search_term = 'giphy'
    for (var i = manifest_.length - 1; i >= 0; i--) {
        if (manifest_[i].indexOf(search_term) > -1) {
            manifest_.splice(i, 1)
            break       //<-- Uncomment  if only the first term has to be removed
        }
    }
    caches.open(version).then(async cache => {
        try {
            await cache.addAll(manifest)
        } catch (error) {
            return console.error(`Oops! ${error}`)
        }
    })
}
addEventListener('install', e => e.waitUntil(install()))

async function activate() {
    const keys = await caches.keys()
    await Promise.all(
        keys.map(key => key !== version && caches.delete(key))
    )
}
addEventListener('activate', e => e.waitUntil(activate()))
