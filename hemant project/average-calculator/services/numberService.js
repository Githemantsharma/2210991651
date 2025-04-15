const a = 10;
let b = [];

const c = async (d, e) => {
    const f = {
        p: 'http://20.244.56.144/evaluation-service/primes',
        f: 'http://20.244.56.144/evaluation-service/fibo',
        e: 'http://20.244.56.144/evaluation-service/even',
        r: 'http://20.244.56.144/evaluation-service/rand',
    };

    if (!f[d]) {
        throw new Error('Invalid number type');
    }
    const g = await fetch(f[d], {
        headers: {
            Authorization: `Bearer ${e}`,
        },
    });
    const h = await g.text();
    const i = JSON.parse(h);
    return i.numbers;
};

const j = async (k, l) => {
    const m = await c(k, l);

    const n = m.filter((o) => !b.includes(o));

    const p = [...b];

    n.forEach((q) => {
        if (b.length >= a) {
            b.shift();
        }
        b.push(q);
    });

    const r =
        b.length > 0
            ? b.reduce((s, t) => s + t, 0) / b.length
            : 0;

    return {
        windowPrevState: p,
        windowCurrState: [...b],
        numbers: m,
        avg: parseFloat(r.toFixed(2)),
    };
};

module.exports = { j };