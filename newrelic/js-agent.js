/*! For license information please see nr-rum.1efcb83a-1.239.1.min.js.LICENSE.txt */
"use strict";
(self["webpackChunk:NRBA-1.239.1.PROD"] = self["webpackChunk:NRBA-1.239.1.PROD"] || []).push([[75], {
    573: (t,e,n)=>{
        n.d(e, {
            o: ()=>c
        });
        var r = n(247)
          , i = n(711)
          , s = n(673)
          , a = n(310)
          , o = n(551);
        class c extends i.w {
            constructor(t, e, n) {
                super(n),
                this.endpoint = t,
                this.opts = e || {},
                this.started = !1,
                this.timeoutHandle = null,
                this.aborted = !1,
                this.harvest = new s.M(this.sharedContext),
                (0,
                a.L)(this.unload.bind(this)),
                this.sharedContext?.ee.on(o.wO.RESET, (()=>this.runHarvest({
                    forceNoRetry: !0
                })))
            }
            unload() {
                this.aborted || (this.opts.onUnload && this.opts.onUnload(),
                this.runHarvest({
                    unload: !0
                }))
            }
            startTimer(t, e) {
                this.interval = t,
                this.started = !0,
                this.scheduleHarvest(null != e ? e : this.interval)
            }
            stopTimer() {
                let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                this.aborted = t,
                this.started = !1,
                this.timeoutHandle && clearTimeout(this.timeoutHandle)
            }
            scheduleHarvest(t, e) {
                this.timeoutHandle || (null == t && (t = this.interval),
                this.timeoutHandle = setTimeout((()=>{
                    this.timeoutHandle = null,
                    this.runHarvest(e)
                }
                ), 1e3 * t))
            }
            runHarvest(t) {
                if (this.aborted)
                    return;
                const e = e=>{
                    t?.forceNoRetry && (e.retry = !1),
                    this.onHarvestFinished(t, e)
                }
                ;
                let n, i, s = [];
                if (this.opts.getPayload) {
                    if (n = r.qD({
                        isFinalHarvest: t?.unload
                    }),
                    !n)
                        return !1;
                    const e = !t?.unload && n === r.Be;
                    if (i = this.opts.getPayload({
                        retry: e
                    }),
                    !i)
                        return void (this.started && this.scheduleHarvest());
                    i = "[object Array]" === Object.prototype.toString.call(i) ? i : [i],
                    s.push(...i)
                }
                let a = t=>this.harvest.sendX(t);
                s.length ? a = this.opts.raw ? t=>this.harvest._send(t) : t=>this.harvest.send(t) : s.push(void 0),
                s.forEach((r=>{
                    a({
                        endpoint: this.endpoint,
                        payload: r,
                        opts: t,
                        submitMethod: n,
                        cbFinished: e,
                        customUrl: this.opts.customUrl,
                        raw: this.opts.raw
                    })
                }
                )),
                this.started && this.scheduleHarvest()
            }
            onHarvestFinished(t, e) {
                if (this.opts.onFinished && this.opts.onFinished(e),
                e.sent && e.retry) {
                    const n = e.delay || this.opts.retryDelay;
                    this.started && n ? (clearTimeout(this.timeoutHandle),
                    this.timeoutHandle = null,
                    this.scheduleHarvest(n, t)) : !this.started && n && this.scheduleHarvest(n, t)
                }
            }
        }
    }
    ,
    673: (t,e,n)=>{
        n.d(e, {
            M: ()=>A
        });
        var r = n(284)
          , i = n(351)
          , s = {
            "%2C": ",",
            "%3A": ":",
            "%2F": "/",
            "%40": "@",
            "%24": "$",
            "%3B": ";"
        }
          , a = (0,
        r.D)(s, (function(t) {
            return t
        }
        ))
          , o = new RegExp(a.join("|"),"g");
        function c(t) {
            return s[t]
        }
        function u(t) {
            return null == t ? "null" : encodeURIComponent(t).replace(o, c)
        }
        function h(t, e) {
            var n = 0
              , s = "";
            return (0,
            r.D)(t, (function(t, r) {
                var a, o, c = [];
                if ("string" == typeof r || !Array.isArray(r) && null != r && r.toString().length)
                    a = "&" + t + "=" + u(r),
                    n += a.length,
                    s += a;
                else if (Array.isArray(r) && r.length) {
                    for (n += 9,
                    o = 0; o < r.length && (a = u((0,
                    i.P)(r[o])),
                    n += a.length,
                    !(void 0 !== e && n >= e)); o++)
                        c.push(a);
                    s += "&" + t + "=%5B" + c.join(",") + "%5D"
                }
            }
            )),
            s
        }
        function l(t, e) {
            return e && "string" == typeof e ? "&" + t + "=" + u(e) : ""
        }
        var d = n(247);
        function p() {
            return "" + location
        }
        var f = n(763)
          , g = n(222)
          , m = n(894)
          , v = n(239)
          , y = n(141);
        function b(t, e) {
            let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "string"
              , r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [];
            return t && "object" == typeof t ? (Object.keys(t).forEach((i=>{
                "object" == typeof t[i] ? b(t[i], e, n, r) : typeof t[i] !== n || r.includes(i) || (t[i] = e(t[i]))
            }
            )),
            t) : t
        }
        var w = n(711)
          , S = n(818)
          , T = n(385)
          , O = n(50);
        const E = {};
        class A extends w.w {
            constructor(t) {
                super(t),
                this.tooManyRequestsDelay = (0,
                f.Mt)(this.sharedContext.agentIdentifier, "harvest.tooManyRequestsDelay") || 60,
                this.obfuscator = new y.RR(this.sharedContext),
                this.getScheme = ()=>!1 === (0,
                f.Mt)(this.sharedContext.agentIdentifier, "ssl") ? "http" : "https",
                this._events = {}
            }
            sendX() {
                let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                const e = d.qD({
                    isFinalHarvest: t.opts?.unload
                })
                  , n = {
                    retry: !t.opts?.unload && e === d.Be,
                    isFinalHarvest: !0 === t.opts?.unload
                }
                  , r = this.createPayload(t.endpoint, n);
                return (this.obfuscator.shouldObfuscate() ? this.obfuscateAndSend.bind(this) : this._send.bind(this))({
                    ...t,
                    payload: r,
                    submitMethod: e
                })
            }
            send() {
                let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return (this.obfuscator.shouldObfuscate() ? this.obfuscateAndSend.bind(this) : this._send.bind(this))(t)
            }
            obfuscateAndSend() {
                var t = this;
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                const {payload: n={}} = e;
                return b(n, (function() {
                    return t.obfuscator.obfuscateString(...arguments)
                }
                ), "string", ["e"]),
                this._send({
                    ...e,
                    payload: n
                })
            }
            _send(t) {
                let {endpoint: e, payload: n={}, opts: r={}, submitMethod: s, cbFinished: a, customUrl: o, raw: c, includeBaseParams: u=!0} = t;
                const l = (0,
                f.C5)(this.sharedContext.agentIdentifier);
                if (!l.errorBeacon)
                    return !1;
                const p = (0,
                f.OP)(this.sharedContext.agentIdentifier);
                let {body: g, qs: m} = this.cleanPayload(n);
                if (0 === Object.keys(g).length && !r?.sendEmptyBody)
                    return a && a({
                        sent: !1
                    }),
                    !1;
                const y = "rum" !== e ? "/".concat(e) : "";
                let b = "".concat(this.getScheme(), "://").concat(l.errorBeacon).concat(y, "/1/").concat(l.licenseKey);
                o && (b = o),
                c && (b = "".concat(this.getScheme(), "://").concat(l.errorBeacon, "/").concat(e));
                const w = !c && u ? this.baseQueryString() : "";
                let S = h(m, p.maxBytes);
                s || (s = d.qD({
                    isFinalHarvest: r.unload
                })),
                "" === w && S.startsWith("&") && (S = S.substring(1));
                const A = "".concat(b, "?").concat(w).concat(S);
                !!m?.attributes?.includes("gzip") || (g = "events" === e ? g.e : (0,
                i.P)(g),
                g.length > 75e4 && 1 === (E[e] = (E?.[e] || 0) + 1) && (0,
                O.Z)("The Browser Agent is attempting to send a very large payload to /".concat(e, ". This is usually tied to large amounts of custom attributes. Please check your configurations."))),
                g && 0 !== g.length && "{}" !== g && "[]" !== g || (g = "");
                const M = [];
                M.push({
                    key: "content-type",
                    value: "text/plain"
                });
                let P = s({
                    url: A,
                    body: g,
                    sync: r.unload && (T.v6 || T.w1),
                    headers: M
                });
                if (!r.unload && a && s === d.Be) {
                    const t = this;
                    P.addEventListener("load", (function() {
                        const e = {
                            sent: !0,
                            status: this.status
                        };
                        429 === this.status ? (e.retry = !0,
                        e.delay = t.tooManyRequestsDelay) : 408 !== this.status && 500 !== this.status && 503 !== this.status || (e.retry = !0),
                        r.needResponse && (e.responseText = this.responseText),
                        a(e)
                    }
                    ), (0,
                    v.m$)(!1))
                }
                return P
            }
            baseQueryString() {
                const t = (0,
                f.OP)(this.sharedContext.agentIdentifier)
                  , e = (0,
                f.C5)(this.sharedContext.agentIdentifier)
                  , n = (0,
                g.f)(p())
                  , r = this.obfuscator.shouldObfuscate() ? this.obfuscator.obfuscateString(n) : n;
                return ["a=" + e.applicationID, l("sa", e.sa ? "" + e.sa : ""), l("v", S.q4), M(e), l("ct", t.customTransaction), "&rst=" + (0,
                m.z)(), "&ck=0", "&s=" + (t.session?.state.value || "0"), l("ref", r), l("ptid", t.ptid ? "" + t.ptid : "")].join("")
            }
            createPayload(t, e) {
                const n = this._events[t]
                  , r = {
                    body: {},
                    qs: {}
                };
                if (Array.isArray(n) && n.length > 0)
                    for (let t = 0; t < n.length; t++) {
                        const i = n[t](e);
                        i && (r.body = {
                            ...r.body,
                            ...i.body || {}
                        },
                        r.qs = {
                            ...r.qs,
                            ...i.qs || {}
                        })
                    }
                return r
            }
            cleanPayload() {
                let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                const e = t=>"undefined" != typeof Uint8Array && t instanceof Uint8Array || Array.isArray(t) ? t : "string" == typeof t ? t.length > 0 ? t : null : Object.entries(t || {}).reduce(((t,e)=>{
                    let[n,r] = e;
                    return ("number" == typeof r || "string" == typeof r && r.length > 0 || "object" == typeof r && Object.keys(r || {}).length > 0) && (t[n] = r),
                    t
                }
                ), {});
                return {
                    body: e(t.body),
                    qs: e(t.qs)
                }
            }
            on(t, e) {
                Array.isArray(this._events[t]) || (this._events[t] = []),
                this._events[t].push(e)
            }
        }
        function M(t) {
            return t.transactionName ? l("to", t.transactionName) : l("t", t.tNamePlain || "Unnamed Transaction")
        }
    }
    ,
    551: (t,e,n)=>{
        n.d(e, {
            wO: ()=>I,
            $s: ()=>_
        });
        var r = n(402)
          , i = n(50)
          , s = n(351)
          , a = n(148);
        class o {
            constructor(t, e) {
                if (!t.onEnd)
                    throw new Error("onEnd handler is required");
                if (!e)
                    throw new Error("ms duration is required");
                this.onEnd = t.onEnd,
                this.initialMs = e,
                this.startTimestamp = Date.now(),
                this.timer = this.create(this.onEnd, e)
            }
            create(t, e) {
                return this.timer && this.clear(),
                setTimeout((()=>t ? t() : this.onEnd()), e || this.initialMs)
            }
            clear() {
                clearTimeout(this.timer),
                this.timer = null
            }
            end() {
                this.clear(),
                this.onEnd()
            }
            isValid() {
                return this.initialMs - (Date.now() - this.startTimestamp) > 0
            }
        }
        var c = n(385)
          , u = n(56)
          , h = n(956)
          , l = n(872);
        class d extends o {
            constructor(t, e) {
                super(t, e),
                this.onPause = "function" == typeof t.onPause ? t.onPause : ()=>{}
                ,
                this.onRefresh = "function" == typeof t.onRefresh ? t.onRefresh : ()=>{}
                ,
                this.onResume = "function" == typeof t.onResume ? t.onResume : ()=>{}
                ,
                this.remainingMs = void 0,
                t.refreshEvents || (t.refreshEvents = ["click", "keydown", "scroll"]);
                try {
                    this.abortController = new AbortController
                } catch (t) {}
                if (c.il && t.ee) {
                    if (t.ee) {
                        this.ee = t.ee;
                        const e = (0,
                        l.D)(this.refresh.bind(this), 500, {
                            leading: !0
                        });
                        this.refreshHandler = n=>{
                            t.refreshEvents.includes(n?.[0]?.type) && e()
                        }
                        ,
                        t.ee.on("fn-end", this.refreshHandler)
                    }
                    (0,
                    h.N)((t=>{
                        "hidden" === t ? this.pause() : this.resume()
                    }
                    ), !1, !1, this.abortController?.signal)
                }
            }
            abort() {
                this.clear(),
                this.abortController?.abort(),
                this.refreshHandler && (this.ee.removeEventListener("fn-end", this.refreshHandler),
                this.refreshHandler = this.ee = null)
            }
            pause() {
                this.onPause(),
                clearTimeout(this.timer),
                this.remainingMs = this.initialMs - (Date.now() - this.startTimestamp)
            }
            resume() {
                this.refresh(),
                this.onResume()
            }
            refresh(t, e) {
                this.clear(),
                this.timer = this.create(t, e),
                this.startTimestamp = Date.now(),
                this.remainingMs = void 0,
                this.onRefresh()
            }
        }
        var p = n(117);
        const f = "nr@original:".concat(p.a);
        var g = Object.prototype.hasOwnProperty
          , m = !1;
        function v(t, e) {
            return t || (t = a.ee),
            n.inPlace = function(t, e, r, i, s) {
                r || (r = "");
                const a = "-" === r.charAt(0);
                for (let o = 0; o < e.length; o++) {
                    const c = e[o]
                      , u = t[c];
                    b(u) || (t[c] = n(u, a ? c + r : r, i, c, s))
                }
            }
            ,
            n.flag = f,
            n;
            function n(e, n, i, s, a) {
                return b(e) ? e : (n || (n = ""),
                nrWrapper[f] = e,
                function(t, e, n) {
                    if (Object.defineProperty && Object.keys)
                        try {
                            return Object.keys(t).forEach((function(n) {
                                Object.defineProperty(e, n, {
                                    get: function() {
                                        return t[n]
                                    },
                                    set: function(e) {
                                        return t[n] = e,
                                        e
                                    }
                                })
                            }
                            )),
                            e
                        } catch (t) {
                            y([t], n)
                        }
                    for (var r in t)
                        g.call(t, r) && (e[r] = t[r])
                }(e, nrWrapper, t),
                nrWrapper);
                function nrWrapper() {
                    var o, c, u, h;
                    try {
                        c = this,
                        o = [...arguments],
                        u = "function" == typeof i ? i(o, c) : i || {}
                    } catch (e) {
                        y([e, "", [o, c, s], u], t)
                    }
                    r(n + "start", [o, c, s], u, a);
                    try {
                        return h = e.apply(c, o)
                    } catch (t) {
                        throw r(n + "err", [o, c, t], u, a),
                        t
                    } finally {
                        r(n + "end", [o, c, h], u, a)
                    }
                }
            }
            function r(n, r, i, s) {
                if (!m || e) {
                    var a = m;
                    m = !0;
                    try {
                        t.emit(n, r, i, e, s)
                    } catch (e) {
                        y([e, n, r, i], t)
                    }
                    m = a
                }
            }
        }
        function y(t, e) {
            e || (e = a.ee);
            try {
                e.emit("internal-error", t)
            } catch (t) {}
        }
        function b(t) {
            return !(t && t instanceof Function && t.apply && !t[f])
        }
        var w = n(210);
        const S = {}
          , T = c._A.XMLHttpRequest
          , O = "addEventListener"
          , E = "removeEventListener"
          , A = "nr@wrapped:".concat(a.A);
        function M(t) {
            var e = function(t) {
                return (t || a.ee).get("events")
            }(t);
            if (S[e.debugId]++)
                return e;
            S[e.debugId] = 1;
            var n = v(e, !0);
            function r(t) {
                n.inPlace(t, [O, E], "-", i)
            }
            function i(t, e) {
                return t[1]
            }
            return "getPrototypeOf"in Object && (c.il && P(document, r),
            P(c._A, r),
            P(T.prototype, r)),
            e.on(O + "-start", (function(t, e) {
                var r = t[1];
                if (null !== r && ("function" == typeof r || "object" == typeof r)) {
                    var i = (0,
                    w.X)(r, A, (function() {
                        var t = {
                            object: function() {
                                if ("function" != typeof r.handleEvent)
                                    return;
                                return r.handleEvent.apply(r, arguments)
                            },
                            function: r
                        }[typeof r];
                        return t ? n(t, "fn-", null, t.name || "anonymous") : r
                    }
                    ));
                    this.wrapped = t[1] = i
                }
            }
            )),
            e.on(E + "-start", (function(t) {
                t[1] = this.wrapped || t[1]
            }
            )),
            e
        }
        function P(t, e) {
            let n = t;
            for (; "object" == typeof n && !Object.prototype.hasOwnProperty.call(n, O); )
                n = Object.getPrototypeOf(n);
            for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), s = 2; s < r; s++)
                i[s - 2] = arguments[s];
            n && e(n, ...i)
        }
        c._A.Request,
        c._A.Response;
        n(239);
        var x = n(567)
          , C = n(546)
          , k = n(81)
          , j = n(325);
        const D = 0
          , R = {
            value: "",
            inactiveAt: 0,
            expiresAt: 0,
            updatedAt: Date.now(),
            sessionReplay: D,
            sessionTraceMode: D,
            custom: {}
        }
          , I = {
            PAUSE: "session-pause",
            RESET: "session-reset",
            RESUME: "session-resume"
        };
        class _ {
            constructor(t) {
                const {agentIdentifier: e, key: n, storage: r} = t;
                if (!e || !n || !r)
                    throw new Error("Missing required field(s):".concat(e ? "" : " agentID").concat(n ? "" : " key").concat(r ? "" : " storage"));
                this.agentIdentifier = e,
                this.storage = r,
                this.state = {},
                this.key = n,
                this.ee = a.ee.get(e),
                M(this.ee),
                this.setup(t)
            }
            setup(t) {
                let {value: e=(0,
                r.ky)(16), expiresMs: n=u.oD, inactiveMs: i=u.Hb} = t;
                this.state = {},
                this.sync(R),
                this.state.value = e,
                this.expiresMs = n,
                this.inactiveMs = i;
                const s = this.read();
                n ? (this.state.expiresAt = s?.expiresAt || this.getFutureTimestamp(n),
                this.expiresTimer = new o({
                    onEnd: ()=>{
                        this.collectSM("expired", this),
                        this.collectSM("duration", this),
                        this.reset()
                    }
                },this.state.expiresAt - Date.now())) : this.state.expiresAt = 1 / 0,
                i ? (this.state.inactiveAt = s?.inactiveAt || this.getFutureTimestamp(i),
                this.inactiveTimer = new d({
                    onEnd: ()=>{
                        this.collectSM("inactive", this),
                        this.collectSM("duration", this),
                        this.reset()
                    }
                    ,
                    onRefresh: this.refresh.bind(this),
                    onResume: ()=>{
                        this.ee.emit(I.RESUME)
                    }
                    ,
                    onPause: ()=>{
                        this.initialized && this.ee.emit(I.PAUSE),
                        this.write((0,
                        x.D)(this.state, R))
                    }
                    ,
                    ee: this.ee,
                    refreshEvents: ["click", "keydown", "scroll"]
                },this.state.inactiveAt - Date.now())) : this.state.inactiveAt = 1 / 0,
                void 0 === this.isNew && (this.isNew = !Object.keys(s).length),
                this.isNew ? this.write((0,
                x.D)(this.state, R), !0) : this.sync(s),
                this.initialized = !0
            }
            get lookupKey() {
                return "".concat(u.Bq, "_").concat(this.key)
            }
            sync(t) {
                Object.assign(this.state, t)
            }
            read() {
                try {
                    const t = this.storage.get(this.lookupKey);
                    if (!t)
                        return {};
                    const e = "string" == typeof t ? JSON.parse(t) : t;
                    return this.isInvalid(e) ? {} : this.isExpired(e.expiresAt) ? (this.collectSM("expired", this),
                    this.collectSM("duration", e, !0),
                    this.reset()) : this.isExpired(e.inactiveAt) ? (this.collectSM("inactive", this),
                    this.collectSM("duration", e, !0),
                    this.reset()) : e
                } catch (t) {
                    return (0,
                    i.Z)("Failed to read from storage API", t),
                    {}
                }
            }
            write(t) {
                try {
                    if (!t || "object" != typeof t)
                        return;
                    return t.updatedAt = Date.now(),
                    this.sync(t),
                    this.storage.set(this.lookupKey, (0,
                    s.P)(this.state)),
                    t
                } catch (t) {
                    return (0,
                    i.Z)("Failed to write to the storage API", t),
                    null
                }
            }
            reset() {
                try {
                    return this.initialized && this.ee.emit(I.RESET),
                    this.storage.remove(this.lookupKey),
                    this.inactiveTimer?.abort?.(),
                    this.expiresTimer?.clear?.(),
                    delete this.isNew,
                    this.setup({
                        agentIdentifier: this.agentIdentifier,
                        key: this.key,
                        storage: this.storage,
                        expiresMs: this.expiresMs,
                        inactiveMs: this.inactiveMs
                    }),
                    this.read()
                } catch (t) {
                    return {}
                }
            }
            refresh() {
                const t = this.read();
                this.write({
                    ...t,
                    inactiveAt: this.getFutureTimestamp(this.inactiveMs)
                })
            }
            isExpired(t) {
                return Date.now() > t
            }
            isInvalid(t) {
                return !Object.keys(R).every((e=>Object.keys(t).includes(e)))
            }
            collectSM(t, e, n) {
                let r, i;
                if ("duration" === t) {
                    const t = e.expiresAt - e.expiresMs;
                    r = (n ? e.updatedAt : Date.now()) - t,
                    i = "Session/Duration/Ms"
                }
                "expired" === t && (i = "Session/Expired/Seen"),
                "inactive" === t && (i = "Session/Inactive/Seen"),
                i && (0,
                C.p)(k.xS, [i, r], void 0, j.D.metrics, this.ee)
            }
            getFutureTimestamp(t) {
                return Date.now() + t
            }
            syncCustomAttribute(t, e) {
                if (c.il)
                    if (null === e) {
                        const e = this.read();
                        e.custom && (delete e.custom[t],
                        this.write({
                            ...e
                        }))
                    } else {
                        const n = this.read();
                        this.custom = {
                            ...n?.custom || {},
                            [t]: e
                        },
                        this.write({
                            ...n,
                            custom: this.custom
                        })
                    }
            }
        }
    }
    ,
    310: (t,e,n)=>{
        n.d(e, {
            L: ()=>a
        });
        var r = n(239)
          , i = n(385)
          , s = n(956);
        if (i.v6) {
            i._A.cleanupTasks = [];
            const t = i._A.close;
            i._A.close = ()=>{
                for (let t of i._A.cleanupTasks)
                    t();
                t()
            }
        }
        function a(t) {
            i.il ? ((0,
            s.N)(t, !0),
            (0,
            r.bP)("pagehide", t)) : i.v6 && i._A.cleanupTasks.push(t)
        }
    }
    ,
    222: (t,e,n)=>{
        n.d(e, {
            f: ()=>s
        });
        var r = /([^?#]*)[^#]*(#[^?]*|$).*/
          , i = /([^?#]*)().*/;
        function s(t, e) {
            return t.replace(e ? r : i, "$1$2")
        }
    }
    ,
    271: (t,e,n)=>{
        n.d(e, {
            V: ()=>i
        });
        var r = n(385);
        function i() {
            return Boolean("file:" === r._A?.location?.protocol)
        }
    }
    ,
    872: (t,e,n)=>{
        function r(t) {
            var e = this;
            let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500
              , r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            const i = r?.leading || !1;
            let s;
            return function() {
                for (var r = arguments.length, a = new Array(r), o = 0; o < r; o++)
                    a[o] = arguments[o];
                i && void 0 === s && (t.apply(e, a),
                s = setTimeout((()=>{
                    s = clearTimeout(s)
                }
                ), n)),
                i || (clearTimeout(s),
                s = setTimeout((()=>{
                    t.apply(e, a)
                }
                ), n))
            }
        }
        function i(t) {
            var e = this;
            let n = !1;
            return function() {
                if (!n) {
                    n = !0;
                    for (var r = arguments.length, i = new Array(r), s = 0; s < r; s++)
                        i[s] = arguments[s];
                    t.apply(e, i)
                }
            }
        }
        n.d(e, {
            D: ()=>r,
            Z: ()=>i
        })
    }
    ,
    141: (t,e,n)=>{
        n.d(e, {
            $c: ()=>u,
            Ng: ()=>h,
            RR: ()=>c
        });
        var r = n(763)
          , i = n(711)
          , s = n(271)
          , a = n(50)
          , o = {
            regex: /^file:\/\/(.*)/,
            replacement: atob("ZmlsZTovL09CRlVTQ0FURUQ=")
        };
        class c extends i.w {
            shouldObfuscate() {
                return u(this.sharedContext.agentIdentifier).length > 0
            }
            obfuscateString(t) {
                if (!t || "string" != typeof t)
                    return t;
                for (var e = u(this.sharedContext.agentIdentifier), n = t, r = 0; r < e.length; r++) {
                    var i = e[r].regex
                      , s = e[r].replacement || "*";
                    n = n.replace(i, s)
                }
                return n
            }
        }
        function u(t) {
            var e = []
              , n = (0,
            r.Mt)(t, "obfuscate") || [];
            return e = e.concat(n),
            (0,
            s.V)() && e.push(o),
            e
        }
        function h(t) {
            for (var e = !1, n = !1, r = 0; r < t.length; r++) {
                "regex"in t[r] ? "string" == typeof t[r].regex || t[r].regex instanceof RegExp || ((0,
                a.Z)('An obfuscation replacement rule contains a "regex" value with an invalid type (must be a string or RegExp)'),
                n = !0) : ((0,
                a.Z)('An obfuscation replacement rule was detected missing a "regex" value.'),
                n = !0);
                var i = t[r].replacement;
                i && "string" != typeof i && ((0,
                a.Z)('An obfuscation replacement rule contains a "replacement" value with an invalid type (must be a string)'),
                e = !0)
            }
            return !e && !n
        }
    }
    ,
    247: (t,e,n)=>{
        n.d(e, {
            Be: ()=>s,
            qD: ()=>i
        });
        var r = n(385);
        function i() {
            let {isFinalHarvest: t=!1} = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return t && r.il && r.Nk ? a : s
        }
        function s(t) {
            let {url: e, body: n=null, sync: r, method: i="POST", headers: s=[{
                key: "content-type",
                value: "text/plain"
            }]} = t;
            const a = new XMLHttpRequest;
            a.open(i, e, !r);
            try {
                "withCredentials"in a && (a.withCredentials = !0)
            } catch (t) {}
            return s.forEach((t=>{
                a.setRequestHeader(t.key, t.value)
            }
            )),
            a.send(n),
            a
        }
        function a(t) {
            let {url: e, body: n} = t;
            try {
                return window.navigator.sendBeacon.bind(window.navigator)(e, n)
            } catch (t) {
                return !1
            }
        }
    }
    ,
    939: (t,e,n)=>{
        n.r(e),
        n.d(e, {
            Aggregate: ()=>R
        });
        var r = n(763)
          , i = n(322)
          , s = n(573)
          , a = n(81)
          , o = n(385);
        const c = "React"
          , u = "NextJS"
          , h = "Vue"
          , l = "NuxtJS"
          , d = "Angular"
          , p = "AngularUniversal"
          , f = "Svelte"
          , g = "SvelteKit"
          , m = "Preact"
          , v = "PreactSSR"
          , y = "AngularJS"
          , b = "Backbone"
          , w = "Ember"
          , S = "Meteor"
          , T = "Zepto"
          , O = "Jquery"
          , E = "MooTools"
          , A = "Qwik"
          , M = "Electron";
        function P() {
            if (!o.il)
                return [];
            const t = [];
            try {
                (function() {
                    try {
                        return Object.prototype.hasOwnProperty.call(window, "React") || Object.prototype.hasOwnProperty.call(window, "ReactDOM") || Object.prototype.hasOwnProperty.call(window, "ReactRedux") || document.querySelector("[data-reactroot], [data-reactid]") || (()=>{
                            const t = document.querySelectorAll("body > div");
                            for (let e = 0; e < t.length; e++)
                                if (Object.prototype.hasOwnProperty.call(t[e], "_reactRootContainer"))
                                    return !0
                        }
                        )()
                    } catch (t) {
                        return !1
                    }
                }
                )() && (t.push(c),
                function() {
                    try {
                        return Object.prototype.hasOwnProperty.call(window, "next") && Object.prototype.hasOwnProperty.call(window.next, "version")
                    } catch (t) {
                        return !1
                    }
                }() && t.push(u)),
                function() {
                    try {
                        return Object.prototype.hasOwnProperty.call(window, "Vue")
                    } catch (t) {
                        return !1
                    }
                }() && (t.push(h),
                function() {
                    try {
                        return Object.prototype.hasOwnProperty.call(window, "$nuxt") && Object.prototype.hasOwnProperty.call(window.$nuxt, "nuxt")
                    } catch (t) {
                        return !1
                    }
                }() && t.push(l)),
                function() {
                    try {
                        return Object.prototype.hasOwnProperty.call(window, "ng") || document.querySelector("[ng-version]")
                    } catch (t) {
                        return !1
                    }
                }() && (t.push(d),
                function() {
                    try {
                        return document.querySelector("[ng-server-context]")
                    } catch (t) {
                        return !1
                    }
                }() && t.push(p)),
                function() {
                    try {
                        return Object.prototype.hasOwnProperty.call(window, "__svelte")
                    } catch (t) {
                        return !1
                    }
                }() && (t.push(f),
                function() {
                    try {
                        return !!Object.keys(window).find((t=>t.startsWith("__sveltekit")))
                    } catch (t) {
                        return !1
                    }
                }() && t.push(g)),
                function() {
                    try {
                        return Object.prototype.hasOwnProperty.call(window, "preact")
                    } catch (t) {
                        return !1
                    }
                }() && (t.push(m),
                function() {
                    try {
                        return document.querySelector('script[type="__PREACT_CLI_DATA__"]')
                    } catch (t) {
                        return !1
                    }
                }() && t.push(v)),
                function() {
                    try {
                        return Object.prototype.hasOwnProperty.call(window, "angular") || document.querySelector(".ng-binding, [ng-app], [data-ng-app], [ng-controller], [data-ng-controller], [ng-repeat], [data-ng-repeat]") || document.querySelector('script[src*="angular.js"], script[src*="angular.min.js"]')
                    } catch (t) {
                        return !1
                    }
                }() && t.push(y),
                Object.prototype.hasOwnProperty.call(window, "Backbone") && t.push(b),
                Object.prototype.hasOwnProperty.call(window, "Ember") && t.push(w),
                Object.prototype.hasOwnProperty.call(window, "Meteor") && t.push(S),
                Object.prototype.hasOwnProperty.call(window, "Zepto") && t.push(T),
                Object.prototype.hasOwnProperty.call(window, "jQuery") && t.push(O),
                Object.prototype.hasOwnProperty.call(window, "MooTools") && t.push(E),
                Object.prototype.hasOwnProperty.call(window, "qwikevents") && t.push(A),
                function() {
                    try {
                        return "object" == typeof navigator && "string" == typeof navigator.userAgent && navigator.userAgent.indexOf("Electron") >= 0
                    } catch (t) {
                        return !1
                    }
                }() && t.push(M)
            } catch (t) {}
            return t
        }
        var x = n(271)
          , C = n(141)
          , k = n(960)
          , j = n(239)
          , D = n(262);
        class R extends D.m {
            static featureName = a.t9;
            constructor(t, e) {
                let n;
                super(t, e, a.t9),
                (0,
                i.X)("block-err", (()=>{
                    this.blocked = !0,
                    n && (n.aborted = !0)
                }
                ), this.featureName, this.ee),
                (0,
                i.X)(a.xS, this.storeSupportabilityMetrics.bind(this), this.featureName, this.ee),
                (0,
                i.X)(a.vz, this.storeEventMetrics.bind(this), this.featureName, this.ee),
                this.singleChecks(),
                this.eachSessionChecks(),
                n = new s.o("jserrors",{
                    onUnload: ()=>this.unload()
                },this),
                n.harvest.on("jserrors", (()=>({
                    body: this.aggregator.take(["cm", "sm"])
                }))),
                this.drain()
            }
            storeSupportabilityMetrics(t, e) {
                if (this.blocked)
                    return;
                const n = a.mY
                  , r = {
                    name: t
                };
                this.aggregator.storeMetric(n, t, r, e)
            }
            storeEventMetrics(t, e) {
                if (this.blocked)
                    return;
                const n = a.gF
                  , r = {
                    name: t
                };
                this.aggregator.store(n, t, r, e)
            }
            singleChecks() {
                const {distMethod: t, loaderType: e} = (0,
                r.OP)(this.agentIdentifier);
                e && this.storeSupportabilityMetrics("Generic/LoaderType/".concat(e, "/Detected")),
                t && this.storeSupportabilityMetrics("Generic/DistMethod/".concat(t, "/Detected")),
                o.il ? (this.storeSupportabilityMetrics("Generic/Runtime/Browser/Detected"),
                (0,
                k.K)((()=>{
                    P().forEach((t=>{
                        this.storeSupportabilityMetrics("Framework/" + t + "/Detected")
                    }
                    ))
                }
                ))) : o.v6 ? this.storeSupportabilityMetrics("Generic/Runtime/Worker/Detected") : this.storeSupportabilityMetrics("Generic/Runtime/Unknown/Detected"),
                (0,
                x.V)() && this.storeSupportabilityMetrics("Generic/FileProtocol/Detected");
                const n = (0,
                C.$c)(this.agentIdentifier);
                n.length > 0 && this.storeSupportabilityMetrics("Generic/Obfuscate/Detected"),
                n.length > 0 && !(0,
                C.Ng)(n) && this.storeSupportabilityMetrics("Generic/Obfuscate/Invalid")
            }
            eachSessionChecks() {
                o.il && (0,
                j.bP)("pageshow", (t=>{
                    t.persisted && this.storeSupportabilityMetrics("Generic/BFCache/PageRestored")
                }
                ))
            }
            unload() {
                try {
                    if (this.resourcesSent)
                        return;
                    this.resourcesSent = !0;
                    const t = (0,
                    r.OP)(this.agentIdentifier)
                      , e = ["beacon", "fetch", "xmlhttprequest"]
                      , n = ["nr-data.net", "newrelic.com", "nr-local.net", "localhost"];
                    function i(t) {
                        return e.includes(t.initiatorType)
                    }
                    if ((performance?.getEntriesByType("resource") || []).forEach((t=>{
                        var e;
                        e = t,
                        n.some((t=>e.name.indexOf(t) >= 0)) ? i(t) ? this.storeSupportabilityMetrics("Generic/Resources/Ajax/Internal") : this.storeSupportabilityMetrics("Generic/Resources/Non-Ajax/Internal") : i(t) ? this.storeSupportabilityMetrics("Generic/Resources/Ajax/External") : this.storeSupportabilityMetrics("Generic/Resources/Non-Ajax/External")
                    }
                    )),
                    t.ptid && this.storeSupportabilityMetrics("PageSession/Feature/SessionTrace/DurationMs", Math.round(performance.now())),
                    "undefined" != typeof performance) {
                        const s = performance.getEntriesByType("mark")
                          , a = performance.getEntriesByType("measure");
                        this.storeSupportabilityMetrics("Generic/Performance/Mark/Seen", s.length),
                        this.storeSupportabilityMetrics("Generic/Performance/Measure/Seen", a.length)
                    }
                } catch (o) {}
            }
        }
    }
    ,
    440: (t,e,n)=>{
        n.r(e),
        n.d(e, {
            Aggregate: ()=>k
        });
        var r = n(546)
          , i = n(325)
          , s = n(385)
          , a = n(85)
          , o = "Start"
          , c = "End"
          , u = "unloadEvent"
          , h = "redirect"
          , l = "domainLookup"
          , d = "onnect"
          , p = "response"
          , f = "loadEvent"
          , g = "domContentLoadedEvent"
          , m = [];
        function v(t, e) {
            let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
              , r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
            if (e)
                return n.of = t,
                b(n.of, n, "n", !0),
                b(e[u + o], n, "u", r),
                b(e[h + o], n, "r", r),
                b(e[u + c], n, "ue", r),
                b(e[h + c], n, "re", r),
                b(e["fetch" + o], n, "f", r),
                b(e[l + o], n, "dn", r),
                b(e[l + c], n, "dne", r),
                b(e["c" + d + o], n, "c", r),
                b(e["secureC" + d + "ion" + o], n, "s", r),
                b(e["c" + d + c], n, "ce", r),
                b(e["request" + o], n, "rq", r),
                b(e[p + o], n, "rp", r),
                b(e[p + c], n, "rpe", r),
                b(e.domLoading, n, "dl", r),
                b(e.domInteractive, n, "di", r),
                b(e[g + o], n, "ds", r),
                b(e[g + c], n, "de", r),
                b(e.domComplete, n, "dc", r),
                b(e[f + o], n, "l", r),
                b(e[f + c], n, "le", r),
                n
        }
        function y(t, e) {
            var n;
            return b("number" == typeof (n = t.type) ? n : {
                navigate: void 0,
                reload: 1,
                back_forward: 2,
                prerender: 3
            }[n], e, "ty"),
            b(t.redirectCount, e, "rc"),
            e
        }
        function b(t, e, n, r) {
            if ("number" == typeof t && t > 0) {
                if (r) {
                    const n = e?.of > 0 ? e.of : 0;
                    t = Math.max(t - n, 0)
                }
                t = Math.round(t),
                e[n] = t
            }
            m.push(t)
        }
        var w = n(351);
        const S = {};
        var T = n(763)
          , O = n(673)
          , E = n(633)
          , A = n(632);
        function M(t) {
            const e = []
              , n = (0,
            A.fP)();
            try {
                Object.keys(n.initializedAgents[t].features).forEach((t=>{
                    switch (t) {
                    case i.D.ajax:
                        e.push("xhr");
                        break;
                    case i.D.jserrors:
                        e.push("err");
                        break;
                    case i.D.pageAction:
                        e.push("ins");
                        break;
                    case i.D.sessionTrace:
                        e.push("stn");
                        break;
                    case i.D.spa:
                        e.push("spa")
                    }
                }
                ))
            } catch (t) {}
            return e
        }
        var P = n(587)
          , x = n(50)
          , C = n(262);
        class k extends C.m {
            static featureName = E.t9;
            constructor(t, e) {
                if (super(t, e, E.t9),
                "undefined" == typeof PerformanceNavigationTiming || s.Tt)
                    this.sendRum();
                else {
                    this.alreadySent = !1;
                    const e = (0,
                    T.OP)(t);
                    (0,
                    a.mr)((t=>{
                        let {value: n, entries: s} = t;
                        if (this.alreadySent)
                            return;
                        this.alreadySent = !0,
                        e[E.Dz] = Math.round(n);
                        const a = s[0]
                          , o = Math.max(a.responseStart, a.activationStart || 0);
                        e[E.OJ] = Math.max(Math.round(a.loadEventEnd - o), 0),
                        (0,
                        r.p)("timing", ["load", Math.round(a.loadEventEnd)], void 0, i.D.pageViewTiming, this.ee),
                        e[E.qw] = Math.max(Math.round(a.domContentLoadedEventEnd - o), 0),
                        this.sendRum()
                    }
                    ))
                }
            }
            getScheme() {
                return !1 === (0,
                T.Mt)(this.agentIdentifier, "ssl") ? "http" : "https"
            }
            sendRum() {
                const t = (0,
                T.C5)(this.agentIdentifier)
                  , e = (0,
                T.OP)(this.agentIdentifier)
                  , n = new O.M(this);
                if (!t.beacon)
                    return;
                t.queueTime && this.aggregator.store("measures", "qt", {
                    value: t.queueTime
                }),
                t.applicationTime && this.aggregator.store("measures", "ap", {
                    value: t.applicationTime
                }),
                this.aggregator.store("measures", "be", {
                    value: s.il ? e[E.Dz] : 0
                }),
                this.aggregator.store("measures", "fe", {
                    value: s.il ? e[E.OJ] : 0
                }),
                this.aggregator.store("measures", "dc", {
                    value: s.il ? e[E.qw] : 0
                });
                const r = {
                    tt: t.ttGuid,
                    us: t.user,
                    ac: t.account,
                    pr: t.product,
                    af: M(this.agentIdentifier).join(","),
                    ...Object.entries(this.aggregator.get("measures") || {}).reduce(((t,e)=>{
                        let[n,r] = e;
                        return t[n] = r.params?.value,
                        t
                    }
                    ), {}),
                    xx: t.extra,
                    ua: t.userAttributes,
                    at: t.atts
                };
                let i;
                if ("object" == typeof t.jsAttributes && Object.keys(t.jsAttributes).length > 0 && (i = {
                    ja: t.jsAttributes
                }),
                s._A.performance)
                    if ("undefined" != typeof PerformanceNavigationTiming) {
                        const t = s._A?.performance?.getEntriesByType("navigation")?.[0]
                          , n = {
                            timing: v(e.offset, t, {}),
                            navigation: y(t, {})
                        };
                        r.perf = (0,
                        w.P)(n)
                    } else if ("undefined" != typeof PerformanceTiming) {
                        const t = {
                            timing: v(e.offset, s._A.performance.timing, {}, !0),
                            navigation: y(s._A.performance.navigation, {})
                        };
                        r.perf = (0,
                        w.P)(t)
                    }
                try {
                    s._A.performance.getEntriesByType("paint").forEach((function(t) {
                        !t.startTime || t.startTime <= 0 || ("first-paint" === t.name ? r.fp = String(Math.floor(t.startTime)) : "first-contentful-paint" === t.name && (r.fcp = String(Math.floor(t.startTime))),
                        S[t.name] = Math.floor(t.startTime))
                    }
                    ))
                } catch (t) {}
                n.send({
                    endpoint: "rum",
                    payload: {
                        qs: r,
                        body: i
                    },
                    opts: {
                        needResponse: !0,
                        sendEmptyBody: !0
                    },
                    cbFinished: t=>{
                        let {status: e, responseText: n} = t;
                        if (e >= 400)
                            this.ee.abort();
                        else
                            try {
                                (0,
                                P.N)(JSON.parse(n), this.agentIdentifier),
                                this.drain()
                            } catch (t) {
                                this.ee.abort(),
                                (0,
                                x.Z)("RUM call failed. Agent shutting down.")
                            }
                    }
                })
            }
        }
    }
    ,
    386: (t,e,n)=>{
        n.r(e),
        n.d(e, {
            Aggregate: ()=>O
        });
        var r = n(85);
        const i = t=>{
            let e;
            try {
                PerformanceObserver.supportedEntryTypes.includes("paint") && (e = new PerformanceObserver((n=>{
                    Promise.resolve().then((()=>{
                        n.getEntries().forEach((n=>{
                            if ("first-paint" === n.name) {
                                e.disconnect();
                                const r = {
                                    name: "FP",
                                    value: n.startTime
                                };
                                t(r)
                            }
                        }
                        ))
                    }
                    ))
                }
                )),
                e.observe({
                    type: "paint",
                    buffered: !0
                }))
            } catch (t) {}
        }
        ;
        var s = n(310);
        var a = n(385)
          , o = n(284)
          , c = n(351)
          , u = n(141)
          , h = Object.prototype.hasOwnProperty;
        function l(t, e) {
            return e ? Math.floor(t).toString(36) : void 0 === t || 0 === t ? "" : Math.floor(t).toString(36)
        }
        function d(t) {
            var e = Object.hasOwnProperty("create") ? Object.create(null) : {}
              , n = 0;
            return function(r) {
                if (void 0 === r || "" === r)
                    return "";
                var i = new u.RR({
                    agentIdentifier: t
                });
                r = String(r),
                i.shouldObfuscate() && (r = i.obfuscateString(r));
                return h.call(e, r) ? l(e[r], !0) : (e[r] = n++,
                function(t) {
                    return "'" + t.replace(f, "\\$1")
                }(r))
            }
        }
        function p(t, e) {
            var n = [];
            return (0,
            o.D)(t, (function(t, r) {
                if (!(n.length >= 64)) {
                    var i, s = 5;
                    switch (t = e(t),
                    typeof r) {
                    case "object":
                        r ? i = e((0,
                        c.P)(r)) : s = 9;
                        break;
                    case "number":
                        s = 6,
                        i = r % 1 ? r : r + ".";
                        break;
                    case "boolean":
                        s = r ? 7 : 8;
                        break;
                    case "undefined":
                        s = 9;
                        break;
                    default:
                        i = e(r)
                    }
                    n.push([s, t + (i ? "," + i : "")])
                }
            }
            )),
            n
        }
        var f = /([,\\;])/g;
        var g = n(573)
          , m = n(322)
          , v = n(222)
          , y = n(546)
          , b = n(763)
          , w = n(251)
          , S = n(325)
          , T = n(262);
        class O extends T.m {
            static featureName = w.t;
            constructor(t, e) {
                var n;
                super(t, e, w.t),
                n = this,
                this.timings = [],
                this.timingsSent = [],
                this.curSessEndRecorded = !1,
                this.cls = null;
                const o = (0,
                b.OP)(t).initHidden;
                if (this.alreadySent = new Set,
                i((t=>{
                    let {name: e, value: n} = t;
                    o || this.addTiming(e.toLowerCase(), Math.floor(n))
                }
                )),
                a.ux)
                    try {
                        if (!o) {
                            performance.getEntriesByType("paint").forEach((t=>{
                                "first-contentful-paint" === t.name && this.addTiming("fcp", Math.floor(t.startTime))
                            }
                            ))
                        }
                    } catch (t) {}
                else
                    (0,
                    r.a4)((t=>{
                        let {name: e, value: n} = t;
                        o || this.alreadySent.has(e) || (this.alreadySent.add(e),
                        this.addTiming(e.toLowerCase(), n))
                    }
                    ));
                (0,
                r.Fu)((t=>{
                    let {name: e, value: n, entries: r} = t;
                    if (o || this.alreadySent.has(e) || 0 === r.length)
                        return;
                    this.alreadySent.add(e);
                    const i = r[0]
                      , s = {
                        type: i.name,
                        fid: Math.round(n)
                    };
                    this.addConnectionAttributes(s),
                    this.addTiming("fi", Math.round(i.startTime), s)
                }
                )),
                (0,
                r.NO)((t=>{
                    let {name: e, value: n, entries: r} = t;
                    if (o || this.alreadySent.has(e))
                        return;
                    this.alreadySent.add(e);
                    const i = {};
                    if (r.length > 0) {
                        const t = r[r.length - 1];
                        i.size = t.size,
                        i.eid = t.id,
                        t.url && (i.elUrl = (0,
                        v.f)(t.url)),
                        t.element?.tagName && (i.elTag = t.element.tagName)
                    }
                    this.addConnectionAttributes(i),
                    this.addTiming(e.toLowerCase(), n, i)
                }
                )),
                (0,
                r.mw)((t=>{
                    let {value: e} = t;
                    this.cls = e
                }
                ), {
                    reportAllChanges: !0
                }),
                (0,
                r.Yn)((t=>{
                    let {name: e, value: n, id: r} = t;
                    return this.addTiming(e.toLowerCase(), n, {
                        metricId: r
                    })
                }
                )),
                !0 === (0,
                b.Mt)(this.agentIdentifier, "page_view_timing.long_task") && (t=>{
                    const e = e=>{
                        e.forEach((e=>{
                            const n = {
                                name: "LT",
                                value: e.duration,
                                info: {
                                    ltFrame: e.name,
                                    ltStart: e.startTime,
                                    ltCtr: e.attribution[0].containerType
                                }
                            };
                            "window" !== n.info.ltCtr && Object.assign(n.info, {
                                ltCtrSrc: e.attribution[0].containerSrc,
                                ltCtrId: e.attribution[0].containerId,
                                ltCtrName: e.attribution[0].containerName
                            }),
                            t(n)
                        }
                        ))
                    }
                    ;
                    let n;
                    try {
                        PerformanceObserver.supportedEntryTypes.includes("longtask") && (n = new PerformanceObserver((t=>{
                            Promise.resolve().then((()=>{
                                e(t.getEntries())
                            }
                            ))
                        }
                        )),
                        n.observe({
                            type: "longtask",
                            buffered: !0
                        }))
                    } catch (t) {}
                    n && (0,
                    s.L)((()=>{
                        e(n.takeRecords())
                    }
                    ), !0)
                }
                )((t=>{
                    let {name: e, value: n, info: r} = t;
                    return this.addTiming(e.toLowerCase(), n, r)
                }
                )),
                this.scheduler = new g.o("events",{
                    onFinished: function() {
                        return n.onHarvestFinished(...arguments)
                    },
                    getPayload: function() {
                        return n.prepareHarvest(...arguments)
                    }
                },this),
                (0,
                m.X)("timing", ((t,e,n)=>this.addTiming(t, e, n)), this.featureName, this.ee),
                (0,
                m.X)("docHidden", (t=>this.endCurrentSession(t)), this.featureName, this.ee),
                (0,
                m.X)("winPagehide", (t=>this.recordPageUnload(t)), this.featureName, this.ee);
                const c = (0,
                b.Mt)(this.agentIdentifier, "page_view_timing.initialHarvestSeconds") || 10
                  , u = (0,
                b.Mt)(this.agentIdentifier, "page_view_timing.harvestTimeSeconds") || 30;
                this.ee.on("drain-".concat(this.featureName), (()=>{
                    this.scheduler.startTimer(u, c)
                }
                )),
                this.drain()
            }
            addConnectionAttributes(t) {
                var e = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
                if (e)
                    return e.type && (t["net-type"] = e.type),
                    e.effectiveType && (t["net-etype"] = e.effectiveType),
                    e.rtt && (t["net-rtt"] = e.rtt),
                    e.downlink && (t["net-dlink"] = e.downlink),
                    t
            }
            endCurrentSession(t) {
                this.curSessEndRecorded || (this.addTiming("pageHide", t, null),
                this.curSessEndRecorded = !0)
            }
            recordPageUnload(t) {
                this.addTiming("unload", t, null),
                this.endCurrentSession(t)
            }
            addTiming(t, e, n) {
                n = n || {},
                null !== this.cls && (n.cls = this.cls),
                this.timings.push({
                    name: t,
                    value: e,
                    attrs: n
                }),
                (0,
                y.p)("pvtAdded", [t, e, n], void 0, S.D.sessionTrace, this.ee)
            }
            onHarvestFinished(t) {
                t.retry && this.timingsSent.length > 0 && (this.timings.unshift(...this.timingsSent),
                this.timingsSent = [])
            }
            appendGlobalCustomAttributes(t) {
                var e = t.attrs || {}
                  , n = (0,
                b.C5)(this.agentIdentifier).jsAttributes || {}
                  , r = ["size", "eid", "cls", "type", "fid", "elTag", "elUrl", "net-type", "net-etype", "net-rtt", "net-dlink"];
                (0,
                o.D)(n, (function(t, n) {
                    r.indexOf(t) < 0 && (e[t] = n)
                }
                ))
            }
            prepareHarvest(t) {
                if (0 !== this.timings.length) {
                    var e = this.getPayload(this.timings);
                    if (t.retry)
                        for (var n = 0; n < this.timings.length; n++)
                            this.timingsSent.push(this.timings[n]);
                    return this.timings = [],
                    {
                        body: {
                            e
                        }
                    }
                }
            }
            getPayload(t) {
                for (var e, n, r, i = d(this.agentIdentifier), s = "bel.6;", a = 0; a < t.length; a++) {
                    var o = t[a];
                    s += "e,",
                    s += i(o.name) + ",",
                    s += (e = o.value,
                    n = l,
                    r = !1,
                    (e || 0 === e || "" === e ? n(e) + (r ? "," : "") : "!") + ","),
                    this.appendGlobalCustomAttributes(o);
                    var c = p(o.attrs, i);
                    c && c.length > 0 && (s += l(c.length) + ";" + c.join(";")),
                    a + 1 < t.length && (s += ";")
                }
                return s
            }
        }
    }
    ,
    228: (t,e,n)=>{
        n.d(e, {
            setupAgentSession: ()=>l
        });
        var r = n(763)
          , i = n(0)
          , s = n(148)
          , a = n(322)
          , o = n(551);
        class c {
            get(t) {
                try {
                    return localStorage.getItem(t) || void 0
                } catch (t) {
                    return ""
                }
            }
            set(t, e) {
                try {
                    return null == e ? this.remove(t) : localStorage.setItem(t, e)
                } catch (t) {}
            }
            remove(t) {
                try {
                    localStorage.removeItem(t)
                } catch (t) {}
            }
        }
        class u {
            constructor(t) {
                this.domain = t
            }
            get(t) {
                try {
                    var e = document.cookie.match(new RegExp("(^| )" + t + "=([^;]+)"));
                    if (e)
                        return e[2]
                } catch (t) {
                    return ""
                }
            }
            set(t, e) {
                try {
                    const n = "".concat(t, "=").concat(e, "; Domain=").concat(this.domain, "; Path=/");
                    document.cookie = n
                } catch (t) {}
            }
            remove(t) {
                try {
                    document.cookie = "".concat(t, "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Domain=").concat(this.domain, "; Path=/")
                } catch (t) {}
            }
        }
        let h = 0;
        function l(t) {
            const e = (0,
            r.OP)(t);
            if (h++)
                return e.session;
            const n = (0,
            r.P_)(t).session
              , l = n?.domain ? new u(n.domain) : new c;
            e.session = new o.$s({
                agentIdentifier: t,
                key: "SESSION",
                storage: l,
                expiresMs: n?.expiresMs,
                inactiveMs: n?.inactiveMs
            });
            const d = e.session.state.custom
              , p = (0,
            r.C5)(t);
            d && (p.jsAttributes = {
                ...p.jsAttributes,
                ...d
            });
            const f = s.ee.get(t);
            return (0,
            a.X)("api-setCustomAttribute", ((t,n,r)=>{
                e.session.syncCustomAttribute(n, r)
            }
            ), "session", f),
            (0,
            a.X)("api-setUserId", ((t,n,r)=>{
                e.session.syncCustomAttribute(n, r)
            }
            ), "session", f),
            (0,
            i.L)(t, "session"),
            e.session
        }
    }
    ,
    262: (t,e,n)=>{
        n.d(e, {
            m: ()=>u
        });
        var r = n(322)
          , i = n(938)
          , s = n(763)
          , a = n(144)
          , o = n(632)
          , c = n(0);
        class u extends i.W {
            constructor() {
                super(...arguments),
                this.checkConfiguration()
            }
            waitForFlags() {
                let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                return Promise.all(t.map((t=>new Promise((e=>{
                    (0,
                    r.X)("rumresp-".concat(t), (t=>e(t)), this.featureName, this.ee)
                }
                )))))
            }
            drain() {
                (0,
                c.L)(this.agentIdentifier, this.featureName)
            }
            checkConfiguration() {
                if (!(0,
                s.lF)(this.agentIdentifier)) {
                    let t = {
                        ...(0,
                        o.gG)().info?.jsAttributes
                    };
                    try {
                        t = {
                            ...t,
                            ...(0,
                            s.C5)(this.agentIdentifier)?.jsAttributes
                        }
                    } catch (t) {}
                    (0,
                    a.j)(this.agentIdentifier, {
                        ...(0,
                        o.gG)(),
                        info: {
                            ...(0,
                            o.gG)().info,
                            jsAttributes: t
                        },
                        runtime: (0,
                        s.OP)(this.agentIdentifier)
                    })
                }
            }
        }
    }
    ,
    582: (t,e,n)=>{
        n.d(e, {
            lazyFeatureLoader: ()=>i
        });
        var r = n(325);
        function i(t, e) {
            if ("aggregate" === e)
                switch (t) {
                case r.D.ajax:
                    return Promise.resolve().then((function() {
                        var t = new Error("Cannot find module '../ajax/aggregate'");
                        throw t.code = "MODULE_NOT_FOUND",
                        t
                    }
                    ));
                case r.D.jserrors:
                    return Promise.resolve().then((function() {
                        var t = new Error("Cannot find module '../jserrors/aggregate'");
                        throw t.code = "MODULE_NOT_FOUND",
                        t
                    }
                    ));
                case r.D.metrics:
                    return n.e(75).then(n.bind(n, 939));
                case r.D.pageAction:
                    return Promise.resolve().then((function() {
                        var t = new Error("Cannot find module '../page_action/aggregate'");
                        throw t.code = "MODULE_NOT_FOUND",
                        t
                    }
                    ));
                case r.D.pageViewEvent:
                    return n.e(75).then(n.bind(n, 440));
                case r.D.pageViewTiming:
                    return n.e(75).then(n.bind(n, 386));
                case r.D.sessionReplay:
                    return Promise.resolve().then((function() {
                        var t = new Error("Cannot find module '../session_replay/aggregate'");
                        throw t.code = "MODULE_NOT_FOUND",
                        t
                    }
                    ));
                case r.D.sessionTrace:
                    return Promise.resolve().then((function() {
                        var t = new Error("Cannot find module '../session_trace/aggregate'");
                        throw t.code = "MODULE_NOT_FOUND",
                        t
                    }
                    ));
                case r.D.spa:
                    return Promise.resolve().then((function() {
                        var t = new Error("Cannot find module '../spa/aggregate'");
                        throw t.code = "MODULE_NOT_FOUND",
                        t
                    }
                    ));
                default:
                    throw new Error("Attempted to load unsupported agent feature: ".concat(t, " ").concat(e))
                }
        }
    }
    ,
    438: (t,e,n)=>{
        n.r(e),
        n.d(e, {
            setAPI: ()=>d
        });
        var r = n(325)
          , i = n(763)
          , s = n(148)
          , a = n(546)
          , o = n(322)
          , c = n(872)
          , u = n(247)
          , h = n(385)
          , l = n(81);
        function d(t) {
            var e = s.ee.get(t)
              , n = 0
              , d = !1 === (0,
            i.Mt)(t, "ssl") ? "http" : "https"
              , p = {
                finished: (0,
                c.Z)((function(n, s) {
                    var o = s ? s - (0,
                    i.OP)(t).offset : n;
                    (0,
                    a.p)(l.vz, ["finished", {
                        time: o
                    }], void 0, r.D.metrics, e),
                    f(n, {
                        name: "finished",
                        start: o + (0,
                        i.OP)(t).offset,
                        origin: "nr"
                    }),
                    (0,
                    a.p)("api-addPageAction", [o, "finished"], void 0, r.D.pageAction, e)
                }
                )),
                setErrorHandler: function(e, n) {
                    (0,
                    i.OP)(t).onerror = n
                },
                addToTrace: f,
                inlineHit: function(e, r, s, a, o, c, l) {
                    if (!h.il)
                        return;
                    r = window.encodeURIComponent(r),
                    n += 1;
                    const p = (0,
                    i.C5)(t);
                    if (!p.beacon)
                        return;
                    var f = d + "://" + p.beacon + "/1/" + p.licenseKey;
                    f += "?a=" + p.applicationID + "&",
                    f += "t=" + r + "&",
                    f += "qt=" + ~~s + "&",
                    f += "ap=" + ~~a + "&",
                    f += "be=" + ~~o + "&",
                    f += "dc=" + ~~c + "&",
                    f += "fe=" + ~~l + "&",
                    f += "c=" + n,
                    u.Be({
                        url: f
                    })
                },
                addRelease: function(e, n, r) {
                    if (++g > 10)
                        return;
                    (0,
                    i.OP)(t).releaseIds[n.slice(-200)] = ("" + r).slice(-200)
                }
            };
            function f(n, s) {
                if (s && "object" == typeof s && s.name && s.start) {
                    var o = {
                        n: s.name,
                        s: s.start - (0,
                        i.OP)(t).offset,
                        e: (s.end || s.start) - (0,
                        i.OP)(t).offset,
                        o: s.origin || "",
                        t: "api"
                    };
                    (0,
                    a.p)("bstApi", [o], void 0, r.D.sessionTrace, e)
                }
            }
            Object.entries(p).forEach((t=>{
                let[n,r] = t;
                return (0,
                o.X)("api-" + n, r, "api", e)
            }
            ));
            var g = 0
        }
    }
    ,
    85: (t,e,n)=>{
        n.d(e, {
            Fu: ()=>N,
            NO: ()=>Y,
            Yn: ()=>K,
            a4: ()=>M,
            mr: ()=>nt,
            mw: ()=>x
        });
        var r, i, s, a, o, c = -1, u = function(t) {
            addEventListener("pageshow", (function(e) {
                e.persisted && (c = e.timeStamp,
                t(e))
            }
            ), !0)
        }, h = function() {
            return window.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0]
        }, l = function() {
            var t = h();
            return t && t.activationStart || 0
        }, d = function(t, e) {
            var n = h()
              , r = "navigate";
            return c >= 0 ? r = "back-forward-cache" : n && (r = document.prerendering || l() > 0 ? "prerender" : document.wasDiscarded ? "restore" : n.type.replace(/_/g, "-")),
            {
                name: t,
                value: void 0 === e ? -1 : e,
                rating: "good",
                delta: 0,
                entries: [],
                id: "v3-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12),
                navigationType: r
            }
        }, p = function(t, e, n) {
            try {
                if (PerformanceObserver.supportedEntryTypes.includes(t)) {
                    var r = new PerformanceObserver((function(t) {
                        Promise.resolve().then((function() {
                            e(t.getEntries())
                        }
                        ))
                    }
                    ));
                    return r.observe(Object.assign({
                        type: t,
                        buffered: !0
                    }, n || {})),
                    r
                }
            } catch (t) {}
        }, f = function(t, e, n, r) {
            var i, s;
            return function(a) {
                e.value >= 0 && (a || r) && ((s = e.value - (i || 0)) || void 0 === i) && (i = e.value,
                e.delta = s,
                e.rating = function(t, e) {
                    return t > e[1] ? "poor" : t > e[0] ? "needs-improvement" : "good"
                }(e.value, n),
                t(e))
            }
        }, g = function(t) {
            requestAnimationFrame((function() {
                return requestAnimationFrame((function() {
                    return t()
                }
                ))
            }
            ))
        }, m = function(t) {
            var e = function(e) {
                "pagehide" !== e.type && "hidden" !== document.visibilityState || t(e)
            };
            addEventListener("visibilitychange", e, !0),
            addEventListener("pagehide", e, !0)
        }, v = function(t) {
            var e = !1;
            return function(n) {
                e || (t(n),
                e = !0)
            }
        }, y = -1, b = function() {
            return "hidden" !== document.visibilityState || document.prerendering ? 1 / 0 : 0
        }, w = function(t) {
            "hidden" === document.visibilityState && y > -1 && (y = "visibilitychange" === t.type ? t.timeStamp : 0,
            T())
        }, S = function() {
            addEventListener("visibilitychange", w, !0),
            addEventListener("prerenderingchange", w, !0)
        }, T = function() {
            removeEventListener("visibilitychange", w, !0),
            removeEventListener("prerenderingchange", w, !0)
        }, O = function() {
            return y < 0 && (y = b(),
            S(),
            u((function() {
                setTimeout((function() {
                    y = b(),
                    S()
                }
                ), 0)
            }
            ))),
            {
                get firstHiddenTime() {
                    return y
                }
            }
        }, E = function(t) {
            document.prerendering ? addEventListener("prerenderingchange", (function() {
                return t()
            }
            ), !0) : t()
        }, A = [1800, 3e3], M = function(t, e) {
            e = e || {},
            E((function() {
                var n, r = O(), i = d("FCP"), s = p("paint", (function(t) {
                    t.forEach((function(t) {
                        "first-contentful-paint" === t.name && (s.disconnect(),
                        t.startTime < r.firstHiddenTime && (i.value = Math.max(t.startTime - l(), 0),
                        i.entries.push(t),
                        n(!0)))
                    }
                    ))
                }
                ));
                s && (n = f(t, i, A, e.reportAllChanges),
                u((function(r) {
                    i = d("FCP"),
                    n = f(t, i, A, e.reportAllChanges),
                    g((function() {
                        i.value = performance.now() - r.timeStamp,
                        n(!0)
                    }
                    ))
                }
                )))
            }
            ))
        }, P = [.1, .25], x = function(t, e) {
            e = e || {},
            M(v((function() {
                var n, r = d("CLS", 0), i = 0, s = [], a = function(t) {
                    t.forEach((function(t) {
                        if (!t.hadRecentInput) {
                            var e = s[0]
                              , n = s[s.length - 1];
                            i && t.startTime - n.startTime < 1e3 && t.startTime - e.startTime < 5e3 ? (i += t.value,
                            s.push(t)) : (i = t.value,
                            s = [t])
                        }
                    }
                    )),
                    i > r.value && (r.value = i,
                    r.entries = s,
                    n())
                }, o = p("layout-shift", a);
                o && (n = f(t, r, P, e.reportAllChanges),
                m((function() {
                    a(o.takeRecords()),
                    n(!0)
                }
                )),
                u((function() {
                    i = 0,
                    r = d("CLS", 0),
                    n = f(t, r, P, e.reportAllChanges),
                    g((function() {
                        return n()
                    }
                    ))
                }
                )),
                setTimeout(n, 0))
            }
            )))
        }, C = {
            passive: !0,
            capture: !0
        }, k = new Date, j = function(t, e) {
            r || (r = e,
            i = t,
            s = new Date,
            I(removeEventListener),
            D())
        }, D = function() {
            if (i >= 0 && i < s - k) {
                var t = {
                    entryType: "first-input",
                    name: r.type,
                    target: r.target,
                    cancelable: r.cancelable,
                    startTime: r.timeStamp,
                    processingStart: r.timeStamp + i
                };
                a.forEach((function(e) {
                    e(t)
                }
                )),
                a = []
            }
        }, R = function(t) {
            if (t.cancelable) {
                var e = (t.timeStamp > 1e12 ? new Date : performance.now()) - t.timeStamp;
                "pointerdown" == t.type ? function(t, e) {
                    var n = function() {
                        j(t, e),
                        i()
                    }
                      , r = function() {
                        i()
                    }
                      , i = function() {
                        removeEventListener("pointerup", n, C),
                        removeEventListener("pointercancel", r, C)
                    };
                    addEventListener("pointerup", n, C),
                    addEventListener("pointercancel", r, C)
                }(e, t) : j(e, t)
            }
        }, I = function(t) {
            ["mousedown", "keydown", "touchstart", "pointerdown"].forEach((function(e) {
                return t(e, R, C)
            }
            ))
        }, _ = [100, 300], N = function(t, e) {
            e = e || {},
            E((function() {
                var n, s = O(), o = d("FID"), c = function(t) {
                    t.startTime < s.firstHiddenTime && (o.value = t.processingStart - t.startTime,
                    o.entries.push(t),
                    n(!0))
                }, h = function(t) {
                    t.forEach(c)
                }, l = p("first-input", h);
                n = f(t, o, _, e.reportAllChanges),
                l && m(v((function() {
                    h(l.takeRecords()),
                    l.disconnect()
                }
                ))),
                l && u((function() {
                    var s;
                    o = d("FID"),
                    n = f(t, o, _, e.reportAllChanges),
                    a = [],
                    i = -1,
                    r = null,
                    I(addEventListener),
                    s = c,
                    a.push(s),
                    D()
                }
                ))
            }
            ))
        }, F = 0, L = 1 / 0, H = 0, q = function(t) {
            t.forEach((function(t) {
                t.interactionId && (L = Math.min(L, t.interactionId),
                H = Math.max(H, t.interactionId),
                F = H ? (H - L) / 7 + 1 : 0)
            }
            ))
        }, U = function() {
            return o ? F : performance.interactionCount || 0
        }, B = function() {
            "interactionCount"in performance || o || (o = p("event", q, {
                type: "event",
                buffered: !0,
                durationThreshold: 0
            }))
        }, G = [200, 500], z = 0, X = function() {
            return U() - z
        }, Z = [], V = {}, J = function(t) {
            var e = Z[Z.length - 1]
              , n = V[t.interactionId];
            if (n || Z.length < 10 || t.duration > e.latency) {
                if (n)
                    n.entries.push(t),
                    n.latency = Math.max(n.latency, t.duration);
                else {
                    var r = {
                        id: t.interactionId,
                        latency: t.duration,
                        entries: [t]
                    };
                    V[r.id] = r,
                    Z.push(r)
                }
                Z.sort((function(t, e) {
                    return e.latency - t.latency
                }
                )),
                Z.splice(10).forEach((function(t) {
                    delete V[t.id]
                }
                ))
            }
        }, K = function(t, e) {
            e = e || {},
            E((function() {
                B();
                var n, r = d("INP"), i = function(t) {
                    t.forEach((function(t) {
                        t.interactionId && J(t),
                        "first-input" === t.entryType && !Z.some((function(e) {
                            return e.entries.some((function(e) {
                                return t.duration === e.duration && t.startTime === e.startTime
                            }
                            ))
                        }
                        )) && J(t)
                    }
                    ));
                    var e, i = (e = Math.min(Z.length - 1, Math.floor(X() / 50)),
                    Z[e]);
                    i && i.latency !== r.value && (r.value = i.latency,
                    r.entries = i.entries,
                    n())
                }, s = p("event", i, {
                    durationThreshold: e.durationThreshold || 40
                });
                n = f(t, r, G, e.reportAllChanges),
                s && (s.observe({
                    type: "first-input",
                    buffered: !0
                }),
                m((function() {
                    i(s.takeRecords()),
                    r.value < 0 && X() > 0 && (r.value = 0,
                    r.entries = []),
                    n(!0)
                }
                )),
                u((function() {
                    Z = [],
                    z = U(),
                    r = d("INP"),
                    n = f(t, r, G, e.reportAllChanges)
                }
                )))
            }
            ))
        }, W = [2500, 4e3], Q = {}, Y = function(t, e) {
            e = e || {},
            E((function() {
                var n, r = O(), i = d("LCP"), s = function(t) {
                    var e = t[t.length - 1];
                    e && e.startTime < r.firstHiddenTime && (i.value = Math.max(e.startTime - l(), 0),
                    i.entries = [e],
                    n())
                }, a = p("largest-contentful-paint", s);
                if (a) {
                    n = f(t, i, W, e.reportAllChanges);
                    var o = v((function() {
                        Q[i.id] || (s(a.takeRecords()),
                        a.disconnect(),
                        Q[i.id] = !0,
                        n(!0))
                    }
                    ));
                    ["keydown", "click"].forEach((function(t) {
                        addEventListener(t, o, !0)
                    }
                    )),
                    m(o),
                    u((function(r) {
                        i = d("LCP"),
                        n = f(t, i, W, e.reportAllChanges),
                        g((function() {
                            i.value = performance.now() - r.timeStamp,
                            Q[i.id] = !0,
                            n(!0)
                        }
                        ))
                    }
                    ))
                }
            }
            ))
        }, tt = [800, 1800], et = function t(e) {
            document.prerendering ? E((function() {
                return t(e)
            }
            )) : "complete" !== document.readyState ? addEventListener("load", (function() {
                return t(e)
            }
            ), !0) : setTimeout(e, 0)
        }, nt = function(t, e) {
            e = e || {};
            var n = d("TTFB")
              , r = f(t, n, tt, e.reportAllChanges);
            et((function() {
                var i = h();
                if (i) {
                    var s = i.responseStart;
                    if (s <= 0 || s > performance.now())
                        return;
                    n.value = Math.max(s - l(), 0),
                    n.entries = [i],
                    r(!0),
                    u((function() {
                        n = d("TTFB", 0),
                        (r = f(t, n, tt, e.reportAllChanges))(!0)
                    }
                    ))
                }
            }
            ))
        }
    }
}]);
