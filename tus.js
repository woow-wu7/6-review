!(function (e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define([], e)
    : (("undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : this
      ).tus = e());
})(function () {
  return (function n(o, i, u) {
    function a(t, e) {
      if (!i[t]) {
        if (!o[t]) {
          var r = "function" == typeof require && require;
          if (!e && r) return r(t, !0);
          if (s) return s(t, !0);
          throw (
            (((e = new Error("Cannot find module '" + t + "'")).code =
              "MODULE_NOT_FOUND"),
            e)
          );
        }
        (r = i[t] = { exports: {} }),
          o[t][0].call(
            r.exports,
            function (e) {
              return a(o[t][1][e] || e);
            },
            r,
            r.exports,
            n,
            o,
            i,
            u
          );
      }
      return i[t].exports;
    }
    for (
      var s = "function" == typeof require && require, e = 0;
      e < u.length;
      e++
    )
      a(u[e]);
    return a;
  })(
    {
      1: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", { value: !0 }),
            (r.default = void 0);
          var o = n(e("./isReactNative")),
            i = n(e("./uriToBlob")),
            u = n(e("./sources/FileSource")),
            a = n(e("./sources/StreamSource"));
          function n(e) {
            return e && e.__esModule ? e : { default: e };
          }
          function s(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          e = (function () {
            function e() {
              if (!(this instanceof e))
                throw new TypeError("Cannot call a class as a function");
            }
            var t, r, n;
            return (
              (t = e),
              (r = [
                {
                  key: "openFile",
                  value: function (e, t) {
                    return (0, o.default)() && e && void 0 !== e.uri
                      ? (0, i.default)(e.uri)
                          .then(function (e) {
                            return new u.default(e);
                          })
                          .catch(function (e) {
                            throw new Error(
                              "tus: cannot fetch `file.uri` as Blob, make sure the uri is correct and accessible. ".concat(
                                e
                              )
                            );
                          })
                      : "function" == typeof e.slice && void 0 !== e.size
                      ? Promise.resolve(new u.default(e))
                      : "function" == typeof e.read
                      ? ((t = +t),
                        isFinite(t)
                          ? Promise.resolve(new a.default(e, t))
                          : Promise.reject(
                              new Error(
                                "cannot create source for stream without a finite value for the `chunkSize` option"
                              )
                            ))
                      : Promise.reject(
                          new Error(
                            "source object may only be an instance of File, Blob, or Reader in this environment"
                          )
                        );
                  },
                },
              ]) && s(t.prototype, r),
              n && s(t, n),
              Object.defineProperty(t, "prototype", { writable: !1 }),
              e
            );
          })();
          r.default = e;
        },
        {
          "./isReactNative": 5,
          "./sources/FileSource": 6,
          "./sources/StreamSource": 7,
          "./uriToBlob": 10,
        },
      ],
      2: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", { value: !0 }),
            (r.default = function (e, t) {
              if ((0, n.default)())
                return Promise.resolve(
                  (function (e, t) {
                    var r = e.exif
                      ? (function (e) {
                          var t = 0;
                          if (0 === e.length) return t;
                          for (var r = 0; r < e.length; r++) {
                            var n = e.charCodeAt(r);
                            (t = (t << 5) - t + n), (t &= t);
                          }
                          return t;
                        })(JSON.stringify(e.exif))
                      : "noexif";
                    return [
                      "tus-rn",
                      e.name || "noname",
                      e.size || "nosize",
                      r,
                      t.endpoint,
                    ].join("/");
                  })(e, t)
                );
              return Promise.resolve(
                [
                  "tus-br",
                  e.name,
                  e.type,
                  e.size,
                  e.lastModified,
                  t.endpoint,
                ].join("-")
              );
            });
          var n =
            (r = e("./isReactNative")) && r.__esModule ? r : { default: r };
        },
        { "./isReactNative": 5 },
      ],
      3: [
        function (e, t, r) {
          "use strict";
          function n(e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          }
          function o(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          function i(e, t, r) {
            t && o(e.prototype, t),
              r && o(e, r),
              Object.defineProperty(e, "prototype", { writable: !1 });
          }
          Object.defineProperty(r, "__esModule", { value: !0 }),
            (r.default = void 0);
          r.default = (function () {
            function e() {
              n(this, e);
            }
            return (
              i(e, [
                {
                  key: "createRequest",
                  value: function (e, t) {
                    return new u(e, t);
                  },
                },
                {
                  key: "getName",
                  value: function () {
                    return "XHRHttpStack";
                  },
                },
              ]),
              e
            );
          })();
          var u = (function () {
              function r(e, t) {
                n(this, r),
                  (this._xhr = new XMLHttpRequest()),
                  this._xhr.open(e, t, !0),
                  (this._method = e),
                  (this._url = t),
                  (this._headers = {});
              }
              return (
                i(r, [
                  {
                    key: "getMethod",
                    value: function () {
                      return this._method;
                    },
                  },
                  {
                    key: "getURL",
                    value: function () {
                      return this._url;
                    },
                  },
                  {
                    key: "setHeader",
                    value: function (e, t) {
                      this._xhr.setRequestHeader(e, t), (this._headers[e] = t);
                    },
                  },
                  {
                    key: "getHeader",
                    value: function (e) {
                      return this._headers[e];
                    },
                  },
                  {
                    key: "setProgressHandler",
                    value: function (t) {
                      "upload" in this._xhr &&
                        (this._xhr.upload.onprogress = function (e) {
                          e.lengthComputable && t(e.loaded);
                        });
                    },
                  },
                  {
                    key: "send",
                    value: function () {
                      var r = this,
                        n =
                          0 < arguments.length && void 0 !== arguments[0]
                            ? arguments[0]
                            : null;
                      return new Promise(function (e, t) {
                        (r._xhr.onload = function () {
                          e(new a(r._xhr));
                        }),
                          (r._xhr.onerror = function (e) {
                            t(e);
                          }),
                          r._xhr.send(n);
                      });
                    },
                  },
                  {
                    key: "abort",
                    value: function () {
                      return this._xhr.abort(), Promise.resolve();
                    },
                  },
                  {
                    key: "getUnderlyingObject",
                    value: function () {
                      return this._xhr;
                    },
                  },
                ]),
                r
              );
            })(),
            a = (function () {
              function t(e) {
                n(this, t), (this._xhr = e);
              }
              return (
                i(t, [
                  {
                    key: "getStatus",
                    value: function () {
                      return this._xhr.status;
                    },
                  },
                  {
                    key: "getHeader",
                    value: function (e) {
                      return this._xhr.getResponseHeader(e);
                    },
                  },
                  {
                    key: "getBody",
                    value: function () {
                      return this._xhr.responseText;
                    },
                  },
                  {
                    key: "getUnderlyingObject",
                    value: function () {
                      return this._xhr;
                    },
                  },
                ]),
                t
              );
            })();
        },
        {},
      ],
      4: [
        function (e, t, r) {
          "use strict";
          function o(e) {
            return (o =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  })(e);
          }
          Object.defineProperty(r, "__esModule", { value: !0 }),
            Object.defineProperty(r, "DetailedError", {
              enumerable: !0,
              get: function () {
                return a.default;
              },
            }),
            Object.defineProperty(r, "HttpStack", {
              enumerable: !0,
              get: function () {
                return l.default;
              },
            }),
            (r.Upload = void 0),
            Object.defineProperty(r, "canStoreURLs", {
              enumerable: !0,
              get: function () {
                return s.canStoreURLs;
              },
            }),
            (r.defaultOptions = void 0),
            Object.defineProperty(r, "enableDebugLog", {
              enumerable: !0,
              get: function () {
                return u.enableDebugLog;
              },
            }),
            (r.isSupported = void 0);
          var n = c(e("../upload")),
            i = c(e("../noopUrlStorage")),
            u = e("../logger"),
            a = c(e("../error")),
            s = e("./urlStorage"),
            l = c(e("./httpStack")),
            f = c(e("./fileReader")),
            e = c(e("./fingerprint"));
          function c(e) {
            return e && e.__esModule ? e : { default: e };
          }
          function p(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          function h(e, t) {
            return (h = Object.setPrototypeOf
              ? Object.setPrototypeOf.bind()
              : function (e, t) {
                  return (e.__proto__ = t), e;
                })(e, t);
          }
          function d(r) {
            var n = (function () {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return !1;
              if (Reflect.construct.sham) return !1;
              if ("function" == typeof Proxy) return !0;
              try {
                return (
                  Boolean.prototype.valueOf.call(
                    Reflect.construct(Boolean, [], function () {})
                  ),
                  !0
                );
              } catch (e) {
                return !1;
              }
            })();
            return function () {
              var e,
                t = y(r),
                t =
                  ((e = n
                    ? ((e = y(this).constructor),
                      Reflect.construct(t, arguments, e))
                    : t.apply(this, arguments)),
                  this);
              if (e && ("object" === o(e) || "function" == typeof e)) return e;
              if (void 0 !== e)
                throw new TypeError(
                  "Derived constructors may only return object or undefined"
                );
              if (void 0 !== t) return t;
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            };
          }
          function y(e) {
            return (y = Object.setPrototypeOf
              ? Object.getPrototypeOf.bind()
              : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e);
                })(e);
          }
          function g(t, e) {
            var r,
              n = Object.keys(t);
            return (
              Object.getOwnPropertySymbols &&
                ((r = Object.getOwnPropertySymbols(t)),
                e &&
                  (r = r.filter(function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable;
                  })),
                n.push.apply(n, r)),
              n
            );
          }
          function v(n) {
            for (var e = 1; e < arguments.length; e++) {
              var o = null != arguments[e] ? arguments[e] : {};
              e % 2
                ? g(Object(o), !0).forEach(function (e) {
                    var t, r;
                    (t = n),
                      (r = o[(e = e)]),
                      e in t
                        ? Object.defineProperty(t, e, {
                            value: r,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                          })
                        : (t[e] = r);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    n,
                    Object.getOwnPropertyDescriptors(o)
                  )
                : g(Object(o)).forEach(function (e) {
                    Object.defineProperty(
                      n,
                      e,
                      Object.getOwnPropertyDescriptor(o, e)
                    );
                  });
            }
            return n;
          }
          var b = v(
              v({}, n.default.defaultOptions),
              {},
              {
                httpStack: new l.default(),
                fileReader: new f.default(),
                urlStorage: new (s.canStoreURLs
                  ? s.WebStorageUrlStorage
                  : i.default)(),
                fingerprint: e.default,
              }
            ),
            f =
              ((r.defaultOptions = b),
              (function (e) {
                var t = i;
                if ("function" != typeof e && null !== e)
                  throw new TypeError(
                    "Super expression must either be null or a function"
                  );
                (t.prototype = Object.create(e && e.prototype, {
                  constructor: { value: t, writable: !0, configurable: !0 },
                })),
                  Object.defineProperty(t, "prototype", { writable: !1 }),
                  e && h(t, e);
                var r,
                  o = d(i);
                function i() {
                  var e =
                      0 < arguments.length && void 0 !== arguments[0]
                        ? arguments[0]
                        : null,
                    t =
                      1 < arguments.length && void 0 !== arguments[1]
                        ? arguments[1]
                        : {},
                    r = this,
                    n = i;
                  if (r instanceof n)
                    return (t = v(v({}, b), t)), o.call(this, e, t);
                  throw new TypeError("Cannot call a class as a function");
                }
                return (
                  (t = i),
                  (e = [
                    {
                      key: "terminate",
                      value: function (e, t, r) {
                        return (
                          (t = v(v({}, b), t)), n.default.terminate(e, t, r)
                        );
                      },
                    },
                  ]),
                  (r = null) && p(t.prototype, r),
                  e && p(t, e),
                  Object.defineProperty(t, "prototype", { writable: !1 }),
                  i
                );
              })(n.default)),
            i = ((r.Upload = f), window),
            e = i.XMLHttpRequest,
            f = i.Blob,
            i = e && f && "function" == typeof f.prototype.slice;
          r.isSupported = i;
        },
        {
          "../error": 12,
          "../logger": 13,
          "../noopUrlStorage": 14,
          "../upload": 15,
          "./fileReader": 1,
          "./fingerprint": 2,
          "./httpStack": 3,
          "./urlStorage": 11,
        },
      ],
      5: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", { value: !0 }),
            (r.default = void 0);
          r.default = function () {
            return (
              "undefined" != typeof navigator &&
              "string" == typeof navigator.product &&
              "reactnative" === navigator.product.toLowerCase()
            );
          };
        },
        {},
      ],
      6: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", { value: !0 }),
            (r.default = void 0);
          var o = n(e("./isCordova")),
            i = n(e("./readAsByteArray"));
          function n(e) {
            return e && e.__esModule ? e : { default: e };
          }
          function u(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          e = (function () {
            function t(e) {
              if (!(this instanceof t))
                throw new TypeError("Cannot call a class as a function");
              (this._file = e), (this.size = e.size);
            }
            var e, r, n;
            return (
              (e = t),
              (r = [
                {
                  key: "slice",
                  value: function (e, t) {
                    if ((0, o.default)())
                      return (0, i.default)(this._file.slice(e, t));
                    e = this._file.slice(e, t);
                    return Promise.resolve({ value: e });
                  },
                },
                { key: "close", value: function () {} },
              ]) && u(e.prototype, r),
              n && u(e, n),
              Object.defineProperty(e, "prototype", { writable: !1 }),
              t
            );
          })();
          r.default = e;
        },
        { "./isCordova": 8, "./readAsByteArray": 9 },
      ],
      7: [
        function (e, t, r) {
          "use strict";
          function o(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          function i(e) {
            return void 0 === e ? 0 : void 0 !== e.size ? e.size : e.length;
          }
          Object.defineProperty(r, "__esModule", { value: !0 }),
            (r.default = void 0);
          var n = (function () {
            function t(e) {
              if (!(this instanceof t))
                throw new TypeError("Cannot call a class as a function");
              (this._buffer = void 0),
                (this._bufferOffset = 0),
                (this._reader = e),
                (this._done = !1);
            }
            var e, r, n;
            return (
              (e = t),
              (r = [
                {
                  key: "slice",
                  value: function (e, t) {
                    return e < this._bufferOffset
                      ? Promise.reject(
                          new Error(
                            "Requested data is before the reader's current offset"
                          )
                        )
                      : this._readUntilEnoughDataOrDone(e, t);
                  },
                },
                {
                  key: "_readUntilEnoughDataOrDone",
                  value: function (r, n) {
                    var e,
                      o = this,
                      t = n <= this._bufferOffset + i(this._buffer);
                    return this._done || t
                      ? ((e =
                          null == (t = this._getDataFromBuffer(r, n)) &&
                          this._done),
                        Promise.resolve({ value: t, done: e }))
                      : this._reader.read().then(function (e) {
                          var t = e.value;
                          return (
                            e.done
                              ? (o._done = !0)
                              : void 0 === o._buffer
                              ? (o._buffer = t)
                              : (o._buffer = (function (e, t) {
                                  if (e.concat) return e.concat(t);
                                  if (e instanceof Blob)
                                    return new Blob([e, t], { type: e.type });
                                  var r;
                                  if (e.set)
                                    return (
                                      (r = new e.constructor(
                                        e.length + t.length
                                      )).set(e),
                                      r.set(t, e.length),
                                      r
                                    );
                                  throw new Error("Unknown data type");
                                })(o._buffer, t)),
                            o._readUntilEnoughDataOrDone(r, n)
                          );
                        });
                  },
                },
                {
                  key: "_getDataFromBuffer",
                  value: function (e, t) {
                    e > this._bufferOffset &&
                      ((this._buffer = this._buffer.slice(
                        e - this._bufferOffset
                      )),
                      (this._bufferOffset = e));
                    var r = 0 === i(this._buffer);
                    return this._done && r
                      ? null
                      : this._buffer.slice(0, t - e);
                  },
                },
                {
                  key: "close",
                  value: function () {
                    this._reader.cancel && this._reader.cancel();
                  },
                },
              ]) && o(e.prototype, r),
              n && o(e, n),
              Object.defineProperty(e, "prototype", { writable: !1 }),
              t
            );
          })();
          r.default = n;
        },
        {},
      ],
      8: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", { value: !0 }),
            (r.default = void 0);
          r.default = function () {
            return (
              "undefined" != typeof window &&
              (void 0 !== window.PhoneGap ||
                void 0 !== window.Cordova ||
                void 0 !== window.cordova)
            );
          };
        },
        {},
      ],
      9: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", { value: !0 }),
            (r.default = function (e) {
              return new Promise(function (t, r) {
                var n = new FileReader();
                (n.onload = function () {
                  var e = new Uint8Array(n.result);
                  t({ value: e });
                }),
                  (n.onerror = function (e) {
                    r(e);
                  }),
                  n.readAsArrayBuffer(e);
              });
            });
        },
        {},
      ],
      10: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", { value: !0 }),
            (r.default = function (e) {
              return new Promise(function (t, r) {
                var n = new XMLHttpRequest();
                (n.responseType = "blob"),
                  (n.onload = function () {
                    var e = n.response;
                    t(e);
                  }),
                  (n.onerror = function (e) {
                    r(e);
                  }),
                  n.open("GET", e),
                  n.send();
              });
            });
        },
        {},
      ],
      11: [
        function (e, t, r) {
          "use strict";
          function o(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          Object.defineProperty(r, "__esModule", { value: !0 }),
            (r.canStoreURLs = r.WebStorageUrlStorage = void 0);
          var n = !1;
          try {
            var n = "localStorage" in window,
              i = "tusSupport";
            localStorage.setItem(i, localStorage.getItem(i));
          } catch (e) {
            if (e.code !== e.SECURITY_ERR && e.code !== e.QUOTA_EXCEEDED_ERR)
              throw e;
            n = !1;
          }
          (i = n),
            (r.canStoreURLs = i),
            (n = (function () {
              function e() {
                if (!(this instanceof e))
                  throw new TypeError("Cannot call a class as a function");
              }
              var t, r, n;
              return (
                (t = e),
                (r = [
                  {
                    key: "findAllUploads",
                    value: function () {
                      var e = this._findEntries("tus::");
                      return Promise.resolve(e);
                    },
                  },
                  {
                    key: "findUploadsByFingerprint",
                    value: function (e) {
                      e = this._findEntries("tus::".concat(e, "::"));
                      return Promise.resolve(e);
                    },
                  },
                  {
                    key: "removeUpload",
                    value: function (e) {
                      return localStorage.removeItem(e), Promise.resolve();
                    },
                  },
                  {
                    key: "addUpload",
                    value: function (e, t) {
                      var r = Math.round(1e12 * Math.random()),
                        e = "tus::".concat(e, "::").concat(r);
                      return (
                        localStorage.setItem(e, JSON.stringify(t)),
                        Promise.resolve(e)
                      );
                    },
                  },
                  {
                    key: "_findEntries",
                    value: function (e) {
                      for (var t = [], r = 0; r < localStorage.length; r++) {
                        var n = localStorage.key(r);
                        if (0 === n.indexOf(e))
                          try {
                            var o = JSON.parse(localStorage.getItem(n));
                            (o.urlStorageKey = n), t.push(o);
                          } catch (e) {}
                      }
                      return t;
                    },
                  },
                ]) && o(t.prototype, r),
                n && o(t, n),
                Object.defineProperty(t, "prototype", { writable: !1 }),
                e
              );
            })());
          r.WebStorageUrlStorage = n;
        },
        {},
      ],
      12: [
        function (e, t, r) {
          "use strict";
          function o(e) {
            return (o =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  })(e);
          }
          function i(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          function u(r) {
            var n = s();
            return function () {
              var e,
                t = f(r),
                t =
                  ((e = n
                    ? ((e = f(this).constructor),
                      Reflect.construct(t, arguments, e))
                    : t.apply(this, arguments)),
                  this);
              if (e && ("object" === o(e) || "function" == typeof e)) return e;
              if (void 0 !== e)
                throw new TypeError(
                  "Derived constructors may only return object or undefined"
                );
              if (void 0 !== t) return t;
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            };
          }
          function n(e) {
            var r = "function" == typeof Map ? new Map() : void 0;
            return (function (e) {
              if (
                null === e ||
                -1 === Function.toString.call(e).indexOf("[native code]")
              )
                return e;
              if ("function" != typeof e)
                throw new TypeError(
                  "Super expression must either be null or a function"
                );
              if (void 0 !== r) {
                if (r.has(e)) return r.get(e);
                r.set(e, t);
              }
              function t() {
                return a(e, arguments, f(this).constructor);
              }
              return (
                (t.prototype = Object.create(e.prototype, {
                  constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                l(t, e)
              );
            })(e);
          }
          function a(e, t, r) {
            return (a = s()
              ? Reflect.construct.bind()
              : function (e, t, r) {
                  var n = [null];
                  n.push.apply(n, t);
                  t = new (Function.bind.apply(e, n))();
                  return r && l(t, r.prototype), t;
                }).apply(null, arguments);
          }
          function s() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
              return (
                Boolean.prototype.valueOf.call(
                  Reflect.construct(Boolean, [], function () {})
                ),
                !0
              );
            } catch (e) {
              return !1;
            }
          }
          function l(e, t) {
            return (l = Object.setPrototypeOf
              ? Object.setPrototypeOf.bind()
              : function (e, t) {
                  return (e.__proto__ = t), e;
                })(e, t);
          }
          function f(e) {
            return (f = Object.setPrototypeOf
              ? Object.getPrototypeOf.bind()
              : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e);
                })(e);
          }
          Object.defineProperty(r, "__esModule", { value: !0 }),
            (r.default = void 0);
          var c = (function (e) {
            var t = s;
            if ("function" != typeof e && null !== e)
              throw new TypeError(
                "Super expression must either be null or a function"
              );
            (t.prototype = Object.create(e && e.prototype, {
              constructor: { value: t, writable: !0, configurable: !0 },
            })),
              Object.defineProperty(t, "prototype", { writable: !1 }),
              e && l(t, e);
            var r,
              n,
              a = u(s);
            function s(e) {
              var t,
                r =
                  1 < arguments.length && void 0 !== arguments[1]
                    ? arguments[1]
                    : null,
                n =
                  2 < arguments.length && void 0 !== arguments[2]
                    ? arguments[2]
                    : null,
                o =
                  3 < arguments.length && void 0 !== arguments[3]
                    ? arguments[3]
                    : null,
                i = this,
                u = s;
              if (i instanceof u)
                return (
                  ((i = a.call(this, e)).originalRequest = n),
                  (i.originalResponse = o),
                  null != (i.causingError = r) &&
                    (e += ", caused by ".concat(r.toString())),
                  null != n &&
                    ((u = n.getHeader("X-Request-ID") || "n/a"),
                    (r = n.getMethod()),
                    (n = n.getURL()),
                    (t = o ? o.getStatus() : "n/a"),
                    (o = o ? o.getBody() || "" : "n/a"),
                    (e += ", originated from request (method: "
                      .concat(r, ", url: ")
                      .concat(n, ", response code: ")
                      .concat(t, ", response text: ")
                      .concat(o, ", request id: ")
                      .concat(u, ")"))),
                  (i.message = e),
                  i
                );
              throw new TypeError("Cannot call a class as a function");
            }
            return (
              (t = s),
              r && i(t.prototype, r),
              n && i(t, n),
              Object.defineProperty(t, "prototype", { writable: !1 }),
              t
            );
          })(n(Error));
          r.default = c;
        },
        {},
      ],
      13: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", { value: !0 }),
            (r.enableDebugLog = function () {
              n = !0;
            });
          var n = !(r.log = function (e) {
            n && console.log(e);
          });
        },
        {},
      ],
      14: [
        function (e, t, r) {
          "use strict";
          function o(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          Object.defineProperty(r, "__esModule", { value: !0 }),
            (r.default = void 0);
          var n = (function () {
            function e() {
              if (!(this instanceof e))
                throw new TypeError("Cannot call a class as a function");
            }
            var t, r, n;
            return (
              (t = e),
              (r = [
                {
                  key: "listAllUploads",
                  value: function () {
                    return Promise.resolve([]);
                  },
                },
                {
                  key: "findUploadsByFingerprint",
                  value: function (e) {
                    return Promise.resolve([]);
                  },
                },
                {
                  key: "removeUpload",
                  value: function (e) {
                    return Promise.resolve();
                  },
                },
                {
                  key: "addUpload",
                  value: function (e, t) {
                    return Promise.resolve(null);
                  },
                },
              ]) && o(t.prototype, r),
              n && o(t, n),
              Object.defineProperty(t, "prototype", { writable: !1 }),
              e
            );
          })();
          r.default = n;
        },
        {},
      ],
      15: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", { value: !0 }),
            (r.default = void 0);
          var n = e("js-base64"),
            o = s(e("url-parse")),
            u = s(e("./error")),
            i = e("./logger"),
            a = s(e("./uuid"));
          function s(e) {
            return e && e.__esModule ? e : { default: e };
          }
          function l(t, e) {
            var r,
              n = Object.keys(t);
            return (
              Object.getOwnPropertySymbols &&
                ((r = Object.getOwnPropertySymbols(t)),
                e &&
                  (r = r.filter(function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable;
                  })),
                n.push.apply(n, r)),
              n
            );
          }
          function p(n) {
            for (var e = 1; e < arguments.length; e++) {
              var o = null != arguments[e] ? arguments[e] : {};
              e % 2
                ? l(Object(o), !0).forEach(function (e) {
                    var t, r;
                    (t = n),
                      (r = o[(e = e)]),
                      e in t
                        ? Object.defineProperty(t, e, {
                            value: r,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                          })
                        : (t[e] = r);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    n,
                    Object.getOwnPropertyDescriptors(o)
                  )
                : l(Object(o)).forEach(function (e) {
                    Object.defineProperty(
                      n,
                      e,
                      Object.getOwnPropertyDescriptor(o, e)
                    );
                  });
            }
            return n;
          }
          function f(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          var e = {
              endpoint: null,
              uploadUrl: null,
              metadata: {},
              fingerprint: null,
              uploadSize: null,
              onProgress: null,
              onChunkComplete: null,
              onSuccess: null,
              onError: null,
              _onUploadUrlAvailable: null,
              overridePatchMethod: !1,
              headers: {},
              addRequestId: !1,
              onBeforeRequest: null,
              onAfterResponse: null,
              onShouldRetry: null,
              chunkSize: 1 / 0,
              retryDelays: [0, 1e3, 3e3, 5e3],
              parallelUploads: 1,
              storeFingerprintForResuming: !0,
              removeFingerprintOnSuccess: !1,
              uploadLengthDeferred: !1,
              uploadDataDuringCreation: !1,
              urlStorage: null,
              fileReader: null,
              httpStack: null,
            },
            c = (function () {
              function c(e, t) {
                if (!(this instanceof c))
                  throw new TypeError("Cannot call a class as a function");
                "resume" in t &&
                  console.log(
                    "tus: The `resume` option has been removed in tus-js-client v2. Please use the URL storage API instead."
                  ),
                  (this.options = t),
                  (this.options.chunkSize = +this.options.chunkSize),
                  (this._urlStorage = this.options.urlStorage),
                  (this.file = e),
                  (this.url = null),
                  (this._req = null),
                  (this._fingerprint = null),
                  (this._urlStorageKey = null),
                  (this._offset = null),
                  (this._aborted = !1),
                  (this._size = null),
                  (this._source = null),
                  (this._retryAttempt = 0),
                  (this._retryTimeout = null),
                  (this._offsetBeforeRetry = 0),
                  (this._parallelUploads = null),
                  (this._parallelUploadUrls = null);
              }
              var e, t, r;
              return (
                (e = c),
                (r = [
                  {
                    key: "terminate",
                    value: function (n, o) {
                      if (
                        1 < arguments.length &&
                        "function" == typeof arguments[arguments.length - 1]
                      )
                        throw new Error(
                          "tus: the terminate function does not accept a callback since v2 anymore; please use the returned Promise instead"
                        );
                      var i = y("DELETE", n, (o = void 0 === o ? {} : o));
                      return g(i, null, o)
                        .then(function (e) {
                          if (204 !== e.getStatus())
                            throw new u.default(
                              "tus: unexpected response while terminating upload",
                              null,
                              i,
                              e
                            );
                        })
                        .catch(function (e) {
                          if (
                            !v(
                              (e =
                                e instanceof u.default
                                  ? e
                                  : new u.default(
                                      "tus: failed to terminate upload",
                                      e,
                                      i,
                                      null
                                    )),
                              0,
                              o
                            )
                          )
                            throw e;
                          var t = o.retryDelays[0],
                            e = o.retryDelays.slice(1),
                            r = p(p({}, o), {}, { retryDelays: e });
                          return new Promise(function (e) {
                            return setTimeout(e, t);
                          }).then(function () {
                            return c.terminate(n, r);
                          });
                        });
                    },
                  },
                ]),
                (t = [
                  {
                    key: "findPreviousUploads",
                    value: function () {
                      var t = this;
                      return this.options
                        .fingerprint(this.file, this.options)
                        .then(function (e) {
                          return t._urlStorage.findUploadsByFingerprint(e);
                        });
                    },
                  },
                  {
                    key: "resumeFromPreviousUpload",
                    value: function (e) {
                      (this.url = e.uploadUrl || null),
                        (this._parallelUploadUrls =
                          e.parallelUploadUrls || null),
                        (this._urlStorageKey = e.urlStorageKey);
                    },
                  },
                  {
                    key: "start",
                    value: function () {
                      var e,
                        t = this,
                        r = this.file;
                      r
                        ? this.options.endpoint || this.options.uploadUrl
                          ? null != (e = this.options.retryDelays) &&
                            "[object Array]" !==
                              Object.prototype.toString.call(e)
                            ? this._emitError(
                                new Error(
                                  "tus: the `retryDelays` option must either be an array or null"
                                )
                              )
                            : (1 < this.options.parallelUploads &&
                                [
                                  "uploadUrl",
                                  "uploadSize",
                                  "uploadLengthDeferred",
                                ].forEach(function (e) {
                                  t.options[e] &&
                                    t._emitError(
                                      new Error(
                                        "tus: cannot use the ".concat(
                                          e,
                                          " option when parallelUploads is enabled"
                                        )
                                      )
                                    );
                                }),
                              this.options
                                .fingerprint(r, this.options)
                                .then(function (e) {
                                  return (
                                    null == e
                                      ? (0, i.log)(
                                          "No fingerprint was calculated meaning that the upload cannot be stored in the URL storage."
                                        )
                                      : (0, i.log)(
                                          "Calculated fingerprint: ".concat(e)
                                        ),
                                    (t._fingerprint = e),
                                    t._source ||
                                      t.options.fileReader.openFile(
                                        r,
                                        t.options.chunkSize
                                      )
                                  );
                                })
                                .then(function (e) {
                                  (t._source = e),
                                    1 < t.options.parallelUploads ||
                                    null != t._parallelUploadUrls
                                      ? t._startParallelUpload()
                                      : t._startSingleUpload();
                                })
                                .catch(function (e) {
                                  t._emitError(e);
                                }))
                          : this._emitError(
                              new Error(
                                "tus: neither an endpoint or an upload URL is provided"
                              )
                            )
                        : this._emitError(
                            new Error(
                              "tus: no file or stream to upload provided"
                            )
                          );
                    },
                  },
                  {
                    key: "_startParallelUpload",
                    value: function () {
                      var r,
                        a = this,
                        s = (this._size = this._source.size),
                        l = 0,
                        e =
                          ((this._parallelUploads = []),
                          null != this._parallelUploadUrls
                            ? this._parallelUploadUrls.length
                            : this.options.parallelUploads),
                        f = (function (e, t, r) {
                          for (
                            var n = Math.floor(e / t), o = [], i = 0;
                            i < t;
                            i++
                          )
                            o.push({ start: n * i, end: n * (i + 1) });
                          (o[t - 1].end = e),
                            r &&
                              o.forEach(function (e, t) {
                                e.uploadUrl = r[t] || null;
                              });
                          return o;
                        })(this._source.size, e, this._parallelUploadUrls),
                        e =
                          ((this._parallelUploadUrls = new Array(f.length)),
                          f.map(function (o, i) {
                            var u = 0;
                            return a._source
                              .slice(o.start, o.end)
                              .then(function (e) {
                                var n = e.value;
                                return new Promise(function (e, t) {
                                  var e = p(
                                      p({}, a.options),
                                      {},
                                      {
                                        uploadUrl: o.uploadUrl || null,
                                        storeFingerprintForResuming: !1,
                                        removeFingerprintOnSuccess: !1,
                                        parallelUploads: 1,
                                        metadata: {},
                                        headers: p(
                                          p({}, a.options.headers),
                                          {},
                                          { "Upload-Concat": "partial" }
                                        ),
                                        onSuccess: e,
                                        onError: t,
                                        onProgress: function (e) {
                                          (l = l - u + e),
                                            (u = e),
                                            a._emitProgress(l, s);
                                        },
                                        _onUploadUrlAvailable: function () {
                                          (a._parallelUploadUrls[i] = r.url),
                                            a._parallelUploadUrls.filter(
                                              function (e) {
                                                return !!e;
                                              }
                                            ).length === f.length &&
                                              a._saveUploadInUrlStorage();
                                        },
                                      }
                                    ),
                                    r = new c(n, e);
                                  r.start(), a._parallelUploads.push(r);
                                });
                              });
                          }));
                      Promise.all(e)
                        .then(function () {
                          (r = a._openRequest(
                            "POST",
                            a.options.endpoint
                          )).setHeader(
                            "Upload-Concat",
                            "final;".concat(a._parallelUploadUrls.join(" "))
                          );
                          var e = h(a.options.metadata);
                          return (
                            "" !== e && r.setHeader("Upload-Metadata", e),
                            a._sendRequest(r, null)
                          );
                        })
                        .then(function (e) {
                          var t;
                          d(e.getStatus(), 200)
                            ? null == (t = e.getHeader("Location"))
                              ? a._emitHttpError(
                                  r,
                                  e,
                                  "tus: invalid or missing Location header"
                                )
                              : ((a.url = b(a.options.endpoint, t)),
                                (0, i.log)("Created upload at ".concat(a.url)),
                                a._emitSuccess())
                            : a._emitHttpError(
                                r,
                                e,
                                "tus: unexpected response while creating upload"
                              );
                        })
                        .catch(function (e) {
                          a._emitError(e);
                        });
                    },
                  },
                  {
                    key: "_startSingleUpload",
                    value: function () {
                      if (this.options.uploadLengthDeferred) this._size = null;
                      else if (null != this.options.uploadSize) {
                        if (
                          ((this._size = +this.options.uploadSize),
                          isNaN(this._size))
                        )
                          return void this._emitError(
                            new Error(
                              "tus: cannot convert `uploadSize` option into a number"
                            )
                          );
                      } else if (
                        ((this._size = this._source.size), null == this._size)
                      )
                        return void this._emitError(
                          new Error(
                            "tus: cannot automatically derive upload's size from input. Specify it manually using the `uploadSize` option or use the `uploadLengthDeferred` option"
                          )
                        );
                      return (
                        (this._aborted = !1),
                        null != this.url
                          ? ((0, i.log)(
                              "Resuming upload from previous URL: ".concat(
                                this.url
                              )
                            ),
                            void this._resumeUpload())
                          : null != this.options.uploadUrl
                          ? ((0, i.log)(
                              "Resuming upload from provided URL: ".concat(
                                this.options.uploadUrl
                              )
                            ),
                            (this.url = this.options.uploadUrl),
                            void this._resumeUpload())
                          : ((0, i.log)("Creating a new upload"),
                            void this._createUpload())
                      );
                    },
                  },
                  {
                    key: "abort",
                    value: function (t) {
                      var e = this;
                      if (
                        1 < arguments.length &&
                        "function" == typeof arguments[1]
                      )
                        throw new Error(
                          "tus: the abort function does not accept a callback since v2 anymore; please use the returned Promise instead"
                        );
                      return (
                        null != this._parallelUploads &&
                          this._parallelUploads.forEach(function (e) {
                            e.abort(t);
                          }),
                        null !== this._req &&
                          (this._req.abort(), this._source.close()),
                        (this._aborted = !0),
                        null != this._retryTimeout &&
                          (clearTimeout(this._retryTimeout),
                          (this._retryTimeout = null)),
                        t && null != this.url
                          ? c
                              .terminate(this.url, this.options)
                              .then(function () {
                                return e._removeFromUrlStorage();
                              })
                          : Promise.resolve()
                      );
                    },
                  },
                  {
                    key: "_emitHttpError",
                    value: function (e, t, r, n) {
                      this._emitError(new u.default(r, n, e, t));
                    },
                  },
                  {
                    key: "_emitError",
                    value: function (e) {
                      var t,
                        r = this;
                      if (!this._aborted) {
                        if (null != this.options.retryDelays)
                          if (
                            (null != this._offset &&
                              this._offset > this._offsetBeforeRetry &&
                              (this._retryAttempt = 0),
                            v(e, this._retryAttempt, this.options))
                          )
                            return (
                              (t =
                                this.options.retryDelays[this._retryAttempt++]),
                              (this._offsetBeforeRetry = this._offset),
                              void (this._retryTimeout = setTimeout(
                                function () {
                                  r.start();
                                },
                                t
                              ))
                            );
                        if ("function" != typeof this.options.onError) throw e;
                        this.options.onError(e);
                      }
                    },
                  },
                  {
                    key: "_emitSuccess",
                    value: function () {
                      this.options.removeFingerprintOnSuccess &&
                        this._removeFromUrlStorage(),
                        "function" == typeof this.options.onSuccess &&
                          this.options.onSuccess();
                    },
                  },
                  {
                    key: "_emitProgress",
                    value: function (e, t) {
                      "function" == typeof this.options.onProgress &&
                        this.options.onProgress(e, t);
                    },
                  },
                  {
                    key: "_emitChunkComplete",
                    value: function (e, t, r) {
                      "function" == typeof this.options.onChunkComplete &&
                        this.options.onChunkComplete(e, t, r);
                    },
                  },
                  {
                    key: "_createUpload",
                    value: function () {
                      var r,
                        e,
                        n = this;
                      this.options.endpoint
                        ? ((r = this._openRequest(
                            "POST",
                            this.options.endpoint
                          )),
                          this.options.uploadLengthDeferred
                            ? r.setHeader("Upload-Defer-Length", 1)
                            : r.setHeader("Upload-Length", this._size),
                          "" !== (e = h(this.options.metadata)) &&
                            r.setHeader("Upload-Metadata", e),
                          (this.options.uploadDataDuringCreation &&
                          !this.options.uploadLengthDeferred
                            ? ((this._offset = 0), this._addChunkToRequest(r))
                            : this._sendRequest(r, null)
                          )
                            .then(function (e) {
                              if (d(e.getStatus(), 200)) {
                                var t = e.getHeader("Location");
                                if (null == t)
                                  n._emitHttpError(
                                    r,
                                    e,
                                    "tus: invalid or missing Location header"
                                  );
                                else {
                                  if (
                                    ((n.url = b(n.options.endpoint, t)),
                                    (0, i.log)(
                                      "Created upload at ".concat(n.url)
                                    ),
                                    "function" ==
                                      typeof n.options._onUploadUrlAvailable &&
                                      n.options._onUploadUrlAvailable(),
                                    0 === n._size)
                                  )
                                    return (
                                      n._emitSuccess(), void n._source.close()
                                    );
                                  n._saveUploadInUrlStorage(),
                                    n.options.uploadDataDuringCreation
                                      ? n._handleUploadResponse(r, e)
                                      : ((n._offset = 0), n._performUpload());
                                }
                              } else n._emitHttpError(r, e, "tus: unexpected response while creating upload");
                            })
                            .catch(function (e) {
                              n._emitHttpError(
                                r,
                                null,
                                "tus: failed to create upload",
                                e
                              );
                            }))
                        : this._emitError(
                            new Error(
                              "tus: unable to create upload because no endpoint is provided"
                            )
                          );
                    },
                  },
                  {
                    key: "_resumeUpload",
                    value: function () {
                      var n = this,
                        o = this._openRequest("HEAD", this.url);
                      this._sendRequest(o, null)
                        .then(function (e) {
                          var t = e.getStatus();
                          if (!d(t, 200))
                            return (
                              d(t, 400) && n._removeFromUrlStorage(),
                              423 === t
                                ? void n._emitHttpError(
                                    o,
                                    e,
                                    "tus: upload is currently locked; retry later"
                                  )
                                : n.options.endpoint
                                ? ((n.url = null), void n._createUpload())
                                : void n._emitHttpError(
                                    o,
                                    e,
                                    "tus: unable to resume upload (new upload cannot be created without an endpoint)"
                                  )
                            );
                          t = parseInt(e.getHeader("Upload-Offset"), 10);
                          if (isNaN(t))
                            n._emitHttpError(
                              o,
                              e,
                              "tus: invalid or missing offset value"
                            );
                          else {
                            var r = parseInt(e.getHeader("Upload-Length"), 10);
                            if (isNaN(r) && !n.options.uploadLengthDeferred)
                              n._emitHttpError(
                                o,
                                e,
                                "tus: invalid or missing length value"
                              );
                            else {
                              if (
                                ("function" ==
                                  typeof n.options._onUploadUrlAvailable &&
                                  n.options._onUploadUrlAvailable(),
                                t === r)
                              )
                                return (
                                  n._emitProgress(r, r), void n._emitSuccess()
                                );
                              (n._offset = t), n._performUpload();
                            }
                          }
                        })
                        .catch(function (e) {
                          n._emitHttpError(
                            o,
                            null,
                            "tus: failed to resume upload",
                            e
                          );
                        });
                    },
                  },
                  {
                    key: "_performUpload",
                    value: function () {
                      var t,
                        r = this;
                      this._aborted ||
                        (this.options.overridePatchMethod
                          ? (t = this._openRequest("POST", this.url)).setHeader(
                              "X-HTTP-Method-Override",
                              "PATCH"
                            )
                          : (t = this._openRequest("PATCH", this.url)),
                        t.setHeader("Upload-Offset", this._offset),
                        this._addChunkToRequest(t)
                          .then(function (e) {
                            d(e.getStatus(), 200)
                              ? r._handleUploadResponse(t, e)
                              : r._emitHttpError(
                                  t,
                                  e,
                                  "tus: unexpected response while uploading chunk"
                                );
                          })
                          .catch(function (e) {
                            r._aborted ||
                              r._emitHttpError(
                                t,
                                null,
                                "tus: failed to upload chunk at offset ".concat(
                                  r._offset
                                ),
                                e
                              );
                          }));
                    },
                  },
                  {
                    key: "_addChunkToRequest",
                    value: function (r) {
                      var n = this,
                        t = this._offset,
                        e = this._offset + this.options.chunkSize;
                      return (
                        r.setProgressHandler(function (e) {
                          n._emitProgress(t + e, n._size);
                        }),
                        r.setHeader(
                          "Content-Type",
                          "application/offset+octet-stream"
                        ),
                        (e === 1 / 0 || e > this._size) &&
                          !this.options.uploadLengthDeferred &&
                          (e = this._size),
                        this._source.slice(t, e).then(function (e) {
                          var t = e.value,
                            e = e.done;
                          return (
                            n.options.uploadLengthDeferred &&
                              e &&
                              ((n._size =
                                n._offset + (t && t.size ? t.size : 0)),
                              r.setHeader("Upload-Length", n._size)),
                            null === t
                              ? n._sendRequest(r)
                              : (n._emitProgress(n._offset, n._size),
                                n._sendRequest(r, t))
                          );
                        })
                      );
                    },
                  },
                  {
                    key: "_handleUploadResponse",
                    value: function (e, t) {
                      var r = parseInt(t.getHeader("Upload-Offset"), 10);
                      if (isNaN(r))
                        this._emitHttpError(
                          e,
                          t,
                          "tus: invalid or missing offset value"
                        );
                      else {
                        if (
                          (this._emitProgress(r, this._size),
                          this._emitChunkComplete(
                            r - this._offset,
                            r,
                            this._size
                          ),
                          (this._offset = r) == this._size)
                        )
                          return this._emitSuccess(), void this._source.close();
                        this._performUpload();
                      }
                    },
                  },
                  {
                    key: "_openRequest",
                    value: function (e, t) {
                      e = y(e, t, this.options);
                      return (this._req = e);
                    },
                  },
                  {
                    key: "_removeFromUrlStorage",
                    value: function () {
                      var t = this;
                      this._urlStorageKey &&
                        (this._urlStorage
                          .removeUpload(this._urlStorageKey)
                          .catch(function (e) {
                            t._emitError(e);
                          }),
                        (this._urlStorageKey = null));
                    },
                  },
                  {
                    key: "_saveUploadInUrlStorage",
                    value: function () {
                      var e,
                        t = this;
                      this.options.storeFingerprintForResuming &&
                        this._fingerprint &&
                        ((e = {
                          size: this._size,
                          metadata: this.options.metadata,
                          creationTime: new Date().toString(),
                        }),
                        this._parallelUploads
                          ? (e.parallelUploadUrls = this._parallelUploadUrls)
                          : (e.uploadUrl = this.url),
                        this._urlStorage
                          .addUpload(this._fingerprint, e)
                          .then(function (e) {
                            return (t._urlStorageKey = e);
                          })
                          .catch(function (e) {
                            t._emitError(e);
                          }));
                    },
                  },
                  {
                    key: "_sendRequest",
                    value: function (e) {
                      return g(
                        e,
                        1 < arguments.length && void 0 !== arguments[1]
                          ? arguments[1]
                          : null,
                        this.options
                      );
                    },
                  },
                ]) && f(e.prototype, t),
                r && f(e, r),
                Object.defineProperty(e, "prototype", { writable: !1 }),
                c
              );
            })();
          function h(e) {
            var t,
              r = [];
            for (t in e)
              r.push("".concat(t, " ").concat(n.Base64.encode(String(e[t]))));
            return r.join(",");
          }
          function d(e, t) {
            return t <= e && e < t + 100;
          }
          function y(e, t, r) {
            var n,
              o = r.httpStack.createRequest(e, t),
              i = (o.setHeader("Tus-Resumable", "1.0.0"), r.headers || {});
            for (n in i) o.setHeader(n, i[n]);
            return (
              r.addRequestId &&
                ((e = (0, a.default)()), o.setHeader("X-Request-ID", e)),
              o
            );
          }
          function g(t, e, r) {
            return (
              "function" == typeof r.onBeforeRequest
                ? Promise.resolve(r.onBeforeRequest(t))
                : Promise.resolve()
            ).then(function () {
              return t.send(e).then(function (e) {
                return (
                  "function" == typeof r.onAfterResponse
                    ? Promise.resolve(r.onAfterResponse(t, e))
                    : Promise.resolve()
                ).then(function () {
                  return e;
                });
              });
            });
          }
          function v(e, t, r) {
            if (
              !(
                null == r.retryDelays ||
                t >= r.retryDelays.length ||
                null == e.originalRequest
              )
            ) {
              if (r && "function" == typeof r.onShouldRetry)
                return r.onShouldRetry(e, t, r);
              t = e.originalResponse ? e.originalResponse.getStatus() : 0;
              return (
                (!d(t, 400) || 409 === t || 423 === t) &&
                ((r = !0),
                (r =
                  !(
                    "undefined" != typeof window &&
                    "navigator" in window &&
                    !1 === window.navigator.onLine
                  ) && r))
              );
            }
          }
          function b(e, t) {
            return new o.default(t, e).toString();
          }
          (c.defaultOptions = e), (r.default = c);
        },
        {
          "./error": 12,
          "./logger": 13,
          "./uuid": 16,
          "js-base64": 20,
          "url-parse": 23,
        },
      ],
      16: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", { value: !0 }),
            (r.default = function () {
              return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                /[xy]/g,
                function (e) {
                  var t = (16 * Math.random()) | 0;
                  return ("x" == e ? t : (3 & t) | 8).toString(16);
                }
              );
            });
        },
        {},
      ],
      17: [
        function (e, t, r) {
          "use strict";
          (r.byteLength = function (e) {
            var e = f(e),
              t = e[0],
              e = e[1];
            return (3 * (t + e)) / 4 - e;
          }),
            (r.toByteArray = function (e) {
              var t,
                r,
                n = f(e),
                o = n[0],
                n = n[1],
                i = new l(
                  (function (e, t) {
                    return (3 * (e + t)) / 4 - t;
                  })(o, n)
                ),
                u = 0,
                a = 0 < n ? o - 4 : o;
              for (r = 0; r < a; r += 4)
                (t =
                  (s[e.charCodeAt(r)] << 18) |
                  (s[e.charCodeAt(r + 1)] << 12) |
                  (s[e.charCodeAt(r + 2)] << 6) |
                  s[e.charCodeAt(r + 3)]),
                  (i[u++] = (t >> 16) & 255),
                  (i[u++] = (t >> 8) & 255),
                  (i[u++] = 255 & t);
              2 === n &&
                ((t =
                  (s[e.charCodeAt(r)] << 2) | (s[e.charCodeAt(r + 1)] >> 4)),
                (i[u++] = 255 & t));
              1 === n &&
                ((t =
                  (s[e.charCodeAt(r)] << 10) |
                  (s[e.charCodeAt(r + 1)] << 4) |
                  (s[e.charCodeAt(r + 2)] >> 2)),
                (i[u++] = (t >> 8) & 255),
                (i[u++] = 255 & t));
              return i;
            }),
            (r.fromByteArray = function (e) {
              for (
                var t, r = e.length, n = r % 3, o = [], i = 0, u = r - n;
                i < u;
                i += 16383
              )
                o.push(
                  (function (e, t, r) {
                    for (var n, o = [], i = t; i < r; i += 3)
                      (n =
                        ((e[i] << 16) & 16711680) +
                        ((e[i + 1] << 8) & 65280) +
                        (255 & e[i + 2])),
                        o.push(
                          (function (e) {
                            return (
                              a[(e >> 18) & 63] +
                              a[(e >> 12) & 63] +
                              a[(e >> 6) & 63] +
                              a[63 & e]
                            );
                          })(n)
                        );
                    return o.join("");
                  })(e, i, u < i + 16383 ? u : i + 16383)
                );
              1 == n
                ? ((t = e[r - 1]), o.push(a[t >> 2] + a[(t << 4) & 63] + "=="))
                : 2 == n &&
                  ((t = (e[r - 2] << 8) + e[r - 1]),
                  o.push(
                    a[t >> 10] + a[(t >> 4) & 63] + a[(t << 2) & 63] + "="
                  ));
              return o.join("");
            });
          for (
            var a = [],
              s = [],
              l = "undefined" != typeof Uint8Array ? Uint8Array : Array,
              n =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
              o = 0,
              i = n.length;
            o < i;
            ++o
          )
            (a[o] = n[o]), (s[n.charCodeAt(o)] = o);
          function f(e) {
            var t = e.length;
            if (0 < t % 4)
              throw new Error("Invalid string. Length must be a multiple of 4");
            (e = e.indexOf("=")),
              (t = (e = -1 === e ? t : e) === t ? 0 : 4 - (e % 4));
            return [e, t];
          }
          (s["-".charCodeAt(0)] = 62), (s["_".charCodeAt(0)] = 63);
        },
        {},
      ],
      18: [
        function (C, e, j) {
          !function (e) {
            !function () {
              "use strict";
              var S = C("base64-js"),
                i = C("ieee754"),
                t =
                  ((j.Buffer = c),
                  (j.SlowBuffer = function (e) {
                    +e != e && (e = 0);
                    return c.alloc(+e);
                  }),
                  (j.INSPECT_MAX_BYTES = 50),
                  2147483647);
              function s(e) {
                if (t < e)
                  throw new RangeError(
                    'The value "' + e + '" is invalid for option "size"'
                  );
                e = new Uint8Array(e);
                return (e.__proto__ = c.prototype), e;
              }
              function c(e, t, r) {
                if ("number" != typeof e) return n(e, t, r);
                if ("string" == typeof t)
                  throw new TypeError(
                    'The "string" argument must be of type string. Received type number'
                  );
                return u(e);
              }
              function n(e, t, r) {
                if ("string" == typeof e) {
                  var n = e,
                    o = t;
                  if (
                    !c.isEncoding(
                      (o = "string" == typeof o && "" !== o ? o : "utf8")
                    )
                  )
                    throw new TypeError("Unknown encoding: " + o);
                  var i = 0 | p(n, o),
                    u = s(i);
                  return (u = (n = u.write(n, o)) !== i ? u.slice(0, n) : u);
                }
                if (ArrayBuffer.isView(e)) return l(e);
                if (null == e)
                  throw TypeError(
                    "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                      typeof e
                  );
                if (x(e, ArrayBuffer) || (e && x(e.buffer, ArrayBuffer))) {
                  (o = e), (i = t), (n = r);
                  if (i < 0 || o.byteLength < i)
                    throw new RangeError(
                      '"offset" is outside of buffer bounds'
                    );
                  if (o.byteLength < i + (n || 0))
                    throw new RangeError(
                      '"length" is outside of buffer bounds'
                    );
                  return (
                    ((o =
                      void 0 === i && void 0 === n
                        ? new Uint8Array(o)
                        : void 0 === n
                        ? new Uint8Array(o, i)
                        : new Uint8Array(o, i, n)).__proto__ = c.prototype),
                    o
                  );
                }
                if ("number" == typeof e)
                  throw new TypeError(
                    'The "value" argument must not be of type number. Received type number'
                  );
                u = e.valueOf && e.valueOf();
                if (null != u && u !== e) return c.from(u, t, r);
                var a = (function (e) {
                  {
                    var t, r;
                    if (c.isBuffer(e))
                      return (
                        (t = 0 | f(e.length)),
                        0 === (r = s(t)).length || e.copy(r, 0, 0, t),
                        r
                      );
                  }
                  if (void 0 !== e.length)
                    return "number" != typeof e.length || B(e.length)
                      ? s(0)
                      : l(e);
                  if ("Buffer" === e.type && Array.isArray(e.data))
                    return l(e.data);
                })(e);
                if (a) return a;
                if (
                  "undefined" != typeof Symbol &&
                  null != Symbol.toPrimitive &&
                  "function" == typeof e[Symbol.toPrimitive]
                )
                  return c.from(e[Symbol.toPrimitive]("string"), t, r);
                throw new TypeError(
                  "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                    typeof e
                );
              }
              function o(e) {
                if ("number" != typeof e)
                  throw new TypeError('"size" argument must be of type number');
                if (e < 0)
                  throw new RangeError(
                    'The value "' + e + '" is invalid for option "size"'
                  );
              }
              function u(e) {
                return o(e), s(e < 0 ? 0 : 0 | f(e));
              }
              function l(e) {
                for (
                  var t = e.length < 0 ? 0 : 0 | f(e.length), r = s(t), n = 0;
                  n < t;
                  n += 1
                )
                  r[n] = 255 & e[n];
                return r;
              }
              function f(e) {
                if (t <= e)
                  throw new RangeError(
                    "Attempt to allocate Buffer larger than maximum size: 0x" +
                      t.toString(16) +
                      " bytes"
                  );
                return 0 | e;
              }
              function p(e, t) {
                if (c.isBuffer(e)) return e.length;
                if (ArrayBuffer.isView(e) || x(e, ArrayBuffer))
                  return e.byteLength;
                if ("string" != typeof e)
                  throw new TypeError(
                    'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
                      typeof e
                  );
                var r = e.length,
                  n = 2 < arguments.length && !0 === arguments[2];
                if (!n && 0 === r) return 0;
                for (var o = !1; ; )
                  switch (t) {
                    case "ascii":
                    case "latin1":
                    case "binary":
                      return r;
                    case "utf8":
                    case "utf-8":
                      return A(e).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                      return 2 * r;
                    case "hex":
                      return r >>> 1;
                    case "base64":
                      return R(e).length;
                    default:
                      if (o) return n ? -1 : A(e).length;
                      (t = ("" + t).toLowerCase()), (o = !0);
                  }
              }
              function r(e, t, r) {
                var n,
                  o = !1;
                if ((t = void 0 === t || t < 0 ? 0 : t) > this.length)
                  return "";
                if (
                  (r = void 0 === r || r > this.length ? this.length : r) <= 0
                )
                  return "";
                if ((r >>>= 0) <= (t >>>= 0)) return "";
                for (e = e || "utf8"; ; )
                  switch (e) {
                    case "hex":
                      var i = this,
                        u = t,
                        a = r,
                        s = i.length;
                      (!a || a < 0 || s < a) && (a = s);
                      for (
                        var l = "", f = (u = !u || u < 0 ? 0 : u);
                        f < a;
                        ++f
                      )
                        l += (function (e) {
                          return e < 16 ? "0" + e.toString(16) : e.toString(16);
                        })(i[f]);
                      return l;
                    case "utf8":
                    case "utf-8":
                      return O(this, t, r);
                    case "ascii":
                      var c = this,
                        s = t,
                        p = r,
                        h = "";
                      p = Math.min(c.length, p);
                      for (var d = s; d < p; ++d)
                        h += String.fromCharCode(127 & c[d]);
                      return h;
                    case "latin1":
                    case "binary":
                      var y = this,
                        u = t,
                        g = r,
                        v = "";
                      g = Math.min(y.length, g);
                      for (var b = u; b < g; ++b)
                        v += String.fromCharCode(y[b]);
                      return v;
                    case "base64":
                      return (
                        (m = this),
                        (n = r),
                        0 === (w = t) && n === m.length
                          ? S.fromByteArray(m)
                          : S.fromByteArray(m.slice(w, n))
                      );
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                      for (
                        var m = t, w = r, _ = this.slice(m, w), U = "", E = 0;
                        E < _.length;
                        E += 2
                      )
                        U += String.fromCharCode(_[E] + 256 * _[E + 1]);
                      return U;
                    default:
                      if (o) throw new TypeError("Unknown encoding: " + e);
                      (e = (e + "").toLowerCase()), (o = !0);
                  }
              }
              function a(e, t, r) {
                var n = e[t];
                (e[t] = e[r]), (e[r] = n);
              }
              function h(e, t, r, n, o) {
                if (0 === e.length) return -1;
                if (
                  ("string" == typeof r
                    ? ((n = r), (r = 0))
                    : 2147483647 < r
                    ? (r = 2147483647)
                    : r < -2147483648 && (r = -2147483648),
                  (r =
                    (r = B((r = +r)) ? (o ? 0 : e.length - 1) : r) < 0
                      ? e.length + r
                      : r) >= e.length)
                ) {
                  if (o) return -1;
                  r = e.length - 1;
                } else if (r < 0) {
                  if (!o) return -1;
                  r = 0;
                }
                if (("string" == typeof t && (t = c.from(t, n)), c.isBuffer(t)))
                  return 0 === t.length ? -1 : d(e, t, r, n, o);
                if ("number" == typeof t)
                  return (
                    (t &= 255),
                    "function" == typeof Uint8Array.prototype.indexOf
                      ? (o
                          ? Uint8Array.prototype.indexOf
                          : Uint8Array.prototype.lastIndexOf
                        ).call(e, t, r)
                      : d(e, [t], r, n, o)
                  );
                throw new TypeError("val must be string, number or Buffer");
              }
              function d(e, t, r, n, o) {
                var i = 1,
                  u = e.length,
                  a = t.length;
                if (
                  void 0 !== n &&
                  ("ucs2" === (n = String(n).toLowerCase()) ||
                    "ucs-2" === n ||
                    "utf16le" === n ||
                    "utf-16le" === n)
                ) {
                  if (e.length < 2 || t.length < 2) return -1;
                  (u /= i = 2), (a /= 2), (r /= 2);
                }
                function s(e, t) {
                  return 1 === i ? e[t] : e.readUInt16BE(t * i);
                }
                if (o)
                  for (var l = -1, f = r; f < u; f++)
                    if (s(e, f) === s(t, -1 === l ? 0 : f - l)) {
                      if (f - (l = -1 === l ? f : l) + 1 === a) return l * i;
                    } else -1 !== l && (f -= f - l), (l = -1);
                else
                  for (f = r = u < r + a ? u - a : r; 0 <= f; f--) {
                    for (var c = !0, p = 0; p < a; p++)
                      if (s(e, f + p) !== s(t, p)) {
                        c = !1;
                        break;
                      }
                    if (c) return f;
                  }
                return -1;
              }
              function g(e, t, r, n) {
                return P(
                  (function (e) {
                    for (var t = [], r = 0; r < e.length; ++r)
                      t.push(255 & e.charCodeAt(r));
                    return t;
                  })(t),
                  e,
                  r,
                  n
                );
              }
              function v(e, t, r, n) {
                return P(
                  (function (e, t) {
                    for (
                      var r, n, o = [], i = 0;
                      i < e.length && !((t -= 2) < 0);
                      ++i
                    )
                      (n = e.charCodeAt(i)),
                        (r = n >> 8),
                        (n = n % 256),
                        o.push(n),
                        o.push(r);
                    return o;
                  })(t, e.length - r),
                  e,
                  r,
                  n
                );
              }
              function O(e, t, r) {
                r = Math.min(e.length, r);
                for (var n = [], o = t; o < r; ) {
                  var i,
                    u,
                    a,
                    s,
                    l = e[o],
                    f = null,
                    c = 239 < l ? 4 : 223 < l ? 3 : 191 < l ? 2 : 1;
                  if (o + c <= r)
                    switch (c) {
                      case 1:
                        l < 128 && (f = l);
                        break;
                      case 2:
                        128 == (192 & (i = e[o + 1])) &&
                          127 < (s = ((31 & l) << 6) | (63 & i)) &&
                          (f = s);
                        break;
                      case 3:
                        (i = e[o + 1]),
                          (u = e[o + 2]),
                          128 == (192 & i) &&
                            128 == (192 & u) &&
                            2047 <
                              (s =
                                ((15 & l) << 12) |
                                ((63 & i) << 6) |
                                (63 & u)) &&
                            (s < 55296 || 57343 < s) &&
                            (f = s);
                        break;
                      case 4:
                        (i = e[o + 1]),
                          (u = e[o + 2]),
                          (a = e[o + 3]),
                          128 == (192 & i) &&
                            128 == (192 & u) &&
                            128 == (192 & a) &&
                            65535 <
                              (s =
                                ((15 & l) << 18) |
                                ((63 & i) << 12) |
                                ((63 & u) << 6) |
                                (63 & a)) &&
                            s < 1114112 &&
                            (f = s);
                    }
                  null === f
                    ? ((f = 65533), (c = 1))
                    : 65535 < f &&
                      ((f -= 65536),
                      n.push(((f >>> 10) & 1023) | 55296),
                      (f = 56320 | (1023 & f))),
                    n.push(f),
                    (o += c);
                }
                var p = n,
                  h = p.length;
                if (h <= b) return String.fromCharCode.apply(String, p);
                for (var d = "", y = 0; y < h; )
                  d += String.fromCharCode.apply(String, p.slice(y, (y += b)));
                return d;
              }
              (j.kMaxLength = t),
                (c.TYPED_ARRAY_SUPPORT = (function () {
                  try {
                    var e = new Uint8Array(1);
                    return (
                      (e.__proto__ = {
                        __proto__: Uint8Array.prototype,
                        foo: function () {
                          return 42;
                        },
                      }),
                      42 === e.foo()
                    );
                  } catch (e) {
                    return !1;
                  }
                })()) ||
                  "undefined" == typeof console ||
                  "function" != typeof console.error ||
                  console.error(
                    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
                  ),
                Object.defineProperty(c.prototype, "parent", {
                  enumerable: !0,
                  get: function () {
                    if (c.isBuffer(this)) return this.buffer;
                  },
                }),
                Object.defineProperty(c.prototype, "offset", {
                  enumerable: !0,
                  get: function () {
                    if (c.isBuffer(this)) return this.byteOffset;
                  },
                }),
                "undefined" != typeof Symbol &&
                  null != Symbol.species &&
                  c[Symbol.species] === c &&
                  Object.defineProperty(c, Symbol.species, {
                    value: null,
                    configurable: !0,
                    enumerable: !1,
                    writable: !1,
                  }),
                (c.poolSize = 8192),
                (c.from = n),
                (c.prototype.__proto__ = Uint8Array.prototype),
                (c.__proto__ = Uint8Array),
                (c.alloc = function (e, t, r) {
                  return (
                    (t = t),
                    (r = r),
                    o((e = e)),
                    !(e <= 0) && void 0 !== t
                      ? "string" == typeof r
                        ? s(e).fill(t, r)
                        : s(e).fill(t)
                      : s(e)
                  );
                }),
                (c.allocUnsafe = u),
                (c.allocUnsafeSlow = u),
                (c.isBuffer = function (e) {
                  return null != e && !0 === e._isBuffer && e !== c.prototype;
                }),
                (c.compare = function (e, t) {
                  if (
                    (x(e, Uint8Array) &&
                      (e = c.from(e, e.offset, e.byteLength)),
                    x(t, Uint8Array) && (t = c.from(t, t.offset, t.byteLength)),
                    !c.isBuffer(e) || !c.isBuffer(t))
                  )
                    throw new TypeError(
                      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
                    );
                  if (e === t) return 0;
                  for (
                    var r = e.length, n = t.length, o = 0, i = Math.min(r, n);
                    o < i;
                    ++o
                  )
                    if (e[o] !== t[o]) {
                      (r = e[o]), (n = t[o]);
                      break;
                    }
                  return r < n ? -1 : n < r ? 1 : 0;
                }),
                (c.isEncoding = function (e) {
                  switch (String(e).toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "latin1":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                      return !0;
                    default:
                      return !1;
                  }
                }),
                (c.concat = function (e, t) {
                  if (!Array.isArray(e))
                    throw new TypeError(
                      '"list" argument must be an Array of Buffers'
                    );
                  if (0 === e.length) return c.alloc(0);
                  if (void 0 === t)
                    for (o = t = 0; o < e.length; ++o) t += e[o].length;
                  for (
                    var r = c.allocUnsafe(t), n = 0, o = 0;
                    o < e.length;
                    ++o
                  ) {
                    var i = e[o];
                    if ((x(i, Uint8Array) && (i = c.from(i)), !c.isBuffer(i)))
                      throw new TypeError(
                        '"list" argument must be an Array of Buffers'
                      );
                    i.copy(r, n), (n += i.length);
                  }
                  return r;
                }),
                (c.byteLength = p),
                (c.prototype._isBuffer = !0),
                (c.prototype.swap16 = function () {
                  var e = this.length;
                  if (e % 2 != 0)
                    throw new RangeError(
                      "Buffer size must be a multiple of 16-bits"
                    );
                  for (var t = 0; t < e; t += 2) a(this, t, t + 1);
                  return this;
                }),
                (c.prototype.swap32 = function () {
                  var e = this.length;
                  if (e % 4 != 0)
                    throw new RangeError(
                      "Buffer size must be a multiple of 32-bits"
                    );
                  for (var t = 0; t < e; t += 4)
                    a(this, t, t + 3), a(this, t + 1, t + 2);
                  return this;
                }),
                (c.prototype.swap64 = function () {
                  var e = this.length;
                  if (e % 8 != 0)
                    throw new RangeError(
                      "Buffer size must be a multiple of 64-bits"
                    );
                  for (var t = 0; t < e; t += 8)
                    a(this, t, t + 7),
                      a(this, t + 1, t + 6),
                      a(this, t + 2, t + 5),
                      a(this, t + 3, t + 4);
                  return this;
                }),
                (c.prototype.toLocaleString = c.prototype.toString =
                  function () {
                    var e = this.length;
                    return 0 === e
                      ? ""
                      : 0 === arguments.length
                      ? O(this, 0, e)
                      : r.apply(this, arguments);
                  }),
                (c.prototype.equals = function (e) {
                  if (c.isBuffer(e))
                    return this === e || 0 === c.compare(this, e);
                  throw new TypeError("Argument must be a Buffer");
                }),
                (c.prototype.inspect = function () {
                  var e = "",
                    t = j.INSPECT_MAX_BYTES,
                    e = this.toString("hex", 0, t)
                      .replace(/(.{2})/g, "$1 ")
                      .trim();
                  return (
                    this.length > t && (e += " ... "), "<Buffer " + e + ">"
                  );
                }),
                (c.prototype.compare = function (e, t, r, n, o) {
                  if (
                    (x(e, Uint8Array) &&
                      (e = c.from(e, e.offset, e.byteLength)),
                    !c.isBuffer(e))
                  )
                    throw new TypeError(
                      'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
                        typeof e
                    );
                  if (
                    (void 0 === r && (r = e ? e.length : 0),
                    void 0 === n && (n = 0),
                    void 0 === o && (o = this.length),
                    (t = void 0 === t ? 0 : t) < 0 ||
                      r > e.length ||
                      n < 0 ||
                      o > this.length)
                  )
                    throw new RangeError("out of range index");
                  if (o <= n && r <= t) return 0;
                  if (o <= n) return -1;
                  if (r <= t) return 1;
                  if (this === e) return 0;
                  for (
                    var i = (o >>>= 0) - (n >>>= 0),
                      u = (r >>>= 0) - (t >>>= 0),
                      a = Math.min(i, u),
                      s = this.slice(n, o),
                      l = e.slice(t, r),
                      f = 0;
                    f < a;
                    ++f
                  )
                    if (s[f] !== l[f]) {
                      (i = s[f]), (u = l[f]);
                      break;
                    }
                  return i < u ? -1 : u < i ? 1 : 0;
                }),
                (c.prototype.includes = function (e, t, r) {
                  return -1 !== this.indexOf(e, t, r);
                }),
                (c.prototype.indexOf = function (e, t, r) {
                  return h(this, e, t, r, !0);
                }),
                (c.prototype.lastIndexOf = function (e, t, r) {
                  return h(this, e, t, r, !1);
                }),
                (c.prototype.write = function (e, t, r, n) {
                  if (void 0 === t) (n = "utf8"), (r = this.length), (t = 0);
                  else if (void 0 === r && "string" == typeof t)
                    (n = t), (r = this.length), (t = 0);
                  else {
                    if (!isFinite(t))
                      throw new Error(
                        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
                      );
                    (t >>>= 0),
                      isFinite(r)
                        ? ((r >>>= 0), void 0 === n && (n = "utf8"))
                        : ((n = r), (r = void 0));
                  }
                  var o = this.length - t;
                  if (
                    ((void 0 === r || o < r) && (r = o),
                    (0 < e.length && (r < 0 || t < 0)) || t > this.length)
                  )
                    throw new RangeError(
                      "Attempt to write outside buffer bounds"
                    );
                  n = n || "utf8";
                  for (var i, u, a, s = !1; ; )
                    switch (n) {
                      case "hex":
                        var l = this,
                          f = e,
                          c = t,
                          p = r,
                          h = ((c = Number(c) || 0), l.length - c);
                        (!p || h < (p = Number(p))) && (p = h),
                          (h = f.length) / 2 < p && (p = h / 2);
                        for (var d = 0; d < p; ++d) {
                          var y = parseInt(f.substr(2 * d, 2), 16);
                          if (B(y)) return d;
                          l[c + d] = y;
                        }
                        return d;
                      case "utf8":
                      case "utf-8":
                        return (
                          (h = t),
                          (a = r),
                          P(A(e, (u = this).length - h), u, h, a)
                        );
                      case "ascii":
                        return g(this, e, t, r);
                      case "latin1":
                      case "binary":
                        return g(this, e, t, r);
                      case "base64":
                        return (u = this), (a = t), (i = r), P(R(e), u, a, i);
                      case "ucs2":
                      case "ucs-2":
                      case "utf16le":
                      case "utf-16le":
                        return v(this, e, t, r);
                      default:
                        if (s) throw new TypeError("Unknown encoding: " + n);
                        (n = ("" + n).toLowerCase()), (s = !0);
                    }
                }),
                (c.prototype.toJSON = function () {
                  return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0),
                  };
                });
              var b = 4096;
              function y(e, t, r) {
                if (e % 1 != 0 || e < 0)
                  throw new RangeError("offset is not uint");
                if (r < e + t)
                  throw new RangeError("Trying to access beyond buffer length");
              }
              function m(e, t, r, n, o, i) {
                if (!c.isBuffer(e))
                  throw new TypeError(
                    '"buffer" argument must be a Buffer instance'
                  );
                if (o < t || t < i)
                  throw new RangeError('"value" argument is out of bounds');
                if (r + n > e.length)
                  throw new RangeError("Index out of range");
              }
              function w(e, t, r, n) {
                if (r + n > e.length)
                  throw new RangeError("Index out of range");
                if (r < 0) throw new RangeError("Index out of range");
              }
              function _(e, t, r, n, o) {
                return (
                  (t = +t),
                  (r >>>= 0),
                  o || w(e, 0, r, 4),
                  i.write(e, t, r, n, 23, 4),
                  r + 4
                );
              }
              function U(e, t, r, n, o) {
                return (
                  (t = +t),
                  (r >>>= 0),
                  o || w(e, 0, r, 8),
                  i.write(e, t, r, n, 52, 8),
                  r + 8
                );
              }
              (c.prototype.slice = function (e, t) {
                var r = this.length,
                  r =
                    ((e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : r < e && (e = r),
                    (t = void 0 === t ? r : ~~t) < 0
                      ? (t += r) < 0 && (t = 0)
                      : r < t && (t = r),
                    t < e && (t = e),
                    this.subarray(e, t));
                return (r.__proto__ = c.prototype), r;
              }),
                (c.prototype.readUIntLE = function (e, t, r) {
                  (e >>>= 0), (t >>>= 0), r || y(e, t, this.length);
                  for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256); )
                    n += this[e + i] * o;
                  return n;
                }),
                (c.prototype.readUIntBE = function (e, t, r) {
                  (e >>>= 0), (t >>>= 0), r || y(e, t, this.length);
                  for (var n = this[e + --t], o = 1; 0 < t && (o *= 256); )
                    n += this[e + --t] * o;
                  return n;
                }),
                (c.prototype.readUInt8 = function (e, t) {
                  return (e >>>= 0), t || y(e, 1, this.length), this[e];
                }),
                (c.prototype.readUInt16LE = function (e, t) {
                  return (
                    (e >>>= 0),
                    t || y(e, 2, this.length),
                    this[e] | (this[e + 1] << 8)
                  );
                }),
                (c.prototype.readUInt16BE = function (e, t) {
                  return (
                    (e >>>= 0),
                    t || y(e, 2, this.length),
                    (this[e] << 8) | this[e + 1]
                  );
                }),
                (c.prototype.readUInt32LE = function (e, t) {
                  return (
                    (e >>>= 0),
                    t || y(e, 4, this.length),
                    (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) +
                      16777216 * this[e + 3]
                  );
                }),
                (c.prototype.readUInt32BE = function (e, t) {
                  return (
                    (e >>>= 0),
                    t || y(e, 4, this.length),
                    16777216 * this[e] +
                      ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
                  );
                }),
                (c.prototype.readIntLE = function (e, t, r) {
                  (e >>>= 0), (t >>>= 0), r || y(e, t, this.length);
                  for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256); )
                    n += this[e + i] * o;
                  return (o *= 128) <= n && (n -= Math.pow(2, 8 * t)), n;
                }),
                (c.prototype.readIntBE = function (e, t, r) {
                  (e >>>= 0), (t >>>= 0), r || y(e, t, this.length);
                  for (
                    var n = t, o = 1, i = this[e + --n];
                    0 < n && (o *= 256);

                  )
                    i += this[e + --n] * o;
                  return (o *= 128) <= i && (i -= Math.pow(2, 8 * t)), i;
                }),
                (c.prototype.readInt8 = function (e, t) {
                  return (
                    (e >>>= 0),
                    t || y(e, 1, this.length),
                    128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
                  );
                }),
                (c.prototype.readInt16LE = function (e, t) {
                  (e >>>= 0), t || y(e, 2, this.length);
                  t = this[e] | (this[e + 1] << 8);
                  return 32768 & t ? 4294901760 | t : t;
                }),
                (c.prototype.readInt16BE = function (e, t) {
                  (e >>>= 0), t || y(e, 2, this.length);
                  t = this[e + 1] | (this[e] << 8);
                  return 32768 & t ? 4294901760 | t : t;
                }),
                (c.prototype.readInt32LE = function (e, t) {
                  return (
                    (e >>>= 0),
                    t || y(e, 4, this.length),
                    this[e] |
                      (this[e + 1] << 8) |
                      (this[e + 2] << 16) |
                      (this[e + 3] << 24)
                  );
                }),
                (c.prototype.readInt32BE = function (e, t) {
                  return (
                    (e >>>= 0),
                    t || y(e, 4, this.length),
                    (this[e] << 24) |
                      (this[e + 1] << 16) |
                      (this[e + 2] << 8) |
                      this[e + 3]
                  );
                }),
                (c.prototype.readFloatLE = function (e, t) {
                  return (
                    (e >>>= 0),
                    t || y(e, 4, this.length),
                    i.read(this, e, !0, 23, 4)
                  );
                }),
                (c.prototype.readFloatBE = function (e, t) {
                  return (
                    (e >>>= 0),
                    t || y(e, 4, this.length),
                    i.read(this, e, !1, 23, 4)
                  );
                }),
                (c.prototype.readDoubleLE = function (e, t) {
                  return (
                    (e >>>= 0),
                    t || y(e, 8, this.length),
                    i.read(this, e, !0, 52, 8)
                  );
                }),
                (c.prototype.readDoubleBE = function (e, t) {
                  return (
                    (e >>>= 0),
                    t || y(e, 8, this.length),
                    i.read(this, e, !1, 52, 8)
                  );
                }),
                (c.prototype.writeUIntLE = function (e, t, r, n) {
                  (e = +e),
                    (t >>>= 0),
                    (r >>>= 0),
                    n || m(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                  var o = 1,
                    i = 0;
                  for (this[t] = 255 & e; ++i < r && (o *= 256); )
                    this[t + i] = (e / o) & 255;
                  return t + r;
                }),
                (c.prototype.writeUIntBE = function (e, t, r, n) {
                  (e = +e),
                    (t >>>= 0),
                    (r >>>= 0),
                    n || m(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                  var o = r - 1,
                    i = 1;
                  for (this[t + o] = 255 & e; 0 <= --o && (i *= 256); )
                    this[t + o] = (e / i) & 255;
                  return t + r;
                }),
                (c.prototype.writeUInt8 = function (e, t, r) {
                  return (
                    (e = +e),
                    (t >>>= 0),
                    r || m(this, e, t, 1, 255, 0),
                    (this[t] = 255 & e),
                    t + 1
                  );
                }),
                (c.prototype.writeUInt16LE = function (e, t, r) {
                  return (
                    (e = +e),
                    (t >>>= 0),
                    r || m(this, e, t, 2, 65535, 0),
                    (this[t] = 255 & e),
                    (this[t + 1] = e >>> 8),
                    t + 2
                  );
                }),
                (c.prototype.writeUInt16BE = function (e, t, r) {
                  return (
                    (e = +e),
                    (t >>>= 0),
                    r || m(this, e, t, 2, 65535, 0),
                    (this[t] = e >>> 8),
                    (this[t + 1] = 255 & e),
                    t + 2
                  );
                }),
                (c.prototype.writeUInt32LE = function (e, t, r) {
                  return (
                    (e = +e),
                    (t >>>= 0),
                    r || m(this, e, t, 4, 4294967295, 0),
                    (this[t + 3] = e >>> 24),
                    (this[t + 2] = e >>> 16),
                    (this[t + 1] = e >>> 8),
                    (this[t] = 255 & e),
                    t + 4
                  );
                }),
                (c.prototype.writeUInt32BE = function (e, t, r) {
                  return (
                    (e = +e),
                    (t >>>= 0),
                    r || m(this, e, t, 4, 4294967295, 0),
                    (this[t] = e >>> 24),
                    (this[t + 1] = e >>> 16),
                    (this[t + 2] = e >>> 8),
                    (this[t + 3] = 255 & e),
                    t + 4
                  );
                }),
                (c.prototype.writeIntLE = function (e, t, r, n) {
                  (e = +e),
                    (t >>>= 0),
                    n || m(this, e, t, r, (n = Math.pow(2, 8 * r - 1)) - 1, -n);
                  var o = 0,
                    i = 1,
                    u = 0;
                  for (this[t] = 255 & e; ++o < r && (i *= 256); )
                    e < 0 && 0 === u && 0 !== this[t + o - 1] && (u = 1),
                      (this[t + o] = (((e / i) >> 0) - u) & 255);
                  return t + r;
                }),
                (c.prototype.writeIntBE = function (e, t, r, n) {
                  (e = +e),
                    (t >>>= 0),
                    n || m(this, e, t, r, (n = Math.pow(2, 8 * r - 1)) - 1, -n);
                  var o = r - 1,
                    i = 1,
                    u = 0;
                  for (this[t + o] = 255 & e; 0 <= --o && (i *= 256); )
                    e < 0 && 0 === u && 0 !== this[t + o + 1] && (u = 1),
                      (this[t + o] = (((e / i) >> 0) - u) & 255);
                  return t + r;
                }),
                (c.prototype.writeInt8 = function (e, t, r) {
                  return (
                    (e = +e),
                    (t >>>= 0),
                    r || m(this, e, t, 1, 127, -128),
                    (this[t] = 255 & (e = e < 0 ? 255 + e + 1 : e)),
                    t + 1
                  );
                }),
                (c.prototype.writeInt16LE = function (e, t, r) {
                  return (
                    (e = +e),
                    (t >>>= 0),
                    r || m(this, e, t, 2, 32767, -32768),
                    (this[t] = 255 & e),
                    (this[t + 1] = e >>> 8),
                    t + 2
                  );
                }),
                (c.prototype.writeInt16BE = function (e, t, r) {
                  return (
                    (e = +e),
                    (t >>>= 0),
                    r || m(this, e, t, 2, 32767, -32768),
                    (this[t] = e >>> 8),
                    (this[t + 1] = 255 & e),
                    t + 2
                  );
                }),
                (c.prototype.writeInt32LE = function (e, t, r) {
                  return (
                    (e = +e),
                    (t >>>= 0),
                    r || m(this, e, t, 4, 2147483647, -2147483648),
                    (this[t] = 255 & e),
                    (this[t + 1] = e >>> 8),
                    (this[t + 2] = e >>> 16),
                    (this[t + 3] = e >>> 24),
                    t + 4
                  );
                }),
                (c.prototype.writeInt32BE = function (e, t, r) {
                  return (
                    (e = +e),
                    (t >>>= 0),
                    r || m(this, e, t, 4, 2147483647, -2147483648),
                    (this[t] = (e = e < 0 ? 4294967295 + e + 1 : e) >>> 24),
                    (this[t + 1] = e >>> 16),
                    (this[t + 2] = e >>> 8),
                    (this[t + 3] = 255 & e),
                    t + 4
                  );
                }),
                (c.prototype.writeFloatLE = function (e, t, r) {
                  return _(this, e, t, !0, r);
                }),
                (c.prototype.writeFloatBE = function (e, t, r) {
                  return _(this, e, t, !1, r);
                }),
                (c.prototype.writeDoubleLE = function (e, t, r) {
                  return U(this, e, t, !0, r);
                }),
                (c.prototype.writeDoubleBE = function (e, t, r) {
                  return U(this, e, t, !1, r);
                }),
                (c.prototype.copy = function (e, t, r, n) {
                  if (!c.isBuffer(e))
                    throw new TypeError("argument should be a Buffer");
                  if (
                    ((r = r || 0),
                    n || 0 === n || (n = this.length),
                    t >= e.length && (t = e.length),
                    (n = 0 < n && n < r ? r : n) === r)
                  )
                    return 0;
                  if (0 === e.length || 0 === this.length) return 0;
                  if ((t = t || 0) < 0)
                    throw new RangeError("targetStart out of bounds");
                  if (r < 0 || r >= this.length)
                    throw new RangeError("Index out of range");
                  if (n < 0) throw new RangeError("sourceEnd out of bounds");
                  n > this.length && (n = this.length);
                  var o = (n = e.length - t < n - r ? e.length - t + r : n) - r;
                  if (
                    this === e &&
                    "function" == typeof Uint8Array.prototype.copyWithin
                  )
                    this.copyWithin(t, r, n);
                  else if (this === e && r < t && t < n)
                    for (var i = o - 1; 0 <= i; --i) e[i + t] = this[i + r];
                  else Uint8Array.prototype.set.call(e, this.subarray(r, n), t);
                  return o;
                }),
                (c.prototype.fill = function (e, t, r, n) {
                  if ("string" == typeof e) {
                    if (
                      ("string" == typeof t
                        ? ((n = t), (t = 0), (r = this.length))
                        : "string" == typeof r && ((n = r), (r = this.length)),
                      void 0 !== n && "string" != typeof n)
                    )
                      throw new TypeError("encoding must be a string");
                    if ("string" == typeof n && !c.isEncoding(n))
                      throw new TypeError("Unknown encoding: " + n);
                    var o;
                    1 === e.length &&
                      ((o = e.charCodeAt(0)),
                      (("utf8" === n && o < 128) || "latin1" === n) && (e = o));
                  } else "number" == typeof e && (e &= 255);
                  if (t < 0 || this.length < t || this.length < r)
                    throw new RangeError("Out of range index");
                  if (r <= t) return this;
                  var i;
                  if (
                    ((t >>>= 0),
                    (r = void 0 === r ? this.length : r >>> 0),
                    "number" == typeof (e = e || 0))
                  )
                    for (i = t; i < r; ++i) this[i] = e;
                  else {
                    var u = c.isBuffer(e) ? e : c.from(e, n),
                      a = u.length;
                    if (0 === a)
                      throw new TypeError(
                        'The value "' + e + '" is invalid for argument "value"'
                      );
                    for (i = 0; i < r - t; ++i) this[i + t] = u[i % a];
                  }
                  return this;
                });
              var E = /[^+/0-9A-Za-z-_]/g;
              function A(e, t) {
                t = t || 1 / 0;
                for (var r, n = e.length, o = null, i = [], u = 0; u < n; ++u) {
                  if (55295 < (r = e.charCodeAt(u)) && r < 57344) {
                    if (!o) {
                      if (56319 < r) {
                        -1 < (t -= 3) && i.push(239, 191, 189);
                        continue;
                      }
                      if (u + 1 === n) {
                        -1 < (t -= 3) && i.push(239, 191, 189);
                        continue;
                      }
                      o = r;
                      continue;
                    }
                    if (r < 56320) {
                      -1 < (t -= 3) && i.push(239, 191, 189), (o = r);
                      continue;
                    }
                    r = 65536 + (((o - 55296) << 10) | (r - 56320));
                  } else o && -1 < (t -= 3) && i.push(239, 191, 189);
                  if (((o = null), r < 128)) {
                    if (--t < 0) break;
                    i.push(r);
                  } else if (r < 2048) {
                    if ((t -= 2) < 0) break;
                    i.push((r >> 6) | 192, (63 & r) | 128);
                  } else if (r < 65536) {
                    if ((t -= 3) < 0) break;
                    i.push(
                      (r >> 12) | 224,
                      ((r >> 6) & 63) | 128,
                      (63 & r) | 128
                    );
                  } else {
                    if (!(r < 1114112)) throw new Error("Invalid code point");
                    if ((t -= 4) < 0) break;
                    i.push(
                      (r >> 18) | 240,
                      ((r >> 12) & 63) | 128,
                      ((r >> 6) & 63) | 128,
                      (63 & r) | 128
                    );
                  }
                }
                return i;
              }
              function R(e) {
                return S.toByteArray(
                  (function (e) {
                    if (
                      (e = (e = e.split("=")[0]).trim().replace(E, "")).length <
                      2
                    )
                      return "";
                    for (; e.length % 4 != 0; ) e += "=";
                    return e;
                  })(e)
                );
              }
              function P(e, t, r, n) {
                for (
                  var o = 0;
                  o < n && !(o + r >= t.length || o >= e.length);
                  ++o
                )
                  t[o + r] = e[o];
                return o;
              }
              function x(e, t) {
                return (
                  e instanceof t ||
                  (null != e &&
                    null != e.constructor &&
                    null != e.constructor.name &&
                    e.constructor.name === t.name)
                );
              }
              function B(e) {
                return e != e;
              }
            }.call(this);
          }.call(this, C("buffer").Buffer);
        },
        { "base64-js": 17, buffer: 18, ieee754: 19 },
      ],
      19: [
        function (e, t, r) {
          (r.read = function (e, t, r, n, o) {
            var i,
              u,
              a = 8 * o - n - 1,
              s = (1 << a) - 1,
              l = s >> 1,
              f = -7,
              c = r ? o - 1 : 0,
              p = r ? -1 : 1,
              o = e[t + c];
            for (
              c += p, i = o & ((1 << -f) - 1), o >>= -f, f += a;
              0 < f;
              i = 256 * i + e[t + c], c += p, f -= 8
            );
            for (
              u = i & ((1 << -f) - 1), i >>= -f, f += n;
              0 < f;
              u = 256 * u + e[t + c], c += p, f -= 8
            );
            if (0 === i) i = 1 - l;
            else {
              if (i === s) return u ? NaN : (1 / 0) * (o ? -1 : 1);
              (u += Math.pow(2, n)), (i -= l);
            }
            return (o ? -1 : 1) * u * Math.pow(2, i - n);
          }),
            (r.write = function (e, t, r, n, o, i) {
              var u,
                a,
                s = 8 * i - o - 1,
                l = (1 << s) - 1,
                f = l >> 1,
                c = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                p = n ? 0 : i - 1,
                h = n ? 1 : -1,
                i = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0;
              for (
                t = Math.abs(t),
                  isNaN(t) || t === 1 / 0
                    ? ((a = isNaN(t) ? 1 : 0), (u = l))
                    : ((u = Math.floor(Math.log(t) / Math.LN2)),
                      t * (n = Math.pow(2, -u)) < 1 && (u--, (n *= 2)),
                      2 <=
                        (t += 1 <= u + f ? c / n : c * Math.pow(2, 1 - f)) *
                          n && (u++, (n /= 2)),
                      l <= u + f
                        ? ((a = 0), (u = l))
                        : 1 <= u + f
                        ? ((a = (t * n - 1) * Math.pow(2, o)), (u += f))
                        : ((a = t * Math.pow(2, f - 1) * Math.pow(2, o)),
                          (u = 0)));
                8 <= o;
                e[r + p] = 255 & a, p += h, a /= 256, o -= 8
              );
              for (
                u = (u << o) | a, s += o;
                0 < s;
                e[r + p] = 255 & u, p += h, u /= 256, s -= 8
              );
              e[r + p - h] |= 128 * i;
            });
        },
        {},
      ],
      20: [
        function (e, i, u) {
          !function (o, D) {
            !function () {
              var e, t, r, n;
              (e =
                "undefined" != typeof self
                  ? self
                  : "undefined" != typeof window
                  ? window
                  : void 0 !== o
                  ? o
                  : this),
                (t = function () {
                  "use strict";
                  function r(e) {
                    return e.replace(/=/g, "").replace(/[+\/]/g, function (e) {
                      return "+" == e ? "-" : "_";
                    });
                  }
                  function e(e) {
                    for (
                      var t, r, n, o = "", i = e.length % 3, u = 0;
                      u < e.length;

                    ) {
                      if (
                        255 < (t = e.charCodeAt(u++)) ||
                        255 < (r = e.charCodeAt(u++)) ||
                        255 < (n = e.charCodeAt(u++))
                      )
                        throw new TypeError("invalid character found");
                      o +=
                        U[((t = (t << 16) | (r << 8) | n) >> 18) & 63] +
                        U[(t >> 12) & 63] +
                        U[(t >> 6) & 63] +
                        U[63 & t];
                    }
                    return i ? o.slice(0, i - 3) + "===".substring(i) : o;
                  }
                  function t(e, t) {
                    return (t = void 0 === t ? !1 : t) ? r(x(e)) : x(e);
                  }
                  function n(e) {
                    var t;
                    return e.length < 2
                      ? (t = e.charCodeAt(0)) < 128
                        ? e
                        : t < 2048
                        ? O(192 | (t >>> 6)) + O(128 | (63 & t))
                        : O(224 | ((t >>> 12) & 15)) +
                          O(128 | ((t >>> 6) & 63)) +
                          O(128 | (63 & t))
                      : ((t =
                          65536 +
                          1024 * (e.charCodeAt(0) - 55296) +
                          (e.charCodeAt(1) - 56320)),
                        O(240 | ((t >>> 18) & 7)) +
                          O(128 | ((t >>> 12) & 63)) +
                          O(128 | ((t >>> 6) & 63)) +
                          O(128 | (63 & t)));
                  }
                  function o(e) {
                    return e.replace(B, n);
                  }
                  function i(e, t) {
                    return (t = void 0 === t ? !1 : t) ? r(C(e)) : C(e);
                  }
                  function u(e) {
                    return i(e, !0);
                  }
                  function a(e) {
                    switch (e.length) {
                      case 4:
                        var t =
                          (((7 & e.charCodeAt(0)) << 18) |
                            ((63 & e.charCodeAt(1)) << 12) |
                            ((63 & e.charCodeAt(2)) << 6) |
                            (63 & e.charCodeAt(3))) -
                          65536;
                        return O(55296 + (t >>> 10)) + O(56320 + (1023 & t));
                      case 3:
                        return O(
                          ((15 & e.charCodeAt(0)) << 12) |
                            ((63 & e.charCodeAt(1)) << 6) |
                            (63 & e.charCodeAt(2))
                        );
                      default:
                        return O(
                          ((31 & e.charCodeAt(0)) << 6) | (63 & e.charCodeAt(1))
                        );
                    }
                  }
                  function s(e) {
                    return e.replace(j, a);
                  }
                  function l(e) {
                    if (((e = e.replace(/\s+/g, "")), !S.test(e)))
                      throw new TypeError("malformed base64.");
                    e += "==".slice(2 - (3 & e.length));
                    for (var t, r, n, o = "", i = 0; i < e.length; )
                      (t =
                        (E[e.charAt(i++)] << 18) |
                        (E[e.charAt(i++)] << 12) |
                        ((r = E[e.charAt(i++)]) << 6) |
                        (n = E[e.charAt(i++)])),
                        (o +=
                          64 === r
                            ? O((t >> 16) & 255)
                            : 64 === n
                            ? O((t >> 16) & 255, (t >> 8) & 255)
                            : O((t >> 16) & 255, (t >> 8) & 255, 255 & t));
                    return o;
                  }
                  function f(e) {
                    return T(c(e));
                  }
                  function c(e) {
                    return R(
                      e.replace(/[-_]/g, function (e) {
                        return "-" == e ? "+" : "/";
                      })
                    );
                  }
                  function p(e) {
                    return I(c(e));
                  }
                  function h(e) {
                    return {
                      value: e,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0,
                    };
                  }
                  function d() {
                    function e(e, t) {
                      Object.defineProperty(String.prototype, e, h(t));
                    }
                    e("fromBase64", function () {
                      return p(this);
                    }),
                      e("toBase64", function (e) {
                        return i(this, e);
                      }),
                      e("toBase64URI", function () {
                        return i(this, !0);
                      }),
                      e("toBase64URL", function () {
                        return i(this, !0);
                      }),
                      e("toUint8Array", function () {
                        return f(this);
                      });
                  }
                  function y() {
                    function e(e, t) {
                      Object.defineProperty(Uint8Array.prototype, e, h(t));
                    }
                    e("toBase64", function (e) {
                      return t(this, e);
                    }),
                      e("toBase64URI", function () {
                        return t(this, !0);
                      }),
                      e("toBase64URL", function () {
                        return t(this, !0);
                      });
                  }
                  var g,
                    v = "function" == typeof atob,
                    b = "function" == typeof btoa,
                    m = "function" == typeof D,
                    w =
                      "function" == typeof TextDecoder
                        ? new TextDecoder()
                        : void 0,
                    _ =
                      "function" == typeof TextEncoder
                        ? new TextEncoder()
                        : void 0,
                    U = Array.prototype.slice.call(
                      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
                    ),
                    E =
                      ((g = {}),
                      U.forEach(function (e, t) {
                        return (g[e] = t);
                      }),
                      g),
                    S =
                      /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/,
                    O = String.fromCharCode.bind(String),
                    A =
                      "function" == typeof Uint8Array.from
                        ? Uint8Array.from.bind(Uint8Array)
                        : function (e, t) {
                            return (
                              void 0 === t &&
                                (t = function (e) {
                                  return e;
                                }),
                              new Uint8Array(
                                Array.prototype.slice.call(e, 0).map(t)
                              )
                            );
                          },
                    R = function (e) {
                      return e.replace(/[^A-Za-z0-9\+\/]/g, "");
                    },
                    P = b
                      ? function (e) {
                          return btoa(e);
                        }
                      : m
                      ? function (e) {
                          return D.from(e, "binary").toString("base64");
                        }
                      : e,
                    x = m
                      ? function (e) {
                          return D.from(e).toString("base64");
                        }
                      : function (e) {
                          for (
                            var t = [], r = 0, n = e.length;
                            r < n;
                            r += 4096
                          )
                            t.push(O.apply(null, e.subarray(r, r + 4096)));
                          return P(t.join(""));
                        },
                    B = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,
                    C = m
                      ? function (e) {
                          return D.from(e, "utf8").toString("base64");
                        }
                      : _
                      ? function (e) {
                          return x(_.encode(e));
                        }
                      : function (e) {
                          return P(o(e));
                        },
                    j =
                      /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,
                    k = v
                      ? function (e) {
                          return atob(R(e));
                        }
                      : m
                      ? function (e) {
                          return D.from(e, "base64").toString("binary");
                        }
                      : l,
                    T = m
                      ? function (e) {
                          return A(D.from(e, "base64"));
                        }
                      : function (e) {
                          return A(k(e), function (e) {
                            return e.charCodeAt(0);
                          });
                        },
                    I = m
                      ? function (e) {
                          return D.from(e, "base64").toString("utf8");
                        }
                      : w
                      ? function (e) {
                          return w.decode(T(e));
                        }
                      : function (e) {
                          return s(k(e));
                        },
                    L = {
                      version: "3.7.2",
                      VERSION: "3.7.2",
                      atob: k,
                      atobPolyfill: l,
                      btoa: P,
                      btoaPolyfill: e,
                      fromBase64: p,
                      toBase64: i,
                      encode: i,
                      encodeURI: u,
                      encodeURL: u,
                      utob: o,
                      btou: s,
                      decode: p,
                      isValid: function (e) {
                        if ("string" != typeof e) return !1;
                        e = e.replace(/\s+/g, "").replace(/={0,2}$/, "");
                        return (
                          !/[^\s0-9a-zA-Z\+/]/.test(e) ||
                          !/[^\s0-9a-zA-Z\-_]/.test(e)
                        );
                      },
                      fromUint8Array: t,
                      toUint8Array: f,
                      extendString: d,
                      extendUint8Array: y,
                      extendBuiltins: function () {
                        d(), y();
                      },
                      Base64: {},
                    };
                  return (
                    Object.keys(L).forEach(function (e) {
                      return (L.Base64[e] = L[e]);
                    }),
                    L
                  );
                }),
                "object" == typeof u && void 0 !== i
                  ? (i.exports = t())
                  : ((r = e.Base64),
                    ((n = t()).noConflict = function () {
                      return (e.Base64 = r), n;
                    }),
                    e.Meteor && (Base64 = n),
                    (e.Base64 = n));
            }.call(this);
          }.call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {},
            e("buffer").Buffer
          );
        },
        { buffer: 18 },
      ],
      21: [
        function (e, t, r) {
          "use strict";
          var i = Object.prototype.hasOwnProperty;
          function u(e) {
            try {
              return decodeURIComponent(e.replace(/\+/g, " "));
            } catch (e) {
              return null;
            }
          }
          function a(e) {
            try {
              return encodeURIComponent(e);
            } catch (e) {
              return null;
            }
          }
          (r.stringify = function (e, t) {
            var r,
              n,
              o = [];
            for (n in ("string" != typeof (t = t || "") && (t = "?"), e))
              i.call(e, n) &&
                ((r = e[n]) || (null != r && !isNaN(r)) || (r = ""),
                (n = a(n)),
                (r = a(r)),
                null !== n && null !== r && o.push(n + "=" + r));
            return o.length ? t + o.join("&") : "";
          }),
            (r.parse = function (e) {
              for (var t = /([^=?#&]+)=?([^&]*)/g, r = {}; (o = t.exec(e)); ) {
                var n = u(o[1]),
                  o = u(o[2]);
                null === n || null === o || n in r || (r[n] = o);
              }
              return r;
            });
        },
        {},
      ],
      22: [
        function (e, t, r) {
          "use strict";
          t.exports = function (e, t) {
            if (((t = t.split(":")[0]), !(e = +e))) return !1;
            switch (t) {
              case "http":
              case "ws":
                return 80 !== e;
              case "https":
              case "wss":
                return 443 !== e;
              case "ftp":
                return 21 !== e;
              case "gopher":
                return 70 !== e;
              case "file":
                return !1;
            }
            return 0 !== e;
          };
        },
        {},
      ],
      23: [
        function (e, r, t) {
          !function (u) {
            !function () {
              "use strict";
              var p = e("requires-port"),
                h = e("querystringify"),
                t =
                  /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/,
                d = /[\n\r\t]/g,
                o = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//,
                a = /:\d+$/,
                s = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i,
                y = /^[a-zA-Z]:/;
              function g(e) {
                return (e || "").toString().replace(t, "");
              }
              var v = [
                  ["#", "hash"],
                  ["?", "query"],
                  function (e, t) {
                    return m(t.protocol) ? e.replace(/\\/g, "/") : e;
                  },
                  ["/", "pathname"],
                  ["@", "auth", 1],
                  [NaN, "host", void 0, 1, 1],
                  [/:(\d*)$/, "port", void 0, 1],
                  [NaN, "hostname", void 0, 1, 1],
                ],
                i = { hash: 1, query: 1 };
              function b(e) {
                var t,
                  r =
                    "undefined" != typeof window
                      ? window
                      : void 0 !== u
                      ? u
                      : "undefined" != typeof self
                      ? self
                      : {},
                  r = r.location || {},
                  n = {},
                  r = typeof (e = e || r);
                if ("blob:" === e.protocol) n = new _(unescape(e.pathname), {});
                else if ("string" == r)
                  for (t in ((n = new _(e, {})), i)) delete n[t];
                else if ("object" == r) {
                  for (t in e) t in i || (n[t] = e[t]);
                  void 0 === n.slashes && (n.slashes = o.test(e.href));
                }
                return n;
              }
              function m(e) {
                return (
                  "file:" === e ||
                  "ftp:" === e ||
                  "http:" === e ||
                  "https:" === e ||
                  "ws:" === e ||
                  "wss:" === e
                );
              }
              function w(e, t) {
                (e = (e = g(e)).replace(d, "")), (t = t || {});
                var r,
                  e = s.exec(e),
                  n = e[1] ? e[1].toLowerCase() : "",
                  o = !!e[2],
                  i = !!e[3],
                  u = 0;
                return (
                  o
                    ? (u = i
                        ? ((r = e[2] + e[3] + e[4]), e[2].length + e[3].length)
                        : ((r = e[2] + e[4]), e[2].length))
                    : i
                    ? ((r = e[3] + e[4]), (u = e[3].length))
                    : (r = e[4]),
                  "file:" === n
                    ? 2 <= u && (r = r.slice(2))
                    : m(n)
                    ? (r = e[4])
                    : n
                    ? o && (r = r.slice(2))
                    : 2 <= u && m(t.protocol) && (r = e[4]),
                  { protocol: n, slashes: o || m(n), slashesCount: u, rest: r }
                );
              }
              function _(e, t, r) {
                if (((e = (e = g(e)).replace(d, "")), !(this instanceof _)))
                  return new _(e, t, r);
                var n,
                  o,
                  i,
                  u,
                  a,
                  s = v.slice(),
                  l = typeof t,
                  f = this,
                  c = 0;
                for (
                  "object" != l && "string" != l && ((r = t), (t = null)),
                    r && "function" != typeof r && (r = h.parse),
                    n = !(l = w(e || "", (t = b(t)))).protocol && !l.slashes,
                    f.slashes = l.slashes || (n && t.slashes),
                    f.protocol = l.protocol || t.protocol || "",
                    e = l.rest,
                    (("file:" === l.protocol &&
                      (2 !== l.slashesCount || y.test(e))) ||
                      (!l.slashes &&
                        (l.protocol ||
                          l.slashesCount < 2 ||
                          !m(f.protocol)))) &&
                      (s[3] = [/(.*)/, "pathname"]);
                  c < s.length;
                  c++
                )
                  "function" == typeof (i = s[c])
                    ? (e = i(e, f))
                    : ((o = i[0]),
                      (a = i[1]),
                      o != o
                        ? (f[a] = e)
                        : "string" == typeof o
                        ? ~(u = "@" === o ? e.lastIndexOf(o) : e.indexOf(o)) &&
                          (e =
                            "number" == typeof i[2]
                              ? ((f[a] = e.slice(0, u)), e.slice(u + i[2]))
                              : ((f[a] = e.slice(u)), e.slice(0, u)))
                        : (u = o.exec(e)) &&
                          ((f[a] = u[1]), (e = e.slice(0, u.index))),
                      (f[a] = f[a] || (n && i[3] && t[a]) || ""),
                      i[4] && (f[a] = f[a].toLowerCase()));
                r && (f.query = r(f.query)),
                  n &&
                    t.slashes &&
                    "/" !== f.pathname.charAt(0) &&
                    ("" !== f.pathname || "" !== t.pathname) &&
                    (f.pathname = (function (e, t) {
                      if ("" === e) return t;
                      for (
                        var r = (t || "/")
                            .split("/")
                            .slice(0, -1)
                            .concat(e.split("/")),
                          n = r.length,
                          t = r[n - 1],
                          o = !1,
                          i = 0;
                        n--;

                      )
                        "." === r[n]
                          ? r.splice(n, 1)
                          : ".." === r[n]
                          ? (r.splice(n, 1), i++)
                          : i && (0 === n && (o = !0), r.splice(n, 1), i--);
                      return (
                        o && r.unshift(""),
                        ("." !== t && ".." !== t) || r.push(""),
                        r.join("/")
                      );
                    })(f.pathname, t.pathname)),
                  "/" !== f.pathname.charAt(0) &&
                    m(f.protocol) &&
                    (f.pathname = "/" + f.pathname),
                  p(f.port, f.protocol) ||
                    ((f.host = f.hostname), (f.port = "")),
                  (f.username = f.password = ""),
                  f.auth &&
                    (~(u = f.auth.indexOf(":"))
                      ? ((f.username = f.auth.slice(0, u)),
                        (f.username = encodeURIComponent(
                          decodeURIComponent(f.username)
                        )),
                        (f.password = f.auth.slice(u + 1)),
                        (f.password = encodeURIComponent(
                          decodeURIComponent(f.password)
                        )))
                      : (f.username = encodeURIComponent(
                          decodeURIComponent(f.auth)
                        )),
                    (f.auth = f.password
                      ? f.username + ":" + f.password
                      : f.username)),
                  (f.origin =
                    "file:" !== f.protocol && m(f.protocol) && f.host
                      ? f.protocol + "//" + f.host
                      : "null"),
                  (f.href = f.toString());
              }
              (_.prototype = {
                set: function (e, t, r) {
                  var n = this;
                  switch (e) {
                    case "query":
                      "string" == typeof t &&
                        t.length &&
                        (t = (r || h.parse)(t)),
                        (n[e] = t);
                      break;
                    case "port":
                      (n[e] = t),
                        p(t, n.protocol)
                          ? t && (n.host = n.hostname + ":" + t)
                          : ((n.host = n.hostname), (n[e] = ""));
                      break;
                    case "hostname":
                      (n[e] = t), n.port && (t += ":" + n.port), (n.host = t);
                      break;
                    case "host":
                      (n[e] = t),
                        a.test(t)
                          ? ((t = t.split(":")),
                            (n.port = t.pop()),
                            (n.hostname = t.join(":")))
                          : ((n.hostname = t), (n.port = ""));
                      break;
                    case "protocol":
                      (n.protocol = t.toLowerCase()), (n.slashes = !r);
                      break;
                    case "pathname":
                    case "hash":
                      t
                        ? ((o = "pathname" === e ? "/" : "#"),
                          (n[e] = t.charAt(0) !== o ? o + t : t))
                        : (n[e] = t);
                      break;
                    case "username":
                    case "password":
                      n[e] = encodeURIComponent(t);
                      break;
                    case "auth":
                      var o = t.indexOf(":");
                      ~o
                        ? ((n.username = t.slice(0, o)),
                          (n.username = encodeURIComponent(
                            decodeURIComponent(n.username)
                          )),
                          (n.password = t.slice(o + 1)),
                          (n.password = encodeURIComponent(
                            decodeURIComponent(n.password)
                          )))
                        : (n.username = encodeURIComponent(
                            decodeURIComponent(t)
                          ));
                  }
                  for (var i = 0; i < v.length; i++) {
                    var u = v[i];
                    u[4] && (n[u[1]] = n[u[1]].toLowerCase());
                  }
                  return (
                    (n.auth = n.password
                      ? n.username + ":" + n.password
                      : n.username),
                    (n.origin =
                      "file:" !== n.protocol && m(n.protocol) && n.host
                        ? n.protocol + "//" + n.host
                        : "null"),
                    (n.href = n.toString()),
                    n
                  );
                },
                toString: function (e) {
                  (e && "function" == typeof e) || (e = h.stringify);
                  var t = this,
                    r = t.host,
                    n =
                      ((n = t.protocol) &&
                        ":" !== n.charAt(n.length - 1) &&
                        (n += ":"),
                      n +
                        ((t.protocol && t.slashes) || m(t.protocol)
                          ? "//"
                          : ""));
                  return (
                    t.username
                      ? ((n += t.username),
                        t.password && (n += ":" + t.password),
                        (n += "@"))
                      : t.password
                      ? (n = n + (":" + t.password) + "@")
                      : "file:" !== t.protocol &&
                        m(t.protocol) &&
                        !r &&
                        "/" !== t.pathname &&
                        (n += "@"),
                    (":" === r[r.length - 1] ||
                      (a.test(t.hostname) && !t.port)) &&
                      (r += ":"),
                    (n += r + t.pathname),
                    (r = "object" == typeof t.query ? e(t.query) : t.query) &&
                      (n += "?" !== r.charAt(0) ? "?" + r : r),
                    t.hash && (n += t.hash),
                    n
                  );
                },
              }),
                (_.extractProtocol = w),
                (_.location = b),
                (_.trimLeft = g),
                (_.qs = h),
                (r.exports = _);
            }.call(this);
          }.call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          );
        },
        { querystringify: 21, "requires-port": 22 },
      ],
    },
    {},
    [4]
  )(4);
});
//# sourceMappingURL=tus.min.js.map
