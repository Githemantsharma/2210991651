const a = require('express');
const b = require('./routes/users');
const c = require('./routes/posts');

const d = a();
const e = 9877;

d.use(a.json());
d.use('/users', b);
d.use('/posts', c);

d.listen(e, () => {
    console.log(`Social Media Analytics Microservice running on port ${e}`);
});