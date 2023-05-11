$(document).ready(() => {
    var e = new Hyperbot({
        timeOut: 5e3,
        runCallBacks: !0
    });
    e.log("\n  ┏━━━┳┓╋╋╋╋╋╋╋┏┓╋╋╋╋╋╋╋┏━━┓╋╋╋╋╋┏━━┓\n  ┃┏━┓┃┃╋╋╋╋╋╋╋┃┃╋╋╋╋╋╋╋┃┏┓┃╋╋╋╋╋┃┏┓┃\n  ┃┃╋┗┫┗━┳━━┳━━┫┃┏┳━━┳━┓┃┗┛┗┳┓╋┏┓┃┗┛┗┳┳━━┳┓┏┓┏┳━━┓\n  ┃┃╋┏┫┏┓┃┃━┫┏━┫┗┛┫┃━┫┏┛┃┏━┓┃┃╋┃┃┃┏━┓┣┫━━┫┗┛┗┛┃┏┓┃\n  ┃┗━┛┃┃┃┃┃━┫┗━┫┏┓┫┃━┫┃╋┃┗━┛┃┗━┛┃┃┗━┛┃┣━━┣┓┏┓┏┫┏┓┃\n  ┗━━━┻┛┗┻━━┻━━┻┛┗┻━━┻┛╋┗━━━┻━┓┏┛┗━━━┻┻━━┛┗┛┗┛┗┛┗┛\n  ╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋┏━┛┃\n  ╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋┗━━┛\n    "), console.log("checker.js loaded");
    var t = $("#message"),
        a = $("#ccnList"),
        n = $("#cvvList"),
        c = $("#deadList"),
        i = $("#amount"),
        l = $("#showCvv"),
        s = $("#showCcn"),
        o = $("#showDead"),
        r = $("#hyper_progress"),
        d = $("#saveCvv"),
        h = $("#saveCcn");
    d.hide(), h.hide();
    $("#lista_con"), $("#lista_leb"), $("#amount_container");
    n.hide(), a.hide(), c.hide(), l.click(() => {
        n.slideToggle()
    }), s.click(() => {
        a.slideToggle()
    }), o.click(() => {
        c.slideToggle()
    });
    var m = $("#startbtn"),
        v = $("#stopbtn");

    function p() {
        var e = t.val().split("\n");
        e.splice(0, 1), t.val(e.join("\n"))
    }
    v.hide(), m.click(() => {
        m.html("Please wait..."), async function (l = 500) {
            var s = i.val() ? i.val() : .8,
                o = $("#curr").val(),
                forward = $("#fwtype").val(),
                tg_id = $("#tg_id").val(),
                u = t.val(),
                k = u.split("\n"),
                f = k.length,
                g = o || "usd",
                y = 0,
                C = 0,
                w = 0;
                if (o === "usd") {
                var symbol = '$';
                }
                else if (o === "eur") {
                var symbol = '€';
                }
                else if (o === "gbp") {
                var symbol = '£';
                }
                else if (o === "cad") {
                var symbol = 'Can$';
                }
            void 0 === Array.prototype.sameAs && (Array.prototype.sameAs = function () {
                for (let e = 1; e < this.length; e++)
                    if (this[e].startsWith(this[0].slice(0, 6))) return !0;
                return !1
            });
            const _ = e => null !== e ? e.sameAs() : null;
            var x = u.match(/(\d{16,18})[\/\s:|]*?(\d\d)[\/\s|]*?(\d{2,4})[\/\s|-]*?(\d{3,4})/gm);
            _(x), x[0].slice(0, 6);
            
            f ? f <= 10001 ?  k.forEach(function (t, i) {
                setTimeout(function () {
                    $.ajax({
                        url: "../api/nonsk.php?lista=" + t + "&amt=" + s + "&curr=" + g + "&tg_id=" + tg_id + "&symbol=" + symbol + "&forward=" + forward,
                        type: "GET",
                        async: !0,
                        success: function (t) {
                            var i;
                            t.match("#LIVE") ? (p(), y++, i = t + "", n.append("<span>" + i + "<br>"), notify.success(t, "", {
                                duration: 3e3
                            })) : t.match("#CCN") ? (p(), C++, function (e) {
                                a.append("<span>" +e + "<br>")
                            }(t + "")) : (p(), w++, function (e) {
                                c.append("<span>" + e + "<br>")
                            }(t + "")), $("#totalCount").html(f);
                            var l = parseInt(y) + parseInt(C) + parseInt(w);
                            $("#cvvCount").html(y), $("#ccnCount").html(C), $("#deadCount").html(w), $("#totalChecked").html(l), $("#cLive2").html(y), $("#cWarn2").html(C), $("#cDie2").html(w);
                            var s = l / f * 100;
                            0 !== parseInt(y) && 100 === s && (d.show(), d.click(async () => {
                                var t = $("#cvvList").text();
                                return e.saveFile({
                                    fileName: "x" + y + "_violent_hits",
                                    fileExten: "txt",
                                    fileData: ["ᴄʜᴇᴄᴋᴇʀ: VIOLENT\nɢᴀᴛᴇ: sᴛʀɪᴘᴇ ᴄᴜsᴛᴏᴍ\n--------------\n".replace(/^\s*\n/gm, "") + t.replaceAll("#LIVE", "\n").replace(/^\s*\n/gm, "")],
                                    saveData: !0
                                })
                            })), 0 !== parseInt(C) && 100 === s && (h.show(), h.click(async () => {
                                var t = $("#ccnList").text();
                                return e.saveFile({
                                    fileName: "x" + C + "_violent_ccn",
                                    fileExten: "txt",
                                    fileData: ["ᴄʜᴇᴄᴋᴇʀ: VIOLENT\nɢᴀᴛᴇ: sᴛʀɪᴘᴇ ᴄᴜsᴛᴏᴍ\n--------------\n".replace(/^\s*\n/gm, "") + t.replaceAll("#CCN", "\n").replace(/^\s*\n/gm, "")],
                                    saveData: !0
                                })
                            })), r.css({
                                width: `${s.toFixed(0)+"%"}`,
                                height: "3px"
                            }), r.addClass("animate__animated animate__lightSpeedInLeft");
                            var o = "Processing..." + s.toFixed(0) + "%";
                            m.html(o), m.addClass(" animate__animated animate__flip "), 100 === s && (m.css({
                                color: "#0d8f3b",
                                background: "#0eab450d"
                            }), m.html("Checking completed!"), setTimeout(() => {
                                m.html("Loading...")
                            }, 1000), setTimeout(() => {
                                m.hide(), v.show(), v.html("Reload checker")
                            }, 2000), v.click(() => {
                                window.location.reload()
                            }))
                        }
                    })
                }, 0)
            }) : window.location.replace("./checker?limit=reached&recheck=true") : notify.error("Please add a cc!", "", {
                duration: 5e3
            })
        }()
    })
});