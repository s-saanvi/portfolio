import { describe, it, expect } from 'vitest';
import { formatDate } from './date';

describe('formatDate', () => {
  it('should format a Date object with default (short) month', () => {
    const date = new Date('2023-05-15T00:00:00Z');
    // Using a more robust check since toLocaleDateString output can depend on environment
    // But since the project uses 'en-US', it should be 'May 15, 2023'
    expect(formatDate(date)).toBe('May 15, 2023');
  });

  it('should format a date string with long month', () => {
    const dateStr = '2023-12-25';
    expect(formatDate(dateStr, 'long')).toBe('December 25, 2023');
  });

  it('should format a date string with short month', () => {
    const dateStr = '2023-01-01';
    expect(formatDate(dateStr, 'short')).toBe('Jan 1, 2023');
  });

  it('should handle different year/month/day combinations', () => {
    const date = new Date(2024, 5, 20); // June 20, 2024 (month is 0-indexed)
    expect(formatDate(date, 'long')).toBe('June 20, 2024');
  });
});
