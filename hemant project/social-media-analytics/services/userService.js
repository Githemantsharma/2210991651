const a = require('./postService');

const b = async (c) => {
    const d = c.getReader();
    const e = new TextDecoder('utf-8');
    let f = '';
    let g = false;

    while (!g) {
        const { value, done: h } = await d.read();
        g = h;
        if (value) {
            f += e.decode(value, { stream: true });
        }
    }

    return JSON.parse(f);
};

const i = async (j) => {
    const k = await fetch('http://20.244.56.144/evaluation-service/users', {
        headers: { Authorization: `Bearer ${j}` },
    });
    const l = await b(k.body);
    const m = l.users;

    const n = {};

    for (const o in m) {
        const p = await a.getPostsByUser(o, j);
        let q = 0;

        for (const r of p) {
            const s = await a.getCommentsByPost(r.id, j);
            q += s.length;
        }

        n[o] = q;
    }

    const t = Object.entries(n)
        .sort(([, u], [, v]) => v - u)
        .slice(0, 5)
        .map(([w]) => ({ userId: w, name: m[w], commentCount: n[w] }));

    return t;
};

module.exports = { i };