const Bundler = require('parcel-bundler');

async function build() {
  const clientBundler = new Bundler('client/index.html', { watch: false, minify: true, outDir: '.build/client', outFile: 'index.html'});
  const serverBundler = new Bundler('server/index.ts', { watch: false, minify: true, outDir: '.build', outFile: 'server.js', target: 'node' });

  await clientBundler.bundle();
  await serverBundler.bundle();
}

build().catch(error => console.error('error', error.stack));