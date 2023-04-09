!function(){function e(e,t,n,i){Object.defineProperty(e,t,{get:n,set:i,enumerable:!0,configurable:!0})}var t=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequire9615;t.register("9a6Ck",(function(n,i){e(n.exports,"joinRoom",(function(){return t("kDNIc").joinRoom}));t("kDNIc")})),t.register("kDNIc",(function(n,i){e(n.exports,"joinRoom",(function(){return _}));var s=t("dZ1ej"),r=t("cQlYm"),o=t("lnAYI");r=t("cQlYm");const a={},c={},d={},h="announce",l=["wss://tracker.openwebtorrent.com","wss://tracker.btorrent.xyz","wss://tracker.files.fm:7073/announce","wss://qot.abiir.top:443/announce","wss://spacetradersapi-chatbox.herokuapp.com:443/announce"],_=(0,r.initGuard)(a,((e,t)=>{const n={},i=e.password&&(0,o.genKey)(e.password,t),_=(e.trackerUrls||l).slice(0,e.trackerUrls?e.trackerUrls.length:e.trackerRedundancy||2);if(!_.length)throw(0,r.mkErr)("trackerUrls is empty");const u=crypto.subtle.digest("SHA-1",(0,r.encodeBytes)(`${r.libName}:${e.appId}:${t}`)).then((e=>Array.from(new Uint8Array(e)).map((e=>e.toString(36))).join("").slice(0,20))),p=t=>(0,r.fromEntries)(new Array(t).fill().map((()=>{const t=(0,r.initPeer)(!0,!1,e.rtcConfig);return[(0,r.genId)(20),{peer:t,offerP:new Promise((e=>t.once(r.events.signal,e)))}]}))),f=async(t,s)=>{const a=await u;let c;try{c=JSON.parse(s.data)}catch(s){return void console.error(`${r.libName}: received malformed SDP JSON`)}if(c.info_hash!==a||c.peer_id&&c.peer_id===r.selfId)return;const d=c["failure reason"];if(d)console.warn(`${r.libName}: torrent tracker failure (${d})`);else{if(c.interval&&c.interval>C&&c.interval<=120&&(clearInterval(T),C=c.interval,T=setInterval(y,1e3*C)),c.offer&&c.offer_id){if(n[c.peer_id]||k[c.offer_id])return;k[c.offer_id]=!0;const s=(0,r.initPeer)(!1,!1,e.rtcConfig);return s.once(r.events.signal,(async e=>t.send(JSON.stringify({answer:i?{...e,sdp:await(0,o.encrypt)(i,e.sdp)}:e,action:h,info_hash:a,peer_id:r.selfId,to_peer_id:c.peer_id,offer_id:c.offer_id})))),s.on(r.events.connect,(()=>w(s,c.peer_id))),s.on(r.events.close,(()=>E(s,c.peer_id,c.offer_id))),void s.signal(i?{...c.offer,sdp:await(0,o.decrypt)(i,c.offer.sdp)}:c.offer)}if(c.answer){if(n[c.peer_id]||k[c.offer_id])return;const e=R[c.offer_id];if(e){const{peer:t}=e;if(t.destroyed)return;k[c.offer_id]=!0,t.on(r.events.connect,(()=>w(t,c.peer_id,c.offer_id))),t.on(r.events.close,(()=>E(t,c.peer_id,c.offer_id))),t.signal(i?{...c.answer,sdp:await(0,o.decrypt)(i,c.answer.sdp)}:c.answer)}}}},g=async(e,t)=>e.send(JSON.stringify({action:h,info_hash:t,numwant:10,peer_id:r.selfId,offers:await Promise.all((0,r.entries)(R).map((async([e,{offerP:t}])=>{const n=await t;return{offer_id:e,offer:i?{...n,sdp:await(0,o.encrypt)(i,n.sdp)}:n}})))})),m=(e,t,n)=>(n||!c[e]?(d[e]={...d[e],[t]:f},c[e]=new Promise((t=>{const n=new WebSocket(e);n.onopen=t.bind(null,n),n.onmessage=t=>(0,r.values)(d[e]).forEach((e=>e(n,t)))}))):d[e][t]=f,c[e]),y=async()=>{const e=await u;R&&b(),R=p(10),_.forEach((async t=>{const n=await m(t,e);n.readyState===WebSocket.OPEN?g(n,e):n.readyState!==WebSocket.CONNECTING&&g(await m(t,e,!0),e)}))},b=()=>{(0,r.entries)(R).forEach((([e,{peer:t}])=>{k[e]||n[e]||t.destroy()})),k={}},w=(e,t,i)=>{v(e,t),n[t]=!0,i&&(n[i]=!0)},E=(e,t,i)=>{delete n[t],e.destroy();i in R&&(delete R[i],R={...R,...p(1)})};let R,C=33,T=setInterval(y,1e3*C),v=r.noOp,k={};return a[t]=!0,y(),(0,s.default)((e=>v=e),(async()=>{const e=await u;_.forEach((t=>delete d[t][e])),delete a[t],clearInterval(T),b()}))}))})),t.register("dZ1ej",(function(n,i){e(n.exports,"default",(function(){return d}));var s=t("cQlYm");const r=Object.getPrototypeOf(Uint8Array),o=16369,a=255,c="bufferedamountlow";var d=(e,t)=>{const n={},i={},d={},h={},l={},_={},u=(e,t)=>(e?Array.isArray(e)?e:[e]:(0,s.keys)(n)).flatMap((e=>{const i=n[e];return i?t(e,i):(console.warn(`${s.libName}: no peer with id ${e} found`),[])})),p=e=>{if(!e)throw(0,s.mkErr)("action type argument is required");const t=(0,s.encodeBytes)(e);if(t.byteLength>12)throw(0,s.mkErr)(`action type string "${e}" (${t.byteLength}b) exceeds byte limit (12). Hint: choose a shorter name.`);const d=new Uint8Array(12);d.set(t);const h=(0,s.decodeBytes)(d);if(i[h])throw(0,s.mkErr)(`action '${e}' already registered`);let l=0;return i[h]={onComplete:s.noOp,onProgress:s.noOp},[async(e,t,i,h)=>{if(i&&"object"!=typeof i)throw(0,s.mkErr)("action meta argument must be an object");if(void 0===e)throw(0,s.mkErr)("action data cannot be undefined");const _="string"!=typeof e,p=e instanceof Blob,f=p||e instanceof ArrayBuffer||e instanceof r;if(i&&!f)throw(0,s.mkErr)("action meta argument can only be used with binary data");const g=f?new Uint8Array(p?await e.arrayBuffer():e):(0,s.encodeBytes)(_?JSON.stringify(e):e),m=i?(0,s.encodeBytes)(JSON.stringify(i)):null,y=Math.ceil(g.byteLength/o)+(i?1:0),b=new Array(y).fill().map(((e,t)=>{const n=t===y-1,s=i&&0===t,r=new Uint8Array(15+(s?m.byteLength:n?g.byteLength-o*(y-(i?2:1)):o));return r.set(d),r.set([l],12),r.set([n|s<<1|f<<2|_<<3],13),r.set([Math.round((t+1)/y*a)],14),r.set(i?s?m:g.subarray((t-1)*o,t*o):g.subarray(t*o,(t+1)*o),15),r}));return l=l+1&a,Promise.all(u(t,(async(e,t)=>{const s=t._channel;let r=0;for(;r<y;){const o=b[r];if(s.bufferedAmount>s.bufferedAmountLowThreshold&&await new Promise((e=>{const t=()=>{s.removeEventListener(c,t),e()};s.addEventListener(c,t)})),!n[e])break;t.send(o),r++,h&&h(o[14]/a,e,i)}})))},e=>i[h]={...i[h],onComplete:e},e=>i[h]={...i[h],onProgress:e}]},f=(e,t)=>{const n=new Uint8Array(t),r=(0,s.decodeBytes)(n.subarray(0,12)),[o]=n.subarray(12,13),[c]=n.subarray(13,14),[h]=n.subarray(14,15),l=n.subarray(15),_=!!(1&c),u=!!(2&c),p=!!(4&c),f=!!(8&c);if(!i[r])throw(0,s.mkErr)(`received message with unregistered type (${r})`);d[e]||(d[e]={}),d[e][r]||(d[e][r]={});let g=d[e][r][o];if(g||(g=d[e][r][o]={chunks:[]}),u?g.meta=JSON.parse((0,s.decodeBytes)(l)):g.chunks.push(l),i[r].onProgress(h/a,e,g.meta),!_)return;const m=(0,s.combineChunks)(g.chunks);if(p)i[r].onComplete(m,e,g.meta);else{const t=(0,s.decodeBytes)(m);i[r].onComplete(f?JSON.parse(t):t,e)}delete d[e][r][o]},[g,m]=p("__91n6__"),[y,b]=p("__90n6__"),[w,E]=p("__516n4L__"),[R,C]=p("__57r34m__"),[T,v]=p("__7r4ck__");let k=s.noOp,S=s.noOp,A=s.noOp,N=s.noOp;return e(((e,t)=>{if(n[t])return;const i=f.bind(null,t);n[t]=e,e.on(s.events.signal,(e=>w(e,t))),e.on(s.events.close,(()=>(e=>{n[e]&&(delete n[e],delete d[e],delete h[e],S(e))})(t))),e.on(s.events.data,i),e.on(s.events.stream,(e=>{A(e,t,l[t]),delete l[t]})),e.on(s.events.track,((e,n)=>{N(e,n,t,_[t]),delete _[t]})),e.on(s.events.error,(e=>{"ERR_DATA_CHANNEL"!==e.code&&console.error(e)})),k(t),e.__drainEarlyData(i)})),m(((e,t)=>y(null,t))),b(((e,t)=>{h[t]&&(h[t](),delete h[t])})),E(((e,t)=>{n[t]&&n[t].signal(e)})),C(((e,t)=>l[t]=e)),v(((e,t)=>_[t]=e)),{makeAction:p,ping:async e=>{if(!e)throw(0,s.mkErr)("ping() must be called with target peer ID");const t=Date.now();return g(null,e),await new Promise((t=>h[e]=t)),Date.now()-t},leave:()=>{(0,s.entries)(n).forEach((([e,t])=>{t.destroy(),delete n[e]})),t()},getPeers:()=>(0,s.keys)(n),addStream:(e,t,n)=>u(t,(async(t,i)=>{n&&await R(n,t),i.addStream(e)})),removeStream:(e,t)=>u(t,((t,n)=>n.removeStream(e))),addTrack:(e,t,n,i)=>u(n,(async(n,s)=>{i&&await T(i,n),s.addTrack(e,t)})),removeTrack:(e,t,n)=>u(n,((n,i)=>i.removeTrack(e,t))),replaceTrack:(e,t,n,i,s)=>u(i,(async(i,r)=>{s&&await T(s,i),r.replaceTrack(e,t,n)})),onPeerJoin:e=>k=e,onPeerLeave:e=>S=e,onPeerStream:e=>A=e,onPeerTrack:e=>N=e}}})),t.register("cQlYm",(function(n,i){e(n.exports,"initPeer",(function(){return o})),e(n.exports,"events",(function(){return b})),e(n.exports,"genId",(function(){return a})),e(n.exports,"initGuard",(function(){return c})),e(n.exports,"mkErr",(function(){return g})),e(n.exports,"libName",(function(){return d})),e(n.exports,"selfId",(function(){return h})),e(n.exports,"keys",(function(){return l})),e(n.exports,"values",(function(){return _})),e(n.exports,"entries",(function(){return u})),e(n.exports,"fromEntries",(function(){return p})),e(n.exports,"noOp",(function(){return f})),e(n.exports,"encodeBytes",(function(){return m})),e(n.exports,"decodeBytes",(function(){return y})),e(n.exports,"combineChunks",(function(){return w}));var s=t("ckS7t");const r="0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz",o=(e,t,n)=>{const i=new(0,s.default)({initiator:e,trickle:t,config:n}),r=e=>i.__earlyDataBuffer.push(e);return i.on(b.data,r),i.__earlyDataBuffer=[],i.__drainEarlyData=e=>{i.off(b.data,r),i.__earlyDataBuffer.forEach(e),delete i.__earlyDataBuffer,delete i.__drainEarlyData},i},a=e=>new Array(e).fill().map((()=>r[Math.floor(Math.random()*r.length)])).join(""),c=(e,t)=>(n,i)=>{if(e[i])throw g(`already joined room ${i}`);if(!n)throw g("requires a config map as the first argument");if(!n.appId&&!n.firebaseApp)throw g("config map is missing appId field");if(!i)throw g("namespace argument required");return t(n,i)},d="Trystero",h=a(20),{keys:l,values:_,entries:u,fromEntries:p}=Object,f=()=>{},g=e=>new Error(`${d}: ${e}`),m=e=>(new TextEncoder).encode(e),y=e=>(new TextDecoder).decode(e),b=p(["close","connect","data","error","signal","stream","track"].map((e=>[e,e]))),w=e=>{const t=new Uint8Array(e.reduce(((e,t)=>e+t.byteLength),0));return e.reduce(((e,n)=>(t.set(n,e),e+n.byteLength)),0),t}})),t.register("ckS7t",(function(t,n){e(t.exports,"default",(function(){return c}));function i(e){const t=new Uint8Array(e);for(let n=0;n<e;n++)t[n]=256*Math.random()|0;return t}function s(){if("undefined"==typeof globalThis)return null;const e={RTCPeerConnection:globalThis.RTCPeerConnection||globalThis.mozRTCPeerConnection||globalThis.webkitRTCPeerConnection,RTCSessionDescription:globalThis.RTCSessionDescription||globalThis.mozRTCSessionDescription||globalThis.webkitRTCSessionDescription,RTCIceCandidate:globalThis.RTCIceCandidate||globalThis.mozRTCIceCandidate||globalThis.webkitRTCIceCandidate};return e.RTCPeerConnection?e:null}function r(e,t){return Object.defineProperty(e,"code",{value:t,enumerable:!0,configurable:!0}),e}function o(e){return e.replace(/a=ice-options:trickle\s\n/g,"")}class a{get bufferSize(){return this._channel&&this._channel.bufferedAmount||0}get connected(){return this._connected&&"open"===this._channel.readyState}address(){return{port:this.localPort,family:this.localFamily,address:this.localAddress}}signal(e){if(!this.destroying){if(this.destroyed)throw r(new Error("cannot signal after peer is destroyed"),"ERR_DESTROYED");if("string"==typeof e)try{e=JSON.parse(e)}catch(t){e={}}this._debug("signal()"),e.renegotiate&&this.initiator&&(this._debug("got request to renegotiate"),this._needsNegotiation()),e.transceiverRequest&&this.initiator&&(this._debug("got request for transceiver"),this.addTransceiver(e.transceiverRequest.kind,e.transceiverRequest.init)),e.candidate&&(this._pc.remoteDescription&&this._pc.remoteDescription.type?this._addIceCandidate(e.candidate):this._pendingCandidates.push(e.candidate)),e.sdp&&this._pc.setRemoteDescription(new this._wrtc.RTCSessionDescription(e)).then((()=>{this.destroyed||(this._pendingCandidates.forEach((e=>{this._addIceCandidate(e)})),this._pendingCandidates=[],"offer"===this._pc.remoteDescription.type&&this._createAnswer())})).catch((e=>{this.destroy(r(e,"ERR_SET_REMOTE_DESCRIPTION"))})),e.sdp||e.candidate||e.renegotiate||e.transceiverRequest||this.destroy(r(new Error("signal() called with invalid signal data"),"ERR_SIGNALING"))}}_addIceCandidate(e){const t=new this._wrtc.RTCIceCandidate(e);this._pc.addIceCandidate(t).catch((e=>{var n;!t.address||t.address.endsWith(".local")?(n="Ignoring unsupported ICE candidate.",console.warn(n)):this.destroy(r(e,"ERR_ADD_ICE_CANDIDATE"))}))}send(e){if(!this.destroying){if(this.destroyed)throw r(new Error("cannot send after peer is destroyed"),"ERR_DESTROYED");this._channel.send(e)}}addTransceiver(e,t){if(!this.destroying){if(this.destroyed)throw r(new Error("cannot addTransceiver after peer is destroyed"),"ERR_DESTROYED");if(this._debug("addTransceiver()"),this.initiator)try{this._pc.addTransceiver(e,t),this._needsNegotiation()}catch(e){this.destroy(r(e,"ERR_ADD_TRANSCEIVER"))}else this.emit("signal",{type:"transceiverRequest",transceiverRequest:{kind:e,init:t}})}}addStream(e){if(!this.destroying){if(this.destroyed)throw r(new Error("cannot addStream after peer is destroyed"),"ERR_DESTROYED");this._debug("addStream()"),e.getTracks().forEach((t=>{this.addTrack(t,e)}))}}addTrack(e,t){if(this.destroying)return;if(this.destroyed)throw r(new Error("cannot addTrack after peer is destroyed"),"ERR_DESTROYED");this._debug("addTrack()");const n=this._senderMap.get(e)||new Map;let i=n.get(t);if(i)throw i.removed?r(new Error("Track has been removed. You should enable/disable tracks that you want to re-add."),"ERR_SENDER_REMOVED"):r(new Error("Track has already been added to that stream."),"ERR_SENDER_ALREADY_ADDED");i=this._pc.addTrack(e,t),n.set(t,i),this._senderMap.set(e,n),this._needsNegotiation()}replaceTrack(e,t,n){if(this.destroying)return;if(this.destroyed)throw r(new Error("cannot replaceTrack after peer is destroyed"),"ERR_DESTROYED");this._debug("replaceTrack()");const i=this._senderMap.get(e),s=i?i.get(n):null;if(!s)throw r(new Error("Cannot replace track that was never added."),"ERR_TRACK_NOT_ADDED");t&&this._senderMap.set(t,i),null!=s.replaceTrack?s.replaceTrack(t):this.destroy(r(new Error("replaceTrack is not supported in this browser"),"ERR_UNSUPPORTED_REPLACETRACK"))}removeTrack(e,t){if(this.destroying)return;if(this.destroyed)throw r(new Error("cannot removeTrack after peer is destroyed"),"ERR_DESTROYED");this._debug("removeSender()");const n=this._senderMap.get(e),i=n?n.get(t):null;if(!i)throw r(new Error("Cannot remove track that was never added."),"ERR_TRACK_NOT_ADDED");try{i.removed=!0,this._pc.removeTrack(i)}catch(e){"NS_ERROR_UNEXPECTED"===e.name?this._sendersAwaitingStable.push(i):this.destroy(r(e,"ERR_REMOVE_TRACK"))}this._needsNegotiation()}removeStream(e){if(!this.destroying){if(this.destroyed)throw r(new Error("cannot removeStream after peer is destroyed"),"ERR_DESTROYED");this._debug("removeSenders()"),e.getTracks().forEach((t=>{this.removeTrack(t,e)}))}}_needsNegotiation(){this._debug("_needsNegotiation"),this._batchedNegotiation||(this._batchedNegotiation=!0,queueMicrotask((()=>{this._batchedNegotiation=!1,this.initiator||!this._firstNegotiation?(this._debug("starting batched negotiation"),this.negotiate()):this._debug("non-initiator initial negotiation request discarded"),this._firstNegotiation=!1})))}negotiate(){if(!this.destroying){if(this.destroyed)throw r(new Error("cannot negotiate after peer is destroyed"),"ERR_DESTROYED");this.initiator?this._isNegotiating?(this._queuedNegotiation=!0,this._debug("already negotiating, queueing")):(this._debug("start negotiation"),setTimeout((()=>{this._createOffer()}),0)):this._isNegotiating?(this._queuedNegotiation=!0,this._debug("already negotiating, queueing")):(this._debug("requesting negotiation from initiator"),this.emit("signal",{type:"renegotiate",renegotiate:!0})),this._isNegotiating=!0}}destroy(e){this.destroyed||this.destroying||(this.destroying=!0,this._debug("destroying (error: %s)",e&&(e.message||e)),queueMicrotask((()=>{if(this.destroyed=!0,this.destroying=!1,this._debug("destroy (error: %s)",e&&(e.message||e)),this._connected=!1,this._pcReady=!1,this._channelReady=!1,this._remoteTracks=null,this._remoteStreams=null,this._senderMap=null,clearInterval(this._closingInterval),this._closingInterval=null,clearInterval(this._interval),this._interval=null,this._chunk=null,this._cb=null,this._channel){try{this._channel.close()}catch(e){}this._channel.onmessage=null,this._channel.onopen=null,this._channel.onclose=null,this._channel.onerror=null}if(this._pc){try{this._pc.close()}catch(e){}this._pc.oniceconnectionstatechange=null,this._pc.onicegatheringstatechange=null,this._pc.onsignalingstatechange=null,this._pc.onicecandidate=null,this._pc.ontrack=null,this._pc.ondatachannel=null}this._pc=null,this._channel=null,e&&this.emit("error",e),this.emit("close")})))}_setupData(e){if(!e.channel)return this.destroy(r(new Error("Data channel event is missing `channel` property"),"ERR_DATA_CHANNEL"));this._channel=e.channel,this._channel.binaryType="arraybuffer","number"==typeof this._channel.bufferedAmountLowThreshold&&(this._channel.bufferedAmountLowThreshold=65536),this.channelName=this._channel.label,this._channel.onmessage=e=>{this._onChannelMessage(e)},this._channel.onbufferedamountlow=()=>{this._onChannelBufferedAmountLow()},this._channel.onopen=()=>{this._onChannelOpen()},this._channel.onclose=()=>{this._onChannelClose()},this._channel.onerror=e=>{this.destroy(r(e,"ERR_DATA_CHANNEL"))};let t=!1;this._closingInterval=setInterval((()=>{this._channel&&"closing"===this._channel.readyState?(t&&this._onChannelClose(),t=!0):t=!1}),5e3)}_startIceCompleteTimeout(){this.destroyed||this._iceCompleteTimer||(this._debug("started iceComplete timeout"),this._iceCompleteTimer=setTimeout((()=>{this._iceComplete||(this._iceComplete=!0,this._debug("iceComplete timeout completed"),this.emit("iceTimeout"),this.emit("_iceComplete"))}),this.iceCompleteTimeout))}_createOffer(){this.destroyed||this._pc.createOffer(this.offerOptions).then((e=>{if(this.destroyed)return;this.trickle||this.allowHalfTrickle||(e.sdp=o(e.sdp)),e.sdp=this.sdpTransform(e.sdp);const t=()=>{if(this.destroyed)return;const t=this._pc.localDescription||e;this._debug("signal"),this.emit("signal",{type:t.type,sdp:t.sdp})};this._pc.setLocalDescription(e).then((()=>{this._debug("createOffer success"),this.destroyed||(this.trickle||this._iceComplete?t():this.once("_iceComplete",t))})).catch((e=>{this.destroy(r(e,"ERR_SET_LOCAL_DESCRIPTION"))}))})).catch((e=>{this.destroy(r(e,"ERR_CREATE_OFFER"))}))}_requestMissingTransceivers(){this._pc.getTransceivers&&this._pc.getTransceivers().forEach((e=>{e.mid||!e.sender.track||e.requested||(e.requested=!0,this.addTransceiver(e.sender.track.kind))}))}_createAnswer(){this.destroyed||this._pc.createAnswer(this.answerOptions).then((e=>{if(this.destroyed)return;this.trickle||this.allowHalfTrickle||(e.sdp=o(e.sdp)),e.sdp=this.sdpTransform(e.sdp);const t=()=>{if(this.destroyed)return;const t=this._pc.localDescription||e;this._debug("signal"),this.emit("signal",{type:t.type,sdp:t.sdp}),this.initiator||this._requestMissingTransceivers()};this._pc.setLocalDescription(e).then((()=>{this.destroyed||(this.trickle||this._iceComplete?t():this.once("_iceComplete",t))})).catch((e=>{this.destroy(r(e,"ERR_SET_LOCAL_DESCRIPTION"))}))})).catch((e=>{this.destroy(r(e,"ERR_CREATE_ANSWER"))}))}_onConnectionStateChange(){this.destroyed||"failed"===this._pc.connectionState&&this.destroy(r(new Error("Connection failed."),"ERR_CONNECTION_FAILURE"))}_onIceStateChange(){if(this.destroyed)return;const e=this._pc.iceConnectionState,t=this._pc.iceGatheringState;this._debug("iceStateChange (connection: %s) (gathering: %s)",e,t),this.emit("iceStateChange",e,t),"connected"!==e&&"completed"!==e||(this._pcReady=!0,this._maybeReady()),"failed"===e&&this.destroy(r(new Error("Ice connection failed."),"ERR_ICE_CONNECTION_FAILURE")),"closed"===e&&this.destroy(r(new Error("Ice connection closed."),"ERR_ICE_CONNECTION_CLOSED"))}getStats(e){const t=e=>("[object Array]"===Object.prototype.toString.call(e.values)&&e.values.forEach((t=>{Object.assign(e,t)})),e);0===this._pc.getStats.length||this._isReactNativeWebrtc?this._pc.getStats().then((n=>{const i=[];n.forEach((e=>{i.push(t(e))})),e(null,i)}),(t=>e(t))):this._pc.getStats.length>0?this._pc.getStats((n=>{if(this.destroyed)return;const i=[];n.result().forEach((e=>{const n={};e.names().forEach((t=>{n[t]=e.stat(t)})),n.id=e.id,n.type=e.type,n.timestamp=e.timestamp,i.push(t(n))})),e(null,i)}),(t=>e(t))):e(null,[])}_maybeReady(){if(this._debug("maybeReady pc %s channel %s",this._pcReady,this._channelReady),this._connected||this._connecting||!this._pcReady||!this._channelReady)return;this._connecting=!0;const e=()=>{this.destroyed||this.getStats(((t,n)=>{if(this.destroyed)return;t&&(n=[]);const i={},s={},o={};let a=!1;n.forEach((e=>{"remotecandidate"!==e.type&&"remote-candidate"!==e.type||(i[e.id]=e),"localcandidate"!==e.type&&"local-candidate"!==e.type||(s[e.id]=e),"candidatepair"!==e.type&&"candidate-pair"!==e.type||(o[e.id]=e)}));const c=e=>{a=!0;let t=s[e.localCandidateId];t&&(t.ip||t.address)?(this.localAddress=t.ip||t.address,this.localPort=Number(t.port)):t&&t.ipAddress?(this.localAddress=t.ipAddress,this.localPort=Number(t.portNumber)):"string"==typeof e.googLocalAddress&&(t=e.googLocalAddress.split(":"),this.localAddress=t[0],this.localPort=Number(t[1])),this.localAddress&&(this.localFamily=this.localAddress.includes(":")?"IPv6":"IPv4");let n=i[e.remoteCandidateId];n&&(n.ip||n.address)?(this.remoteAddress=n.ip||n.address,this.remotePort=Number(n.port)):n&&n.ipAddress?(this.remoteAddress=n.ipAddress,this.remotePort=Number(n.portNumber)):"string"==typeof e.googRemoteAddress&&(n=e.googRemoteAddress.split(":"),this.remoteAddress=n[0],this.remotePort=Number(n[1])),this.remoteAddress&&(this.remoteFamily=this.remoteAddress.includes(":")?"IPv6":"IPv4"),this._debug("connect local: %s:%s remote: %s:%s",this.localAddress,this.localPort,this.remoteAddress,this.remotePort)};if(n.forEach((e=>{"transport"===e.type&&e.selectedCandidatePairId&&c(o[e.selectedCandidatePairId]),("googCandidatePair"===e.type&&"true"===e.googActiveConnection||("candidatepair"===e.type||"candidate-pair"===e.type)&&e.selected)&&c(e)})),a||Object.keys(o).length&&!Object.keys(s).length){if(this._connecting=!1,this._connected=!0,this._chunk){try{this.send(this._chunk)}catch(t){return this.destroy(r(t,"ERR_DATA_CHANNEL"))}this._chunk=null,this._debug('sent chunk from "write before connect"');const e=this._cb;this._cb=null,e(null)}"number"!=typeof this._channel.bufferedAmountLowThreshold&&(this._interval=setInterval((()=>this._onInterval()),150),this._interval.unref&&this._interval.unref()),this._debug("connect"),this.emit("connect")}else setTimeout(e,100)}))};e()}_onInterval(){!this._cb||!this._channel||this._channel.bufferedAmount>65536||this._onChannelBufferedAmountLow()}_onSignalingStateChange(){this.destroyed||("stable"===this._pc.signalingState&&(this._isNegotiating=!1,this._debug("flushing sender queue",this._sendersAwaitingStable),this._sendersAwaitingStable.forEach((e=>{this._pc.removeTrack(e),this._queuedNegotiation=!0})),this._sendersAwaitingStable=[],this._queuedNegotiation?(this._debug("flushing negotiation queue"),this._queuedNegotiation=!1,this._needsNegotiation()):(this._debug("negotiated"),this.emit("negotiated"))),this._debug("signalingStateChange %s",this._pc.signalingState),this.emit("signalingStateChange",this._pc.signalingState))}_onIceCandidate(e){this.destroyed||(e.candidate&&this.trickle?this.emit("signal",{type:"candidate",candidate:{candidate:e.candidate.candidate,sdpMLineIndex:e.candidate.sdpMLineIndex,sdpMid:e.candidate.sdpMid}}):e.candidate||this._iceComplete||(this._iceComplete=!0,this.emit("_iceComplete")),e.candidate&&this._startIceCompleteTimeout())}_onChannelMessage(e){if(this.destroyed)return;let t=e.data;t instanceof ArrayBuffer&&(t=new Uint8Array(t)),this.emit("data",t)}_onChannelBufferedAmountLow(){if(this.destroyed||!this._cb)return;this._debug("ending backpressure: bufferedAmount %d",this._channel.bufferedAmount);const e=this._cb;this._cb=null,e(null)}_onChannelOpen(){this._connected||this.destroyed||(this._debug("on channel open"),this._channelReady=!0,this._maybeReady())}_onChannelClose(){this.destroyed||(this._debug("on channel close"),this.destroy())}_onTrack(e){this.destroyed||e.streams.forEach((t=>{this._debug("on track"),this.emit("track",e.track,t),this._remoteTracks.push({track:e.track,stream:t}),this._remoteStreams.some((e=>e.id===t.id))||(this._remoteStreams.push(t),queueMicrotask((()=>{this._debug("on stream"),this.emit("stream",t)})))}))}_debug(...e){this._doDebug&&(e[0]="["+this._id+"] "+e[0],console.log(...e))}on(e,t){const n=this._map;n.has(e)||n.set(e,new Set),n.get(e).add(t)}off(e,t){const n=this._map,i=n.get(e);i&&(i.delete(t),0===i.size&&n.delete(e))}once(e,t){const n=(...i)=>{this.off(e,n),t(...i)};this.on(e,n)}emit(e,...t){const n=this._map;if(n.has(e))for(const i of n.get(e))try{i(...t)}catch(e){console.error(e)}}constructor(e={}){if(this._map=new Map,this._id=i(4).toString("hex").slice(0,7),this._doDebug=e.debug,this._debug("new peer %o",e),this.channelName=e.initiator?e.channelName||i(20).toString("hex"):null,this.initiator=e.initiator||!1,this.channelConfig=e.channelConfig||a.channelConfig,this.channelNegotiated=this.channelConfig.negotiated,this.config=Object.assign({},a.config,e.config),this.offerOptions=e.offerOptions||{},this.answerOptions=e.answerOptions||{},this.sdpTransform=e.sdpTransform||(e=>e),this.streams=e.streams||(e.stream?[e.stream]:[]),this.trickle=void 0===e.trickle||e.trickle,this.allowHalfTrickle=void 0!==e.allowHalfTrickle&&e.allowHalfTrickle,this.iceCompleteTimeout=e.iceCompleteTimeout||5e3,this.destroyed=!1,this.destroying=!1,this._connected=!1,this.remoteAddress=void 0,this.remoteFamily=void 0,this.remotePort=void 0,this.localAddress=void 0,this.localFamily=void 0,this.localPort=void 0,this._wrtc=e.wrtc&&"object"==typeof e.wrtc?e.wrtc:s(),!this._wrtc)throw"undefined"==typeof window?r(new Error("No WebRTC support: Specify `opts.wrtc` option in this environment"),"ERR_WEBRTC_SUPPORT"):r(new Error("No WebRTC support: Not a supported browser"),"ERR_WEBRTC_SUPPORT");this._pcReady=!1,this._channelReady=!1,this._iceComplete=!1,this._iceCompleteTimer=null,this._channel=null,this._pendingCandidates=[],this._isNegotiating=!1,this._firstNegotiation=!0,this._batchedNegotiation=!1,this._queuedNegotiation=!1,this._sendersAwaitingStable=[],this._senderMap=new Map,this._closingInterval=null,this._remoteTracks=[],this._remoteStreams=[],this._chunk=null,this._cb=null,this._interval=null;try{this._pc=new this._wrtc.RTCPeerConnection(this.config)}catch(e){return void this.destroy(r(e,"ERR_PC_CONSTRUCTOR"))}this._isReactNativeWebrtc="number"==typeof this._pc._peerConnectionId,this._pc.oniceconnectionstatechange=()=>{this._onIceStateChange()},this._pc.onicegatheringstatechange=()=>{this._onIceStateChange()},this._pc.onconnectionstatechange=()=>{this._onConnectionStateChange()},this._pc.onsignalingstatechange=()=>{this._onSignalingStateChange()},this._pc.onicecandidate=e=>{this._onIceCandidate(e)},"object"==typeof this._pc.peerIdentity&&this._pc.peerIdentity.catch((e=>{this.destroy(r(e,"ERR_PC_PEER_IDENTITY"))})),this.initiator||this.channelNegotiated?this._setupData({channel:this._pc.createDataChannel(this.channelName,this.channelConfig)}):this._pc.ondatachannel=e=>{this._setupData(e)},this.streams&&this.streams.forEach((e=>{this.addStream(e)})),this._pc.ontrack=e=>{this._onTrack(e)},this._debug("initial negotiation"),this._needsNegotiation()}}a.WEBRTC_SUPPORT=!!s(),a.config={iceServers:[{urls:["stun:stun.l.google.com:19302","stun:global.stun.twilio.com:3478"]}],sdpSemantics:"unified-plan"},a.channelConfig={};var c=a})),t.register("lnAYI",(function(n,i){e(n.exports,"genKey",(function(){return o})),e(n.exports,"encrypt",(function(){return a})),e(n.exports,"decrypt",(function(){return c}));var s=t("cQlYm");const r="AES-CBC",o=async(e,t)=>crypto.subtle.importKey("raw",await crypto.subtle.digest({name:"SHA-256"},(0,s.encodeBytes)(`${e}:${t}`)),{name:r},!1,["encrypt","decrypt"]),a=async(e,t)=>{const n=crypto.getRandomValues(new Uint8Array(16));return JSON.stringify({c:(i=await crypto.subtle.encrypt({name:r,iv:n},await e,(0,s.encodeBytes)(t)),window.btoa(String.fromCharCode.apply(null,new Uint8Array(i)))),iv:[...n]});var i},c=async(e,t)=>{const{c:n,iv:i}=JSON.parse(t);return(0,s.decodeBytes)(await crypto.subtle.decrypt({name:r,iv:new Uint8Array(i)},await e,(e=>{const t=window.atob(e);return new Uint8Array(t.length).map(((e,n)=>t.charCodeAt(n))).buffer})(n)))}}))}();
//# sourceMappingURL=trystero.31d87074.js.map
