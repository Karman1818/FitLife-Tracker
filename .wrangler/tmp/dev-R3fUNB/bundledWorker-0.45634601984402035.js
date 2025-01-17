function __cf_cjs(esm) {
  const cjs = 'default' in esm ? esm.default : {};
	for (const [k, v] of Object.entries(esm)) {
		if (k !== 'default') {
			Object.defineProperty(cjs, k, {
				enumerable: true,
				value: v,
			});
		}
	}
	return cjs;
}
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// node_modules/wrangler/_virtual_unenv_global_polyfill-clear$immediate.js
globalThis.clearImmediate = clearImmediateFallback;

// node_modules/unenv/runtime/_internal/utils.mjs
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
function notImplemented(name) {
  const fn3 = /* @__PURE__ */ __name(() => {
    throw createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn3, { __unenv__: true });
}
__name(notImplemented, "notImplemented");

// node_modules/unenv/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// node_modules/unenv/runtime/node/timers/internal/immediate.mjs
var Immediate = class {
  _onImmediate;
  _timeout;
  constructor(callback, args) {
    this._onImmediate = callback;
    if ("setTimeout" in globalThis) {
      this._timeout = setTimeout(callback, 0, ...args);
    } else {
      callback(...args);
    }
  }
  ref() {
    this._timeout?.ref();
    return this;
  }
  unref() {
    this._timeout?.unref();
    return this;
  }
  hasRef() {
    return this._timeout?.hasRef() ?? false;
  }
  [Symbol.dispose]() {
    if ("clearTimeout" in globalThis) {
      clearTimeout(this._timeout);
    }
  }
};
__name(Immediate, "Immediate");

// node_modules/unenv/runtime/node/timers/internal/set-immediate.mjs
function setImmediateFallbackPromises(value) {
  return new Promise((res) => {
    res(value);
  });
}
__name(setImmediateFallbackPromises, "setImmediateFallbackPromises");
function setImmediateFallback(callback, ...args) {
  return new Immediate(callback, args);
}
__name(setImmediateFallback, "setImmediateFallback");
setImmediateFallback.__promisify__ = setImmediateFallbackPromises;
function clearImmediateFallback(immediate) {
  immediate?.[Symbol.dispose]();
}
__name(clearImmediateFallback, "clearImmediateFallback");

// node_modules/wrangler/_virtual_unenv_global_polyfill-set$immediate.js
globalThis.setImmediate = setImmediateFallback;

// node_modules/unenv/runtime/node/console/index.mjs
import { Writable } from "node:stream";

// node_modules/unenv/runtime/mock/proxy.mjs
var fn = /* @__PURE__ */ __name(function() {
}, "fn");
function createMock(name, overrides = {}) {
  fn.prototype.name = name;
  const props = {};
  return new Proxy(fn, {
    get(_target, prop) {
      if (prop === "caller") {
        return null;
      }
      if (prop === "__createMock__") {
        return createMock;
      }
      if (prop === "__unenv__") {
        return true;
      }
      if (prop in overrides) {
        return overrides[prop];
      }
      return props[prop] = props[prop] || createMock(`${name}.${prop.toString()}`);
    },
    apply(_target, _this, _args) {
      return createMock(`${name}()`);
    },
    construct(_target, _args, _newT) {
      return createMock(`[${name}]`);
    },
    // @ts-ignore (ES6-only - removed in ES7)
    // https://github.com/tc39/ecma262/issues/161
    enumerate() {
      return [];
    }
  });
}
__name(createMock, "createMock");
var proxy_default = createMock("mock");

// node_modules/unenv/runtime/node/console/index.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? notImplemented("console.createTask");
var assert = notImplemented("console.assert");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? proxy_default.__createMock__("console.Console");

// node_modules/unenv/runtime/node/console/$cloudflare.mjs
var workerdConsole = globalThis["console"];
var {
  assert: assert2,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler: noop_default,
  _stdout,
  _stdoutErrorHandler: noop_default,
  _times: proxy_default
});
var cloudflare_default = workerdConsole;

// node_modules/wrangler/_virtual_unenv_global_polyfill-console.js
globalThis.console = cloudflare_default;

