/* eslint-disable linebreak-style */
import Stone from 'stonejs'
import * as Sharer from 'sharer.js'
import * as Stretchy from 'stretchy'
import { SocialLinks, TYPE_MOBILE } from 'social-links'
import { XORCipher } from './libs/XORCipher'
import { stoneJsCatalogs } from './libs/stoneJSCatalog'
import { wrap, __envPath, __generateSvg, __isMobile, __reverse, __supportedSocials } from './helpers'
import { library, dom, config } from '@fortawesome/fontawesome-svg-core'
config.searchPseudoElements = true
import { faFacebook, faInstagram, faSnapchat, faMastodon, faTwitter, faYoutube, faTelegram, faSkype, faVk, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faUser, faPhone, faKey } from '@fortawesome/free-solid-svg-icons'
import { join } from './sync'
library.add(faFacebook, faInstagram, faSnapchat, faMastodon, faTwitter, faYoutube, faTelegram, faSkype, faVk, faWhatsapp, faEnvelope, faUser, faPhone, faKey)
dom.i2svg()
dom.watch()

window.Sharer = Sharer

Stretchy.selectors.filter = '.stretchy'
Stretchy.init(document.querySelector('.form1'))

const giphy = new URL(
    './assets/giphy.gif',
    import.meta.url
)
const form = document.querySelector('.form1')
let order = '0'.repeat(__supportedSocials.length)
let bogus = false
let dataArray = []
let socialArray, values
///////////////////////////////////////////////////////////////////////  INIT  //////////////////////////////////////////////////////////////
// get part after card.html in link
let pageName = __envPath.split('card.html')[1] || __envPath.split('card')[1]
let isSyncOn_ = pageName.charAt(pageName.length-1) === '0' ? false : true
pageName = pageName.slice(0, -1)
const hash = pageName.slice(1).hashCode()
let reversed = __reverse(pageName, order)
values = reversed[0]
order = reversed[1]
bogus = (typeof (values) === 'undefined' || values.length === 1)
const socialLinks = new SocialLinks()
function createDataArray() {
    // fixed fields
    let keys = ['user', ...__supportedSocials, 'envelope', 'phone']
    dataArray = []
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const value = values[i]
        if (key == 'user') {
            dataArray.push([0, key, value])
        } else if (key == 'envelope') {
            dataArray.push([keys.length - 2, key, value])
        } else if (key == 'phone') {
            dataArray.push([keys.length - 1, key, value])
        } else {
            let socialOrder = parseInt(order[i - 1])
            dataArray.push([socialOrder, key, values[socialOrder]])
        }
    }
    // dynamic fields
    for (let j = keys.length; j < values.length; j++) {
        dataArray.push([keys.length, -1, values[j]])
    }
    dataArray.sort()
}
createDataArray()

///////////////////////////////////////////////////////////////////////  EVENTS CALLBACKS  ///////////////////////////////////////////////////////////
function langChange(el) {// check for right to left formatting
    if (el.value === 'ar') { document.dir = 'rtl' } else { document.dir = 'ltr' }
    Stone.setLocale(el.value)
}
window.addEventListener('DOMContentLoaded', () => {
    let langOptions = Array.from(document.querySelector('#lang-select').options)
    let defaultLang = langOptions.filter(option => option.defaultSelected == true)[0]
    // Language selector.
    langChange(defaultLang)
})
document.getElementById('lang-select').addEventListener('change', function () {
    langChange(this)
}, false)
// Decrypt button event listener
const btn = document.getElementById('decrypt-button')
btn.addEventListener('click', function () {
    let password = prompt('This social card seems encrypted. Enter in the key!') || ''
    if (password.length < 4 || password.length > 8) {
        bugIfABugs(true)
    } else {
        for (socialArray of dataArray) {
            if (socialArray[2]) {
                socialArray[2] = XORCipher.decode(password, socialArray[2])
            }
        }
        document.getElementsByClassName('form1')[0].innerHTML = ''
        renderSubmittedData(dataArray)
    }
})

let submittedSocials = 0
function renderSubmittedData(dataArray) {
    for (socialArray of dataArray) {
        let key = socialArray[1]
        let value = socialArray[2]
        let link
        if (value != '') {
            if (socialLinks.isValid(key, value)) {
                link = socialLinks.getLink(key, value)
            }
            submittedSocials += 1
            if (key === 'envelope') {
                form.insertAdjacentHTML('beforeend', `<div id="mail-id"><a href="mailto:${value}">${value}</a></div>`)
                continue
            } else if (key === 'phone') {
                form.insertAdjacentHTML('beforeend', `<div id="phone-id"><a href="tel:${value}">${value}</a></div>`)
                continue
            } else if (key === 'user') {
                document.querySelectorAll('.user').forEach(node => { node.innerHTML = value })
            }
            let x = document.createElement('I')
            if (__supportedSocials.indexOf(key) >= 0)
                x.setAttribute('class', `fa-brands fa-${key} icon`)
            else
                x.setAttribute('class', `fa fa-${key} icon`)

            form.appendChild(x)
            let y = document.createElement('INPUT')
            y.setAttribute('name', key)
            y.setAttribute('class', 'input-field stretchy')
            y.setAttribute('value', value)
            y.setAttribute('type', 'text')
            y.setAttribute('readonly', 'readonly')
            form.appendChild(y)

            if (link) {
                y.style = 'cursor: pointer;'
                const link_ = document.createElement('a')
                link_.style = 'display: contents;'
                link_.setAttribute('href', link)
                wrap(y, link_)
            }
        }
    }
}

function bugIfABugs(bogus) {
    if (!bogus) return
    // rollback
    form.innerHTML = ''
    let img = document.createElement('img')
    img.src = giphy
    form.appendChild(img)
    let errorMsg = document.createElement('h2')
    errorMsg.innerText = 'QR code or URL is probably wrong'
    form.appendChild(errorMsg)
}
bugIfABugs(bogus)
if (!bogus) {
    renderSubmittedData(dataArray)
    // Values over 7 result in svg images too large for the card
    submittedSocials = submittedSocials > 7 ? 7 : submittedSocials
    // Generate some art
    // TODO: generated SVG position to fix
    if (!__isMobile()) form.insertAdjacentHTML('afterend', __generateSvg(submittedSocials))
    join(false, hash, isSyncOn_)
}

document.body.hidden = false
Stone.enableDomScan(true)
Stone.addCatalogs(stoneJsCatalogs)

// let _id;
// let mcastUrl;
// $.ajaxSetup({ xhrFields: { withCredentials: true } });	// For cookies with SeqId
// $.post(mcastUrl, "holla");
