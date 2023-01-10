export const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (b) => f(a, b);

export const map = curry((mapper, iter) => {
  const res = [];
  for (const a of iter) res.push(mapper(a));

  return res;
});

export const filter = curry((predicate, iter) => {
  const res = [];

  for (const a of iter) if (predicate(a)) res.push(a);

  return res;
});

export const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const a of iter) {
    acc = f(acc, a);
  }

  return acc;
});

export const go = (...args) => reduce((a, f) => f(a), args);

export const pipe =
  (f, ...fs) =>
  (...as) =>
    go(f(...as), ...fs);
