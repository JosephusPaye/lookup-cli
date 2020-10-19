# Lookup CLI

📖 Look up definitions, synonyms, and related words from online sources on the command line. The current available source is [WordWeb Online](https://wordwebonline.com).

This project is part of [#CreateWeekly](https://twitter.com/JosephusPaye/status/1214853295023411200), my attempt to create something new publicly every week in 2020.

## Installation

```bash
npm install -g @josephuspaye/lookup-cli
```

## Examples

### Look up definitions

The following command looks up definitions of the word "reticent":

```bash
lookup reticent
```

And yields the following output when ran:

<details>
<summary>View output</summary>

```
Looking up "reticent"...

Adjective: reticent

  1. Temperamentally disinclined to talk
     - untalkative

  2. Cool and formal in manner
     - restrained, unemotional

  3. Reluctant to draw attention to yourself
     - self-effacing, retiring

See also: taciturn, unassertive, undemonstrative
```
</details>

### Look up definitions with related words

When looking up definitions, you can choose to include related words in the following categories:

- `soundsLike`
- `derivedForms`
- `seeAlso`
- `partOf`
- `typeOf`
- `antonyms`
- `all` (include all related words)

The following commands finds definitions and `soundsLike`, `derivedForms`, `typeOf`, and `partOf` relations for the word "bee":

```bash
lookup bee -i soundsLike,derivedForms,typeOf,partOf
```

And yields the following output when ran:

<details>
<summary>View output</summary>

```
Looking up "bee"...

Noun: bee

  1. Any of numerous hairy-bodied insects including social and solitary species

  2. A social gathering to carry out some communal task or to hold competitions

Sounds like: be, B

Derived forms: bees

Type of: hymenopter, hymenopteran, hymenopteron, hymenopterous insect, social affair, social gathering

Part of: Apoidea, superfamily Apoidea
```
</details>

## Usage

```bash
lookup --help
```

```
Description
  Find definitions, synonyms, and related words for the given word.

Usage
  $ lookup <word> [options]

Options
  -i, --include    Include related words: one or more of `soundsLike`, `derivedForms`, `seeAlso`, `typeOf`, `partOf`, or `antonyms`, separated by a comma, or `all`  (default derivedForms,seeAlso,antonyms)
  -v, --version    Displays current version
  -h, --help       Displays this message

Examples
  $ lookup flag
  $ lookup flag -i derivedForms,seeAlso,antonyms
```

## Licence

[MIT](LICENCE)
