"use strict"; function GF256(e) {
    this.expTable=new Array(256), this.logTable=new Array(256); for (var t=1, r=0; r<256; r++) this.expTable[r]=t, (t<<=1)>=256&&(t^=e); for (r=0; r<255; r++) this.logTable[this.expTable[r]]=r; const i=new Array(1); i[0]=0, this.zero=new GF256Poly(this, new Array(i)); const n=new Array(1); n[0]=1, this.one=new GF256Poly(this, new Array(n)), this.__defineGetter__("Zero", function () {
        return this.zero;
    }), this.__defineGetter__("One", function () {
        return this.one;
    }), this.buildMonomial=function (e, t) {
        if (e<0) throw "System.ArgumentException"; if (0==t) return this.zero; for (var r=new Array(e+1), i=0; i<r.length; i++)r[i]=0; return r[0]=t, new GF256Poly(this, r);
    }, this.exp=function (e) {
        return this.expTable[e];
    }, this.log=function (e) {
        if (0==e) throw "System.ArgumentException"; return this.logTable[e];
    }, this.inverse=function (e) {
        if (0==e) throw "System.ArithmeticException"; return this.expTable[255-this.logTable[e]];
    }, this.multiply=function (e, t) {
        return 0==e||0==t?0:1==e?t:1==t?e:this.expTable[(this.logTable[e]+this.logTable[t])%255];
    };
}GF256.QR_CODE_FIELD=new GF256(285), GF256.DATA_MATRIX_FIELD=new GF256(301), GF256.addOrSubtract=function (e, t) {
    return e^t;
};
