const a = require('express');
const b = a.Router();
const c = require('../services/postService');

b.get('/', async (d, e) => {
    const { f } = d.query;
    const g = d.headers.authorization?.split(' ')[1];

    try {
        if (f === 'popular') {
            const h = await c.u(g);
            e.status(200).json(h);
        } else if (f === 'latest') {
            const i = await c.ai(g);
            e.status(200).json(i);
        } else {
            e.status(400).json({ error: 'Invalid type parameter' });
        }
    } catch (j) {
        e.status(500).json({ error: j.message });
    }
});

module.exports = b;