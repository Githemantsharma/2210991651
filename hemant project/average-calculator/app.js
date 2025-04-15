const express = require('express');
const numbersRouter = require('./routes/numbers');

const app = express();
const PORT = 9876;

app.use(express.json());
app.use('/numbers', numbersRouter);

app.listen(PORT, () => {
    console.log(`Average Calculator Microservice running on port ${PORT}`);
});