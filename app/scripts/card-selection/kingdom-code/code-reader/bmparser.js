"use strict"; function BitMatrixParser(r) {
    const i=r.Dimension; if (i<21||1!=(3&i)) throw "Error BitMatrixParser"; this.bitMatrix=r, this.parsedVersion=null, this.parsedFormatInfo=null, this.copyBit=function (r, i, t) {
        return this.bitMatrix.get_Renamed(r, i)?t<<1|1:t<<1;
    }, this.readFormatInformation=function () {
        if (null!=this.parsedFormatInfo) return this.parsedFormatInfo; for (var r=0, i=0; i<6; i++)r=this.copyBit(i, 8, r); r=this.copyBit(7, 8, r), r=this.copyBit(8, 8, r), r=this.copyBit(8, 7, r); for (var t=5; t>=0; t--)r=this.copyBit(8, t, r); if (this.parsedFormatInfo=FormatInformation.decodeFormatInformation(r), null!=this.parsedFormatInfo) return this.parsedFormatInfo; const o=this.bitMatrix.Dimension; r=0; const s=o-8; for (i=o-1; i>=s; i--)r=this.copyBit(i, 8, r); for (t=o-7; t<o; t++)r=this.copyBit(8, t, r); if (this.parsedFormatInfo=FormatInformation.decodeFormatInformation(r), null!=this.parsedFormatInfo) return this.parsedFormatInfo; throw "Error readFormatInformation";
    }, this.readVersion=function () {
        if (null!=this.parsedVersion) return this.parsedVersion; const r=this.bitMatrix.Dimension; const i=r-17>>2; if (i<=6) return Version.getVersionForNumber(i); for (var t=0, o=r-11, s=5; s>=0; s--) for (var e=r-9; e>=o; e--)t=this.copyBit(e, s, t); if (this.parsedVersion=Version.decodeVersionInformation(t), null!=this.parsedVersion&&this.parsedVersion.DimensionForVersion==r) return this.parsedVersion; t=0; for (e=5; e>=0; e--) for (s=r-9; s>=o; s--)t=this.copyBit(e, s, t); if (this.parsedVersion=Version.decodeVersionInformation(t), null!=this.parsedVersion&&this.parsedVersion.DimensionForVersion==r) return this.parsedVersion; throw "Error readVersion";
    }, this.readCodewords=function () {
        const r=this.readFormatInformation(); const i=this.readVersion(); const t=DataMask.forReference(r.DataMask); const o=this.bitMatrix.Dimension; t.unmaskBitMatrix(this.bitMatrix, o); for (var s=i.buildFunctionPattern(), e=!0, n=new Array(i.TotalCodewords), a=0, d=0, h=0, f=o-1; f>0; f-=2) {
            6==f&&f--; for (let m=0; m<o; m++) for (let p=e?o-1-m:m, u=0; u<2; u++)s.get_Renamed(f-u, p)||(h++, d<<=1, this.bitMatrix.get_Renamed(f-u, p)&&(d|=1), 8==h&&(n[a++]=d, h=0, d=0)); e^=!0;
        } if (a!=i.TotalCodewords) throw "Error readCodewords"; return n;
    };
}
