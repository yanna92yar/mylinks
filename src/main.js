/* eslint-disable linebreak-style */
import Stone from 'stonejs'
import { XORCipher } from './libs/XORCipher'
import { stoneJsCatalogs } from './libs/stoneJSCatalog'
import QRCode from 'qrcode'
import printJS from 'print-js'
import { __btoaVerified, __copyLink, __envPath, __isEmpty, __supportedSocials } from './helpers'
import * as Sharer from 'sharer.js'
import * as Stretchy from 'stretchy'
import { onType } from './libs/throtlle'
import { SocialLinks, TYPE_MOBILE } from 'social-links'
import Toastify from 'toastify-js'

import { library, dom, config } from '@fortawesome/fontawesome-svg-core'
config.searchPseudoElements = true
import {
    faFacebook,
    faInstagram,
    faSnapchat,
    faMastodon,
    faTwitter,
    faYoutube,
    faTelegram,
    faSkype,
    faVk,
    faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faUser, faPhone, faKey, faTrash, faCopy } from '@fortawesome/free-solid-svg-icons'
import { isSyncOn, join } from './sync'
library.add(
    faFacebook,
    faInstagram,
    faSnapchat,
    faMastodon,
    faTwitter,
    faYoutube,
    faTelegram,
    faSkype,
    faVk,
    faWhatsapp,
    faEnvelope,
    faUser,
    faPhone,
    faKey,
    faTrash,
    faCopy
)
dom.i2svg()
dom.watch()

const jQuery = require('jquery')
window.jQuery = jQuery
window.$ = jQuery
require('jquery-ui-bundle')
require('./libs/jquery.ui.touch-punch') // <- fuck you

window.Sharer = Sharer
window.jQuery = jQuery

Stretchy.selectors.filter = '.stretchy'
Stretchy.init(document.querySelector('.form1'))
const socialLinks = new SocialLinks()

let dataURL, canvas
/** Global variable */
let order
///////////////////////////////////////////////////////////////////////  HELPERS  //////////////////////////////////////////////////////////////

// Stretchy.init()

function codifyDataToUrl(formData) {
    let key = formData['password']
    delete formData['password']
    let values = Object.values(formData).map((val) => val.trim())
    values = key
        ? values.map((val) => {
            if (val) return XORCipher.encode(key, val)
            return val
        })
        : values
    let shortestString = values.join(',')
    let envPath = __envPath
    let encoded = __btoaVerified(shortestString) + order
    // localhost includes index.html but not on web server
    // so remove it from path on localhost environment
    let resultURL
    if (__envPath.indexOf('/index.html') >= 0) {
        envPath = __envPath.split('/index.html')[0]
        resultURL = `${envPath}/card.html#` + encoded
    } else resultURL = `${envPath}card.html#` + encoded
    return { url: resultURL, hash: encoded.hashCode() }
}

const changeProgress = (progress) => {
    const progressBar = document.querySelector('.progress')
    const error = document.querySelector('.error')
    progressBar.style.width = `${progress}%`
    if (progress > 100) {
        progressBar.style.width = '100%'
        progressBar.style.backgroundColor = 'black'
        document.getElementById('submit').disabled = true
        error.innerHTML = 'You exceeded the text limit!'
    } else {
        progressBar.style.backgroundColor = '#47ff8d'
        document.getElementById('submit').disabled = false
        error.innerHTML = ''
    }
}

function clearPreviousQR() {
    document.getElementById('qrcode').innerHTML = ''
    document.querySelector('#link').innerHTML = ''
}

function refreshOrder() {
    order = new Array(__supportedSocials.length).fill(0)
    const socialArray = __supportedSocials
    let socials = document.getElementsByClassName('sortable-input')
    let i = 1
    for (let social of socials) {
        order[socialArray.indexOf(social.name)] = i
        i += 1
    }
    order = order.join('')
}

