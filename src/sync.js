import Toastify from 'toastify-js'

let config = { appId: '91125639-d61d-4918' }
let room
export function join(admin, channel, isSyncOn_) {
    if (isSyncOn() || isSyncOn_)
        import('trystero').then(async (tryStero) => {
            try {
                const response = await fetch('https://worldtimeapi.org/api/timezone/Europe/Berlin')
                const data = await response.json()
                config.appId += data.datetime.slice(0, 10)
            } catch (error) {
                0
            }
            if (!admin)
                try {
                    room = tryStero.joinRoom(config, channel)
                } catch (error) {
                    return
                }
            else {
                try {
                    room = tryStero.joinRoom(config, channel)
                } catch (error) {
                    return
                }
                room.onPeerJoin(peerId => {
                    console.log(`${peerId} joined`)
                    notify(`Ah ${peerId} joined :)`, 2000, false)
                })
                room.onPeerLeave(peerId => {
                    console.log(`${peerId} left`)
                    notify(`${peerId} left`, 2000, true)
                })
            }
        })
}

const defaultBackgroundStyle = document.body.style
export const isSyncOn = () => JSON.parse(localStorage.getItem('active_syncing_mode')) || false

function switchBackground(syncingMode) {
    if (syncingMode) {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        document.body.style.backgroundImage = isDarkMode ? 'repeating-linear-gradient(45deg, #000 0, #1a1a1a 1px, #000 0, #000 50%)' :
            'repeating-linear-gradient(45deg, #f9e8c7 0, #d7d7d7 1px, #f9e8c7 0, #f9e8c7 50%)'
        document.body.style.backgroundSize = '10px 10px'
    } else {
        document.body.style = defaultBackgroundStyle
    }
}

function save() {
    let checkbox = document.getElementById('active_syncing_mode')
    localStorage.setItem('active_syncing_mode', checkbox.checked)
    switchBackground(checkbox.checked)
}

function checkSyncingMode() {
    let checked = isSyncOn()
    switchBackground(checked)
    document.getElementById('active_syncing_mode').checked = checked
}

function restart() {
    location.reload()
    localStorage.clear()
}

if (!window.location.href.includes('card')) {
    checkSyncingMode()
    document.getElementById('activateSyncing').onclick = save
    document.getElementById('deactivateSyncing').onclick = restart
}


const notify = (msg, duration, warn) => {
    let background = 'linear-gradient(to right, #00b09b, #96c93d)'
    if (warn) background = 'linear-gradient(to right, #ff9966, #ffcc00)'
    Toastify({
        text: msg,
        duration: duration,
        gravity: 'bottom',
        position: 'right',
        stopOnFocus: true,
        style: {
            background: background,
        },
        onClick: function () { },
    }).showToast()
}