import { describe, it, expect } from 'vitest';
import { siteConfig, socials, footerLinks } from './config';

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
});

describe('footerLinks', () => {
  it('should only contain the specified quick links', () => {
    const expectedNames = ['About', 'Services', 'Blog', 'Contact'];
    expect(footerLinks.length).toBe(expectedNames.length);

    footerLinks.forEach(link => {
      expect(expectedNames).toContain(link.name);
    });
  });

  it('should not contain "Home" or "Socials"', () => {
    const names = footerLinks.map(link => link.name);
    expect(names).not.toContain('Home');
    expect(names).not.toContain('Socials');
  });

  it('should match the link structure of navLinks', () => {
    footerLinks.forEach(link => {
      expect(typeof link.name).toBe('string');
      expect(typeof link.href).toBe('string');
      expect(link.href.startsWith('/')).toBe(true);
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

  it('should not contain social links without a url', () => {
    socials.forEach((social) => {
      expect(social.url).toBeTruthy();
    });
  });
});
