import { describe, it, expect } from 'vitest';
import { siteConfig, socials, formatAboutMe } from './config';

describe('formatAboutMe', () => {
  it('should escape HTML tags', () => {
    const input = '<div> & "test" \'</div>';
    const output = formatAboutMe(input);
    expect(output).toContain('&lt;div&gt;');
    expect(output).toContain('&amp;');
    expect(output).toContain('&quot;test&quot;');
    expect(output).toContain('&#039;');
  });

  it('should replace newlines with <br/>', () => {
    const input = 'line 1\nline 2';
    const output = formatAboutMe(input);
    expect(output).toBe('line 1<br/>line 2');
  });

  it('should format bold text with <strong> tags', () => {
    const input = 'This is **bold** text';
    const output = formatAboutMe(input);
    expect(output).toBe('This is <strong>bold</strong> text');
  });

  it('should handle combined formatting and escaping', () => {
    const input = 'Check out **this** <div>\nnext line';
    const output = formatAboutMe(input);
    expect(output).toBe('Check out <strong>this</strong> &lt;div&gt;<br/>next line');
  });

  it('should handle multiple bold blocks', () => {
    const input = 'I am **strong** and **bold**.';
    const output = formatAboutMe(input);
    expect(output).toBe('I am <strong>strong</strong> and <strong>bold</strong>.');
  });
});

describe('siteConfig', () => {
  it('should have required string properties', () => {
    expect(typeof siteConfig.name).toBe('string');
    expect(typeof siteConfig.title).toBe('string');
    expect(typeof siteConfig.description).toBe('string');
    expect(typeof siteConfig.accentColor).toBe('string');
    expect(typeof siteConfig.aboutMe).toBe('string');
  });

  it('should have a valid social structure', () => {
    expect(siteConfig.social).toBeDefined();
    expect(typeof siteConfig.social.email).toBe('string');
    expect(typeof siteConfig.social.linkedin).toBe('string');
    expect(typeof siteConfig.social.twitter).toBe('string');
    expect(typeof siteConfig.social.github).toBe('string');
    expect(typeof siteConfig.social.gdev).toBe('string');
  });

  it('should have a valid navLinks array', () => {
    expect(Array.isArray(siteConfig.navLinks)).toBe(true);
    siteConfig.navLinks.forEach((link) => {
      expect(typeof link.name).toBe('string');
      expect(typeof link.href).toBe('string');
    });
  });

  it('should have a valid skills array', () => {
    expect(Array.isArray(siteConfig.skills)).toBe(true);
    siteConfig.skills.forEach((skill) => {
      expect(typeof skill).toBe('string');
    });
  });

  it('should have a valid services array', () => {
    expect(Array.isArray(siteConfig.services)).toBe(true);
    siteConfig.services.forEach((service) => {
      expect(typeof service.name).toBe('string');
      expect(typeof service.description).toBe('string');
    });
  });

  it('should have a valid blogPosts array', () => {
    expect(Array.isArray(siteConfig.blogPosts)).toBe(true);
    siteConfig.blogPosts.forEach((post) => {
      expect(typeof post.title).toBe('string');
      expect(typeof post.date).toBe('string');
      expect(typeof post.summary).toBe('string');
      expect(typeof post.link).toBe('string');
    });
  });
});

describe('socials', () => {
  it('should be an array of objects with correct structure', () => {
    expect(Array.isArray(socials)).toBe(true);
    socials.forEach((social) => {
      expect(typeof social.name).toBe('string');
      expect(typeof social.url).toBe('string');
      expect(typeof social.color).toBe('string');
    });
  });

  it('should filter out social links without a url', () => {
    socials.forEach((social) => {
      expect(social.url).toBeTruthy();
    });
  });
});
