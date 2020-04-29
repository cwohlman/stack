const { requestHandler } = require('./tool/requestHandler');
const serverHandler = require('./.build/server').default;
const clientHandler = require('express').static('.build/client');

// Important you have to run ./build first

const app = requestHandler(serverHandler(), clientHandler);

app.on('error', (error) => console.error(error.stack))

app.listen(3000);
