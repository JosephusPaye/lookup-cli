import * as lookup from '@josephuspaye/lookup';
import { Lookup } from '@josephuspaye/lookup';
import k from 'kleur';

export async function lookupAction(
  word: string,
  opts: {
    include: string;
  }
) {
  console.log(`Looking up "${word}"...\n`);

  const related = [
    'soundsLike',
    'derivedForms',
    'seeAlso',
    'typeOf',
    'partOf',
    'antonyms',
  ] as const;

  let result: Lookup.DefinitionsResult;

  try {
    result = await lookup.definitions(word, {
      includeRelated:
        opts.include === 'all'
          ? related.slice()
          : (opts.include.split(',') as Lookup.Related[]),
    });
  } catch (err) {
    let message = `An error occurred: ${err.message}`;

    if (err.type === 'NOT_FOUND') {
      message = `Word "${word}" not found. Check the spelling and try again, or try a web search.`;
    } else if (err.type === 'EXTRACTION_FAILED') {
      message = `Unable to find definition for "${word}". Try again later.`;
    } else if (err.type === 'SOURCE_REQUEST_FAILED') {
      message = 'Unable to get definition from online source. Try again later.';
    }

    console.error(k.red(message));

    process.exit(1);
  }

  const sections: string[] = [];

  for (const meaning of result.meanings) {
    const forms =
      meaning.forms.length > 0 ? `(${meaning.forms.join(', ')})` : '';

    let usage = '';

    if (meaning.usage.length > 0) {
      usage = `Usage: ${meaning.usage.join(', ')}`;

      if (meaning.usageAlternative) {
        usage += ` (${meaning.usageAlternative.where}: ${meaning.usageAlternative.word})`;
      }
    }

    const heading =
      k
        .green()
        .bold(`${capitalize(meaning.partOfSpeech)}: ${meaning.word} ${forms}`) +
      (usage ? `\n${k.blue(usage)}` : '');

    const padding = meaning.definitions.length > 9 ? 2 : 1;
    const definitions: string[] = [];

    let i = 0;
    for (const definition of meaning.definitions) {
      const currentDefinition = [];

      const definitionText = `${String(i + 1).padStart(padding, ' ')}. ${
        meaning.definitions[i].definition
      }`;
      currentDefinition.push(definitionText);

      if (definition.examples.length > 0) {
        const examples =
          `${' '.repeat(padding)}  ` +
          definition.examples.map((d) => `"${d}"`).join('; ');

        currentDefinition.push(k.blue(examples));
      }

      if (definition.synonyms.length > 0) {
        const synonyms =
          `${' '.repeat(padding)}  - ` +
          definition.synonyms.map((s) => k.cyan(s)).join(', ');
        currentDefinition.push(synonyms);
      }

      definitions.push(currentDefinition.map((l) => `  ${l}`).join('\n'));

      i++;
    }

    sections.push([heading, ...definitions].join('\n\n'));
  }

  const labels = {
    soundsLike: 'Sounds like',
    derivedForms: 'Derived forms',
    seeAlso: 'See also',
    typeOf: 'Type of',
    partOf: 'Part of',
    antonyms: 'Antonyms',
  };

  for (const key of related) {
    if (result[key].length > 0) {
      sections.push(
        `${k.green().bold(labels[key])}: ${result[key].join(', ')}`
      );
    }
  }

  console.log(sections.join('\n\n'));
}

function capitalize(word: string) {
  return word[0].toUpperCase() + word.slice(1);
}
