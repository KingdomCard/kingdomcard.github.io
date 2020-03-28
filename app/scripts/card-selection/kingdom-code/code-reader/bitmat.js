"use strict"; function BitMatrix(t, i) {
    if (i||(i=t), t<1||i<1) throw "Both dimensions must be greater than 0"; this.width=t, this.height=i; let h=t>>5; 0!=(31&t)&&h++, this.rowSize=h, this.bits=new Array(h*i); for (let e=0; e<this.bits.length; e++) this.bits[e]=0; this.__defineGetter__("Width", function () {
        return this.width;
    }), this.__defineGetter__("Height", function () {
        return this.height;
    }), this.__defineGetter__("Dimension", function () {
        if (this.width!=this.height) throw "Can't call getDimension() on a non-square matrix"; return this.width;
    }), this.get_Renamed=function (t, i) {
        const h=i*this.rowSize+(t>>5); return 0!=(1&URShift(this.bits[h], 31&t));
    }, this.set_Renamed=function (t, i) {
        const h=i*this.rowSize+(t>>5); this.bits[h]|=1<<(31&t);
    }, this.flip=function (t, i) {
        const h=i*this.rowSize+(t>>5); this.bits[h]^=1<<(31&t);
    }, this.clear=function () {
        for (let t=this.bits.length, i=0; i<t; i++) this.bits[i]=0;
    }, this.setRegion=function (t, i, h, e) {
        if (i<0||t<0) throw "Left and top must be nonnegative"; if (e<1||h<1) throw "Height and width must be at least 1"; const s=t+h; const n=i+e; if (n> this.height||s> this.width) throw "The region must fit inside the matrix"; for (let r=i; r<n; r++) for (let o=r*this.rowSize, a=t; a<s; a++) this.bits[o+(a>>5)]|=1<<(31&a);
    };
}