///////////////////////////////////////////////////////////////////////  EVENTS CALLBACKS  ///////////////////////////////////////////////////////////
/** Global variable */
let formData
let limit = 300
// 1) Manipulate dom on key strokes
function handleFormOnKeyStrokes() {
    formData = new FormData(document.querySelector('.form1'))
    let allLinks = [...formData.entries()]
    // let fixed = allLinks.slice(0, 8)
    // let rest = allLinks.slice(9)
    // if(isEmpty(rest) && isEmpty(fixed)) return
    // if(!isEmpty(rest)) rest = Object.fromEntries(rest);
    // if(!isEmpty(fixed)) fixed = Object.fromEntries(fixed);
    if (!__isEmpty(allLinks)) allLinks = Object.fromEntries(allLinks)
    // TODO: codifyDataToUrl 'rest' as well
    try {
        const { url } = codifyDataToUrl(allLinks)
        let percentage = (url.length / limit) * 100
        setTimeout(() => changeProgress(percentage), 1000)
        // const {url} = codifyDataToUrl(rest)
        // let percentage = (url.length / limit) * 100;
        // setTimeout(() => changeProgress(percentage), 1000);
    } catch (error) {
        0
    }
}
// 2) Manipulate dom on form submit
function handleFormOnSubmit(event) {
    refreshOrder()
    event.preventDefault()
    formData = new FormData(document.querySelector('.form1'))
    differForConn()
}

///////////////////////////////////////////////////////////////////////  ATTACH EVENTS  //////////////////////////////////////////////////////////////
// Attach handleFormOnKeyStrokes
const form = document.querySelector('.contact-form')
form.addEventListener('keydown', onType(handleFormOnKeyStrokes))
// form.addEventListener('keyup', handleFormOnKeyStrokes)
form.addEventListener('submit', handleFormOnSubmit)
function langChange(el) {
    // check for right to left formatting
    if (el.value === 'ar') {
        document.dir = 'rtl'
    } else {
        document.dir = 'ltr'
    }
    Stone.setLocale(el.value)
}
window.addEventListener('DOMContentLoaded', () => {
    let langOptions = Array.from(document.querySelector('#lang-select').options)
    let defaultLang = langOptions.filter((option) => option.defaultSelected == true)[0]
    // Language selector.
    langChange(defaultLang)
})
document.getElementById('lang-select').addEventListener(
    'change',
    function () {
        langChange(this)
    },
    false,
)
function handleDom() {
    // for multi-selects, we need special handling
    const formJSON = Object.fromEntries(formData.entries())
    let { url, hash } = codifyDataToUrl(formJSON)
    if(isSyncOn()) url += '1'
    else url += '0'
    // const simpleURL = new URLSearchParams(formJSON).toString()
    if (document.querySelector('#link').innerHTML != '') {
        clearPreviousQR()
    }
    canvas = document.getElementById('qrcode')
    QRCode.toCanvas(canvas, url, function (error) {
        if (error) {
            error.innerHTML = 'Internal text!'
            console.error(error)
            return
        }
        console.log('success!')
    })

    dataURL = canvas.toDataURL()
    let a = document.createElement('a')
    let linkText = document.createTextNode('Share my link')
    a.appendChild(linkText)
    a.title = 'My link'
    a.href = url
    let b = document.createElement('button')
    let shareText = document.createTextNode('Share my QR on Facebook')
    // <button class="button" data-sharer="buffer" data-via="ellisonleao" data-picture="https://ellisonleao.github.io/sharer.js/img/socialbg.png" data-title="Sharer.js is the ultimate sharer js lib" data-url="https://ellisonleao.github.io/sharer.js/">Share on Buffer</button>
    b.setAttribute('class', 'button')
    b.setAttribute('data-sharer', 'facebook')
    b.setAttribute('data-picture', dataURL)
    b.setAttribute('data-via', 'data-via')
    b.setAttribute('data-id', 'fb')
    b.setAttribute('data-title', 'Check my links')
    b.appendChild(shareText)
    document
        .querySelector('#link')
        .insertAdjacentHTML(
            'beforeend',
            '<br><a download="my_qr_code.png" href="' + dataURL + '">Download QR code</a> | ',
        )
    document
        .querySelector('#link')
        .insertAdjacentHTML('beforeend', '<a style="cursor:pointer" id="do_print" >Print As PDF</a> | ')
    document.querySelector('#link').appendChild(a)

    document
        .querySelector('#link')
        .insertAdjacentHTML(
            'beforeend',
            '<br><div style="display:flex"><input type="text" value="' +
            url +
            '" id="to_copy" readonly><div id="do_copy"><i class="fa fa-copy icon"></i><div></div>',
        )
    document.querySelector('#link').appendChild(b)
    document.getElementById('qrcode').scrollIntoView()
    // Sharer.init()
    // copy to pastebin
    __copyLink('do_copy', 'to_copy')
    document.getElementById('do_print').addEventListener('click', () => {
        printAsPDF()
    })

    join(true, hash)
}

