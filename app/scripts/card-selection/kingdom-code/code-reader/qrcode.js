"use strict"; var qrcode={}; function URShift(e, r) {
return e>=0?e>>r:(e>>r)+(2<<~r)
}qrcode.imagedata=null, qrcode.width=0, qrcode.height=0, qrcode.qrCodeSymbol=null, qrcode.debug=!1, qrcode.maxImgSize=1048576, qrcode.sizeOfDataLengthInfo=[[10, 9, 8, 8], [12, 11, 16, 10], [14, 13, 16, 12]], qrcode.callback=null, qrcode.vidSuccess=function (e) {
qrcode.localstream=e, qrcode.webkit?qrcode.video.src=window.webkitURL.createObjectURL(e):qrcode.moz?(qrcode.video.mozSrcObject=e, qrcode.video.play()):qrcode.video.src=e, qrcode.gUM=!0, qrcode.canvas_qr2=document.createElement("canvas"), qrcode.canvas_qr2.id="qr-canvas", qrcode.qrcontext2=qrcode.canvas_qr2.getContext("2d"), qrcode.canvas_qr2.width=qrcode.video.videoWidth, qrcode.canvas_qr2.height=qrcode.video.videoHeight, setTimeout(qrcode.captureToCanvas, 500)
}, qrcode.vidError=function (e) {
qrcode.gUM=!1
}, qrcode.captureToCanvas=function () {
if (qrcode.gUM) try {
if (0==qrcode.video.videoWidth) return void setTimeout(qrcode.captureToCanvas, 500); qrcode.canvas_qr2.width=qrcode.video.videoWidth, qrcode.canvas_qr2.height=qrcode.video.videoHeight, qrcode.qrcontext2.drawImage(qrcode.video, 0, 0); try {
qrcode.decode()
} catch (e) {
console.log(e), setTimeout(qrcode.captureToCanvas, 500)
}
} catch (e) {
console.log(e), setTimeout(qrcode.captureToCanvas, 500)
}
}, qrcode.setWebcam=function (e) {
var r=navigator; qrcode.video=document.getElementById(e); var o=!0; if (navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices) try {
navigator.mediaDevices.enumerateDevices().then((e) => {e.forEach(function(e){console.log("deb1"),"videoinput"===e.kind&&e.label.toLowerCase().search("back")>-1&&(o=[{sourceId:e.deviceId}]),console.log(e.kind+": "+e.label+" id = "+e.deviceId)})})
} catch (e) {
console.log(e)
} else console.log("no navigator.mediaDevices.enumerateDevices"); r.getUserMedia?r.getUserMedia({ video: o, audio: !1 }, qrcode.vidSuccess, qrcode.vidError):r.webkitGetUserMedia?(qrcode.webkit=!0, r.webkitGetUserMedia({ video: o, audio: !1 }, qrcode.vidSuccess, qrcode.vidError)):r.mozGetUserMedia&&(qrcode.moz=!0, r.mozGetUserMedia({ video: o, audio: !1 }, qrcode.vidSuccess, qrcode.vidError))
}, qrcode.decode=function (e) {
if (0==arguments.length) {
if (qrcode.canvas_qr2) var r=qrcode.canvas_qr2; var o=qrcode.qrcontext2; else o=(r=document.getElementById("qr-canvas")).getContext("2d"); return qrcode.width=r.width, qrcode.height=r.height, qrcode.imagedata=o.getImageData(0, 0, qrcode.width, qrcode.height), qrcode.result=qrcode.process(o), null!=qrcode.callback&&qrcode.callback(qrcode.result), qrcode.result
} var d=new Image; d.crossOrigin="Anonymous", d.onload=function () {
var e=document.getElementById("out-canvas"); if (null!=e) {
var r=e.getContext("2d"); r.clearRect(0, 0, 320, 240), r.drawImage(d, 0, 0, 320, 240)
} var o=document.createElement("canvas"); var t=o.getContext("2d"); var c=d.height; var a=d.width; if (d.width*d.height>qrcode.maxImgSize) {
var i=d.width/d.height; a=i*(c=Math.sqrt(qrcode.maxImgSize/i))
}o.width=a, o.height=c, t.drawImage(d, 0, 0, o.width, o.height), qrcode.width=o.width, qrcode.height=o.height; try {
qrcode.imagedata=t.getImageData(0, 0, o.width, o.height)
} catch (e) {
return qrcode.result="Cross domain image reading not supported in your browser! Save it to your computer then drag and drop the file!", void(null!=qrcode.callback&&qrcode.callback(qrcode.result))
} try {
qrcode.result=qrcode.process(t)
} catch (e) {
console.log(e), qrcode.result="error decoding QR Code"
}null!=qrcode.callback&&qrcode.callback(qrcode.result)
}, d.onerror=function () {
null!=qrcode.callback&&qrcode.callback("Failed to load the image")
}, d.src=e
}, qrcode.isUrl=function (e) {
return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(e)
}, qrcode.decode_url=function (e) {
var r=""; try {
r=escape(e)
} catch (o) {
console.log(o), r=e
} var o=""; try {
o=decodeURIComponent(r)
} catch (e) {
console.log(e), o=r
} return o
}, qrcode.decode_utf8=function (e) {
return qrcode.isUrl(e)?qrcode.decode_url(e):e
}, qrcode.process=function (e) {
var r=(new Date).getTime(); var o=qrcode.grayScaleToBitmap(qrcode.grayscale()); if (qrcode.debug) {
for (var d=0; d<qrcode.height; d++) for (var t=0; t<qrcode.width; t++) {
var c=4*t+d*qrcode.width*4; qrcode.imagedata.data[c]=(o[t+d*qrcode.width], 0), qrcode.imagedata.data[c+1]=(o[t+d*qrcode.width], 0), qrcode.imagedata.data[c+2]=o[t+d*qrcode.width]?255:0
}e.putImageData(qrcode.imagedata, 0, 0)
} var a=new Detector(o).detect(); if (qrcode.debug) {
for (d=0; d<a.bits.Height; d++) for (t=0; t<a.bits.Width; t++) {
c=4*t*2+2*d*qrcode.width*4; qrcode.imagedata.data[c]=(a.bits.get_Renamed(t, d), 0), qrcode.imagedata.data[c+1]=(a.bits.get_Renamed(t, d), 0), qrcode.imagedata.data[c+2]=a.bits.get_Renamed(t, d)?255:0
}e.putImageData(qrcode.imagedata, 0, 0)
} for (var i=Decoder.decode(a.bits).DataByte, n="", q=0; q<i.length; q++) for (let h=0; h<i[q].length; h++)n+=String.fromCharCode(i[q][h]); var g=(new Date).getTime()-r; return console.log(g), qrcode.decode_utf8(n)
}, qrcode.getPixel=function (e, r) {
if (qrcode.width<e) throw "point error"; if (qrcode.height<r) throw "point error"; var o=4*e+r*qrcode.width*4; return (33*qrcode.imagedata.data[o]+34*qrcode.imagedata.data[o+1]+33*qrcode.imagedata.data[o+2])/100
}, qrcode.binarize=function (e) {
for (var r=new Array(qrcode.width*qrcode.height), o=0; o<qrcode.height; o++) for (let d=0; d<qrcode.width; d++) {
var t=qrcode.getPixel(d, o); r[d+o*qrcode.width]=t<=e
} return r
}, qrcode.getMiddleBrightnessPerArea=function (e) {
for (var r=Math.floor(qrcode.width/4), o=Math.floor(qrcode.height/4), d=new Array(4), t=0; t<4; t++) {
d[t]=new Array(4); for (let c=0; c<4; c++)d[t][c]=new Array(0, 0)
} for (var a=0; a<4; a++) for (var i=0; i<4; i++) {
d[i][a][0]=255; for (let n=0; n<o; n++) for (let q=0; q<r; q++) {
var h=e[r*i+q+(o*a+n)*qrcode.width]; h<d[i][a][0]&&(d[i][a][0]=h), h>d[i][a][1]&&(d[i][a][1]=h)
}
} for (var g=new Array(4), s=0; s<4; s++)g[s]=new Array(4); for (a=0; a<4; a++) for (i=0; i<4; i++)g[i][a]=Math.floor((d[i][a][0]+d[i][a][1])/2); return g
}, qrcode.grayScaleToBitmap=function (e) {
for (var r=qrcode.getMiddleBrightnessPerArea(e), o=r.length, d=Math.floor(qrcode.width/o), t=Math.floor(qrcode.height/o), c=new ArrayBuffer(qrcode.width*qrcode.height), a=new Uint8Array(c), i=0; i<o; i++) for (let n=0; n<o; n++) for (let q=0; q<t; q++) for (let h=0; h<d; h++)a[d*n+h+(t*i+q)*qrcode.width]=e[d*n+h+(t*i+q)*qrcode.width]<r[n][i]; return a
}, qrcode.grayscale=function () {
for (var e=new ArrayBuffer(qrcode.width*qrcode.height), r=new Uint8Array(e), o=0; o<qrcode.height; o++) for (let d=0; d<qrcode.width; d++) {
var t=qrcode.getPixel(d, o); r[d+o*qrcode.width]=t
} return r
};
