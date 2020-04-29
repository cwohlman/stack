const http = require('http');
const Bundler = require('parcel-bundler');

async function start() {
  const clientBundler = new Bundler('client/index.html', { outDir: '.build/dev/client', outFile: 'index.html'});
  const serverBundler = new Bundler('server/index.ts', { outDir: '.build/dev', outFile: 'server.js', target: 'node' });

  await clientBundler.bundle();
  serverBundler.bundle();

  let listener = (req, res) => { res.end('Starting...') }

  serverBundler.on('bundled', function (bundle) {
    try {
      delete require.cache[bundle.name];
      listener = require(bundle.name).default(clientBundler.middleware());
    } catch (error) {
      console.error('Error starting app', error);
      listener = (req, res) => res.end(error.stack);
    }
  })

  http.createServer((req, res) => {
    return listener(req, res);
  }).listen(3000);

  console.log('Dev server listening on port 3000');
}

start().catch(error => console.error('error', error.stack));
