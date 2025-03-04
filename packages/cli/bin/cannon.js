#!/usr/bin/env node

const { red } = require('chalk');
const cli = require('../dist/src');

cli.default
  .parseAsync()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    if (err.message && process.env.TRACE !== 'true') {
      err.message = red(err.message);
      console.error(err);
    } else {
      console.error(err);
    }
    process.exit(1);
  });
