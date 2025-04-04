var Module = function (n) {
  var r,
    t,
    e,
    o,
    a,
    i,
    u,
    f,
    c,
    s,
    l,
    v,
    p,
    d,
    h,
    g,
    m,
    y,
    $,
    w,
    _,
    n = void 0 !== (n = n || {}) ? n : {};
  n.ready = new Promise(function (n, e) {
    r = n, t = e;
  });
  var b = {};
  for (e in n) n.hasOwnProperty(e) && (b[e] = n[e]);
  var T = [],
    P = "./this.program",
    A = function (n, r) {
      throw r;
    },
    C = "";
  C = 0 !== (C = self.location.href).indexOf("blob:")
    ? C.substr(0, C.lastIndexOf("/") + 1)
    : "",
    o = function (n) {
      var r = new XMLHttpRequest();
      return r.open("GET", n, !1), r.send(null), r.responseText;
    },
    i = function (n) {
      var r = new XMLHttpRequest();
      return r.open("GET", n, !1),
        r.responseType = "arraybuffer",
        r.send(null),
        new Uint8Array(r.response);
    },
    a = function (n, r, t) {
      var e = new XMLHttpRequest();
      e.open("GET", n, !0),
        e.responseType = "arraybuffer",
        e.onload = function () {
          if (200 == e.status || 0 == e.status && e.response) {
            r(e.response);
            return;
          }
          t();
        },
        e.onerror = t,
        e.send(null);
    },
    u = function (n) {
      document.title = n;
    };
  var k = n.print || console.log.bind(console),
    E = n.printErr || console.warn.bind(console);
  for (e in b) b.hasOwnProperty(e) && (n[e] = b[e]);
  b = null,
    n.arguments && (T = n.arguments),
    n.thisProgram && (P = n.thisProgram),
    n.quit && (A = n.quit);
  var W = 0,
    R = function (n) {
      W = n;
    };
  n.wasmBinary && (f = n.wasmBinary),
    n.noExitRuntime,
    "object" != typeof WebAssembly && Q("no native wasm support detected");
  var F = !1, j = new TextDecoder("utf8");
  function I(n, r) {
    if (!n) return "";
    for (var t = n + r, e = n; !(e >= t) && p[e];) ++e;
    return j.decode(p.subarray(n, e));
  }
  var S = new TextDecoder("utf-16le");
  function O(n, r) {
    for (var t = n, e = t >> 1, o = e + r / 2; !(e >= o) && h[e];) ++e;
    return t = e << 1, S.decode(p.subarray(n, t));
  }
  function x(n, r, t) {
    if (void 0 === t && (t = 2147483647), t < 2) return 0;
    for (
      var e = r, o = (t -= 2) < 2 * n.length ? t / 2 : n.length, a = 0;
      a < o;
      ++a
    ) {
      var i = n.charCodeAt(a);
      d[r >> 1] = i, r += 2;
    }
    return d[r >> 1] = 0, r - e;
  }
  function B(n) {
    return 2 * n.length;
  }
  function U(n, r) {
    for (var t = 0, e = ""; !(t >= r / 4);) {
      var o = g[n + 4 * t >> 2];
      if (0 == o) break;
      if (++t, o >= 65536) {
        var a = o - 65536;
        e += String.fromCharCode(55296 | a >> 10, 56320 | 1023 & a);
      } else e += String.fromCharCode(o);
    }
    return e;
  }
  function D(n, r, t) {
    if (void 0 === t && (t = 2147483647), t < 4) return 0;
    for (var e = r, o = e + t - 4, a = 0; a < n.length; ++a) {
      var i = n.charCodeAt(a);
      if (
        i >= 55296 && i <= 57343 &&
        (i = 65536 + ((1023 & i) << 10) | 1023 & n.charCodeAt(++a)),
          g[r >> 2] = i,
          (r += 4) + 4 > o
      ) break;
    }
    return g[r >> 2] = 0, r - e;
  }
  function H(n) {
    for (var r = 0, t = 0; t < n.length; ++t) {
      var e = n.charCodeAt(t);
      e >= 55296 && e <= 57343 && ++t, r += 4;
    }
    return r;
  }
  function M(n, r) {
    return n % r > 0 && (n += r - n % r), n;
  }
  function V(r) {
    l = r,
      n.HEAP8 = v = new Int8Array(r),
      n.HEAP16 = d = new Int16Array(r),
      n.HEAP32 = g = new Int32Array(r),
      n.HEAPU8 = p = new Uint8Array(r),
      n.HEAPU16 = h = new Uint16Array(r),
      n.HEAPU32 = m = new Uint32Array(r),
      n.HEAPF32 = y = new Float32Array(r),
      n.HEAPF64 = $ = new Float64Array(r);
  }
  n.INITIAL_MEMORY;
  var z = [], q = [], N = [], G = !1;
  function L(n) {
    z.unshift(n);
  }
  function J(n) {
    N.unshift(n);
  }
  var Y = 0, Z = null, K = null;
  function Q(r) {
    n.onAbort && n.onAbort(r),
      E(r += ""),
      F = !0,
      s = 1,
      r = "abort(" + r + "). Build with -s ASSERTIONS=1 for more info.";
    var e = new WebAssembly.RuntimeError(r);
    throw t(e), e;
  }
  function X(n) {
    return n.startsWith("data:application/octet-stream;base64,");
  }
  if (n.preloadedImages = {}, n.preloadedAudios = {}, n.locateFile) {
    var nn, nr = "jxl_dec.wasm";
    !X(nr) && (nr = (nn = nr, n.locateFile ? n.locateFile(nn, C) : C + nn));
  } else var nr = "jxl_dec.wasm";
  function nt(n) {
    try {
      if (n == nr && f) return new Uint8Array(f);
      if (i) return i(n);
      throw "both async and sync fetching of the wasm failed";
    } catch (r) {
      Q(r);
    }
  }
  function ne(r) {
    for (; r.length > 0;) {
      var t = r.shift();
      if ("function" == typeof t) {
        t(n);
        continue;
      }
      var e = t.func;
      "number" == typeof e
        ? void 0 === t.arg ? w.get(e)() : w.get(e)(t.arg)
        : e(void 0 === t.arg ? null : t.arg);
    }
  }
  function no(n) {
    switch (n) {
      case 1:
        return 0;
      case 2:
        return 1;
      case 4:
        return 2;
      case 8:
        return 3;
      default:
        throw TypeError("Unknown type size: " + n);
    }
  }
  var na = void 0;
  function ni(n) {
    for (var r = "", t = n; p[t];) r += na[p[t++]];
    return r;
  }
  var nu = {}, nf = {}, nc = {};
  function ns(n) {
    if (void 0 === n) return "_unknown";
    var r = (n = n.replace(/[^a-zA-Z0-9_]/g, "$")).charCodeAt(0);
    return r >= 48 && r <= 57 ? "_" + n : n;
  }
  function nl(n, r) {
    return Function(
      "body",
      "return function " + (n = ns(n)) +
        '() {\n    "use strict";    return body.apply(this, arguments);\n};\n',
    )(r);
  }
  function nv(n, r) {
    var t = nl(r, function (n) {
      this.name = r, this.message = n;
      var t = Error(n).stack;
      void 0 !== t &&
        (this.stack = this.toString() + "\n" +
          t.replace(/^Error(:[^\n]*)?\n/, ""));
    });
    return t.prototype = Object.create(n.prototype),
      t.prototype.constructor = t,
      t.prototype.toString = function () {
        return void 0 === this.message
          ? this.name
          : this.name + ": " + this.message;
      },
      t;
  }
  var np = void 0;
  function nd(n) {
    throw new np(n);
  }
  var nh = void 0;
  function ng(n) {
    throw new nh(n);
  }
  function nm(n, r, t) {
    if (t = t || {}, !("argPackAdvance" in r)) {
      throw TypeError(
        "registerType registeredInstance requires argPackAdvance",
      );
    }
    var e = r.name;
    if (
      n || nd('type "' + e + '" must have a positive integer typeid pointer'),
        nf.hasOwnProperty(n)
    ) {
      if (t.ignoreDuplicateRegistrations) return;
      nd("Cannot register type '" + e + "' twice");
    }
    if (nf[n] = r, delete nc[n], nu.hasOwnProperty(n)) {
      var o = nu[n];
      delete nu[n],
        o.forEach(function (n) {
          n();
        });
    }
  }
  var ny = [],
    n$ = [{}, { value: void 0 }, { value: null }, { value: !0 }, { value: !1 }];
  function nw(n) {
    n > 4 && 0 == --n$[n].refcount && (n$[n] = void 0, ny.push(n));
  }
  function n0(n) {
    switch (n) {
      case void 0:
        return 1;
      case null:
        return 2;
      case !0:
        return 3;
      case !1:
        return 4;
      default:
        var r = ny.length ? ny.pop() : n$.length;
        return n$[r] = { refcount: 1, value: n }, r;
    }
  }
  function n_(n) {
    return this.fromWireType(m[n >> 2]);
  }
  function nb(n) {
    if (null === n) return "null";
    var r = typeof n;
    return "object" === r || "array" === r || "function" === r
      ? n.toString()
      : "" + n;
  }
  function n8(n) {
    for (; n.length;) {
      var r = n.pop();
      n.pop()(r);
    }
  }
  var nT = void 0;
  function n2(n) {
    var r = nj(n), t = ni(r);
    return nF(r), t;
  }
  var n4 = {};
  function n1() {
    return "object" == typeof globalThis
      ? globalThis
      : Function("return this")();
  }
  function n3(n, r) {
    var t = nf[n];
    return void 0 === t && nd(r + " has unknown type " + n2(n)), t;
  }
  var nP = {};
  function nA(n) {
    try {
      return c.grow(n - l.byteLength + 65535 >>> 16), V(c.buffer), 1;
    } catch (r) {}
  }
  var nC = {
    mappings: {},
    buffers: [null, [], []],
    printChar: function (n, r) {
      var t = nC.buffers[n];
      0 === r || 10 === r
        ? ((1 === n ? k : E)(function n(r, t, e) {
          for (var o = t + void 0, a = t; r[a] && !(a >= o);) ++a;
          return j.decode(
            r.subarray ? r.subarray(t, a) : new Uint8Array(r.slice(t, a)),
          );
        }(t, 0)),
          t.length = 0)
        : t.push(r);
    },
    varargs: void 0,
    get: function () {
      return nC.varargs += 4, g[nC.varargs - 4 >> 2];
    },
    getStr: function (n) {
      return I(n);
    },
    get64: function (n, r) {
      return n;
    },
  };
  function nk(n) {
    return 0;
  }
  function nE(n) {
    R(n);
  }
  !function n() {
    for (var r = Array(256), t = 0; t < 256; ++t) r[t] = String.fromCharCode(t);
    na = r;
  }(),
    np = n.BindingError = nv(Error, "BindingError"),
    nh = n.InternalError = nv(Error, "InternalError"),
    n.count_emval_handles = function n() {
      for (var r = 0, t = 5; t < n$.length; ++t) void 0 !== n$[t] && ++r;
      return r;
    },
    n.get_first_emval = function n() {
      for (var r = 5; r < n$.length; ++r) if (void 0 !== n$[r]) return n$[r];
      return null;
    },
    nT = n.UnboundTypeError = nv(Error, "UnboundTypeError");
  var nW = {
    b: function n(r, t, e, o) {
      Q(
        "Assertion failed: " + I(r) + ", at: " +
          [t ? I(t) : "unknown filename", e, o ? I(o) : "unknown function"],
      );
    },
    m: function n(r, t) {
      var e, o;
    },
    r: function n(r, t, e, o, a) {},
    n: function n(r, t, e, o, a) {
      var i = no(e);
      t = ni(t),
        nm(r, {
          name: t,
          fromWireType: function (n) {
            return !!n;
          },
          toWireType: function (n, r) {
            return r ? o : a;
          },
          argPackAdvance: 8,
          readValueFromPointer: function (n) {
            var r;
            if (1 === e) r = v;
            else if (2 === e) r = d;
            else if (4 === e) r = g;
            else throw TypeError("Unknown boolean type size: " + t);
            return this.fromWireType(r[n >> i]);
          },
          destructorFunction: null,
        });
    },
    w: function n(r, t) {
      t = ni(t),
        nm(r, {
          name: t,
          fromWireType: function (n) {
            var r = n$[n].value;
            return nw(n), r;
          },
          toWireType: function (n, r) {
            return n0(r);
          },
          argPackAdvance: 8,
          readValueFromPointer: n_,
          destructorFunction: null,
        });
    },
    j: function n(r, t, e) {
      var o = no(e);
      t = ni(t),
        nm(r, {
          name: t,
          fromWireType: function (n) {
            return n;
          },
          toWireType: function (n, r) {
            if ("number" != typeof r && "boolean" != typeof r) {
              throw TypeError('Cannot convert "' + nb(r) + '" to ' + this.name);
            }
            return r;
          },
          argPackAdvance: 8,
          readValueFromPointer: function n(r, t) {
            switch (t) {
              case 2:
                return function (n) {
                  return this.fromWireType(y[n >> 2]);
                };
              case 3:
                return function (n) {
                  return this.fromWireType($[n >> 3]);
                };
              default:
                throw TypeError("Unknown float type: " + r);
            }
          }(t, o),
          destructorFunction: null,
        });
    },
    p: function r(t, e, o, a, i, u) {
      var f,
        c,
        s,
        l,
        v,
        p,
        d = function n(r, t) {
          for (var e = [], o = 0; o < r; o++) e.push(g[(t >> 2) + o]);
          return e;
        }(e, o);
      t = ni(t),
        i = (f = a,
          c = i,
          f = ni(f),
          "function" != typeof (s = function r() {
              if (f.includes("j")) {
                var t, e, o;
                return t = f, e = c, o = [], function () {
                  o.length = arguments.length;
                  for (var r = 0; r < arguments.length; r++) {
                    o[r] = arguments[r];
                  }
                  return function r(t, e, o) {
                    if (t.includes("j")) {
                      var a, i, u, f;
                      return a = t,
                        i = e,
                        u = o,
                        f = n["dynCall_" + a],
                        u && u.length
                          ? f.apply(null, [i].concat(u))
                          : f.call(null, i);
                    }
                    return w.get(e).apply(null, o);
                  }(t, e, o);
                };
              }
              return w.get(c);
            }()) &&
          nd("unknown function pointer with signature " + f + ": " + c),
          s),
        l = t,
        v = function () {
          !function n(r, t) {
            var e = [], o = {};
            function a(n) {
              if (!o[n] && !nf[n]) {
                if (nc[n]) {
                  nc[n].forEach(a);
                  return;
                }
                e.push(n), o[n] = !0;
              }
            }
            throw t.forEach(a), new nT(r + ": " + e.map(n2).join([", "]));
          }("Cannot call " + t + " due to unbound types", d);
        },
        p = e - 1,
        n.hasOwnProperty(l)
          ? ((void 0 === p ||
            void 0 !== n[l].overloadTable &&
              void 0 !== n[l].overloadTable[p]) &&
            nd("Cannot register public name '" + l + "' twice"),
            function n(r, t, e) {
              if (void 0 === r[t].overloadTable) {
                var o = r[t];
                r[t] = function () {
                  return r[t].overloadTable.hasOwnProperty(arguments.length) ||
                    nd(
                      "Function '" + e +
                        "' called with an invalid number of arguments (" +
                        arguments.length + ") - expects one of (" +
                        r[t].overloadTable + ")!",
                    ),
                    r[t].overloadTable[arguments.length].apply(this, arguments);
                },
                  r[t].overloadTable = [],
                  r[t].overloadTable[o.argCount] = o;
              }
            }(n, l, l),
            n.hasOwnProperty(p) &&
            nd(
              "Cannot register multiple overloads of a function with the same number of arguments (" +
                p + ")!",
            ),
            n[l].overloadTable[p] = v)
          : (n[l] = v, void 0 !== p && (n[l].numArguments = p)),
        function n(r, t, e) {
          function o(n) {
            var t = e(n);
            t.length !== r.length && ng("Mismatched type converter count");
            for (var o = 0; o < r.length; ++o) nm(r[o], t[o]);
          }
          r.forEach(function (n) {
            nc[n] = t;
          });
          var a = Array(t.length), i = [], u = 0;
          t.forEach(function (n, r) {
            nf.hasOwnProperty(n)
              ? a[r] = nf[n]
              : (i.push(n),
                nu.hasOwnProperty(n) || (nu[n] = []),
                nu[n].push(function () {
                  a[r] = nf[n], ++u === i.length && o(a);
                }));
          }), 0 === i.length && o(a);
        }([], d, function (r) {
          var o, a, f, c = [r[0], null].concat(r.slice(1));
          return o = t,
            a = function n(r, t, e, o, a) {
              var i = t.length;
              i < 2 &&
                nd(
                  "argTypes array size mismatch! Must at least get return value and 'this' types!",
                );
              for (
                var u = null !== t[1] && !1, f = !1, c = 1;
                c < t.length;
                ++c
              ) {
                if (null !== t[c] && void 0 === t[c].destructorFunction) {
                  f = !0;
                  break;
                }
              }
              for (
                var s = "void" !== t[0].name, l = "", v = "", c = 0;
                c < i - 2;
                ++c
              ) {
                l += (0 !== c ? ", " : "") + "arg" + c,
                  v += (0 !== c ? ", " : "") + "arg" + c + "Wired";
              }
              var p = "return function " + ns(r) + "(" + l +
                ") {\nif (arguments.length !== " + (i - 2) +
                ") {\nthrowBindingError('function " + r +
                " called with ' + arguments.length + ' arguments, expected " +
                (i - 2) + " args!');\n}\n";
              f && (p += "var destructors = [];\n");
              var d = f ? "destructors" : "null",
                h = [
                  "throwBindingError",
                  "invoker",
                  "fn",
                  "runDestructors",
                  "retType",
                  "classParam",
                ],
                g = [nd, o, a, n8, t[0], t[1]];
              u &&
                (p += "var thisWired = classParam.toWireType(" + d +
                  ", this);\n");
              for (var c = 0; c < i - 2; ++c) {
                p += "var arg" + c + "Wired = argType" + c + ".toWireType(" +
                  d + ", arg" + c + "); // " + t[c + 2].name + "\n",
                  h.push("argType" + c),
                  g.push(t[c + 2]);
              }
              if (
                u && (v = "thisWired" + (v.length > 0 ? ", " : "") + v),
                  p += (s ? "var rv = " : "") + "invoker(fn" +
                    (v.length > 0 ? ", " : "") + v + ");\n",
                  f
              ) p += "runDestructors(destructors);\n";
              else {for (var c = u ? 1 : 2; c < t.length; ++c) {
                  var m = 1 === c ? "thisWired" : "arg" + (c - 2) + "Wired";
                  null !== t[c].destructorFunction &&
                    (p += m + "_dtor(" + m + "); // " + t[c].name + "\n",
                      h.push(m + "_dtor"),
                      g.push(t[c].destructorFunction));
                }}
              return s &&
                (p += "var ret = retType.fromWireType(rv);\nreturn ret;\n"),
                p += "}\n",
                h.push(p),
                (function n(r, t) {
                  if (!(r instanceof Function)) {
                    throw TypeError(
                      "new_ called with constructor type " + typeof r +
                        " which is not a function",
                    );
                  }
                  var e = nl(r.name || "unknownFunctionName", function () {});
                  e.prototype = r.prototype;
                  var o = new e(), a = r.apply(o, t);
                  return a instanceof Object ? a : o;
                })(Function, h).apply(null, g);
            }(t, c, null, i, u),
            f = e - 1,
            n.hasOwnProperty(o) || ng("Replacing nonexistant public symbol"),
            void 0 !== n[o].overloadTable && void 0 !== f
              ? n[o].overloadTable[f] = a
              : (n[o] = a, n[o].argCount = f),
            [];
        });
    },
    d: function n(r, t, e, o, a) {
      t = ni(t), -1 === a && (a = 4294967295);
      var i = no(e),
        u = function (n) {
          return n;
        };
      if (0 === o) {
        var f = 32 - 8 * e;
        u = function (n) {
          return n << f >>> f;
        };
      }
      var c = t.includes("unsigned");
      nm(r, {
        name: t,
        fromWireType: u,
        toWireType: function (n, r) {
          if ("number" != typeof r && "boolean" != typeof r) {
            throw TypeError('Cannot convert "' + nb(r) + '" to ' + this.name);
          }
          if (r < o || r > a) {
            throw TypeError(
              'Passing a number "' + nb(r) +
                '" from JS side to C/C++ side to an argument of type "' + t +
                '", which is outside the valid range [' + o + ", " + a + "]!",
            );
          }
          return c ? r >>> 0 : 0 | r;
        },
        argPackAdvance: 8,
        readValueFromPointer: function n(r, t, e) {
          switch (t) {
            case 0:
              return e
                ? function n(r) {
                  return v[r];
                }
                : function n(r) {
                  return p[r];
                };
            case 1:
              return e
                ? function n(r) {
                  return d[r >> 1];
                }
                : function n(r) {
                  return h[r >> 1];
                };
            case 2:
              return e
                ? function n(r) {
                  return g[r >> 2];
                }
                : function n(r) {
                  return m[r >> 2];
                };
            default:
              throw TypeError("Unknown integer type: " + r);
          }
        }(t, i, 0 !== o),
        destructorFunction: null,
      });
    },
    c: function n(r, t, e) {
      var o = [
        Int8Array,
        Uint8Array,
        Int16Array,
        Uint16Array,
        Int32Array,
        Uint32Array,
        Float32Array,
        Float64Array,
      ][t];
      function a(n) {
        var r = m, t = r[n >>= 2], e = r[n + 1];
        return new o(l, e, t);
      }
      e = ni(e),
        nm(r, {
          name: e,
          fromWireType: a,
          argPackAdvance: 8,
          readValueFromPointer: a,
        }, { ignoreDuplicateRegistrations: !0 });
    },
    k: function n(r, t) {
      var e = "std::string" === (t = ni(t));
      nm(r, {
        name: t,
        fromWireType: function (n) {
          var r, t = m[n >> 2];
          if (e) {
            for (var o = n + 4, a = 0; a <= t; ++a) {
              var i = n + 4 + a;
              if (a == t || 0 == p[i]) {
                var u = i - o, f = I(o, u);
                void 0 === r ? r = f : (r += "\0", r += f), o = i + 1;
              }
            }
          } else {
            for (var c = Array(t), a = 0; a < t; ++a) {
              c[a] = String.fromCharCode(p[n + 4 + a]);
            }
            r = c.join("");
          }
          return nF(n), r;
        },
        toWireType: function (n, r) {
          r instanceof ArrayBuffer && (r = new Uint8Array(r));
          var t, o, a, i, u = "string" == typeof r;
          u || r instanceof Uint8Array || r instanceof Uint8ClampedArray ||
            r instanceof Int8Array ||
            nd("Cannot pass non-string to std::string");
          var f = (i = e && u
              ? function () {
                return function n(r) {
                  for (var t = 0, e = 0; e < r.length; ++e) {
                    var o = r.charCodeAt(e);
                    o >= 55296 && o <= 57343 &&
                    (o = 65536 + ((1023 & o) << 10) | 1023 & r.charCodeAt(++e)),
                      o <= 127
                        ? ++t
                        : o <= 2047
                        ? t += 2
                        : o <= 65535
                        ? t += 3
                        : t += 4;
                  }
                  return t;
                }(r);
              }
              : function () {
                return r.length;
              })(),
            c = n6(4 + f + 1);
          if (m[c >> 2] = f, e && u) {
            t = r,
              o = c + 4,
              function n(r, t, e, o) {
                if (!(o > 0)) return 0;
                for (var a = e, i = e + o - 1, u = 0; u < r.length; ++u) {
                  var f = r.charCodeAt(u);
                  if (
                    f >= 55296 && f <= 57343 &&
                    (f = 65536 + ((1023 & f) << 10) | 1023 & r.charCodeAt(++u)),
                      f <= 127
                  ) {
                    if (e >= i) break;
                    t[e++] = f;
                  } else if (f <= 2047) {
                    if (e + 1 >= i) break;
                    t[e++] = 192 | f >> 6, t[e++] = 128 | 63 & f;
                  } else if (f <= 65535) {
                    if (e + 2 >= i) break;
                    t[e++] = 224 | f >> 12,
                      t[e++] = 128 | f >> 6 & 63,
                      t[e++] = 128 | 63 & f;
                  } else {
                    if (e + 3 >= i) break;
                    t[e++] = 240 | f >> 18,
                      t[e++] = 128 | f >> 12 & 63,
                      t[e++] = 128 | f >> 6 & 63,
                      t[e++] = 128 | 63 & f;
                  }
                }
                return t[e] = 0, e - a;
              }(t, p, o, a = f + 1);
          } else if (u) {
            for (var s = 0; s < f; ++s) {
              var l = r.charCodeAt(s);
              l > 255 &&
              (nF(c),
                nd("String has UTF-16 code units that do not fit in 8 bits")),
                p[c + 4 + s] = l;
            }
          } else for (var s = 0; s < f; ++s) p[c + 4 + s] = r[s];
          return null !== n && n.push(nF, c), c;
        },
        argPackAdvance: 8,
        readValueFromPointer: n_,
        destructorFunction: function (n) {
          nF(n);
        },
      });
    },
    g: function n(r, t, e) {
      var o, a, i, u, f;
      e = ni(e),
        2 === t
          ? (o = O,
            a = x,
            u = B,
            i = function () {
              return h;
            },
            f = 1)
          : 4 === t && (o = U,
            a = D,
            u = H,
            i = function () {
              return m;
            },
            f = 2),
        nm(r, {
          name: e,
          fromWireType: function (n) {
            for (var r, e = m[n >> 2], a = i(), u = n + 4, c = 0; c <= e; ++c) {
              var s = n + 4 + c * t;
              if (c == e || 0 == a[s >> f]) {
                var l = s - u, v = o(u, l);
                void 0 === r ? r = v : (r += "\0", r += v), u = s + t;
              }
            }
            return nF(n), r;
          },
          toWireType: function (n, r) {
            "string" != typeof r &&
              nd("Cannot pass non-string to C++ string type " + e);
            var o = u(r), i = n6(4 + o + t);
            return m[i >> 2] = o >> f,
              a(r, i + 4, o + t),
              null !== n && n.push(nF, i),
              i;
          },
          argPackAdvance: 8,
          readValueFromPointer: n_,
          destructorFunction: function (n) {
            nF(n);
          },
        });
    },
    o: function n(r, t) {
      t = ni(t),
        nm(r, {
          isVoid: !0,
          name: t,
          argPackAdvance: 0,
          fromWireType: function () {},
          toWireType: function (n, r) {},
        });
    },
    e: nw,
    l: function n(r) {
      var t, e;
      return 0 === r
        ? n0(n1())
        : (r = void 0 === (e = n4[t = r]) ? ni(t) : e, n0(n1()[r]));
    },
    h: function n(r) {
      r > 4 && (n$[r].refcount += 1);
    },
    i: function r(t, e, o, a) {
      t = ((i = t) || nd("Cannot use deleted val. handle = " + i), n$[i].value);
      var i, u = nP[e];
      return u || (u = function r(t) {
        for (var e = "", o = 0; o < t; ++o) {
          e += (0 !== o ? ", " : "") + "arg" + o;
        }
        for (
          var a = "return function emval_allocator_" + t +
              "(constructor, argTypes, args) {\n",
            o = 0;
          o < t;
          ++o
        ) {
          a += "var argType" + o +
            " = requireRegisteredType(Module['HEAP32'][(argTypes >>> 2) + " +
            o + '], "parameter ' + o + '");\nvar arg' + o + " = argType" + o +
            ".readValueFromPointer(args);\nargs += argType" + o +
            "['argPackAdvance'];\n";
        }
        return Function(
          "requireRegisteredType",
          "Module",
          "__emval_register",
          a += "var obj = new constructor(" + e +
            ");\nreturn __emval_register(obj);\n}\n",
        )(n3, n, n0);
      }(e),
        nP[e] = u),
        u(t, o, a);
    },
    a: function n() {
      Q();
    },
    t: function n(r, t, e) {
      p.copyWithin(r, t, t + e);
    },
    f: function n(r) {
      var t = p.length;
      if ((r >>>= 0) > 2147483648) return !1;
      for (var e = 1; e <= 4; e *= 2) {
        var o = t * (1 + .2 / e);
        o = Math.min(o, r + 100663296);
        var a = Math.min(2147483648, M(Math.max(r, o), 65536));
        if (nA(a)) return !0;
      }
      return !1;
    },
    u: nk,
    q: function n(r, t, e, o, a) {},
    v: function n(r, t, e, o) {
      for (var a = 0, i = 0; i < e; i++) {
        for (
          var u = g[t + 8 * i >> 2], f = g[t + (8 * i + 4) >> 2], c = 0;
          c < f;
          c++
        ) nC.printChar(r, p[u + c]);
        a += f;
      }
      return g[o >> 2] = a, 0;
    },
    s: nE,
  };
  !function r() {
    var e = { a: nW };
    function o(r, t) {
      var e, o = r.exports;
      n.asm = o,
        V((c = n.asm.x).buffer),
        w = n.asm.D,
        e = n.asm.y,
        q.unshift(e),
        function r(t) {
          if (
            Y--,
              n.monitorRunDependencies && n.monitorRunDependencies(Y),
              0 == Y && (null !== Z && (clearInterval(Z), Z = null), K)
          ) {
            var e = K;
            K = null, e();
          }
        }("wasm-instantiate");
    }
    function a(n) {
      o(n.instance);
    }
    function i(n) {
      return (f || "function" != typeof fetch
        ? Promise.resolve().then(function () {
          return nt(nr);
        })
        : fetch(nr, { credentials: "same-origin" }).then(function (n) {
          if (!n.ok) throw "failed to load wasm binary file at '" + nr + "'";
          return n.arrayBuffer();
        }).catch(function () {
          return nt(nr);
        })).then(function (n) {
          return WebAssembly.instantiate(n, e);
        }).then(n, function (n) {
          E("failed to asynchronously prepare wasm: " + n), Q(n);
        });
    }
    if (
      Y++,
        n.monitorRunDependencies && n.monitorRunDependencies(Y),
        n.instantiateWasm
    ) {
      try {
        return n.instantiateWasm(e, o);
      } catch (u) {
        return E("Module.instantiateWasm callback failed with error: " + u), !1;
      }
    }
    return (f || "function" != typeof WebAssembly.instantiateStreaming ||
        X(nr) || "function" != typeof fetch
      ? i(a)
      : fetch(nr, { credentials: "same-origin" }).then(function (n) {
        return WebAssembly.instantiateStreaming(n, e).then(a, function (n) {
          return E("wasm streaming compile failed: " + n),
            E("falling back to ArrayBuffer instantiation"),
            i(a);
        });
      })).catch(t),
      {};
  }();
  var nR = n.___wasm_call_ctors = function () {
      return (nR = n.___wasm_call_ctors = n.asm.y).apply(null, arguments);
    },
    n6 = n._malloc = function () {
      return (n6 = n._malloc = n.asm.z).apply(null, arguments);
    },
    nF = n._free = function () {
      return (nF = n._free = n.asm.A).apply(null, arguments);
    },
    nj = n.___getTypeName = function () {
      return (nj = n.___getTypeName = n.asm.B).apply(null, arguments);
    },
    nI = n.___embind_register_native_and_builtin_types = function () {
      return (nI = n.___embind_register_native_and_builtin_types = n.asm.C)
        .apply(null, arguments);
    },
    n5 = n.dynCall_iiji = function () {
      return (n5 = n.dynCall_iiji = n.asm.E).apply(null, arguments);
    },
    nS = n.dynCall_jiji = function () {
      return (nS = n.dynCall_jiji = n.asm.F).apply(null, arguments);
    };
  function nO(t) {
    if (t = t || T, !(Y > 0)) {
      !function r() {
        if (n.preRun) {
          for (
            "function" == typeof n.preRun && (n.preRun = [n.preRun]);
            n.preRun.length;
          ) L(n.preRun.shift());
        }
        ne(z);
      }(),
        !(Y > 0) &&
        (n.setStatus
          ? (n.setStatus("Running..."),
            setTimeout(function () {
              setTimeout(function () {
                n.setStatus("");
              }, 1), e();
            }, 1))
          : e());
    }
    function e() {
      !_ &&
        (_ = !0,
          n.calledRun = !0,
          F ||
          (G = !0,
            ne(q),
            r(n),
            n.onRuntimeInitialized && n.onRuntimeInitialized(),
            function r() {
              if (n.postRun) {
                for (
                  "function" == typeof n.postRun && (n.postRun = [n.postRun]);
                  n.postRun.length;
                ) J(n.postRun.shift());
              }
              ne(N);
            }()));
    }
  }
  if (
    K = function n() {
      _ || nO(), _ || (K = n);
    },
      n.run = nO,
      n.preInit
  ) {
    for (
      "function" == typeof n.preInit && (n.preInit = [n.preInit]);
      n.preInit.length > 0;
    ) n.preInit.pop()();
  }
  return nO(), n.ready;
};
addEventListener("message", async (a) => {
  if (a.data.image) {
    let s = performance.now(),
      t = (await Module({ noInitialRun: !0 })).decode(a.data.image);
    if (!t) throw "Error decoding " + a.data.jxlSrc;
    console.log(
      "Finished decoding",
      a.data.jxlSrc,
      "in",
      performance.now() - s,
      "ms",
    );
    postMessage({ imgData: t });
  } else if (a.data.canvas) {
    a.data.canvas.getContext("2d").putImageData(a.data.imgData, 0, 0);
    let e = await a.data.canvas.convertToBlob({
      type: "image/" + a.data.imageType,
    });
    postMessage({ blob: e, url: URL.createObjectURL(e) });
  }
});
