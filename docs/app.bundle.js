(() => {
  'use strict';
  var n = {
      426: (n, e, t) => {
        t.d(e, { Z: () => s });
        var r = t(81),
          o = t.n(r),
          a = t(645),
          i = t.n(a)()(o());
        i.push([
          n.id,
          "/* TODO: 보기 좋은 나만의 아고라 스테이츠를 위해서 CSS를 수정하세요. */\n* {\n  box-sizing: border-box;\n  padding: 0;\n  margin: 0;\n}\n\nmain {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  align-items: center;\n  background-color: #fce38a;\n}\n\n.head-line {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 90%;\n  height: 300px;\n  margin: 30px 0;\n  background-color: #95e1d3;\n  border-radius: 15px;\n}\n\nh1 {\n  margin-right: 30px;\n  color: #f38181;\n  font-size: 55px;\n}\n\nlabel {\n  font-size: 20px;\n  font-weight: 800;\n}\n\ninput[type='text'],\ntextarea {\n  border: none;\n  width: 500px;\n  background-color: #95e1d3;\n  border-bottom: 2px solid #f38181;\n  height: 100%;\n}\n\n.form {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 700px;\n}\n\n.form__input--wrapper {\n  width: 100%;\n  color: #f38181;\n}\n\n.form__input--name,\n.form__input--title {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  height: 35px;\n  margin-bottom: 25px;\n}\n\n.form__input--name > input,\n.form__input--title > input,\n.form__textbox > textarea {\n  font-size: 20px;\n  column-rule-color: #f38181;\n}\n\n.form__textbox {\n  height: 80px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 20px;\n}\n\ntextarea {\n  border: 2px solid #f38181;\n  border-radius: 10px;\n}\n\nli {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 550px;\n  height: 110px;\n  margin-bottom: 15px;\n  padding: 10px 20px;\n  background-color: #eaffd0;\n  border-radius: 15px;\n}\n\n.discussion__content {\n  display: flex;\n  width: 80%;\n}\n\n.discussion__content {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n\n.discussion__avatar--wrapper {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.discussion__information {\n  text-align: right;\n  font-size: 13px;\n  color: #f38181;\n}\n\nh2 {\n  text-align: left;\n  font-size: 18px;\n}\n\nimg {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n}\n\na {\n  text-decoration: none;\n  color: inherit;\n  color: #76ba99;\n}\n\np {\n  font-size: 18px;\n}\n\n.form__submit > input {\n  width: 150px;\n  height: 50px;\n  border: 3px solid #f38181;\n  border-radius: 15px;\n  color: #f38181;\n  font-size: 20px;\n  font-weight: 800;\n  background-color: #eaffd0;\n}\n",
          '',
        ]);
        const s = i;
      },
      645: (n) => {
        n.exports = function (n) {
          var e = [];
          return (
            (e.toString = function () {
              return this.map(function (e) {
                var t = '',
                  r = void 0 !== e[5];
                return (
                  e[4] && (t += '@supports ('.concat(e[4], ') {')),
                  e[2] && (t += '@media '.concat(e[2], ' {')),
                  r &&
                    (t += '@layer'.concat(
                      e[5].length > 0 ? ' '.concat(e[5]) : '',
                      ' {'
                    )),
                  (t += n(e)),
                  r && (t += '}'),
                  e[2] && (t += '}'),
                  e[4] && (t += '}'),
                  t
                );
              }).join('');
            }),
            (e.i = function (n, t, r, o, a) {
              'string' == typeof n && (n = [[null, n, void 0]]);
              var i = {};
              if (r)
                for (var s = 0; s < this.length; s++) {
                  var c = this[s][0];
                  null != c && (i[c] = !0);
                }
              for (var l = 0; l < n.length; l++) {
                var u = [].concat(n[l]);
                (r && i[u[0]]) ||
                  (void 0 !== a &&
                    (void 0 === u[5] ||
                      (u[1] = '@layer'
                        .concat(u[5].length > 0 ? ' '.concat(u[5]) : '', ' {')
                        .concat(u[1], '}')),
                    (u[5] = a)),
                  t &&
                    (u[2]
                      ? ((u[1] = '@media '
                          .concat(u[2], ' {')
                          .concat(u[1], '}')),
                        (u[2] = t))
                      : (u[2] = t)),
                  o &&
                    (u[4]
                      ? ((u[1] = '@supports ('
                          .concat(u[4], ') {')
                          .concat(u[1], '}')),
                        (u[4] = o))
                      : (u[4] = ''.concat(o))),
                  e.push(u));
              }
            }),
            e
          );
        };
      },
      81: (n) => {
        n.exports = function (n) {
          return n[1];
        };
      },
      379: (n) => {
        var e = [];
        function t(n) {
          for (var t = -1, r = 0; r < e.length; r++)
            if (e[r].identifier === n) {
              t = r;
              break;
            }
          return t;
        }
        function r(n, r) {
          for (var a = {}, i = [], s = 0; s < n.length; s++) {
            var c = n[s],
              l = r.base ? c[0] + r.base : c[0],
              u = a[l] || 0,
              d = ''.concat(l, ' ').concat(u);
            a[l] = u + 1;
            var p = t(d),
              f = {
                css: c[1],
                media: c[2],
                sourceMap: c[3],
                supports: c[4],
                layer: c[5],
              };
            if (-1 !== p) e[p].references++, e[p].updater(f);
            else {
              var m = o(f, r);
              (r.byIndex = s),
                e.splice(s, 0, { identifier: d, updater: m, references: 1 });
            }
            i.push(d);
          }
          return i;
        }
        function o(n, e) {
          var t = e.domAPI(e);
          return (
            t.update(n),
            function (e) {
              if (e) {
                if (
                  e.css === n.css &&
                  e.media === n.media &&
                  e.sourceMap === n.sourceMap &&
                  e.supports === n.supports &&
                  e.layer === n.layer
                )
                  return;
                t.update((n = e));
              } else t.remove();
            }
          );
        }
        n.exports = function (n, o) {
          var a = r((n = n || []), (o = o || {}));
          return function (n) {
            n = n || [];
            for (var i = 0; i < a.length; i++) {
              var s = t(a[i]);
              e[s].references--;
            }
            for (var c = r(n, o), l = 0; l < a.length; l++) {
              var u = t(a[l]);
              0 === e[u].references && (e[u].updater(), e.splice(u, 1));
            }
            a = c;
          };
        };
      },
      569: (n) => {
        var e = {};
        n.exports = function (n, t) {
          var r = (function (n) {
            if (void 0 === e[n]) {
              var t = document.querySelector(n);
              if (
                window.HTMLIFrameElement &&
                t instanceof window.HTMLIFrameElement
              )
                try {
                  t = t.contentDocument.head;
                } catch (n) {
                  t = null;
                }
              e[n] = t;
            }
            return e[n];
          })(n);
          if (!r)
            throw new Error(
              "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
            );
          r.appendChild(t);
        };
      },
      216: (n) => {
        n.exports = function (n) {
          var e = document.createElement('style');
          return n.setAttributes(e, n.attributes), n.insert(e, n.options), e;
        };
      },
      565: (n, e, t) => {
        n.exports = function (n) {
          var e = t.nc;
          e && n.setAttribute('nonce', e);
        };
      },
      795: (n) => {
        n.exports = function (n) {
          var e = n.insertStyleElement(n);
          return {
            update: function (t) {
              !(function (n, e, t) {
                var r = '';
                t.supports && (r += '@supports ('.concat(t.supports, ') {')),
                  t.media && (r += '@media '.concat(t.media, ' {'));
                var o = void 0 !== t.layer;
                o &&
                  (r += '@layer'.concat(
                    t.layer.length > 0 ? ' '.concat(t.layer) : '',
                    ' {'
                  )),
                  (r += t.css),
                  o && (r += '}'),
                  t.media && (r += '}'),
                  t.supports && (r += '}');
                var a = t.sourceMap;
                a &&
                  'undefined' != typeof btoa &&
                  (r +=
                    '\n/*# sourceMappingURL=data:application/json;base64,'.concat(
                      btoa(unescape(encodeURIComponent(JSON.stringify(a)))),
                      ' */'
                    )),
                  e.styleTagTransform(r, n, e.options);
              })(e, n, t);
            },
            remove: function () {
              !(function (n) {
                if (null === n.parentNode) return !1;
                n.parentNode.removeChild(n);
              })(e);
            },
          };
        };
      },
      589: (n) => {
        n.exports = function (n, e) {
          if (e.styleSheet) e.styleSheet.cssText = n;
          else {
            for (; e.firstChild; ) e.removeChild(e.firstChild);
            e.appendChild(document.createTextNode(n));
          }
        };
      },
    },
    e = {};
  function t(r) {
    var o = e[r];
    if (void 0 !== o) return o.exports;
    var a = (e[r] = { id: r, exports: {} });
    return n[r](a, a.exports, t), a.exports;
  }
  (t.n = (n) => {
    var e = n && n.__esModule ? () => n.default : () => n;
    return t.d(e, { a: e }), e;
  }),
    (t.d = (n, e) => {
      for (var r in e)
        t.o(e, r) &&
          !t.o(n, r) &&
          Object.defineProperty(n, r, { enumerable: !0, get: e[r] });
    }),
    (t.o = (n, e) => Object.prototype.hasOwnProperty.call(n, e)),
    (t.nc = void 0),
    (() => {
      var n = t(379),
        e = t.n(n),
        r = t(795),
        o = t.n(r),
        a = t(569),
        i = t.n(a),
        s = t(565),
        c = t.n(s),
        l = t(216),
        u = t.n(l),
        d = t(589),
        p = t.n(d),
        f = t(426),
        m = {};
      (m.styleTagTransform = p()),
        (m.setAttributes = c()),
        (m.insert = i().bind(null, 'head')),
        (m.domAPI = o()),
        (m.insertStyleElement = u()),
        e()(f.Z, m),
        f.Z && f.Z.locals && f.Z.locals;
      const x = (n) => {
          const e = document.createElement('li');
          e.className = 'discussion__container';
          const t = document.createElement('div');
          t.className = 'discussion__avatar--wrapper';
          const r = document.createElement('div');
          r.className = 'discussion__content';
          const o = document.createElement('div');
          o.className = 'discussion__answered';
          const a = document.createElement('img');
          (a.className = 'discussion__avatar--image'),
            (a.src = n.avatarUrl),
            (a.alt = 'avatar of ' + n.author),
            t.append(a);
          const i = document.createElement('h2');
          i.className = 'discussion__title';
          const s = document.createElement('a');
          (s.innerText = n.title), (s.href = n.url);
          const c = document.createElement('div');
          (c.className = 'discussion__information'),
            (c.innerText = `${n.author} / ${new Date(
              n.createdAt
            ).toLocaleString()}`),
            i.append(s);
          let l = document.createElement('p');
          return (
            (l.innerText = n.answer ? '🤓' : '😵'),
            o.append(l),
            r.append(i, c),
            e.append(t, r, o),
            e
          );
        },
        h = document.querySelector('.form__container > form'),
        v = document.querySelector('.form__input--name > input'),
        g = document.querySelector('.form__input--title > input'),
        y = document.querySelector('.form__textbox > textarea');
      h.addEventListener('submit', function (n) {
        n.preventDefault();
        let e = {
          id: '123456789',
          createdAt: new Date(),
          title: g.value,
          url: null,
          author: v.value,
          answer: null,
          bodyHTML: y.value,
          avatarUrl:
            'https://cdn.pixabay.com/photo/2018/07/22/20/02/horse-3555391_960_720.jpg',
        };
        agoraStatesDiscussions.unshift(e),
          b.prepend(x(e)),
          (v.value = ''),
          (g.value = ''),
          (y.value = ''),
          _.push(JSON.stringify(e)),
          localStorage.setItem('questions', _);
      }),
        Math.ceil(agoraStatesDiscussions.lenght / 10);
      let _ = [];
      const b = document.querySelector('ul.discussions__container');
      ((n) => {
        for (let e = 0; e < agoraStatesDiscussions.length; e += 1)
          n.append(x(agoraStatesDiscussions[e]));
      })(b);
    })();
})();
