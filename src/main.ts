#!/usr/bin/env node

import sade from 'sade';
import { lookupAction } from './lookup';

const pkg = require('../package.json');

const prog = sade('lookup <word>')
  .version(pkg.version)
  .describe('Find definitions, synonyms, and related words for the given word.')
  .option(
    '-i, --include',
    'Include related words: one or more of `soundsLike`, `derivedForms`, `seeAlso`, `typeOf`, `partOf`, or `antonyms`, separated by a comma, or `all`',
    'derivedForms,seeAlso,antonyms'
  )
  .example('flag')
  .example('flag -i derivedForms,seeAlso,antonyms')
  .action(lookupAction);

prog.parse(process.argv);
