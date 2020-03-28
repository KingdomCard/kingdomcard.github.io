"use strict"; function GF256Poly(e, i) {
    if (null==i||0==i.length) throw "System.ArgumentException"; this.field=e; const t=i.length; if (t>1&&0==i[0]) {
        for (var f=1; f<t&&0==i[f];)f++; if (f==t) this.coefficients=e.Zero.coefficients; else {
            this.coefficients=new Array(t-f); for (let r=0; r<this.coefficients.length; r++) this.coefficients[r]=0; for (let n=0; n<this.coefficients.length; n++) this.coefficients[n]=i[f+n];
        }
    } else this.coefficients=i; this.__defineGetter__("Zero", function () {
        return 0==this.coefficients[0];
    }), this.__defineGetter__("Degree", function () {
        return this.coefficients.length-1;
    }), this.__defineGetter__("Coefficients", function () {
        return this.coefficients;
    }), this.getCoefficient=function (e) {
        return this.coefficients[this.coefficients.length-1-e];
    }, this.evaluateAt=function (e) {
        if (0==e) return this.getCoefficient(0); const i=this.coefficients.length; if (1==e) {
            for (var t=0, f=0; f<i; f++)t=GF256.addOrSubtract(t, this.coefficients[f]); return t;
        } let r=this.coefficients[0]; for (f=1; f<i; f++)r=GF256.addOrSubtract(this.field.multiply(e, r), this.coefficients[f]); return r;
    }, this.addOrSubtract=function (i) {
        if (this.field!=i.field) throw "GF256Polys do not have same GF256 field"; if (this.Zero) return i; if (i.Zero) return this; let t=this.coefficients; let f=i.coefficients; if (t.length>f.length) {
            const r=t; t=f, f=r;
        } for (var n=new Array(f.length), s=f.length-t.length, o=0; o<s; o++)n[o]=f[o]; for (let h=s; h<f.length; h++)n[h]=GF256.addOrSubtract(t[h-s], f[h]); return new GF256Poly(e, n);
    }, this.multiply1=function (e) {
        if (this.field!=e.field) throw "GF256Polys do not have same GF256 field"; if (this.Zero||e.Zero) return this.field.Zero; for (var i=this.coefficients, t=i.length, f=e.coefficients, r=f.length, n=new Array(t+r-1), s=0; s<t; s++) for (let o=i[s], h=0; h<r; h++)n[s+h]=GF256.addOrSubtract(n[s+h], this.field.multiply(o, f[h])); return new GF256Poly(this.field, n);
    }, this.multiply2=function (e) {
        if (0==e) return this.field.Zero; if (1==e) return this; for (var i=this.coefficients.length, t=new Array(i), f=0; f<i; f++)t[f]=this.field.multiply(this.coefficients[f], e); return new GF256Poly(this.field, t);
    }, this.multiplyByMonomial=function (e, i) {
        if (e<0) throw "System.ArgumentException"; if (0==i) return this.field.Zero; for (var t=this.coefficients.length, f=new Array(t+e), r=0; r<f.length; r++)f[r]=0; for (r=0; r<t; r++)f[r]=this.field.multiply(this.coefficients[r], i); return new GF256Poly(this.field, f);
    }, this.divide=function (e) {
        if (this.field!=e.field) throw "GF256Polys do not have same GF256 field"; if (e.Zero) throw "Divide by 0"; for (var i=this.field.Zero, t=this, f=e.getCoefficient(e.Degree), r=this.field.inverse(f); t.Degree>=e.Degree&&!t.Zero;) {
            const n=t.Degree-e.Degree; const s=this.field.multiply(t.getCoefficient(t.Degree), r); const o=e.multiplyByMonomial(n, s); const h=this.field.buildMonomial(n, s); i=i.addOrSubtract(h), t=t.addOrSubtract(o);
        } return new Array(i, t);
    };
}
