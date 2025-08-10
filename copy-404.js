import { writeFileSync } from 'node:fs';

const content = `<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="refresh" content="0; url=./index.html" />
  </head>
  <body></body>
</html>`;

writeFileSync('dist/404.html', content);
console.log('404.html created in dist/');
