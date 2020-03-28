"use strict"; function QRCodeDataBlockReader(t, i, e) {
    this.blockPointer=0, this.bitPointer=7, this.dataLength=0, this.blocks=t, this.numErrorCorrectionCode=e, i<=9?this.dataLengthMode=0:i>=10&&i<=26?this.dataLengthMode=1:i>=27&&i<=40&&(this.dataLengthMode=2), this.getNextBits=function (t) {
        let i=0; if (t<this.bitPointer+1) {
            for (var e=0, r=0; r<t; r++)e+=1<<r; return e<<=this.bitPointer-t+1, i=(this.blocks[this.blockPointer]&e)>>this.bitPointer-t+1, this.bitPointer-=t, i;
        } if (t<this.bitPointer+1+8) {
            var s=0; for (r=0; r<this.bitPointer+1; r++)s+=1<<r; return i=(this.blocks[this.blockPointer]&s)<<t-(this.bitPointer+1), this.blockPointer++, i+=this.blocks[this.blockPointer]>>8-(t-(this.bitPointer+1)), this.bitPointer=this.bitPointer-t%8, this.bitPointer<0&&(this.bitPointer=8+this.bitPointer), i;
        } if (t<this.bitPointer+1+16) {
            s=0; let h=0; for (r=0; r<this.bitPointer+1; r++)s+=1<<r; const n=(this.blocks[this.blockPointer]&s)<<t-(this.bitPointer+1); this.blockPointer++; const o=this.blocks[this.blockPointer]<<t-(this.bitPointer+1+8); this.blockPointer++; for (r=0; r<t-(this.bitPointer+1+8); r++)h+=1<<r; return h<<=8-(t-(this.bitPointer+1+8)), i=n+o+((this.blocks[this.blockPointer]&h)>>8-(t-(this.bitPointer+1+8))), this.bitPointer=this.bitPointer-(t-8)%8, this.bitPointer<0&&(this.bitPointer=8+this.bitPointer), i;
        } return 0;
    }, this.NextMode=function () {
        return this.blockPointer> this.blocks.length-this.numErrorCorrectionCode-2?0:this.getNextBits(4);
    }, this.getDataLength=function (t) {
        for (var i=0; t>>i!=1;)i++; return this.getNextBits(qrcode.sizeOfDataLengthInfo[this.dataLengthMode][i]);
    }, this.getRomanAndFigureString=function (t) {
        let i=t; let e=0; let r=""; const s=new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ", "$", "%", "*", "+", "-", ".", "/", ":"); do {
            if (i>1) {
                const h=(e=this.getNextBits(11))%45; r+=s[Math.floor(e/45)], r+=s[h], i-=2;
            } else 1==i&&(r+=s[e=this.getNextBits(6)], i-=1);
        } while (i>0);return r;
    }, this.getFigureString=function (t) {
        let i=t; let e=0; let r=""; do {
            i>=3?((e=this.getNextBits(10))<100&&(r+="0"), e<10&&(r+="0"), i-=3):2==i?((e=this.getNextBits(7))<10&&(r+="0"), i-=2):1==i&&(e=this.getNextBits(4), i-=1), r+=e;
        } while (i>0);return r;
    }, this.get8bitByteArray=function (t) {
        let i=t; let e=0; const r=new Array; do {
            e=this.getNextBits(8), r.push(e), i--;
        } while (i>0);return r;
    }, this.getKanjiString=function (t) {
        let i=t; let e=0; let r=""; do {
            const s=((e=this.getNextBits(13))/192<<8)+e%192; let h=0; h=s+33088<=40956?s+33088:s+49472, r+=String.fromCharCode(h), i--;
        } while (i>0);return r;
    }, this.parseECIValue=function () {
        let t=0; const i=this.getNextBits(8); (0==(128&i)&&(t=127&i), 128==(192&i))&&(t=(63&i)<<8|this.getNextBits(8)); 192==(224&i)&&(t=(31&i)<<16|this.getNextBits(8)); return t;
    }, this.__defineGetter__("DataByte", function () {
        for (var t=new Array; ;) {
            const i=this.NextMode(); if (0==i) {
                if (t.length>0) break; throw "Empty data block";
            } if (1!=i&&2!=i&&4!=i&&8!=i&&7!=i) throw `Invalid mode: ${i} in (block:${this.blockPointer} bit:${this.bitPointer})`; if (7==i) var e=this.parseECIValue(); else {
                const r=this.getDataLength(i); if (r<1) throw `Invalid data length: ${r}`; switch (i) {
                    case 1: for (var s=this.getFigureString(r), h=new Array(s.length), n=0; n<s.length; n++)h[n]=s.charCodeAt(n); t.push(h); break; case 2: for (s=this.getRomanAndFigureString(r), h=new Array(s.length), n=0; n<s.length; n++)h[n]=s.charCodeAt(n); t.push(h); break; case 4: e=this.get8bitByteArray(r); t.push(e); break; case 8: s=this.getKanjiString(r); t.push(s);
                }
            }
        } return t;
    });
}
