import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatMarkdownText } from './formatters.ts';

test('formatMarkdownText - bold text replacement', () => {
  const input = 'Hello **world**';
  const expected = 'Hello <strong>world</strong>';
  assert.strictEqual(formatMarkdownText(input), expected);
});

test('formatMarkdownText - multiple bold text replacements', () => {
  const input = 'I am **Gaurav G Alva**. A final-year **Data Science** student.';
  const expected = 'I am <strong>Gaurav G Alva</strong>. A final-year <strong>Data Science</strong> student.';
  assert.strictEqual(formatMarkdownText(input), expected);
});

test('formatMarkdownText - newline replacement', () => {
  const input = 'Line 1\nLine 2';
  const expected = 'Line 1<br />Line 2';
  assert.strictEqual(formatMarkdownText(input), expected);
});

test('formatMarkdownText - bold and newline combined', () => {
  const input = 'I am **Gaurav**.\nI study **Data Science**.';
  const expected = 'I am <strong>Gaurav</strong>.<br />I study <strong>Data Science</strong>.';
  assert.strictEqual(formatMarkdownText(input), expected);
});

test('formatMarkdownText - no replacements needed', () => {
  const input = 'Plain text without formatting';
  assert.strictEqual(formatMarkdownText(input), input);
});

test('formatMarkdownText - empty string', () => {
  assert.strictEqual(formatMarkdownText(''), '');
});

test('formatMarkdownText - unmatched asterisks', () => {
  const input = 'Text with **some asterisks but no closing ones';
  assert.strictEqual(formatMarkdownText(input), input);
});
