const {readFileSync} = require('fs');
const {resolve} = require('path');

try {
  const fi: string = (
    readFileSync(resolve(process.argv[2]), 'utf-8', '.properties')
      .split('\n')
      .reduce((collector: {[x: string]: string}, curr: string) => ({
        [/.*?=/gm.exec(curr)[0].slice(0, -1)]: /.*?=\s*(.*)/gm.exec(curr)[1],
        ...collector,
      }), {})
  );
  console.log('\x1b[32m%s\x1b[0m', 'SUCCESS');
  console.log(JSON.stringify(fi, null, 2));
} catch ({message}) {
  console.error('\x1b[33m%s\x1b[0m', 'ERROR: Something wen\'t wrong.');
  if (message.match(/Cannot read property '0' of null/gm)) {
    console.error('Couldn\'t parse .properties file. This usually means a syntax error has occurred.');
  }
  if (message.match(/ENOENT: no such file or directory/gm)) {
    console.error('Couldn\'t identify .properties file via path specified. This usually means the file doesn\'t exist.');
  } else {
    console.log(message);
  }
}
