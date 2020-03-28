"use strict"; let currentSetsCheckboxes=[]; let currentKingdom={}; let isGenerating=!1; let isGeneratingFromCode=!1; let loadedCards=0; let gamesPlayed=0; const cardCounts={}; let cardWorker=void 0; let removeCardsTimeout=void 0; const WIKI_PREFIX="http://wiki.dominionstrategy.com/index.php/"; const DEBUG="cards"; const REPEAT=!1; const REPEAT_MAX=50; const totalSets={ "Dominion": 0, "Intrigue": 1, "Seaside": 2, "Alchemy": 3, "Prosperity": 4, "Cornucopia": 5, "Hinterlands": 6, "Dark Ages": 7, "Guilds": 8, "Adventures": 9, "Empires": 10 }; function generateNewKingdom() {
    if (!isGenerating&&!isGeneratingFromCode&&void 0===cardWorker) {
        isGenerating=!0, isGeneratingFromCode=!1, currentKingdom.kingdomCards?animateCardsOut():$(".error-msg").removeClass("error-visible"); $("#Generate-Drawer").hasClass("drawer-open"); if ($("#Generate-Drawer").trigger("drawer-close"), setLoadingProgress(0), $("#LoadingIndicator").addClass("loading"), $("#LoadingIndicator").addClass("animating"), $(".toolbar-cards").prop("disabled", !0), $(".toolbar-shuffle").prop("disabled", !0), "undefined"!=typeof Worker) {
            if (void 0===cardWorker) {
                for (setCheckbox of (cardWorker=new Worker("./app/scripts/card-selection/card-selector/card-selector.js"), selectedSets=[], currentSetsCheckboxes))setCheckbox.prop("checked")&&selectedSets.push(setCheckbox.attr("value")); let e="off"; let a="off"; let o="off"; let r="off"; let t="off"; let d="off"; void 0!==typeof Storage&&(e=localStorage.getItem("Sets-Selection-Dominion1st Edition"), a=localStorage.getItem("Sets-Selection-Dominion2nd Edition"), o=localStorage.getItem("Sets-Selection-Intrigue1st Edition"), r=localStorage.getItem("Sets-Selection-Intrigue2nd Edition"), t="on"===localStorage.getItem("Generate-Drawer-ClusterPotions"), d="on"===localStorage.getItem("Generate-Drawer-DistributeSets")); const n={ "debug": DEBUG, "sets": selectedSets, "Dominion1st Edition": e, "Dominion2nd Edition": a, "Intrigue1st Edition": o, "Intrigue2nd Edition": r, "clusterPotions": t, "distributeSets": d, "appDir": absolutePath(window.location.href, "/"), "randomness": 10 }; $("#Generate-Button-Fab").addClass("hidden"), $(".cards-table-state").removeClass("state-open"), cardWorker.postMessage(n), cardWorker.onmessage=function (e) {
                    data=e.data, "success"===data.result?(cardWorker.terminate(), cardWorker=void 0, setLoadingProgress(17), window.setTimeout(() => {
                        setKingdomCards(data);
                    }, 500)):"progress"===data.result?setLoadingProgress(data.progress):"error"===data.result&&(cardWorker.terminate(), cardWorker=void 0, showError(data.message));
                }, cardWorker.onerror=function (e) {
                    void 0!==cardWorker&&(cardWorker.terminate(), cardWorker=void 0), showError("There was a problem generating the Kingdom"), console.error(`${e.message}\nAt line: ${e.lineno} in ${e.filename}`);
                };
            }
        } else showError("Sorry, Kingdom cannot run in your browser");
    }
} function absolutePath(e, a) {
    const o=e.split("/"); const r=a.split("/"); o.pop(); for (let t=0; t<r.length; t++)"."!=r[t]&&(".."==r[t]?o.pop():o.push(r[t])); for (var d=o.join("/"); "/"===d.charAt(d.length-1);)d=d.slice(0, -1); return d;
} function setupSwitches() {
    const e=$("#Generate-Drawer-Sets"); if (e.empty(), currentSetsCheckboxes=[], void 0!==typeof Storage) {
        for (setName in totalSets) {
            const a=`Sets-Selection-${setName}${setName}`; if ("on"===localStorage.getItem(a)) {
                const o=$("<div class='checkbox-check'></div>").appendTo(e); $(`<p>${setName}</p>`).appendTo(o); const r=$(`<input type='checkbox' id='Generate-Sets-${a}' name='sets-${setName}' value='${setName}'/>`).appendTo(o); currentSetsCheckboxes.push(r); $(`<label for='Generate-Sets-${a}' class='check-${setName.toLowerCase().replace(" ", "")}'>`).appendTo(o); createCheckboxSwitch(o), r.change(function () {
                    void 0!==typeof Storage?$(this).prop("checked")?localStorage.setItem($(this).attr("id"), "on"):localStorage.setItem($(this).attr("id"), "off"):console.log("Local storage not supported");
                }); const t=localStorage.getItem(r.attr("id")); r.prop("checked", "on"===t), r.trigger("change");
            }
        }
    } return 0!==currentSetsCheckboxes.length;
} function selectAllSwitches() {
    for (setCheckbox of currentSetsCheckboxes)setCheckbox.prop("checked", !0), setCheckbox.trigger("change");
} function deselectAllSwitches() {
    for (setCheckbox of currentSetsCheckboxes)setCheckbox.prop("checked", !1), setCheckbox.trigger("change");
} function randomizeSwitches() {
    for (setCheckbox of currentSetsCheckboxes)setCheckbox.prop("checked", !1), setCheckbox.trigger("change"); for (var e=parseInt($("#Generate-Drawer-RandomizeValue").text()), a=[], o=0; o<currentSetsCheckboxes.length; ++o)a.push(o); for (var r=[]; r.length<e&&a.length>0;) {
        const t=Math.floor(Math.random()*a.length); r.push(a[t]), a.splice(t, 1);
    } for (i of r)currentSetsCheckboxes[i].prop("checked", !0), currentSetsCheckboxes[i].trigger("change");
} function setupGeneratorOptions() {
    if (void 0!==typeof Storage) {
        const e=$("#Generate-Drawer-RandomizeInput"); const a=$("#Generate-Drawer-RandomizeValue"); e.on("input-value-change", () => {
            const e=a.text(); localStorage.setItem("Generate-Drawer-RandomizeValue", e);
        }); const o=localStorage.getItem("Generate-Drawer-RandomizeValue"); void 0!==o&&parseInt(o, 10)>=1?(a.text(o), e.trigger("input-value-change")):(a.text("2"), e.trigger("input-value-change")), setupGeneratorCheckbox("Generate-Drawer-ClusterPotions"), setupGeneratorCheckbox("Generate-Drawer-DistributeSets");
    }
} function setupGeneratorCheckbox(e, a=!0) {
    const o=$(`#${e}`); const r=localStorage.getItem(e); null!==r?o.prop("checked", "on"===r):o.prop("checked", a), o.change(function () {
        $(this).prop("checked")?localStorage.setItem(e, "on"):localStorage.setItem(e, "off");
    });
} function showError(e) {
    clearCards(), hideLoadingIndicator(), isGenerating=!1, isGeneratingFromCode=!1, $("#Generate-Button-Fab").removeClass("hidden"), $(".cards-table-state").removeClass("state-open"), $(".toolbar-cards").addClass("hidden"), $(".toolbar-shuffle").addClass("hidden"), $(".error-msg").text(e), $(".error-msg").addClass("error-visible");
} function clearKingdom() {
    animateCardsOut(), isGenerating=!1, isGeneratingFromCode=!1, $("#Generate-Button-Fab").removeClass("hidden"), $(".toolbar-cards").addClass("hidden"), $(".toolbar-shuffle").addClass("hidden"), window.setTimeout(() => {
        $(".cards-table-state").addClass("state-open");
    }, 500);
} function clearCards() {
    $("#CardsRow1").empty(), $("#CardsRow2").empty(), $("#CardsTablePortrait").empty(), $(".cards-table-basic").empty(), $(".cards-table-specialcards").empty(), currentKingdom={}, loadedCards=0;
} function animateCardsOut() {
    $(".cards-table").removeClass("cards-animate-in"), $(".cards-table-basic").removeClass("cards-animate-in"), $(".cards-table-specialcards").removeClass("cards-animate-in"), $(".error-msg").removeClass("error-visible"), currentKingdom={}, loadedCards=0, isGenerating||removeHash(), removeCardsTimeout=window.setTimeout(() => {
        clearCards();
    }, 1e3);
} function removeHash() {
    ""!=window.location.hash&&history.pushState("", document.title, window.location.pathname+window.location.search);
} function setKingdomCards(e) {
    const a=e.kingdomCards; const o=e.supplyCards; const r=e.baneCard; const t=e.obeliskCard; clearCards(), clearTimeout(removeCardsTimeout), a.sort((e, a) => {
        if ("Event"===e.cardType||"Landmark"===e.cardType) {
            if ("Event"!==a.cardType&&"Landmark"!==a.cardType) return 1;
        } else if (("Event"===a.cardType||"Landmark"===a.cardType)&&"Event"!==e.cardType&&"Landmark"!==e.cardType) return -1; return e.cost<a.cost?-1:e.cost>a.cost?1:"potion"===a.altCost&&"potion"!==e.altCost?-1:"potion"===e.altCost&&"potion"!==a.altCost?1:e.costDebt<a.costDebt?-1:e.costDebt>a.costDebt?1:e.cardName<a.cardName?-1:e.cardName>a.cardName?1:0;
    }); const d=[]; let n=!1; for (kingdomCard of a)"potion"===kingdomCard.altCost&&(n=!0); for (extraSupplyCard of (n&&d.push("Potion"), o))d.push(extraSupplyCard); for (card of (currentKingdom={ kingdomCards: a, extraSupplyCards: o, supplyCards: d, obeliskCard: t, baneCard: r }).kingdomCards) void 0===cardCounts[card.cardName]&&(cardCounts[card.cardName]=0), cardCounts[card.cardName]+=1; for (c in kingdomCardCount=[], cardCounts)kingdomCardCount.push({ cardName: c, count: cardCounts[c] }); for (c of (kingdomCardCount.sort((e, a) => {
        return e.count-a.count<0?1:e.count-a.count>0?-1:e.cardName<a.cardName?-1:e.cardName>a.cardName?1:0;
    }), output="", kingdomCardCount))output+=`${c.cardName}: ${c.count}\n`; gamesPlayed+=1, "counts"!==DEBUG&&"all"!==DEBUG||(console.log(`Games Played: ${gamesPlayed}`), console.log(output)); let s=0; const l={}; let p=0; let g=0; for (kingdomCard of currentKingdom.kingdomCards) {
        if ("Event"!==kingdomCard.cardType&&"Landmark"!==kingdomCard.cardType) {
            if (void 0===l[kingdomCard.cost]) {
                const m=`CardsRowCost${kingdomCard.cost}`; var u=$("<tr class='cards-table-row-outer'></tr>").appendTo($("#CardsTablePortrait"))[0]; const C=$(`<div id='${m}' class='cards-table-row'></div>`); l[kingdomCard.cost]={ row: C.appendTo(u)[0], cards: 1 }, p+=1;
            } else l[kingdomCard.cost].cards+=1, l[kingdomCard.cost].cards>g&&(g=l[kingdomCard.cost].cards); s+=1;
        }
    } for (u in l) {
        const v=`${100*(l[u].cards/g)}%`; $(l[u].row).css("max-width", v), $(l[u].row).parent().css("height", `${100/p}%`);
    } const h=Math.floor(s/2); $(".cards-table").removeClass("cards-table-supply-special"), $(".cards-table-basic").removeClass("cards-table-supply-special"); let f=0; let b=0; for (i=0; i<currentKingdom.kingdomCards.length; ++i) {
        const k=currentKingdom.kingdomCards[i]; if ("Event"!==k.cardType&&"Landmark"!==k.cardType) {
            const w=i<h?1:2; addCard(k, { isBane: k===r, isObelisk: k===t }, w, 1===w?i:i-4), 1===w?f+=1:2===w&&(b+=1);
        } else $(".cards-table").addClass("cards-table-supply-special"), $(".cards-table-basic").addClass("cards-table-supply-special"), addSpecialCard(k);
    }f>b?($("#CardsRow1").css("max-width", "100%"), $("#CardsRow2").css("max-width", "83.3%")):b>f?($("#CardsRow1").css("max-width", "83.3%"), $("#CardsRow2").css("max-width", "100%")):($("#CardsRow1").css("max-width", "100%"), $("#CardsRow2").css("max-width", "100%")), $("#CardsRow1").parent().css("height", "50%"), $("#CardsRow2").parent().css("height", "50%"); let T=!1; if (void 0!==currentKingdom.supplyCards&&currentKingdom.supplyCards.length>0&&(T=!0), T) {
        $(".cards-table-basic"); if ($(".cards-table").addClass("cards-table-supply"), $(".cards-table-specialcards").addClass("cards-table-supply"), void 0!==currentKingdom.supplyCards) for (supplyCard of currentKingdom.supplyCards)addSupplyCard(supplyCard);
    } else $(".cards-table").removeClass("cards-table-supply"), $(".cards-table-specialcards").removeClass("cards-table-supply"); updateUrlKingdomCode(), REPEAT&&gamesPlayed<REPEAT_MAX&&window.setTimeout(() => {
        generateNewKingdom();
    }, 1e3);
} function updateUrlKingdomCode() {
    if (currentKingdom.kingdomCards&&"undefined"!=typeof Worker) {
        let e=new Worker("./app/scripts/card-selection/kingdom-code/kingdom-code.js"); const a={ request: "cards-to-code", kingdomCards: currentKingdom.kingdomCards, supplyCards: currentKingdom.extraSupplyCards, obeliskCard: currentKingdom.obeliskCard, baneCard: currentKingdom.baneCard, appDir: absolutePath(window.location.href, "/"), totalSets: totalSets }; e.postMessage(a), e.onmessage=function (a) {
            e.terminate(), e=void 0; const o=a.data; "success"===o.result?(currentKingdom.kingdomCode=o.kingdomCode, window.location.hash=o.kingdomCode):"error"===o.result&&console.error("Error");
        }, e.onerror=function (a) {
            e.terminate(), e=void 0, console.error(`${a.message}\nAt line: ${a.lineno} in ${a.filename}`);
        };
    }
} function cardNameToFilename(e) {
    let a=e.split(" ").join("_"); return `${a=a.split("/").join("_")}.jpg`;
} function cardNameToUrl(e) {
    let a=e.split(" ").join("_"); return a=a.split("'").join("%27");
} function addCard(e, a, o, r) {
    const t=`#CardsRow${o}`; const d=`#CardsRowCost${e.cost}`; const n=$(t); const i=$(d); const s="<div class='cards-table-card' "+`style='transition-delay: ${50*r}ms'`+"></div>"; const c=$(s).appendTo(n)[0]; const l=$("<div class='cards-table-card-inner'></div>").appendTo(c)[0]; const p=$(s).appendTo(i)[0]; const g=$("<div class='cards-table-card-inner'></div>").appendTo(p)[0]; a.isBane&&($(c).addClass("card-bane"), $(p).addClass("card-bane")), a.isObelisk&&($(c).addClass("card-obelisk"), $(p).addClass("card-obelisk")); const m=`./app/img/cards-small/${e.cardSet.toLowerCase().replace(" ", "")}`; const u=(e.set, cardNameToFilename(e.cardName)); const C=`<img src="${m}/${u}"/>`; const v=$(C).appendTo(l)[0]; $(C).appendTo(g)[0]; $("<i class='material-icons'>zoom_in</i>").appendTo(c), $("<i class='material-icons'>zoom_in</i>").appendTo(p), $(v).one("load", () => {
        incrementCardLoaded();
    }), $(v).complete&&$(v).load(), $(v).one("error", () => {
        showError("There was a problem loading the cards");
    }), $(c).on("click", () => {
        $(c).trigger("mouseup"), $(c).trigger("mouseleave"), createDialogForCard(m, e);
    }), $(p).on("click", () => {
        $(p).trigger("mouseup"), $(p).trigger("mouseleave"), createDialogForCard(m, e);
    }), $(c).hover(() => {
        $(c).addClass("hover");
    }, () => {
        $(c).removeClass("hover");
    }), $(p).hover(() => {
        $(p).addClass("hover");
    }, () => {
        $(p).removeClass("hover");
    });
} function addSupplyCard(e) {
    const a=$(".cards-table-basic"); const o=$("<div class='cards-table-card'></div>").appendTo(a); const r=cardNameToFilename(e); const t=$("<img src='"+`./app/img/supply/${r}`+"'/>").appendTo(o); $("<i class='material-icons'>zoom_in</i>").appendTo(o), t.one("load", () => {
        incrementCardLoaded();
    }), t.one("error", () => {
        showError("There was a problem loading the cards");
    }), o.on("click", () => {
        createDialogForCard("./app/img/supply/", { cardName: e });
    }), t.complete&&t.load(), $(o).hover(() => {
        $(o).addClass("hover");
    }, () => {
        $(o).removeClass("hover");
    });
} function addSpecialCard(e) {
    const a=$(".cards-table-specialcards"); const o=$("<div class='cards-table-card'></div>").appendTo(a); let r="./app/img/cards-small/"; "Event"===e.cardType?r="./app/img/events/":"Landmark"===e.cardType&&(r="./app/img/landmarks/"); const t=r+e.cardSet.toLowerCase().replace(" ", ""); const d=(e.set, cardNameToFilename(e.cardName)); const n=$(`<img src='${t}/${d}'/>`).appendTo(o); $("<i class='material-icons'>zoom_in</i>").appendTo(o), n.one("load", () => {
        incrementCardLoaded();
    }), n.complete&&n.load(), n.one("error", () => {
        showError("There was a problem loading the cards");
    }), o.on("click", () => {
        createDialogForCard(t, e);
    }), $(o).hover(() => {
        $(o).addClass("hover");
    }, () => {
        $(o).removeClass("hover");
    });
} function createDialogForCard(e, a) {
    const o=a.cardName; const r=$("<div class='dialog dialog-card-detail'></div>").appendTo($("body .main")); const t=$("<div class='dialog-middle'></div>").appendTo(r); const d=$("<div class='dialog-content'></div>").appendTo(t); const n=$("<div class='dialog-content-inner'></div>").appendTo(d); "Event"!==a.cardType&&"Landmark"!==a.cardType||r.addClass("dialog-card-detail-landscape"), createDialog(r); const i=cardNameToFilename(o); const s=`${e}/${i}`; const c=$("<div class='card-image-container'></div>").appendTo(n); cardImage=$(`<img class='card-image-loading' src="${s}">`).appendTo(c), $("<i class='material-icons'>zoom_out</i>").appendTo(c), cardImage.one("load", () => {
        cardImage.removeClass("card-image-loading");
    }), cardImage.complete&&cardImage.load(); const l=$("<div class='card-toolbar'></div>").appendTo(n); const p=$("<button class='btn-toolbar'>").appendTo(l); $("<i class='material-icons'>close</i>").appendTo(p), p.on("click", () => {
        r.trigger("dialog-close");
    }); const g=$("<div class='card-faq'></div>").appendTo(n); const m=(cardNameToUrl(o), $("<div class='card-faq-loading'></div>").appendTo(g)); const u=$("<div class='loading-indeterminate-dots'></div>").appendTo(m); $("<span></span><span></span><span></span>").appendTo(u), $("<p class='loading-heading'>Loading</p>").appendTo(m); const C=$("<p class='loading-text'></p>").appendTo(m); C.text(o); const v=void 0!==a.splitCards&&a.splitCards.length>0; const h="Split Pile"===a.cardType; if (h||v) {
        if (h) {
            var f=$("<button class='btn-toolbar'>").appendTo(l); $("<i class='material-icons'>account_balance</i>").appendTo(f), $("<div class='tooltip tooltip-right'>Kingdom Card</div>").appendTo(f), f.click(() => {
                f.addClass("hidden"), y>=0&&(cardImage.addClass("split-fade-out"), window.setTimeout(() => {
                    y=-1, cardImage.attr("src", s), WIKI_PREFIX+cardNameToUrl(o), C.text(o), cardImage.one("load", () => {
                        window.setTimeout(() => {
                            cardImage.removeClass("split-fade-out");
                        }, 125);
                    }), cardImage.complete&&cardImage.load();
                }, 125));
            });
        } const b=$("<button class='btn-toolbar' style='margin-top: 5px'>").appendTo(l); const k=[]; let w=!1; if (h||k.push(o), v) {
            for (splitCard of a.splitCards)k.push(splitCard); $("<div class='tooltip tooltip-right'>Next Card</div>").appendTo(b), $("<i class='material-icons'>navigate_next</i>").appendTo(b), w=!0;
        } else {
            for (splitCard of o.split("/"))console.log(splitCard), k.push(splitCard); $("<div class='tooltip tooltip-right'>View Split Card</div>").appendTo(b), $("<i class='material-icons'>flip</i>").appendTo(b);
        }console.log(k); const T=cardNameToFilename(k[0]); let S=`${e}/split/${T}`; h||(S=`${e}/${T}`), cardImage.attr("src", S), WIKI_PREFIX+cardNameToUrl(k[0]), C.text(k[0]); var y=0; b.click(() => {
            w?cardImage.addClass("multi-fade-out"):cardImage.addClass("split-fade-out"), h&&f.removeClass("hidden"), window.setTimeout(() => {
                y=(y+1)%k.length; const a=cardNameToFilename(k[y]); let o=`${e}/split/${a}`; h||0!==y||(o=`${e}/${a}`), cardImage.attr("src", o), WIKI_PREFIX+cardNameToUrl(k[y]), C.text(k[y]), w&&cardImage.addClass("multi-fade-in"), cardImage.one("load", () => {
                    window.setTimeout(() => {
                        cardImage.removeClass("split-fade-out"), cardImage.removeClass("multi-fade-out"), cardImage.removeClass("multi-fade-in");
                    }, 125);
                }), cardImage.complete&&cardImage.load();
            }, 125);
        });
    }$("<div type='cancel' class='btn-icon btn-dialog-minimize'><i class='material-icons'>close</i></div>").appendTo(n).click(() => {
        r.trigger("dialog-close");
    }), c.on("click", () => {
        r.trigger("dialog-close");
    });
} function incrementCardLoaded() {
    ++loadedCards>=currentKingdom.kingdomCards.length+currentKingdom.supplyCards.length&&(window.setTimeout(() => {
        $(".cards-table").addClass("cards-animate-in"), $(".cards-table-basic").addClass("cards-animate-in"), $(".cards-table-specialcards").addClass("cards-animate-in"), hideLoadingIndicator(), $(".toolbar-cards").removeClass("hidden"), $(".toolbar-cards").prop("disabled", !1), isGeneratingFromCode?($(".toolbar-shuffle").addClass("hidden"), $(".toolbar-shuffle").prop("disabled", !0)):($(".toolbar-shuffle").removeClass("hidden"), $(".toolbar-shuffle").prop("disabled", !1)), isGeneratingFromCode=!1;
    }, 200), isGenerating=!1);
} function hideLoadingIndicator() {
    $("#LoadingIndicator").removeClass("loading"), window.setTimeout(() => {
        $("#LoadingIndicator").removeClass("animating");
    }, 300);
} function setLoadingProgress(e) {
    e<0&&(e=0), (e>$("#LoadingIndicator").attr("data-progress")||0===e)&&$("#LoadingIndicator").attr("data-progress", e);
} function openCodeDialog() {
    if (void 0===codeDialog) {
        codeDialog=$("<div class='dialog dialog-code'></div>").appendTo($("body .main")); const e=$("<div class='dialog-middle'></div>").appendTo(codeDialog); const a=$("<div class='dialog-content'></div>").appendTo(e); const o=$("<div class='dialog-content-inner'></div>").appendTo(a); createDialog(codeDialog), $("<h1>Kingdom Code</h1>").appendTo(o), $("<div type='cancel' class='btn-icon btn-dialog-minimize'><i class='material-icons'>close</i></div>").appendTo(o).click(() => {
            codeDialog.trigger("dialog-close");
        }), $("<p>Kingdom codes are a way to share sets of cards with other players in a game</p>").appendTo(o); const r=$("<div class='kingdom-code-container'></div>").appendTo(o); if (currentKingdom.kingdomCode) {
            const t={ text: currentKingdom.kingdomCode, background: "#fff", fill: "#111", render: "image", ecLevel: "H", minVersion: 3, maxVersion: 40, size: 1200, radius: .1 }; r.qrcode(t);
        } const d=window.location.href; $(`<a href='${d}'>${d}</a>`).appendTo(o); const n=$("<div class='btn'>Copy Link to Clipboard</div>").appendTo(o); const i=$("<div class='btn-message'>Copied Link!</div>").appendTo(n); n.on("click", () => {
            copyToClipboard(window.location.href), i.addClass("visible"), window.setTimeout(() => {
                i.removeClass("visible");
            }, 1e3);
        }), codeDialog.one("dialog-close", () => {
            codeDialog=void 0;
        });
    }
}$(window).bind("hashchange", (e) => {
    const a=window.location.hash.replace("#", ""); null!=a&&null!=a&&""!=a?a!=currentKingdom.kingdomCode&&loadKingdomFromCode(a):clearKingdom();
}), $(() => {
    const e=window.location.hash; if (null!=e&&""!==e&&loadKingdomFromCode(e.substring(1)), void 0!==typeof Storage) {
        let a=0; for (setName in totalSets) {
            const o=`Sets-Selection-${setName}${setName}`; "on"===localStorage.getItem(o)&&(a+=1);
        }0===a?($(".cards-table-state").addClass("state-sets"), $(".cards-table-state").removeClass("state-empty"), ""===e&&openSetDialog(!0)):($(".cards-table-state").removeClass("state-sets"), $(".cards-table-state").addClass("state-empty"));
    } for (s of $(".checkbox-switch"))createCheckboxSwitch(s); setupGeneratorOptions(), $("#Generate-Button-Fab .btn-fab-btn").on("click", () => {
        $("#Onboarding-Generate").removeClass("open"), setupSwitches()?$("#Generate-Drawer").trigger("drawer-open"):openSetDialog();
    }), $("#Generate-Drawer-Sets-SelectAll").on("click", () => {
        selectAllSwitches();
    }), $("#Generate-Drawer-Sets-DeselectAll").on("click", () => {
        deselectAllSwitches();
    }), $("#Generate-Drawer-Randomize").on("click", () => {
        randomizeSwitches();
    }), $("#Generate-Button-New").on("click", () => {
        generateNewKingdom();
    }), $("#Generate-Button-Shuffle").on("click", () => {
        generateNewKingdom();
    }), $("#Generate-Button-Clear").on("click", () => {
        clearKingdom();
    }), $("#Generate-Button-CodeScan").on("click", () => {
        openScanDialog();
    }), $("#Generate-Button-Code").on("click", () => {
        openCodeDialog();
    });
}), codeDialog=void 0, codeScanDialog=void 0; const copyToClipboard=(e)=>{
    const a=document.createElement("textarea"); a.value=e, document.body.appendChild(a), a.select(), iosCopyToClipboard(a), document.body.removeChild(a);
}; function iosCopyToClipboard(e) {
    const a=e.contentEditable; const o=e.readOnly; const r=document.createRange(); e.contentEditable=!0, e.readOnly=!0, r.selectNodeContents(e); const t=window.getSelection(); t.removeAllRanges(), t.addRange(r), e.setSelectionRange(0, 999999), e.contentEditable=a, e.readOnly=o, document.execCommand("copy");
} function openScanDialog() {
    if (void 0===codeScanDialog) {
        codeScanDialog=$("<div class='dialog dialog-code-scan'></div>").appendTo($("body .main")); const e=$("<div class='dialog-middle'></div>").appendTo(codeScanDialog)[0]; const a=$("<div class='dialog-content'></div>").appendTo(e)[0]; const o=$("<div class='dialog-content-inner'></div>").appendTo(a)[0]; createDialog(codeScanDialog), $("<h1>Scan Code</h1>").appendTo(o), $("<div type='cancel' class='btn-icon btn-dialog-minimize'><i class='material-icons'>close</i></div>").appendTo(o).on("click", () => {
            codeScanDialog.trigger("dialog-close");
        }), $("<p>Kingdom codes are generated with each kingdom, scan one here to view the cards. All data from the camera is processed on the device, and does not get sent anywhere.</p>").appendTo(o); let r=void 0; let t=void 0; const d=$("<video autoplay playsinline></video>").appendTo(o)[0]; const n=$("<canvas id='qr-canvas'></canvas>").appendTo(o)[0]; if (void 0!==navigator.mediaDevices) {
            let i=!1; navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: !1 }).then((e) => {
                t=e, d.srcObject=e, d.play();
            }).catch((e) => {
                console.log("Could not access camera");
            }), d.addEventListener("canplay", (e) => {
                i||(d.removeAttribute("width"), d.removeAttribute("height"), n.setAttribute("width", d.videoWidth), n.setAttribute("height", d.videoHeight), $(d).addClass("visible"), i=!0, r=window.setInterval(() => {
                    n.getContext("2d").drawImage(d, 0, 0, n.width, n.height); try {
                        qrcode.decode(), clearInterval(r);
                    } catch (e) {}
                }, 500));
            }, !1);
        }qrcode.callback=function (e) {
            console.log(e), loadKingdomFromCode(e);
        }, $("<p>For best results the code should be in focus and centered. A short video of the code (1 or 2 seconds) will work better than a photo.</p>").appendTo(o); const s=$("<div class='photoinput-loading'></div>").appendTo(o)[0]; $("<p class='photoinput-loading-text'>Scanning Photo</p>").appendTo(s), $("<p class='photoinput-loading-error'>Could not find code</p>").appendTo(s); const c=$("<input type='file' id='CodePhotoInput' accept='video/*;capture=camcorder' capture='camera'>").appendTo(o)[0]; $("<label class='btn' for='CodePhotoInput'>Take a Photo or Video</label>").appendTo(o)[0]; c.addEventListener("change", (e) => {
            $(s).addClass("loading"), $(s).removeClass("error"), window.setTimeout(() => {
                const a=n.getContext("2d"); a.clearRect(0, 0, n.width, n.height); const o=new Image; o.onload=function () {
                    n.setAttribute("width", o.width), n.setAttribute("height", o.height), a.drawImage(o, 0, 0, n.width, n.height); try {
                        qrcode.decode();
                    } catch (e) {
                        console.log("No code found"), $(s).removeClass("loading"), $(s).addClass("error");
                    }
                }; const r=e.target.files[0]; o.src=URL.createObjectURL(r);
            }, 400);
        }), codeScanDialog.one("dialog-close", () => {
            if (void 0!==t) for (track of t.getTracks())track.stop(); void 0!==r&&clearInterval(r), codeScanDialog=void 0;
        });
    }
} function loadKingdomFromCode(e) {
    if (!isGenerating&&!isGeneratingFromCode&&void 0===cardWorker&&(isGenerating=!0, isGeneratingFromCode=!0, currentKingdom.kingdomCards?animateCardsOut():$(".error-msg").removeClass("error-visible"), $("#Generate-Button-Fab").trigger("card-close"), $("#LoadingIndicator").addClass("loading"), $("#LoadingIndicator").addClass("animating"), setLoadingProgress(0), $(".toolbar-cards").prop("disabled", !0), $(".toolbar-shuffle").prop("disabled", !0), void 0!==codeDialog&&codeDialog.trigger("dialog-close"), void 0!==codeScanDialog&&codeScanDialog.trigger("dialog-close"), "undefined"!=typeof Worker&&void 0===cardWorker)) {
        cardWorker=new Worker("./app/scripts/card-selection/kingdom-code/kingdom-code.js"); const a={ request: "code-to-cards", kingdomCode: e, totalSets: totalSets, appDir: absolutePath(window.location.href, "/") }; cardWorker.postMessage(a), $("#Generate-Button-Fab").addClass("hidden"), $(".cards-table-state").removeClass("state-open"), cardWorker.onmessage=function (e) {
            data=e.data, "success"===data.result?(cardWorker.terminate(), cardWorker=void 0, setLoadingProgress(17), window.setTimeout(() => {
                setKingdomCards(data);
            }, 500)):"progress"===data.result?setLoadingProgress(data.progress):"error"===data.result&&(cardWorker.terminate(), cardWorker=void 0, showError(data.message), $("#Generate-Button-Fab").removeClass("hidden"));
        }, cardWorker.onerror=function (e) {
            void 0!==cardWorker&&(cardWorker.terminate(), cardWorker=void 0), showError("There was a problem loading the code"), console.error(`${e.message}\nAt line: ${e.lineno} in ${e.filename}`), $("#Generate-Button-Fab").removeClass("hidden");
        };
    }
}
