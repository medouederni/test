;(function() {
/*! DevExtreme-Intl v19.1.6 */
!function (e, r) {
  if ('object' == typeof exports && 'object' == typeof module)
    module.exports = r(devextreme_core_config, devextreme_localization, devextreme_core_version);
  else if (true)
    define([
      'devextreme/core/config',
      'devextreme/localization',
      'devextreme/core/version'
    ], r);
  else {
    var n = 'object' == typeof exports ? r(require(void 0), require(void 0), require(void 0)) : r(e.DevExpress.config, e.DevExpress.localization, e.DevExpress.VERSION);
    for (var t in n)
      ('object' == typeof exports ? exports : e)[t] = n[t];
  }
}(this, function (e, r, n) {
  return function (e) {
    function r(t) {
      if (n[t])
        return n[t].exports;
      var o = n[t] = {
          exports: {},
          id: t,
          loaded: !1
        };
      return e[t].call(o.exports, o, o.exports, r), o.loaded = !0, o.exports;
    }
    var n = {};
    return r.m = e, r.c = n, r.p = '', r(0);
  }([
    function (e, r, n) {
      n(1), n(7);
    },
    function (e, r, n) {
      var t = n(2), o = n(3), a = n(4).locale, i = n(4).number, u = n(5), c = n(6).compare, s = {}, m = /([^\s0]+)?(\s*)0*[.,]*0*(\s*)([^\s0]+)?/, f = {}, l = function (e) {
          var r = a() + '/' + JSON.stringify(e);
          return f[r] || (f[r] = new Intl.NumberFormat(a(), e).format), f[r];
        }, p = function (e) {
          return new Intl.NumberFormat(a(), {
            style: 'currency',
            currency: e
          });
        };
      i.resetInjection(), i.inject({
        _formatNumberCore: function (e, r, n) {
          return 'exponential' === r ? this.callBase.apply(this, arguments) : l(this._normalizeFormatConfig(r, n))(e);
        },
        _normalizeFormatConfig: function (e, r, n) {
          var t;
          return t = 'decimal' === e ? {
            minimumIntegerDigits: r.precision || 1,
            useGrouping: !1,
            maximumFractionDigits: 0,
            round: n < 0 ? 'ceil' : 'floor'
          } : this._getPrecisionConfig(r.precision), 'percent' === e ? t.style = 'percent' : 'currency' === e && (t.style = 'currency', t.currency = r.currency || o().defaultCurrency), t;
        },
        _getPrecisionConfig: function (e) {
          var r;
          return r = null === e ? {
            minimumFractionDigits: 0,
            maximumFractionDigits: 20
          } : {
            minimumFractionDigits: e || 0,
            maximumFractionDigits: e || 0
          };
        },
        format: function (e, r) {
          return 'number' != typeof e ? e : (r = this._normalizeFormat(r), r && ('function' == typeof r || r.type || r.formatter) ? this.callBase.apply(this, arguments) : l(r)(e));
        },
        parse: function (e, r) {
          if (c(u, '17.2.8') >= 0)
            return this.callBase.apply(this, arguments);
          if (e)
            return r && r.parser ? r.parser(e) : (e = this._normalizeNumber(e, r), e.length > 15 ? NaN : parseFloat(e));
        },
        _normalizeNumber: function (e, r) {
          var n = /^[-+]?[0-9]*.?[0-9]+([eE][-+]?[0-9]+)+$/, t = '.';
          if (this.convertDigits && (e = this.convertDigits(e, !0)), n.test(e))
            return e;
          var o = this._getDecimalSeparator(r), a = new RegExp('[^0-9-\\' + o + ']', 'g');
          return e.replace(a, '').replace(o, t);
        },
        _getDecimalSeparator: function (e) {
          return l(e)(0.1)[1];
        },
        _getCurrencySymbolInfo: function (e) {
          var r = p(e);
          return this._extractCurrencySymbolInfo(r.format(0));
        },
        _extractCurrencySymbolInfo: function (e) {
          var r = m.exec(e) || [], n = r[1] ? 'before' : 'after', t = r[1] || r[4] || '', o = r[2] || r[3] || '';
          return {
            position: n,
            symbol: t,
            delimiter: o
          };
        },
        _getCurrencyOptions: function (e) {
          var r = s[a()];
          r || (r = s[a()] = {});
          var n = r[e];
          if (!n) {
            var o = p(e), i = o.resolvedOptions(), u = this._getCurrencySymbolInfo(e);
            n = r[e] = t(i, {
              currencySymbol: u.symbol,
              currencyPosition: u.position,
              currencyDelimiter: u.delimiter
            });
          }
          return n;
        },
        _repeatCharacter: function (e, r) {
          return Array(r + 1).join(e);
        },
        _createOpenXmlCurrencyFormat: function (e) {
          var r = this._repeatCharacter('0', e.minimumIntegerDigits);
          return r += '{0}', e.useGrouping && (r = '#,' + this._repeatCharacter('#', 3 - e.minimumIntegerDigits) + r), e.currencySymbol && ('before' === e.currencyPosition ? r = e.currencySymbol + e.currencyDelimiter + r : r += e.currencyDelimiter + e.currencySymbol), r;
        },
        getOpenXmlCurrencyFormat: function (e) {
          var r = e || o().defaultCurrency, n = this._getCurrencyOptions(r);
          return this._createOpenXmlCurrencyFormat(n);
        }
      });
    },
    function (e, r) {
      /*
      	object-assign
      	(c) Sindre Sorhus
      	@license MIT
      	*/
      'use strict';
      function n(e) {
        if (null === e || void 0 === e)
          throw new TypeError('Object.assign cannot be called with null or undefined');
        return Object(e);
      }
      function t() {
        try {
          if (!Object.assign)
            return !1;
          var e = new String('abc');
          if (e[5] = 'de', '5' === Object.getOwnPropertyNames(e)[0])
            return !1;
          for (var r = {}, n = 0; n < 10; n++)
            r['_' + String.fromCharCode(n)] = n;
          var t = Object.getOwnPropertyNames(r).map(function (e) {
              return r[e];
            });
          if ('0123456789' !== t.join(''))
            return !1;
          var o = {};
          return 'abcdefghijklmnopqrst'.split('').forEach(function (e) {
            o[e] = e;
          }), 'abcdefghijklmnopqrst' === Object.keys(Object.assign({}, o)).join('');
        } catch (e) {
          return !1;
        }
      }
      var o = Object.getOwnPropertySymbols, a = Object.prototype.hasOwnProperty, i = Object.prototype.propertyIsEnumerable;
      e.exports = t() ? Object.assign : function (e, r) {
        for (var t, u, c = n(e), s = 1; s < arguments.length; s++) {
          t = Object(arguments[s]);
          for (var m in t)
            a.call(t, m) && (c[m] = t[m]);
          if (o) {
            u = o(t);
            for (var f = 0; f < u.length; f++)
              i.call(t, u[f]) && (c[u[f]] = t[u[f]]);
          }
        }
        return c;
      };
    },
    function (r, n) {
      r.exports = e;
    },
    function (e, n) {
      e.exports = r;
    },
    function (e, r) {
      e.exports = n;
    },
    function (e, r) {
      'use strict';
      r.compare = function (e, r, n) {
        function t(e) {
          return 'string' == typeof e ? e.split('.') : 'number' == typeof e ? [e] : e;
        }
        e = t(e), r = t(r);
        var o = Math.max(e.length, r.length);
        isFinite(n) && (o = Math.min(o, n));
        for (var a = 0; a < o; a++) {
          var i = parseInt(e[a] || 0, 10), u = parseInt(r[a] || 0, 10);
          if (i < u)
            return -1;
          if (i > u)
            return 1;
        }
        return 0;
      };
    },
    function (e, r, n) {
      var t = n(2), o = n(4).locale, a = n(4).date, i = n(8), u = n(5), c = n(6).compare, s = /[\u200E\u200F]/g, m = function (e) {
          return function (r) {
            if (!e.timeZoneName) {
              var n = Date.UTC(r.getFullYear(), r.getMonth(), r.getDate(), r.getHours(), r.getMinutes(), r.getSeconds()), o = t({ timeZone: 'UTC' }, e);
              return p(n, o);
            }
            return p(r, e);
          };
        }, f = {}, l = function (e) {
          var r = o() + '/' + JSON.stringify(e);
          return f[r] || (f[r] = new Intl.DateTimeFormat(o(), e).format), f[r];
        }, p = function (e, r) {
          return l(r)(e).replace(s, '');
        }, y = function (e) {
          return new Intl.NumberFormat(o()).format(e);
        }, h = function () {
          var e = {};
          return function (r) {
            if (!(r in e)) {
              if ('0' === y(0))
                return e[r] = !1, !1;
              e[r] = {};
              for (var n = 0; n < 10; ++n)
                e[r][y(n)] = n;
            }
            return e[r];
          };
        }(), g = function (e) {
          var r = h(o());
          return r ? e.split('').map(function (e) {
            return e in r ? String(r[e]) : e;
          }).join('') : e;
        }, d = function (e) {
          return e.replace(/(\D)0+(\d)/g, '$1$2');
        }, v = function (e, r) {
          return d(e) === d(r);
        }, b = function (e) {
          return e.replace('d\u2019', 'de ');
        }, D = {
          day: { day: 'numeric' },
          dayofweek: { weekday: 'long' },
          longdate: {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          },
          longdatelongtime: {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
          },
          longtime: {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
          },
          month: { month: 'long' },
          monthandday: {
            month: 'long',
            day: 'numeric'
          },
          monthandyear: {
            year: 'numeric',
            month: 'long'
          },
          shortdate: {},
          shorttime: {
            hour: 'numeric',
            minute: 'numeric'
          },
          shortyear: { year: '2-digit' },
          year: { year: 'numeric' }
        };
      Object.defineProperty(D, 'shortdateshorttime', {
        get: function () {
          var e = Intl.DateTimeFormat(o()).resolvedOptions();
          return {
            year: e.year,
            month: e.month,
            day: e.day,
            hour: 'numeric',
            minute: 'numeric'
          };
        }
      });
      var w = function (e) {
          return 'string' == typeof e && D[e.toLowerCase()];
        }, x = {
          standalone: function (e, r) {
            var n = new Date(1999, e, 13, 1), t = m({ month: r })(n);
            return t;
          },
          format: function (e, r) {
            var n = new Date(0, e, 13, 1), t = b(m({
                day: 'numeric',
                month: r
              })(n)), o = t.split(' ').filter(function (e) {
                return e.indexOf('13') < 0;
              });
            return 1 === o.length ? o[0] : 2 === o.length ? o[0].length > o[1].length ? o[0] : o[1] : x.standalone(e, r);
          }
        };
      a.resetInjection(), a.inject({
        getMonthNames: function (e, r) {
          var n = {
              wide: 'long',
              abbreviated: 'short',
              narrow: 'narrow'
            }, t = n[e || 'wide'];
          return r = r || 'standalone', Array.apply(null, new Array(12)).map(function (e, n) {
            return x[r](n, t);
          });
        },
        getDayNames: function (e) {
          var r = {
              wide: 'long',
              abbreviated: 'short',
              short: 'narrow',
              narrow: 'narrow'
            }, n = function (e) {
              return Array.apply(null, new Array(7)).map(function (r, n) {
                return m({ weekday: e })(new Date(0, 0, n));
              });
            }, t = n(r[e || 'wide']);
          return t;
        },
        getPeriodNames: function () {
          var e = m({
              hour: 'numeric',
              hour12: !0
            });
          return [
            1,
            13
          ].map(function (r) {
            var n = y(1), t = e(new Date(0, 0, 1, r)).split(n);
            if (2 !== t.length)
              return '';
            var o = t[0].length > t[1].length ? t[0] : t[1];
            return o.trim();
          });
        },
        format: function (e, r) {
          if (e) {
            if (!r)
              return e;
            r = r.type || r;
            var n = w(r);
            if (n)
              return m(n)(e);
            var t = typeof r;
            return r.formatter || 'function' === t || 'string' === t ? this.callBase.apply(this, arguments) : m(r)(e);
          }
        },
        parse: function (e, r) {
          var n = [
              'shortdate',
              'shorttime',
              'shortdateshorttime',
              'longtime'
            ];
          if (c(u, '17.2.4') === -1 && e && 'string' == typeof r && n.indexOf(r.toLowerCase()) > -1)
            return this._parseDateBySimpleFormat(e, r.toLowerCase());
          var t;
          return c(u, '17.2.4') >= 0 && r && !r.parser && 'string' == typeof e && (e = b(e), t = function (e) {
            return b(a.format(e, r));
          }), this.callBase(e, t || r);
        },
        _parseDateBySimpleFormat: function (e, r) {
          e = g(e);
          var n = this.getFormatParts(r), t = e.split(/\D+/).filter(function (e) {
              return e.length > 0;
            });
          if (n.length === t.length) {
            var o = this._generateDateArgs(n, t), a = function (e, r) {
                var n = r ? 12 : 0;
                return new Date(e.year, e.month, e.day, (e.hours + n) % 24, e.minutes, e.seconds);
              }, i = function (n) {
                var t = a(o, n);
                if (v(g(this.format(t, r)), e))
                  return t;
              }.bind(this);
            return i(!1) || i(!0);
          }
        },
        _generateDateArgs: function (e, r) {
          var n = new Date(), t = {
              year: n.getFullYear(),
              month: n.getMonth(),
              day: n.getDate(),
              hours: 0,
              minutes: 0,
              seconds: 0
            };
          return e.forEach(function (e, n) {
            var o = r[n], a = parseInt(o, 10);
            'month' === e && (a -= 1), t[e] = a;
          }), t;
        },
        formatUsesMonthName: function (e) {
          return 'object' != typeof e || e.type || e.format ? this.callBase.apply(this, arguments) : 'long' === e.month;
        },
        formatUsesDayName: function (e) {
          return 'object' != typeof e || e.type || e.format ? this.callBase.apply(this, arguments) : 'long' === e.weekday;
        },
        getFormatParts: function (e) {
          var r = t({}, D[e.toLowerCase()]), n = new Date(2001, 2, 4, 5, 6, 7), o = m(r)(n);
          o = g(o);
          var a = [
              {
                name: 'year',
                value: 1
              },
              {
                name: 'month',
                value: 3
              },
              {
                name: 'day',
                value: 4
              },
              {
                name: 'hours',
                value: 5
              },
              {
                name: 'minutes',
                value: 6
              },
              {
                name: 'seconds',
                value: 7
              }
            ];
          return a.map(function (e) {
            return {
              name: e.name,
              index: o.indexOf(e.value)
            };
          }).filter(function (e) {
            return e.index > -1;
          }).sort(function (e, r) {
            return e.index - r.index;
          }).map(function (e) {
            return e.name;
          });
        },
        firstDayOfWeekIndex: function () {
          var e = i[o()];
          return void 0 === e ? 1 : e;
        }
      });
    },
    function (e, r) {
      e.exports = {
        af: 0,
        am: 0,
        ar: 6,
        'ar-AE': 6,
        'ar-BH': 6,
        'ar-DJ': 6,
        'ar-DZ': 6,
        'ar-EG': 6,
        'ar-IL': 0,
        'ar-IQ': 6,
        'ar-JO': 6,
        'ar-KW': 6,
        'ar-LY': 6,
        'ar-OM': 6,
        'ar-QA': 6,
        'ar-SA': 0,
        'ar-SD': 6,
        'ar-SY': 6,
        'ar-YE': 0,
        as: 0,
        bn: 0,
        'bn-IN': 0,
        bo: 0,
        'bo-IN': 0,
        brx: 0,
        ccp: 0,
        'ccp-IN': 0,
        ceb: 0,
        chr: 0,
        ckb: 6,
        'ckb-IR': 6,
        dav: 0,
        dz: 0,
        ebu: 0,
        en: 0,
        'en-AE': 6,
        'en-AG': 0,
        'en-AS': 0,
        'en-AU': 0,
        'en-BS': 0,
        'en-BW': 0,
        'en-BZ': 0,
        'en-CA': 0,
        'en-DM': 0,
        'en-GU': 0,
        'en-HK': 0,
        'en-IL': 0,
        'en-IN': 0,
        'en-JM': 0,
        'en-KE': 0,
        'en-MH': 0,
        'en-MO': 0,
        'en-MT': 0,
        'en-PH': 0,
        'en-PK': 0,
        'en-PR': 0,
        'en-SD': 6,
        'en-SG': 0,
        'en-TT': 0,
        'en-UM': 0,
        'en-US-POSIX': 0,
        'en-VI': 0,
        'en-WS': 0,
        'en-ZA': 0,
        'en-ZW': 0,
        'es-AR': 0,
        'es-BR': 0,
        'es-BZ': 0,
        'es-CO': 0,
        'es-DO': 0,
        'es-GT': 0,
        'es-HN': 0,
        'es-MX': 0,
        'es-NI': 0,
        'es-PA': 0,
        'es-PE': 0,
        'es-PH': 0,
        'es-PR': 0,
        'es-PY': 0,
        'es-SV': 0,
        'es-US': 0,
        'es-VE': 0,
        fa: 6,
        'fa-AF': 6,
        fil: 0,
        'fr-CA': 0,
        'fr-DJ': 6,
        'fr-DZ': 6,
        'fr-SY': 6,
        gu: 0,
        guz: 0,
        haw: 0,
        he: 0,
        hi: 0,
        id: 0,
        ii: 0,
        ja: 0,
        jv: 0,
        kab: 6,
        kam: 0,
        ki: 0,
        kln: 0,
        km: 0,
        kn: 0,
        ko: 0,
        kok: 0,
        ks: 0,
        lkt: 0,
        lo: 0,
        lrc: 6,
        'lrc-IQ': 6,
        luo: 0,
        luy: 0,
        mas: 0,
        mer: 0,
        mgh: 0,
        ml: 0,
        mr: 0,
        'ms-SG': 0,
        mt: 0,
        my: 0,
        mzn: 6,
        nd: 0,
        ne: 0,
        'ne-IN': 0,
        om: 0,
        'om-KE': 0,
        or: 0,
        pa: 0,
        'pa-Arab': 0,
        'pa-Guru': 0,
        ps: 6,
        'ps-PK': 0,
        pt: 0,
        'pt-MO': 0,
        'pt-MZ': 0,
        'pt-PT': 0,
        qu: 0,
        root: 0,
        saq: 0,
        sd: 0,
        seh: 0,
        sn: 0,
        'so-DJ': 6,
        'so-ET': 0,
        'so-KE': 0,
        'sw-KE': 0,
        ta: 0,
        'ta-SG': 0,
        te: 0,
        'teo-KE': 0,
        th: 0,
        ti: 0,
        ug: 0,
        ur: 0,
        'ur-IN': 0,
        'uz-Arab': 6,
        xh: 0,
        yue: 0,
        'yue-Hans': 0,
        'yue-Hant': 0,
        zh: 0,
        'zh-Hans': 0,
        'zh-Hans-HK': 0,
        'zh-Hans-MO': 0,
        'zh-Hans-SG': 0,
        'zh-Hant': 0,
        'zh-Hant-HK': 0,
        'zh-Hant-MO': 0,
        zu: 0
      };
    }
  ]);
});
}());
