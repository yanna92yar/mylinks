!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},a=t.parcelRequire9615;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){r[e]=t},t.parcelRequire9615=a),a("iE7OH").register(JSON.parse('{"eSBza":"card.dc67416f.js","aehmt":"giphy.356b0fc8.gif","1KTk3":"card.ab3d1c63.js"}'));var o=a("aJuKM"),i=a("i15G4"),l=a("eUkKm"),d=a("hAmjI"),s=a("8woy4"),c=a("995BL"),u=a("doFtP"),f=a("1uya5"),p=a("aso8C"),h=a("9FmRn"),m=a("44nLm");f.config.searchPseudoElements=!0,f.library.add(p.faFacebook,p.faInstagram,p.faSnapchat,p.faMastodon,p.faTwitter,p.faYoutube,p.faTelegram,p.faSkype,p.faVk,p.faWhatsapp,h.faEnvelope,h.faUser,h.faPhone,h.faKey),f.dom.i2svg(),f.dom.watch(),window.Sharer=i,l.selectors.filter=".stretchy",l.init(document.querySelector(".form1"));var g;g=a("aNJCr").getBundleURL("eSBza")+a("iE7OH").resolve("aehmt");const y=new URL(g),v=document.querySelector(".form1");let b,_,E="0".repeat(u.__supportedSocials.length),S=!1,L=[],A=u.__envPath.split("card.html")[1]||u.__envPath.split("card")[1],w="0"!==A.charAt(A.length-1);A=A.slice(0,-1);const T=A.slice(1).hashCode();let H=(0,u.__reverse)(A,E);_=H[0],E=H[1],S=void 0===_||1===_.length;const C=new(0,d.SocialLinks);function M(t){"ar"===t.value?document.dir="rtl":document.dir="ltr",e(o).setLocale(t.value)}!function(){let e=["user",...u.__supportedSocials,"envelope","phone"];L=[];for(let t=0;t<e.length;t++){const n=e[t],r=_[t];if("user"==n)L.push([0,n,r]);else if("envelope"==n)L.push([e.length-2,n,r]);else if("phone"==n)L.push([e.length-1,n,r]);else{let e=parseInt(E[t-1]);L.push([e,n,_[e]])}}for(let t=e.length;t<_.length;t++)L.push([e.length,-1,_[t]]);L.sort()}(),window.addEventListener("DOMContentLoaded",(()=>{M(Array.from(document.querySelector("#lang-select").options).filter((e=>1==e.defaultSelected))[0])})),document.getElementById("lang-select").addEventListener("change",(function(){M(this)}),!1);document.getElementById("decrypt-button").addEventListener("click",(function(){let e=prompt("This social card seems encrypted. Enter in the key!")||"";if(e.length<4||e.length>8)O(!0);else{for(b of L)b[2]&&(b[2]=s.XORCipher.decode(e,b[2]));document.getElementsByClassName("form1")[0].innerHTML="",k(L)}}));let R=0;function k(e){for(b of e){let e,t=b[1],n=b[2];if(""!=n){if(C.isValid(t,n)&&(e=C.getLink(t,n)),R+=1,"envelope"===t){v.insertAdjacentHTML("beforeend",`<div id="mail-id"><a href="mailto:${n}">${n}</a></div>`);continue}if("phone"===t){v.insertAdjacentHTML("beforeend",`<div id="phone-id"><a href="tel:${n}">${n}</a></div>`);continue}"user"===t&&document.querySelectorAll(".user").forEach((e=>{e.innerHTML=n}));let r=document.createElement("I");u.__supportedSocials.indexOf(t)>=0?r.setAttribute("class",`fa-brands fa-${t} icon`):r.setAttribute("class",`fa fa-${t} icon`),v.appendChild(r);let a=document.createElement("INPUT");if(a.setAttribute("name",t),a.setAttribute("class","input-field stretchy"),a.setAttribute("value",n),a.setAttribute("type","text"),a.setAttribute("readonly","readonly"),v.appendChild(a),e){a.style="cursor: pointer;";const t=document.createElement("a");t.style="display: contents;",t.setAttribute("href",e),(0,u.wrap)(a,t)}}}}function O(e){if(!e)return;v.innerHTML="";let t=document.createElement("img");t.src=y,v.appendChild(t);let n=document.createElement("h2");n.innerText="QR code or URL is probably wrong",v.appendChild(n)}O(S),S||(k(L),R=R>7?7:R,(0,u.__isMobile)()||v.insertAdjacentHTML("afterend",(0,u.__generateSvg)(R)),(0,m.join)(!1,T,w)),document.body.hidden=!1,e(o).enableDomScan(!0),e(o).addCatalogs(c.stoneJsCatalogs)}();
//# sourceMappingURL=card.dc67416f.js.map