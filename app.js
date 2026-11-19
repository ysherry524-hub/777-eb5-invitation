(function () {
  var E = window.EVENT;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var app = $("#app");
  var stage = $(".stage"), wrap = $(".env-wrap"), env = $(".env"), envShadow = $(".env-shadow");
  var seal = $(".seal"), flap = $(".flap"), letter = $(".letter");
  var back = $(".env__back"), pocket = $(".env__pocket");
  var mosaic = $(".mosaic"), veil = $(".veil");
  var invitation = $(".invitation"), card = $(".card");
  var params = new URLSearchParams(location.search);
  var capture = params.get("capture");
  var confetti = window.Confetti($(".confetti"));

  /* ---------- derived text (weekday computed so a date change can't leave it wrong) ---------- */
  var ymd = E.date.split("-").map(Number);
  E.displayDate = ymd[0] + " 年 " + ymd[1] + " 月 " + ymd[2] + " 日";
  E.weekday = "星期" + "日一二三四五六"[new Date(Date.UTC(ymd[0], ymd[1] - 1, ymd[2])).getUTCDay()];
  E.displayDateFull = E.displayDate + "（" + E.weekday + "）";
  E.displayDateShort = ymd[1] + " 月 " + ymd[2] + " 日";
  E.venueFull = E.venue + " · " + E.addressCn;

  /* ---------- content from config ---------- */
  $$("[data-text]").forEach(function (el) { el.textContent = E[el.dataset.text]; });
  $$("[data-rsvp]").forEach(function (el) { el.textContent = E.rsvp[el.dataset.rsvp]; });
  $(".stage__hint").textContent = matchMedia("(hover: none)").matches ? E.envelopeHintTouch : E.envelopeHint;
  E.body.forEach(function (text) {
    var p = document.createElement("p");
    p.textContent = text;
    $(".card__body").appendChild(p);
  });
  // never break "777 Tower" or "EB-5" across lines
  function keepTogether(root) {
    $$("[data-text], .card__body p", root).forEach(function (el) {
      if (el.children.length) return;
      var h = el.innerHTML.replace(/(777 Tower|EB-5)/g, '<span class="nb">$1</span>');
      if (h !== el.innerHTML) el.innerHTML = h;
    });
  }
  keepTogether(document);
  function setSalutation(name) {
    $(".card__salutation").textContent = name ? E.salutationNamed.replace("{name}", name) : E.salutation;
  }
  setSalutation("");

  /* ---------- wax seal: champagne-gold wax, lit height map (from the Christmas invitation) ---------- */
  function sealOutline(R) {
    var pts = [], n = 90;
    for (var i = 0; i < n; i++) {
      var a = (i / n) * Math.PI * 2;
      var r = R * (1 + .02 * Math.sin(3 * a + 1.1) + .014 * Math.sin(5 * a + 2.3) + .008 * Math.sin(11 * a + .4)
        + .045 * Math.exp(-Math.pow((a - .7) / .32, 2)) + .035 * Math.exp(-Math.pow((a - 3.5) / .4, 2)));
      pts.push([r * Math.cos(a), r * Math.sin(a)]);
    }
    var d = "M" + pts[0][0].toFixed(2) + " " + pts[0][1].toFixed(2);
    for (var j = 0; j < n; j++) {
      var p0 = pts[(j - 1 + n) % n], p1 = pts[j], p2 = pts[(j + 1) % n], p3 = pts[(j + 2) % n];
      d += "C" + (p1[0] + (p2[0] - p0[0]) / 6).toFixed(2) + " " + (p1[1] + (p2[1] - p0[1]) / 6).toFixed(2) + " "
        + (p2[0] - (p3[0] - p1[0]) / 6).toFixed(2) + " " + (p2[1] - (p3[1] - p1[1]) / 6).toFixed(2) + " "
        + p2[0].toFixed(2) + " " + p2[1].toFixed(2);
    }
    return d + "Z";
  }
  function sealSVG(id, shimmer) {
    var anim = shimmer
      ? '<animate attributeName="azimuth" values="235;160;235" keyTimes="0;.5;1" calcMode="spline" keySplines=".4 0 .2 1;.4 0 .2 1" dur="2.6s" begin="2s;' + id + 'sh.end+7s" id="' + id + 'sh"/>'
      : "";
    return '<svg viewBox="-100 -100 200 200">'
      + '<defs>'
      + '<radialGradient id="' + id + 'h" cx="0" cy="0" r="96" gradientUnits="userSpaceOnUse">'
      + '<stop offset=".58" stop-color="#bdbdbd"/><stop offset=".68" stop-color="#f7f7f7"/>'
      + '<stop offset=".8" stop-color="#e2e2e2"/><stop offset=".93" stop-color="#a6a6a6"/><stop offset="1" stop-color="#6a6a6a"/>'
      + '</radialGradient>'
      + '<path id="' + id + 'ring" d="M0 -46.5A46.5 46.5 0 1 1 -.01 -46.5"/>'
      + '<filter id="' + id + 'f" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB">'
      + '<feGaussianBlur in="SourceGraphic" stdDeviation="1.3" result="soft"/>'
      + '<feTurbulence type="fractalNoise" baseFrequency=".09" numOctaves="2" seed="8" result="ripple"/>'
      + '<feColorMatrix in="ripple" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  .05 0 0 0 0" result="rippleA"/>'
      + '<feColorMatrix in="soft" type="luminanceToAlpha" result="hRaw"/>'
      + '<feComposite in="rippleA" in2="hRaw" operator="arithmetic" k2="1" k3="1" result="h"/>'
      + '<feDiffuseLighting in="h" surfaceScale="7" diffuseConstant="1.15" lighting-color="#fff" result="diff">'
      + '<feDistantLight azimuth="235" elevation="46"/></feDiffuseLighting>'
      + '<feSpecularLighting in="h" surfaceScale="7" specularConstant=".8" specularExponent="22" lighting-color="#fff4dc" result="spec">'
      + '<feDistantLight azimuth="235" elevation="34">' + anim + '</feDistantLight></feSpecularLighting>'
      + '<feFlood flood-color="#b8995f"/>'
      + '<feComposite in2="diff" operator="arithmetic" k1="1.08" result="body"/>'
      + '<feComposite in="spec" in2="SourceGraphic" operator="in" result="gloss"/>'
      + '<feComposite in="gloss" in2="body" operator="arithmetic" k2=".6" k3="1" result="lit"/>'
      + '<feComposite in="lit" in2="SourceGraphic" operator="in"/>'
      + '</filter></defs>'
      + '<g filter="url(#' + id + 'f)">'
      + '<path d="' + sealOutline(86) + '" fill="url(#' + id + 'h)"/>'
      + '<circle r="57" fill="#8e8e8e"/>'
      + '<circle r="54" fill="none" stroke="#c9c9c9" stroke-width="2.4"/>'
      + '<circle r="39" fill="none" stroke="#b4b4b4" stroke-width="1.1"/>'
      + '<text font-family="777 Sans, PingFang SC, sans-serif" font-weight="500" font-size="7.4" letter-spacing="2.6" fill="#c4c4c4">'
      + '<textPath href="#' + id + 'ring" startOffset="0">777 TOWER · 洛杉矶 · 私人邀请函 · EB-5 ·</textPath></text>'
      + '<text y="14" text-anchor="middle" font-family="777 Sans, PingFang SC, sans-serif" font-weight="300" font-size="38" letter-spacing="-1.5" fill="#e6e6e6">777</text>'
      + '</g></svg>';
  }
  seal.innerHTML = sealSVG("s1", !capture);

  if (capture) { // tools/render-email.mjs screenshots this
    document.documentElement.classList.add("capture");
    var az = params.get("az");
    if (az) seal.querySelectorAll("feDistantLight")[1].setAttribute("azimuth", az);
    return;
  }

  /* ---------- background: upward-moving photo mosaic ---------- */
  var mosaicCols = 0, mosaicOn = false;
  function colCount() {
    var w = window.innerWidth;
    return w >= 1400 ? 7 : w >= 1100 ? 6 : w >= 800 ? 5 : w >= 560 ? 4 : 3;
  }
  function buildMosaic() {
    var n = colCount();
    if (n === mosaicCols) return;
    mosaicCols = n;
    var phone = window.innerWidth < 600;
    mosaic.innerHTML = "";
    for (var c = 0; c < n; c++) {
      // each column starts at a different photo so neighbours never match
      var list = E.photos.slice((c * 4) % E.photos.length).concat(E.photos.slice(0, (c * 4) % E.photos.length));
      var html = list.concat(list).map(function (p) {
        return '<figure data-shape="' + p.shape + '"><img data-src="' + p.src + '" alt="" decoding="async"></figure>';
      }).join("");
      var col = document.createElement("div");
      col.className = "mosaic__col";
      col.innerHTML = '<div class="mosaic__track">' + html + "</div>";
      // slightly different speeds per column = gentle parallax; phones slower
      var speed = (phone ? 9 : 13) + ((c * 7) % 5) * (phone ? 1.2 : 2.2); // px per second
      col.firstChild.style.setProperty("--speed", speed);
      col.style.marginTop = -((c * 137) % 260) + "px";
      mosaic.appendChild(col);
    }
    sizeTracks();
    if (mosaicOn) loadMosaic();
  }
  function sizeTracks() {
    $$(".mosaic__track").forEach(function (t, i) {
      var dur = (t.offsetHeight / 2) / +t.style.getPropertyValue("--speed");
      t.style.setProperty("--dur", dur.toFixed(1) + "s");
      t.style.setProperty("--delay", (-dur * ((i * .37) % 1)).toFixed(1) + "s");
    });
  }
  function loadMosaic() { // photos are only requested once the envelope is opened
    mosaicOn = true;
    $$(".mosaic img[data-src]").forEach(function (img) {
      img.onload = function () { img.classList.add("is-in"); };
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
    });
  }
  buildMosaic();
  var rz;
  window.addEventListener("resize", function () {
    clearTimeout(rz);
    rz = setTimeout(function () { buildMosaic(); sizeTracks(); }, 200);
  });

  /* ---------- state machine ----------
     idle → openingSeal → openingEnvelope → revealingLetter → expanding → invitationVisible
     Each step awaits the previous animation's `finished`; `run` invalidates a sequence on skip. */
  var state = "idle", run = 0, started = [];
  function setState(s) { state = s; app.dataset.state = s; }
  function play(el, frames, opts) {
    var a = el.animate(frames, Object.assign({ fill: "forwards", easing: "cubic-bezier(.4,0,.2,1)" }, opts));
    started.push(a);
    return a;
  }

  async function openEnvelope() {
    if (state !== "idle") return;
    var id = ++run;
    var alive = function () { return id === run; };
    env.setAttribute("aria-disabled", "true");
    loadMosaic();

    setState("openingSeal");
    [".stage__above", ".stage__below", ".stage__hint", ".skip"].forEach(function (s) {
      play($(s), [{ opacity: 1 }, { opacity: 0 }], { duration: 400 });
    });
    await play(seal, [{ transform: "scale(1)" }, { transform: "scale(.955)" }], { duration: 180, easing: "ease-out" }).finished;
    if (!alive()) return;

    // seal lifts away, the flap folds back on its crease
    setState("openingEnvelope");
    play(wrap, [{ transform: "translateY(0)" }, { transform: "translateY(" + Math.round(env.offsetHeight * .42) + "px)" }],
      { duration: 1200, easing: "cubic-bezier(.45,0,.25,1)" });
    play(seal, [
      { transform: "scale(.955)", opacity: 1 },
      { transform: "translate(6%, -38%) rotate(-16deg) scale(.8)", opacity: 0 }
    ], { duration: 330, easing: "cubic-bezier(.4,0,.6,1)" });
    await play(flap, [
      { transform: "perspective(1400px) rotateX(0deg)" },
      { transform: "perspective(1400px) rotateX(-90deg)" }
    ], { duration: 340, delay: 200, easing: "cubic-bezier(.45,0,.75,.4)" }).finished;
    if (!alive()) return;
    flap.classList.add("is-open"); // edge-on: swap to the lined inside face, drop behind the letter
    play(flap, [
      { transform: "perspective(1400px) rotateX(-90deg)" },
      { transform: "perspective(1400px) rotateX(-180deg)" }
    ], { duration: 380, easing: "cubic-bezier(.2,.6,.35,1)" });

    // the paper rises out of the pocket
    setState("revealingLetter");
    var H = env.offsetHeight, out = -H * 0.97;
    await play(letter, [{ transform: "translateY(0)" }, { transform: "translateY(" + out + "px)" }],
      { duration: 850, delay: 100, easing: "cubic-bezier(.45,.05,.25,1)" }).finished;
    if (!alive()) return;

    // confetti from where the paper left the envelope; envelope fades, the photo wall comes up behind
    letter.style.zIndex = 6;
    setState("expanding");
    var r = letter.getBoundingClientRect();
    confetti.burst(r.left + r.width / 2, r.bottom - r.height * .1);
    [back, pocket, envShadow, flap].forEach(function (el) {
      play(el, [{ opacity: 1 }, { opacity: 0 }], { duration: 600 });
    });
    play(stage, [{ backgroundColor: "rgba(16,27,43,1)" }, { backgroundColor: "rgba(16,27,43,0)" }], { duration: 900 });
    stage.style.background = "transparent";
    play(mosaic, [{ opacity: 0 }, { opacity: 1 }], { duration: 1100 });
    play(veil, [{ opacity: 0 }, { opacity: 1 }], { duration: 900 });

    // the paper opens out to exactly the card underneath, then hands over to it
    stage.classList.add("is-leaving");
    card.style.opacity = 0;
    invitation.hidden = false;
    window.scrollTo(0, 0);
    var c = card.getBoundingClientRect();
    var th = Math.min(c.height, window.innerHeight - c.top);
    var now = letter.getBoundingClientRect();
    var bw = letter.offsetWidth, bh = letter.offsetHeight;
    var baseCx = now.left + now.width / 2, baseCy = now.top + now.height / 2 - out;
    play(letter.firstElementChild, [{ opacity: 1 }, { opacity: 0 }], { duration: 260 });
    await play(letter, [
      { transform: "translateY(" + out + "px)" },
      { transform: "translate(" + (c.left + c.width / 2 - baseCx) + "px," + (c.top + th / 2 - baseCy) + "px) scale(" + c.width / bw + "," + th / bh + ")" }
    ], { duration: 800, easing: "cubic-bezier(.5,0,.2,1)" }).finished;
    if (!alive()) return;
    card.style.opacity = "";
    await play(letter, [{ opacity: 1 }, { opacity: 0 }], { duration: 450, easing: "ease-out" }).finished;
    if (!alive()) return;
    showInvitation();
  }

  function showInvitation() {
    started.forEach(function (a) { a.cancel(); });
    started = [];
    stage.classList.remove("is-leaving");
    loadMosaic();
    invitation.hidden = false;
    card.style.opacity = "";
    setState("invitationVisible");
    sizeTracks();
    $("#inv-title").focus({ preventScroll: true });
  }

  env.addEventListener("click", function () {
    openEnvelope().catch(function () {}); // skip cancels running animations, rejecting `finished` — expected
  });
  $(".skip").addEventListener("click", function () {
    run++;
    confetti.stop();
    showInvitation();
    window.scrollTo(0, 0);
  });

  /* ---------- RSVP ---------- */
  var form = $(".rsvp__form"), done = $(".rsvp__done"), statusEl = $(".rsvp__status"), submitBtn = $(".rsvp__submit");
  var TOKEN_KEY = "777inv:" + E.eventId;
  var TOKEN_RE = /^[a-f0-9]{32}$/;
  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function stored(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  // the personal token: from the email link, else one this browser got from an earlier RSVP
  var token = params.get("token");
  if (token && TOKEN_RE.test(token)) {
    store(TOKEN_KEY, token);
    history.replaceState(null, "", location.pathname); // keep it out of screenshots / shared URLs
  } else {
    token = stored(TOKEN_KEY);
    if (!TOKEN_RE.test(token || "")) token = null;
  }

  function rpc(fn, body) {
    return fetch(E.api.url + "/rest/v1/rpc/" + fn, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: E.api.key },
      body: JSON.stringify(body)
    }).then(function (res) {
      return res.json().catch(function () { return null; }).then(function (data) {
        if (!res.ok) { var err = new Error((data && data.message) || "http_" + res.status); err.status = res.status; throw err; }
        return data;
      });
    });
  }

  var MSG = {
    invalid_name: ["name", "请填写姓名"],
    invalid_email: ["email", "请填写有效的电子邮箱"],
    invalid_phone: ["phone", "电话号码格式不正确"],
    invalid_status: ["status", "请选择出席意向"],
    email_exists: [null, "该邮箱已有登记记录。如需修改，请使用邀请邮件中的专属链接，或直接联系 777 Tower。"],
    invalid_token: [null, "邀请链接无效或已过期，请联系 777 Tower。"],
    rsvp_closed: [null, "本次活动的回复通道已关闭，如需协助请联系 777 Tower。"],
    rate_limited: [null, "提交过于频繁，请稍后再试。"]
  };

  function fieldErr(name, text) {
    var input = form.elements[name];
    var box = name === "status" ? $(".choice") : input.closest(".field");
    $(".field__err", box).textContent = text || "";
    var target = name === "status" ? form.elements.status[0] : input;
    if (text) target.setAttribute("aria-invalid", "true"); else target.removeAttribute("aria-invalid");
  }
  function validate() {
    var ok = true, first = null;
    var v = { name: form.elements.name.value.trim(), email: form.elements.email.value.trim(), phone: form.elements.phone.value.trim(), status: form.elements.status.value };
    function bad(k, msg) { fieldErr(k, msg); ok = false; first = first || k; }
    ["name", "email", "phone", "status"].forEach(function (k) { fieldErr(k, ""); });
    if (!v.name) bad("name", MSG.invalid_name[1]);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email)) bad("email", MSG.invalid_email[1]);
    if (v.phone && !/^[0-9+()\-.\s]{5,40}$/.test(v.phone)) bad("phone", MSG.invalid_phone[1]);
    if (!v.status) bad("status", MSG.invalid_status[1]);
    if (first) (first === "status" ? form.elements.status[0] : form.elements[first]).focus();
    return ok ? v : null;
  }

  var busy = false;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (busy) return; // no double submissions
    statusEl.textContent = "";
    var v = validate();
    if (!v) return;
    if (form.elements.company.value) { showDone(v.status); return; } // bot: pretend, store nothing
    busy = true;
    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    rpc("eb5_rsvp", { p_event: E.eventId, p_token: token, p_name: v.name, p_email: v.email, p_phone: v.phone || null, p_status: v.status })
      .then(function (res) {
        // success only once the database has confirmed the row
        if (!res || !TOKEN_RE.test(res.token || "")) throw new Error("unexpected_response");
        token = res.token;
        store(TOKEN_KEY, token);
        showDone(res.status);
      })
      .catch(function (err) {
        var m = MSG[err.message];
        if (m && m[0]) { fieldErr(m[0], m[1]); form.elements[m[0]].focus && form.elements[m[0]].focus(); }
        else statusEl.textContent = m ? m[1] : "提交失败，请检查网络后重试。您填写的内容已保留。";
      })
      .finally(function () {
        busy = false;
        submitBtn.disabled = false;
        submitBtn.removeAttribute("aria-busy");
      });
  });

  function showDone(status) {
    var yes = status === "attending";
    $(".rsvp__done-title").textContent = yes ? E.rsvp.attendingTitle : E.rsvp.declinedTitle;
    $(".rsvp__done-text").textContent = yes ? E.rsvp.attendingText.replace("{date}", E.displayDateShort) : E.rsvp.declinedText;
    $(".rsvp__done-details").hidden = !yes;
    $(".rsvp__cal").hidden = !yes;
    form.hidden = true;
    done.hidden = false;
    if (state === "invitationVisible") done.focus({ preventScroll: true });
  }
  $(".rsvp__edit").addEventListener("click", function () {
    done.hidden = true;
    form.hidden = false;
    form.elements.name.focus();
  });

  /* calendar: .ics file + Google Calendar link, built from the config */
  (function () {
    var d = E.date.replace(/-/g, ""), s = E.start.replace(":", "") + "00", t = E.end.replace(":", "") + "00";
    var where = "777 Tower, 9th Floor, " + E.addressMap;
    var ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//777 Tower//Invitation//EN", "BEGIN:VEVENT",
      "UID:" + E.eventId + "@777tower", "DTSTAMP:" + new Date().toISOString().replace(/[-:]|\.\d+/g, ""),
      "DTSTART;TZID=" + E.timezone + ":" + d + "T" + s, "DTEND;TZID=" + E.timezone + ":" + d + "T" + t,
      "SUMMARY:" + E.calendarTitle, "LOCATION:" + where.replace(/,/g, "\\,"), "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    $('[data-cal="ics"]').href = "data:text/calendar;charset=utf-8," + encodeURIComponent(ics);
    $('[data-cal="google"]').href = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent(E.calendarTitle)
      + "&dates=" + d + "T" + s + "/" + d + "T" + t + "&ctz=" + encodeURIComponent(E.timezone) + "&location=" + encodeURIComponent(where);
  })();

  /* personalised link: prefill + salutation; an existing reply opens on its confirmation */
  if (token) {
    rpc("eb5_invite", { p_token: token, p_event: E.eventId }).then(function (inv) {
      if (!inv) { token = null; try { localStorage.removeItem(TOKEN_KEY); } catch (e) {} return; }
      if (inv.name) { setSalutation(inv.name); form.elements.name.value = inv.name; }
      if (inv.email) form.elements.email.value = inv.email;
      if (inv.phone) form.elements.phone.value = inv.phone;
      if (inv.status === "attending" || inv.status === "declined") {
        form.elements.status.value = inv.status;
        showDone(inv.status);
      }
    }).catch(function () { /* the generic invitation still works */ });
  }
})();
