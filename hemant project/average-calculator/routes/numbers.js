const a = require('express');
const b = a.Router();
const c = require('../services/numberService');

b.get('/:d', async (e, f) => {
    const { d } = e.params;
    const g = e.headers.authorization?.split(' ')[1];

    try {
        const h = await c.j(d, g);
        f.status(200).json(h);
    } catch (i) {
        f.status(500).json({ error: i.message });
    }
});

module.exports = b;