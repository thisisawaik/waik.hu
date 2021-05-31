!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.Twitch = t())
    : (e.Twitch = t());
})(self, function () {
  return (function () {
    "use strict";
    var e = {
        729: function (e) {
          var t = Object.prototype.hasOwnProperty,
            n = "~";
          function r() {}
          function o(e, t, n) {
            (this.fn = e), (this.context = t), (this.once = n || !1);
          }
          function i(e, t, r, i, a) {
            if ("function" != typeof r)
              throw new TypeError("The listener must be a function");
            var s = new o(r, i || e, a),
              l = n ? n + t : t;
            return (
              e._events[l]
                ? e._events[l].fn
                  ? (e._events[l] = [e._events[l], s])
                  : e._events[l].push(s)
                : ((e._events[l] = s), e._eventsCount++),
              e
            );
          }
          function a(e, t) {
            0 == --e._eventsCount ? (e._events = new r()) : delete e._events[t];
          }
          function s() {
            (this._events = new r()), (this._eventsCount = 0);
          }
          Object.create &&
            ((r.prototype = Object.create(null)),
            new r().__proto__ || (n = !1)),
            (s.prototype.eventNames = function () {
              var e,
                r,
                o = [];
              if (0 === this._eventsCount) return o;
              for (r in (e = this._events))
                t.call(e, r) && o.push(n ? r.slice(1) : r);
              return Object.getOwnPropertySymbols
                ? o.concat(Object.getOwnPropertySymbols(e))
                : o;
            }),
            (s.prototype.listeners = function (e) {
              var t = n ? n + e : e,
                r = this._events[t];
              if (!r) return [];
              if (r.fn) return [r.fn];
              for (var o = 0, i = r.length, a = new Array(i); o < i; o++)
                a[o] = r[o].fn;
              return a;
            }),
            (s.prototype.listenerCount = function (e) {
              var t = n ? n + e : e,
                r = this._events[t];
              return r ? (r.fn ? 1 : r.length) : 0;
            }),
            (s.prototype.emit = function (e, t, r, o, i, a) {
              var s = n ? n + e : e;
              if (!this._events[s]) return !1;
              var l,
                u,
                c = this._events[s],
                p = arguments.length;
              if (c.fn) {
                switch (
                  (c.once && this.removeListener(e, c.fn, void 0, !0), p)
                ) {
                  case 1:
                    return c.fn.call(c.context), !0;
                  case 2:
                    return c.fn.call(c.context, t), !0;
                  case 3:
                    return c.fn.call(c.context, t, r), !0;
                  case 4:
                    return c.fn.call(c.context, t, r, o), !0;
                  case 5:
                    return c.fn.call(c.context, t, r, o, i), !0;
                  case 6:
                    return c.fn.call(c.context, t, r, o, i, a), !0;
                }
                for (u = 1, l = new Array(p - 1); u < p; u++)
                  l[u - 1] = arguments[u];
                c.fn.apply(c.context, l);
              } else {
                var d,
                  f = c.length;
                for (u = 0; u < f; u++)
                  switch (
                    (c[u].once && this.removeListener(e, c[u].fn, void 0, !0),
                    p)
                  ) {
                    case 1:
                      c[u].fn.call(c[u].context);
                      break;
                    case 2:
                      c[u].fn.call(c[u].context, t);
                      break;
                    case 3:
                      c[u].fn.call(c[u].context, t, r);
                      break;
                    case 4:
                      c[u].fn.call(c[u].context, t, r, o);
                      break;
                    default:
                      if (!l)
                        for (d = 1, l = new Array(p - 1); d < p; d++)
                          l[d - 1] = arguments[d];
                      c[u].fn.apply(c[u].context, l);
                  }
              }
              return !0;
            }),
            (s.prototype.on = function (e, t, n) {
              return i(this, e, t, n, !1);
            }),
            (s.prototype.once = function (e, t, n) {
              return i(this, e, t, n, !0);
            }),
            (s.prototype.removeListener = function (e, t, r, o) {
              var i = n ? n + e : e;
              if (!this._events[i]) return this;
              if (!t) return a(this, i), this;
              var s = this._events[i];
              if (s.fn)
                s.fn !== t ||
                  (o && !s.once) ||
                  (r && s.context !== r) ||
                  a(this, i);
              else {
                for (var l = 0, u = [], c = s.length; l < c; l++)
                  (s[l].fn !== t ||
                    (o && !s[l].once) ||
                    (r && s[l].context !== r)) &&
                    u.push(s[l]);
                u.length
                  ? (this._events[i] = 1 === u.length ? u[0] : u)
                  : a(this, i);
              }
              return this;
            }),
            (s.prototype.removeAllListeners = function (e) {
              var t;
              return (
                e
                  ? ((t = n ? n + e : e), this._events[t] && a(this, t))
                  : ((this._events = new r()), (this._eventsCount = 0)),
                this
              );
            }),
            (s.prototype.off = s.prototype.removeListener),
            (s.prototype.addListener = s.prototype.on),
            (s.prefixed = n),
            (s.EventEmitter = s),
            (e.exports = s);
        },
        418: function (e) {
          /*
object-assign
(c) Sindre Sorhus
@license MIT
*/
          var t = Object.getOwnPropertySymbols,
            n = Object.prototype.hasOwnProperty,
            r = Object.prototype.propertyIsEnumerable;
          function o(e) {
            if (null == e)
              throw new TypeError(
                "Object.assign cannot be called with null or undefined"
              );
            return Object(e);
          }
          e.exports = (function () {
            try {
              if (!Object.assign) return !1;
              var e = new String("abc");
              if (((e[5] = "de"), "5" === Object.getOwnPropertyNames(e)[0]))
                return !1;
              for (var t = {}, n = 0; n < 10; n++)
                t["_" + String.fromCharCode(n)] = n;
              if (
                "0123456789" !==
                Object.getOwnPropertyNames(t)
                  .map(function (e) {
                    return t[e];
                  })
                  .join("")
              )
                return !1;
              var r = {};
              return (
                "abcdefghijklmnopqrst".split("").forEach(function (e) {
                  r[e] = e;
                }),
                "abcdefghijklmnopqrst" ===
                  Object.keys(Object.assign({}, r)).join("")
              );
            } catch (e) {
              return !1;
            }
          })()
            ? Object.assign
            : function (e, i) {
                for (var a, s, l = o(e), u = 1; u < arguments.length; u++) {
                  for (var c in (a = Object(arguments[u])))
                    n.call(a, c) && (l[c] = a[c]);
                  if (t) {
                    s = t(a);
                    for (var p = 0; p < s.length; p++)
                      r.call(a, s[p]) && (l[s[p]] = a[s[p]]);
                  }
                }
                return l;
              };
        },
        563: function (e, t, n) {
          var r = n(610),
            o = n(418);
          function i(e, t) {
            return t.encode ? (t.strict ? r(e) : encodeURIComponent(e)) : e;
          }
          function a(e) {
            return Array.isArray(e)
              ? e.sort()
              : "object" == typeof e
              ? a(Object.keys(e))
                  .sort(function (e, t) {
                    return Number(e) - Number(t);
                  })
                  .map(function (t) {
                    return e[t];
                  })
              : e;
          }
          t.Pz = function (e, t) {
            var n = (function (e) {
              switch (e.arrayFormat) {
                case "index":
                  return function (t, n, r) {
                    return null === n
                      ? [i(t, e), "[", r, "]"].join("")
                      : [i(t, e), "[", i(r, e), "]=", i(n, e)].join("");
                  };
                case "bracket":
                  return function (t, n) {
                    return null === n
                      ? i(t, e)
                      : [i(t, e), "[]=", i(n, e)].join("");
                  };
                default:
                  return function (t, n) {
                    return null === n
                      ? i(t, e)
                      : [i(t, e), "=", i(n, e)].join("");
                  };
              }
            })((t = o({ encode: !0, strict: !0, arrayFormat: "none" }, t)));
            return e
              ? Object.keys(e)
                  .sort()
                  .map(function (r) {
                    var o = e[r];
                    if (void 0 === o) return "";
                    if (null === o) return i(r, t);
                    if (Array.isArray(o)) {
                      var a = [];
                      return (
                        o.slice().forEach(function (e) {
                          void 0 !== e && a.push(n(r, e, a.length));
                        }),
                        a.join("&")
                      );
                    }
                    return i(r, t) + "=" + i(o, t);
                  })
                  .filter(function (e) {
                    return e.length > 0;
                  })
                  .join("&")
              : "";
          };
        },
        610: function (e) {
          e.exports = function (e) {
            return encodeURIComponent(e).replace(/[!'()*]/g, function (e) {
              return "%" + e.charCodeAt(0).toString(16).toUpperCase();
            });
          };
        },
      },
      t = {};
    function n(r) {
      var o = t[r];
      if (void 0 !== o) return o.exports;
      var i = (t[r] = { exports: {} });
      return e[r](i, i.exports, n), i.exports;
    }
    (n.d = function (e, t) {
      for (var r in t)
        n.o(t, r) &&
          !n.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
      (n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      });
    var r = {};
    return (
      (function () {
        n.d(r, {
          default: function () {
            return C;
          },
        });
        /*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
        var e = function (t, n) {
          return (e =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
            })(t, n);
        };
        function t(t, n) {
          function r() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((r.prototype = n.prototype), new r()));
        }
        var o = function () {
          return (o =
            Object.assign ||
            function (e) {
              for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var o in (t = arguments[n]))
                  Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
              return e;
            }).apply(this, arguments);
        };
        var i,
          a,
          s,
          l,
          u = n(729),
          c = "twitch-embed-player-proxy";
        !(function (e) {
          e.UpdateState = "UPDATE_STATE";
        })(i || (i = {})),
          (function (e) {
            (e.VideoWithChat = "video-with-chat"), (e.Video = "video");
          })(a || (a = {})),
          (function (e) {
            (e.AUTHENTICATE = "authenticate"),
              (e.VIDEO_READY = "video.ready"),
              (e.VIDEO_PLAY = "video.play"),
              (e.VIDEO_PAUSE = "video.pause"),
              (e.CAPTIONS = "captions"),
              (e.ENDED = "ended"),
              (e.ERROR = "error"),
              (e.ONLINE = "online"),
              (e.OFFLINE = "offline"),
              (e.PAUSE = "pause"),
              (e.PLAY = "play"),
              (e.PLAYBACK_BLOCKED = "playbackBlocked"),
              (e.PLAYING = "playing"),
              (e.READY = "ready");
          })(s || (s = {})),
          (function (e) {
            (e[(e.DisableCaptions = 0)] = "DisableCaptions"),
              (e[(e.EnableCaptions = 1)] = "EnableCaptions"),
              (e[(e.Pause = 2)] = "Pause"),
              (e[(e.Play = 3)] = "Play"),
              (e[(e.Seek = 4)] = "Seek"),
              (e[(e.SetChannel = 5)] = "SetChannel"),
              (e[(e.SetChannelID = 6)] = "SetChannelID"),
              (e[(e.SetCollection = 7)] = "SetCollection"),
              (e[(e.SetQuality = 8)] = "SetQuality"),
              (e[(e.SetVideo = 9)] = "SetVideo"),
              (e[(e.SetMuted = 10)] = "SetMuted"),
              (e[(e.SetVolume = 11)] = "SetVolume");
          })(l || (l = {}));
        var p,
          d,
          f = function () {};
        !(function (e) {
          (e[(e.GeoBlocked = 1)] = "GeoBlocked"),
            (e[(e.UnsupportedDevice = 2)] = "UnsupportedDevice"),
            (e[(e.AnonymizerBlocked = 3)] = "AnonymizerBlocked"),
            (e[(e.CellularNetworkProhibited = 4)] =
              "CellularNetworkProhibited"),
            (e[(e.UnauthorizationEntitlements = 5)] =
              "UnauthorizationEntitlements"),
            (e[(e.VodRestricted = 6)] = "VodRestricted"),
            (e[(e.LVSCCUCap = 509)] = "LVSCCUCap"),
            (e[(e.Aborted = 1e3)] = "Aborted"),
            (e[(e.Network = 2e3)] = "Network"),
            (e[(e.CCUCapReached = 2001)] = "CCUCapReached"),
            (e[(e.Decode = 3e3)] = "Decode"),
            (e[(e.FormatNotSupported = 4e3)] = "FormatNotSupported"),
            (e[(e.ContentNotAvailable = 5e3)] = "ContentNotAvailable"),
            (e[(e.RendererNotAvailable = 6e3)] = "RendererNotAvailable"),
            (e[(e.SafariUnsupportedDevice = 7004)] = "SafariUnsupportedDevice"),
            (e[(e.Fatal = 8001)] = "Fatal"),
            (e[(e.FatalAuth = 8003)] = "FatalAuth"),
            (e[(e.Offline = 8002)] = "Offline"),
            (e[(e.WarnAuth = 8004)] = "WarnAuth");
        })(p || (p = {})),
          (function (e) {
            (e.PREMIUM_CONTENT_RESTRICTED = "PREMIUM_CONTENT"),
              (e.VOD_RESTRICTED = "vod_manifest_restricted");
          })(d || (d = {}));
        var y = (function (e) {
            function n(t) {
              var n = this.constructor,
                r = e.call(this, t) || this;
              return (
                Object.setPrototypeOf(r, n.prototype),
                (r.name = "MissingParameterError"),
                r
              );
            }
            return t(n, e), n;
          })(Error),
          h = (function (e) {
            function n(t) {
              var n = this.constructor,
                r =
                  e.call(this, "Could not find the provided element: " + t) ||
                  this;
              return (
                Object.setPrototypeOf(r, n.prototype),
                (r.name = "MissingElementError"),
                r
              );
            }
            return t(n, e), n;
          })(Error),
          m = n(563);
        var v;
        function g(e, t) {
          var n =
              "https://" +
              t +
              ".twitch.tv" +
              "?" +
              m.Pz(
                o(o({}, e), {
                  parent: b(e.parent),
                  referrer: document.location.href,
                })
              ),
            r = document.createElement("iframe");
          r.setAttribute("src", n),
            r.setAttribute("allowfullscreen", ""),
            r.setAttribute("scrolling", "no"),
            r.setAttribute("frameborder", "0"),
            r.setAttribute("allow", "autoplay; fullscreen"),
            r.setAttribute("title", "Twitch");
          var i =
            "allow-modals allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox";
          return (
            "function" == typeof document.hasStorageAccess &&
              "function" == typeof document.requestStorageAccess &&
              (i += " allow-storage-access-by-user-activation"),
            r.setAttribute("sandbox", i),
            e.width && r.setAttribute("width", String(e.width)),
            e.height && r.setAttribute("height", String(e.height)),
            r
          );
        }
        function b(e) {
          var t = document.domain;
          if (!e) return [t];
          var n = Array.isArray(e) ? e : [e];
          return t && -1 === n.indexOf(t) ? n.concat(t) : n;
        }
        !(function (e) {
          (e.IDLE = "Idle"),
            (e.READY = "Ready"),
            (e.BUFFERING = "Buffering"),
            (e.PLAYING = "Playing"),
            (e.ENDED = "Ended");
        })(v || (v = {}));
        var _ = {
            channelName: "",
            channelID: "",
            collectionID: "",
            currentTime: 0,
            duration: 0,
            muted: !1,
            playback: v.IDLE,
            quality: "",
            qualitiesAvailable: [],
            stats: {
              videoStats: {
                backendVersion: "",
                bufferSize: 0,
                codecs: "",
                displayResolution: "",
                fps: 0,
                hlsLatencyBroadcaster: 0,
                latencyMode: "",
                playbackRate: 0,
                skippedFrames: 0,
                videoResolution: "",
              },
            },
            videoID: "",
            volume: 0,
            ended: !1,
          },
          E = (function (e) {
            function n() {
              var t = e.call(this) || this;
              return (
                (t._embedWindow = null),
                (t._playerState = _),
                window.addEventListener("message", t._handleResponses.bind(t)),
                t
              );
            }
            return (
              t(n, e),
              (n.prototype._setWindowRef = function (e) {
                this._embedWindow = e;
              }),
              (n.prototype.disableCaptions = function () {
                this._sendCommand(l.DisableCaptions, null);
              }),
              (n.prototype.enableCaptions = function () {
                this._sendCommand(l.EnableCaptions, null);
              }),
              (n.prototype.pause = function () {
                this._sendCommand(l.Pause, null);
              }),
              (n.prototype.play = function () {
                this._sendCommand(l.Play, null);
              }),
              (n.prototype.seek = function (e) {
                this._sendCommand(l.Seek, e);
              }),
              (n.prototype.setChannel = function (e) {
                this._sendCommand(l.SetChannel, e);
              }),
              (n.prototype.setChannelId = function (e) {
                this._sendCommand(l.SetChannelID, e);
              }),
              (n.prototype.setCollection = function (e, t) {
                this._sendCommand(l.SetCollection, [e, t]);
              }),
              (n.prototype.setQuality = function (e) {
                this._sendCommand(l.SetQuality, e);
              }),
              (n.prototype.setVideo = function (e) {
                this._sendCommand(l.SetVideo, e);
              }),
              (n.prototype.setMuted = function (e) {
                var t = "boolean" != typeof e || e;
                this._sendCommand(l.SetMuted, t);
              }),
              (n.prototype.setVolume = function (e) {
                this._sendCommand(l.SetVolume, e);
              }),
              (n.prototype.getMuted = function () {
                return this._playerState.muted;
              }),
              (n.prototype.getVolume = function () {
                return this._playerState.volume;
              }),
              (n.prototype.getChannel = function () {
                return this._playerState.channelName;
              }),
              (n.prototype.getChannelId = function () {
                return this._playerState.channelID;
              }),
              (n.prototype.getCollection = function () {
                return this._playerState.collectionID;
              }),
              (n.prototype.getCurrentTime = function () {
                return this._playerState.currentTime;
              }),
              (n.prototype.getDuration = function () {
                return this._playerState.duration;
              }),
              (n.prototype.getEnded = function () {
                return this._playerState.ended;
              }),
              (n.prototype.getPlaybackStats = function () {
                return this._playerState.stats.videoStats;
              }),
              (n.prototype.getQualities = function () {
                return this._playerState.qualitiesAvailable;
              }),
              (n.prototype.getQuality = function () {
                return this._playerState.quality;
              }),
              (n.prototype.getVideo = function () {
                return this._playerState.videoID;
              }),
              (n.prototype.isPaused = function () {
                return this._playerState.playback === v.IDLE;
              }),
              (n.prototype.getPlayerState = function () {
                return this._playerState;
              }),
              (n.prototype._sendCommand = function (e, t) {
                if (this._embedWindow) {
                  var n = { eventName: e, params: t, namespace: c };
                  this._embedWindow.postMessage(n, "*");
                } else
                  console.warn(
                    "Cannot send player commands before the video player is initialized.          Please wait for the VIDEO_READY event before using the player API."
                  );
              }),
              (n.prototype._handleResponses = function (e) {
                if (this._embedWindow) {
                  var t = e.data,
                    n = e.source === this._embedWindow,
                    r = t.namespace === c,
                    o = t.eventName === i.UpdateState;
                  n &&
                    r &&
                    o &&
                    (this._playerState = Object.assign(
                      {},
                      this._playerState,
                      t.params
                    ));
                }
              }),
              n
            );
          })(f),
          P = (function (e) {
            function n(t, n) {
              var r = e.call(this) || this;
              return (
                (r._options = {}),
                (r._target = null),
                (r._player = new E()),
                (r._eventEmitter = null),
                (r._iframe = null),
                (r._forwardEmbedEvents = function (e) {
                  if (r._iframe) {
                    var t = e.data,
                      n = e.source === r._iframe.contentWindow,
                      o = "twitch-embed" === t.namespace;
                    n && o && r._eventEmitter.emit(t.eventName, t.params);
                  }
                }),
                (r.disableCaptions = r
                  .getPlayer()
                  .disableCaptions.bind(r.getPlayer())),
                (r.enableCaptions = r
                  .getPlayer()
                  .enableCaptions.bind(r.getPlayer())),
                (r.pause = r.getPlayer().pause.bind(r.getPlayer())),
                (r.play = r.getPlayer().play.bind(r.getPlayer())),
                (r.seek = r.getPlayer().seek.bind(r.getPlayer())),
                (r.setChannel = r.getPlayer().setChannel.bind(r.getPlayer())),
                (r.setChannelId = r
                  .getPlayer()
                  .setChannelId.bind(r.getPlayer())),
                (r.setCollection = r
                  .getPlayer()
                  .setCollection.bind(r.getPlayer())),
                (r.setQuality = r.getPlayer().setQuality.bind(r.getPlayer())),
                (r.setVideo = r.getPlayer().setVideo.bind(r.getPlayer())),
                (r.setMuted = r.getPlayer().setMuted.bind(r.getPlayer())),
                (r.setVolume = r.getPlayer().setVolume.bind(r.getPlayer())),
                (r.getMuted = r.getPlayer().getMuted.bind(r.getPlayer())),
                (r.getVolume = r.getPlayer().getVolume.bind(r.getPlayer())),
                (r.getChannel = r.getPlayer().getChannel.bind(r.getPlayer())),
                (r.getChannelId = r
                  .getPlayer()
                  .getChannelId.bind(r.getPlayer())),
                (r.getCollection = r
                  .getPlayer()
                  .getCollection.bind(r.getPlayer())),
                (r.getCurrentTime = r
                  .getPlayer()
                  .getCurrentTime.bind(r.getPlayer())),
                (r.getDuration = r.getPlayer().getDuration.bind(r.getPlayer())),
                (r.getEnded = r.getPlayer().getEnded.bind(r.getPlayer())),
                (r.getPlaybackStats = r
                  .getPlayer()
                  .getPlaybackStats.bind(r.getPlayer())),
                (r.getPlayerState = r
                  .getPlayer()
                  .getPlayerState.bind(r.getPlayer())),
                (r.getQualities = r
                  .getPlayer()
                  .getQualities.bind(r.getPlayer())),
                (r.getQuality = r.getPlayer().getQuality.bind(r.getPlayer())),
                (r.getVideo = r.getPlayer().getVideo.bind(r.getPlayer())),
                (r.isPaused = r.getPlayer().isPaused.bind(r.getPlayer())),
                (function (e) {
                  var t =
                    (null == e ? void 0 : e.channelId) &&
                    (null == e ? void 0 : e.stream);
                  if (!e || (!e.channel && !e.video && !e.collection && !t))
                    throw new y(
                      "A channel, video, or collection id must be provided in options"
                    );
                })(n),
                (r._options = n),
                (r._target = (function (e) {
                  if (!e)
                    throw new y(
                      "An element of type String or Element is required"
                    );
                  var t = "string" == typeof e ? document.getElementById(e) : e;
                  if (!t) throw new h(e);
                  if (1 !== t.nodeType)
                    throw new y(
                      "An element of type String or Element is required"
                    );
                  return t;
                })(t)),
                (r._eventEmitter = new u()),
                r.render(),
                r
              );
            }
            return (
              t(n, e),
              (n.prototype.addEventListener = function (e, t) {
                this._eventEmitter && this._eventEmitter.on(e, t);
              }),
              (n.prototype.removeEventListener = function (e, t) {
                this._eventEmitter && this._eventEmitter.removeListener(e, t);
              }),
              (n.prototype.getPlayer = function () {
                return this._player;
              }),
              (n.prototype.destroy = function () {
                var e, t;
                this._eventEmitter && this._eventEmitter.removeAllListeners(),
                  window.removeEventListener(
                    "message",
                    this._forwardEmbedEvents
                  ),
                  null ===
                    (t =
                      null === (e = this._iframe) || void 0 === e
                        ? void 0
                        : e.parentNode) ||
                    void 0 === t ||
                    t.removeChild(this._iframe),
                  (this._eventEmitter = null),
                  this._player._setWindowRef(null),
                  (this._target = null),
                  (this._iframe = null);
              }),
              (n.prototype.buildIframe = function () {
                return g(this._options, "embed");
              }),
              (n.prototype.render = function () {
                if (this._target) {
                  var e = this.buildIframe();
                  this._target.appendChild(e),
                    (this._iframe = e),
                    window.addEventListener(
                      "message",
                      this._forwardEmbedEvents
                    ),
                    this._player._setWindowRef(this._iframe.contentWindow);
                }
              }),
              (n.AUTHENTICATE = s.AUTHENTICATE),
              (n.CAPTIONS = s.CAPTIONS),
              (n.ENDED = s.ENDED),
              (n.ERROR = s.ERROR),
              (n.OFFLINE = s.OFFLINE),
              (n.ONLINE = s.ONLINE),
              (n.PAUSE = s.PAUSE),
              (n.PLAY = s.PLAY),
              (n.PLAYBACK_BLOCKED = s.PLAYBACK_BLOCKED),
              (n.PLAYING = s.PLAYING),
              (n.VIDEO_PAUSE = s.VIDEO_PAUSE),
              (n.VIDEO_PLAY = s.VIDEO_PLAY),
              (n.VIDEO_READY = s.VIDEO_READY),
              (n.READY = s.READY),
              (n.Errors = o(
                {
                  ABORTED: p.Aborted,
                  NETWORK: p.Network,
                  DECODE: p.Decode,
                  FORMAT_NOT_SUPPORTED: p.FormatNotSupported,
                  CONTENT_NOT_AVAILABLE: p.ContentNotAvailable,
                  RENDERER_NOT_AVAILABLE: p.RendererNotAvailable,
                },
                p
              )),
              n
            );
          })(f);
        var C = {
          Embed: P,
          Player: (function (e) {
            function n(t, n) {
              return e.call(this, t, n) || this;
            }
            return (
              t(n, e),
              (n.prototype.buildIframe = function () {
                return g(this._options, "player");
              }),
              n
            );
          })(P),
        };
      })(),
      (r = r.default)
    );
  })();
});
