function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},o=t.parcelRequire9615;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){r[e]=t},t.parcelRequire9615=o),o("kyEFX").register(JSON.parse('{"g0UFJ":"card.87569651.js","dFIUU":"giphy.356b0fc8.gif","izvSH":"card.73ac4411.js"}'));var a=o("1j0wn"),i=o("4Crae"),l=o("gl8ib"),d=o("3WQbN"),s=o("8ggA7"),c=o("1dkYF"),f=o("gJuA9"),u=o("4wCtj"),p=o("io3Hd"),h=o("cAhzP"),m=o("3utQD");u.config.searchPseudoElements=!0,u.library.add(p.faFacebook,p.faInstagram,p.faSnapchat,p.faMastodon,p.faTwitter,p.faYoutube,p.faTelegram,p.faSkype,p.faVk,p.faWhatsapp,h.faEnvelope,h.faUser,h.faPhone,h.faKey),u.dom.i2svg(),u.dom.watch(),window.Sharer=i,l.selectors.filter=".stretchy",l.init(document.querySelector(".form1"));var g;g=new URL(o("kyEFX").resolve("dFIUU"),import.meta.url).toString();const y=new URL(g),b=document.querySelector(".form1");let v,_,E="0".repeat(f.__supportedSocials.length),A=!1,S=[],w=f.__envPath.split("card.html")[1]||f.__envPath.split("card")[1],L="0"!==w.charAt(w.length-1);w=w.slice(0,-1);const H=w.slice(1).hashCode();let T=(0,f.__reverse)(w,E);_=T[0],E=T[1],A=void 0===_||1===_.length;const C=new(0,d.SocialLinks);function U(t){"ar"===t.value?document.dir="rtl":document.dir="ltr",e(a).setLocale(t.value)}!function(){let e=["user",...f.__supportedSocials,"envelope","phone"];S=[];for(let t=0;t<e.length;t++){const n=e[t],r=_[t];if("user"==n)S.push([0,n,r]);else if("envelope"==n)S.push([e.length-2,n,r]);else if("phone"==n)S.push([e.length-1,n,r]);else{let e=parseInt(E[t-1]);S.push([e,n,_[e]])}}for(let t=e.length;t<_.length;t++)S.push([e.length,-1,_[t]]);S.sort()}(),window.addEventListener("DOMContentLoaded",(()=>{U(Array.from(document.querySelector("#lang-select").options).filter((e=>1==e.defaultSelected))[0])})),document.getElementById("lang-select").addEventListener("change",(function(){U(this)}),!1);document.getElementById("decrypt-button").addEventListener("click",(function(){let e=prompt("This social card seems encrypted. Enter in the key!")||"";if(e.length<4||e.length>8)k(!0);else{for(v of S)v[2]&&(v[2]=s.XORCipher.decode(e,v[2]));document.getElementsByClassName("form1")[0].innerHTML="",M(S)}}));let F=0;function M(e){for(v of e){let e,t=v[1],n=v[2];if(""!=n){if(C.isValid(t,n)&&(e=C.getLink(t,n)),F+=1,"envelope"===t){b.insertAdjacentHTML("beforeend",`<div id="mail-id"><a href="mailto:${n}">${n}</a></div>`);continue}if("phone"===t){b.insertAdjacentHTML("beforeend",`<div id="phone-id"><a href="tel:${n}">${n}</a></div>`);continue}"user"===t&&document.querySelectorAll(".user").forEach((e=>{e.innerHTML=n}));let r=document.createElement("I");f.__supportedSocials.indexOf(t)>=0?r.setAttribute("class",`fa-brands fa-${t} icon`):r.setAttribute("class",`fa fa-${t} icon`),b.appendChild(r);let o=document.createElement("INPUT");if(o.setAttribute("name",t),o.setAttribute("class","input-field stretchy"),o.setAttribute("value",n),o.setAttribute("type","text"),o.setAttribute("readonly","readonly"),b.appendChild(o),e){o.style="cursor: pointer;";const t=document.createElement("a");t.style="display: contents;",t.setAttribute("href",e),(0,f.wrap)(o,t)}}}}function k(e){if(!e)return;b.innerHTML="";let t=document.createElement("img");t.src=y,b.appendChild(t);let n=document.createElement("h2");n.innerText="QR code or URL is probably wrong",b.appendChild(n)}k(A),A||(M(S),F=F>7?7:F,(0,f.__isMobile)()||b.insertAdjacentHTML("afterend",(0,f.__generateSvg)(F)),(0,m.join)(!1,H,L)),document.body.hidden=!1,e(a).enableDomScan(!0),e(a).addCatalogs(c.stoneJsCatalogs);
//# sourceMappingURL=card.87569651.js.map
