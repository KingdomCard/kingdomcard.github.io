"use strict"; function DataBlock(o, r) {
    this.numDataCodewords=o, this.codewords=r, this.__defineGetter__("NumDataCodewords", function () {
        return this.numDataCodewords;
    }), this.__defineGetter__("Codewords", function () {
        return this.codewords;
    });
}DataBlock.getDataBlocks=function (o, r, e) {
    if (o.length!=r.TotalCodewords) throw "ArgumentException"; for (var t=r.getECBlocksForLevel(e), d=0, n=t.getECBlocks(), a=0; a<n.length; a++)d+=n[a].Count; for (var s=new Array(d), c=0, w=0; w<n.length; w++) {
        const f=n[w]; for (a=0; a<f.Count; a++) {
            const l=f.DataCodewords; const i=t.ECCodewordsPerBlock+l; s[c++]=new DataBlock(l, new Array(i));
        }
    } for (var h=s[0].codewords.length, u=s.length-1; u>=0;) {
        if (s[u].codewords.length==h) break; u--;
    }u++; const C=h-t.ECCodewordsPerBlock; let g=0; for (a=0; a<C; a++) for (w=0; w<c; w++)s[w].codewords[a]=o[g++]; for (w=u; w<c; w++)s[w].codewords[C]=o[g++]; const k=s[0].codewords.length; for (a=C; a<k; a++) {
        for (w=0; w<c; w++) {
            const v=w<u?a:a+1; s[w].codewords[v]=o[g++];
        }
    } return s;
};