function differForConn() {
    setTimeout(function () {
        handleDom()
        // subscribe();
    }, 1000)
}

Stone.enableDomScan(true)
Stone.addCatalogs(stoneJsCatalogs)

function addElement(parentId, elementTag, elementId, html) {
    let id = document.getElementById(parentId)
    let newElement = document.createElement(elementTag)
    newElement.setAttribute('id', 'field-' + elementId)
    newElement.setAttribute('class', 'dynamic-field')
    // newElement.style = 'display: block ruby;'
    newElement.innerHTML = html
    newElement.childNodes[2].addEventListener('click', () => {
        removeField(elementId)
    })
    // onclick="removeField(' + fieldId + ');"
    id.appendChild(newElement)
    const checkUrl = (elementId) => {
        return () => {
            const social = document.getElementById(`dynamic-${elementId}-social`).value.toLowerCase().trim()
            const link = document.getElementById(`dynamic-${elementId}`).value.toLowerCase().trim()
            const _6 = (str) => str.length >= 6
            const _3 = (str) => str.length >= 3
            const link_ = link.replace(/(^\w+:|^)\/\//, '')
            const notify = (msg, duration, warn) => {
                let background = 'linear-gradient(to right, #00b09b, #96c93d)'
                if (warn) background = 'linear-gradient(to right, #ff9966, #ffcc00)'
                Toastify({
                    text: msg,
                    duration: duration,
                    gravity: 'top',
                    position: 'right',
                    stopOnFocus: true,
                    style: {
                        background: background,
                    },
                    onClick: function () { },
                }).showToast()
            }
            if (_3(social) && _6(link_) && socialLinks.isValid(social, link)) {
                notify(`Ah ${social.toUpperCase()} ! We got you :)`, 2000, false)
                const dynamicField = document.getElementById(`dynamic-${elementId}`)
                dynamicField.setAttribute('name', social)
            } else {
                if (_3(social) && _6(link_)) {
                    notify(
                        `Oops, "${social.toUpperCase()}" with your link are not recognized. But You can continue if you are sure!`,
                        3000,
                        true,
                    )
                    return
                }
                if (_6(link)) {
                    notify('Not enough! we need the social network name as well :)', 2000, true)
                    return
                }
                if (_3(social)) notify('Not enough! we need your profile link as well :)', 2000, true)
            }
        }
    }
    newElement.addEventListener('keydown', onType(checkUrl(elementId)))
}

// TODO: attach inline JS/HTML to events here.
const printAsPDF = () => {
    printJS({ printable: dataURL, type: 'image', header: `QR code of ${form.children[0].children[0][0].value}` })
}

function removeField(elementId) {
    let fieldId = 'field-' + elementId
    let element = document.getElementById(fieldId)
    element.parentNode.removeChild(element)
}
let fieldId = 0
document.getElementById('add-field').onclick = function addField() {
    fieldId++
    // TODO: fix: attach removeField to all new fields
    let html =
        '<input type="text" id="dynamic-' +
        fieldId +
        '" class="input-field" pattern=".{6,100}|^$" title="At least 6 characters" placeholder="Enter a link" style="flex: max-content;"/>'
    html +=
        '<input type="text" id="dynamic-' +
        fieldId +
        '-social" class="input-field" pattern=".{3,30}|^$" title="At least 3 characters" placeholder="Enter social site"/>'
    html +=
        '<button style="display: flex;align-items: center;justify-content: center;"><span class="fa fa-trash icon"></span></button>'
    addElement('dynamic-forms', 'div', fieldId, html)
}

$(function () {
    $('#sortable').sortable({
        placeholder: 'ui-state-highlight',
    })
    $('#sortable').disableSelection()
})