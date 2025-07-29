(function(e) {
    e.XMPlayer || (e.XMPlayer = {});
    var t = e.XMPlayer;

    function n(e) {
        if (0 !== e.effectdata && void 0 !== e.inst) {
            var n = [0, e.effectdata >> 4, 15 & e.effectdata],
                o = e.note + n[t.cur_tick % 3];
            e.period = t.periodForNote(e, o)
        }
    }

    function o(e) {
        void 0 !== e.periodtarget && void 0 !== e.portaspeed && (e.period > e.periodtarget ? e.period = Math.max(e.periodtarget, e.period - e.portaspeed) : e.period = Math.min(e.periodtarget, e.period + e.portaspeed))
    }

    function a(e) {
        e.periodoffset = function(e, t) {
            var n = 0;
            switch (3 & e) {
                case 1:
                    n = (1 + 2 * t / 64) % 2 - 1;
                    break;
                case 2:
                case 3:
                    n = t < 32 ? 1 : -1;
                    break;
                default:
                    n = Math.sin(t * Math.PI / 32)
            }
            return n
        }(e.vibratotype, e.vibratopos) * e.vibratodepth, isNaN(e.periodoffset) && (console.log("vibrato periodoffset NaN?", e.vibratopos, e.vibratospeed, e.vibratodepth), e.periodoffset = 0), t.cur_tick > 0 && (e.vibratopos += e.vibratospeed, e.vibratopos &= 63)
    }

    function r(e, t) {
        t && (e.volumeslide = (t >> 4) - (15 & t))
    }

    function i(e) {
        void 0 !== e.volumeslide && (e.vol = Math.max(0, Math.min(64, e.vol + e.volumeslide)))
    }

    function s() {}

    function l(e, n) {
        console.log("unimplemented effect", t.prettify_effect(e.effect, n))
    }
    t.effects_t0 = [n, function(e, t) {
        0 !== t && (e.slideupspeed = t)
    }, function(e, t) {
        0 !== t && (e.slidedownspeed = t)
    }, function(e, t) {
        0 !== t && (e.portaspeed = t)
    }, function(e, t) {
        15 & t && (e.vibratodepth = 2 * (15 & t)), t >> 4 && (e.vibratospeed = t >> 4), a(e)
    }, r, r, l, function(e, t) {
        e.pan = t
    }, function(e, t) {
        e.off = 256 * t
    }, r, function(e, n) {
        n < t.xm.songpats.length && (t.cur_songpos = n - 1, t.cur_pat = -1, t.cur_row = -1)
    }, function(e, t) {
        e.vol = Math.min(64, t)
    }, function(e, n) {
        t.cur_songpos++, t.cur_songpos >= t.xm.songpats.length && (t.cur_songpos = t.xm.song_looppos), t.cur_pat = t.xm.songpats[t.cur_songpos], t.next_row = 10 * (n >> 4) + (15 & n)
    }, function(e, n) {
        var o = n >> 4;
        switch (n &= 15, o) {
            case 1:
                e.period -= n;
                break;
            case 2:
                e.period += n;
                break;
            case 4:
                e.vibratotype = 7 & n;
                break;
            case 5:
                e.fine = (n << 4) + n - 128;
                break;
            case 6:
                0 == n ? e.loopstart = t.cur_row : (void 0 === e.loopend && (e.loopend = t.cur_row, e.loopremaining = n), 0 !== e.loopremaining ? (e.loopremaining--, t.next_row = e.loopstart || 0) : (delete e.loopend, delete e.loopstart));
                break;
            case 8:
                e.pan = 17 * n;
                break;
            case 10:
                0 === n && void 0 !== e.finevolup && (n = e.finevolup), e.vol = Math.min(64, e.vol + n), e.finevolup = n;
                break;
            case 11:
                0 === n && void 0 !== e.finevoldown && (n = e.finevoldown), e.vol = Math.max(0, e.vol - n), e.finevoldown = n;
                break;
            case 12:
                break;
            default:
                console.log("unimplemented extended effect E", e.effectdata.toString(16))
        }
    }, function(e, n) {
        0 !== n ? n < 32 ? t.xm.tempo = n : t.xm.bpm = n : console.log("tempo 0?")
    }, function(e, n) {
        t.xm.global_volume = n <= 64 ? Math.max(0, 2 * n) : t.max_global_volume
    }, function(e, n) {
        n && (t.xm.global_volumeslide = 2 * ((n >> 4) - (15 & n)))
    }, l, l, l, l, l, l, l, l, l, function(e, t) {
        switch (15 & t && (e.retrig = (240 & e.retrig) + (15 & t)), 240 & t && (e.retrig = (15 & e.retrig) + (240 & t)), e.retrig >> 4) {
            case 1:
                e.vol -= 1;
                break;
            case 2:
                e.vol -= 2;
                break;
            case 3:
                e.vol -= 4;
                break;
            case 4:
                e.vol -= 8;
                break;
            case 5:
                e.vol -= 16;
                break;
            case 6:
                e.vol *= 2, e.vol /= 3;
                break;
            case 7:
                e.vol /= 2;
                break;
            case 9:
                e.vol += 1;
                break;
            case 10:
                e.vol += 2;
                break;
            case 11:
                e.vol += 4;
                break;
            case 12:
                e.vol += 8;
                break;
            case 13:
                e.vol += 16;
                break;
            case 14:
                e.vol *= 3, e.vol /= 2;
                break;
            case 15:
                e.vol *= 2
        }
        e.vol = Math.min(64, Math.max(0, e.vol))
    }, l, l, l, l, l, l, l, l], t.effects_t1 = [n, function(e) {
        void 0 !== e.slideupspeed && (e.period -= e.slideupspeed)
    }, function(e) {
        void 0 !== e.slidedownspeed && (e.period = Math.min(1728, e.period + e.slidedownspeed))
    }, o, a, function(e) {
        i(e), o(e)
    }, function(e) {
        i(e), a(e)
    }, s, null, null, i, null, null, null, function(e) {
        if (e.effectdata >> 4 == 12) t.cur_tick == (15 & e.effectdata) && (e.vol = 0)
    }, null, null, function(e) {
        void 0 !== t.xm.global_volumeslide && (t.xm.global_volume = Math.max(0, Math.min(t.max_global_volume, t.xm.global_volume + t.xm.global_volumeslide)))
    }, s, s, s, s, s, s, s, s, s, function(e) {
        t.cur_tick % (15 & e.retrig) == 0 && (e.off = 0)
    }, s, s, s, s, s, s, s, s]
}(window),
function(e) {
    e.XMPlayer || (e.XMPlayer = {});
    var t = e.XMPlayer;
    e.XMView || (e.XMView = {});
    var n = e.XMView;
    t.periodForNote = f, t.prettify_effect = c, t.init = k, t.load = function(e) {
        var n = new DataView(e);
        t.xm = {}, t.xm.songname = u(n, 17, 20);
        var o = n.getUint32(60, !0) + 60,
            a = n.getUint16(64, !0);
        t.xm.song_looppos = n.getUint16(66, !0), t.xm.nchan = n.getUint16(68, !0);
        var r, i, s, c = n.getUint16(70, !0),
            p = n.getUint16(72, !0);
        for (t.xm.flags = n.getUint16(74, !0), t.xm.tempo = n.getUint16(76, !0), t.xm.bpm = n.getUint16(78, !0), t.xm.channelinfo = [], t.xm.global_volume = t.max_global_volume, r = 0; r < t.xm.nchan; r++) t.xm.channelinfo.push({
            number: r,
            filterstate: new Float32Array(3),
            vol: 0,
            pan: 128,
            period: 1152,
            vL: 0,
            vR: 0,
            vLprev: 0,
            vRprev: 0,
            mute: 0,
            volE: 0,
            panE: 0,
            retrig: 0,
            vibratopos: 0,
            vibratodepth: 1,
            vibratospeed: 1,
            vibratotype: 0
        });
        for (t.xm.nchan, t.xm.song_looppos, t.xm.flags, t.xm.tempo, t.xm.bpm, t.xm.songpats = [], r = 0; r < a; r++) t.xm.songpats.push(n.getUint8(80 + r));
        t.xm.songpats;
        var m = o;
        for (t.xm.patterns = [], r = 0; r < c; r++) {
            var f = [],
                d = (n.getUint32(m, !0), n.getUint16(m + 5, !0)),
                g = n.getUint16(m + 7, !0);
            for (m += 9, i = 0; g > 0 && i < d; i++) {
                for (row = [], s = 0; s < t.xm.nchan; s++) {
                    var h = n.getUint8(m);
                    m++;
                    var x = -1,
                        y = -1,
                        _ = -1,
                        k = 0,
                        M = 0;
                    128 & h ? (1 & h && (x = n.getUint8(m) - 1, m++), 2 & h && (y = n.getUint8(m), m++), 4 & h && (_ = n.getUint8(m), m++), 8 & h && (k = n.getUint8(m), m++), 16 & h && (M = n.getUint8(m), m++)) : (x = h - 1, y = n.getUint8(m), m++, _ = n.getUint8(m), m++, k = n.getUint8(m), m++, M = n.getUint8(m), m++);
                    var E = [x, y, _, k, M];
                    row.push(E)
                }
                f.push(row)
            }
            t.xm.patterns.push(f)
        }
        for (t.xm.instruments = [], r = 0; r < p; r++) {
            var U = n.getUint32(m, !0),
                I = u(n, m + 4, 22),
                L = n.getUint16(m + 27, !0);
            if (y = {
                    name: I,
                    number: r
                }, L > 0) {
                var T = new Uint8Array(e, m + 33, 96),
                    N = n.getUint8(m + 225),
                    S = n.getUint8(m + 233),
                    B = n.getUint8(m + 227),
                    A = n.getUint8(m + 228),
                    P = n.getUint8(m + 229),
                    C = n.getUint8(m + 226),
                    F = n.getUint8(m + 234),
                    X = n.getUint8(m + 230),
                    D = n.getUint8(m + 231),
                    R = n.getUint8(m + 232),
                    q = n.getUint16(m + 239, !0),
                    O = [];
                for (i = 0; i < 2 * N; i++) O.push(n.getUint16(m + 129 + 2 * i, !0));
                var H = [];
                for (i = 0; i < 2 * C; i++) H.push(n.getUint16(m + 177 + 2 * i, !0));
                var j = n.getUint32(m + 29, !0);
                (r + 1).toString(16), m += U;
                var G = 0,
                    W = [];
                for (i = 0; i < L; i++) {
                    var z = n.getUint32(m, !0),
                        V = n.getUint32(m + 4, !0),
                        Y = n.getUint32(m + 8, !0),
                        $ = n.getUint8(m + 12),
                        J = n.getInt8(m + 13),
                        K = n.getUint8(m + 14),
                        Z = n.getUint8(m + 15),
                        Q = n.getInt8(m + 16),
                        ee = (u(n, m + 18, 22), G);
                    0 === Y && (K &= -4), ee.toString(16), l(Q + 48);
                    var te = {
                        len: z,
                        loop: V,
                        looplen: Y,
                        note: Q,
                        fine: J,
                        pan: Z,
                        type: K,
                        vol: $,
                        fileoffset: ee
                    };
                    W.push(te), m += j, G += z
                }
                for (i = 0; i < L; i++) {
                    (te = W[i]).sampledata = w(new Uint8Array(e, m + te.fileoffset, te.len), 16 & te.type), 16 & te.type && (te.len /= 2, te.loop /= 2, te.looplen /= 2), 3 & te.type && (te.looplen < 2048 || 2 & te.type) && b(te)
                }
                if (m += G, y.samplemap = T, y.samples = W, S) {
                    var ne = O[O.length - 2];
                    if (2 & S || (B = O.length / 2), q > 0) {
                        var oe = 65536 / q;
                        O.push(ne + oe), O.push(0)
                    }
                    y.env_vol = new v(O, S, B, A, P)
                } else y.env_vol = new v([0, 64, 1, 0], 2, 0, 0, 0);
                F ? (2 & F || (X = H.length / 2), y.env_pan = new v(H, F, X, D, R)) : y.env_pan = new v([0, 32], 0, 0, 0, 0)
            } else m += U;
            t.xm.instruments.push(y)
        }
        return t.xm.songname, !0
    }, t.play = function() {
        if (!t.playing) {
            n.resume && n.resume(), o.connect(a);
            var e = t.audioctx.createOscillator();
            e.connect(t.audioctx.destination), e.start ? e.start(0) : e.noteOn(0), e.stop ? e.stop(0) : e.noteOff(0), e.disconnect()
        }
        t.playing = !0
    }, t.pause = function() {
        t.playing && (o.disconnect(a), n.pause && n.pause());
        t.playing = !1
    }, t.stop = function() {
        t.playing && (o.disconnect(a), t.playing = !1);
        t.cur_pat = -1, t.cur_row = 64, t.cur_songpos = -1, t.cur_ticksamp = 0, t.xm.global_volume = t.max_global_volume, n.stop && n.stop();
        k()
    }, t.cur_songpos = -1, t.cur_pat = -1, t.cur_row = 64, t.cur_ticksamp = 0, t.cur_tick = 6, t.xm = {}, t.xm.global_volume = t.max_global_volume = 128, t.nextTick = h, t.nextRow = d, t.Envelope = v;
    var o, a, r = ["C-", "C#", "D-", "D#", "E-", "F-", "F#", "G-", "G#", "A-", "A#", "B-"],
        i = 44100,
        s = .9837;

    function l(e) {
        return e < 0 ? "---" : 96 == e ? "^^^" : r[e % 12] + ~~(e / 12)
    }

    function c(e, t) {
        return e >= 10 && (e = String.fromCharCode(55 + e)), e + (t = t < 16 ? "0" + t.toString(16) : t.toString(16))
    }

    function p(e) {
        return l(e[0]) + " " + ((-1 == (t = e[1]) ? "--" : t < 10 ? "0" + t : t) + " ") + function(e) {
            return e < 16 ? "--" : e.toString(16)
        }(e[2]) + " " + c(e[3], e[4]);
        var t
    }

    function u(e, t, n) {
        for (var o = [], a = t; a < t + n; a++) {
            var r = e.getUint8(a);
            if (0 === r) break;
            o.push(String.fromCharCode(r))
        }
        return o.join("")
    }

    function m(e, t) {
        var n = 8363 * Math.pow(2, (1152 - t) / 192);
        isNaN(n) || (e.doff = n / i, e.filter = function(e) {
            e > .5 && (e = .5);
            var t = Math.sqrt(2) * Math.PI * e,
                n = Math.exp(-t),
                o = n * Math.cos(t);
            return [(1 - 2 * o + n * n) / 2, 2 * o, -n * n]
        }(e.doff / 2))
    }

    function f(e, t) {
        return 1920 - 16 * (t + e.samp.note) - e.fine / 8
    }

    function d() {
        void 0 === t.next_row && (t.next_row = t.cur_row + 1), t.cur_row = t.next_row, t.next_row++, (-1 == t.cur_pat || t.cur_row >= t.xm.patterns[t.cur_pat].length) && (t.cur_row = 0, t.next_row = 1, t.cur_songpos++, t.cur_songpos >= t.xm.songpats.length && (t.cur_songpos = t.xm.song_looppos), function() {
            for (var e = t.xm.songpats[t.cur_songpos]; e >= t.xm.patterns.length;) t.cur_songpos + 1 < t.xm.songpats.length ? t.cur_songpos++ : t.cur_songpos === t.xm.song_looppos && 0 !== t.cur_songpos || t.xm.song_looppos >= t.xm.songpats.length ? t.cur_songpos = 0 : t.cur_songpos = t.xm.song_looppos, e = t.xm.songpats[t.cur_songpos];
            t.cur_pat = e
        }());
        for (var e = t.xm.patterns[t.cur_pat][t.cur_row], n = 0; n < e.length; n++) {
            var o = t.xm.channelinfo[n],
                a = o.inst,
                r = !1;
            if (-1 != e[n][1] && (a = t.xm.instruments[e[n][1] - 1]) && a.samplemap && (o.inst = a, r = !0, o.note && a.samplemap && (o.samp = a.samples[a.samplemap[o.note]], o.vol = o.samp.vol, o.pan = o.samp.pan, o.fine = o.samp.fine)), -1 != e[n][0])
                if (96 == e[n][0]) o.release = 1, r = !1;
                else if (a && a.samplemap) {
                var i = e[n][0];
                o.note = i, o.samp = a.samples[a.samplemap[o.note]], r && (o.pan = o.samp.pan, o.vol = o.samp.vol, o.fine = o.samp.fine), r = !0
            }
            if (o.voleffectfn = void 0, -1 != e[n][2]) {
                var s = e[n][2];
                o.voleffectdata = 15 & s, s < 16 ? s.toString(16) : s <= 80 ? o.vol = s - 16 : s >= 96 && s < 112 ? o.voleffectfn = function(e) {
                    e.vol = Math.max(0, e.vol - e.voleffectdata)
                } : s >= 112 && s < 128 ? o.voleffectfn = function(e) {
                    e.vol = Math.min(64, e.vol + e.voleffectdata)
                } : s >= 128 && s < 144 ? o.vol = Math.max(0, o.vol - (15 & s)) : s >= 144 && s < 160 ? o.vol = Math.min(64, o.vol + (15 & s)) : s >= 160 && s < 176 ? o.vibratospeed = 15 & s : s >= 176 && s < 192 ? (o.vibratodepth = 15 & s, o.voleffectfn = t.effects_t1[4], t.effects_t1[4](o)) : s >= 192 && s < 208 ? o.pan = 17 * (15 & s) : s >= 240 && s <= 255 ? (15 & s && (o.portaspeed = (15 & s) << 4), o.voleffectfn = t.effects_t1[3]) : s.toString(16)
            }
            if (o.effect = e[n][3], o.effectdata = e[n][4], o.effect < 36) {
                o.effectfn = t.effects_t1[o.effect];
                var l = t.effects_t0[o.effect];
                l && l(o, o.effectdata) && (r = !1)
            } else o.effect;
            (3 == o.effect || 5 == o.effect || e[n][2] >= 240) && (-1 != e[n][0] && (o.periodtarget = f(o, o.note)), r = !1, a && a.samplemap && (null == o.env_vol ? r = !0 : o.release && (o.envtick = 0, o.release = 0, o.env_vol = new g(a.env_vol), o.env_pan = new g(a.env_pan)))), r && (9 != o.effect && (o.off = 0), o.release = 0, o.envtick = 0, o.env_vol = new g(a.env_vol), o.env_pan = new g(a.env_pan), o.note && (o.period = f(o, o.note)), o.vibratotype < 4 && (o.vibratopos = 0))
        }
    }

    function v(e, t, n, o, a) {
        this.points = e, this.type = t, this.sustain = n, this.loopstart = e[2 * o], this.loopend = e[2 * a]
    }

    function g(e) {
        this.env = e, this.tick = 0
    }

    function h() {
        var e, n;
        for (t.cur_tick++, e = 0; e < t.xm.nchan; e++)(n = t.xm.channelinfo[e]).periodoffset = 0;
        for (t.cur_tick >= t.xm.tempo && (t.cur_tick = 0, d()), e = 0; e < t.xm.nchan; e++) {
            var o = (n = t.xm.channelinfo[e]).inst;
            0 !== t.cur_tick && (n.voleffectfn && n.voleffectfn(n), n.effectfn && n.effectfn(n)), isNaN(n.period) && p(t.xm.patterns[t.cur_pat][t.cur_row][e]), void 0 !== o && (void 0 !== n.env_vol ? (n.volE = n.env_vol.Tick(n.release), n.panE = n.env_pan.Tick(n.release), m(n, n.period + n.periodoffset)) : p(t.xm.patterns[t.cur_pat][t.cur_row][e]))
        }
    }

    function x(e, t, n, o, a) {
        var r = e.filterstate[1];
        if (isNaN(r)) return e.filterstate, void e.filter;
        for (var i = t; i < n; i++) {
            if (Math.abs(r) < 1526e-8) {
                r = 0;
                break
            }
            o[i] += r * e.vL, a[i] += r * e.vR, r *= s
        }
        return e.filterstate[1] = r, e.filterstate[2] = r, isNaN(r) ? (e.filterstate, void e.filter) : 0
    }

    function y(e, n, o, a, r) {
        var i = e.inst,
            l = e.samp,
            c = !1,
            p = 0,
            u = 0;
        if (null == l || null == i || e.mute) return x(e, n, o, a, r);
        var m = l.sampledata,
            f = l.len;
        1 == (3 & l.type) && l.looplen > 0 && (c = !0, f = (u = l.loop) + (p = l.looplen));
        l.len;
        var d = e.volE / 64,
            v = 4 * (e.panE - 32),
            g = v + e.pan - 128,
            h = t.xm.global_volume * d * (128 - g) * e.vol / 1048576,
            y = t.xm.global_volume * d * (128 + g) * e.vol / 1048576;
        if (h < 0 && (h = 0), y < 0 && (y = 0), 0 !== y || 0 !== h) {
            if (isNaN(y) || isNaN(h)) return e.number, void e.vol;
            var _ = e.off,
                w = e.doff,
                b = 0,
                k = e.filter[0],
                M = e.filter[1],
                E = e.filter[2],
                U = e.filterstate[0],
                I = e.filterstate[1],
                L = e.filterstate[2],
                T = s * e.vL + (1 - s) * (h + e.vLprev) * .5,
                N = s * e.vR + (1 - s) * (y + e.vRprev) * .5,
                S = Math.pow(s, 8);
            e.vLprev = h, e.vRprev = y;
            for (var B = n, A = 100; B < o;) {
                if (0 == A--) {
                    e.number;
                    break
                }
                if (_ >= f) {
                    if (!c) return e.inst = void 0, b + x(e, B, o, a, r);
                    _ = u + (_ - u) % p
                }
                for (var P, C, F = Math.max(1, Math.min(o, B + (f - _) / w)); B + 7 < F; B += 8) C = k * ((P = m[0 | _]) + U) + M * I + E * L, L = I, I = C, U = P, _ += w, a[B] += T * C, r[B] += N * C, b += (T + N) * C * C, C = k * ((P = m[0 | _]) + U) + M * I + E * L, L = I, I = C, U = P, _ += w, a[B + 1] += T * C, r[B + 1] += N * C, b += (T + N) * C * C, C = k * ((P = m[0 | _]) + U) + M * I + E * L, L = I, I = C, U = P, _ += w, a[B + 2] += T * C, r[B + 2] += N * C, b += (T + N) * C * C, C = k * ((P = m[0 | _]) + U) + M * I + E * L, L = I, I = C, U = P, _ += w, a[B + 3] += T * C, r[B + 3] += N * C, b += (T + N) * C * C, C = k * ((P = m[0 | _]) + U) + M * I + E * L, L = I, I = C, U = P, _ += w, a[B + 4] += T * C, r[B + 4] += N * C, b += (T + N) * C * C, C = k * ((P = m[0 | _]) + U) + M * I + E * L, L = I, I = C, U = P, _ += w, a[B + 5] += T * C, r[B + 5] += N * C, b += (T + N) * C * C, C = k * ((P = m[0 | _]) + U) + M * I + E * L, L = I, I = C, U = P, _ += w, a[B + 6] += T * C, r[B + 6] += N * C, b += (T + N) * C * C, C = k * ((P = m[0 | _]) + U) + M * I + E * L, L = I, I = C, U = P, _ += w, a[B + 7] += T * C, r[B + 7] += N * C, b += (T + N) * C * C, T = S * T + (1 - S) * h, N = S * N + (1 - S) * y;
                for (; B < F; B++) C = k * ((P = m[0 | _]) + U) + M * I + E * L, L = I, I = C, U = P, a[B] += T * C, r[B] += N * C, b += (T + N) * C * C, _ += w
            }
            return e.off = _, e.filterstate[0] = U, e.filterstate[1] = I, e.filterstate[2] = L, e.vL = T, e.vR = N, .5 * b
        }
    }

    function _(e) {
        i = t.audioctx.sampleRate;
        var o, a, r, s = e.outputBuffer.length,
            l = e.outputBuffer.getChannelData(0),
            c = e.outputBuffer.getChannelData(1);
        for (o = 0; o < s; o++) l[o] = 0, c[o] = 0;
        for (var p = 0, u = 0 | 2.5 * i / t.xm.bpm, m = n.scope_width; s > 0;) {
            (-1 == t.cur_pat || t.cur_ticksamp >= u) && (h(), t.cur_ticksamp -= u);
            var f = Math.min(s, u - t.cur_ticksamp),
                d = new Float32Array(t.xm.nchan),
                v = void 0;
            for (a = 0; a < t.xm.nchan; a++) {
                var g;
                if (f >= 4 * m)
                    for (g = new Float32Array(m), r = 0; r < m; r++) g[r] = -l[p + 4 * r] - c[p + 4 * r];
                if (d[a] = y(t.xm.channelinfo[a], p, p + f, l, c) / f, f >= 4 * m) {
                    for (r = 0; r < m; r++) g[r] += l[p + 4 * r] + c[p + 4 * r];
                    void 0 === v && (v = []), v.push(g)
                }
            }
            n.pushEvent && n.pushEvent({
                t: e.playbackTime + (0 + p) / i,
                vu: d,
                scopes: v,
                songpos: t.cur_songpos,
                pat: t.cur_pat,
                row: t.cur_row
            }), p += f, t.cur_ticksamp += f, s -= f
        }
    }

    function w(e, t) {
        var n, o, a, r = e.length,
            i = 0;
        if (0 === t) {
            for (n = new Float32Array(r), a = 0; a < r; a++) 128 & (o = 255 & (i += e[a])) && (o -= 256), n[a] = o / 128;
            return n
        }
        for (r /= 2, n = new Float32Array(r), a = 0; a < r; a++) 32768 & (o = e[2 * a] + (e[2 * a + 1] << 8)) && (o -= 65536), i = Math.max(-1, Math.min(1, i + o / 32768)), n[a] = i;
        return n
    }

    function b(e) {
        var t = (2048 + e.looplen - 1) / e.looplen | 0,
            n = 2 & e.type;
        n && (t = t + 1 & -2);
        for (var o = e.loop + t * e.looplen, a = new Float32Array(o), r = 0; r < e.loop; r++) a[r] = e.sampledata[r];
        for (var i = 0; i < t; i++) {
            var s;
            if (1 & i && n)
                for (s = e.looplen - 1; s >= 0; s--) a[r++] = e.sampledata[e.loop + s];
            else
                for (s = 0; s < e.looplen; s++) a[r++] = e.sampledata[e.loop + s]
        }
        e.looplen, e.sampledata = a, e.looplen = t * e.looplen, e.type = 1
    }

    function k() {
        if (!t.audioctx) {
            var n = e.AudioContext || e.webkitAudioContext;
            t.audioctx = new n, (a = t.audioctx.createGain()).gain.value = .01
        }(o = void 0 === t.audioctx.createScriptProcessor ? t.audioctx.createJavaScriptNode(16384, 0, 2) : t.audioctx.createScriptProcessor(16384, 0, 2)).onaudioprocess = _, a.connect(t.audioctx.destination)
    }
    v.prototype.Get = function(e) {
        for (var t, n = this.points, o = 0; o < n.length; o += 2)
            if (t = n[o + 1], e < n[o]) {
                var a = n[o - 2];
                t = n[o - 1];
                var r = n[o] - a;
                return t + (e - a) * (n[o + 1] - t) / r
            }
        return t
    }, g.prototype.Tick = function(e) {
        var t = this.env.Get(this.tick);
        return !e && this.tick >= this.env.points[2 * this.env.sustain] ? this.env.points[2 * this.env.sustain + 1] : (this.tick++, 4 & this.env.type && !e && this.tick >= this.env.loopend && (this.tick -= this.env.loopend - this.env.loopstart), t)
    }, t.playing = !1
}(window))