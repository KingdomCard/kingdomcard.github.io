"use strict"; marknote=function () {}, marknote.constants={ DOCTYPE_START: "<!DOCTYPE", CDATA_START: "<![CDATA[", CDATA_END: "]]>", COMMENT_START: "\x3c!--", COMMENT_END: "--\x3e", TAG_OPEN: "<", TAG_CLOSE: ">", TAG_CLOSE_SELF_TERMINATING: "/>", ENDTAG_OPEN: "</", EQUALS: "=", SQUOTE: "'", DQUOTE: "\"", PI_START: "<?", PI_END: "?>", BRACKET_OPEN: "[", BRACKET_CLOSE: "]", TOKENTYPE_BRACKET_OPEN: "bracketOpen", TOKENTYPE_TAG_OPEN: "tagOpen", TOKENTYPE_TAG_CLOSE: "tagClose", TOKENTYPE_ENDTAG_OPEN: "endTagOpen", TOKENTYPE_ENDTAG_CLOSE: "endTagClose", TOKENTYPE_SELF_TERMINATING: "closeTagSelfTerminating", TOKENTYPE_WHITESPACE: "whitespace", TOKENTYPE_ATTRIBUTE: "attribute", TOKENTYPE_QUOTE: "quote", TOKENTYPE_QUOTED: "quotedLiteral", TOKENTYPE_NORMAL: "normal", TOKENTYPE_COMMENT_START: "commentStart", TOKENTYPE_COMMENT_END: "commentEnd", TOKENTYPE_CDATA_START: "cdataStart", TOKENTYPE_CDATA_END: "cdataEnd", TOKENTYPE_PI_START: "piStart", TOKENTYPE_PI_END: "piEnd", TOKENTYPE_DOCTYPE_START: "docTypeStart", DATATYPE_ATTRIBUTE: "marknote.Attribute", DATATYPE_CDATA: "marknote.CDATA", DATATYPE_CLONER: "marknote.Cloner", DATATYPE_COMMENT: "marknote.Comment", DATATYPE_DOCTYPE: "marknote.DOCTYPE", DATATYPE_DOCUMENT: "marknote.Document", DATATYPE_ELEMENT: "marknote.Element", DATATYPE_ENTITYREF: "marknote.EntityRef", DATATYPE_XMLENTITYREFS: "marknote.XMLEntityRefs", DATATYPE_ENTITYREFS: "marknote.EntityRefs", DATATYPE_PARSER: "marknote.Parser", DATATYPE_PROCESSINGINSTRUCTION: "marknote.ProcessingInstruction", DATATYPE_QNAME: "marknote.QName", DATATYPE_TEXT: "marknote.Text", DATATYPE_TOKEN: "marknote.Token", DATATYPE_TOKENIZER: "marknote.Tokenizer", DATATYPE_WRITER: "marknote.Writer" }, marknote.ajaxDoc=null, marknote.AJAX=function () {
    this.req=null, this.status=null, this.statusText=null, this.responseText=null;
}, marknote.AJAX.prototype.genRequest=function () {
    let t=!1; try {
        t=new XMLHttpRequest;
    } catch (e) {
        try {
            t=new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                t=new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                t=!1;
            }
        }
    } return this.req=t, t;
}, marknote.AJAX.prototype.getRequest=function () {
    return this.req;
}, marknote.AJAX.prototype.getStatus=function () {
    return this.status;
}, marknote.AJAX.prototype.getStatusText=function () {
    return this.statusText;
}, marknote.AJAX.prototype.getResponseText=function () {
    return this.responseText;
}, marknote.AJAX.prototype.constructQueryString=function (t) {
    let e=""; if (t&&"object"==typeof t) {
        let n=""; for (const s in t)e+=`${n+encodeURIComponent(s)}=${encodeURIComponent(t[s])}`, n="&";
    } else t&&"string"==typeof t&&(e=t); return e;
}, marknote.AJAX.prototype.read=function (t, e, n, s, o) {
    let r; const a=this.genRequest(); const i=this; const h=this.constructQueryString(e); if (marknote.AJAXDoc=null, o=o&&"POST"===o.toUpperCase()?"POST":"GET", !a) return !1; n||(n=marknote.AJAX.defaultCallback), s||(s=new Object), a.open(o, t, !0), a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), a.onreadystatechange=function () {
        if (4==a.readyState) {
            i.status=a.status, i.statusText=a.statusText, i.responseText=a.responseText; const t=new marknote.Parser; r=t.parse(a.responseText), n.call(i, r, s);
        }
    }, a.send(h);
}, marknote.AJAX.prototype.defaultCallback=function (t, e) {
    marknote.AJAXDoc=t;
}, marknote.SJAX=function () {
    this.req=null, this.status=null, this.statusText=null, this.responseText=null;
}, marknote.SJAX.prototype.getRequest=function () {
    return this.req;
}, marknote.SJAX.prototype.getStatus=function () {
    return this.status;
}, marknote.SJAX.prototype.getStatusText=function () {
    return this.statusText;
}, marknote.SJAX.prototype.getResponseText=function () {
    return this.responseText;
}, marknote.SJAX.prototype.read=function (t, e, n) {
    const s=new marknote.AJAX; const o=s.genRequest(); const r=s.constructQueryString(e); const a=new marknote.Parser; return n=n&&"POST"===n.toUpperCase()?"POST":"GET", o?(o.open(n, t, !1), o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), o.send(r), this.req=o, this.status=o.status, this.statusText=o.statusText, this.responseText=o.responseText, a.parse(o.responseText)):new marknote.Document;
}, marknote.Attribute=function (t, e) {
    this.dataType=marknote.constants.DATATYPE_ATTRIBUTE, this.isSw8tXmlContent=!1, this.name=t, this.value=marknote.Util.erefEncode(marknote.Util.nothingToBlank(e));
}, marknote.Attribute.prototype.getName=function () {
    return this.name;
}, marknote.Attribute.prototype.setName=function (t) {
    this.name=t;
}, marknote.Attribute.prototype.getValue=function () {
    return marknote.Util.erefDecode(marknote.Util.nothingToBlank(this.value));
}, marknote.Attribute.prototype.setValue=function (t) {
    this.value=marknote.Util.erefEncode(marknote.Util.nothingToBlank(t));
}, marknote.Attribute.prototype.toString=function () {
    return `${this.getName()}="${this.getValue()}"`;
}, marknote.Attribute.prototype.clone=function () {
    return new marknote.Attribute(this.getName(), this.getValue());
}, marknote.CDATA=function (t) {
    this.dataType=marknote.constants.DATATYPE_CDATA, this.isSw8tXmlContent=!0, this.text=marknote.Util.nothingToBlank(t);
}, marknote.CDATA.prototype.getText=function () {
    return marknote.Util.nothingToBlank(this.text);
}, marknote.CDATA.prototype.setText=function (t) {
    this.text=marknote.Util.nothingToBlank(t);
}, marknote.CDATA.prototype.toString=function () {
    return this.getText();
}, marknote.CDATA.prototype.clone=function () {
    return (new marknote.Cloner).clone(this);
}, marknote.Cloner=function () {
    this.dataType=marknote.constants.DATATYPE_CLONER, this.isSw8tXmlContent=!1;
}, marknote.Cloner.prototype.cloneDocument=function (t) {
    for (var e, n=new marknote.Document, s=t.getProcessingInstructions(), o=t.getRootElement(), r=0; r<s.length; r++)e=this.cloneProcessingInstruction(s[r]), n.addProcessingInstruction(e); const a=this.cloneElement(o); return n.setRootElement(a), n;
}, marknote.Cloner.prototype.cloneProcessingInstruction=function (t) {
    const e=t.getData(); const n=t.getTarget().slice(0); const s=this.cloneArray(e); return new marknote.ProcessingInstruction(n, s);
}, marknote.Cloner.prototype.cloneElement=function (t) {
    const e=new marknote.Element; const n=t.getName().slice(0); const s=this.cloneArray(t.getAttributes()); if (e.setName(n), e.setAttributes(s), t.isSelfTerminated) return e.isSelfTerminated=!0, e; const o=this.cloneContents(t); return e.setContents(o), e;
}, marknote.Cloner.prototype.cloneContents=function (t) {
    for (var e, n=new Array, s=0; s<t.getContents().length; s++) {
        const o=t.getContentAt(s); switch (marknote.Util.dataType(o)) {
            case marknote.constants.DATATYPE_ELEMENT: e=this.cloneElement(o), n.push(e); break; default: e=this.clone(o), n.push(e);
        }
    } return n;
}, marknote.Cloner.prototype.clone=function (t) {
    if (!(t.dataType&&t.dataType.indexOf("marknote.")>0||"object"==typeof t)) return t; const e=new Object; for (const n in t)e[n]=this.clone(t[n]); return e;
}, marknote.Cloner.prototype.cloneArray=function (t) {
    for (var e, n=new Array, s=0; s<t.length; s++)e=this.clone(t[s]), n.push(e); return n;
}, marknote.Comment=function (t) {
    this.dataType=marknote.constants.DATATYPE_COMMENT, this.isSw8tXmlContent=!0, this.text=marknote.Util.erefEncode(marknote.Util.nothingToBlank(t));
}, marknote.Comment.prototype.getText=function () {
    return marknote.Util.erefDecode(marknote.Util.nothingToBlank(this.text));
}, marknote.Comment.prototype.setText=function (t) {
    this.text=marknote.Util.erefEncode(marknote.Util.nothingToBlank(t));
}, marknote.Comment.prototype.toString=function () {
    return this.getText();
}, marknote.Comment.prototype.clone=function () {
    return (new marknote.Cloner).clone(this);
}, marknote.FPI=function (t, e, n, s, o) {
    this.registration=t, this.organization=e, this.publicTextClass=n, this.publicTextDescription=s, this.publicTextLanguage=o;
}, marknote.FPI.prototype.toString=function () {
    return `"${this.getRegistration()}//${this.getOrganization()}//${this.getPublicTextClass()} ${this.getPublicTextDescription()}//${this.getPublicTextLanguage()}"`;
}, marknote.FPI.prototype.getRegistration=function () {
    return this.registration;
}, marknote.FPI.prototype.setRegistration=function (t) {
    this.registration=t;
}, marknote.FPI.prototype.getOrganization=function () {
    return this.organization;
}, marknote.FPI.prototype.setOrganization=function (t) {
    this.organziation=t;
}, marknote.FPI.prototype.getPublicTextClass=function () {
    return this.publicTextClass;
}, marknote.FPI.prototype.setPublicTextClass=function (t) {
    this.publicTextClass=t;
}, marknote.FPI.prototype.getPublicTextDescription=function () {
    return this.publicTextDescription;
}, marknote.FPI.prototype.setPublicTextDescription=function (t) {
    this.publicTextDescription=t;
}, marknote.FPI.prototype.getPublicTextLanguage=function () {
    return this.publicTextLanguage;
}, marknote.FPI.prototype.setPublicTextLanguage=function (t) {
    this.publicTextLanguage=t;
}, marknote.DOCTYPE=function (t, e, n, s, o) {
    if (this.dataType=marknote.constants.DATATYPE_DOCTYPE, this.isSw8tXmlContent=!1, t&&!e) {
        const r=new String(t); const a=(new marknote.Parser).parseDOCTYPE(r); this.topElement=a.getTopElement(), this.availability=a.getAvailability(), this.FPI=a.getFPI(), this.URL=a.getURL(), this.internalSubset=a.getInternalSubset();
    } else this.setTopElement(t), this.setAvailability(e), this.setFPI(n), this.setURL(s), this.setInternalSubset(o);
}, marknote.DOCTYPE.prototype.toString=function () {
    const t="PUBLIC"==this.getAvailability()&&this.getFPI()?` ${this.getFPI()}`:""; const e=this.getURL()?` ${this.getURL()}`:""; const n=this.getInternalSubset()?` ${this.getInternalSubset()}`:""; return `<!DOCTYPE ${this.getTopElement()} ${this.getAvailability()}${t}${e}${n}>`;
}, marknote.DOCTYPE.prototype.getTopElement=function () {
    return this.topElement;
}, marknote.DOCTYPE.prototype.setTopElement=function (t) {
    this.topElement=t;
}, marknote.DOCTYPE.prototype.getAvailability=function () {
    return this.availability;
}, marknote.DOCTYPE.prototype.setAvailability=function (t) {
    this.availability=t;
}, marknote.DOCTYPE.prototype.getFPI=function () {
    return this.FPI;
}, marknote.DOCTYPE.prototype.setFPI=function (t) {
    this.FPI=t;
}, marknote.DOCTYPE.prototype.getURL=function () {
    return this.URL;
}, marknote.DOCTYPE.prototype.setURL=function (t) {
    let e=marknote.Util.trim(t); ""!==e?("\""!=e.charAt(0)&&(e=`"${e}`), "\""!=e.charAt(e.length-1)&&(e+="\""), this.URL=e):this.URL="";
}, marknote.DOCTYPE.prototype.getInternalSubset=function () {
    return this.internalSubset;
}, marknote.DOCTYPE.prototype.setInternalSubset=function (t) {
    this.dataType=marknote.constants.DATATYPE_DOCTYPE, this.internalSubset=t;
}, marknote.Document=function () {
    this.dataType=marknote.constants.DATATYPE_DOCUMENT, this.isSw8tXmlContent=!1, this.processingInstructions=new Array, this.rootElement=new marknote.Element, this.contents=new Array;
}, marknote.Document.prototype.getProcessingInstructions=function () {
    return this.processingInstructions;
}, marknote.Document.prototype.setProcessingInstructions=function (t) {
    this.processingInstructions=t;
}, marknote.Document.prototype.addProcessingInstruction=function (t) {
    this.processingInstructions.push(t);
}, marknote.Document.prototype.removeProcessingInstruction=function (t) {
    for (let e=0; e<this.processingInstructions.length; e++) {
        this.processingInstructions[e].getTarget()==t&&marknote.Util.removeArrayItem(this.processingInstructions, e);
    }
}, marknote.Document.prototype.getRootElement=function () {
    return this.rootElement;
}, marknote.Document.prototype.setRootElement=function (t) {
    t instanceof marknote.Element&&(this.rootElement=t);
}, marknote.Document.prototype.getDOCTYPE=function () {
    return this.DOCTYPE;
}, marknote.Document.prototype.setDOCTYPE=function (t) {
    this.DOCTYPE=t;
}, marknote.Document.prototype.getBaseURI=function () {
    return this.baseURI;
}, marknote.Document.prototype.setBaseURI=function (t) {
    this.baseURI=t;
}, marknote.Document.prototype.toString=function (t, e, n, s) {
    return (new marknote.Writer).outputDocument(this, t);
}, marknote.Document.prototype.clone=function () {
    return (new marknote.Cloner).cloneDocument(this);
}, marknote.Element=function (t) {
    this.dataType=marknote.constants.DATATYPE_ELEMENT, this.isSw8tXmlContent=!0, this.contents=new Array, this.attributes=new Array, this.qname=new marknote.QName, this.isSelfTerminated=!1, t&&(t instanceof marknote.QName?this.setQName(t):this.setName(t));
}, marknote.Element.prototype.getName=function () {
    return this.qname.getName();
}, marknote.Element.prototype.setName=function (t) {
    this.qname.setName(t);
}, marknote.Element.prototype.getQName=function () {
    return this.qname;
}, marknote.Element.prototype.setQName=function (t) {
    this.qname=t;
}, marknote.Element.prototype.hasContents=function () {
    return this.contents&&this.contents.length>0;
}, marknote.Element.prototype.getContents=function () {
    return this.contents;
}, marknote.Element.prototype.getContentAt=function (t) {
    return this.getContents()[t];
}, marknote.Element.prototype.addContent=function (t) {
    t&&t.isSw8tXmlContent&&this.getContents().push(t);
}, marknote.Element.prototype.removeContent=function (t) {
    marknote.Util.removeArrayItem(this.contents, t);
}, marknote.Element.prototype.setContents=function (t) {
    this.contents=t;
}, marknote.Element.prototype.getText=function (t) {
    let e=""; void 0===t&&(t=!0); for (let n=0; n<this.contents.length; n++) {
        const s=this.getContentAt(n); const o=marknote.Util.dataType(s); o==marknote.constants.DATATYPE_TEXT?e+=s.getText(t):o==marknote.constants.DATATYPE_CDATA&&(e+=s.getText());
    } return e;
}, marknote.Element.prototype.setText=function (t) {
    for (var e=new Array, n=0; n<this.contents.length; n++) {
        const s=this.getContentAt(n); marknote.Util.dataType(s)==marknote.constants.DATATYPE_COMMENT&&e.push(s);
    } this.contents=e, t=t?`${t}`:"", this.contents.push(new marknote.Text(t));
}, marknote.Element.prototype.setCDATAText=function (t) {
    for (var e=new Array, n=0; n<this.contents.length; n++) {
        const s=this.getContentAt(n); marknote.Util.dataType(s)==marknote.constants.DATATYPE_COMMENT&&e.push(s);
    } this.contents=e, t=t?`${t}`:"", this.contents.push(new marknote.CDATA(t));
}, marknote.Element.prototype.removeText=function () {
    for (let t=this.contents.length-1; t>=0; t--) {
        const e=this.getContentAt(t); const n=marknote.Util.dataType(e); n!=marknote.constants.DATATYPE_TEXT&&n!=marknote.constants.DATATYPE_CDATA||marknote.Util.removeArrayItem(this.contents, t);
    }
}, marknote.Element.prototype.getCommentText=function () {
    for (var t="", e=0; e<this.contents.length; e++) {
        const n=this.getContentAt(e); marknote.Util.dataType(n)==marknote.constants.DATATYPE_COMMENT&&(t+=n.getText());
    } return t;
}, marknote.Element.prototype.setCommentText=function (t) {
    this.removeComments(), t=t?`${t}`:"", this.addContent(new marknote.Comment(t));
}, marknote.Element.prototype.removeComments=function () {
    for (let t=this.contents.length-1; t>=0; t--) {
        const e=this.getContentAt(t); marknote.Util.dataType(e)==marknote.constants.DATATYPE_COMMENT&&marknote.Util.removeArrayItem(this.contents, t);
    }
}, marknote.Element.prototype.addChildElement=function (t) {
    !marknote.Util.dataType(t)!=marknote.constants.DATATYPE_ELEMENT&&this.getContents().push(t);
}, marknote.Element.prototype.removeChildElements=function (t) {
    let e=0; if (!t) return e=this.contents.length, this.contents=new Array, e; for (let n=t.dataType==marknote.constants.DATATYPE_QNAME?t.getName():t, s=marknote.Cloner.cloneArray(this.contents), o=s.length-1; o>=0; o--) {
        marknote.Util.dataType(s[o])==marknote.constants.DATATYPE_ELEMENT&&(this.clonedContents[o].getName()==n&&(marknote.Util.removeArrayItem(this.contents, o), e++));
    } return e;
}, marknote.Element.prototype.getChildElements=function (t) {
    let e=!1; const n=new Array; t&&(e=t.dataType==marknote.constants.DATATYPE_QNAME?t.getName():t); for (let s=0; s<this.contents.length; s++) {
        const o=this.contents[s]; marknote.Util.dataType(o)==marknote.constants.DATATYPE_ELEMENT&&(e?o.getName()==e&&n.push(o):n.push(o));
    } return n;
}, marknote.Element.prototype.getChildElement=function (t) {
    const e=t.dataType==marknote.constants.DATATYPE_QNAME?t.getName():t; if (e) {
        for (let n=this.getContents(), s=0; s<n.length; s++) {
            const o=n[s]; if (marknote.Util.dataType(o)==marknote.constants.DATATYPE_ELEMENT) if (o.getName()===e) return o;
        }
    }
}, marknote.Element.prototype.removeChildElement=function (t) {
    const e=t.dataType==marknote.constants.DATATYPE_QNAME?t.getName():t; if (e) {
        for (let n=this.getContents(), s=0; s<n.length; s++) {
            const o=n[s]; if (marknote.Util.dataType(o)==marknote.constants.DATATYPE_ELEMENT) if (o.getName()===e) return void marknote.Util.removeArrayItem(this.contents, s);
        }
    }
}, marknote.Element.prototype.getChildElementAt=function (t) {
    try {
        return this.getChildElements()[t];
    } catch (t) {}
}, marknote.Element.prototype.removeChildElementAt=function (t) {
    for (let e=-1, n=0; n<this.contents.length; n++) if (marknote.Util.dataType(this.contents[n])==marknote.constants.DATATYPE_ELEMENT&&t==++e) return void marknote.Util.removeArrayItem(this.contents, n);
}, marknote.Element.prototype.getAttributes=function () {
    return this.attributes;
}, marknote.Element.prototype.setAttributes=function (t) {
    this.attributes=t;
}, marknote.Element.prototype.getAttribute=function (t) {
    for (let e=0; e<this.getAttributes().length; e++) {
        const n=this.getAttributes()[e]; if (n.getName()==t) return n;
    }
}, marknote.Element.prototype.getAttributeValue=function (t) {
    const e=this.getAttribute(t); return e?e.getValue():"";
}, marknote.Element.prototype.getAttributeAt=function (t) {
    return this.getAttributes()[t];
}, marknote.Element.prototype.setAttribute=function (t, e) {
    if (marknote.Util.dataType(t)==marknote.constants.DATATYPE_ATTRIBUTE) this.putAttribute(t); else {
        for (let n=0; n<this.getAttributes().length; n++) {
            const s=this.getAttributes()[n]; if (s.getName()==t) return void s.setValue(e);
        } this.putAttribute(new marknote.Attribute(t, e));
    }
}, marknote.Element.prototype.putAttribute=function (t) {
    t&&this.getAttribute(t.getName())&&this.removeAttribute(t.getName()), this.getAttributes().push(t);
}, marknote.Element.prototype.removeAttribute=function (t) {
    for (var e=new Array, n=0; n<this.getAttributes().length; n++) {
        const s=this.getAttributes()[n]; s.getName()!=t&&e.push(s);
    } this.setAttributes(e);
}, marknote.Element.prototype.removeAllAttributes=function () {
    this.setAttributes(new Array);
}, marknote.Element.prototype.toString=function (t) {
    return (new marknote.Writer).outputElement(this, 0, t);
}, marknote.Element.prototype.clone=function () {
    return (new marknote.Cloner).cloneElement(this);
}, marknote.EntityRef=function (t, e) {
    this.dataType=marknote.constants.DATATYPE_ENTITYREF, this.name=t, this.character=e;
}, marknote.EntityRef.prototype.getName=function () {
    return this.name;
}, marknote.EntityRef.prototype.setName=function (t) {
    this.name=t;
}, marknote.EntityRef.prototype.getName=function () {
    return this.name;
}, marknote.EntityRef.prototype.setName=function (t) {
    this.dataType=marknote.constants.DATATYPE_ENTITYREF, this.isSw8tXmlContent=!1, this.character=t;
}, marknote.EntityRef.prototype.clone=function () {
    return (new marknote.Cloner).clone(this);
}, marknote.XMLEntityRefs=function () {
    this.dataType=marknote.constants.DATATYPE_XMLENTITYREFS, this.isSw8tXmlContent=!1, this.refs=new Array, this.pushRef("quot", 34), this.pushRef("amp", 38), this.pushRef("apos", 39), this.pushRef("lt", 60), this.pushRef("gt", 62);
}, marknote.XMLEntityRefs.prototype.getRefs=function () {
    return this.refs;
}, marknote.XMLEntityRefs.prototype.pushRef=function (t, e) {
    this.refs.push(new marknote.EntityRef(t, String.fromCharCode(e)));
}, marknote.EntityRefs=function () {
    this.dataType=marknote.constants.DATATYPE_ENTITYREFS, this.isSw8tXmlContent=!1, this.refs=(new Array).concat((new marknote.XMLEntityRefs).getRefs()), this.pushRef("nbsp", 160), this.pushRef("iexcl", 161), this.pushRef("cent", 162), this.pushRef("pound", 163), this.pushRef("curren", 164), this.pushRef("yen", 165), this.pushRef("brvbar", 166), this.pushRef("sect", 167), this.pushRef("uml", 168), this.pushRef("copy", 169), this.pushRef("ordf", 170), this.pushRef("laquo", 171), this.pushRef("not", 172), this.pushRef("shy", 173), this.pushRef("reg", 174), this.pushRef("macr", 175), this.pushRef("deg", 176), this.pushRef("plusmn", 177), this.pushRef("sup2", 178), this.pushRef("sup3", 179), this.pushRef("acute", 180), this.pushRef("micro", 181), this.pushRef("para", 182), this.pushRef("middot", 183), this.pushRef("cedil", 184), this.pushRef("sup1", 185), this.pushRef("ordm", 186), this.pushRef("raquo", 187), this.pushRef("frac14", 188), this.pushRef("frac12", 189), this.pushRef("frac34", 190), this.pushRef("iquest", 191), this.pushRef("Agrave", 192), this.pushRef("Aacute", 193), this.pushRef("Acirc", 194), this.pushRef("Atilde", 195), this.pushRef("Auml", 196), this.pushRef("Aring", 197), this.pushRef("AElig", 198), this.pushRef("Ccedil", 199), this.pushRef("Egrave", 200), this.pushRef("Eacute", 201), this.pushRef("Ecirc", 202), this.pushRef("Euml", 203), this.pushRef("Igrave", 204), this.pushRef("Iacute", 205), this.pushRef("Icirc", 206), this.pushRef("Iuml", 207), this.pushRef("ETH", 208), this.pushRef("Ntilde", 209), this.pushRef("Ograve", 210), this.pushRef("Oacute", 211), this.pushRef("Ocirc", 212), this.pushRef("Otilde", 213), this.pushRef("Ouml", 214), this.pushRef("times", 215), this.pushRef("Oslash", 216), this.pushRef("Ugrave", 217), this.pushRef("Uacute", 218), this.pushRef("Ucirc", 219), this.pushRef("Uuml", 220), this.pushRef("Yacute", 221), this.pushRef("THORN", 222), this.pushRef("szlig", 223), this.pushRef("agrave", 224), this.pushRef("aacute", 225), this.pushRef("acirc", 226), this.pushRef("atilde", 227), this.pushRef("auml", 228), this.pushRef("aring", 229), this.pushRef("aelig", 230), this.pushRef("ccedil", 231), this.pushRef("egrave", 232), this.pushRef("eacute", 233), this.pushRef("ecirc", 234), this.pushRef("euml", 235), this.pushRef("igrave", 236), this.pushRef("iacute", 237), this.pushRef("icirc", 238), this.pushRef("iuml", 239), this.pushRef("eth", 240), this.pushRef("ntilde", 241), this.pushRef("ograve", 242), this.pushRef("oacute", 243), this.pushRef("ocirc", 244), this.pushRef("otilde", 245), this.pushRef("ouml", 246), this.pushRef("divide", 247), this.pushRef("oslash", 248), this.pushRef("ugrave", 249), this.pushRef("uacute", 250), this.pushRef("ucirc", 251), this.pushRef("uuml", 252), this.pushRef("yacute", 253), this.pushRef("thorn", 254), this.pushRef("yuml", 255), this.pushRef("OElig", 338), this.pushRef("oelig", 339), this.pushRef("Scaron", 352), this.pushRef("scaron", 353), this.pushRef("Yuml", 376), this.pushRef("fnof", 402), this.pushRef("circ", 710), this.pushRef("tilde", 732), this.pushRef("Alpha", 913), this.pushRef("Beta", 914), this.pushRef("Gamma", 915), this.pushRef("Delta", 916), this.pushRef("Epsilon", 917), this.pushRef("Zeta", 918), this.pushRef("Eta", 919), this.pushRef("Theta", 920), this.pushRef("Iota", 921), this.pushRef("Kappa", 922), this.pushRef("Lambda", 923), this.pushRef("Mu", 924), this.pushRef("Nu", 925), this.pushRef("Xi", 926), this.pushRef("Omicron", 927), this.pushRef("Pi", 928), this.pushRef("Rho", 929), this.pushRef("Sigma", 931), this.pushRef("Tau", 932), this.pushRef("Upsilon", 933), this.pushRef("Phi", 934), this.pushRef("Chi", 935), this.pushRef("Psi", 936), this.pushRef("Omega", 937), this.pushRef("alpha", 945), this.pushRef("beta", 946), this.pushRef("gamma", 947), this.pushRef("delta", 948), this.pushRef("epsilon", 949), this.pushRef("zeta", 950), this.pushRef("eta", 951), this.pushRef("theta", 952), this.pushRef("iota", 953), this.pushRef("kappa", 954), this.pushRef("lambda", 955), this.pushRef("mu", 956), this.pushRef("nu", 957), this.pushRef("xi", 958), this.pushRef("omicron", 959), this.pushRef("pi", 960), this.pushRef("rho", 961), this.pushRef("sigmaf", 962), this.pushRef("sigma", 963), this.pushRef("tau", 964), this.pushRef("upsilon", 965), this.pushRef("phi", 966), this.pushRef("chi", 967), this.pushRef("psi", 968), this.pushRef("omega", 969), this.pushRef("thetasym", 977), this.pushRef("upish", 978), this.pushRef("piv", 982), this.pushRef("ensp", 8194), this.pushRef("emsp", 8195), this.pushRef("thinsp", 8201), this.pushRef("zwnj", 8204), this.pushRef("zwj", 8205), this.pushRef("lrm", 8206), this.pushRef("rlm", 8207), this.pushRef("ndash", 8211), this.pushRef("mdash", 8212), this.pushRef("lsquo", 8216), this.pushRef("rsquo", 8217), this.pushRef("sbquo", 8218), this.pushRef("ldquo", 8220), this.pushRef("rdquo", 8221), this.pushRef("bdquo", 8222), this.pushRef("dagger", 8224), this.pushRef("Dagger", 8225), this.pushRef("bull", 8226), this.pushRef("hellip", 8230), this.pushRef("permil", 8240), this.pushRef("prime", 8242), this.pushRef("Prime", 8243), this.pushRef("lsaquo", 8249), this.pushRef("rsaquo", 8250), this.pushRef("oline", 8254), this.pushRef("frasl", 8260), this.pushRef("euro", 8364), this.pushRef("image", 8465), this.pushRef("weierp", 8472), this.pushRef("real", 8476), this.pushRef("trade", 8482), this.pushRef("alefsym", 8501), this.pushRef("larr", 8592), this.pushRef("uarr", 8593), this.pushRef("rarr", 8594), this.pushRef("darr", 8595), this.pushRef("harr", 8596), this.pushRef("crarr", 8629), this.pushRef("lArr", 8656), this.pushRef("uArr", 8657), this.pushRef("rArr", 8658), this.pushRef("dArr", 8659), this.pushRef("hArr", 8660), this.pushRef("forall", 8704), this.pushRef("part", 8706), this.pushRef("exist", 8707), this.pushRef("empty", 8709), this.pushRef("nabla", 8711), this.pushRef("isin", 8712), this.pushRef("notin", 8713), this.pushRef("ni", 8715), this.pushRef("prod", 8719), this.pushRef("sum", 8721), this.pushRef("minus", 8722), this.pushRef("lowast", 8727), this.pushRef("radic", 8730), this.pushRef("prop", 8733), this.pushRef("infin", 8734), this.pushRef("ang", 8736), this.pushRef("and", 8743), this.pushRef("or", 8744), this.pushRef("cap", 8745), this.pushRef("cup", 8746), this.pushRef("int", 8747), this.pushRef("there4", 8756), this.pushRef("sim", 8764), this.pushRef("cong", 8773), this.pushRef("asymp", 8776), this.pushRef("ne", 8800), this.pushRef("equiv", 8801), this.pushRef("le", 8804), this.pushRef("ge", 8805), this.pushRef("sub", 8834), this.pushRef("sup", 8835), this.pushRef("nsub", 8836), this.pushRef("sube", 8838), this.pushRef("supe", 8839), this.pushRef("oplus", 8853), this.pushRef("otimes", 8855), this.pushRef("perp", 8869), this.pushRef("sdot", 8901), this.pushRef("lceil", 8968), this.pushRef("rceil", 8969), this.pushRef("lfloor", 8970), this.pushRef("rfloor", 8971), this.pushRef("lang", 9001), this.pushRef("rang", 9002), this.pushRef("loz", 9674), this.pushRef("spades", 9824), this.pushRef("clubs", 9827), this.pushRef("hearts", 9829), this.pushRef("diams", 9830);
}, marknote.EntityRefs.prototype.getRefs=function () {
    return this.refs;
}, marknote.EntityRefs.prototype.pushRef=function (t, e) {
    this.refs.push(new marknote.EntityRef(t, String.fromCharCode(e)));
}, marknote.Parser=function () {
    this.dataType=marknote.constants.DATATYPE_PARSER, this.isSw8tXmlContent=!1, this.doc=new marknote.Document, this.status=0, this.statusMessage="success", this.xhr=null, this.xhrStatus=null, this.xhrStatusText=null, this.xhrResponseText=null;
}, marknote.Parser.prototype.getDocument=function () {
    return this.doc;
}, marknote.Parser.prototype.getXHR=function () {
    return this.xhr;
}, marknote.Parser.prototype.getXHRStatus=function () {
    return this.xhrStatus;
}, marknote.Parser.prototype.getXHRStatusText=function () {
    return this.xhrStatusText;
}, marknote.Parser.prototype.getXHRResponseText=function () {
    return this.xhrResponseText;
}, marknote.Parser.prototype.getStatus=function () {
    return this.status;
}, marknote.Parser.prototype.setStatus=function (t) {
    this.status=t;
}, marknote.Parser.prototype.getStatusMessage=function () {
    return this.statusMessage;
}, marknote.Parser.prototype.setStatusMessage=function (t) {
    this.statusMessage=t;
}, marknote.Parser.prototype.parseProcessingInstructions=function (t, e) {
    for (var n, s, o, r, a, i, h=new marknote.Tokenizer(t).tokenize(), u=0, m=0, p=!1, T=0; T<h.length; T++) {
        switch (h[T].getType()) {
            case marknote.constants.TOKENTYPE_PI_START: u=h[T].getPosition(), s="", o=new Array, p=!0, s=h[T+1].getContent(), T++; break; case marknote.constants.TOKENTYPE_PI_END: p&&marknote.Util.isUndefinedNullOrBlank(s)&&(s="xml"), p=!1, m=h[T].getPosition()+2, n=new marknote.ProcessingInstruction(s, o), e.addProcessingInstruction(n); break; case marknote.constants.TOKENTYPE_ATTRIBUTE: p&&(a=h[T-1].getContent(), i=(i=h[T+1].getContent()).slice(1, i.length-1), r=new marknote.Attribute(a, i), o.push(r)), T++;
        }
    } if (m>u) {
        const c=u>0?t.slice(0, u):""; const k=t.slice(m+1); return marknote.Util.trim(c+k);
    } return t;
}, marknote.Parser.prototype.parseProcessingInstructions=function (t, e) {
    for (var n, s, o, r, a, i, h=new marknote.Tokenizer(t).tokenize(), u=0, m=0, p=!1, T=0; T<h.length; T++) {
        switch (h[T].getType()) {
            case marknote.constants.TOKENTYPE_PI_START: u=h[T].getPosition(), s="", o=new Array, p=!0, s=h[T+1].getContent(), T++; break; case marknote.constants.TOKENTYPE_PI_END: p&&marknote.Util.isUndefinedNullOrBlank(s)&&(s="xml"), p=!1, m=h[T].getPosition()+2, n=new marknote.ProcessingInstruction(s, o), e.addProcessingInstruction(n); break; case marknote.constants.TOKENTYPE_ATTRIBUTE: p&&(a=h[T-1].getContent(), i=(i=h[T+1].getContent()).slice(1, i.length-1), r=new marknote.Attribute(a, i), o.push(r)), T++;
        }
    } if (m>u) {
        const c=u>0?t.slice(0, u):""; const k=t.slice(m+1); return marknote.Util.trim(c+k);
    } return t;
}, marknote.Parser.prototype.parseDOCTYPE=function (t, e) {
    let n; const s=new marknote.Tokenizer(t).tokenize(); const o=new marknote.DOCTYPE; try {
        for (let r=0; r<s.length; r++) {
            switch (s[r].getType()) {
                case marknote.constants.TOKENTYPE_DOCTYPE_START: if (e&&e.setDOCTYPE(o), s[++r].isTagClose()) return o; if (o.setTopElement(s[r].getContent()), n=s[++r].getContent().toUpperCase(), o.setAvailability(n), "SYSTEM"==n) {
                    if (s[++r].isTagClose()) return o; o.setURL(s[r].getContent());
                } else if ("PUBLIC"==n) {
                    if (s[++r].isTagClose()) return o; if (o.setFPI(s[r].getContent()), s[++r].isTagClose()) return o; if (o.setURL(s[r].getContent()), s[++r].isTagClose()) return o; o.setInternalSubset(s[r].getContent());
                } break; case marknote.constants.TOKENTYPE_TAG_CLOSE: return o;
            }
        }
    } catch (t) {
        window.alert(t);
    } return o;
}, marknote.Parser.prototype.parse=function (t) {
    return this.xhr=null, this.xhrStatus=null, this.xhrStatusText=null, this.xhrResponseText=null, this.doc=new marknote.Document, this.setStatus(0), t=this.parseProcessingInstructions(t, this.doc), this.parseDOCTYPE(t, this.doc), this.parseElement(t, this.doc), this.doc;
}, marknote.Parser.prototype.parseURL=function (t, e, n) {
    const s=new marknote.SJAX; const o=s.read(t, e, n); return this.xhr=s.getRequest(), this.xhrStatus=s.getStatus(), this.xhrStatusText=s.getStatusText(), this.xhrResponseText=s.getResponseText(), o;
}, marknote.Parser.prototype.parseComment=function (t, e, n) {
    const s=e[n+1].content==marknote.constants.COMMENT_START?"":e[n+1].content; const o=new marknote.Comment(s); return t&&t.addContent(o), n=e[n+1].content==marknote.constants.COMMENT_START?n+1:n+2;
}, marknote.Parser.prototype.parseElement=function (t, e, n) {
    for (let s=new marknote.Tokenizer(t).tokenize(), o=0, r=0, a=!1, i=0; i<s.length; i++) {
        if (s[i].isCommentStart())i=this.parseComment(n, s, i); else {
            for (;i<s.length; i++) {
                if (s[i].isTagOpen()) {
                    o=i; break;
                }
            } if (o!=i) return; const h=new marknote.Element(s[o+1].content); for (n?n.addContent(h):e.setRootElement(h), i=o+1; i<s.length; i++) {
                switch (s[i].getType()) {
                    case marknote.constants.TOKENTYPE_SELF_TERMINATING: h.isSelfTerminated=!0, o=i; break; case marknote.constants.TOKENTYPE_TAG_CLOSE: h.isSelfTerminated=!1, o=i; break; case marknote.constants.TOKENTYPE_ATTRIBUTE: try {
                        const u=s[i-1].content; const m=s[i+1].content; const p=m.slice(1, m.length-1); const T=new marknote.Attribute(u, p); h.putAttribute(T);
                    } catch (t) {}
                } if (o==i) break;
            } if (!o==i) return; switch (s[o].content) {
                case marknote.constants.TAG_CLOSE_SELF_TERMINATING: if (a=s[o+1]&&s[o+1].content==marknote.constants.COMMENT_START) for (r=o+1; a;)(a=s[(r=this.parseComment(n, s, r))+1]&&s[r+1].content==marknote.constants.COMMENT_START)&&r++; else r=o; break; case marknote.constants.TAG_CLOSE: if (s[o+1]) {
                    if (s[o+1].isCDATAStart()) {
                        let c=s[i+2].content; let k=i+3; s[i+2].isCDATAEnd()&&(c="", k=i+2); const l=new marknote.CDATA(c); h.addContent(l), o=k;
                    } else s[o+1].isLiteral&&h.setText(s[o+1].getContent());
                } else r=o; for (i=o+1; i<s.length; i++) {
                        var f=s[i].getContent()==marknote.constants.ENDTAG_OPEN&&s[i+1].getContent()==h.getName(); if (f) {
                            if ((a=s[(r=i)+3]&&s[r+3].content==marknote.constants.COMMENT_START)&&(r=this.parseComment(n, s, r+3)), !!(r==o+1||s[o+1].isLiteral&&r==o+2)) break; const E=s[o+1].getPosition(); const A=s[r].getPosition(); const g=t.slice(E, A); this.parseElement(g, e, h); break;
                        }
                    } if (!f) return; break; default: return;
            }i=r;
        }
    }
}, marknote.ProcessingInstruction=function (t, e) {
    this.dataType=marknote.constants.DATATYPE_PROCESSINGINSTRUCTION, this.isSw8tXmlContent=!1, this.target=t||"xml", this.data=t&&!e?new Array:e||[new marknote.Attribute("version", "1.0"), new marknote.Attribute("encoding", "UTF-8")];
}, marknote.ProcessingInstruction.prototype.getData=function () {
    return this.data;
}, marknote.ProcessingInstruction.prototype.setData=function (t) {
    this.data=t;
}, marknote.ProcessingInstruction.prototype.getTarget=function () {
    return this.target;
}, marknote.ProcessingInstruction.prototype.setTarget=function (t) {
    this.target=t;
}, marknote.ProcessingInstruction.prototype.setAttribute=function (t) {
    const e=this.getData(); if (marknote.Util.dataType(t)==marknote.constants.DATATYPE_ATTRIBUTE) for (let n=0; n<e.length; n++) if (e[n].getName()==t.getName()) return void e[n].setValue(t.getValue());
}, marknote.ProcessingInstruction.prototype.getAttributeValue=function (t) {
    for (let e=this.getData(), n=0; n<e.length; n++) if (e[n].getName()==t) return e[n];
}, marknote.ProcessingInstruction.prototype.setAttributeValue=function (t, e) {
    const n=this.getData(); if (t) {
        void 0===e&&(e=""); for (let s=0; s<n.length; s++) if (n[s].getName()==t) return void n[s].setValue(e); n.push(new marknote.Attribute(t, e));
    }
}, marknote.ProcessingInstruction.prototype.clone=function () {
    return (new marknote.Cloner).cloneProcessingInstruction(this);
}, marknote.QName=function (t, e) {
    this.dataType=marknote.constants.DATATYPE_QNAME, this.isSw8tXmlContent=!1, this.prefix=marknote.Util.nothingToBlank(t), this.localPart=marknote.Util.nothingToBlank(e);
}, marknote.QName.prototype.getName=function () {
    let t=""; return marknote.Util.hasValue(this.prefix)&&(t+=`${this.prefix}:`), marknote.Util.hasValue(this.localPart)&&(t+=this.localPart), t;
}, marknote.QName.prototype.setName=function (t) {
    const e=marknote.Util.nothingToBlank(t); const n=e.split(":"); n.length>1?(this.prefix=n[0], this.localPart=n[1]):(this.prefix="", this.localPart=e);
}, marknote.QName.prototype.getPrefix=function () {
    return marknote.Util.nothingToBlank(this.prefix);
}, marknote.QName.prototype.setPrefix=function (t) {
    this.prefix=marknote.Util.nothingToBlank(t);
}, marknote.QName.prototype.getLocalPart=function () {
    return marknote.Util.nothingToBlank(this.localPart);
}, marknote.QName.prototype.setLocalPart=function (t) {
    this.localPart=marknote.Util.nothingToBlank(t);
}, marknote.QName.prototype.toString=function () {
    return this.getName();
}, marknote.QName.prototype.clone=function () {
    return (new marknote.Cloner).clone(this);
}, marknote.Text=function (t) {
    this.dataType=marknote.constants.DATATYPE_TEXT, this.isSw8tXmlContent=!0, this.text=marknote.Util.erefEncode(marknote.Util.nothingToBlank(t));
}, marknote.Text.prototype.getText=function (t) {
    marknote.Util.isEmpty(t)&&(t=!0); const e=marknote.Util.nothingToBlank(this.text); return t?marknote.Util.erefDecode(e):e;
}, marknote.Text.prototype.setText=function (t) {
    this.text=marknote.Util.erefEncode(marknote.Util.nothingToBlank(t));
}, marknote.Text.prototype.toString=function () {
    return this.getText();
}, marknote.Text.prototype.clone=function () {
    return (new marknote.Cloner).clone(this);
}, marknote.Token=function (t, e) {
    this.dataType=marknote.constants.DATATYPE_TOKEN, this.isSwt8XmlContent=!1, this.content=void 0===t?new String:t, this.isLiteral=!1, this.position=e||0;
}, marknote.Token.prototype.getContent=function () {
    return this.content;
}, marknote.Token.prototype.setContent=function (t) {
    this.content=t;
}, marknote.Token.prototype.getPosition=function () {
    return this.position;
}, marknote.Token.prototype.setPosition=function (t) {
    this.position=t;
}, marknote.Token.prototype.hasValue=function () {
    try {
        return marknote.Util.hasValue(this.content);
    } catch (t) {
        return !1;
    }
}, marknote.Token.prototype.isDOCTYPEStart=function () {
    return this.content==marknote.constants.DOCTYPE_START;
}, marknote.Token.prototype.isPIStart=function () {
    return this.content==marknote.constants.PI_START;
}, marknote.Token.prototype.isPIEnd=function () {
    return this.content==marknote.constants.PI_END;
}, marknote.Token.prototype.isSelfTerminating=function () {
    return this.content==marknote.constants.TAG_CLOSE_SELF_TERMINATING;
}, marknote.Token.prototype.isEndTag=function () {
    return this.content==marknote.constants.ENDTAG_OPEN;
}, marknote.Token.prototype.isCommentStart=function () {
    return this.content==marknote.constants.COMMENT_START;
}, marknote.Token.prototype.isCommentEnd=function () {
    return this.content==marknote.constants.COMMENT_END;
}, marknote.Token.prototype.isAttribute=function () {
    return this.content==marknote.constants.EQUALS;
}, marknote.Token.prototype.isCDATAStart=function () {
    return this.content==marknote.constants.CDATA_START;
}, marknote.Token.prototype.isCDATAEnd=function () {
    return this.content==marknote.constants.CDATA_END;
}, marknote.Token.prototype.isTagOpen=function () {
    return this.content==marknote.constants.TAG_OPEN;
}, marknote.Token.prototype.isTagClose=function () {
    return this.content==marknote.constants.TAG_CLOSE;
}, marknote.Token.prototype.isQuote=function () {
    return this.content==marknote.constants.SQUOTE||this.content==marknote.constants.DQUOTE;
}, marknote.Token.prototype.isQuoted=function () {
    return "\""==this.content.charAt(0)&&"\""==this.content.charAt(this.content.length-1);
}, marknote.Token.prototype.getType=function () {
    return this.isDOCTYPEStart()?marknote.constants.TOKENTYPE_DOCTYPE_START:this.isPIStart()?marknote.constants.TOKENTYPE_PI_START:this.isPIEnd()?marknote.constants.TOKENTYPE_PI_END:this.isSelfTerminating()?marknote.constants.TOKENTYPE_SELF_TERMINATING:this.isEndTag()?marknote.constants.TOKENTYPE_ENDTAG_OPEN:this.isCommentStart()?marknote.constants.TOKENTYPE_COMMENT_START:this.isCommentEnd()?marknote.constants.TOKENTYPE_COMMENT_END:this.isAttribute()?marknote.constants.TOKENTYPE_ATTRIBUTE:this.isCDATAStart()?marknote.constants.TOKENTYPE_CDATA_START:this.isCDATAEnd()?marknote.constants.TOKENTYPE_CDATA_END:this.isTagOpen()?marknote.constants.TOKENTYPE_TAG_OPEN:this.isTagClose()?marknote.constants.TOKENTYPE_TAG_CLOSE:this.isQuote()?marknote.constants.TOKENTYPE_QUOTE:this.isQuoted()?marknote.constants.TOKENTYPE_QUOTED:marknote.constants.TOKENTYPE_NORMAL;
}, marknote.Tokenizer=function (t) {
    this.dataType=marknote.constants.DATATYPE_TOKENIZER, this.isSw8tXmlContent=!1, this.setMarkup(t), this.tokens=new Array;
}, marknote.Tokenizer.prototype.getMarkup=function () {
    return this.markup;
}, marknote.Tokenizer.prototype.setMarkup=function (t) {
    this.markup=t||"";
}, marknote.Tokenizer.prototype.determineTokenType=function (t, e) {
    const n=this.markup.charAt(t); const s=t>0?this.markup.charAt(t-1):null; return marknote.Util.hasWhitespace(n)?marknote.constants.TOKENTYPE_WHITESPACE:this.markup.slice(t, t+9)==marknote.constants.DOCTYPE_START?marknote.constants.TOKENTYPE_DOCTYPE_START:this.markup.slice(t, t+9)==marknote.constants.CDATA_START?marknote.constants.TOKENTYPE_CDATA_START:this.markup.slice(t, t+4)==marknote.constants.COMMENT_START?marknote.constants.TOKENTYPE_COMMENT_START:this.markup.slice(t, t+3)==marknote.constants.CDATA_END?marknote.constants.TOKENTYPE_CDATA_END:this.markup.slice(t, t+2)==marknote.constants.PI_START?marknote.constants.TOKENTYPE_PI_START:this.markup.slice(t, t+2)==marknote.constants.PI_END?marknote.constants.TOKENTYPE_PI_END:this.markup.slice(t, t+2)==marknote.constants.TAG_CLOSE_SELF_TERMINATING?marknote.constants.TOKENTYPE_SELF_TERMINATING:this.markup.slice(t, t+2)==marknote.constants.ENDTAG_OPEN?marknote.constants.TOKENTYPE_ENDTAG_OPEN:n==marknote.constants.EQUALS&&e?marknote.constants.TOKENTYPE_ATTRIBUTE:n==marknote.constants.TAG_OPEN?marknote.constants.TOKENTYPE_TAG_OPEN:n==marknote.constants.TAG_CLOSE?marknote.constants.TOKENTYPE_TAG_CLOSE:n==marknote.constants.SQUOTE?marknote.constants.TOKENTYPE_QUOTE:n!=marknote.constants.DQUOTE||null===s&&"\\"==s?n==marknote.constants.BRACKET_OPEN?marknote.constants.TOKENTYPE_BRACKET_OPEN:marknote.constants.TOKENTYPE_NORMAL:marknote.constants.TOKENTYPE_QUOTE;
}, marknote.Tokenizer.prototype.isQuote=function (t) {
    return t==marknote.constants.SQUOTE||t==marknote.constants.DQUOTE;
}, marknote.Tokenizer.prototype.toString=function () {
    for (var t=this.tokens, e=new String, n=0; n<t.length; n++)n>0&&(e+=","), e+=t[n].content; return e;
}, marknote.Tokenizer.prototype.tokenizeTagContent=function (t, e) {
    for (var n, s, o=!1, r=e+1; r<this.markup.length; r++) {
        if (this.markup.slice(r, r+9)==marknote.constants.CDATA_START) {
            o=!0; break;
        } if (this.markup.charAt(r)==marknote.constants.TAG_OPEN) break;
    } if (o) {
        for (s=new marknote.Token(marknote.constants.CDATA_START, r), t.push(s), (s=new marknote.Token("", r+9)).isLiteral=!0, n=marknote.constants.CDATA_END, e=r+9; e<this.markup.length; e++) {
            if (this.markup.slice(e, e+3)==n) {
                t.push(s), s=new marknote.Token(n, e), t.push(s), e+=2, s=new marknote.Token("", e+3); break;
            }s.content+=this.markup.charAt(e);
        }
    } else (s=new marknote.Token("", e+1)).isLiteral=!0; return { token: s, c: e };
}, marknote.Tokenizer.prototype.tokenize=function () {
    const t=new Array; this.tokens=t; for (var e, n, s, o, r=new marknote.Token, a=!1, i=!1, h=0; h<this.markup.length; h++) {
        let u=this.determineTokenType(h, a); switch (u) {
            case marknote.constants.TOKENTYPE_DOCTYPE_START: i=!0, r.hasValue()&&t.push(r), r=new marknote.Token(marknote.constants.DOCTYPE_START, h), h+=8; break; case marknote.constants.TOKENTYPE_BRACKET_OPEN: if (i) {
                for (r.hasValue()&&t.push(r), (r=new marknote.Token(this.markup.charAt(h), h)).isLiteral=!0, e=marknote.constants.BRACKET_CLOSE, ++h; h<this.markup.length; h++) {
                    if (r.content+=this.markup.charAt(h), this.markup.charAt(h)==e) {
                        r.hasValue()&&t.push(r), r=new marknote.Token("", h+1); break;
                    }
                }
            } else r.content+=this.markup.charAt(h); break; case marknote.constants.TOKENTYPE_PI_START: var m; var p=""; for (r.hasValue()&&t.push(r), r=new marknote.Token(marknote.constants.PI_START, h), t.push(r), a=!0, h=n=h+2; h<this.markup.length; h++) {
                if ((m=this.determineTokenType(h, a))==marknote.constants.TOKENTYPE_PI_END) {
                    p=this.markup.slice(n, h), marknote.Util.isUndefinedNullOrBlank(p)&&(p="xml"), r=new marknote.Token(p, h), t.push(r), r=new marknote.Token(marknote.constants.PI_END, h), t.push(r), a=!1; break;
                } if (m==marknote.constants.TOKENTYPE_WHITESPACE) {
                    ""===p&&(p=this.markup.slice(n, h), marknote.Util.isUndefinedNullOrBlank(p)&&(p="xml"), r=new marknote.Token(p, h), t.push(r)); break;
                }
            }r=new marknote.Token("", h); break; case marknote.constants.TOKENTYPE_PI_END: r=new marknote.Token(marknote.constants.PI_END, h), t.push(r), a=!1, h+=2, r=new marknote.Token("", h); break; case marknote.constants.TOKENTYPE_WHITESPACE: if (r.isLiteral) {
                r.content+=this.markup.charAt(h); break;
            } for (++h; h<this.markup.length; h++) {
                    if (!marknote.Util.hasWhitespace(this.markup.charAt(h))) {
                        r.hasValue()&&t.push(r), (u=this.determineTokenType(h, a))==marknote.constants.TOKENTYPE_NORMAL?(s=this.markup.charAt(h), r=new marknote.Token(s, h)):(h--, r=new marknote.Token("", h+1)); break;
                    }
                } break; case marknote.constants.TOKENTYPE_SELF_TERMINATING: case marknote.constants.TOKENTYPE_ENDTAG_OPEN: a=!1, r.hasValue()&&t.push(r), (r=new marknote.Token(this.markup.slice(h, h+2), h)).hasValue()&&t.push(r), h++, r=new marknote.Token("", h+1); break; case marknote.constants.TOKENTYPE_TAG_CLOSE: a=!1, i=!1, r.hasValue()&&t.push(r), r=new marknote.Token(marknote.constants.TAG_CLOSE, h), t.push(r); var T=this.tokenizeTagContent(t, h); r=T.token, h=T.c; break; case marknote.constants.TOKENTYPE_ATTRIBUTE: case marknote.constants.TOKENTYPE_TAG_OPEN: this.markup.charAt(h)==marknote.constants.TAG_OPEN&&(a=!0), r.hasValue()&&t.push(r), (r=new marknote.Token(this.markup.charAt(h), h)).hasValue()&&t.push(r), r=new marknote.Token("", h+1); break; case marknote.constants.TOKENTYPE_QUOTE: for (r.hasValue()&&t.push(r), (r=new marknote.Token(this.markup.charAt(h), h)).isLiteral=!0, e=this.markup.charAt(h), ++h; h<this.markup.length; h++) {
                if (r.content+=this.markup.charAt(h), this.markup.charAt(h)==e) {
                    r.hasValue()&&t.push(r), r=new marknote.Token("", h+1); break;
                }
            } break; case marknote.constants.TOKENTYPE_COMMENT_START: for (r.hasValue()&&t.push(r), r=new marknote.Token(marknote.constants.COMMENT_START, h), t.push(r), e=marknote.constants.COMMENT_END, h=n=h+4; h<this.markup.length; h++) {
                if (this.markup.slice(h, h+3)==e) {
                    o=this.markup.slice(n, h), (r=new marknote.Token(o, n)).isLiteral=!0, t.push(r), r=new marknote.Token(e, h), t.push(r), h+=2; break;
                }
            }r=new marknote.Token("", h); break; default: r.content+=this.markup.charAt(h);
        }
    } return r.hasValue()&&t.push(r), t;
}, marknote.Util=new Object, marknote.Util.hasWhitespace=function (t) {
    if (null==t) return !1; for (let e=`${t}`, n=new RegExp(/^\s+$/), s=0; s<e.length; s++) {
        const o=e.charAt(s); if (n.test(o)) return !0;
    } return !1;
}, marknote.Util.isUndefinedNullOrBlank=function (t) {
    return !marknote.Util.hasValue(t);
}, marknote.Util.isEmpty=marknote.Util.isUndefinedNullOrBlank, marknote.Util.nothingToBlank=function (t) {
    return marknote.Util.isEmpty(t)?"":t;
}, marknote.Util.isAllWhitespace=function (t) {
    if (null==t) return !1; for (let e=`${t}`, n=0; n<e.length; n++) {
        const s=e.charAt(n); if (!marknote.Util.hasWhitespace(s)) return !1;
    } return !0;
}, marknote.Util.hasValue=function (t) {
    if (null==t) return !1; const e=`${t}`; return !(0===e.length||marknote.Util.isAllWhitespace(e));
}, marknote.Util.trim=function (t) {
    return (`${t}`).replace(/^\s+|\s+$/g, "");
}, marknote.Util.leftTrim=function (t) {
    return (`${t}`).replace(/^\s+/, "");
}, marknote.Util.rightTrim=function (t) {
    return (`${t}`).replace(/\s+$/, "");
}, marknote.Util.splitByWhitespace=function (t) {
    return null==t?t:(`${marknote.Util.trim(t)}`).split(/\s+/);
}, marknote.Util.removeArrayItem=function (t, e) {
    try {
        for (let n=0; n<t.length; n++)n==e&&t.splice(n, 1);
    } catch (t) {} return t;
}, marknote.Util.dataType=function (t) {
    return null!=t&&t.dataType&&"string"==typeof t.dataType&&t.dataType.length>9&&"marknote."==t.dataType.slice(0, 9)?t.dataType:typeof t;
}, marknote.Util.replaceAll=function (t, e, n) {
    for (var s=`${t}`, o=0, r=""; -1!=s.indexOf(e, o);)r+=s.substring(o, s.indexOf(e, o)), r+=n, o=s.indexOf(e, o)+e.length; return r+=t.substring(o, t.length);
}, marknote.Util.erefEncode=function (t) {
    const e=`${t}`; return marknote.Util.erefTransform(e, !0);
}, marknote.Util.erefXMLEncode=function (t) {
    const e=`${t}`; return marknote.Util.erefTransform(e, !0, !0);
}, marknote.Util.erefDecode=function (t) {
    const e=`${t}`; return marknote.Util.erefTransform(e, !1);
}, marknote.Util.erefXMLDecode=function (t) {
    const e=`${t}`; return marknote.Util.erefTransform(e, !1, !0);
}, marknote.Util.erefTransform=function (t, e, n) {
    const s=n?(new marknote.XMLEntityRefs).getRefs():(new marknote.EntityRefs).getRefs(); let o=new String; o+=t; for (let r=0; r<s.length; r++) {
        const a=`&${s[r].name};`; const i=s[r].character; const h=e?i:a; const u=e?a:i; o=marknote.Util.replaceAll(o, h, u);
    } return marknote.Util.replaceAll(o, "&quot;", "\"");
}, marknote.Writer=function () {
    this.dataType=marknote.constants.DATATYPE_WRITER, this.isSw8tXmlContent=!1;
}, marknote.Writer.prototype.outputDocument=function (t, e) {
    for (var n=new String, s=t.getProcessingInstructions(), o=t.getDOCTYPE(), r=0; r<s.length; r++) {
        r>0&&(n+="\n"), n+=marknote.constants.PI_START; const a=s[r]; n+=a.getTarget(); for (let i=a.getData(), h=0; h<i.length; h++) {
            const u=i[h]; n+=` ${u.getName()}="${u.getValue()}"`;
        }n+=` ${marknote.constants.PI_END}`;
    }o&&(n+=`\n${o.toString()}`); const m=t.getRootElement(); return n+=this.outputElement(m, 0, e);
}, marknote.Writer.prototype.outputElement=function (t, e, n) {
    let s; s=`\n${this.calculateIndent(e, n)}${marknote.constants.TAG_OPEN}${t.getName()}`; for (let o=0; o<t.getAttributes().length; o++) {
        const r=t.getAttributeAt(o); s+=` ${r.getName()}${marknote.constants.EQUALS}${marknote.constants.DQUOTE}${r.getValue(!1)}${marknote.constants.DQUOTE}`;
    } return t.isSelfTerminated||!t.hasContents()?s+=` ${marknote.constants.TAG_CLOSE_SELF_TERMINATING}`:(0===e&&(e=1), (s+=marknote.constants.TAG_CLOSE)+this.outputContents(t, e, n)+((1==t.contents.length&&t.getText().length>0&&this.hasStrictText(t)?"":this.calculateIndent(e, n))+marknote.constants.ENDTAG_OPEN+t.getName()+marknote.constants.TAG_CLOSE));
}, marknote.Writer.prototype.hasStrictText=function (t) {
    for (let e=0; e<t.contents.length; e++) {
        const n=t.getContentAt(e); if (marknote.Util.dataType(n)!=marknote.constants.DATATYPE_TEXT) return !1;
    } return !0;
}, marknote.Writer.prototype.calculateIndent=function (t, e) {
    if (0===t) return ""; let n=""; e=e&&marknote.Util.isAllWhitespace(e)?e:"\t"; for (let s=1; s<t; s++)n+=e; return n;
}, marknote.Writer.prototype.outputContents=function (t, e, n) {
    for (var s, o, r=this.calculateIndent(e+1, n), a=this.calculateIndent(e+2, n), i=new String, h="", u=0; u<t.getContents().length; u++) {
        const m=t.getContentAt(u); switch (h=marknote.Util.dataType(m)) {
            case marknote.constants.DATATYPE_COMMENT: for (i+=`\n${r}${marknote.constants.COMMENT_START}`, o=m.getText().split("\n"), s=0; s<o.length; s++)i+=`\n${a}${marknote.Util.leftTrim(o[s])}`; i+=`\n${r}${marknote.constants.COMMENT_END}`; break; case marknote.constants.DATATYPE_ELEMENT: i+=this.outputElement(m, e+1, n); break; case marknote.constants.DATATYPE_TEXT: i+=m.getText(!1); break; case marknote.constants.DATATYPE_CDATA: i+=`\n${r}${marknote.constants.CDATA_START}\n${a}${m.getText()}\n${r}${marknote.constants.CDATA_END}`;
        }
    } return h!=marknote.constants.DATATYPE_TEXT&&(i+="\n"), i;
};
