"use strict"; function baseConvert(e, t, r, n, a) {
    if (n=n||base_symbols, a=a||n, t>n.length||r>a.length) return console.warn("Can't convert", e, "to base", r, "greater than symbol table length. src-table:", n.length, "dest-table:", a.length), !1; for (var l=bigInt(0), s=0; s<e.length; s++)l=l.multiply(t).add(n.indexOf(e.charAt(s))); if (l.lesser(0)) return 0; for (var o=l.mod(r), i=a.charAt(o), d=l.divide(r); !d.equals(0);)o=d.mod(r), d=d.divide(r), i=a.charAt(o)+i; return i;
}
