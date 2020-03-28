"use strict"; function PerspectiveTransform(t, a, i, s, r, h, e, n, o) {
    this.a11=t, this.a12=s, this.a13=e, this.a21=a, this.a22=r, this.a23=n, this.a31=i, this.a32=h, this.a33=o, this.transformPoints1=function (t) {
        for (let a=t.length, i=this.a11, s=this.a12, r=this.a13, h=this.a21, e=this.a22, n=this.a23, o=this.a31, l=this.a32, u=this.a33, c=0; c<a; c+=2) {
            const f=t[c]; const d=t[c+1]; const m=r*f+n*d+u; t[c]=(i*f+h*d+o)/m, t[c+1]=(s*f+e*d+l)/m;
        }
    }, this.transformPoints2=function (t, a) {
        for (let i=t.length, s=0; s<i; s++) {
            const r=t[s]; const h=a[s]; const e=this.a13*r+this.a23*h+this.a33; t[s]=(this.a11*r+this.a21*h+this.a31)/e, a[s]=(this.a12*r+this.a22*h+this.a32)/e;
        }
    }, this.buildAdjoint=function () {
        return new PerspectiveTransform(this.a22*this.a33-this.a23*this.a32, this.a23*this.a31-this.a21*this.a33, this.a21*this.a32-this.a22*this.a31, this.a13*this.a32-this.a12*this.a33, this.a11*this.a33-this.a13*this.a31, this.a12*this.a31-this.a11*this.a32, this.a12*this.a23-this.a13*this.a22, this.a13*this.a21-this.a11*this.a23, this.a11*this.a22-this.a12*this.a21);
    }, this.times=function (t) {
        return new PerspectiveTransform(this.a11*t.a11+this.a21*t.a12+this.a31*t.a13, this.a11*t.a21+this.a21*t.a22+this.a31*t.a23, this.a11*t.a31+this.a21*t.a32+this.a31*t.a33, this.a12*t.a11+this.a22*t.a12+this.a32*t.a13, this.a12*t.a21+this.a22*t.a22+this.a32*t.a23, this.a12*t.a31+this.a22*t.a32+this.a32*t.a33, this.a13*t.a11+this.a23*t.a12+this.a33*t.a13, this.a13*t.a21+this.a23*t.a22+this.a33*t.a23, this.a13*t.a31+this.a23*t.a32+this.a33*t.a33);
    };
} function DetectorResult(t, a) {
    this.bits=t, this.points=a;
} function Detector(t) {
    this.image=t, this.resultPointCallback=null, this.sizeOfBlackWhiteBlackRun=function (t, a, i, s) {
        const r=Math.abs(s-a)>Math.abs(i-t); if (r) {
            let h=t; t=a, a=h, h=i, i=s, s=h;
        } for (let e=Math.abs(i-t), n=Math.abs(s-a), o=-e>>1, l=a<s?1:-1, u=t<i?1:-1, c=0, f=t, d=a; f!=i; f+=u) {
            const m=r?d:f; const v=r?f:d; if (1==c?this.image[m+v*qrcode.width]&&c++:this.image[m+v*qrcode.width]||c++, 3==c) {
                const M=f-t; const q=d-a; return Math.sqrt(M*M+q*q);
            } if ((o+=n)>0) {
                if (d==s) break; d+=l, o-=e;
            }
        } const g=i-t; const p=s-a; return Math.sqrt(g*g+p*p);
    }, this.sizeOfBlackWhiteBlackRunBothWays=function (t, a, i, s) {
        let r=this.sizeOfBlackWhiteBlackRun(t, a, i, s); let h=1; let e=t-(i-t); e<0?(h=t/(t-e), e=0):e>=qrcode.width&&(h=(qrcode.width-1-t)/(e-t), e=qrcode.width-1); let n=Math.floor(a-(s-a)*h); return h=1, n<0?(h=a/(a-n), n=0):n>=qrcode.height&&(h=(qrcode.height-1-a)/(n-a), n=qrcode.height-1), e=Math.floor(t+(e-t)*h), (r+=this.sizeOfBlackWhiteBlackRun(t, a, e, n))-1;
    }, this.calculateModuleSizeOneWay=function (t, a) {
        const i=this.sizeOfBlackWhiteBlackRunBothWays(Math.floor(t.X), Math.floor(t.Y), Math.floor(a.X), Math.floor(a.Y)); const s=this.sizeOfBlackWhiteBlackRunBothWays(Math.floor(a.X), Math.floor(a.Y), Math.floor(t.X), Math.floor(t.Y)); return isNaN(i)?s/7:isNaN(s)?i/7:(i+s)/14;
    }, this.calculateModuleSize=function (t, a, i) {
        return (this.calculateModuleSizeOneWay(t, a)+this.calculateModuleSizeOneWay(t, i))/2;
    }, this.distance=function (t, a) {
        const i=t.X-a.X; const s=t.Y-a.Y; return Math.sqrt(i*i+s*s);
    }, this.computeDimension=function (t, a, i, s) {
        let r=7+(Math.round(this.distance(t, a)/s)+Math.round(this.distance(t, i)/s)>>1); switch (3&r) {
            case 0: r++; break; case 2: r--; break; case 3: throw "Error";
        } return r;
    }, this.findAlignmentInRegion=function (t, a, i, s) {
        const r=Math.floor(s*t); const h=Math.max(0, a-r); const e=Math.min(qrcode.width-1, a+r); if (e-h<3*t) throw "Error"; const n=Math.max(0, i-r); const o=Math.min(qrcode.height-1, i+r); return new AlignmentPatternFinder(this.image, h, n, e-h, o-n, t, this.resultPointCallback).find();
    }, this.createTransform=function (t, a, i, s, r) {
        let h; let e; let n; let o; const l=r-3.5; return null!=s?(h=s.X, e=s.Y, n=o=l-3):(h=a.X-t.X+i.X, e=a.Y-t.Y+i.Y, n=o=l), PerspectiveTransform.quadrilateralToQuadrilateral(3.5, 3.5, l, 3.5, n, o, 3.5, l, t.X, t.Y, a.X, a.Y, h, e, i.X, i.Y);
    }, this.sampleGrid=function (t, a, i) {
        return GridSampler.sampleGrid3(t, i, a);
    }, this.processFinderPatternInfo=function (t) {
        const a=t.TopLeft; const i=t.TopRight; const s=t.BottomLeft; const r=this.calculateModuleSize(a, i, s); if (r<1) throw "Error"; const h=this.computeDimension(a, i, s, r); const e=Version.getProvisionalVersionForDimension(h); const n=e.DimensionForVersion-7; let o=null; if (e.AlignmentPatternCenters.length>0) {
            for (let l=i.X-a.X+s.X, u=i.Y-a.Y+s.Y, c=1-3/n, f=Math.floor(a.X+c*(l-a.X)), d=Math.floor(a.Y+c*(u-a.Y)), m=4; m<=16; m<<=1) {
                o=this.findAlignmentInRegion(r, f, d, m); break;
            }
        } const v=this.createTransform(a, i, s, o, h); return new DetectorResult(this.sampleGrid(this.image, v, h), null==o?new Array(s, a, i):new Array(s, a, i, o));
    }, this.detect=function () {
        const t=(new FinderPatternFinder).findFinderPattern(this.image); return this.processFinderPatternInfo(t);
    };
}PerspectiveTransform.quadrilateralToQuadrilateral=function (t, a, i, s, r, h, e, n, o, l, u, c, f, d, m, v) {
    const M=this.quadrilateralToSquare(t, a, i, s, r, h, e, n); return this.squareToQuadrilateral(o, l, u, c, f, d, m, v).times(M);
}, PerspectiveTransform.squareToQuadrilateral=function (t, a, i, s, r, h, e, n) {
    const o=n-h; const l=a-s+h-n; if (0==o&&0==l) return new PerspectiveTransform(i-t, r-i, t, s-a, h-s, a, 0, 0, 1); const u=i-r; const c=e-r; const f=t-i+r-e; const d=s-h; const m=u*o-c*d; const v=(f*o-c*l)/m; const M=(u*l-f*d)/m; return new PerspectiveTransform(i-t+v*i, e-t+M*e, t, s-a+v*s, n-a+M*n, a, v, M, 1);
}, PerspectiveTransform.quadrilateralToSquare=function (t, a, i, s, r, h, e, n) {
    return this.squareToQuadrilateral(t, a, i, s, r, h, e, n).buildAdjoint();
};
