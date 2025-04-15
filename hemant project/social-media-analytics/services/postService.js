let a = null;

const b = (c) => {
    a = c;
};

const d = async (e) => {
    const f = e.getReader();
    const g = new TextDecoder('utf-8');
    let h = '';
    let i = false;

    while (!i) {
        const { value, done: j } = await f.read();
        i = j;
        if (value) {
            h += g.decode(value, { stream: true });
        }
    }

    return JSON.parse(h);
};

const k = async (l, m) => {
    const n = await fetch(`http://20.244.56.144/evaluation-service/users/${l}/posts`, {
        headers: { Authorization: `Bearer ${m}` },
    });
    const o = await d(n.body);
    return o.posts;
};

const p = async (q, r) => {
    const s = await fetch(`http://20.244.56.144/evaluation-service/posts/${q}/comments`, {
        headers: { Authorization: `Bearer ${r}` },
    });
    const t = await d(s.body);
    return t.comments;
};

const u = async (v) => {
    const w = await fetch('http://20.244.56.144/evaluation-service/users', {
        headers: { Authorization: `Bearer ${v}` },
    });
    const x = await d(w.body);
    const y = x.users;

    const z = {};

    for (const aa in y) {
        const ab = await k(aa, v);

        for (const ac of ab) {
            const ad = await p(ac.id, v);
            z[ac.id] = ad.length;
        }
    }

    const ae = Math.max(...Object.values(z));
    const af = Object.entries(z)
        .filter(([, ag]) => ag === ae)
        .map(([ah]) => ({ postId: ah, commentCount: ae }));

    return af;
};

const ai = async (aj) => {
    const ak = await fetch('http://20.244.56.144/evaluation-service/users', {
        headers: { Authorization: `Bearer ${aj}` },
    });
    const al = await d(ak.body);
    const am = al.users;

    const an = [];

    for (const ao in am) {
        const ap = await k(ao, aj);
        an.push(...ap);
    }

    const aq = an.sort((ar, as) => as.id - ar.id).slice(0, 5);
    return aq;
};

module.exports = { k, p, u, ai, b };