// node_modules/unenv/runtime/web/performance/_entry.mjs
var _supportedEntryTypes = [
  "event",
  // PerformanceEntry
  "mark",
  // PerformanceMark
  "measure",
  // PerformanceMeasure
  "resource"
  // PerformanceResourceTiming
];
var _PerformanceEntry = class {
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || performance.now();
    this.detail = options?.detail;
  }
  get duration() {
    return performance.now() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
__name(_PerformanceEntry, "_PerformanceEntry");
var PerformanceEntry = globalThis.PerformanceEntry || _PerformanceEntry;
var _PerformanceMark = class extends _PerformanceEntry {
  entryType = "mark";
};
__name(_PerformanceMark, "_PerformanceMark");
var PerformanceMark = globalThis.PerformanceMark || _PerformanceMark;
var _PerformanceMeasure = class extends _PerformanceEntry {
  entryType = "measure";
};
__name(_PerformanceMeasure, "_PerformanceMeasure");
var PerformanceMeasure = globalThis.PerformanceMeasure || _PerformanceMeasure;
var _PerformanceResourceTiming = class extends _PerformanceEntry {
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
__name(_PerformanceResourceTiming, "_PerformanceResourceTiming");
var PerformanceResourceTiming = globalThis.PerformanceResourceTiming || _PerformanceResourceTiming;

// node_modules/unenv/runtime/web/performance/_performance.mjs
var _timeOrigin = Date.now();
var _Performance = class {
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = proxy_default.__createMock__("PerformanceNavigation");
  timing = proxy_default.__createMock__("PerformanceTiming");
  onresourcetimingbufferfull = null;
  now() {
    if (globalThis?.performance?.now && this.timeOrigin === _timeOrigin) {
      return globalThis.performance.now();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter(
      (e) => e.entryType !== "resource" || e.entryType !== "navigation"
    );
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter(
      (e) => e.name === name && (!type || e.entryType === type)
    );
  }
  getEntriesByType(type) {
    return this._entries.filter(
      (e) => e.entryType === type
    );
  }
  mark(name, options) {
    const entry = new _PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || performance2.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || performance2.now();
    }
    const entry = new _PerformanceMeasure(measureName, {
      startTime: start,
      detail: { start, end }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  toJSON() {
    return this;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
};
__name(_Performance, "_Performance");
var Performance = globalThis.Performance || _Performance;
var performance2 = globalThis.performance || new Performance();

// node_modules/unenv/runtime/web/performance/_observer.mjs
var _PerformanceObserver = class {
  __unenv__ = true;
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
};
__name(_PerformanceObserver, "_PerformanceObserver");
__publicField(_PerformanceObserver, "supportedEntryTypes", _supportedEntryTypes);
var PerformanceObserver = globalThis.PerformanceObserver || _PerformanceObserver;
var _PerformanceObserverEntryList = class {
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
__name(_PerformanceObserverEntryList, "_PerformanceObserverEntryList");
var PerformanceObserverEntryList = globalThis.PerformanceObserverEntryList || _PerformanceObserverEntryList;

// node_modules/unenv/runtime/polyfill/global-this.mjs
function getGlobal() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  return {};
}
__name(getGlobal, "getGlobal");
var global_this_default = getGlobal();

// node_modules/unenv/runtime/polyfill/performance.mjs
global_this_default.performance = global_this_default.performance || performance2;
global_this_default.Performance = global_this_default.Performance || Performance;
global_this_default.PerformanceEntry = global_this_default.PerformanceEntry || PerformanceEntry;
global_this_default.PerformanceMark = global_this_default.PerformanceMark || PerformanceMark;
global_this_default.PerformanceMeasure = global_this_default.PerformanceMeasure || PerformanceMeasure;
global_this_default.PerformanceObserver = global_this_default.PerformanceObserver || PerformanceObserver;
global_this_default.PerformanceObserverEntryList = global_this_default.PerformanceObserverEntryList || PerformanceObserverEntryList;
global_this_default.PerformanceResourceTiming = global_this_default.PerformanceResourceTiming || PerformanceResourceTiming;
var performance_default = global_this_default.performance;

// node_modules/wrangler/_virtual_unenv_global_polyfill-performance.js
globalThis.performance = performance_default;

// node_modules/unenv/runtime/mock/empty.mjs
var empty_default = Object.freeze(
  Object.create(null, {
    __unenv__: { get: () => true }
  })
);

// node_modules/unenv/runtime/node/process/internal/env.mjs
var _envShim = /* @__PURE__ */ Object.create(null);
var _processEnv = globalThis.process?.env;
var _getEnv = /* @__PURE__ */ __name((useShim) => _processEnv || globalThis.__env__ || (useShim ? _envShim : globalThis), "_getEnv");
var env = new Proxy(_envShim, {
  get(_, prop) {
    const env23 = _getEnv();
    return env23[prop] ?? _envShim[prop];
  },
  has(_, prop) {
    const env23 = _getEnv();
    return prop in env23 || prop in _envShim;
  },
  set(_, prop, value) {
    const env23 = _getEnv(true);
    env23[prop] = value;
    return true;
  },
  deleteProperty(_, prop) {
    const env23 = _getEnv(true);
    delete env23[prop];
    return true;
  },
  ownKeys() {
    const env23 = _getEnv();
    return Object.keys(env23);
  }
});

// node_modules/unenv/runtime/node/process/internal/time.mjs
var hrtime = Object.assign(
  /* @__PURE__ */ __name(function hrtime2(startTime) {
    const now = Date.now();
    const seconds = Math.trunc(now / 1e3);
    const nanos = now % 1e3 * 1e6;
    if (startTime) {
      let diffSeconds = seconds - startTime[0];
      let diffNanos = nanos - startTime[0];
      if (diffNanos < 0) {
        diffSeconds = diffSeconds - 1;
        diffNanos = 1e9 + diffNanos;
      }
      return [diffSeconds, diffNanos];
    }
    return [seconds, nanos];
  }, "hrtime2"),
  {
    bigint: /* @__PURE__ */ __name(function bigint() {
      return BigInt(Date.now() * 1e6);
    }, "bigint")
  }
);
var nextTick = globalThis.queueMicrotask ? (cb, ...args) => {
  globalThis.queueMicrotask(cb.bind(void 0, ...args));
} : _createNextTickWithTimeout();
function _createNextTickWithTimeout() {
  let queue = [];
  let draining = false;
  let currentQueue;
  let queueIndex = -1;
  function cleanUpNextTick() {
    if (!draining || !currentQueue) {
      return;
    }
    draining = false;
    if (currentQueue.length > 0) {
      queue = [...currentQueue, ...queue];
    } else {
      queueIndex = -1;
    }
    if (queue.length > 0) {
      drainQueue();
    }
  }
  __name(cleanUpNextTick, "cleanUpNextTick");
  function drainQueue() {
    if (draining) {
      return;
    }
    const timeout = setTimeout(cleanUpNextTick);
    draining = true;
    let len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      while (++queueIndex < len) {
        if (currentQueue) {
          currentQueue[queueIndex]();
        }
      }
      queueIndex = -1;
      len = queue.length;
    }
    currentQueue = void 0;
    draining = false;
    clearTimeout(timeout);
  }
  __name(drainQueue, "drainQueue");
  const nextTick23 = /* @__PURE__ */ __name((cb, ...args) => {
    queue.push(cb.bind(void 0, ...args));
    if (queue.length === 1 && !draining) {
      setTimeout(drainQueue);
    }
  }, "nextTick2");
  return nextTick23;
}
__name(_createNextTickWithTimeout, "_createNextTickWithTimeout");

// node_modules/unenv/runtime/node/process/internal/process.mjs
var title = "unenv";
var argv = [];
var version = "";
var versions = {
  ares: "",
  http_parser: "",
  icu: "",
  modules: "",
  node: "",
  openssl: "",
  uv: "",
  v8: "",
  zlib: ""
};
function noop() {
  return process;
}
__name(noop, "noop");
var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = /* @__PURE__ */ __name(function emit2(event) {
  if (event === "message" || event === "multipleResolves") {
    return process;
  }
  return false;
}, "emit2");
var prependListener = noop;
var prependOnceListener = noop;
var listeners = /* @__PURE__ */ __name(function(name) {
  return [];
}, "listeners");
var listenerCount = /* @__PURE__ */ __name(() => 0, "listenerCount");
var binding = /* @__PURE__ */ __name(function(name) {
  throw new Error("[unenv] process.binding is not supported");
}, "binding");
var _cwd = "/";
var cwd = /* @__PURE__ */ __name(function cwd2() {
  return _cwd;
}, "cwd2");
var chdir = /* @__PURE__ */ __name(function chdir2(dir4) {
  _cwd = dir4;
}, "chdir2");
var umask = /* @__PURE__ */ __name(function umask2() {
  return 0;
}, "umask2");
var getegid = /* @__PURE__ */ __name(function getegid2() {
  return 1e3;
}, "getegid2");
var geteuid = /* @__PURE__ */ __name(function geteuid2() {
  return 1e3;
}, "geteuid2");
var getgid = /* @__PURE__ */ __name(function getgid2() {
  return 1e3;
}, "getgid2");
var getuid = /* @__PURE__ */ __name(function getuid2() {
  return 1e3;
}, "getuid2");
var getgroups = /* @__PURE__ */ __name(function getgroups2() {
  return [];
}, "getgroups2");
var getBuiltinModule = /* @__PURE__ */ __name((_name) => void 0, "getBuiltinModule");
var abort = notImplemented("process.abort");
var allowedNodeEnvironmentFlags = /* @__PURE__ */ new Set();
var arch = "";
var argv0 = "";
var config = empty_default;
var connected = false;
var constrainedMemory = /* @__PURE__ */ __name(() => 0, "constrainedMemory");
var availableMemory = /* @__PURE__ */ __name(() => 0, "availableMemory");
var cpuUsage = notImplemented("process.cpuUsage");
var debugPort = 0;
var dlopen = notImplemented("process.dlopen");
var disconnect = noop;
var emitWarning = noop;
var eventNames = notImplemented("process.eventNames");
var execArgv = [];
var execPath = "";
var exit = notImplemented("process.exit");
var features = /* @__PURE__ */ Object.create({
  inspector: void 0,
  debug: void 0,
  uv: void 0,
  ipv6: void 0,
  tls_alpn: void 0,
  tls_sni: void 0,
  tls_ocsp: void 0,
  tls: void 0,
  cached_builtins: void 0
});
var getActiveResourcesInfo = /* @__PURE__ */ __name(() => [], "getActiveResourcesInfo");
var getMaxListeners = notImplemented(
  "process.getMaxListeners"
);
var kill = notImplemented("process.kill");
var memoryUsage = Object.assign(
  () => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }),
  { rss: () => 0 }
);
var pid = 1e3;
var platform = "";
var ppid = 1e3;
var rawListeners = notImplemented(
  "process.rawListeners"
);
var release = /* @__PURE__ */ Object.create({
  name: "",
  lts: "",
  sourceUrl: void 0,
  headersUrl: void 0
});
var report = /* @__PURE__ */ Object.create({
  compact: void 0,
  directory: void 0,
  filename: void 0,
  getReport: notImplemented("process.report.getReport"),
  reportOnFatalError: void 0,
  reportOnSignal: void 0,
  reportOnUncaughtException: void 0,
  signal: void 0,
  writeReport: notImplemented("process.report.writeReport")
});
var resourceUsage = notImplemented(
  "process.resourceUsage"
);
var setegid = notImplemented("process.setegid");
var seteuid = notImplemented("process.seteuid");
var setgid = notImplemented("process.setgid");
var setgroups = notImplemented("process.setgroups");
var setuid = notImplemented("process.setuid");
var setMaxListeners = notImplemented(
  "process.setMaxListeners"
);
var setSourceMapsEnabled = notImplemented("process.setSourceMapsEnabled");
var stdout = proxy_default.__createMock__("process.stdout");
var stderr = proxy_default.__createMock__("process.stderr");
var stdin = proxy_default.__createMock__("process.stdin");
var traceDeprecation = false;
var uptime = /* @__PURE__ */ __name(() => 0, "uptime");
var exitCode = 0;
var setUncaughtExceptionCaptureCallback = notImplemented("process.setUncaughtExceptionCaptureCallback");
var hasUncaughtExceptionCaptureCallback = /* @__PURE__ */ __name(() => false, "hasUncaughtExceptionCaptureCallback");
var sourceMapsEnabled = false;
var loadEnvFile = notImplemented(
  "process.loadEnvFile"
);
var mainModule = void 0;
var permission = {
  has: () => false
};
var channel = {
  ref() {
  },
  unref() {
  }
};
var throwDeprecation = false;
var finalization = {
  register() {
  },
  unregister() {
  },
  registerBeforeExit() {
  }
};
var assert3 = notImplemented("process.assert");
var openStdin = notImplemented("process.openStdin");
var _debugEnd = notImplemented("process._debugEnd");
var _debugProcess = notImplemented("process._debugProcess");
var _fatalException = notImplemented("process._fatalException");
var _getActiveHandles = notImplemented("process._getActiveHandles");
var _getActiveRequests = notImplemented("process._getActiveRequests");
var _kill = notImplemented("process._kill");
var _preload_modules = [];
var _rawDebug = notImplemented("process._rawDebug");
var _startProfilerIdleNotifier = notImplemented(
  "process._startProfilerIdleNotifier"
);
var _stopProfilerIdleNotifier = notImplemented(
  "process.__stopProfilerIdleNotifier"
);
var _tickCallback = notImplemented("process._tickCallback");
var _linkedBinding = notImplemented("process._linkedBinding");
var domain = void 0;
var initgroups = notImplemented("process.initgroups");
var moduleLoadList = [];
var reallyExit = noop;
var _exiting = false;
var _events = [];
var _eventsCount = 0;
var _maxListeners = 0;
var process = {
  // @ts-expect-error
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  exitCode,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  throwDeprecation,
  mainModule,
  permission,
  channel,
  arch,
  argv,
  argv0,
  assert: assert3,
  binding,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  openStdin,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions
};

// node_modules/unenv/runtime/node/process/$cloudflare.mjs
var unpatchedGlobalThisProcess = globalThis["process"];
var getBuiltinModule2 = unpatchedGlobalThisProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule2("node:process");
var { env: env2, exit: exit2, nextTick: nextTick2, platform: platform2 } = workerdProcess;
var _process = {
  /**
   * manually unroll unenv-polyfilled-symbols to make it tree-shakeable
   */
  // @ts-expect-error (not typed)
  _debugEnd,
  _debugProcess,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _linkedBinding,
  _maxListeners,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert: assert3,
  availableMemory,
  binding,
  chdir,
  config,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  domain,
  emit,
  emitWarning,
  eventNames,
  execArgv,
  execPath,
  exit: exit2,
  exitCode,
  features,
  getActiveResourcesInfo,
  getMaxListeners,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  memoryUsage,
  moduleLoadList,
  off,
  on,
  once,
  openStdin,
  pid,
  platform: platform2,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  setUncaughtExceptionCaptureCallback,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  umask,
  uptime,
  version,
  versions,
  /**
   * manually unroll workerd-polyfilled-symbols to make it tree-shakeable
   */
  env: env2,
  getBuiltinModule: getBuiltinModule2,
  nextTick: nextTick2
};
var cloudflare_default2 = _process;

// node_modules/wrangler/_virtual_unenv_global_polyfill-process.js
globalThis.process = cloudflare_default2;

// .wrangler/tmp/pages-42zFXk/bundledWorker-0.45634601984402035.mjs
import { Writable as Writable2 } from "node:stream";
var __defProp2 = Object.defineProperty;
var __defNormalProp2 = /* @__PURE__ */ __name((obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value, "__defNormalProp");
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
var __publicField2 = /* @__PURE__ */ __name((obj, key, value) => {
  __defNormalProp2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
}, "__publicField");
globalThis.clearImmediate = clearImmediateFallback2;
function createNotImplementedError2(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError2, "createNotImplementedError");
__name2(createNotImplementedError2, "createNotImplementedError");
function notImplemented2(name) {
  const fn22 = /* @__PURE__ */ __name2(() => {
    throw createNotImplementedError2(name);
  }, "fn");
  return Object.assign(fn22, { __unenv__: true });
}
__name(notImplemented2, "notImplemented");
__name2(notImplemented2, "notImplemented");
var noop_default2 = Object.assign(() => {
}, { __unenv__: true });
var Immediate2 = /* @__PURE__ */ __name(class {
  _onImmediate;
  _timeout;
  constructor(callback, args) {
    this._onImmediate = callback;
    if ("setTimeout" in globalThis) {
      this._timeout = setTimeout(callback, 0, ...args);
    } else {
      callback(...args);
    }
  }
  ref() {
    this._timeout?.ref();
    return this;
  }
  unref() {
    this._timeout?.unref();
    return this;
  }
  hasRef() {
    return this._timeout?.hasRef() ?? false;
  }
  [Symbol.dispose]() {
    if ("clearTimeout" in globalThis) {
      clearTimeout(this._timeout);
    }
  }
}, "Immediate");
__name2(Immediate2, "Immediate");
function setImmediateFallbackPromises2(value) {
  return new Promise((res) => {
    res(value);
  });
}
__name(setImmediateFallbackPromises2, "setImmediateFallbackPromises");
__name2(setImmediateFallbackPromises2, "setImmediateFallbackPromises");
function setImmediateFallback2(callback, ...args) {
  return new Immediate2(callback, args);
}
__name(setImmediateFallback2, "setImmediateFallback");
__name2(setImmediateFallback2, "setImmediateFallback");
setImmediateFallback2.__promisify__ = setImmediateFallbackPromises2;
function clearImmediateFallback2(immediate) {
  immediate?.[Symbol.dispose]();
}
__name(clearImmediateFallback2, "clearImmediateFallback");
__name2(clearImmediateFallback2, "clearImmediateFallback");
globalThis.setImmediate = setImmediateFallback2;
var fn2 = /* @__PURE__ */ __name2(function() {
}, "fn");
function createMock2(name, overrides = {}) {
  fn2.prototype.name = name;
  const props = {};
  return new Proxy(fn2, {
    get(_target, prop) {
      if (prop === "caller") {
        return null;
      }
      if (prop === "__createMock__") {
        return createMock2;
      }
      if (prop === "__unenv__") {
        return true;
      }
      if (prop in overrides) {
        return overrides[prop];
      }
      return props[prop] = props[prop] || createMock2(`${name}.${prop.toString()}`);
    },
    apply(_target, _this, _args) {
      return createMock2(`${name}()`);
    },
    construct(_target, _args, _newT) {
      return createMock2(`[${name}]`);
    },
    // @ts-ignore (ES6-only - removed in ES7)
    // https://github.com/tc39/ecma262/issues/161
    enumerate() {
      return [];
    }
  });
}
__name(createMock2, "createMock");
__name2(createMock2, "createMock");
var proxy_default2 = createMock2("mock");
var _console2 = globalThis.console;
var _ignoreErrors2 = true;
var _stderr2 = new Writable2();
var _stdout2 = new Writable2();
var log3 = _console2?.log ?? noop_default2;
var info3 = _console2?.info ?? log3;
var trace3 = _console2?.trace ?? info3;
var debug3 = _console2?.debug ?? log3;
var table3 = _console2?.table ?? log3;
var error3 = _console2?.error ?? log3;
var warn3 = _console2?.warn ?? error3;
var createTask3 = _console2?.createTask ?? notImplemented2("console.createTask");
var assert4 = notImplemented2("console.assert");
var clear3 = _console2?.clear ?? noop_default2;
var count3 = _console2?.count ?? noop_default2;
var countReset3 = _console2?.countReset ?? noop_default2;
var dir3 = _console2?.dir ?? noop_default2;
var dirxml3 = _console2?.dirxml ?? noop_default2;
var group3 = _console2?.group ?? noop_default2;
var groupEnd3 = _console2?.groupEnd ?? noop_default2;
var groupCollapsed3 = _console2?.groupCollapsed ?? noop_default2;
var profile3 = _console2?.profile ?? noop_default2;
var profileEnd3 = _console2?.profileEnd ?? noop_default2;
var time3 = _console2?.time ?? noop_default2;
var timeEnd3 = _console2?.timeEnd ?? noop_default2;
var timeLog3 = _console2?.timeLog ?? noop_default2;
var timeStamp3 = _console2?.timeStamp ?? noop_default2;
var Console2 = _console2?.Console ?? proxy_default2.__createMock__("console.Console");
var workerdConsole2 = globalThis["console"];
var {
  assert: assert22,
  clear: clear22,
  // @ts-expect-error undocumented public API
  context: context2,
  count: count22,
  countReset: countReset22,
  // @ts-expect-error undocumented public API
  createTask: createTask22,
  debug: debug22,
  dir: dir22,
  dirxml: dirxml22,
  error: error22,
  group: group22,
  groupCollapsed: groupCollapsed22,
  groupEnd: groupEnd22,
  info: info22,
  log: log22,
  profile: profile22,
  profileEnd: profileEnd22,
  table: table22,
  time: time22,
  timeEnd: timeEnd22,
  timeLog: timeLog22,
  timeStamp: timeStamp22,
  trace: trace22,
  warn: warn22
} = workerdConsole2;
Object.assign(workerdConsole2, {
  Console: Console2,
  _ignoreErrors: _ignoreErrors2,
  _stderr: _stderr2,
  _stderrErrorHandler: noop_default2,
  _stdout: _stdout2,
  _stdoutErrorHandler: noop_default2,
  _times: proxy_default2
});
var cloudflare_default3 = workerdConsole2;
globalThis.console = cloudflare_default3;
var _supportedEntryTypes2 = [
  "event",
  // PerformanceEntry
  "mark",
  // PerformanceMark
  "measure",
  // PerformanceMeasure
  "resource"
  // PerformanceResourceTiming
];
var _PerformanceEntry2 = /* @__PURE__ */ __name(class {
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || performance.now();
    this.detail = options?.detail;
  }
  get duration() {
    return performance.now() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
}, "_PerformanceEntry");
__name2(_PerformanceEntry2, "_PerformanceEntry");
var PerformanceEntry2 = globalThis.PerformanceEntry || _PerformanceEntry2;
var _PerformanceMark2 = /* @__PURE__ */ __name(class extends _PerformanceEntry2 {
  entryType = "mark";
}, "_PerformanceMark");
__name2(_PerformanceMark2, "_PerformanceMark");
var PerformanceMark2 = globalThis.PerformanceMark || _PerformanceMark2;
var _PerformanceMeasure2 = /* @__PURE__ */ __name(class extends _PerformanceEntry2 {
  entryType = "measure";
}, "_PerformanceMeasure");
__name2(_PerformanceMeasure2, "_PerformanceMeasure");
var PerformanceMeasure2 = globalThis.PerformanceMeasure || _PerformanceMeasure2;
var _PerformanceResourceTiming2 = /* @__PURE__ */ __name(class extends _PerformanceEntry2 {
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
}, "_PerformanceResourceTiming");
__name2(_PerformanceResourceTiming2, "_PerformanceResourceTiming");
var PerformanceResourceTiming2 = globalThis.PerformanceResourceTiming || _PerformanceResourceTiming2;
var _timeOrigin2 = Date.now();
var _Performance2 = /* @__PURE__ */ __name(class {
  __unenv__ = true;
  timeOrigin = _timeOrigin2;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = proxy_default2.__createMock__("PerformanceNavigation");
  timing = proxy_default2.__createMock__("PerformanceTiming");
  onresourcetimingbufferfull = null;
  now() {
    if (globalThis?.performance?.now && this.timeOrigin === _timeOrigin2) {
      return globalThis.performance.now();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter(
      (e) => e.entryType !== "resource" || e.entryType !== "navigation"
    );
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter(
      (e) => e.name === name && (!type || e.entryType === type)
    );
  }
  getEntriesByType(type) {
    return this._entries.filter(
      (e) => e.entryType === type
    );
  }
  mark(name, options) {
    const entry = new _PerformanceMark2(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || performance22.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || performance22.now();
    }
    const entry = new _PerformanceMeasure2(measureName, {
      startTime: start,
      detail: { start, end }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  toJSON() {
    return this;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError2("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError2("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError2("Performance.dispatchEvent");
  }
}, "_Performance");
__name2(_Performance2, "_Performance");
var Performance2 = globalThis.Performance || _Performance2;
var performance22 = globalThis.performance || new Performance2();
var _PerformanceObserver2 = /* @__PURE__ */ __name(class {
  __unenv__ = true;
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError2("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError2("PerformanceObserver.observe");
  }
}, "_PerformanceObserver");
__name2(_PerformanceObserver2, "_PerformanceObserver");
__publicField2(_PerformanceObserver2, "supportedEntryTypes", _supportedEntryTypes2);
var PerformanceObserver2 = globalThis.PerformanceObserver || _PerformanceObserver2;
var _PerformanceObserverEntryList2 = /* @__PURE__ */ __name(class {
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
}, "_PerformanceObserverEntryList");
__name2(_PerformanceObserverEntryList2, "_PerformanceObserverEntryList");
var PerformanceObserverEntryList2 = globalThis.PerformanceObserverEntryList || _PerformanceObserverEntryList2;
function getGlobal2() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  return {};
}
__name(getGlobal2, "getGlobal");
__name2(getGlobal2, "getGlobal");
var global_this_default2 = getGlobal2();
global_this_default2.performance = global_this_default2.performance || performance22;
global_this_default2.Performance = global_this_default2.Performance || Performance2;
global_this_default2.PerformanceEntry = global_this_default2.PerformanceEntry || PerformanceEntry2;
global_this_default2.PerformanceMark = global_this_default2.PerformanceMark || PerformanceMark2;
global_this_default2.PerformanceMeasure = global_this_default2.PerformanceMeasure || PerformanceMeasure2;
global_this_default2.PerformanceObserver = global_this_default2.PerformanceObserver || PerformanceObserver2;
global_this_default2.PerformanceObserverEntryList = global_this_default2.PerformanceObserverEntryList || PerformanceObserverEntryList2;
global_this_default2.PerformanceResourceTiming = global_this_default2.PerformanceResourceTiming || PerformanceResourceTiming2;
var performance_default2 = global_this_default2.performance;
globalThis.performance = performance_default2;
var empty_default2 = Object.freeze(
  Object.create(null, {
    __unenv__: { get: () => true }
  })
);
var _envShim2 = /* @__PURE__ */ Object.create(null);
var _processEnv2 = globalThis.process?.env;
var _getEnv2 = /* @__PURE__ */ __name2((useShim) => _processEnv2 || globalThis.__env__ || (useShim ? _envShim2 : globalThis), "_getEnv");
var env3 = new Proxy(_envShim2, {
  get(_, prop) {
    const env222 = _getEnv2();
    return env222[prop] ?? _envShim2[prop];
  },
  has(_, prop) {
    const env222 = _getEnv2();
    return prop in env222 || prop in _envShim2;
  },
  set(_, prop, value) {
    const env222 = _getEnv2(true);
    env222[prop] = value;
    return true;
  },
  deleteProperty(_, prop) {
    const env222 = _getEnv2(true);
    delete env222[prop];
    return true;
  },
  ownKeys() {
    const env222 = _getEnv2();
    return Object.keys(env222);
  }
});
var hrtime3 = Object.assign(
  /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function hrtime22(startTime) {
    const now = Date.now();
    const seconds = Math.trunc(now / 1e3);
    const nanos = now % 1e3 * 1e6;
    if (startTime) {
      let diffSeconds = seconds - startTime[0];
      let diffNanos = nanos - startTime[0];
      if (diffNanos < 0) {
        diffSeconds = diffSeconds - 1;
        diffNanos = 1e9 + diffNanos;
      }
      return [diffSeconds, diffNanos];
    }
    return [seconds, nanos];
  }, "hrtime2"), "hrtime2"),
  {
    bigint: /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function bigint2() {
      return BigInt(Date.now() * 1e6);
    }, "bigint"), "bigint")
  }
);
var nextTick3 = globalThis.queueMicrotask ? (cb, ...args) => {
  globalThis.queueMicrotask(cb.bind(void 0, ...args));
} : _createNextTickWithTimeout2();
function _createNextTickWithTimeout2() {
  let queue = [];
  let draining = false;
  let currentQueue;
  let queueIndex = -1;
  function cleanUpNextTick() {
    if (!draining || !currentQueue) {
      return;
    }
    draining = false;
    if (currentQueue.length > 0) {
      queue = [...currentQueue, ...queue];
    } else {
      queueIndex = -1;
    }
    if (queue.length > 0) {
      drainQueue();
    }
  }
  __name(cleanUpNextTick, "cleanUpNextTick");
  __name2(cleanUpNextTick, "cleanUpNextTick");
  function drainQueue() {
    if (draining) {
      return;
    }
    const timeout = setTimeout(cleanUpNextTick);
    draining = true;
    let len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      while (++queueIndex < len) {
        if (currentQueue) {
          currentQueue[queueIndex]();
        }
      }
      queueIndex = -1;
      len = queue.length;
    }
    currentQueue = void 0;
    draining = false;
    clearTimeout(timeout);
  }
  __name(drainQueue, "drainQueue");
  __name2(drainQueue, "drainQueue");
  const nextTick222 = /* @__PURE__ */ __name2((cb, ...args) => {
    queue.push(cb.bind(void 0, ...args));
    if (queue.length === 1 && !draining) {
      setTimeout(drainQueue);
    }
  }, "nextTick2");
  return nextTick222;
}
__name(_createNextTickWithTimeout2, "_createNextTickWithTimeout");
__name2(_createNextTickWithTimeout2, "_createNextTickWithTimeout");
var title2 = "unenv";
var argv2 = [];
var version2 = "";
var versions2 = {
  ares: "",
  http_parser: "",
  icu: "",
  modules: "",
  node: "",
  openssl: "",
  uv: "",
  v8: "",
  zlib: ""
};
function noop2() {
  return process2;
}
__name(noop2, "noop");
__name2(noop2, "noop");
var on2 = noop2;
var addListener2 = noop2;
var once2 = noop2;
var off2 = noop2;
var removeListener2 = noop2;
var removeAllListeners2 = noop2;
var emit3 = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function emit22(event) {
  if (event === "message" || event === "multipleResolves") {
    return process2;
  }
  return false;
}, "emit2"), "emit2");
var prependListener2 = noop2;
var prependOnceListener2 = noop2;
var listeners2 = /* @__PURE__ */ __name2(function(name) {
  return [];
}, "listeners");
var listenerCount2 = /* @__PURE__ */ __name2(() => 0, "listenerCount");
var binding2 = /* @__PURE__ */ __name2(function(name) {
  throw new Error("[unenv] process.binding is not supported");
}, "binding");
var _cwd2 = "/";
var cwd3 = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function cwd22() {
  return _cwd2;
}, "cwd2"), "cwd2");
var chdir3 = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function chdir22(dir32) {
  _cwd2 = dir32;
}, "chdir2"), "chdir2");
var umask3 = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function umask22() {
  return 0;
}, "umask2"), "umask2");
var getegid3 = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function getegid22() {
  return 1e3;
}, "getegid2"), "getegid2");
var geteuid3 = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function geteuid22() {
  return 1e3;
}, "geteuid2"), "geteuid2");
var getgid3 = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function getgid22() {
  return 1e3;
}, "getgid2"), "getgid2");
var getuid3 = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function getuid22() {
  return 1e3;
}, "getuid2"), "getuid2");
var getgroups3 = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function getgroups22() {
  return [];
}, "getgroups2"), "getgroups2");
var getBuiltinModule3 = /* @__PURE__ */ __name2((_name) => void 0, "getBuiltinModule");
var abort2 = notImplemented2("process.abort");
var allowedNodeEnvironmentFlags2 = /* @__PURE__ */ new Set();
var arch2 = "";
var argv02 = "";
var config2 = empty_default2;
var connected2 = false;
var constrainedMemory2 = /* @__PURE__ */ __name2(() => 0, "constrainedMemory");
var availableMemory2 = /* @__PURE__ */ __name2(() => 0, "availableMemory");
var cpuUsage2 = notImplemented2("process.cpuUsage");
var debugPort2 = 0;
var dlopen2 = notImplemented2("process.dlopen");
var disconnect2 = noop2;
var emitWarning2 = noop2;
var eventNames2 = notImplemented2("process.eventNames");
var execArgv2 = [];
var execPath2 = "";
var exit3 = notImplemented2("process.exit");
var features2 = /* @__PURE__ */ Object.create({
  inspector: void 0,
  debug: void 0,
  uv: void 0,
  ipv6: void 0,
  tls_alpn: void 0,
  tls_sni: void 0,
  tls_ocsp: void 0,
  tls: void 0,
  cached_builtins: void 0
});
var getActiveResourcesInfo2 = /* @__PURE__ */ __name2(() => [], "getActiveResourcesInfo");
var getMaxListeners2 = notImplemented2(
  "process.getMaxListeners"
);
var kill2 = notImplemented2("process.kill");
var memoryUsage2 = Object.assign(
  () => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }),
  { rss: () => 0 }
);
var pid2 = 1e3;
var platform3 = "";
var ppid2 = 1e3;
var rawListeners2 = notImplemented2(
  "process.rawListeners"
);
var release2 = /* @__PURE__ */ Object.create({
  name: "",
  lts: "",
  sourceUrl: void 0,
  headersUrl: void 0
});
var report2 = /* @__PURE__ */ Object.create({
  compact: void 0,
  directory: void 0,
  filename: void 0,
  getReport: notImplemented2("process.report.getReport"),
  reportOnFatalError: void 0,
  reportOnSignal: void 0,
  reportOnUncaughtException: void 0,
  signal: void 0,
  writeReport: notImplemented2("process.report.writeReport")
});
var resourceUsage2 = notImplemented2(
  "process.resourceUsage"
);
var setegid2 = notImplemented2("process.setegid");
var seteuid2 = notImplemented2("process.seteuid");
var setgid2 = notImplemented2("process.setgid");
var setgroups2 = notImplemented2("process.setgroups");
var setuid2 = notImplemented2("process.setuid");
var setMaxListeners2 = notImplemented2(
  "process.setMaxListeners"
);
var setSourceMapsEnabled2 = notImplemented2("process.setSourceMapsEnabled");
var stdout2 = proxy_default2.__createMock__("process.stdout");
var stderr2 = proxy_default2.__createMock__("process.stderr");
var stdin2 = proxy_default2.__createMock__("process.stdin");
var traceDeprecation2 = false;
var uptime2 = /* @__PURE__ */ __name2(() => 0, "uptime");
var exitCode2 = 0;
var setUncaughtExceptionCaptureCallback2 = notImplemented2("process.setUncaughtExceptionCaptureCallback");
var hasUncaughtExceptionCaptureCallback2 = /* @__PURE__ */ __name2(() => false, "hasUncaughtExceptionCaptureCallback");
var sourceMapsEnabled2 = false;
var loadEnvFile2 = notImplemented2(
  "process.loadEnvFile"
);
var mainModule2 = void 0;
var permission2 = {
  has: () => false
};
var channel2 = {
  ref() {
  },
  unref() {
  }
};
var throwDeprecation2 = false;
var finalization2 = {
  register() {
  },
  unregister() {
  },
  registerBeforeExit() {
  }
};
var assert32 = notImplemented2("process.assert");
var openStdin2 = notImplemented2("process.openStdin");
var _debugEnd2 = notImplemented2("process._debugEnd");
var _debugProcess2 = notImplemented2("process._debugProcess");
var _fatalException2 = notImplemented2("process._fatalException");
var _getActiveHandles2 = notImplemented2("process._getActiveHandles");
var _getActiveRequests2 = notImplemented2("process._getActiveRequests");
var _kill2 = notImplemented2("process._kill");
var _preload_modules2 = [];
var _rawDebug2 = notImplemented2("process._rawDebug");
var _startProfilerIdleNotifier2 = notImplemented2(
  "process._startProfilerIdleNotifier"
);
var _stopProfilerIdleNotifier2 = notImplemented2(
  "process.__stopProfilerIdleNotifier"
);
var _tickCallback2 = notImplemented2("process._tickCallback");
var _linkedBinding2 = notImplemented2("process._linkedBinding");
var domain2 = void 0;
var initgroups2 = notImplemented2("process.initgroups");
var moduleLoadList2 = [];
var reallyExit2 = noop2;
var _exiting2 = false;
var _events2 = [];
var _eventsCount2 = 0;
var _maxListeners2 = 0;
var process2 = {
  // @ts-expect-error
  _events: _events2,
  _eventsCount: _eventsCount2,
  _exiting: _exiting2,
  _maxListeners: _maxListeners2,
  _debugEnd: _debugEnd2,
  _debugProcess: _debugProcess2,
  _fatalException: _fatalException2,
  _getActiveHandles: _getActiveHandles2,
  _getActiveRequests: _getActiveRequests2,
  _kill: _kill2,
  _preload_modules: _preload_modules2,
  _rawDebug: _rawDebug2,
  _startProfilerIdleNotifier: _startProfilerIdleNotifier2,
  _stopProfilerIdleNotifier: _stopProfilerIdleNotifier2,
  _tickCallback: _tickCallback2,
  domain: domain2,
  initgroups: initgroups2,
  moduleLoadList: moduleLoadList2,
  reallyExit: reallyExit2,
  exitCode: exitCode2,
  abort: abort2,
  addListener: addListener2,
  allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags2,
  hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback2,
  setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback2,
  loadEnvFile: loadEnvFile2,
  sourceMapsEnabled: sourceMapsEnabled2,
  throwDeprecation: throwDeprecation2,
  mainModule: mainModule2,
  permission: permission2,
  channel: channel2,
  arch: arch2,
  argv: argv2,
  argv0: argv02,
  assert: assert32,
  binding: binding2,
  chdir: chdir3,
  config: config2,
  connected: connected2,
  constrainedMemory: constrainedMemory2,
  availableMemory: availableMemory2,
  cpuUsage: cpuUsage2,
  cwd: cwd3,
  debugPort: debugPort2,
  dlopen: dlopen2,
  disconnect: disconnect2,
  emit: emit3,
  emitWarning: emitWarning2,
  env: env3,
  eventNames: eventNames2,
  execArgv: execArgv2,
  execPath: execPath2,
  exit: exit3,
  finalization: finalization2,
  features: features2,
  getBuiltinModule: getBuiltinModule3,
  getegid: getegid3,
  geteuid: geteuid3,
  getgid: getgid3,
  getgroups: getgroups3,
  getuid: getuid3,
  getActiveResourcesInfo: getActiveResourcesInfo2,
  getMaxListeners: getMaxListeners2,
  hrtime: hrtime3,
  kill: kill2,
  listeners: listeners2,
  listenerCount: listenerCount2,
  memoryUsage: memoryUsage2,
  nextTick: nextTick3,
  on: on2,
  off: off2,
  once: once2,
  openStdin: openStdin2,
  pid: pid2,
  platform: platform3,
  ppid: ppid2,
  prependListener: prependListener2,
  prependOnceListener: prependOnceListener2,
  rawListeners: rawListeners2,
  release: release2,
  removeAllListeners: removeAllListeners2,
  removeListener: removeListener2,
  report: report2,
  resourceUsage: resourceUsage2,
  setegid: setegid2,
  seteuid: seteuid2,
  setgid: setgid2,
  setgroups: setgroups2,
  setuid: setuid2,
  setMaxListeners: setMaxListeners2,
  setSourceMapsEnabled: setSourceMapsEnabled2,
  stderr: stderr2,
  stdin: stdin2,
  stdout: stdout2,
  title: title2,
  traceDeprecation: traceDeprecation2,
  umask: umask3,
  uptime: uptime2,
  version: version2,
  versions: versions2
};
var unpatchedGlobalThisProcess2 = globalThis["process"];
var getBuiltinModule22 = unpatchedGlobalThisProcess2.getBuiltinModule;
var workerdProcess2 = getBuiltinModule22("node:process");
var { env: env22, exit: exit22, nextTick: nextTick22, platform: platform22 } = workerdProcess2;
var _process2 = {
  /**
   * manually unroll unenv-polyfilled-symbols to make it tree-shakeable
   */
  // @ts-expect-error (not typed)
  _debugEnd: _debugEnd2,
  _debugProcess: _debugProcess2,
  _events: _events2,
  _eventsCount: _eventsCount2,
  _exiting: _exiting2,
  _fatalException: _fatalException2,
  _getActiveHandles: _getActiveHandles2,
  _getActiveRequests: _getActiveRequests2,
  _kill: _kill2,
  _linkedBinding: _linkedBinding2,
  _maxListeners: _maxListeners2,
  _preload_modules: _preload_modules2,
  _rawDebug: _rawDebug2,
  _startProfilerIdleNotifier: _startProfilerIdleNotifier2,
  _stopProfilerIdleNotifier: _stopProfilerIdleNotifier2,
  _tickCallback: _tickCallback2,
  abort: abort2,
  addListener: addListener2,
  allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags2,
  arch: arch2,
  argv: argv2,
  argv0: argv02,
  assert: assert32,
  availableMemory: availableMemory2,
  binding: binding2,
  chdir: chdir3,
  config: config2,
  constrainedMemory: constrainedMemory2,
  cpuUsage: cpuUsage2,
  cwd: cwd3,
  debugPort: debugPort2,
  dlopen: dlopen2,
  domain: domain2,
  emit: emit3,
  emitWarning: emitWarning2,
  eventNames: eventNames2,
  execArgv: execArgv2,
  execPath: execPath2,
  exit: exit22,
  exitCode: exitCode2,
  features: features2,
  getActiveResourcesInfo: getActiveResourcesInfo2,
  getMaxListeners: getMaxListeners2,
  getegid: getegid3,
  geteuid: geteuid3,
  getgid: getgid3,
  getgroups: getgroups3,
  getuid: getuid3,
  hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback2,
  hrtime: hrtime3,
  initgroups: initgroups2,
  kill: kill2,
  listenerCount: listenerCount2,
  listeners: listeners2,
  loadEnvFile: loadEnvFile2,
  memoryUsage: memoryUsage2,
  moduleLoadList: moduleLoadList2,
  off: off2,
  on: on2,
  once: once2,
  openStdin: openStdin2,
  pid: pid2,
  platform: platform22,
  ppid: ppid2,
  prependListener: prependListener2,
  prependOnceListener: prependOnceListener2,
  rawListeners: rawListeners2,
  reallyExit: reallyExit2,
  release: release2,
  removeAllListeners: removeAllListeners2,
  removeListener: removeListener2,
  report: report2,
  resourceUsage: resourceUsage2,
  setMaxListeners: setMaxListeners2,
  setSourceMapsEnabled: setSourceMapsEnabled2,
  setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback2,
  setegid: setegid2,
  seteuid: seteuid2,
  setgid: setgid2,
  setgroups: setgroups2,
  setuid: setuid2,
  sourceMapsEnabled: sourceMapsEnabled2,
  stderr: stderr2,
  stdin: stdin2,
  stdout: stdout2,
  title: title2,
  umask: umask3,
  uptime: uptime2,
  version: version2,
  versions: versions2,
  /**
   * manually unroll workerd-polyfilled-symbols to make it tree-shakeable
   */
  env: env22,
  getBuiltinModule: getBuiltinModule22,
  nextTick: nextTick22
};
var cloudflare_default22 = _process2;
globalThis.process = cloudflare_default22;
var o = /* @__PURE__ */ __name2(async (t, r) => {
  switch (r.from) {
    case "buffer": {
      if (r.to === "blob")
        return new Blob([t]);
      if (r.to === "base64") {
        const f = new Uint8Array(t);
        let s = "";
        for (let n = 0; n < f.byteLength; n++)
          s += String.fromCharCode(f[n]);
        return btoa(s);
      }
      const e = new TextDecoder().decode(t);
      if (r.to === "text")
        return e;
      if (r.to === "json")
        return JSON.parse(e);
      break;
    }
    case "blob": {
      if (r.to === "base64") {
        const e = await t.arrayBuffer();
        return o(e, { from: "buffer", to: "base64" });
      }
      break;
    }
    case "stream": {
      if (r.to === "base64") {
        const e = await t.getReader().read();
        return o(e.value, {
          from: "buffer",
          to: "base64"
        });
      }
      break;
    }
    case "base64": {
      if (r.to === "buffer")
        return Uint8Array.from(atob(t), (e) => e.charCodeAt(0)).buffer;
      if (r.to === "blob") {
        const e = await o(t, {
          from: "base64",
          to: "buffer"
        });
        return new Blob([e]);
      }
      if (r.to === "stream") {
        const e = await o(t, {
          from: "base64",
          to: "buffer"
        }), { readable: f, writable: s } = new FixedLengthStream(e.byteLength), n = s.getWriter();
        return n.write(e), n.close(), f;
      }
      if (r.to === "url")
        return new URL(t);
      break;
    }
    case "url": {
      if (r.to === "text")
        return t.toString();
      break;
    }
    case "request": {
      if (r.to === "text") {
        const e = t;
        return JSON.stringify({
          url: e.url,
          method: e.method,
          headers: [...e.headers.entries()],
          body: await o(await e.arrayBuffer(), {
            from: "buffer",
            to: "base64"
          })
        });
      }
      break;
    }
    case "response": {
      if (r.to === "text") {
        const e = t;
        return JSON.stringify({
          status: e.status,
          statusText: e.statusText,
          headers: [...e.headers.entries()],
          body: await o(await e.arrayBuffer(), { from: "buffer", to: "base64" })
        });
      }
      break;
    }
    case "text": {
      if (r.to === "url")
        return new URL(t);
      if (r.to === "request") {
        const e = JSON.parse(t);
        return new Request(e.url, {
          method: e.method,
          headers: Object.fromEntries(e.headers),
          body: e.body ? await o(e.body, { from: "base64", to: "buffer" }) : void 0
        });
      }
      if (r.to === "response") {
        const e = JSON.parse(t);
        return new Response(
          e.body ? await o(e.body, { from: "base64", to: "buffer" }) : void 0,
          {
            status: e.status,
            statusText: e.statusText,
            headers: Object.fromEntries(e.headers)
          }
        );
      }
      break;
    }
  }
  return t;
}, "o");
var u = /* @__PURE__ */ __name2(async (t, r) => t instanceof ArrayBuffer ? {
  transform: { from: "base64", to: "buffer" },
  data: await o(t, { from: "buffer", to: "base64" })
} : t instanceof Blob ? {
  transform: { from: "base64", to: "blob" },
  data: await o(t, { from: "blob", to: "base64" })
} : t instanceof URL ? {
  transform: { from: "text", to: "url" },
  data: await o(t, { from: "url", to: "text" })
} : t instanceof Request ? {
  transform: { from: "text", to: "request" },
  data: await o(t, { from: "request", to: "text" })
} : t instanceof Response ? {
  transform: { from: "text", to: "response" },
  data: await o(t, { from: "response", to: "text" })
} : t !== null && typeof t == "object" && "getReader" in t && typeof t.getReader == "function" ? {
  transform: { from: "base64", to: "stream" },
  data: await o(t, { from: "stream", to: "base64" })
} : r, "u");
var y = /* @__PURE__ */ __name2(async (o2, u2) => u2.reduce(async (t, { prop: s, args: d }) => (await t)[s](
  ...await Promise.all(
    d.map(async (e) => Array.isArray(e.data) ? Promise.all(
      e.data.map((n) => "__bindingId" in n ? y(o2, n.__calls) : n)
    ) : e.transform ? o(e.data, e.transform) : e.data)
  )
), Promise.resolve(o2)), "y");
var w = {
  async fetch(o2, u2) {
    if (o2.method !== "POST")
      return new Response("Method not allowed", { status: 405 });
    try {
      const { __original_call: t, __proxyType: s, __bindingId: d, __calls: e } = await o2.json(), n = t ? t.__bindingId : d;
      let i;
      switch (s) {
        case "caches": {
          const f = caches;
          i = n === "default" ? f.default : await f.open(n);
          break;
        }
        case "binding": {
          i = u2[n];
          break;
        }
        default:
          throw new Error("Unknown proxy type");
      }
      const p = t ? await y(i, t.__calls) : i, a = await y(p, e), r = { success: true, data: a, functions: {} };
      if (r.success) {
        const f = await u(a, { data: a });
        if (r.transform = f.transform, r.data = f.data, a && typeof a == "object" && !Array.isArray(a) && ![Response, Request, URL].find((c) => a instanceof c)) {
          if ("arrayBuffer" in a && typeof a.arrayBuffer == "function") {
            const c = await a.arrayBuffer();
            r.functions.arrayBuffer = await u(c, {
              data: c
            });
          }
          "blob" in a && typeof a.blob == "function" && (r.functions.blob = {
            takeDataFrom: "arrayBuffer",
            transform: { from: "buffer", to: "blob" }
          }), "text" in a && typeof a.text == "function" && (r.functions.text = {
            takeDataFrom: "arrayBuffer",
            transform: { from: "buffer", to: "text" }
          }), "json" in a && typeof a.json == "function" && (r.functions.json = {
            takeDataFrom: "arrayBuffer",
            transform: { from: "buffer", to: "json" }
          }), "body" in a && typeof a.body == "object" && (r.functions.body = {
            takeDataFrom: "arrayBuffer",
            asAccessor: true
          });
        }
      }
      return new Response(JSON.stringify(r), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } catch (t) {
      console.error(t);
      const s = JSON.stringify({
        success: false,
        data: t instanceof Error ? t.message : "Failed to access binding"
      });
      return new Response(s, {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
};
var drainBody = /* @__PURE__ */ __name2(async (request, env32, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env32);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
__name2(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name2(async (request, env32, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env32);
  } catch (e) {
    const error32 = reduceError(e);
    return Response.json(error32, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = w;
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
__name2(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env32, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env32, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
__name2(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env32, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env32, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");
__name2(__facade_invoke__, "__facade_invoke__");
var __Facade_ScheduledController__ = /* @__PURE__ */ __name(class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
}, "__Facade_ScheduledController__");
__name2(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name2(function(request, env32, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env32, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env32, ctx) {
      const dispatcher = /* @__PURE__ */ __name2(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env32, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env32, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
__name2(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env32, ctx) => {
      this.env = env32;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
__name2(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody2 = /* @__PURE__ */ __name(async (request, env4, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env4);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default2 = drainBody2;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError2(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError2(e.cause)
  };
}
__name(reduceError2, "reduceError");
var jsonError2 = /* @__PURE__ */ __name(async (request, env4, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env4);
  } catch (e) {
    const error4 = reduceError2(e);
    return Response.json(error4, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default2 = jsonError2;

// .wrangler/tmp/bundle-Wn1mpb/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__2 = [
  middleware_ensure_req_body_drained_default2,
  middleware_miniflare3_json_error_default2
];
var middleware_insertion_facade_default2 = middleware_loader_entry_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__2 = [];
function __facade_register__2(...args) {
  __facade_middleware__2.push(...args.flat());
}
__name(__facade_register__2, "__facade_register__");
function __facade_invokeChain__2(request, env4, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__2(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env4, ctx, middlewareCtx);
}
__name(__facade_invokeChain__2, "__facade_invokeChain__");
function __facade_invoke__2(request, env4, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__2(request, env4, ctx, dispatch, [
    ...__facade_middleware__2,
    finalMiddleware
  ]);
}
__name(__facade_invoke__2, "__facade_invoke__");

// .wrangler/tmp/bundle-Wn1mpb/middleware-loader.entry.ts
var __Facade_ScheduledController__2 = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__2)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__2, "__Facade_ScheduledController__");
function wrapExportedHandler2(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env4, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env4, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env4, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__2(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env4, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__2(request, env4, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler2, "wrapExportedHandler");
function wrapWorkerEntrypoint2(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env4, ctx) => {
      this.env = env4;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__2(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__2(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint2, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY2;
if (typeof middleware_insertion_facade_default2 === "object") {
  WRAPPED_ENTRY2 = wrapExportedHandler2(middleware_insertion_facade_default2);
} else if (typeof middleware_insertion_facade_default2 === "function") {
  WRAPPED_ENTRY2 = wrapWorkerEntrypoint2(middleware_insertion_facade_default2);
}
var middleware_loader_entry_default2 = WRAPPED_ENTRY2;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__2 as __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default2 as default
};
//# sourceMappingURL=bundledWorker-0.45634601984402035.js.map
