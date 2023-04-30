(window.webpackJsonp = window.webpackJsonp || []).push([
	[1],
	{
		0: function (e, t, n) {
			e.exports = n('zUnb');
		},
		zUnb: function (e, t, n) {
			'use strict';
			function r(e) {
				return 'function' == typeof e;
			}
			n.r(t);
			let o = !1;
			const s = {
				Promise: void 0,
				set useDeprecatedSynchronousErrorHandling(e) {
					if (e) {
						const e = new Error();
						console.warn('DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + e.stack);
					} else o && console.log('RxJS: Back to a better error behavior. Thank you. <3');
					o = e;
				},
				get useDeprecatedSynchronousErrorHandling() {
					return o;
				},
			};
			function i(e) {
				setTimeout(() => {
					throw e;
				}, 0);
			}
			const l = {
					closed: !0,
					next(e) {},
					error(e) {
						if (s.useDeprecatedSynchronousErrorHandling) throw e;
						i(e);
					},
					complete() {},
				},
				u = (() => Array.isArray || ((e) => e && 'number' == typeof e.length))();
			function c(e) {
				return null !== e && 'object' == typeof e;
			}
			const a = (() => {
				function e(e) {
					return Error.call(this), (this.message = e ? `${e.length} errors occurred during unsubscription:\n${e.map((e, t) => `${t + 1}) ${e.toString()}`).join('\n  ')}` : ''), (this.name = 'UnsubscriptionError'), (this.errors = e), this;
				}
				return (e.prototype = Object.create(Error.prototype)), e;
			})();
			let h = (() => {
				class e {
					constructor(e) {
						(this.closed = !1), (this._parentOrParents = null), (this._subscriptions = null), e && (this._unsubscribe = e);
					}
					unsubscribe() {
						let t;
						if (this.closed) return;
						let { _parentOrParents: n, _unsubscribe: o, _subscriptions: s } = this;
						if (((this.closed = !0), (this._parentOrParents = null), (this._subscriptions = null), n instanceof e)) n.remove(this);
						else if (null !== n) for (let e = 0; e < n.length; ++e) n[e].remove(this);
						if (r(o))
							try {
								o.call(this);
							} catch (i) {
								t = i instanceof a ? d(i.errors) : [i];
							}
						if (u(s)) {
							let e = -1,
								n = s.length;
							for (; ++e < n; ) {
								const n = s[e];
								if (c(n))
									try {
										n.unsubscribe();
									} catch (i) {
										(t = t || []), i instanceof a ? (t = t.concat(d(i.errors))) : t.push(i);
									}
							}
						}
						if (t) throw new a(t);
					}
					add(t) {
						let n = t;
						if (!t) return e.EMPTY;
						switch (typeof t) {
							case 'function':
								n = new e(t);
							case 'object':
								if (n === this || n.closed || 'function' != typeof n.unsubscribe) return n;
								if (this.closed) return n.unsubscribe(), n;
								if (!(n instanceof e)) {
									const t = n;
									(n = new e()), (n._subscriptions = [t]);
								}
								break;
							default:
								throw new Error('unrecognized teardown ' + t + ' added to Subscription.');
						}
						let { _parentOrParents: r } = n;
						if (null === r) n._parentOrParents = this;
						else if (r instanceof e) {
							if (r === this) return n;
							n._parentOrParents = [r, this];
						} else {
							if (-1 !== r.indexOf(this)) return n;
							r.push(this);
						}
						const o = this._subscriptions;
						return null === o ? (this._subscriptions = [n]) : o.push(n), n;
					}
					remove(e) {
						const t = this._subscriptions;
						if (t) {
							const n = t.indexOf(e);
							-1 !== n && t.splice(n, 1);
						}
					}
				}
				return (
					(e.EMPTY = (function (e) {
						return (e.closed = !0), e;
					})(new e())),
					e
				);
			})();
			function d(e) {
				return e.reduce((e, t) => e.concat(t instanceof a ? t.errors : t), []);
			}
			const f = (() => ('function' == typeof Symbol ? Symbol('rxSubscriber') : '@@rxSubscriber_' + Math.random()))();
			class p extends h {
				constructor(e, t, n) {
					switch ((super(), (this.syncErrorValue = null), (this.syncErrorThrown = !1), (this.syncErrorThrowable = !1), (this.isStopped = !1), arguments.length)) {
						case 0:
							this.destination = l;
							break;
						case 1:
							if (!e) {
								this.destination = l;
								break;
							}
							if ('object' == typeof e) {
								e instanceof p ? ((this.syncErrorThrowable = e.syncErrorThrowable), (this.destination = e), e.add(this)) : ((this.syncErrorThrowable = !0), (this.destination = new _(this, e)));
								break;
							}
						default:
							(this.syncErrorThrowable = !0), (this.destination = new _(this, e, t, n));
					}
				}
				[f]() {
					return this;
				}
				static create(e, t, n) {
					const r = new p(e, t, n);
					return (r.syncErrorThrowable = !1), r;
				}
				next(e) {
					this.isStopped || this._next(e);
				}
				error(e) {
					this.isStopped || ((this.isStopped = !0), this._error(e));
				}
				complete() {
					this.isStopped || ((this.isStopped = !0), this._complete());
				}
				unsubscribe() {
					this.closed || ((this.isStopped = !0), super.unsubscribe());
				}
				_next(e) {
					this.destination.next(e);
				}
				_error(e) {
					this.destination.error(e), this.unsubscribe();
				}
				_complete() {
					this.destination.complete(), this.unsubscribe();
				}
				_unsubscribeAndRecycle() {
					const { _parentOrParents: e } = this;
					return (this._parentOrParents = null), this.unsubscribe(), (this.closed = !1), (this.isStopped = !1), (this._parentOrParents = e), this;
				}
			}
			class _ extends p {
				constructor(e, t, n, o) {
					let s;
					super(), (this._parentSubscriber = e);
					let i = this;
					r(t) ? (s = t) : t && ((s = t.next), (n = t.error), (o = t.complete), t !== l && ((i = Object.create(t)), r(i.unsubscribe) && this.add(i.unsubscribe.bind(i)), (i.unsubscribe = this.unsubscribe.bind(this)))), (this._context = i), (this._next = s), (this._error = n), (this._complete = o);
				}
				next(e) {
					if (!this.isStopped && this._next) {
						const { _parentSubscriber: t } = this;
						s.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable ? this.__tryOrSetError(t, this._next, e) && this.unsubscribe() : this.__tryOrUnsub(this._next, e);
					}
				}
				error(e) {
					if (!this.isStopped) {
						const { _parentSubscriber: t } = this,
							{ useDeprecatedSynchronousErrorHandling: n } = s;
						if (this._error) n && t.syncErrorThrowable ? (this.__tryOrSetError(t, this._error, e), this.unsubscribe()) : (this.__tryOrUnsub(this._error, e), this.unsubscribe());
						else if (t.syncErrorThrowable) n ? ((t.syncErrorValue = e), (t.syncErrorThrown = !0)) : i(e), this.unsubscribe();
						else {
							if ((this.unsubscribe(), n)) throw e;
							i(e);
						}
					}
				}
				complete() {
					if (!this.isStopped) {
						const { _parentSubscriber: e } = this;
						if (this._complete) {
							const t = () => this._complete.call(this._context);
							s.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable ? (this.__tryOrSetError(e, t), this.unsubscribe()) : (this.__tryOrUnsub(t), this.unsubscribe());
						} else this.unsubscribe();
					}
				}
				__tryOrUnsub(e, t) {
					try {
						e.call(this._context, t);
					} catch (n) {
						if ((this.unsubscribe(), s.useDeprecatedSynchronousErrorHandling)) throw n;
						i(n);
					}
				}
				__tryOrSetError(e, t, n) {
					if (!s.useDeprecatedSynchronousErrorHandling) throw new Error('bad call');
					try {
						t.call(this._context, n);
					} catch (r) {
						return s.useDeprecatedSynchronousErrorHandling ? ((e.syncErrorValue = r), (e.syncErrorThrown = !0), !0) : (i(r), !0);
					}
					return !1;
				}
				_unsubscribe() {
					const { _parentSubscriber: e } = this;
					(this._context = null), (this._parentSubscriber = null), e.unsubscribe();
				}
			}
			const m = (() => ('function' == typeof Symbol && Symbol.observable) || '@@observable')();
			function y() {}
			let g = (() => {
				class e {
					constructor(e) {
						(this._isScalar = !1), e && (this._subscribe = e);
					}
					lift(t) {
						const n = new e();
						return (n.source = this), (n.operator = t), n;
					}
					subscribe(e, t, n) {
						const { operator: r } = this,
							o = (function (e, t, n) {
								if (e) {
									if (e instanceof p) return e;
									if (e[f]) return e[f]();
								}
								return e || t || n ? new p(e, t, n) : new p(l);
							})(e, t, n);
						if ((o.add(r ? r.call(o, this.source) : this.source || (s.useDeprecatedSynchronousErrorHandling && !o.syncErrorThrowable) ? this._subscribe(o) : this._trySubscribe(o)), s.useDeprecatedSynchronousErrorHandling && o.syncErrorThrowable && ((o.syncErrorThrowable = !1), o.syncErrorThrown))) throw o.syncErrorValue;
						return o;
					}
					_trySubscribe(e) {
						try {
							return this._subscribe(e);
						} catch (t) {
							s.useDeprecatedSynchronousErrorHandling && ((e.syncErrorThrown = !0), (e.syncErrorValue = t)),
								(function (e) {
									for (; e; ) {
										const { closed: t, destination: n, isStopped: r } = e;
										if (t || r) return !1;
										e = n && n instanceof p ? n : null;
									}
									return !0;
								})(e)
									? e.error(t)
									: console.warn(t);
						}
					}
					forEach(e, t) {
						return new (t = v(t))((t, n) => {
							let r;
							r = this.subscribe(
								(t) => {
									try {
										e(t);
									} catch (o) {
										n(o), r && r.unsubscribe();
									}
								},
								n,
								t
							);
						});
					}
					_subscribe(e) {
						const { source: t } = this;
						return t && t.subscribe(e);
					}
					[m]() {
						return this;
					}
					pipe(...e) {
						return 0 === e.length
							? this
							: ((t = e)
									? 1 === t.length
										? t[0]
										: function (e) {
												return t.reduce((e, t) => t(e), e);
										  }
									: y)(this);
						var t;
					}
					toPromise(e) {
						return new (e = v(e))((e, t) => {
							let n;
							this.subscribe(
								(e) => (n = e),
								(e) => t(e),
								() => e(n)
							);
						});
					}
				}
				return (e.create = (t) => new e(t)), e;
			})();
			function v(e) {
				if ((e || (e = s.Promise || Promise), !e)) throw new Error('no Promise impl found');
				return e;
			}
			const w = (() => {
				function e() {
					return Error.call(this), (this.message = 'object unsubscribed'), (this.name = 'ObjectUnsubscribedError'), this;
				}
				return (e.prototype = Object.create(Error.prototype)), e;
			})();
			class b extends h {
				constructor(e, t) {
					super(), (this.subject = e), (this.subscriber = t), (this.closed = !1);
				}
				unsubscribe() {
					if (this.closed) return;
					this.closed = !0;
					const e = this.subject,
						t = e.observers;
					if (((this.subject = null), !t || 0 === t.length || e.isStopped || e.closed)) return;
					const n = t.indexOf(this.subscriber);
					-1 !== n && t.splice(n, 1);
				}
			}
			class x extends p {
				constructor(e) {
					super(e), (this.destination = e);
				}
			}
			let C = (() => {
				class e extends g {
					constructor() {
						super(), (this.observers = []), (this.closed = !1), (this.isStopped = !1), (this.hasError = !1), (this.thrownError = null);
					}
					[f]() {
						return new x(this);
					}
					lift(e) {
						const t = new E(this, this);
						return (t.operator = e), t;
					}
					next(e) {
						if (this.closed) throw new w();
						if (!this.isStopped) {
							const { observers: t } = this,
								n = t.length,
								r = t.slice();
							for (let o = 0; o < n; o++) r[o].next(e);
						}
					}
					error(e) {
						if (this.closed) throw new w();
						(this.hasError = !0), (this.thrownError = e), (this.isStopped = !0);
						const { observers: t } = this,
							n = t.length,
							r = t.slice();
						for (let o = 0; o < n; o++) r[o].error(e);
						this.observers.length = 0;
					}
					complete() {
						if (this.closed) throw new w();
						this.isStopped = !0;
						const { observers: e } = this,
							t = e.length,
							n = e.slice();
						for (let r = 0; r < t; r++) n[r].complete();
						this.observers.length = 0;
					}
					unsubscribe() {
						(this.isStopped = !0), (this.closed = !0), (this.observers = null);
					}
					_trySubscribe(e) {
						if (this.closed) throw new w();
						return super._trySubscribe(e);
					}
					_subscribe(e) {
						if (this.closed) throw new w();
						return this.hasError ? (e.error(this.thrownError), h.EMPTY) : this.isStopped ? (e.complete(), h.EMPTY) : (this.observers.push(e), new b(this, e));
					}
					asObservable() {
						const e = new g();
						return (e.source = this), e;
					}
				}
				return (e.create = (e, t) => new E(e, t)), e;
			})();
			class E extends C {
				constructor(e, t) {
					super(), (this.destination = e), (this.source = t);
				}
				next(e) {
					const { destination: t } = this;
					t && t.next && t.next(e);
				}
				error(e) {
					const { destination: t } = this;
					t && t.error && this.destination.error(e);
				}
				complete() {
					const { destination: e } = this;
					e && e.complete && this.destination.complete();
				}
				_subscribe(e) {
					const { source: t } = this;
					return t ? this.source.subscribe(e) : h.EMPTY;
				}
			}
			class k extends p {
				constructor(e, t, n) {
					super(), (this.parent = e), (this.outerValue = t), (this.outerIndex = n), (this.index = 0);
				}
				_next(e) {
					this.parent.notifyNext(this.outerValue, e, this.outerIndex, this.index++, this);
				}
				_error(e) {
					this.parent.notifyError(e, this), this.unsubscribe();
				}
				_complete() {
					this.parent.notifyComplete(this), this.unsubscribe();
				}
			}
			const T = (e) => (t) => {
				for (let n = 0, r = e.length; n < r && !t.closed; n++) t.next(e[n]);
				t.complete();
			};
			function I() {
				return 'function' == typeof Symbol && Symbol.iterator ? Symbol.iterator : '@@iterator';
			}
			const S = I();
			const A = (e) => {
				if (e && 'function' == typeof e[m])
					return (
						(s = e),
						(e) => {
							const t = s[m]();
							if ('function' != typeof t.subscribe) throw new TypeError('Provided object does not correctly implement Symbol.observable');
							return t.subscribe(e);
						}
					);
				if ((t = e) && 'number' == typeof t.length && 'function' != typeof t) return T(e);
				var t, n, r, o, s;
				if ((n = e) && 'function' != typeof n.subscribe && 'function' == typeof n.then)
					return (
						(o = e),
						(e) => (
							o
								.then(
									(t) => {
										e.closed || (e.next(t), e.complete());
									},
									(t) => e.error(t)
								)
								.then(null, i),
							e
						)
					);
				if (e && 'function' == typeof e[S])
					return (
						(r = e),
						(e) => {
							const t = r[S]();
							for (;;) {
								const n = t.next();
								if (n.done) {
									e.complete();
									break;
								}
								if ((e.next(n.value), e.closed)) break;
							}
							return (
								'function' == typeof t.return &&
									e.add(() => {
										t.return && t.return();
									}),
								e
							);
						}
					);
				{
					const t = c(e) ? 'an invalid object' : `'${e}'`;
					throw new TypeError(`You provided ${t} where a stream was expected.` + ' You can provide an Observable, Promise, Array, or Iterable.');
				}
			};
			class D extends p {
				notifyNext(e, t, n, r, o) {
					this.destination.next(t);
				}
				notifyError(e, t) {
					this.destination.error(e);
				}
				notifyComplete(e) {
					this.destination.complete();
				}
			}
			class O {
				constructor(e, t) {
					(this.project = e), (this.thisArg = t);
				}
				call(e, t) {
					return t.subscribe(new N(e, this.project, this.thisArg));
				}
			}
			class N extends p {
				constructor(e, t, n) {
					super(e), (this.project = t), (this.count = 0), (this.thisArg = n || this);
				}
				_next(e) {
					let t;
					try {
						t = this.project.call(this.thisArg, e, this.count++);
					} catch (n) {
						return void this.destination.error(n);
					}
					this.destination.next(t);
				}
			}
			class P {
				constructor(e, t = Number.POSITIVE_INFINITY) {
					(this.project = e), (this.concurrent = t);
				}
				call(e, t) {
					return t.subscribe(new R(e, this.project, this.concurrent));
				}
			}
			class R extends D {
				constructor(e, t, n = Number.POSITIVE_INFINITY) {
					super(e), (this.project = t), (this.concurrent = n), (this.hasCompleted = !1), (this.buffer = []), (this.active = 0), (this.index = 0);
				}
				_next(e) {
					this.active < this.concurrent ? this._tryNext(e) : this.buffer.push(e);
				}
				_tryNext(e) {
					let t;
					const n = this.index++;
					try {
						t = this.project(e, n);
					} catch (r) {
						return void this.destination.error(r);
					}
					this.active++, this._innerSub(t, e, n);
				}
				_innerSub(e, t, n) {
					const r = new k(this, t, n),
						o = this.destination;
					o.add(r);
					const s = (function (e, t, n, r, o = new k(e, n, r)) {
						if (!o.closed) return t instanceof g ? t.subscribe(o) : A(t)(o);
					})(this, e, void 0, void 0, r);
					s !== r && o.add(s);
				}
				_complete() {
					(this.hasCompleted = !0), 0 === this.active && 0 === this.buffer.length && this.destination.complete(), this.unsubscribe();
				}
				notifyNext(e, t, n, r, o) {
					this.destination.next(t);
				}
				notifyComplete(e) {
					const t = this.buffer;
					this.remove(e), this.active--, t.length > 0 ? this._next(t.shift()) : 0 === this.active && this.hasCompleted && this.destination.complete();
				}
			}
			function j(e) {
				return e;
			}
			function M() {
				return function (e) {
					return e.lift(new H(e));
				};
			}
			class H {
				constructor(e) {
					this.connectable = e;
				}
				call(e, t) {
					const { connectable: n } = this;
					n._refCount++;
					const r = new F(e, n),
						o = t.subscribe(r);
					return r.closed || (r.connection = n.connect()), o;
				}
			}
			class F extends p {
				constructor(e, t) {
					super(e), (this.connectable = t);
				}
				_unsubscribe() {
					const { connectable: e } = this;
					if (!e) return void (this.connection = null);
					this.connectable = null;
					const t = e._refCount;
					if (t <= 0) return void (this.connection = null);
					if (((e._refCount = t - 1), t > 1)) return void (this.connection = null);
					const { connection: n } = this,
						r = e._connection;
					(this.connection = null), !r || (n && r !== n) || r.unsubscribe();
				}
			}
			class V extends g {
				constructor(e, t) {
					super(), (this.source = e), (this.subjectFactory = t), (this._refCount = 0), (this._isComplete = !1);
				}
				_subscribe(e) {
					return this.getSubject().subscribe(e);
				}
				getSubject() {
					const e = this._subject;
					return (e && !e.isStopped) || (this._subject = this.subjectFactory()), this._subject;
				}
				connect() {
					let e = this._connection;
					return e || ((this._isComplete = !1), (e = this._connection = new h()), e.add(this.source.subscribe(new U(this.getSubject(), this))), e.closed && ((this._connection = null), (e = h.EMPTY))), e;
				}
				refCount() {
					return M()(this);
				}
			}
			const L = (() => {
				const e = V.prototype;
				return { operator: { value: null }, _refCount: { value: 0, writable: !0 }, _subject: { value: null, writable: !0 }, _connection: { value: null, writable: !0 }, _subscribe: { value: e._subscribe }, _isComplete: { value: e._isComplete, writable: !0 }, getSubject: { value: e.getSubject }, connect: { value: e.connect }, refCount: { value: e.refCount } };
			})();
			class U extends x {
				constructor(e, t) {
					super(e), (this.connectable = t);
				}
				_error(e) {
					this._unsubscribe(), super._error(e);
				}
				_complete() {
					(this.connectable._isComplete = !0), this._unsubscribe(), super._complete();
				}
				_unsubscribe() {
					const e = this.connectable;
					if (e) {
						this.connectable = null;
						const t = e._connection;
						(e._refCount = 0), (e._subject = null), (e._connection = null), t && t.unsubscribe();
					}
				}
			}
			function B() {
				return new C();
			}
			function Z(e) {
				return { toString: e }.toString();
			}
			function $(e, t, n) {
				return Z(() => {
					const r = (function (e) {
						return function (...t) {
							if (e) {
								const n = e(...t);
								for (const e in n) this[e] = n[e];
							}
						};
					})(t);
					function o(...e) {
						if (this instanceof o) return r.apply(this, e), this;
						const t = new o(...e);
						return (n.annotation = t), n;
						function n(e, n, r) {
							const o = e.hasOwnProperty('__parameters__') ? e.__parameters__ : Object.defineProperty(e, '__parameters__', { value: [] }).__parameters__;
							for (; o.length <= r; ) o.push(null);
							return (o[r] = o[r] || []).push(t), e;
						}
					}
					return n && (o.prototype = Object.create(n.prototype)), (o.prototype.ngMetadataName = e), (o.annotationCls = o), o;
				});
			}
			const z = $('Inject', (e) => ({ token: e })),
				q = $('Optional'),
				W = $('Self'),
				Q = $('SkipSelf');
			var G = (function (e) {
				return (e[(e.Default = 0)] = 'Default'), (e[(e.Host = 1)] = 'Host'), (e[(e.Self = 2)] = 'Self'), (e[(e.SkipSelf = 4)] = 'SkipSelf'), (e[(e.Optional = 8)] = 'Optional'), e;
			})({});
			function J(e) {
				for (let t in e) if (e[t] === J) return t;
				throw Error('Could not find renamed property on target object.');
			}
			function K(e) {
				return { token: e.token, providedIn: e.providedIn || null, factory: e.factory, value: void 0 };
			}
			function Y(e) {
				return { factory: e.factory, providers: e.providers || [], imports: e.imports || [] };
			}
			function X(e) {
				return ee(e, e[ne]) || ee(e, e[se]);
			}
			function ee(e, t) {
				return t && t.token === e ? t : null;
			}
			function te(e) {
				return e && (e.hasOwnProperty(re) || e.hasOwnProperty(ie)) ? e[re] : null;
			}
			const ne = J({ '\u0275prov': J }),
				re = J({ '\u0275inj': J }),
				oe = J({ '\u0275provFallback': J }),
				se = J({ ngInjectableDef: J }),
				ie = J({ ngInjectorDef: J });
			function le(e) {
				if ('string' == typeof e) return e;
				if (Array.isArray(e)) return '[' + e.map(le).join(', ') + ']';
				if (null == e) return '' + e;
				if (e.overriddenName) return `${e.overriddenName}`;
				if (e.name) return `${e.name}`;
				const t = e.toString();
				if (null == t) return '' + t;
				const n = t.indexOf('\n');
				return -1 === n ? t : t.substring(0, n);
			}
			function ue(e, t) {
				return null == e || '' === e ? (null === t ? '' : t) : null == t || '' === t ? e : e + ' ' + t;
			}
			const ce = J({ __forward_ref__: J });
			function ae(e) {
				return (
					(e.__forward_ref__ = ae),
					(e.toString = function () {
						return le(this());
					}),
					e
				);
			}
			function he(e) {
				return 'function' == typeof (t = e) && t.hasOwnProperty(ce) && t.__forward_ref__ === ae ? e() : e;
				var t;
			}
			const de = 'undefined' != typeof globalThis && globalThis,
				fe = 'undefined' != typeof window && window,
				pe = 'undefined' != typeof self && 'undefined' != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && self,
				_e = 'undefined' != typeof global && global,
				me = de || _e || fe || pe,
				ye = J({ '\u0275cmp': J }),
				ge = J({ '\u0275dir': J }),
				ve = J({ '\u0275pipe': J }),
				we = J({ '\u0275mod': J }),
				be = J({ '\u0275loc': J }),
				xe = J({ '\u0275fac': J }),
				Ce = J({ __NG_ELEMENT_ID__: J });
			class Ee {
				constructor(e, t) {
					(this._desc = e), (this.ngMetadataName = 'InjectionToken'), (this.ɵprov = void 0), 'number' == typeof t ? (this.__NG_ELEMENT_ID__ = t) : void 0 !== t && (this.ɵprov = K({ token: this, providedIn: t.providedIn || 'root', factory: t.factory }));
				}
				toString() {
					return `InjectionToken ${this._desc}`;
				}
			}
			const ke = new Ee('INJECTOR', -1),
				Te = {},
				Ie = /\n/gm,
				Se = J({ provide: String, useValue: J });
			let Ae,
				De = void 0;
			function Oe(e) {
				const t = De;
				return (De = e), t;
			}
			function Ne(e) {
				const t = Ae;
				return (Ae = e), t;
			}
			function Pe(e, t = G.Default) {
				if (void 0 === De) throw new Error('inject() must be called from an injection context');
				return null === De ? je(e, void 0, t) : De.get(e, t & G.Optional ? null : void 0, t);
			}
			function Re(e, t = G.Default) {
				return (Ae || Pe)(he(e), t);
			}
			function je(e, t, n) {
				const r = X(e);
				if (r && 'root' == r.providedIn) return void 0 === r.value ? (r.value = r.factory()) : r.value;
				if (n & G.Optional) return null;
				if (void 0 !== t) return t;
				throw new Error(`Injector: NOT_FOUND [${le(e)}]`);
			}
			function Me(e) {
				const t = [];
				for (let n = 0; n < e.length; n++) {
					const r = he(e[n]);
					if (Array.isArray(r)) {
						if (0 === r.length) throw new Error('Arguments array must have arguments.');
						let e = void 0,
							n = G.Default;
						for (let t = 0; t < r.length; t++) {
							const o = r[t];
							o instanceof q || 'Optional' === o.ngMetadataName || o === q ? (n |= G.Optional) : o instanceof Q || 'SkipSelf' === o.ngMetadataName || o === Q ? (n |= G.SkipSelf) : o instanceof W || 'Self' === o.ngMetadataName || o === W ? (n |= G.Self) : (e = o instanceof z || o === z ? o.token : o);
						}
						t.push(Re(e, n));
					} else t.push(Re(r));
				}
				return t;
			}
			class He {
				get(e, t = Te) {
					if (t === Te) {
						const t = new Error(`NullInjectorError: No provider for ${le(e)}!`);
						throw ((t.name = 'NullInjectorError'), t);
					}
					return t;
				}
			}
			class Fe {}
			function Ve(e, t) {
				e.forEach((e) => (Array.isArray(e) ? Ve(e, t) : t(e)));
			}
			const Le = (function () {
					var e = { OnPush: 0, Default: 1 };
					return (e[e.OnPush] = 'OnPush'), (e[e.Default] = 'Default'), e;
				})(),
				Ue = (function () {
					var e = { Emulated: 0, Native: 1, None: 2, ShadowDom: 3 };
					return (e[e.Emulated] = 'Emulated'), (e[e.Native] = 'Native'), (e[e.None] = 'None'), (e[e.ShadowDom] = 'ShadowDom'), e;
				})(),
				Be = {},
				Ze = [];
			let $e = 0;
			function ze(e) {
				return Z(() => {
					const t = e.type,
						n = t.prototype,
						r = {},
						o = {
							type: t,
							providersResolver: null,
							decls: e.decls,
							vars: e.vars,
							factory: null,
							template: e.template || null,
							consts: e.consts || null,
							ngContentSelectors: e.ngContentSelectors,
							hostBindings: e.hostBindings || null,
							hostVars: e.hostVars || 0,
							hostAttrs: e.hostAttrs || null,
							contentQueries: e.contentQueries || null,
							declaredInputs: r,
							inputs: null,
							outputs: null,
							exportAs: e.exportAs || null,
							onChanges: null,
							onInit: n.ngOnInit || null,
							doCheck: n.ngDoCheck || null,
							afterContentInit: n.ngAfterContentInit || null,
							afterContentChecked: n.ngAfterContentChecked || null,
							afterViewInit: n.ngAfterViewInit || null,
							afterViewChecked: n.ngAfterViewChecked || null,
							onDestroy: n.ngOnDestroy || null,
							onPush: e.changeDetection === Le.OnPush,
							directiveDefs: null,
							pipeDefs: null,
							selectors: e.selectors || Ze,
							viewQuery: e.viewQuery || null,
							features: e.features || null,
							data: e.data || {},
							encapsulation: e.encapsulation || Ue.Emulated,
							id: 'c',
							styles: e.styles || Ze,
							_: null,
							setInput: null,
							schemas: e.schemas || null,
							tView: null,
						},
						s = e.directives,
						i = e.features,
						l = e.pipes;
					return (o.id += $e++), (o.inputs = Je(e.inputs, r)), (o.outputs = Je(e.outputs)), i && i.forEach((e) => e(o)), (o.directiveDefs = s ? () => ('function' == typeof s ? s() : s).map(qe) : null), (o.pipeDefs = l ? () => ('function' == typeof l ? l() : l).map(We) : null), o;
				});
			}
			function qe(e) {
				return (
					Ke(e) ||
					(function (e) {
						return e[ge] || null;
					})(e)
				);
			}
			function We(e) {
				return (function (e) {
					return e[ve] || null;
				})(e);
			}
			const Qe = {};
			function Ge(e) {
				const t = { type: e.type, bootstrap: e.bootstrap || Ze, declarations: e.declarations || Ze, imports: e.imports || Ze, exports: e.exports || Ze, transitiveCompileScopes: null, schemas: e.schemas || null, id: e.id || null };
				return (
					null != e.id &&
						Z(() => {
							Qe[e.id] = e.type;
						}),
					t
				);
			}
			function Je(e, t) {
				if (null == e) return Be;
				const n = {};
				for (const r in e)
					if (e.hasOwnProperty(r)) {
						let o = e[r],
							s = o;
						Array.isArray(o) && ((s = o[1]), (o = o[0])), (n[o] = r), t && (t[o] = s);
					}
				return n;
			}
			function Ke(e) {
				return e[ye] || null;
			}
			function Ye(e, t) {
				return e.hasOwnProperty(xe) ? e[xe] : null;
			}
			function Xe(e, t) {
				const n = e[we] || null;
				if (!n && !0 === t) throw new Error(`Type ${le(e)} does not have '\u0275mod' property.`);
				return n;
			}
			function et(e) {
				return Array.isArray(e) && 'object' == typeof e[1];
			}
			function tt(e) {
				return Array.isArray(e) && !0 === e[1];
			}
			function nt(e) {
				return 0 != (8 & e.flags);
			}
			function rt(e) {
				return 2 == (2 & e.flags);
			}
			function ot(e) {
				return 1 == (1 & e.flags);
			}
			function st(e) {
				return null !== e.template;
			}
			const it = { lFrame: bt(null), bindingsEnabled: !0, checkNoChangesMode: !1 };
			function lt() {
				return it.bindingsEnabled;
			}
			function ut() {
				return it.lFrame.lView;
			}
			function ct() {
				return it.lFrame.tView;
			}
			function at() {
				return it.lFrame.previousOrParentTNode;
			}
			function ht(e, t) {
				(it.lFrame.previousOrParentTNode = e), (it.lFrame.isParent = t);
			}
			function dt() {
				return it.lFrame.isParent;
			}
			function ft() {
				return it.checkNoChangesMode;
			}
			function pt(e) {
				it.checkNoChangesMode = e;
			}
			function _t() {
				return it.lFrame.bindingIndex++;
			}
			function mt(e, t) {
				const n = it.lFrame;
				(n.bindingIndex = n.bindingRootIndex = e), (n.currentDirectiveIndex = t);
			}
			function yt(e) {
				it.lFrame.currentQueryIndex = e;
			}
			function gt(e, t) {
				const n = wt();
				(it.lFrame = n), (n.previousOrParentTNode = t), (n.lView = e);
			}
			function vt(e, t) {
				const n = wt(),
					r = e[1];
				(it.lFrame = n), (n.previousOrParentTNode = t), (n.lView = e), (n.tView = r), (n.contextLView = e), (n.bindingIndex = r.bindingStartIndex);
			}
			function wt() {
				const e = it.lFrame,
					t = null === e ? null : e.child;
				return null === t ? bt(e) : t;
			}
			function bt(e) {
				const t = { previousOrParentTNode: null, isParent: !0, lView: null, tView: null, selectedIndex: 0, contextLView: null, elementDepthCount: 0, currentNamespace: null, currentSanitizer: null, currentDirectiveIndex: -1, bindingRootIndex: -1, bindingIndex: -1, currentQueryIndex: 0, parent: e, child: null };
				return null !== e && (e.child = t), t;
			}
			function xt() {
				const e = it.lFrame;
				return (it.lFrame = e.parent), (e.previousOrParentTNode = null), (e.lView = null), e;
			}
			const Ct = xt;
			function Et() {
				const e = xt();
				(e.isParent = !0), (e.tView = null), (e.selectedIndex = 0), (e.contextLView = null), (e.elementDepthCount = 0), (e.currentDirectiveIndex = -1), (e.currentNamespace = null), (e.currentSanitizer = null), (e.bindingRootIndex = -1), (e.bindingIndex = -1), (e.currentQueryIndex = 0);
			}
			function kt() {
				return it.lFrame.selectedIndex;
			}
			function Tt(e) {
				it.lFrame.selectedIndex = e;
			}
			function It(e, t) {
				for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
					const t = e.data[n];
					t.afterContentInit && (e.contentHooks || (e.contentHooks = [])).push(-n, t.afterContentInit), t.afterContentChecked && ((e.contentHooks || (e.contentHooks = [])).push(n, t.afterContentChecked), (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, t.afterContentChecked)), t.afterViewInit && (e.viewHooks || (e.viewHooks = [])).push(-n, t.afterViewInit), t.afterViewChecked && ((e.viewHooks || (e.viewHooks = [])).push(n, t.afterViewChecked), (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, t.afterViewChecked)), null != t.onDestroy && (e.destroyHooks || (e.destroyHooks = [])).push(n, t.onDestroy);
				}
			}
			function St(e, t, n) {
				Ot(e, t, 3, n);
			}
			function At(e, t, n, r) {
				(3 & e[2]) === n && Ot(e, t, n, r);
			}
			function Dt(e, t) {
				let n = e[2];
				(3 & n) === t && ((n &= 1023), (n += 1), (e[2] = n));
			}
			function Ot(e, t, n, r) {
				const o = null != r ? r : -1;
				let s = 0;
				for (let i = void 0 !== r ? 65535 & e[18] : 0; i < t.length; i++)
					if ('number' == typeof t[i + 1]) {
						if (((s = t[i]), null != r && s >= r)) break;
					} else t[i] < 0 && (e[18] += 65536), (s < o || -1 == o) && (Nt(e, n, t, i), (e[18] = (4294901760 & e[18]) + i + 2)), i++;
			}
			function Nt(e, t, n, r) {
				const o = n[r] < 0,
					s = n[r + 1],
					i = e[o ? -n[r] : n[r]];
				o ? e[2] >> 10 < e[18] >> 16 && (3 & e[2]) === t && ((e[2] += 1024), s.call(i)) : s.call(i);
			}
			class Pt {
				constructor(e, t, n) {
					(this.factory = e), (this.resolving = !1), (this.canSeeViewProviders = t), (this.injectImpl = n);
				}
			}
			let Rt = void 0;
			function jt(e) {
				return !!e.listen;
			}
			const Mt = { createRenderer: (e, t) => (void 0 !== Rt ? Rt : 'undefined' != typeof document ? document : void 0) };
			function Ht(e, t, n) {
				const r = jt(e);
				let o = 0;
				for (; o < n.length; ) {
					const s = n[o];
					if ('number' == typeof s) {
						if (0 !== s) break;
						o++;
						const i = n[o++],
							l = n[o++],
							u = n[o++];
						r ? e.setAttribute(t, l, u, i) : t.setAttributeNS(i, l, u);
					} else {
						const i = s,
							l = n[++o];
						Ft(i) ? r && e.setProperty(t, i, l) : r ? e.setAttribute(t, i, l) : t.setAttribute(i, l), o++;
					}
				}
				return o;
			}
			function Ft(e) {
				return 64 === e.charCodeAt(0);
			}
			function Vt(e, t) {
				if (null === t || 0 === t.length);
				else if (null === e || 0 === e.length) e = t.slice();
				else {
					let n = -1;
					for (let r = 0; r < t.length; r++) {
						const o = t[r];
						'number' == typeof o ? (n = o) : 0 === n || Lt(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
					}
				}
				return e;
			}
			function Lt(e, t, n, r, o) {
				let s = 0,
					i = e.length;
				if (-1 === t) i = -1;
				else
					for (; s < e.length; ) {
						const n = e[s++];
						if ('number' == typeof n) {
							if (n === t) {
								i = -1;
								break;
							}
							if (n > t) {
								i = s - 1;
								break;
							}
						}
					}
				for (; s < e.length; ) {
					const t = e[s];
					if ('number' == typeof t) break;
					if (t === n) {
						if (null === r) return void (null !== o && (e[s + 1] = o));
						if (r === e[s + 1]) return void (e[s + 2] = o);
					}
					s++, null !== r && s++, null !== o && s++;
				}
				-1 !== i && (e.splice(i, 0, t), (s = i + 1)), e.splice(s++, 0, n), null !== r && e.splice(s++, 0, r), null !== o && e.splice(s++, 0, o);
			}
			function Ut(e) {
				return 32767 & e;
			}
			function Bt(e, t) {
				let n = e >> 16,
					r = t;
				for (; n > 0; ) (r = r[15]), n--;
				return r;
			}
			function Zt(e) {
				return 'string' == typeof e ? e : null == e ? '' : '' + e;
			}
			function $t(e) {
				return 'function' == typeof e ? e.name || e.toString() : 'object' == typeof e && null != e && 'function' == typeof e.type ? e.type.name || e.type.toString() : Zt(e);
			}
			const zt = (() => (('undefined' != typeof requestAnimationFrame && requestAnimationFrame) || setTimeout).bind(me))();
			function qt(e) {
				return e instanceof Function ? e() : e;
			}
			let Wt = !0;
			function Qt(e) {
				const t = Wt;
				return (Wt = e), t;
			}
			let Gt = 0;
			function Jt(e, t) {
				const n = Yt(e, t);
				if (-1 !== n) return n;
				const r = t[1];
				r.firstCreatePass && ((e.injectorIndex = t.length), Kt(r.data, e), Kt(t, null), Kt(r.blueprint, null));
				const o = Xt(e, t),
					s = e.injectorIndex;
				if (-1 !== o) {
					const e = Ut(o),
						n = Bt(o, t),
						r = n[1].data;
					for (let o = 0; o < 8; o++) t[s + o] = n[e + o] | r[e + o];
				}
				return (t[s + 8] = o), s;
			}
			function Kt(e, t) {
				e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
			}
			function Yt(e, t) {
				return -1 === e.injectorIndex || (e.parent && e.parent.injectorIndex === e.injectorIndex) || null == t[e.injectorIndex + 8] ? -1 : e.injectorIndex;
			}
			function Xt(e, t) {
				if (e.parent && -1 !== e.parent.injectorIndex) return e.parent.injectorIndex;
				let n = t[6],
					r = 1;
				for (; n && -1 === n.injectorIndex; ) (n = (t = t[15]) ? t[6] : null), r++;
				return n ? n.injectorIndex | (r << 16) : -1;
			}
			function en(e, t, n) {
				!(function (e, t, n) {
					let r = 'string' != typeof n ? n[Ce] : n.charCodeAt(0) || 0;
					null == r && (r = n[Ce] = Gt++);
					const o = 255 & r,
						s = 1 << o,
						i = 64 & o,
						l = 32 & o,
						u = t.data;
					128 & o ? (i ? (l ? (u[e + 7] |= s) : (u[e + 6] |= s)) : l ? (u[e + 5] |= s) : (u[e + 4] |= s)) : i ? (l ? (u[e + 3] |= s) : (u[e + 2] |= s)) : l ? (u[e + 1] |= s) : (u[e] |= s);
				})(e, t, n);
			}
			const tn = {};
			function nn(e, t, n, r, o, s) {
				const i = t[1],
					l = i.data[e + 8],
					u = (function (e, t, n, r, o) {
						const s = e.providerIndexes,
							i = t.data,
							l = 65535 & s,
							u = e.directiveStart,
							c = s >> 16,
							a = o ? l + c : e.directiveEnd;
						for (let h = r ? l : l + c; h < a; h++) {
							const e = i[h];
							if ((h < u && n === e) || (h >= u && e.type === n)) return h;
						}
						if (o) {
							const e = i[u];
							if (e && st(e) && e.type === n) return u;
						}
						return null;
					})(l, i, n, null == r ? rt(l) && Wt : r != i && 3 === l.type, o & G.Host && s === l);
				return null !== u ? rn(t, i, u, l) : tn;
			}
			function rn(e, t, n, r) {
				let o = e[n];
				const s = t.data;
				if (o instanceof Pt) {
					const i = o;
					if (i.resolving) throw new Error(`Circular dep for ${$t(s[n])}`);
					const l = Qt(i.canSeeViewProviders);
					let u;
					(i.resolving = !0), i.injectImpl && (u = Ne(i.injectImpl)), gt(e, r);
					try {
						(o = e[n] = i.factory(void 0, s, e, r)),
							t.firstCreatePass &&
								n >= r.directiveStart &&
								(function (e, t, n) {
									const { onChanges: r, onInit: o, doCheck: s } = t;
									r && ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, r), (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(e, r)), o && (n.preOrderHooks || (n.preOrderHooks = [])).push(-e, o), s && ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, s), (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(e, s));
								})(n, s[n], t);
					} finally {
						i.injectImpl && Ne(u), Qt(l), (i.resolving = !1), Ct();
					}
				}
				return o;
			}
			function on(e, t, n) {
				const r = 64 & e,
					o = 32 & e;
				let s;
				return (s = 128 & e ? (r ? (o ? n[t + 7] : n[t + 6]) : o ? n[t + 5] : n[t + 4]) : r ? (o ? n[t + 3] : n[t + 2]) : o ? n[t + 1] : n[t]), !!(s & (1 << e));
			}
			function sn(e, t) {
				return !(e & G.Self || (e & G.Host && t));
			}
			class ln {
				constructor(e, t) {
					(this._tNode = e), (this._lView = t);
				}
				get(e, t) {
					return (function (e, t, n, r = G.Default, o) {
						if (null !== e) {
							const o = (function (e) {
								if ('string' == typeof e) return e.charCodeAt(0) || 0;
								const t = e[Ce];
								return 'number' == typeof t && t > 0 ? 255 & t : t;
							})(n);
							if ('function' == typeof o) {
								gt(t, e);
								try {
									const e = o();
									if (null != e || r & G.Optional) return e;
									throw new Error(`No provider for ${$t(n)}!`);
								} finally {
									Ct();
								}
							} else if ('number' == typeof o) {
								if (-1 === o) return new ln(e, t);
								let s = null,
									i = Yt(e, t),
									l = -1,
									u = r & G.Host ? t[16][6] : null;
								for ((-1 === i || r & G.SkipSelf) && ((l = -1 === i ? Xt(e, t) : t[i + 8]), sn(r, !1) ? ((s = t[1]), (i = Ut(l)), (t = Bt(l, t))) : (i = -1)); -1 !== i; ) {
									l = t[i + 8];
									const e = t[1];
									if (on(o, i, e.data)) {
										const e = nn(i, t, n, s, r, u);
										if (e !== tn) return e;
									}
									sn(r, t[1].data[i + 8] === u) && on(o, i, t) ? ((s = e), (i = Ut(l)), (t = Bt(l, t))) : (i = -1);
								}
							}
						}
						if ((r & G.Optional && void 0 === o && (o = null), 0 == (r & (G.Self | G.Host)))) {
							const e = t[9],
								s = Ne(void 0);
							try {
								return e ? e.get(n, o, r & G.Optional) : je(n, o, r & G.Optional);
							} finally {
								Ne(s);
							}
						}
						if (r & G.Optional) return o;
						throw new Error(`NodeInjector: NOT_FOUND [${$t(n)}]`);
					})(this._tNode, this._lView, e, void 0, t);
				}
			}
			function un(e) {
				return e.ngDebugContext;
			}
			function cn(e) {
				return e.ngOriginalError;
			}
			function an(e, ...t) {
				e.error(...t);
			}
			class hn {
				constructor() {
					this._console = console;
				}
				handleError(e) {
					const t = this._findOriginalError(e),
						n = this._findContext(e),
						r = (function (e) {
							return e.ngErrorLogger || an;
						})(e);
					r(this._console, 'ERROR', e), t && r(this._console, 'ORIGINAL ERROR', t), n && r(this._console, 'ERROR CONTEXT', n);
				}
				_findContext(e) {
					return e ? (un(e) ? un(e) : this._findContext(cn(e))) : null;
				}
				_findOriginalError(e) {
					let t = cn(e);
					for (; t && cn(t); ) t = cn(t);
					return t;
				}
			}
			let dn = !0,
				fn = !1;
			function pn() {
				return (fn = !0), dn;
			}
			function _n(e) {
				for (; Array.isArray(e); ) e = e[0];
				return e;
			}
			function mn(e, t) {
				return _n(t[e + 19]);
			}
			function yn(e, t) {
				return _n(t[e.index]);
			}
			function gn(e, t) {
				return e.data[t + 19];
			}
			function vn(e, t) {
				const n = t[e];
				return et(n) ? n : n[0];
			}
			function wn(e) {
				const t = (function (e) {
					return e.__ngContext__ || null;
				})(e);
				return t ? (Array.isArray(t) ? t : t.lView) : null;
			}
			function bn(e) {
				return 128 == (128 & e[2]);
			}
			function xn(e, t) {
				return null === e || null == t ? null : e[t];
			}
			function Cn(e) {
				e[18] = 0;
			}
			function En(e, t) {
				e.__ngContext__ = t;
			}
			function kn(e) {
				throw new Error(`Multiple components match node with tagname ${e.tagName}`);
			}
			function Tn() {
				throw new Error('Cannot mix multi providers and regular providers');
			}
			function In(e, t, n) {
				let r = e.length;
				for (;;) {
					const o = e.indexOf(t, n);
					if (-1 === o) return o;
					if (0 === o || e.charCodeAt(o - 1) <= 32) {
						const n = t.length;
						if (o + n === r || e.charCodeAt(o + n) <= 32) return o;
					}
					n = o + 1;
				}
			}
			function Sn(e, t, n) {
				let r = 0;
				for (; r < e.length; ) {
					let o = e[r++];
					if (n && 'class' === o) {
						if (((o = e[r]), -1 !== In(o.toLowerCase(), t, 0))) return !0;
					} else if (1 === o) {
						for (; r < e.length && 'string' == typeof (o = e[r++]); ) if (o.toLowerCase() === t) return !0;
						return !1;
					}
				}
				return !1;
			}
			function An(e, t, n) {
				return t === (0 !== e.type || n ? e.tagName : 'ng-template');
			}
			function Dn(e, t, n) {
				let r = 4;
				const o = e.attrs || [],
					s = (function (e) {
						for (let n = 0; n < e.length; n++) if (3 === (t = e[n]) || 4 === t || 6 === t) return n;
						var t;
						return e.length;
					})(o);
				let i = !1;
				for (let l = 0; l < t.length; l++) {
					const u = t[l];
					if ('number' != typeof u) {
						if (!i)
							if (4 & r) {
								if (((r = 2 | (1 & r)), ('' !== u && !An(e, u, n)) || ('' === u && 1 === t.length))) {
									if (On(r)) return !1;
									i = !0;
								}
							} else {
								const c = 8 & r ? u : t[++l];
								if (8 & r && null !== e.attrs) {
									if (!Sn(e.attrs, c, n)) {
										if (On(r)) return !1;
										i = !0;
									}
									continue;
								}
								const a = Nn(8 & r ? 'class' : u, o, 0 == e.type && 'ng-template' !== e.tagName, n);
								if (-1 === a) {
									if (On(r)) return !1;
									i = !0;
									continue;
								}
								if ('' !== c) {
									let e;
									e = a > s ? '' : o[a + 1].toLowerCase();
									const t = 8 & r ? e : null;
									if ((t && -1 !== In(t, c, 0)) || (2 & r && c !== e)) {
										if (On(r)) return !1;
										i = !0;
									}
								}
							}
					} else {
						if (!i && !On(r) && !On(u)) return !1;
						if (i && On(u)) continue;
						(i = !1), (r = u | (1 & r));
					}
				}
				return On(r) || i;
			}
			function On(e) {
				return 0 == (1 & e);
			}
			function Nn(e, t, n, r) {
				if (null === t) return -1;
				let o = 0;
				if (r || !n) {
					let n = !1;
					for (; o < t.length; ) {
						const r = t[o];
						if (r === e) return o;
						if (3 === r || 6 === r) n = !0;
						else {
							if (1 === r || 2 === r) {
								let e = t[++o];
								for (; 'string' == typeof e; ) e = t[++o];
								continue;
							}
							if (4 === r) break;
							if (0 === r) {
								o += 4;
								continue;
							}
						}
						o += n ? 1 : 2;
					}
					return -1;
				}
				return (function (e, t) {
					let n = e.indexOf(4);
					if (n > -1)
						for (n++; n < e.length; ) {
							if (e[n] === t) return n;
							n++;
						}
					return -1;
				})(t, e);
			}
			function Pn(e, t, n = !1) {
				for (let r = 0; r < t.length; r++) if (Dn(e, t[r], n)) return !0;
				return !1;
			}
			function Rn(e, t) {
				return e ? ':not(' + t.trim() + ')' : t;
			}
			function jn(e) {
				let t = e[0],
					n = 1,
					r = 2,
					o = '',
					s = !1;
				for (; n < e.length; ) {
					let i = e[n];
					if ('string' == typeof i)
						if (2 & r) {
							const t = e[++n];
							o += '[' + i + (t.length > 0 ? '="' + t + '"' : '') + ']';
						} else 8 & r ? (o += '.' + i) : 4 & r && (o += ' ' + i);
					else '' === o || On(i) || ((t += Rn(s, o)), (o = '')), (r = i), (s = s || !On(r));
					n++;
				}
				return '' !== o && (t += Rn(s, o)), t;
			}
			const Mn = {};
			function Hn(e) {
				const t = e[3];
				return tt(t) ? t[3] : t;
			}
			function Fn(e, t, n, r) {
				if (!r)
					if (3 == (3 & t[2])) {
						const r = e.preOrderCheckHooks;
						null !== r && St(t, r, n);
					} else {
						const r = e.preOrderHooks;
						null !== r && At(t, r, 0, n);
					}
				Tt(n);
			}
			function Vn(e, t) {
				const n = e.contentQueries;
				if (null !== n)
					for (let r = 0; r < n.length; r += 2) {
						const o = n[r],
							s = n[r + 1];
						if (-1 !== s) {
							const n = e.data[s];
							yt(o), n.contentQueries(2, t[s], s);
						}
					}
			}
			function Ln(e, t, n) {
				return jt(t) ? t.createElement(e, n) : null === n ? t.createElement(e) : t.createElementNS(n, e);
			}
			function Un(e, t, n, r, o, s, i, l, u, c) {
				const a = t.blueprint.slice();
				return (a[0] = o), (a[2] = 140 | r), Cn(a), (a[3] = a[15] = e), (a[8] = n), (a[10] = i || (e && e[10])), (a[11] = l || (e && e[11])), (a[12] = u || (e && e[12]) || null), (a[9] = c || (e && e[9]) || null), (a[6] = s), (a[16] = 2 == t.type ? e[16] : a), a;
			}
			function Bn(e, t, n, r, o, s) {
				const i = n + 19,
					l =
						e.data[i] ||
						(function (e, t, n, r, o, s) {
							const i = at(),
								l = dt(),
								u = l ? i : i && i.parent,
								c = (e.data[n] = Gn(0, u && u !== t ? u : null, r, n, o, s));
							return null === e.firstChild && (e.firstChild = c), i && (!l || null != i.child || (null === c.parent && 2 !== i.type) ? l || (i.next = c) : (i.child = c)), c;
						})(e, t, i, r, o, s);
				return ht(l, !0), l;
			}
			function Zn(e, t, n) {
				vt(t, t[6]);
				try {
					const r = e.viewQuery;
					null !== r && _r(1, r, n);
					const o = e.template;
					null !== o && qn(e, t, o, 1, n), e.firstCreatePass && (e.firstCreatePass = !1), e.staticContentQueries && Vn(e, t), e.staticViewQueries && _r(2, e.viewQuery, n);
					const s = e.components;
					null !== s &&
						(function (e, t) {
							for (let n = 0; n < t.length; n++) ar(e, t[n]);
						})(t, s);
				} finally {
					(t[2] &= -5), Et();
				}
			}
			function $n(e, t, n, r) {
				const o = t[2];
				if (256 == (256 & o)) return;
				vt(t, t[6]);
				const s = ft();
				try {
					Cn(t), (it.lFrame.bindingIndex = e.bindingStartIndex), null !== n && qn(e, t, n, 2, r);
					const i = 3 == (3 & o);
					if (!s)
						if (i) {
							const n = e.preOrderCheckHooks;
							null !== n && St(t, n, null);
						} else {
							const n = e.preOrderHooks;
							null !== n && At(t, n, 0, null), Dt(t, 0);
						}
					if (
						((function (e) {
							let t = e[13];
							for (; null !== t; ) {
								let n;
								if (tt(t) && (n = t[2]) >> 1 == -1) {
									for (let e = 9; e < t.length; e++) {
										const n = t[e],
											r = n[1];
										bn(n) && $n(r, n, r.template, n[8]);
									}
									0 != (1 & n) && ur(t, e[16]);
								}
								t = t[4];
							}
						})(t),
						null !== e.contentQueries && Vn(e, t),
						!s)
					)
						if (i) {
							const n = e.contentCheckHooks;
							null !== n && St(t, n);
						} else {
							const n = e.contentHooks;
							null !== n && At(t, n, 1), Dt(t, 1);
						}
					!(function (e, t) {
						try {
							const n = e.expandoInstructions;
							if (null !== n) {
								let r = e.expandoStartIndex,
									o = -1,
									s = -1;
								for (let e = 0; e < n.length; e++) {
									const i = n[e];
									'number' == typeof i ? (i <= 0 ? ((s = 0 - i), Tt(s), (r += 9 + n[++e]), (o = r)) : (r += i)) : (null !== i && (mt(r, o), i(2, t[o])), o++);
								}
							}
						} finally {
							Tt(-1);
						}
					})(e, t);
					const l = e.components;
					null !== l &&
						(function (e, t) {
							for (let n = 0; n < t.length; n++) cr(e, t[n]);
						})(t, l);
					const u = e.viewQuery;
					if ((null !== u && _r(2, u, r), !s))
						if (i) {
							const n = e.viewCheckHooks;
							null !== n && St(t, n);
						} else {
							const n = e.viewHooks;
							null !== n && At(t, n, 2), Dt(t, 2);
						}
					!0 === e.firstUpdatePass && (e.firstUpdatePass = !1), s || (t[2] &= -73);
				} finally {
					Et();
				}
			}
			function zn(e, t, n, r) {
				const o = t[10],
					s = !ft(),
					i = 4 == (4 & t[2]);
				try {
					s && !i && o.begin && o.begin(), i && Zn(e, t, r), $n(e, t, n, r);
				} finally {
					s && !i && o.end && o.end();
				}
			}
			function qn(e, t, n, r, o) {
				const s = kt();
				try {
					Tt(-1), 2 & r && t.length > 19 && Fn(e, t, 0, ft()), n(r, o);
				} finally {
					Tt(s);
				}
			}
			function Wn(e) {
				return e.tView || (e.tView = Qn(1, -1, e.template, e.decls, e.vars, e.directiveDefs, e.pipeDefs, e.viewQuery, e.schemas, e.consts));
			}
			function Qn(e, t, n, r, o, s, i, l, u, c) {
				const a = 19 + r,
					h = a + o,
					d = (function (e, t) {
						const n = [];
						for (let r = 0; r < t; r++) n.push(r < e ? null : Mn);
						return n;
					})(a, h);
				return (d[1] = { type: e, id: t, blueprint: d, template: n, queries: null, viewQuery: l, node: null, data: d.slice().fill(null, a), bindingStartIndex: a, expandoStartIndex: h, expandoInstructions: null, firstCreatePass: !0, firstUpdatePass: !0, staticViewQueries: !1, staticContentQueries: !1, preOrderHooks: null, preOrderCheckHooks: null, contentHooks: null, contentCheckHooks: null, viewHooks: null, viewCheckHooks: null, destroyHooks: null, cleanup: null, contentQueries: null, components: null, directiveRegistry: 'function' == typeof s ? s() : s, pipeRegistry: 'function' == typeof i ? i() : i, firstChild: null, schemas: u, consts: c });
			}
			function Gn(e, t, n, r, o, s) {
				return { type: n, index: r, injectorIndex: t ? t.injectorIndex : -1, directiveStart: -1, directiveEnd: -1, directiveStylingLast: -1, propertyBindings: null, flags: 0, providerIndexes: 0, tagName: o, attrs: s, mergedAttrs: null, localNames: null, initialInputs: void 0, inputs: null, outputs: null, tViews: null, next: null, projectionNext: null, child: null, parent: t, projection: null, styles: null, residualStyles: void 0, classes: null, residualClasses: void 0, classBindings: 0, styleBindings: 0 };
			}
			function Jn(e, t, n) {
				for (let r in e)
					if (e.hasOwnProperty(r)) {
						const o = e[r];
						(n = null === n ? {} : n).hasOwnProperty(r) ? n[r].push(t, o) : (n[r] = [t, o]);
					}
				return n;
			}
			function Kn(e, t) {
				const n = e.expandoInstructions;
				n.push(t.hostBindings), 0 !== t.hostVars && n.push(t.hostVars);
			}
			function Yn(e, t, n) {
				for (let r = 0; r < n; r++) t.push(Mn), e.blueprint.push(Mn), e.data.push(null);
			}
			function Xn(e, t) {
				null !== e.hostBindings && e.hostBindings(1, t);
			}
			function er(e, t, n) {
				const r = 19 - t.index,
					o = e.data.length - (65535 & t.providerIndexes);
				(e.expandoInstructions || (e.expandoInstructions = [])).push(r, o, n);
			}
			function tr(e, t) {
				(t.flags |= 2), (e.components || (e.components = [])).push(t.index);
			}
			function nr(e, t, n) {
				if (n) {
					if (t.exportAs) for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
					st(t) && (n[''] = e);
				}
			}
			function rr(e, t, n) {
				(e.flags |= 1), (e.directiveStart = t), (e.directiveEnd = t + n), (e.providerIndexes = t);
			}
			function or(e, t, n) {
				e.data.push(n);
				const r = n.factory || (n.factory = Ye(n.type)),
					o = new Pt(r, st(n), null);
				e.blueprint.push(o), t.push(o);
			}
			function sr(e, t, n) {
				const r = yn(t, e),
					o = Wn(n),
					s = e[10],
					i = hr(e, Un(e, o, null, n.onPush ? 64 : 16, r, t, s, s.createRenderer(r, n)));
				e[t.index] = i;
			}
			function ir(e, t, n, r, o, s) {
				const i = s[t];
				if (null !== i) {
					const e = r.setInput;
					for (let t = 0; t < i.length; ) {
						const o = i[t++],
							s = i[t++],
							l = i[t++];
						null !== e ? r.setInput(n, l, o, s) : (n[s] = l);
					}
				}
			}
			function lr(e, t) {
				let n = null,
					r = 0;
				for (; r < t.length; ) {
					const o = t[r];
					if (0 !== o)
						if (5 !== o) {
							if ('number' == typeof o) break;
							e.hasOwnProperty(o) && (null === n && (n = []), n.push(o, e[o], t[r + 1])), (r += 2);
						} else r += 2;
					else r += 4;
				}
				return n;
			}
			function ur(e, t) {
				const n = e[5];
				for (let r = 0; r < n.length; r++) {
					const e = n[r],
						o = e[3][3][16];
					if (o !== t && 0 == (16 & o[2])) {
						const t = e[1];
						$n(t, e, t.template, e[8]);
					}
				}
			}
			function cr(e, t) {
				const n = vn(t, e);
				if (bn(n) && 80 & n[2]) {
					const e = n[1];
					$n(e, n, e.template, n[8]);
				}
			}
			function ar(e, t) {
				const n = vn(t, e),
					r = n[1];
				!(function (e, t) {
					for (let n = t.length; n < e.blueprint.length; n++) t.push(e.blueprint[n]);
				})(r, n),
					Zn(r, n, n[8]);
			}
			function hr(e, t) {
				return e[13] ? (e[14][4] = t) : (e[13] = t), (e[14] = t), t;
			}
			function dr(e) {
				for (; e; ) {
					e[2] |= 64;
					const t = Hn(e);
					if (0 != (512 & e[2]) && !t) return e;
					e = t;
				}
				return null;
			}
			function fr(e, t, n) {
				const r = t[10];
				r.begin && r.begin();
				try {
					$n(e, t, e.template, n);
				} catch (o) {
					throw (gr(t, o), o);
				} finally {
					r.end && r.end();
				}
			}
			function pr(e) {
				!(function (e) {
					for (let t = 0; t < e.components.length; t++) {
						const n = e.components[t],
							r = wn(n),
							o = r[1];
						zn(o, r, o.template, n);
					}
				})(e[8]);
			}
			function _r(e, t, n) {
				yt(0), t(e, n);
			}
			const mr = (() => Promise.resolve(null))();
			function yr(e) {
				return e[7] || (e[7] = []);
			}
			function gr(e, t) {
				const n = e[9],
					r = n ? n.get(hn, null) : null;
				r && r.handleError(t);
			}
			function vr(e, t, n, r, o) {
				for (let s = 0; s < n.length; ) {
					const i = n[s++],
						l = n[s++],
						u = t[i],
						c = e.data[i];
					null !== c.setInput ? c.setInput(u, o, r, l) : (u[l] = o);
				}
			}
			function wr(e, t) {
				const n = t[3];
				return -1 === e.index ? (tt(n) ? n : null) : n;
			}
			function br(e, t, n, r, o) {
				if (null != r) {
					let s,
						i = !1;
					tt(r) ? (s = r) : et(r) && ((i = !0), (r = r[0]));
					const l = _n(r);
					0 === e && null !== n
						? null == o
							? kr(t, n, l)
							: Er(t, n, l, o || null)
						: 1 === e && null !== n
						? Er(t, n, l, o || null)
						: 2 === e
						? (function (e, t, n) {
								const r = Ir(e, t);
								r &&
									(function (e, t, n, r) {
										jt(e) ? e.removeChild(t, n, r) : t.removeChild(n);
									})(e, r, t, n);
						  })(t, l, i)
						: 3 === e && t.destroyNode(l),
						null != s &&
							(function (e, t, n, r, o) {
								const s = n[7];
								s !== _n(n) && br(t, e, r, s, o);
								for (let i = 9; i < n.length; i++) {
									const o = n[i];
									Dr(o[1], o, e, t, r, s);
								}
							})(t, e, s, n, o);
				}
			}
			function xr(e, t) {
				let n;
				return et(e) && (n = e[6]) && 2 === n.type ? wr(n, e) : e[3] === t ? null : e[3];
			}
			function Cr(e, t) {
				if (!(256 & t[2])) {
					(t[2] &= -129),
						(t[2] |= 256),
						(function (e, t) {
							let n;
							if (null != e && null != (n = e.destroyHooks))
								for (let r = 0; r < n.length; r += 2) {
									const e = t[n[r]];
									e instanceof Pt || n[r + 1].call(e);
								}
						})(e, t),
						(function (e, t) {
							const n = e.cleanup;
							if (null !== n) {
								const e = t[7];
								for (let r = 0; r < n.length - 1; r += 2)
									if ('string' == typeof n[r]) {
										const o = n[r + 1],
											s = 'function' == typeof o ? o(t) : _n(t[o]),
											i = e[n[r + 2]],
											l = n[r + 3];
										'boolean' == typeof l ? s.removeEventListener(n[r], i, l) : l >= 0 ? e[l]() : e[-l].unsubscribe(), (r += 2);
									} else n[r].call(e[n[r + 1]]);
								t[7] = null;
							}
						})(e, t);
					const n = t[6];
					n && 3 === n.type && jt(t[11]) && t[11].destroy();
					const r = t[17];
					if (null !== r && tt(t[3])) {
						r !== t[3] &&
							(function (e, t) {
								const n = e[5],
									r = n.indexOf(t);
								n.splice(r, 1);
							})(r, t);
						const n = t[5];
						null !== n && n.detachView(e);
					}
				}
			}
			function Er(e, t, n, r) {
				jt(e) ? e.insertBefore(t, n, r) : t.insertBefore(n, r, !0);
			}
			function kr(e, t, n) {
				jt(e) ? e.appendChild(t, n) : t.appendChild(n);
			}
			function Tr(e, t, n, r) {
				null !== r ? Er(e, t, n, r) : kr(e, t, n);
			}
			function Ir(e, t) {
				return jt(e) ? e.parentNode(t) : t.parentNode;
			}
			function Sr(e, t, n, r) {
				const o = (function (e, t, n) {
					let r = t.parent;
					for (; null != r && (4 === r.type || 5 === r.type); ) r = (t = r).parent;
					if (null == r) {
						const e = n[6];
						return 2 === e.type
							? (function (e, t) {
									const n = wr(e, t);
									return n ? Ir(t[11], n[7]) : null;
							  })(e, n)
							: n[0];
					}
					if (t && 5 === t.type && 4 & t.flags) return yn(t, n).parentNode;
					if (2 & r.flags) {
						const t = e.data,
							n = t[t[r.index].directiveStart].encapsulation;
						if (n !== Ue.ShadowDom && n !== Ue.Native) return null;
					}
					return yn(r, n);
				})(e, r, t);
				if (null != o) {
					const e = t[11],
						s = (function (e, t) {
							if (2 === e.type) {
								const n = wr(e, t);
								return null === n
									? null
									: (function e(t, n) {
											const r = 9 + t + 1;
											if (r < n.length) {
												const t = n[r],
													o = t[1].firstChild;
												if (null !== o)
													return (function t(n, r) {
														if (null !== r) {
															const o = r.type;
															if (3 === o) return yn(r, n);
															if (0 === o) return e(-1, n[r.index]);
															if (4 === o || 5 === o) {
																const o = r.child;
																if (null !== o) return t(n, o);
																{
																	const t = n[r.index];
																	return tt(t) ? e(-1, t) : _n(t);
																}
															}
															{
																const e = n[16],
																	o = e[6],
																	s = Hn(e),
																	i = o.projection[r.projection];
																return null != i ? t(s, i) : t(n, r.next);
															}
														}
														return null;
													})(t, o);
											}
											return n[7];
									  })(n.indexOf(t, 9) - 9, n);
							}
							return 4 === e.type || 5 === e.type ? yn(e, t) : null;
						})(r.parent || t[6], t);
					if (Array.isArray(n)) for (let t = 0; t < n.length; t++) Tr(e, o, n[t], s);
					else Tr(e, o, n, s);
				}
			}
			function Ar(e, t, n, r, o, s, i) {
				for (; null != n; ) {
					const l = r[n.index],
						u = n.type;
					i && 0 === t && (l && En(_n(l), r), (n.flags |= 4)), 64 != (64 & n.flags) && (4 === u || 5 === u ? (Ar(e, t, n.child, r, o, s, !1), br(t, e, o, l, s)) : 1 === u ? Or(e, t, r, n, o, s) : br(t, e, o, l, s)), (n = i ? n.projectionNext : n.next);
				}
			}
			function Dr(e, t, n, r, o, s) {
				Ar(n, r, e.node.child, t, o, s, !1);
			}
			function Or(e, t, n, r, o, s) {
				const i = n[16],
					l = i[6].projection[r.projection];
				if (Array.isArray(l)) for (let u = 0; u < l.length; u++) br(t, e, o, l[u], s);
				else Ar(e, t, l, i[3], o, s, !0);
			}
			function Nr(e, t, n) {
				jt(e) ? e.setAttribute(t, 'style', n) : (t.style.cssText = n);
			}
			function Pr(e, t, n) {
				jt(e) ? ('' === n ? e.removeAttribute(t, 'class') : e.setAttribute(t, 'class', n)) : (t.className = n);
			}
			class Rr extends class {
				constructor(e, t) {
					(this._lView = e), (this._cdRefInjectingView = t), (this._appRef = null), (this._viewContainerRef = null), (this._tViewNode = null);
				}
				get rootNodes() {
					const e = this._lView;
					return null == e[0]
						? (function e(t, n, r, o, s = !1) {
								for (; null !== r; ) {
									const i = n[r.index];
									if ((null !== i && o.push(_n(i)), tt(i)))
										for (let t = 9; t < i.length; t++) {
											const n = i[t],
												r = n[1].firstChild;
											null !== r && e(n[1], n, r, o);
										}
									const l = r.type;
									if (4 === l || 5 === l) e(t, n, r.child, o);
									else if (1 === l) {
										const t = n[16],
											s = t[6],
											i = Hn(t);
										let l = s.projection[r.projection];
										null !== l && null !== i && e(i[1], i, l, o, !0);
									}
									r = s ? r.projectionNext : r.next;
								}
								return o;
						  })(e[1], e, e[6].child, [])
						: [];
				}
				get context() {
					return this._lView[8];
				}
				get destroyed() {
					return 256 == (256 & this._lView[2]);
				}
				destroy() {
					if (this._appRef) this._appRef.detachView(this);
					else if (this._viewContainerRef) {
						const e = this._viewContainerRef.indexOf(this);
						e > -1 && this._viewContainerRef.detach(e), (this._viewContainerRef = null);
					}
					!(function (e, t) {
						if (!(256 & t[2])) {
							const n = t[11];
							jt(n) && n.destroyNode && Dr(e, t, n, 3, null, null),
								(function (e) {
									let t = e[13];
									if (!t) return Cr(e[1], e);
									for (; t; ) {
										let n = null;
										if (et(t)) n = t[13];
										else {
											const e = t[9];
											e && (n = e);
										}
										if (!n) {
											for (; t && !t[4] && t !== e; ) et(t) && Cr(t[1], t), (t = xr(t, e));
											null === t && (t = e), et(t) && Cr(t[1], t), (n = t && t[4]);
										}
										t = n;
									}
								})(t);
						}
					})(this._lView[1], this._lView);
				}
				onDestroy(e) {
					var t, n, r;
					(t = this._lView[1]),
						(r = e),
						yr((n = this._lView)).push(r),
						t.firstCreatePass &&
							(function (e) {
								return e.cleanup || (e.cleanup = []);
							})(t).push(n[7].length - 1, null);
				}
				markForCheck() {
					dr(this._cdRefInjectingView || this._lView);
				}
				detach() {
					this._lView[2] &= -129;
				}
				reattach() {
					this._lView[2] |= 128;
				}
				detectChanges() {
					fr(this._lView[1], this._lView, this.context);
				}
				checkNoChanges() {
					!(function (e, t, n) {
						pt(!0);
						try {
							fr(e, t, n);
						} finally {
							pt(!1);
						}
					})(this._lView[1], this._lView, this.context);
				}
				attachToViewContainerRef(e) {
					if (this._appRef) throw new Error('This view is already attached directly to the ApplicationRef!');
					this._viewContainerRef = e;
				}
				detachFromAppRef() {
					var e;
					(this._appRef = null), Dr(this._lView[1], (e = this._lView), e[11], 2, null, null);
				}
				attachToAppRef(e) {
					if (this._viewContainerRef) throw new Error('This view is already attached to a ViewContainer!');
					this._appRef = e;
				}
			} {
				constructor(e) {
					super(e), (this._view = e);
				}
				detectChanges() {
					pr(this._view);
				}
				checkNoChanges() {
					!(function (e) {
						pt(!0);
						try {
							pr(e);
						} finally {
							pt(!1);
						}
					})(this._view);
				}
				get context() {
					return null;
				}
			}
			let jr;
			function Mr(e, t, n) {
				return jr || (jr = class extends e {}), new jr(yn(t, n));
			}
			const Hr = new Ee('Set Injector scope.'),
				Fr = {},
				Vr = {},
				Lr = [];
			let Ur = void 0;
			function Br() {
				return void 0 === Ur && (Ur = new He()), Ur;
			}
			function Zr(e, t = null, n = null, r) {
				return new $r(e, n, t || Br(), r);
			}
			class $r {
				constructor(e, t, n, r = null) {
					(this.parent = n), (this.records = new Map()), (this.injectorDefTypes = new Set()), (this.onDestroy = new Set()), (this._destroyed = !1);
					const o = [];
					t && Ve(t, (n) => this.processProvider(n, e, t)), Ve([e], (e) => this.processInjectorType(e, [], o)), this.records.set(ke, qr(void 0, this));
					const s = this.records.get(Hr);
					(this.scope = null != s ? s.value : null), (this.source = r || ('object' == typeof e ? null : le(e)));
				}
				get destroyed() {
					return this._destroyed;
				}
				destroy() {
					this.assertNotDestroyed(), (this._destroyed = !0);
					try {
						this.onDestroy.forEach((e) => e.ngOnDestroy());
					} finally {
						this.records.clear(), this.onDestroy.clear(), this.injectorDefTypes.clear();
					}
				}
				get(e, t = Te, n = G.Default) {
					this.assertNotDestroyed();
					const r = Oe(this);
					try {
						if (!(n & G.SkipSelf)) {
							let t = this.records.get(e);
							if (void 0 === t) {
								const n = ('function' == typeof (o = e) || ('object' == typeof o && o instanceof Ee)) && X(e);
								(t = n && this.injectableDefInScope(n) ? qr(zr(e), Fr) : null), this.records.set(e, t);
							}
							if (null != t) return this.hydrate(e, t);
						}
						return (n & G.Self ? Br() : this.parent).get(e, (t = n & G.Optional && t === Te ? null : t));
					} catch (s) {
						if ('NullInjectorError' === s.name) {
							if (((s.ngTempTokenPath = s.ngTempTokenPath || []).unshift(le(e)), r)) throw s;
							return (function (e, t, n, r) {
								const o = e.ngTempTokenPath;
								throw (
									(t.__source && o.unshift(t.__source),
									(e.message = (function (e, t, n, r = null) {
										e = e && '\n' === e.charAt(0) && '\u0275' == e.charAt(1) ? e.substr(2) : e;
										let o = le(t);
										if (Array.isArray(t)) o = t.map(le).join(' -> ');
										else if ('object' == typeof t) {
											let e = [];
											for (let n in t)
												if (t.hasOwnProperty(n)) {
													let r = t[n];
													e.push(n + ':' + ('string' == typeof r ? JSON.stringify(r) : le(r)));
												}
											o = `{${e.join(', ')}}`;
										}
										return `${n}${r ? '(' + r + ')' : ''}[${o}]: ${e.replace(Ie, '\n  ')}`;
									})('\n' + e.message, o, n, r)),
									(e.ngTokenPath = o),
									(e.ngTempTokenPath = null),
									e)
								);
							})(s, e, 'R3InjectorError', this.source);
						}
						throw s;
					} finally {
						Oe(r);
					}
					var o;
				}
				_resolveInjectorDefTypes() {
					this.injectorDefTypes.forEach((e) => this.get(e));
				}
				toString() {
					const e = [];
					return this.records.forEach((t, n) => e.push(le(n))), `R3Injector[${e.join(', ')}]`;
				}
				assertNotDestroyed() {
					if (this._destroyed) throw new Error('Injector has already been destroyed.');
				}
				processInjectorType(e, t, n) {
					if (!(e = he(e))) return !1;
					let r = te(e);
					const o = (null == r && e.ngModule) || void 0,
						s = void 0 === o ? e : o,
						i = -1 !== n.indexOf(s);
					if ((void 0 !== o && (r = te(o)), null == r)) return !1;
					if (null != r.imports && !i) {
						let e;
						n.push(s);
						try {
							Ve(r.imports, (r) => {
								this.processInjectorType(r, t, n) && (void 0 === e && (e = []), e.push(r));
							});
						} finally {
						}
						if (void 0 !== e)
							for (let t = 0; t < e.length; t++) {
								const { ngModule: n, providers: r } = e[t];
								Ve(r, (e) => this.processProvider(e, n, r || Lr));
							}
					}
					this.injectorDefTypes.add(s), this.records.set(s, qr(r.factory, Fr));
					const l = r.providers;
					if (null != l && !i) {
						const t = e;
						Ve(l, (e) => this.processProvider(e, t, l));
					}
					return void 0 !== o && void 0 !== e.providers;
				}
				processProvider(e, t, n) {
					let r = Qr((e = he(e))) ? e : he(e && e.provide);
					const o = (function (e, t, n) {
						return Wr(e)
							? qr(void 0, e.useValue)
							: qr(
									(function (e, t, n) {
										let r = void 0;
										if (Qr(e)) {
											const t = he(e);
											return Ye(t) || zr(t);
										}
										if (Wr(e)) r = () => he(e.useValue);
										else if ((o = e) && o.useFactory) r = () => e.useFactory(...Me(e.deps || []));
										else if (
											(function (e) {
												return !(!e || !e.useExisting);
											})(e)
										)
											r = () => Re(he(e.useExisting));
										else {
											const o = he(e && (e.useClass || e.provide));
											if (
												(o ||
													(function (e, t, n) {
														let r = '';
														throw (e && t && (r = ` - only instances of Provider and Type are allowed, got: [${t.map((e) => (e == n ? '?' + n + '?' : '...')).join(', ')}]`), new Error(`Invalid provider for the NgModule '${le(e)}'` + r));
													})(t, n, e),
												!(function (e) {
													return !!e.deps;
												})(e))
											)
												return Ye(o) || zr(o);
											r = () => new o(...Me(e.deps));
										}
										var o;
										return r;
									})(e, t, n),
									Fr
							  );
					})(e, t, n);
					if (Qr(e) || !0 !== e.multi) {
						const e = this.records.get(r);
						e && void 0 !== e.multi && Tn();
					} else {
						let t = this.records.get(r);
						t ? void 0 === t.multi && Tn() : ((t = qr(void 0, Fr, !0)), (t.factory = () => Me(t.multi)), this.records.set(r, t)), (r = e), t.multi.push(e);
					}
					this.records.set(r, o);
				}
				hydrate(e, t) {
					var n;
					return (
						t.value === Vr
							? (function (e) {
									throw new Error(`Cannot instantiate cyclic dependency! ${e}`);
							  })(le(e))
							: t.value === Fr && ((t.value = Vr), (t.value = t.factory())),
						'object' == typeof t.value && t.value && null !== (n = t.value) && 'object' == typeof n && 'function' == typeof n.ngOnDestroy && this.onDestroy.add(t.value),
						t.value
					);
				}
				injectableDefInScope(e) {
					return !!e.providedIn && ('string' == typeof e.providedIn ? 'any' === e.providedIn || e.providedIn === this.scope : this.injectorDefTypes.has(e.providedIn));
				}
			}
			function zr(e) {
				const t = X(e),
					n = null !== t ? t.factory : Ye(e);
				if (null !== n) return n;
				const r = te(e);
				if (null !== r) return r.factory;
				if (e instanceof Ee) throw new Error(`Token ${le(e)} is missing a \u0275prov definition.`);
				if (e instanceof Function)
					return (function (e) {
						const t = e.length;
						if (t > 0) {
							const n = (function (e, t) {
								const n = [];
								for (let r = 0; r < e; r++) n.push('?');
								return n;
							})(t);
							throw new Error(`Can't resolve all parameters for ${le(e)}: (${n.join(', ')}).`);
						}
						const n = (function (e) {
							const t = e && (e[ne] || e[se] || (e[oe] && e[oe]()));
							if (t) {
								const n = (function (e) {
									if (e.hasOwnProperty('name')) return e.name;
									const t = ('' + e).match(/^function\s*([^\s(]+)/);
									return null === t ? '' : t[1];
								})(e);
								return console.warn(`DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\n` + `This will become an error in v10. Please add @Injectable() to the "${n}" class.`), t;
							}
							return null;
						})(e);
						return null !== n ? () => n.factory(e) : () => new e();
					})(e);
				throw new Error('unreachable');
			}
			function qr(e, t, n = !1) {
				return { factory: e, value: t, multi: n ? [] : void 0 };
			}
			function Wr(e) {
				return null !== e && 'object' == typeof e && Se in e;
			}
			function Qr(e) {
				return 'function' == typeof e;
			}
			const Gr = function (e, t, n) {
				return (function (e, t = null, n = null, r) {
					const o = Zr(e, t, n, r);
					return o._resolveInjectorDefTypes(), o;
				})({ name: n }, t, e, n);
			};
			let Jr = (() => {
					class e {
						static create(e, t) {
							return Array.isArray(e) ? Gr(e, t, '') : Gr(e.providers, e.parent, e.name || '');
						}
					}
					return (e.THROW_IF_NOT_FOUND = Te), (e.NULL = new He()), (e.ɵprov = K({ token: e, providedIn: 'any', factory: () => Re(ke) })), (e.__NG_ELEMENT_ID__ = -1), e;
				})(),
				Kr = new Map();
			const Yr = new Set();
			function Xr(e) {
				return 'string' == typeof e ? e : e.text();
			}
			function eo(e, t) {
				let n = e.styles,
					r = e.classes,
					o = 0;
				for (let s = 0; s < t.length; s++) {
					const e = t[s];
					'number' == typeof e ? (o = e) : 1 == o ? (r = ue(r, e)) : 2 == o && (n = ue(n, e + ': ' + t[++s] + ';'));
				}
				null !== n && (e.styles = n), null !== r && (e.classes = r);
			}
			let to = null;
			function no() {
				if (!to) {
					const e = me.Symbol;
					if (e && e.iterator) to = e.iterator;
					else {
						const e = Object.getOwnPropertyNames(Map.prototype);
						for (let t = 0; t < e.length; ++t) {
							const n = e[t];
							'entries' !== n && 'size' !== n && Map.prototype[n] === Map.prototype.entries && (to = n);
						}
					}
				}
				return to;
			}
			function ro(e, t) {
				return e === t || ('number' == typeof e && 'number' == typeof t && isNaN(e) && isNaN(t));
			}
			function oo(e) {
				return !!so(e) && (Array.isArray(e) || (!(e instanceof Map) && no() in e));
			}
			function so(e) {
				return null !== e && ('function' == typeof e || 'object' == typeof e);
			}
			function io(e, t, n) {
				return !Object.is(e[t], n) && ((e[t] = n), !0);
			}
			function lo(e, t, n) {
				const r = ut();
				if (io(r, _t(), t)) {
					const o = kt();
					!(function (e, t, n, r, o, s, i, l) {
						const u = mn(n, t),
							c = gn(e, n);
						let a,
							h = c.inputs;
						if (null != h && (a = h[r]))
							vr(e, t, a, r, o),
								rt(c) &&
									(function (e, t) {
										const n = vn(t, e);
										16 & n[2] || (n[2] |= 64);
									})(t, n + 19);
						else if (3 === c.type) {
							r = 'class' === (d = r) ? 'className' : 'for' === d ? 'htmlFor' : 'formaction' === d ? 'formAction' : 'innerHtml' === d ? 'innerHTML' : 'readonly' === d ? 'readOnly' : 'tabindex' === d ? 'tabIndex' : d;
							const e = t[11];
							(o = null != s ? s(o, c.tagName || '', r) : o), jt(e) ? e.setProperty(u, r, o) : Ft(r) || (u.setProperty ? u.setProperty(r, o) : (u[r] = o));
						}
						var d;
					})(ct(), r, o, e, t, n);
				}
				return lo;
			}
			function uo(e, t, n, r, o) {
				const s = o ? 'class' : 'style';
				vr(e, n, t.inputs[s], s, r);
			}
			function co(e, t, n, r) {
				const o = ut(),
					s = ct(),
					i = 19 + e,
					l = o[11],
					u = (o[i] = Ln(t, l, it.lFrame.currentNamespace)),
					c = s.firstCreatePass
						? (function (e, t, n, r, o, s, i) {
								const l = t.consts,
									u = xn(l, s),
									c = Bn(t, n[6], e, 3, o, u);
								return (
									(function (e, t, n, r) {
										let o = !1;
										if (lt()) {
											const s = (function (e, t, n) {
													const r = e.directiveRegistry;
													let o = null;
													if (r)
														for (let s = 0; s < r.length; s++) {
															const i = r[s];
															Pn(n, i.selectors, !1) && (o || (o = []), en(Jt(n, t), e, i.type), st(i) ? (2 & n.flags && kn(n), tr(e, n), o.unshift(i)) : o.push(i));
														}
													return o;
												})(e, t, n),
												i = null === r ? null : { '': -1 };
											if (null !== s) {
												let r = 0;
												(o = !0), rr(n, e.data.length, s.length);
												for (let e = 0; e < s.length; e++) {
													const t = s[e];
													t.providersResolver && t.providersResolver(t);
												}
												er(e, n, s.length);
												let l = !1,
													u = !1;
												for (let o = 0; o < s.length; o++) {
													const c = s[o];
													(n.mergedAttrs = Vt(n.mergedAttrs, c.hostAttrs)), or(e, t, c), nr(e.data.length - 1, c, i), null !== c.contentQueries && (n.flags |= 8), (null === c.hostBindings && null === c.hostAttrs && 0 === c.hostVars) || (n.flags |= 128), !l && (c.onChanges || c.onInit || c.doCheck) && ((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index - 19), (l = !0)), u || (!c.onChanges && !c.doCheck) || ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(n.index - 19), (u = !0)), Kn(e, c), (r += c.hostVars);
												}
												!(function (e, t) {
													const n = t.directiveEnd,
														r = e.data,
														o = t.attrs,
														s = [];
													let i = null,
														l = null;
													for (let u = t.directiveStart; u < n; u++) {
														const e = r[u],
															t = e.inputs;
														s.push(null !== o ? lr(t, o) : null), (i = Jn(t, u, i)), (l = Jn(e.outputs, u, l));
													}
													null !== i && (i.hasOwnProperty('class') && (t.flags |= 16), i.hasOwnProperty('style') && (t.flags |= 32)), (t.initialInputs = s), (t.inputs = i), (t.outputs = l);
												})(e, n),
													Yn(e, t, r);
											}
											i &&
												(function (e, t, n) {
													if (t) {
														const r = (e.localNames = []);
														for (let e = 0; e < t.length; e += 2) {
															const o = n[t[e + 1]];
															if (null == o) throw new Error(`Export of name '${t[e + 1]}' not found!`);
															r.push(t[e], o);
														}
													}
												})(n, r, i);
										}
										n.mergedAttrs = Vt(n.mergedAttrs, n.attrs);
									})(t, n, c, xn(l, i)),
									null !== c.mergedAttrs && eo(c, c.mergedAttrs),
									null !== t.queries && t.queries.elementStart(t, c),
									c
								);
						  })(e, s, o, 0, t, n, r)
						: s.data[i];
				ht(c, !0);
				const a = c.mergedAttrs;
				null !== a && Ht(l, u, a);
				const h = c.classes;
				null !== h && Pr(l, u, h);
				const d = c.styles;
				null !== d && Nr(l, u, d),
					Sr(s, o, u, c),
					0 === it.lFrame.elementDepthCount && En(u, o),
					it.lFrame.elementDepthCount++,
					ot(c) &&
						((function (e, t, n) {
							lt() &&
								((function (e, t, n, r) {
									const o = n.directiveStart,
										s = n.directiveEnd;
									e.firstCreatePass || Jt(n, t), En(r, t);
									const i = n.initialInputs;
									for (let l = o; l < s; l++) {
										const r = e.data[l],
											s = st(r);
										s && sr(t, n, r);
										const u = rn(t, e, l, n);
										En(u, t), null !== i && ir(0, l - o, u, r, 0, i), s && (vn(n.index, t)[8] = u);
									}
								})(e, t, n, yn(n, t)),
								128 == (128 & n.flags) &&
									(function (e, t, n) {
										const r = n.directiveStart,
											o = n.directiveEnd,
											s = e.expandoInstructions,
											i = e.firstCreatePass,
											l = n.index - 19;
										try {
											Tt(l);
											for (let n = r; n < o; n++) {
												const r = e.data[n],
													o = t[n];
												null !== r.hostBindings || 0 !== r.hostVars || null !== r.hostAttrs ? Xn(r, o) : i && s.push(null);
											}
										} finally {
											Tt(-1);
										}
									})(e, t, n));
						})(s, o, c),
						(function (e, t, n) {
							if (nt(t)) {
								const r = t.directiveEnd;
								for (let o = t.directiveStart; o < r; o++) {
									const t = e.data[o];
									t.contentQueries && t.contentQueries(1, n[o], o);
								}
							}
						})(s, c, o)),
					null !== r &&
						(function (e, t, n = yn) {
							const r = t.localNames;
							if (null !== r) {
								let o = t.index + 1;
								for (let s = 0; s < r.length; s += 2) {
									const i = r[s + 1],
										l = -1 === i ? n(t, e) : e[i];
									e[o++] = l;
								}
							}
						})(o, c);
			}
			function ao() {
				let e = at();
				dt() ? (it.lFrame.isParent = !1) : ((e = e.parent), ht(e, !1));
				const t = e;
				it.lFrame.elementDepthCount--;
				const n = ct();
				n.firstCreatePass && (It(n, e), nt(e) && n.queries.elementEnd(e)),
					null !== t.classes &&
						(function (e) {
							return 0 != (16 & e.flags);
						})(t) &&
						uo(n, t, ut(), t.classes, !0),
					null !== t.styles &&
						(function (e) {
							return 0 != (32 & e.flags);
						})(t) &&
						uo(n, t, ut(), t.styles, !1);
			}
			function ho(e) {
				return !!e && 'function' == typeof e.then;
			}
			function fo(e, t, n = !1, r) {
				const o = ut(),
					s = ct(),
					i = at();
				return (
					(function (e, t, n, r, o, s, i = !1, l) {
						const u = ot(r),
							c = e.firstCreatePass && (e.cleanup || (e.cleanup = [])),
							a = yr(t);
						let h = !0;
						if (3 === r.type) {
							const d = yn(r, t),
								f = l ? l(d) : Be,
								p = f.target || d,
								_ = a.length,
								m = l ? (e) => l(_n(e[r.index])).target : r.index;
							if (jt(n)) {
								let i = null;
								if (
									(!l &&
										u &&
										(i = (function (e, t, n, r) {
											const o = e.cleanup;
											if (null != o)
												for (let s = 0; s < o.length - 1; s += 2) {
													const e = o[s];
													if (e === n && o[s + 1] === r) {
														const e = t[7],
															n = o[s + 2];
														return e.length > n ? e[n] : null;
													}
													'string' == typeof e && (s += 2);
												}
											return null;
										})(e, t, o, r.index)),
									null !== i)
								)
									((i.__ngLastListenerFn__ || i).__ngNextListenerFn__ = s), (i.__ngLastListenerFn__ = s), (h = !1);
								else {
									s = _o(r, t, s, !1);
									const e = n.listen(f.name || p, o, s);
									a.push(s, e), c && c.push(o, m, _, _ + 1);
								}
							} else (s = _o(r, t, s, !0)), p.addEventListener(o, s, i), a.push(s), c && c.push(o, m, _, i);
						}
						const d = r.outputs;
						let f;
						if (h && null !== d && (f = d[o])) {
							const e = f.length;
							if (e)
								for (let n = 0; n < e; n += 2) {
									const e = t[f[n]][f[n + 1]].subscribe(s),
										i = a.length;
									a.push(s, e), c && c.push(o, r.index, i, -(i + 1));
								}
						}
					})(s, o, o[11], i, e, t, n, r),
					fo
				);
			}
			function po(e, t, n) {
				try {
					return !1 !== t(n);
				} catch (r) {
					return gr(e, r), !1;
				}
			}
			function _o(e, t, n, r) {
				return function o(s) {
					if (s === Function) return n;
					const i = 2 & e.flags ? vn(e.index, t) : t;
					0 == (32 & t[2]) && dr(i);
					let l = po(t, n, s),
						u = o.__ngNextListenerFn__;
					for (; u; ) (l = po(t, u, s) && l), (u = u.__ngNextListenerFn__);
					return r && !1 === l && (s.preventDefault(), (s.returnValue = !1)), l;
				};
			}
			function mo(e, t = '') {
				const n = ut(),
					r = ct(),
					o = e + 19,
					s = r.firstCreatePass ? Bn(r, n[6], e, 3, null, null) : r.data[o],
					i = (n[o] = (function (e, t) {
						return jt(t) ? t.createText(e) : t.createTextNode(e);
					})(t, n[11]));
				Sr(r, n, i, s), ht(s, !1);
			}
			function yo(e, t, n) {
				const r = ut(),
					o = (function (e, t, n, r) {
						return io(e, _t(), n) ? t + Zt(n) + r : Mn;
					})(r, e, t, n);
				return (
					o !== Mn &&
						(function (e, t, n) {
							const r = mn(t, e),
								o = e[11];
							jt(o) ? o.setValue(r, n) : (r.textContent = n);
						})(r, kt(), o),
					yo
				);
			}
			function go(e, t) {
				const n = wn(e)[1],
					r = n.data.length - 1;
				It(n, { directiveStart: r, directiveEnd: r + 1 });
			}
			class vo {}
			class wo {
				resolveComponentFactory(e) {
					throw (function (e) {
						const t = Error(`No component factory found for ${le(e)}. Did you add it to @NgModule.entryComponents?`);
						return (t.ngComponent = e), t;
					})(e);
				}
			}
			let bo = (() => {
					class e {}
					return (e.NULL = new wo()), e;
				})(),
				xo = (() => {
					class e {
						constructor(e) {
							this.nativeElement = e;
						}
					}
					return (e.__NG_ELEMENT_ID__ = () => Co(e)), e;
				})();
			const Co = function (e) {
				return Mr(e, at(), ut());
			};
			class Eo {}
			const ko = (function () {
				var e = { Important: 1, DashCase: 2 };
				return (e[e.Important] = 'Important'), (e[e.DashCase] = 'DashCase'), e;
			})();
			let To = (() => {
				class e {}
				return (e.ɵprov = K({ token: e, providedIn: 'root', factory: () => null })), e;
			})();
			class Io {
				constructor(e) {
					(this.full = e), (this.major = e.split('.')[0]), (this.minor = e.split('.')[1]), (this.patch = e.split('.').slice(2).join('.'));
				}
			}
			const So = new Io('9.0.6');
			class Ao {
				constructor() {}
				supports(e) {
					return oo(e);
				}
				create(e) {
					return new Oo(e);
				}
			}
			const Do = (e, t) => t;
			class Oo {
				constructor(e) {
					(this.length = 0), (this._linkedRecords = null), (this._unlinkedRecords = null), (this._previousItHead = null), (this._itHead = null), (this._itTail = null), (this._additionsHead = null), (this._additionsTail = null), (this._movesHead = null), (this._movesTail = null), (this._removalsHead = null), (this._removalsTail = null), (this._identityChangesHead = null), (this._identityChangesTail = null), (this._trackByFn = e || Do);
				}
				forEachItem(e) {
					let t;
					for (t = this._itHead; null !== t; t = t._next) e(t);
				}
				forEachOperation(e) {
					let t = this._itHead,
						n = this._removalsHead,
						r = 0,
						o = null;
					for (; t || n; ) {
						const s = !n || (t && t.currentIndex < jo(n, r, o)) ? t : n,
							i = jo(s, r, o),
							l = s.currentIndex;
						if (s === n) r--, (n = n._nextRemoved);
						else if (((t = t._next), null == s.previousIndex)) r++;
						else {
							o || (o = []);
							const e = i - r,
								t = l - r;
							if (e != t) {
								for (let n = 0; n < e; n++) {
									const r = n < o.length ? o[n] : (o[n] = 0),
										s = r + n;
									t <= s && s < e && (o[n] = r + 1);
								}
								o[s.previousIndex] = t - e;
							}
						}
						i !== l && e(s, i, l);
					}
				}
				forEachPreviousItem(e) {
					let t;
					for (t = this._previousItHead; null !== t; t = t._nextPrevious) e(t);
				}
				forEachAddedItem(e) {
					let t;
					for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t);
				}
				forEachMovedItem(e) {
					let t;
					for (t = this._movesHead; null !== t; t = t._nextMoved) e(t);
				}
				forEachRemovedItem(e) {
					let t;
					for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t);
				}
				forEachIdentityChange(e) {
					let t;
					for (t = this._identityChangesHead; null !== t; t = t._nextIdentityChange) e(t);
				}
				diff(e) {
					if ((null == e && (e = []), !oo(e))) throw new Error(`Error trying to diff '${le(e)}'. Only arrays and iterables are allowed`);
					return this.check(e) ? this : null;
				}
				onDestroy() {}
				check(e) {
					this._reset();
					let t,
						n,
						r,
						o = this._itHead,
						s = !1;
					if (Array.isArray(e)) {
						this.length = e.length;
						for (let t = 0; t < this.length; t++) (n = e[t]), (r = this._trackByFn(t, n)), null !== o && ro(o.trackById, r) ? (s && (o = this._verifyReinsertion(o, n, r, t)), ro(o.item, n) || this._addIdentityChange(o, n)) : ((o = this._mismatch(o, n, r, t)), (s = !0)), (o = o._next);
					} else
						(t = 0),
							(function (e, t) {
								if (Array.isArray(e)) for (let n = 0; n < e.length; n++) t(e[n]);
								else {
									const n = e[no()]();
									let r;
									for (; !(r = n.next()).done; ) t(r.value);
								}
							})(e, (e) => {
								(r = this._trackByFn(t, e)), null !== o && ro(o.trackById, r) ? (s && (o = this._verifyReinsertion(o, e, r, t)), ro(o.item, e) || this._addIdentityChange(o, e)) : ((o = this._mismatch(o, e, r, t)), (s = !0)), (o = o._next), t++;
							}),
							(this.length = t);
					return this._truncate(o), (this.collection = e), this.isDirty;
				}
				get isDirty() {
					return null !== this._additionsHead || null !== this._movesHead || null !== this._removalsHead || null !== this._identityChangesHead;
				}
				_reset() {
					if (this.isDirty) {
						let e, t;
						for (e = this._previousItHead = this._itHead; null !== e; e = e._next) e._nextPrevious = e._next;
						for (e = this._additionsHead; null !== e; e = e._nextAdded) e.previousIndex = e.currentIndex;
						for (this._additionsHead = this._additionsTail = null, e = this._movesHead; null !== e; e = t) (e.previousIndex = e.currentIndex), (t = e._nextMoved);
						(this._movesHead = this._movesTail = null), (this._removalsHead = this._removalsTail = null), (this._identityChangesHead = this._identityChangesTail = null);
					}
				}
				_mismatch(e, t, n, r) {
					let o;
					return null === e ? (o = this._itTail) : ((o = e._prev), this._remove(e)), null !== (e = null === this._linkedRecords ? null : this._linkedRecords.get(n, r)) ? (ro(e.item, t) || this._addIdentityChange(e, t), this._moveAfter(e, o, r)) : null !== (e = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null)) ? (ro(e.item, t) || this._addIdentityChange(e, t), this._reinsertAfter(e, o, r)) : (e = this._addAfter(new No(t, n), o, r)), e;
				}
				_verifyReinsertion(e, t, n, r) {
					let o = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null);
					return null !== o ? (e = this._reinsertAfter(o, e._prev, r)) : e.currentIndex != r && ((e.currentIndex = r), this._addToMoves(e, r)), e;
				}
				_truncate(e) {
					for (; null !== e; ) {
						const t = e._next;
						this._addToRemovals(this._unlink(e)), (e = t);
					}
					null !== this._unlinkedRecords && this._unlinkedRecords.clear(), null !== this._additionsTail && (this._additionsTail._nextAdded = null), null !== this._movesTail && (this._movesTail._nextMoved = null), null !== this._itTail && (this._itTail._next = null), null !== this._removalsTail && (this._removalsTail._nextRemoved = null), null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null);
				}
				_reinsertAfter(e, t, n) {
					null !== this._unlinkedRecords && this._unlinkedRecords.remove(e);
					const r = e._prevRemoved,
						o = e._nextRemoved;
					return null === r ? (this._removalsHead = o) : (r._nextRemoved = o), null === o ? (this._removalsTail = r) : (o._prevRemoved = r), this._insertAfter(e, t, n), this._addToMoves(e, n), e;
				}
				_moveAfter(e, t, n) {
					return this._unlink(e), this._insertAfter(e, t, n), this._addToMoves(e, n), e;
				}
				_addAfter(e, t, n) {
					return this._insertAfter(e, t, n), (this._additionsTail = null === this._additionsTail ? (this._additionsHead = e) : (this._additionsTail._nextAdded = e)), e;
				}
				_insertAfter(e, t, n) {
					const r = null === t ? this._itHead : t._next;
					return (e._next = r), (e._prev = t), null === r ? (this._itTail = e) : (r._prev = e), null === t ? (this._itHead = e) : (t._next = e), null === this._linkedRecords && (this._linkedRecords = new Ro()), this._linkedRecords.put(e), (e.currentIndex = n), e;
				}
				_remove(e) {
					return this._addToRemovals(this._unlink(e));
				}
				_unlink(e) {
					null !== this._linkedRecords && this._linkedRecords.remove(e);
					const t = e._prev,
						n = e._next;
					return null === t ? (this._itHead = n) : (t._next = n), null === n ? (this._itTail = t) : (n._prev = t), e;
				}
				_addToMoves(e, t) {
					return e.previousIndex === t ? e : ((this._movesTail = null === this._movesTail ? (this._movesHead = e) : (this._movesTail._nextMoved = e)), e);
				}
				_addToRemovals(e) {
					return null === this._unlinkedRecords && (this._unlinkedRecords = new Ro()), this._unlinkedRecords.put(e), (e.currentIndex = null), (e._nextRemoved = null), null === this._removalsTail ? ((this._removalsTail = this._removalsHead = e), (e._prevRemoved = null)) : ((e._prevRemoved = this._removalsTail), (this._removalsTail = this._removalsTail._nextRemoved = e)), e;
				}
				_addIdentityChange(e, t) {
					return (e.item = t), (this._identityChangesTail = null === this._identityChangesTail ? (this._identityChangesHead = e) : (this._identityChangesTail._nextIdentityChange = e)), e;
				}
			}
			class No {
				constructor(e, t) {
					(this.item = e), (this.trackById = t), (this.currentIndex = null), (this.previousIndex = null), (this._nextPrevious = null), (this._prev = null), (this._next = null), (this._prevDup = null), (this._nextDup = null), (this._prevRemoved = null), (this._nextRemoved = null), (this._nextAdded = null), (this._nextMoved = null), (this._nextIdentityChange = null);
				}
			}
			class Po {
				constructor() {
					(this._head = null), (this._tail = null);
				}
				add(e) {
					null === this._head ? ((this._head = this._tail = e), (e._nextDup = null), (e._prevDup = null)) : ((this._tail._nextDup = e), (e._prevDup = this._tail), (e._nextDup = null), (this._tail = e));
				}
				get(e, t) {
					let n;
					for (n = this._head; null !== n; n = n._nextDup) if ((null === t || t <= n.currentIndex) && ro(n.trackById, e)) return n;
					return null;
				}
				remove(e) {
					const t = e._prevDup,
						n = e._nextDup;
					return null === t ? (this._head = n) : (t._nextDup = n), null === n ? (this._tail = t) : (n._prevDup = t), null === this._head;
				}
			}
			class Ro {
				constructor() {
					this.map = new Map();
				}
				put(e) {
					const t = e.trackById;
					let n = this.map.get(t);
					n || ((n = new Po()), this.map.set(t, n)), n.add(e);
				}
				get(e, t) {
					const n = this.map.get(e);
					return n ? n.get(e, t) : null;
				}
				remove(e) {
					const t = e.trackById;
					return this.map.get(t).remove(e) && this.map.delete(t), e;
				}
				get isEmpty() {
					return 0 === this.map.size;
				}
				clear() {
					this.map.clear();
				}
			}
			function jo(e, t, n) {
				const r = e.previousIndex;
				if (null === r) return r;
				let o = 0;
				return n && r < n.length && (o = n[r]), r + t + o;
			}
			class Mo {
				constructor() {}
				supports(e) {
					return e instanceof Map || so(e);
				}
				create() {
					return new Ho();
				}
			}
			class Ho {
				constructor() {
					(this._records = new Map()), (this._mapHead = null), (this._appendAfter = null), (this._previousMapHead = null), (this._changesHead = null), (this._changesTail = null), (this._additionsHead = null), (this._additionsTail = null), (this._removalsHead = null), (this._removalsTail = null);
				}
				get isDirty() {
					return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead;
				}
				forEachItem(e) {
					let t;
					for (t = this._mapHead; null !== t; t = t._next) e(t);
				}
				forEachPreviousItem(e) {
					let t;
					for (t = this._previousMapHead; null !== t; t = t._nextPrevious) e(t);
				}
				forEachChangedItem(e) {
					let t;
					for (t = this._changesHead; null !== t; t = t._nextChanged) e(t);
				}
				forEachAddedItem(e) {
					let t;
					for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t);
				}
				forEachRemovedItem(e) {
					let t;
					for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t);
				}
				diff(e) {
					if (e) {
						if (!(e instanceof Map || so(e))) throw new Error(`Error trying to diff '${le(e)}'. Only maps and objects are allowed`);
					} else e = new Map();
					return this.check(e) ? this : null;
				}
				onDestroy() {}
				check(e) {
					this._reset();
					let t = this._mapHead;
					if (
						((this._appendAfter = null),
						this._forEach(e, (e, n) => {
							if (t && t.key === n) this._maybeAddToChanges(t, e), (this._appendAfter = t), (t = t._next);
							else {
								const r = this._getOrCreateRecordForKey(n, e);
								t = this._insertBeforeOrAppend(t, r);
							}
						}),
						t)
					) {
						t._prev && (t._prev._next = null), (this._removalsHead = t);
						for (let e = t; null !== e; e = e._nextRemoved) e === this._mapHead && (this._mapHead = null), this._records.delete(e.key), (e._nextRemoved = e._next), (e.previousValue = e.currentValue), (e.currentValue = null), (e._prev = null), (e._next = null);
					}
					return this._changesTail && (this._changesTail._nextChanged = null), this._additionsTail && (this._additionsTail._nextAdded = null), this.isDirty;
				}
				_insertBeforeOrAppend(e, t) {
					if (e) {
						const n = e._prev;
						return (t._next = e), (t._prev = n), (e._prev = t), n && (n._next = t), e === this._mapHead && (this._mapHead = t), (this._appendAfter = e), e;
					}
					return this._appendAfter ? ((this._appendAfter._next = t), (t._prev = this._appendAfter)) : (this._mapHead = t), (this._appendAfter = t), null;
				}
				_getOrCreateRecordForKey(e, t) {
					if (this._records.has(e)) {
						const n = this._records.get(e);
						this._maybeAddToChanges(n, t);
						const r = n._prev,
							o = n._next;
						return r && (r._next = o), o && (o._prev = r), (n._next = null), (n._prev = null), n;
					}
					const n = new Fo(e);
					return this._records.set(e, n), (n.currentValue = t), this._addToAdditions(n), n;
				}
				_reset() {
					if (this.isDirty) {
						let e;
						for (this._previousMapHead = this._mapHead, e = this._previousMapHead; null !== e; e = e._next) e._nextPrevious = e._next;
						for (e = this._changesHead; null !== e; e = e._nextChanged) e.previousValue = e.currentValue;
						for (e = this._additionsHead; null != e; e = e._nextAdded) e.previousValue = e.currentValue;
						(this._changesHead = this._changesTail = null), (this._additionsHead = this._additionsTail = null), (this._removalsHead = null);
					}
				}
				_maybeAddToChanges(e, t) {
					ro(t, e.currentValue) || ((e.previousValue = e.currentValue), (e.currentValue = t), this._addToChanges(e));
				}
				_addToAdditions(e) {
					null === this._additionsHead ? (this._additionsHead = this._additionsTail = e) : ((this._additionsTail._nextAdded = e), (this._additionsTail = e));
				}
				_addToChanges(e) {
					null === this._changesHead ? (this._changesHead = this._changesTail = e) : ((this._changesTail._nextChanged = e), (this._changesTail = e));
				}
				_forEach(e, t) {
					e instanceof Map ? e.forEach(t) : Object.keys(e).forEach((n) => t(e[n], n));
				}
			}
			class Fo {
				constructor(e) {
					(this.key = e), (this.previousValue = null), (this.currentValue = null), (this._nextPrevious = null), (this._next = null), (this._prev = null), (this._nextAdded = null), (this._nextRemoved = null), (this._nextChanged = null);
				}
			}
			let Vo = (() => {
					class e {
						constructor(e) {
							this.factories = e;
						}
						static create(t, n) {
							if (null != n) {
								const e = n.factories.slice();
								t = t.concat(e);
							}
							return new e(t);
						}
						static extend(t) {
							return {
								provide: e,
								useFactory: (n) => {
									if (!n) throw new Error('Cannot extend IterableDiffers without a parent injector');
									return e.create(t, n);
								},
								deps: [[e, new Q(), new q()]],
							};
						}
						find(e) {
							const t = this.factories.find((t) => t.supports(e));
							if (null != t) return t;
							throw new Error(`Cannot find a differ supporting object '${e}' of type '${((n = e), n.name || typeof n)}'`);
							var n;
						}
					}
					return (e.ɵprov = K({ token: e, providedIn: 'root', factory: () => new e([new Ao()]) })), e;
				})(),
				Lo = (() => {
					class e {
						constructor(e) {
							this.factories = e;
						}
						static create(t, n) {
							if (n) {
								const e = n.factories.slice();
								t = t.concat(e);
							}
							return new e(t);
						}
						static extend(t) {
							return {
								provide: e,
								useFactory: (n) => {
									if (!n) throw new Error('Cannot extend KeyValueDiffers without a parent injector');
									return e.create(t, n);
								},
								deps: [[e, new Q(), new q()]],
							};
						}
						find(e) {
							const t = this.factories.find((t) => t.supports(e));
							if (t) return t;
							throw new Error(`Cannot find a differ supporting object '${e}'`);
						}
					}
					return (e.ɵprov = K({ token: e, providedIn: 'root', factory: () => new e([new Mo()]) })), e;
				})();
			const Uo = [new Mo()],
				Bo = new Vo([new Ao()]),
				Zo = new Lo(Uo),
				$o = {};
			class zo extends bo {
				constructor(e) {
					super(), (this.ngModule = e);
				}
				resolveComponentFactory(e) {
					const t = Ke(e);
					return new Qo(t, this.ngModule);
				}
			}
			function qo(e) {
				const t = [];
				for (let n in e) e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
				return t;
			}
			const Wo = new Ee('SCHEDULER_TOKEN', { providedIn: 'root', factory: () => zt });
			class Qo extends vo {
				constructor(e, t) {
					super(), (this.componentDef = e), (this.ngModule = t), (this.componentType = e.type), (this.selector = e.selectors.map(jn).join(',')), (this.ngContentSelectors = e.ngContentSelectors ? e.ngContentSelectors : []), (this.isBoundToModule = !!t);
				}
				get inputs() {
					return qo(this.componentDef.inputs);
				}
				get outputs() {
					return qo(this.componentDef.outputs);
				}
				create(e, t, n, r) {
					const o = (r = r || this.ngModule)
							? (function (e, t) {
									return {
										get: (n, r, o) => {
											const s = e.get(n, $o, o);
											return s !== $o || r === $o ? s : t.get(n, r, o);
										},
									};
							  })(e, r.injector)
							: e,
						s = o.get(Eo, Mt),
						i = o.get(To, null),
						l = s.createRenderer(null, this.componentDef),
						u = this.componentDef.selectors[0][0] || 'div',
						c = n
							? (function (e, t, n) {
									if (jt(e)) return e.selectRootElement(t, n === Ue.ShadowDom);
									let r = 'string' == typeof t ? e.querySelector(t) : t;
									return (r.textContent = ''), r;
							  })(l, n, this.componentDef.encapsulation)
							: Ln(
									u,
									s.createRenderer(null, this.componentDef),
									(function (e) {
										const t = e.toLowerCase();
										return 'svg' === t ? 'http://www.w3.org/2000/svg' : 'math' === t ? 'http://www.w3.org/1998/MathML/' : null;
									})(u)
							  ),
						a = this.componentDef.onPush ? 576 : 528,
						h = 'string' == typeof n && /^#root-ng-internal-isolated-\d+/.test(n),
						d = { components: [], scheduler: zt, clean: mr, playerHandler: null, flags: 0 },
						f = Qn(0, -1, null, 1, 0, null, null, null, null, null),
						p = Un(null, f, d, a, null, null, s, l, i, o);
					let _, m;
					vt(p, null);
					try {
						const e = (function (e, t, n, r, o, s) {
							const i = n[1];
							n[19] = e;
							const l = Bn(i, null, 0, 3, null, null),
								u = (l.mergedAttrs = t.hostAttrs);
							null !== u && (eo(l, u), null !== e && (Ht(o, e, u), null !== l.classes && Pr(o, e, l.classes), null !== l.styles && Nr(o, e, l.styles)));
							const c = r.createRenderer(e, t),
								a = Un(n, Wn(t), null, t.onPush ? 64 : 16, n[19], l, r, c, void 0);
							return i.firstCreatePass && (en(Jt(l, n), i, t.type), tr(i, l), rr(l, n.length, 1)), hr(n, a), (n[19] = a);
						})(c, this.componentDef, p, s, l);
						if (c)
							if (n) Ht(l, c, ['ng-version', So.full]);
							else {
								const { attrs: e, classes: t } = (function (e) {
									const t = [],
										n = [];
									let r = 1,
										o = 2;
									for (; r < e.length; ) {
										let s = e[r];
										if ('string' == typeof s) 2 === o ? '' !== s && t.push(s, e[++r]) : 8 === o && n.push(s);
										else {
											if (!On(o)) break;
											o = s;
										}
										r++;
									}
									return { attrs: t, classes: n };
								})(this.componentDef.selectors[0]);
								e && Ht(l, c, e), t && t.length > 0 && Pr(l, c, t.join(' '));
							}
						(m = gn(p[1], 0)),
							t && (m.projection = t.map((e) => Array.from(e))),
							(_ = (function (e, t, n, r, o) {
								const s = n[1],
									i = (function (e, t, n) {
										const r = at();
										e.firstCreatePass && (n.providersResolver && n.providersResolver(n), er(e, r, 1), or(e, t, n));
										const o = rn(t, e, t.length - 1, r);
										En(o, t);
										const s = yn(r, t);
										return s && En(s, t), o;
									})(s, n, t);
								r.components.push(i), (e[8] = i), o && o.forEach((e) => e(i, t)), t.contentQueries && t.contentQueries(1, i, n.length - 1);
								const l = at();
								if (s.firstCreatePass && (null !== t.hostBindings || null !== t.hostAttrs)) {
									Tt(l.index - 19);
									const e = n[1];
									Kn(e, t), Yn(e, n, t.hostVars), Xn(t, i);
								}
								return i;
							})(e, this.componentDef, p, d, [go])),
							Zn(f, p, null);
					} finally {
						Et();
					}
					const y = new Go(this.componentType, _, Mr(xo, m, p), p, m);
					return (n && !h) || (y.hostView._tViewNode.child = m), y;
				}
			}
			class Go extends class {} {
				constructor(e, t, n, r, o) {
					super(),
						(this.location = n),
						(this._rootLView = r),
						(this._tNode = o),
						(this.destroyCbs = []),
						(this.instance = t),
						(this.hostView = this.changeDetectorRef = new Rr(r)),
						(this.hostView._tViewNode = (function (e, t, n, r) {
							let o = e.node;
							return null == o && (e.node = o = Gn(0, null, 2, -1, null, null)), (r[6] = o);
						})(r[1], 0, 0, r)),
						(this.componentType = e);
				}
				get injector() {
					return new ln(this._tNode, this._rootLView);
				}
				destroy() {
					this.destroyCbs && (this.destroyCbs.forEach((e) => e()), (this.destroyCbs = null), !this.hostView.destroyed && this.hostView.destroy());
				}
				onDestroy(e) {
					this.destroyCbs && this.destroyCbs.push(e);
				}
			}
			const Jo = void 0;
			var Ko = [
				'en',
				[['a', 'p'], ['AM', 'PM'], Jo],
				[['AM', 'PM'], Jo, Jo],
				[
					['S', 'M', 'T', 'W', 'T', 'F', 'S'],
					['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
					['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
					['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
				],
				Jo,
				[
					['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
					['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
					['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				],
				Jo,
				[
					['B', 'A'],
					['BC', 'AD'],
					['Before Christ', 'Anno Domini'],
				],
				0,
				[6, 0],
				['M/d/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
				['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
				['{1}, {0}', Jo, "{1} 'at' {0}", Jo],
				['.', ',', ';', '%', '+', '-', 'E', '\xd7', '\u2030', '\u221e', 'NaN', ':'],
				['#,##0.###', '#,##0%', '\xa4#,##0.00', '#E0'],
				'USD',
				'$',
				'US Dollar',
				{},
				function (e) {
					let t = Math.floor(Math.abs(e)),
						n = e.toString().replace(/^[^.]*\.?/, '').length;
					return 1 === t && 0 === n ? 1 : 5;
				},
			];
			let Yo = {};
			function Xo(e) {
				return e in Yo || (Yo[e] = me.ng && me.ng.common && me.ng.common.locales && me.ng.common.locales[e]), Yo[e];
			}
			const es = (function () {
				var e = { LocaleId: 0, DayPeriodsFormat: 1, DayPeriodsStandalone: 2, DaysFormat: 3, DaysStandalone: 4, MonthsFormat: 5, MonthsStandalone: 6, Eras: 7, FirstDayOfWeek: 8, WeekendRange: 9, DateFormat: 10, TimeFormat: 11, DateTimeFormat: 12, NumberSymbols: 13, NumberFormats: 14, CurrencyCode: 15, CurrencySymbol: 16, CurrencyName: 17, Currencies: 18, PluralCase: 19, ExtraData: 20 };
				return (
					(e[e.LocaleId] = 'LocaleId'),
					(e[e.DayPeriodsFormat] = 'DayPeriodsFormat'),
					(e[e.DayPeriodsStandalone] = 'DayPeriodsStandalone'),
					(e[e.DaysFormat] = 'DaysFormat'),
					(e[e.DaysStandalone] = 'DaysStandalone'),
					(e[e.MonthsFormat] = 'MonthsFormat'),
					(e[e.MonthsStandalone] = 'MonthsStandalone'),
					(e[e.Eras] = 'Eras'),
					(e[e.FirstDayOfWeek] = 'FirstDayOfWeek'),
					(e[e.WeekendRange] = 'WeekendRange'),
					(e[e.DateFormat] = 'DateFormat'),
					(e[e.TimeFormat] = 'TimeFormat'),
					(e[e.DateTimeFormat] = 'DateTimeFormat'),
					(e[e.NumberSymbols] = 'NumberSymbols'),
					(e[e.NumberFormats] = 'NumberFormats'),
					(e[e.CurrencyCode] = 'CurrencyCode'),
					(e[e.CurrencySymbol] = 'CurrencySymbol'),
					(e[e.CurrencyName] = 'CurrencyName'),
					(e[e.Currencies] = 'Currencies'),
					(e[e.PluralCase] = 'PluralCase'),
					(e[e.ExtraData] = 'ExtraData'),
					e
				);
			})();
			let ts = 'en-US';
			function ns(e) {
				var t, n;
				(n = 'Expected localeId to be defined'),
					null == (t = e) &&
						(function (e, t, n, r) {
							throw new Error(`ASSERTION ERROR: ${e}` + ` [Expected=> null != ${t} <=Actual]`);
						})(n, t),
					'string' == typeof e && (ts = e.toLowerCase().replace(/_/g, '-'));
			}
			const rs = new Map();
			class os extends Fe {
				constructor(e, t) {
					super(), (this._parent = t), (this._bootstrapComponents = []), (this.injector = this), (this.destroyCbs = []), (this.componentFactoryResolver = new zo(this));
					const n = Xe(e),
						r = e[be] || null;
					r && ns(r),
						(this._bootstrapComponents = qt(n.bootstrap)),
						(this._r3Injector = Zr(
							e,
							t,
							[
								{ provide: Fe, useValue: this },
								{ provide: bo, useValue: this.componentFactoryResolver },
							],
							le(e)
						)),
						this._r3Injector._resolveInjectorDefTypes(),
						(this.instance = this.get(e));
				}
				get(e, t = Jr.THROW_IF_NOT_FOUND, n = G.Default) {
					return e === Jr || e === Fe || e === ke ? this : this._r3Injector.get(e, t, n);
				}
				destroy() {
					const e = this._r3Injector;
					!e.destroyed && e.destroy(), this.destroyCbs.forEach((e) => e()), (this.destroyCbs = null);
				}
				onDestroy(e) {
					this.destroyCbs.push(e);
				}
			}
			class ss extends class {} {
				constructor(e) {
					super(),
						(this.moduleType = e),
						null !== Xe(e) &&
							(function e(t) {
								if (null !== t.ɵmod.id) {
									const e = t.ɵmod.id;
									(function (e, t, n) {
										if (t && t !== n) throw new Error(`Duplicate module registered for ${e} - ${le(t)} vs ${le(t.name)}`);
									})(e, rs.get(e), t),
										rs.set(e, t);
								}
								let n = t.ɵmod.imports;
								n instanceof Function && (n = n()), n && n.forEach((t) => e(t));
							})(e);
				}
				create(e) {
					return new os(this.moduleType, e);
				}
			}
			class is extends C {
				constructor(e = !1) {
					super(), (this.__isAsync = e);
				}
				emit(e) {
					super.next(e);
				}
				subscribe(e, t, n) {
					let r,
						o = (e) => null,
						s = () => null;
					e && 'object' == typeof e
						? ((r = this.__isAsync
								? (t) => {
										setTimeout(() => e.next(t));
								  }
								: (t) => {
										e.next(t);
								  }),
						  e.error &&
								(o = this.__isAsync
									? (t) => {
											setTimeout(() => e.error(t));
									  }
									: (t) => {
											e.error(t);
									  }),
						  e.complete &&
								(s = this.__isAsync
									? () => {
											setTimeout(() => e.complete());
									  }
									: () => {
											e.complete();
									  }))
						: ((r = this.__isAsync
								? (t) => {
										setTimeout(() => e(t));
								  }
								: (t) => {
										e(t);
								  }),
						  t &&
								(o = this.__isAsync
									? (e) => {
											setTimeout(() => t(e));
									  }
									: (e) => {
											t(e);
									  }),
						  n &&
								(s = this.__isAsync
									? () => {
											setTimeout(() => n());
									  }
									: () => {
											n();
									  }));
					const i = super.subscribe(r, o, s);
					return e instanceof h && e.add(i), i;
				}
			}
			const ls = new Ee('Application Initializer');
			let us = (() => {
				class e {
					constructor(e) {
						(this.appInits = e),
							(this.initialized = !1),
							(this.done = !1),
							(this.donePromise = new Promise((e, t) => {
								(this.resolve = e), (this.reject = t);
							}));
					}
					runInitializers() {
						if (this.initialized) return;
						const e = [],
							t = () => {
								(this.done = !0), this.resolve();
							};
						if (this.appInits)
							for (let n = 0; n < this.appInits.length; n++) {
								const t = this.appInits[n]();
								ho(t) && e.push(t);
							}
						Promise.all(e)
							.then(() => {
								t();
							})
							.catch((e) => {
								this.reject(e);
							}),
							0 === e.length && t(),
							(this.initialized = !0);
					}
				}
				return (
					(e.ɵfac = function (t) {
						return new (t || e)(Re(ls, 8));
					}),
					(e.ɵprov = K({ token: e, factory: e.ɵfac })),
					e
				);
			})();
			const cs = new Ee('AppId'),
				as = {
					provide: cs,
					useFactory: function () {
						return `${hs()}${hs()}${hs()}`;
					},
					deps: [],
				};
			function hs() {
				return String.fromCharCode(97 + Math.floor(25 * Math.random()));
			}
			const ds = new Ee('Platform Initializer'),
				fs = new Ee('Platform ID'),
				ps = new Ee('appBootstrapListener');
			let _s = (() => {
				class e {
					log(e) {
						console.log(e);
					}
					warn(e) {
						console.warn(e);
					}
				}
				return (
					(e.ɵfac = function (t) {
						return new (t || e)();
					}),
					(e.ɵprov = K({ token: e, factory: e.ɵfac })),
					e
				);
			})();
			const ms = new Ee('LocaleId'),
				ys = new Ee('DefaultCurrencyCode');
			class gs {
				constructor(e, t) {
					(this.ngModuleFactory = e), (this.componentFactories = t);
				}
			}
			const vs = function (e) {
					return new ss(e);
				},
				ws = vs,
				bs = function (e) {
					return Promise.resolve(vs(e));
				},
				xs = function (e) {
					const t = vs(e),
						n = qt(Xe(e).declarations).reduce((e, t) => {
							const n = Ke(t);
							return n && e.push(new Qo(n)), e;
						}, []);
					return new gs(t, n);
				},
				Cs = xs,
				Es = function (e) {
					return Promise.resolve(xs(e));
				};
			let ks = (() => {
				class e {
					constructor() {
						(this.compileModuleSync = ws), (this.compileModuleAsync = bs), (this.compileModuleAndAllComponentsSync = Cs), (this.compileModuleAndAllComponentsAsync = Es);
					}
					clearCache() {}
					clearCacheFor(e) {}
					getModuleId(e) {}
				}
				return (
					(e.ɵfac = function (t) {
						return new (t || e)();
					}),
					(e.ɵprov = K({ token: e, factory: e.ɵfac })),
					e
				);
			})();
			const Ts = new Ee('compilerOptions'),
				Is = (() => Promise.resolve(0))();
			function Ss(e) {
				'undefined' == typeof Zone
					? Is.then(() => {
							e && e.apply(null, null);
					  })
					: Zone.current.scheduleMicroTask('scheduleMicrotask', e);
			}
			class As {
				constructor({ enableLongStackTrace: e = !1, shouldCoalesceEventChangeDetection: t = !1 }) {
					if (((this.hasPendingMacrotasks = !1), (this.hasPendingMicrotasks = !1), (this.isStable = !0), (this.onUnstable = new is(!1)), (this.onMicrotaskEmpty = new is(!1)), (this.onStable = new is(!1)), (this.onError = new is(!1)), 'undefined' == typeof Zone)) throw new Error('In this configuration Angular requires Zone.js');
					Zone.assertZonePatched(),
						(this._nesting = 0),
						(this._outer = this._inner = Zone.current),
						Zone.wtfZoneSpec && (this._inner = this._inner.fork(Zone.wtfZoneSpec)),
						Zone.TaskTrackingZoneSpec && (this._inner = this._inner.fork(new Zone.TaskTrackingZoneSpec())),
						e && Zone.longStackTraceZoneSpec && (this._inner = this._inner.fork(Zone.longStackTraceZoneSpec)),
						(this.shouldCoalesceEventChangeDetection = t),
						(this.lastRequestAnimationFrameId = -1),
						(this.nativeRequestAnimationFrame = (function () {
							let e = me.requestAnimationFrame,
								t = me.cancelAnimationFrame;
							if ('undefined' != typeof Zone && e && t) {
								const n = e[Zone.__symbol__('OriginalDelegate')];
								n && (e = n);
								const r = t[Zone.__symbol__('OriginalDelegate')];
								r && (t = r);
							}
							return { nativeRequestAnimationFrame: e, nativeCancelAnimationFrame: t };
						})().nativeRequestAnimationFrame),
						(function (e) {
							const t =
								!!e.shouldCoalesceEventChangeDetection &&
								e.nativeRequestAnimationFrame &&
								(() => {
									!(function (e) {
										-1 === e.lastRequestAnimationFrameId &&
											((e.lastRequestAnimationFrameId = e.nativeRequestAnimationFrame.call(me, () => {
												(e.lastRequestAnimationFrameId = -1), Ps(e), Ns(e);
											})),
											Ps(e));
									})(e);
								});
							e._inner = e._inner.fork({
								name: 'angular',
								properties: { isAngularZone: !0, maybeDelayChangeDetection: t },
								onInvokeTask: (n, r, o, s, i, l) => {
									try {
										return Rs(e), n.invokeTask(o, s, i, l);
									} finally {
										t && 'eventTask' === s.type && t(), js(e);
									}
								},
								onInvoke: (t, n, r, o, s, i, l) => {
									try {
										return Rs(e), t.invoke(r, o, s, i, l);
									} finally {
										js(e);
									}
								},
								onHasTask: (t, n, r, o) => {
									t.hasTask(r, o), n === r && ('microTask' == o.change ? ((e._hasPendingMicrotasks = o.microTask), Ps(e), Ns(e)) : 'macroTask' == o.change && (e.hasPendingMacrotasks = o.macroTask));
								},
								onHandleError: (t, n, r, o) => (t.handleError(r, o), e.runOutsideAngular(() => e.onError.emit(o)), !1),
							});
						})(this);
				}
				static isInAngularZone() {
					return !0 === Zone.current.get('isAngularZone');
				}
				static assertInAngularZone() {
					if (!As.isInAngularZone()) throw new Error('Expected to be in Angular Zone, but it is not!');
				}
				static assertNotInAngularZone() {
					if (As.isInAngularZone()) throw new Error('Expected to not be in Angular Zone, but it is!');
				}
				run(e, t, n) {
					return this._inner.run(e, t, n);
				}
				runTask(e, t, n, r) {
					const o = this._inner,
						s = o.scheduleEventTask('NgZoneEvent: ' + r, e, Os, Ds, Ds);
					try {
						return o.runTask(s, t, n);
					} finally {
						o.cancelTask(s);
					}
				}
				runGuarded(e, t, n) {
					return this._inner.runGuarded(e, t, n);
				}
				runOutsideAngular(e) {
					return this._outer.run(e);
				}
			}
			function Ds() {}
			const Os = {};
			function Ns(e) {
				if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
					try {
						e._nesting++, e.onMicrotaskEmpty.emit(null);
					} finally {
						if ((e._nesting--, !e.hasPendingMicrotasks))
							try {
								e.runOutsideAngular(() => e.onStable.emit(null));
							} finally {
								e.isStable = !0;
							}
					}
			}
			function Ps(e) {
				e.hasPendingMicrotasks = !!(e._hasPendingMicrotasks || (e.shouldCoalesceEventChangeDetection && -1 !== e.lastRequestAnimationFrameId));
			}
			function Rs(e) {
				e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
			}
			function js(e) {
				e._nesting--, Ns(e);
			}
			class Ms {
				constructor() {
					(this.hasPendingMicrotasks = !1), (this.hasPendingMacrotasks = !1), (this.isStable = !0), (this.onUnstable = new is()), (this.onMicrotaskEmpty = new is()), (this.onStable = new is()), (this.onError = new is());
				}
				run(e, t, n) {
					return e.apply(t, n);
				}
				runGuarded(e, t, n) {
					return e.apply(t, n);
				}
				runOutsideAngular(e) {
					return e();
				}
				runTask(e, t, n, r) {
					return e.apply(t, n);
				}
			}
			let Hs = (() => {
					class e {
						constructor(e) {
							(this._ngZone = e),
								(this._pendingCount = 0),
								(this._isZoneStable = !0),
								(this._didWork = !1),
								(this._callbacks = []),
								(this.taskTrackingZone = null),
								this._watchAngularEvents(),
								e.run(() => {
									this.taskTrackingZone = 'undefined' == typeof Zone ? null : Zone.current.get('TaskTrackingZone');
								});
						}
						_watchAngularEvents() {
							this._ngZone.onUnstable.subscribe({
								next: () => {
									(this._didWork = !0), (this._isZoneStable = !1);
								},
							}),
								this._ngZone.runOutsideAngular(() => {
									this._ngZone.onStable.subscribe({
										next: () => {
											As.assertNotInAngularZone(),
												Ss(() => {
													(this._isZoneStable = !0), this._runCallbacksIfReady();
												});
										},
									});
								});
						}
						increasePendingRequestCount() {
							return (this._pendingCount += 1), (this._didWork = !0), this._pendingCount;
						}
						decreasePendingRequestCount() {
							if (((this._pendingCount -= 1), this._pendingCount < 0)) throw new Error('pending async requests below zero');
							return this._runCallbacksIfReady(), this._pendingCount;
						}
						isStable() {
							return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks;
						}
						_runCallbacksIfReady() {
							if (this.isStable())
								Ss(() => {
									for (; 0 !== this._callbacks.length; ) {
										let e = this._callbacks.pop();
										clearTimeout(e.timeoutId), e.doneCb(this._didWork);
									}
									this._didWork = !1;
								});
							else {
								let e = this.getPendingTasks();
								(this._callbacks = this._callbacks.filter((t) => !t.updateCb || !t.updateCb(e) || (clearTimeout(t.timeoutId), !1))), (this._didWork = !0);
							}
						}
						getPendingTasks() {
							return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map((e) => ({ source: e.source, creationLocation: e.creationLocation, data: e.data })) : [];
						}
						addCallback(e, t, n) {
							let r = -1;
							t &&
								t > 0 &&
								(r = setTimeout(() => {
									(this._callbacks = this._callbacks.filter((e) => e.timeoutId !== r)), e(this._didWork, this.getPendingTasks());
								}, t)),
								this._callbacks.push({ doneCb: e, timeoutId: r, updateCb: n });
						}
						whenStable(e, t, n) {
							if (n && !this.taskTrackingZone) throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?');
							this.addCallback(e, t, n), this._runCallbacksIfReady();
						}
						getPendingRequestCount() {
							return this._pendingCount;
						}
						findProviders(e, t, n) {
							return [];
						}
					}
					return (
						(e.ɵfac = function (t) {
							return new (t || e)(Re(As));
						}),
						(e.ɵprov = K({ token: e, factory: e.ɵfac })),
						e
					);
				})(),
				Fs = (() => {
					class e {
						constructor() {
							(this._applications = new Map()), Us.addToWindow(this);
						}
						registerApplication(e, t) {
							this._applications.set(e, t);
						}
						unregisterApplication(e) {
							this._applications.delete(e);
						}
						unregisterAllApplications() {
							this._applications.clear();
						}
						getTestability(e) {
							return this._applications.get(e) || null;
						}
						getAllTestabilities() {
							return Array.from(this._applications.values());
						}
						getAllRootElements() {
							return Array.from(this._applications.keys());
						}
						findTestabilityInTree(e, t = !0) {
							return Us.findTestabilityInTree(this, e, t);
						}
					}
					return (
						(e.ɵfac = function (t) {
							return new (t || e)();
						}),
						(e.ɵprov = K({ token: e, factory: e.ɵfac })),
						e
					);
				})();
			class Vs {
				addToWindow(e) {}
				findTestabilityInTree(e, t, n) {
					return null;
				}
			}
			let Ls,
				Us = new Vs(),
				Bs = function (e, t, n) {
					const r = new ss(n);
					if (0 === Kr.size) return Promise.resolve(r);
					const o = (function (e) {
						const t = [];
						return e.forEach((e) => e && t.push(...e)), t;
					})(
						e
							.get(Ts, [])
							.concat(t)
							.map((e) => e.providers)
					);
					if (0 === o.length) return Promise.resolve(r);
					const s = (function () {
							const e = me.ng;
							if (!e || !e.ɵcompilerFacade) throw new Error("Angular JIT compilation failed: '@angular/compiler' not loaded!\n  - JIT compilation is discouraged for production use-cases! Consider AOT mode instead.\n  - Did you bootstrap using '@angular/platform-browser-dynamic' or '@angular/platform-server'?\n  - Alternatively provide the compiler with 'import \"@angular/compiler\";' before bootstrapping.");
							return e.ɵcompilerFacade;
						})(),
						i = Jr.create({ providers: o }).get(s.ResourceLoader);
					return (function (e) {
						const t = [],
							n = new Map();
						function r(e) {
							let t = n.get(e);
							if (!t) {
								const r = ((e) => Promise.resolve(i.get(e)))(e);
								n.set(e, (t = r.then(Xr)));
							}
							return t;
						}
						return (
							Kr.forEach((e, n) => {
								const o = [];
								e.templateUrl &&
									o.push(
										r(e.templateUrl).then((t) => {
											e.template = t;
										})
									);
								const s = e.styleUrls,
									i = e.styles || (e.styles = []),
									l = e.styles.length;
								s &&
									s.forEach((t, n) => {
										i.push(''),
											o.push(
												r(t).then((r) => {
													(i[l + n] = r), s.splice(s.indexOf(t), 1), 0 == s.length && (e.styleUrls = void 0);
												})
											);
									});
								const u = Promise.all(o).then(() =>
									(function (e) {
										Yr.delete(e);
									})(n)
								);
								t.push(u);
							}),
							(Kr = new Map()),
							Promise.all(t).then(() => {})
						);
					})().then(() => r);
				};
			const Zs = new Ee('AllowMultipleToken');
			function $s(e, t, n = []) {
				const r = `Platform: ${t}`,
					o = new Ee(r);
				return (t = []) => {
					let s = zs();
					if (!s || s.injector.get(Zs, !1))
						if (e) e(n.concat(t).concat({ provide: o, useValue: !0 }));
						else {
							const e = n.concat(t).concat({ provide: o, useValue: !0 }, { provide: Hr, useValue: 'platform' });
							!(function (e) {
								if (Ls && !Ls.destroyed && !Ls.injector.get(Zs, !1)) throw new Error('There can be only one platform. Destroy the previous one to create a new one.');
								Ls = e.get(qs);
								const t = e.get(ds, null);
								t && t.forEach((e) => e());
							})(Jr.create({ providers: e, name: r }));
						}
					return (function (e) {
						const t = zs();
						if (!t) throw new Error('No platform exists!');
						if (!t.injector.get(e, null)) throw new Error('A platform with a different configuration has been created. Please destroy it first.');
						return t;
					})(o);
				};
			}
			function zs() {
				return Ls && !Ls.destroyed ? Ls : null;
			}
			let qs = (() => {
				class e {
					constructor(e) {
						(this._injector = e), (this._modules = []), (this._destroyListeners = []), (this._destroyed = !1);
					}
					bootstrapModuleFactory(e, t) {
						const n = (function (e, t) {
								let n;
								return (n = 'noop' === e ? new Ms() : ('zone.js' === e ? void 0 : e) || new As({ enableLongStackTrace: pn(), shouldCoalesceEventChangeDetection: t })), n;
							})(t ? t.ngZone : void 0, (t && t.ngZoneEventCoalescing) || !1),
							r = [{ provide: As, useValue: n }];
						return n.run(() => {
							const t = Jr.create({ providers: r, parent: this.injector, name: e.moduleType.name }),
								o = e.create(t),
								s = o.injector.get(hn, null);
							if (!s) throw new Error('No ErrorHandler. Is platform module (BrowserModule) included?');
							return (
								o.onDestroy(() => Gs(this._modules, o)),
								n.runOutsideAngular(() =>
									n.onError.subscribe({
										next: (e) => {
											s.handleError(e);
										},
									})
								),
								(function (e, t, n) {
									try {
										const r = n();
										return ho(r)
											? r.catch((n) => {
													throw (t.runOutsideAngular(() => e.handleError(n)), n);
											  })
											: r;
									} catch (r) {
										throw (t.runOutsideAngular(() => e.handleError(r)), r);
									}
								})(s, n, () => {
									const e = o.injector.get(us);
									return e.runInitializers(), e.donePromise.then(() => (ns(o.injector.get(ms, 'en-US') || 'en-US'), this._moduleDoBootstrap(o), o));
								})
							);
						});
					}
					bootstrapModule(e, t = []) {
						const n = Ws({}, t);
						return Bs(this.injector, n, e).then((e) => this.bootstrapModuleFactory(e, n));
					}
					_moduleDoBootstrap(e) {
						const t = e.injector.get(Qs);
						if (e._bootstrapComponents.length > 0) e._bootstrapComponents.forEach((e) => t.bootstrap(e));
						else {
							if (!e.instance.ngDoBootstrap) throw new Error(`The module ${le(e.instance.constructor)} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. ` + 'Please define one of these.');
							e.instance.ngDoBootstrap(t);
						}
						this._modules.push(e);
					}
					onDestroy(e) {
						this._destroyListeners.push(e);
					}
					get injector() {
						return this._injector;
					}
					destroy() {
						if (this._destroyed) throw new Error('The platform has already been destroyed!');
						this._modules.slice().forEach((e) => e.destroy()), this._destroyListeners.forEach((e) => e()), (this._destroyed = !0);
					}
					get destroyed() {
						return this._destroyed;
					}
				}
				return (
					(e.ɵfac = function (t) {
						return new (t || e)(Re(Jr));
					}),
					(e.ɵprov = K({ token: e, factory: e.ɵfac })),
					e
				);
			})();
			function Ws(e, t) {
				return Array.isArray(t) ? t.reduce(Ws, e) : Object.assign(Object.assign({}, e), t);
			}
			let Qs = (() => {
				class e {
					constructor(e, t, n, r, o, s) {
						(this._zone = e),
							(this._console = t),
							(this._injector = n),
							(this._exceptionHandler = r),
							(this._componentFactoryResolver = o),
							(this._initStatus = s),
							(this._bootstrapListeners = []),
							(this._views = []),
							(this._runningTick = !1),
							(this._enforceNoNewChanges = !1),
							(this._stable = !0),
							(this.componentTypes = []),
							(this.components = []),
							(this._enforceNoNewChanges = pn()),
							this._zone.onMicrotaskEmpty.subscribe({
								next: () => {
									this._zone.run(() => {
										this.tick();
									});
								},
							});
						const i = new g((e) => {
								(this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks),
									this._zone.runOutsideAngular(() => {
										e.next(this._stable), e.complete();
									});
							}),
							l = new g((e) => {
								let t;
								this._zone.runOutsideAngular(() => {
									t = this._zone.onStable.subscribe(() => {
										As.assertNotInAngularZone(),
											Ss(() => {
												this._stable || this._zone.hasPendingMacrotasks || this._zone.hasPendingMicrotasks || ((this._stable = !0), e.next(!0));
											});
									});
								});
								const n = this._zone.onUnstable.subscribe(() => {
									As.assertInAngularZone(),
										this._stable &&
											((this._stable = !1),
											this._zone.runOutsideAngular(() => {
												e.next(!1);
											}));
								});
								return () => {
									t.unsubscribe(), n.unsubscribe();
								};
							});
						this.isStable = (function (...e) {
							let t = Number.POSITIVE_INFINITY,
								n = null,
								r = e[e.length - 1];
							var o;
							return (
								(o = r) && 'function' == typeof o.schedule ? ((n = e.pop()), e.length > 1 && 'number' == typeof e[e.length - 1] && (t = e.pop())) : 'number' == typeof r && (t = e.pop()),
								null === n && 1 === e.length && e[0] instanceof g
									? e[0]
									: (function (e = Number.POSITIVE_INFINITY) {
											return (function e(t, n, r = Number.POSITIVE_INFINITY) {
												return 'function' == typeof n
													? (o) =>
															o.pipe(
																e((e, r) => {
																	return ((o = t(e, r)), o instanceof g ? o : new g(A(o))).pipe(
																		(function (e, t) {
																			return function (t) {
																				return t.lift(new O(e, void 0));
																			};
																		})((t, o) => n(e, t, r, o))
																	);
																	var o;
																}, r)
															)
													: ('number' == typeof n && (r = n), (e) => e.lift(new P(t, r)));
											})(j, e);
									  })(t)(
											(function (e, t) {
												return t
													? (function (e, t) {
															return new g((n) => {
																const r = new h();
																let o = 0;
																return (
																	r.add(
																		t.schedule(function () {
																			o !== e.length ? (n.next(e[o++]), n.closed || r.add(this.schedule())) : n.complete();
																		})
																	),
																	r
																);
															});
													  })(e, t)
													: new g(T(e));
											})(e, n)
									  )
							);
						})(
							i,
							l.pipe((e) => {
								return M()(
									((t = B),
									function (e) {
										let n;
										n =
											'function' == typeof t
												? t
												: function () {
														return t;
												  };
										const r = Object.create(e, L);
										return (r.source = e), (r.subjectFactory = n), r;
									})(e)
								);
								var t;
							})
						);
					}
					bootstrap(e, t) {
						if (!this._initStatus.done) throw new Error('Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.');
						let n;
						(n = e instanceof vo ? e : this._componentFactoryResolver.resolveComponentFactory(e)), this.componentTypes.push(n.componentType);
						const r = n.isBoundToModule ? void 0 : this._injector.get(Fe),
							o = n.create(Jr.NULL, [], t || n.selector, r);
						o.onDestroy(() => {
							this._unloadComponent(o);
						});
						const s = o.injector.get(Hs, null);
						return s && o.injector.get(Fs).registerApplication(o.location.nativeElement, s), this._loadComponent(o), pn() && this._console.log('Angular is running in the development mode. Call enableProdMode() to enable the production mode.'), o;
					}
					tick() {
						if (this._runningTick) throw new Error('ApplicationRef.tick is called recursively');
						try {
							this._runningTick = !0;
							for (let e of this._views) e.detectChanges();
							if (this._enforceNoNewChanges) for (let e of this._views) e.checkNoChanges();
						} catch (e) {
							this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(e));
						} finally {
							this._runningTick = !1;
						}
					}
					attachView(e) {
						const t = e;
						this._views.push(t), t.attachToAppRef(this);
					}
					detachView(e) {
						const t = e;
						Gs(this._views, t), t.detachFromAppRef();
					}
					_loadComponent(e) {
						this.attachView(e.hostView),
							this.tick(),
							this.components.push(e),
							this._injector
								.get(ps, [])
								.concat(this._bootstrapListeners)
								.forEach((t) => t(e));
					}
					_unloadComponent(e) {
						this.detachView(e.hostView), Gs(this.components, e);
					}
					ngOnDestroy() {
						this._views.slice().forEach((e) => e.destroy());
					}
					get viewCount() {
						return this._views.length;
					}
				}
				return (
					(e.ɵfac = function (t) {
						return new (t || e)(Re(As), Re(_s), Re(Jr), Re(hn), Re(bo), Re(us));
					}),
					(e.ɵprov = K({ token: e, factory: e.ɵfac })),
					e
				);
			})();
			function Gs(e, t) {
				const n = e.indexOf(t);
				n > -1 && e.splice(n, 1);
			}
			const Js = $s(null, 'core', [
					{ provide: fs, useValue: 'unknown' },
					{ provide: qs, deps: [Jr] },
					{ provide: Fs, deps: [] },
					{ provide: _s, deps: [] },
				]),
				Ks = [
					{ provide: Qs, useClass: Qs, deps: [As, _s, Jr, hn, bo, us] },
					{
						provide: Wo,
						deps: [As],
						useFactory: function (e) {
							let t = [];
							return (
								e.onStable.subscribe(() => {
									for (; t.length; ) t.pop()();
								}),
								function (e) {
									t.push(e);
								}
							);
						},
					},
					{ provide: us, useClass: us, deps: [[new q(), ls]] },
					{ provide: ks, useClass: ks, deps: [] },
					as,
					{
						provide: Vo,
						useFactory: function () {
							return Bo;
						},
						deps: [],
					},
					{
						provide: Lo,
						useFactory: function () {
							return Zo;
						},
						deps: [],
					},
					{
						provide: ms,
						useFactory: function (e) {
							return ns((e = e || ('undefined' != typeof $localize && $localize.locale) || 'en-US')), e;
						},
						deps: [[new z(ms), new q(), new Q()]],
					},
					{ provide: ys, useValue: 'USD' },
				];
			let Ys = (() => {
					class e {
						constructor(e) {}
					}
					return (
						(e.ɵmod = Ge({ type: e })),
						(e.ɵinj = Y({
							factory: function (t) {
								return new (t || e)(Re(Qs));
							},
							providers: Ks,
						})),
						e
					);
				})(),
				Xs = null;
			function ei() {
				return Xs;
			}
			const ti = new Ee('DocumentToken'),
				ni = (function () {
					var e = { Zero: 0, One: 1, Two: 2, Few: 3, Many: 4, Other: 5 };
					return (e[e.Zero] = 'Zero'), (e[e.One] = 'One'), (e[e.Two] = 'Two'), (e[e.Few] = 'Few'), (e[e.Many] = 'Many'), (e[e.Other] = 'Other'), e;
				})();
			class ri {}
			let oi = (() => {
					class e extends ri {
						constructor(e) {
							super(), (this.locale = e);
						}
						getPluralCategory(e, t) {
							switch (
								(function (e) {
									return (function (e) {
										const t = (function (e) {
											return e.toLowerCase().replace(/_/g, '-');
										})(e);
										let n = Xo(t);
										if (n) return n;
										const r = t.split('-')[0];
										if (((n = Xo(r)), n)) return n;
										if ('en' === r) return Ko;
										throw new Error(`Missing locale data for the locale "${e}".`);
									})(e)[es.PluralCase];
								})(t || this.locale)(e)
							) {
								case ni.Zero:
									return 'zero';
								case ni.One:
									return 'one';
								case ni.Two:
									return 'two';
								case ni.Few:
									return 'few';
								case ni.Many:
									return 'many';
								default:
									return 'other';
							}
						}
					}
					return (
						(e.ɵfac = function (t) {
							return new (t || e)(Re(ms));
						}),
						(e.ɵprov = K({ token: e, factory: e.ɵfac })),
						e
					);
				})(),
				si = (() => {
					class e {}
					return (
						(e.ɵmod = Ge({ type: e })),
						(e.ɵinj = Y({
							factory: function (t) {
								return new (t || e)();
							},
							providers: [{ provide: ri, useClass: oi }],
						})),
						e
					);
				})();
			class ii extends class extends class {} {
				constructor() {
					super();
				}
				supportsDOMEvents() {
					return !0;
				}
			} {
				static makeCurrent() {
					var e;
					(e = new ii()), Xs || (Xs = e);
				}
				getProperty(e, t) {
					return e[t];
				}
				log(e) {
					window.console && window.console.log && window.console.log(e);
				}
				logGroup(e) {
					window.console && window.console.group && window.console.group(e);
				}
				logGroupEnd() {
					window.console && window.console.groupEnd && window.console.groupEnd();
				}
				onAndCancel(e, t, n) {
					return (
						e.addEventListener(t, n, !1),
						() => {
							e.removeEventListener(t, n, !1);
						}
					);
				}
				dispatchEvent(e, t) {
					e.dispatchEvent(t);
				}
				remove(e) {
					return e.parentNode && e.parentNode.removeChild(e), e;
				}
				getValue(e) {
					return e.value;
				}
				createElement(e, t) {
					return (t = t || this.getDefaultDocument()).createElement(e);
				}
				createHtmlDocument() {
					return document.implementation.createHTMLDocument('fakeTitle');
				}
				getDefaultDocument() {
					return document;
				}
				isElementNode(e) {
					return e.nodeType === Node.ELEMENT_NODE;
				}
				isShadowRoot(e) {
					return e instanceof DocumentFragment;
				}
				getGlobalEventTarget(e, t) {
					return 'window' === t ? window : 'document' === t ? e : 'body' === t ? e.body : null;
				}
				getHistory() {
					return window.history;
				}
				getLocation() {
					return window.location;
				}
				getBaseHref(e) {
					const t = ui || ((ui = document.querySelector('base')), ui) ? ui.getAttribute('href') : null;
					return null == t ? null : ((n = t), li || (li = document.createElement('a')), li.setAttribute('href', n), '/' === li.pathname.charAt(0) ? li.pathname : '/' + li.pathname);
					var n;
				}
				resetBaseElement() {
					ui = null;
				}
				getUserAgent() {
					return window.navigator.userAgent;
				}
				performanceNow() {
					return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
				}
				supportsCookies() {
					return !0;
				}
				getCookie(e) {
					return (function (e, t) {
						t = encodeURIComponent(t);
						for (const n of e.split(';')) {
							const e = n.indexOf('='),
								[r, o] = -1 == e ? [n, ''] : [n.slice(0, e), n.slice(e + 1)];
							if (r.trim() === t) return decodeURIComponent(o);
						}
						return null;
					})(document.cookie, e);
				}
			}
			let li,
				ui = null;
			const ci = new Ee('TRANSITION_ID'),
				ai = [
					{
						provide: ls,
						useFactory: function (e, t, n) {
							return () => {
								n.get(us).donePromise.then(() => {
									const n = ei();
									Array.prototype.slice
										.apply(t.querySelectorAll('style[ng-transition]'))
										.filter((t) => t.getAttribute('ng-transition') === e)
										.forEach((e) => n.remove(e));
								});
							};
						},
						deps: [ci, ti, Jr],
						multi: !0,
					},
				];
			class hi {
				static init() {
					var e;
					(e = new hi()), (Us = e);
				}
				addToWindow(e) {
					(me.getAngularTestability = (t, n = !0) => {
						const r = e.findTestabilityInTree(t, n);
						if (null == r) throw new Error('Could not find testability for element.');
						return r;
					}),
						(me.getAllAngularTestabilities = () => e.getAllTestabilities()),
						(me.getAllAngularRootElements = () => e.getAllRootElements()),
						me.frameworkStabilizers || (me.frameworkStabilizers = []),
						me.frameworkStabilizers.push((e) => {
							const t = me.getAllAngularTestabilities();
							let n = t.length,
								r = !1;
							const o = function (t) {
								(r = r || t), n--, 0 == n && e(r);
							};
							t.forEach(function (e) {
								e.whenStable(o);
							});
						});
				}
				findTestabilityInTree(e, t, n) {
					if (null == t) return null;
					const r = e.getTestability(t);
					return null != r ? r : n ? (ei().isShadowRoot(t) ? this.findTestabilityInTree(e, t.host, !0) : this.findTestabilityInTree(e, t.parentElement, !0)) : null;
				}
			}
			const di = new Ee('EventManagerPlugins');
			let fi = (() => {
				class e {
					constructor(e, t) {
						(this._zone = t), (this._eventNameToPlugin = new Map()), e.forEach((e) => (e.manager = this)), (this._plugins = e.slice().reverse());
					}
					addEventListener(e, t, n) {
						return this._findPluginFor(t).addEventListener(e, t, n);
					}
					addGlobalEventListener(e, t, n) {
						return this._findPluginFor(t).addGlobalEventListener(e, t, n);
					}
					getZone() {
						return this._zone;
					}
					_findPluginFor(e) {
						const t = this._eventNameToPlugin.get(e);
						if (t) return t;
						const n = this._plugins;
						for (let r = 0; r < n.length; r++) {
							const t = n[r];
							if (t.supports(e)) return this._eventNameToPlugin.set(e, t), t;
						}
						throw new Error(`No event manager plugin found for event ${e}`);
					}
				}
				return (
					(e.ɵfac = function (t) {
						return new (t || e)(Re(di), Re(As));
					}),
					(e.ɵprov = K({ token: e, factory: e.ɵfac })),
					e
				);
			})();
			class pi {
				constructor(e) {
					this._doc = e;
				}
				addGlobalEventListener(e, t, n) {
					const r = ei().getGlobalEventTarget(this._doc, e);
					if (!r) throw new Error(`Unsupported event target ${r} for event ${t}`);
					return this.addEventListener(r, t, n);
				}
			}
			let _i = (() => {
					class e {
						constructor() {
							this._stylesSet = new Set();
						}
						addStyles(e) {
							const t = new Set();
							e.forEach((e) => {
								this._stylesSet.has(e) || (this._stylesSet.add(e), t.add(e));
							}),
								this.onStylesAdded(t);
						}
						onStylesAdded(e) {}
						getAllStyles() {
							return Array.from(this._stylesSet);
						}
					}
					return (
						(e.ɵfac = function (t) {
							return new (t || e)();
						}),
						(e.ɵprov = K({ token: e, factory: e.ɵfac })),
						e
					);
				})(),
				mi = (() => {
					class e extends _i {
						constructor(e) {
							super(), (this._doc = e), (this._hostNodes = new Set()), (this._styleNodes = new Set()), this._hostNodes.add(e.head);
						}
						_addStylesToHost(e, t) {
							e.forEach((e) => {
								const n = this._doc.createElement('style');
								(n.textContent = e), this._styleNodes.add(t.appendChild(n));
							});
						}
						addHost(e) {
							this._addStylesToHost(this._stylesSet, e), this._hostNodes.add(e);
						}
						removeHost(e) {
							this._hostNodes.delete(e);
						}
						onStylesAdded(e) {
							this._hostNodes.forEach((t) => this._addStylesToHost(e, t));
						}
						ngOnDestroy() {
							this._styleNodes.forEach((e) => ei().remove(e));
						}
					}
					return (
						(e.ɵfac = function (t) {
							return new (t || e)(Re(ti));
						}),
						(e.ɵprov = K({ token: e, factory: e.ɵfac })),
						e
					);
				})();
			const yi = { svg: 'http://www.w3.org/2000/svg', xhtml: 'http://www.w3.org/1999/xhtml', xlink: 'http://www.w3.org/1999/xlink', xml: 'http://www.w3.org/XML/1998/namespace', xmlns: 'http://www.w3.org/2000/xmlns/' },
				gi = /%COMP%/g;
			function vi(e, t, n) {
				for (let r = 0; r < t.length; r++) {
					let o = t[r];
					Array.isArray(o) ? vi(e, o, n) : ((o = o.replace(gi, e)), n.push(o));
				}
				return n;
			}
			function wi(e) {
				return (t) => {
					if ('__ngUnwrap__' === t) return e;
					!1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
				};
			}
			let bi = (() => {
				class e {
					constructor(e, t, n) {
						(this.eventManager = e), (this.sharedStylesHost = t), (this.appId = n), (this.rendererByCompId = new Map()), (this.defaultRenderer = new xi(e));
					}
					createRenderer(e, t) {
						if (!e || !t) return this.defaultRenderer;
						switch (t.encapsulation) {
							case Ue.Emulated: {
								let n = this.rendererByCompId.get(t.id);
								return n || ((n = new Ci(this.eventManager, this.sharedStylesHost, t, this.appId)), this.rendererByCompId.set(t.id, n)), n.applyToHost(e), n;
							}
							case Ue.Native:
							case Ue.ShadowDom:
								return new Ei(this.eventManager, this.sharedStylesHost, e, t);
							default:
								if (!this.rendererByCompId.has(t.id)) {
									const e = vi(t.id, t.styles, []);
									this.sharedStylesHost.addStyles(e), this.rendererByCompId.set(t.id, this.defaultRenderer);
								}
								return this.defaultRenderer;
						}
					}
					begin() {}
					end() {}
				}
				return (
					(e.ɵfac = function (t) {
						return new (t || e)(Re(fi), Re(mi), Re(cs));
					}),
					(e.ɵprov = K({ token: e, factory: e.ɵfac })),
					e
				);
			})();
			class xi {
				constructor(e) {
					(this.eventManager = e), (this.data = Object.create(null));
				}
				destroy() {}
				createElement(e, t) {
					return t ? document.createElementNS(yi[t] || t, e) : document.createElement(e);
				}
				createComment(e) {
					return document.createComment(e);
				}
				createText(e) {
					return document.createTextNode(e);
				}
				appendChild(e, t) {
					e.appendChild(t);
				}
				insertBefore(e, t, n) {
					e && e.insertBefore(t, n);
				}
				removeChild(e, t) {
					e && e.removeChild(t);
				}
				selectRootElement(e, t) {
					let n = 'string' == typeof e ? document.querySelector(e) : e;
					if (!n) throw new Error(`The selector "${e}" did not match any elements`);
					return t || (n.textContent = ''), n;
				}
				parentNode(e) {
					return e.parentNode;
				}
				nextSibling(e) {
					return e.nextSibling;
				}
				setAttribute(e, t, n, r) {
					if (r) {
						t = r + ':' + t;
						const o = yi[r];
						o ? e.setAttributeNS(o, t, n) : e.setAttribute(t, n);
					} else e.setAttribute(t, n);
				}
				removeAttribute(e, t, n) {
					if (n) {
						const r = yi[n];
						r ? e.removeAttributeNS(r, t) : e.removeAttribute(`${n}:${t}`);
					} else e.removeAttribute(t);
				}
				addClass(e, t) {
					e.classList.add(t);
				}
				removeClass(e, t) {
					e.classList.remove(t);
				}
				setStyle(e, t, n, r) {
					r & ko.DashCase ? e.style.setProperty(t, n, r & ko.Important ? 'important' : '') : (e.style[t] = n);
				}
				removeStyle(e, t, n) {
					n & ko.DashCase ? e.style.removeProperty(t) : (e.style[t] = '');
				}
				setProperty(e, t, n) {
					e[t] = n;
				}
				setValue(e, t) {
					e.nodeValue = t;
				}
				listen(e, t, n) {
					return 'string' == typeof e ? this.eventManager.addGlobalEventListener(e, t, wi(n)) : this.eventManager.addEventListener(e, t, wi(n));
				}
			}
			class Ci extends xi {
				constructor(e, t, n, r) {
					super(e), (this.component = n);
					const o = vi(r + '-' + n.id, n.styles, []);
					t.addStyles(o),
						(this.contentAttr = '_ngcontent-%COMP%'.replace(gi, r + '-' + n.id)),
						(this.hostAttr = (function (e) {
							return '_nghost-%COMP%'.replace(gi, e);
						})(r + '-' + n.id));
				}
				applyToHost(e) {
					super.setAttribute(e, this.hostAttr, '');
				}
				createElement(e, t) {
					const n = super.createElement(e, t);
					return super.setAttribute(n, this.contentAttr, ''), n;
				}
			}
			class Ei extends xi {
				constructor(e, t, n, r) {
					super(e), (this.sharedStylesHost = t), (this.hostEl = n), (this.component = r), (this.shadowRoot = r.encapsulation === Ue.ShadowDom ? n.attachShadow({ mode: 'open' }) : n.createShadowRoot()), this.sharedStylesHost.addHost(this.shadowRoot);
					const o = vi(r.id, r.styles, []);
					for (let s = 0; s < o.length; s++) {
						const e = document.createElement('style');
						(e.textContent = o[s]), this.shadowRoot.appendChild(e);
					}
				}
				nodeOrShadowRoot(e) {
					return e === this.hostEl ? this.shadowRoot : e;
				}
				destroy() {
					this.sharedStylesHost.removeHost(this.shadowRoot);
				}
				appendChild(e, t) {
					return super.appendChild(this.nodeOrShadowRoot(e), t);
				}
				insertBefore(e, t, n) {
					return super.insertBefore(this.nodeOrShadowRoot(e), t, n);
				}
				removeChild(e, t) {
					return super.removeChild(this.nodeOrShadowRoot(e), t);
				}
				parentNode(e) {
					return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)));
				}
			}
			let ki = (() => {
				class e extends pi {
					constructor(e) {
						super(e);
					}
					supports(e) {
						return !0;
					}
					addEventListener(e, t, n) {
						return e.addEventListener(t, n, !1), () => this.removeEventListener(e, t, n);
					}
					removeEventListener(e, t, n) {
						return e.removeEventListener(t, n);
					}
				}
				return (
					(e.ɵfac = function (t) {
						return new (t || e)(Re(ti));
					}),
					(e.ɵprov = K({ token: e, factory: e.ɵfac })),
					e
				);
			})();
			const Ti = ['alt', 'control', 'meta', 'shift'],
				Ii = { '\b': 'Backspace', '\t': 'Tab', '\x7f': 'Delete', '\x1b': 'Escape', Del: 'Delete', Esc: 'Escape', Left: 'ArrowLeft', Right: 'ArrowRight', Up: 'ArrowUp', Down: 'ArrowDown', Menu: 'ContextMenu', Scroll: 'ScrollLock', Win: 'OS' },
				Si = { A: '1', B: '2', C: '3', D: '4', E: '5', F: '6', G: '7', H: '8', I: '9', J: '*', K: '+', M: '-', N: '.', O: '/', '`': '0', '\x90': 'NumLock' },
				Ai = { alt: (e) => e.altKey, control: (e) => e.ctrlKey, meta: (e) => e.metaKey, shift: (e) => e.shiftKey };
			let Di = (() => {
				class e extends pi {
					constructor(e) {
						super(e);
					}
					supports(t) {
						return null != e.parseEventName(t);
					}
					addEventListener(t, n, r) {
						const o = e.parseEventName(n),
							s = e.eventCallback(o.fullKey, r, this.manager.getZone());
						return this.manager.getZone().runOutsideAngular(() => ei().onAndCancel(t, o.domEventName, s));
					}
					static parseEventName(t) {
						const n = t.toLowerCase().split('.'),
							r = n.shift();
						if (0 === n.length || ('keydown' !== r && 'keyup' !== r)) return null;
						const o = e._normalizeKey(n.pop());
						let s = '';
						if (
							(Ti.forEach((e) => {
								const t = n.indexOf(e);
								t > -1 && (n.splice(t, 1), (s += e + '.'));
							}),
							(s += o),
							0 != n.length || 0 === o.length)
						)
							return null;
						const i = {};
						return (i.domEventName = r), (i.fullKey = s), i;
					}
					static getEventFullKey(e) {
						let t = '',
							n = (function (e) {
								let t = e.key;
								if (null == t) {
									if (((t = e.keyIdentifier), null == t)) return 'Unidentified';
									t.startsWith('U+') && ((t = String.fromCharCode(parseInt(t.substring(2), 16))), 3 === e.location && Si.hasOwnProperty(t) && (t = Si[t]));
								}
								return Ii[t] || t;
							})(e);
						return (
							(n = n.toLowerCase()),
							' ' === n ? (n = 'space') : '.' === n && (n = 'dot'),
							Ti.forEach((r) => {
								r != n && (0, Ai[r])(e) && (t += r + '.');
							}),
							(t += n),
							t
						);
					}
					static eventCallback(t, n, r) {
						return (o) => {
							e.getEventFullKey(o) === t && r.runGuarded(() => n(o));
						};
					}
					static _normalizeKey(e) {
						switch (e) {
							case 'esc':
								return 'escape';
							default:
								return e;
						}
					}
				}
				return (
					(e.ɵfac = function (t) {
						return new (t || e)(Re(ti));
					}),
					(e.ɵprov = K({ token: e, factory: e.ɵfac })),
					e
				);
			})();
			const Oi = $s(Js, 'browser', [
					{ provide: fs, useValue: 'browser' },
					{
						provide: ds,
						useValue: function () {
							ii.makeCurrent(), hi.init();
						},
						multi: !0,
					},
					{
						provide: ti,
						useFactory: function () {
							return (
								(function (e) {
									Rt = e;
								})(document),
								document
							);
						},
						deps: [],
					},
				]),
				Ni = [
					[],
					{ provide: Hr, useValue: 'root' },
					{
						provide: hn,
						useFactory: function () {
							return new hn();
						},
						deps: [],
					},
					{ provide: di, useClass: ki, multi: !0, deps: [ti, As, fs] },
					{ provide: di, useClass: Di, multi: !0, deps: [ti] },
					[],
					{ provide: bi, useClass: bi, deps: [fi, mi, cs] },
					{ provide: Eo, useExisting: bi },
					{ provide: _i, useExisting: mi },
					{ provide: mi, useClass: mi, deps: [ti] },
					{ provide: Hs, useClass: Hs, deps: [As] },
					{ provide: fi, useClass: fi, deps: [di, As] },
					[],
				];
			let Pi = (() => {
				class e {
					constructor(e) {
						if (e) throw new Error('BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.');
					}
					static withServerTransition(t) {
						return { ngModule: e, providers: [{ provide: cs, useValue: t.appId }, { provide: ci, useExisting: cs }, ai] };
					}
				}
				return (
					(e.ɵmod = Ge({ type: e })),
					(e.ɵinj = Y({
						factory: function (t) {
							return new (t || e)(Re(e, 12));
						},
						providers: Ni,
						imports: [si, Ys],
					})),
					e
				);
			})();
			'undefined' != typeof window && window;
			let Ri = (() => {
					class e {
						constructor() {
							(this.textFromUi5 = new is()), (this.ui5EventBus = window.ui5EventBus), (this.textForUi5 = 'Hello UI5');
						}
						ngOnInit() {
							this.ui5EventBus
								? (console.log(this.ui5EventBus),
								  this.ui5EventBus.subscribe('UI5Channel', 'ui5ToAngular', (e, t, n) => {
										console.log('Received ' + n.text + ' from UI5 eventbus'), this.textFromUi5.emit(n.text);
								  }))
								: console.log('UI5 eventbus missing');
						}
						sendMessageToUi5() {
							this.ui5EventBus ? (console.log(this.ui5EventBus), console.log('Sending ' + this.textForUi5 + ' via UI5-Eventbus'), this.ui5EventBus.publish('UI5Channel', 'angularToUi5', { text: this.textForUi5 })) : console.log('UI5 eventbus missing');
						}
					}
					return (
						(e.ɵfac = function (t) {
							return new (t || e)();
						}),
						(e.ɵcmp = ze({
							type: e,
							selectors: [['app-ui5listener']],
							inputs: { textForUi5: 'textForUi5' },
							outputs: { textFromUi5: 'textFromUi5' },
							decls: 3,
							vars: 1,
							consts: [
								[3, 'value', 'valueChange'],
								['type', 'button', 3, 'click'],
							],
							template: function (e, t) {
								1 & e &&
									(co(0, 'input', 0),
									fo('valueChange', function (e) {
										return (t.textForUi5 = e);
									}),
									ao(),
									co(1, 'button', 1),
									fo('click', function () {
										return t.sendMessageToUi5();
									}),
									mo(2, 'Send message to UI5'),
									ao()),
									2 & e && lo('value', t.textForUi5);
							},
							styles: [''],
						})),
						e
					);
				})(),
				ji = (() => {
					class e {
						constructor() {
							(this.title = 'EmbeddedAngular'), (this.message = '<empty>');
						}
						onButtonPressed() {
							alert('Message in Angular app');
						}
						messageReceived(e) {
							this.message = e;
						}
					}
					return (
						(e.ɵfac = function (t) {
							return new (t || e)();
						}),
						(e.ɵcmp = ze({
							type: e,
							selectors: [['app-root']],
							decls: 6,
							vars: 1,
							consts: [
								['role', 'main', 1, 'content'],
								['type', 'button', 3, 'click'],
								[3, 'textFromUi5'],
							],
							template: function (e, t) {
								1 & e &&
									(co(0, 'div', 0),
									co(1, 'h1'),
									mo(2),
									ao(),
									co(3, 'button', 1),
									fo('click', function () {
										return t.onButtonPressed();
									}),
									mo(4, 'Show message'),
									ao(),
									co(5, 'app-ui5listener', 2),
									fo('textFromUi5', function (e) {
										return t.messageReceived(e);
									}),
									ao(),
									ao()),
									2 & e && (2, Fn(ct(), ut(), kt() + 2, ft()), yo('', t.title, ' running'));
							},
							directives: [Ri],
							styles: [''],
						})),
						e
					);
				})(),
				Mi = (() => {
					class e {}
					return (
						(e.ɵmod = Ge({ type: e, bootstrap: [ji] })),
						(e.ɵinj = Y({
							factory: function (t) {
								return new (t || e)();
							},
							providers: [],
							imports: [[Pi]],
						})),
						e
					);
				})();
			(function () {
				if (fn) throw new Error('Cannot enable prod mode after platform setup.');
				dn = !1;
			})(),
				Oi()
					.bootstrapModule(Mi)
					.catch((e) => console.error(e));
		},
		zn8P: function (e, t) {
			function n(e) {
				return Promise.resolve().then(function () {
					var t = new Error("Cannot find module '" + e + "'");
					throw ((t.code = 'MODULE_NOT_FOUND'), t);
				});
			}
			(n.keys = function () {
				return [];
			}),
				(n.resolve = n),
				(e.exports = n),
				(n.id = 'zn8P');
		},
	},
	[[0, 0]],
]);
