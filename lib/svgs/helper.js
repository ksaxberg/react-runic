// @flow
import React from 'react';
// Returns the requested svg

import { singleLetters } from './singleLetters';
import { compoundLetters } from './compoundLetters';
import { wordGlyphs } from './wordGlyphs';

type Trie = Map<string, ?Trie | boolean>;

const SVGS = Object.assign({}, singleLetters, compoundLetters, wordGlyphs);

const VALID_LETTTERS = 'abcdefghijklmnopqrstuvwxyz '.split('');

const filterForValidLetters = (str: string = '') =>
  str.toLowerCase().split('').filter(char => VALID_LETTTERS.includes(char)).join('');

const insertIntoTrie = (trie: Trie, item: string): Trie => {
  const rootMap = trie;
  let currentMap = trie;
  let i = 0;
  const isLastLetter = () => {
    return i++ === item.length - 1;
  }
  for (const letter of item.split('')) {
    if (!currentMap) {
      // Something went wrong when inserting into the trie.
      return rootMap;
    }

    if (isLastLetter()) {
      const endingMap: Trie = new Map();
      endingMap.set('ending', true);
      currentMap.set(letter, endingMap);
      continue;
    }

    if (!currentMap.has(letter)) {
      const nextMap = new Map();
      currentMap.set(letter, nextMap);
      currentMap = nextMap;
      continue;
    }

    currentMap = currentMap.get(letter);
  }
  return rootMap;
}

const buildTrieMapFromArray = arr => arr.reduce(insertIntoTrie, (new Map(): Trie));

function longestTrieMatch(trie, query) {
  let currentMap = trie;
  let currentMatchLength = 0;
  query = filterForValidLetters(query);
  for (let i = 0; i < query.length; i++) {
    const letter = query.charAt(i);
    if (!currentMap.has(letter)){
      break;
    }

    currentMap = currentMap.get(letter);
    if (currentMap.has('ending')) {
      currentMatchLength = i + 1;
    }
  }

  return query.substring(0, currentMatchLength);
}

const filterArray = arr => arr.map(filterForValidLetters);

const svgTrie = buildTrieMapFromArray(Object.keys(SVGS));

export const queryForSvgs = (query: string = '') => {
  query = filterForValidLetters(query);
  const svgs = [];

  for (let i = 0; i < query.length; i++) {
    const match = longestTrieMatch(svgTrie, query.substring(i));
    svgs.push(SVGS[match]);
    if (match.length > 1)
      i += (match.length - 1);
  }
  return svgs;
}

export default function getSvg(svgName: string = '') {
  return SVGS[svgName];
}
