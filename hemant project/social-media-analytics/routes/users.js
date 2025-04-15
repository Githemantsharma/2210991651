const a = require('express');
const b = a.Router();
const c = require('../services/userService');

b.get('/', async (d, e) => {
    const f = d.headers.authorization?.split(' ')[1];

    try {
        const g = await c.i(f);
        e.status(200).json(g);
    } catch (h) {
        e.status(500).json({ error: h.message });
    }
});

module.exports = b;