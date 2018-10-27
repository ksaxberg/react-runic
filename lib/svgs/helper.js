// @flow
import React from 'react';
// Returns the requested svg

import { singleLetters } from './singleLetters';
import { compoundLetters } from './compoundLetters';
import { wordGlyphs } from './wordGlyphs';

const SVGS = Object.assign({}, singleLetters, compoundLetters, wordGlyphs);

const VALID_LETTTERS = 'abcdefghijklmnopqrstuvwxyz '.split('');

const filterForValidLetters = (str: string = '') =>
  str.toLowerCase().split('').filter(char => VALID_LETTTERS.includes(char)).join('');

const insertIntoTrie = (trie, item) => {
  const rootMap = trie;
  let currentMap = trie;
  item.split('').forEach((letter, index) => {
    const isLastLetter = index === item.length - 1;
    if (isLastLetter) {
      const endingMap = new Map();
      endingMap.set('ending', true);
      currentMap.set(letter, endingMap);
      return;
    }
    if (!currentMap.has(letter)) {
      const nextMap = new Map();
      currentMap.set(letter, nextMap);
      currentMap = nextMap;
      return;
    }
    currentMap = currentMap.get(letter);
  });
  return rootMap;
}

const buildTrieMapFromArray = arr => arr.reduce(insertIntoTrie, new Map());

function longestTrieMatch(trie, query) {
  let currentMap = trie;
  let currentMatchLength = 0;
  query = filterForValidLetters(query);
  query.split('').forEach((letter, index) => {
    if (!currentMap) {
      return;
    }

    if (!currentMap.has(letter)){
      currentMap = null;
      return;
    }

    currentMap = currentMap.get(letter);
    if (currentMap.has('ending')) {
      currentMatchLength = index + 1;
    }
  });

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
