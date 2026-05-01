export const siteConfig = {
  name: "CodingCup Labs",
  title: "Creative Tech Solutions",
  description: "CodingCup Labs builds next-generation digital experiences.",
  accentColor: "#ff6600",
  navLinks: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Socials", href: "/socials" },
    { name: "Contact", href: "/contact" },
  ],
  social: {
    email: "hello@codingcuplabs.com",
    linkedin: "https://linkedin.com/company/codingcuplabs",
    twitter: "https://x.com/codingcuplabs",
    github: "https://github.com/codingcuplabs",
    gdev: "https://g.dev/codingcuplabs",
  },
  aboutMe:
    "We are **CodingCup Labs**. A team of passionate developers and creatives dedicated to building bold and innovative digital solutions.\n\nFrom web development to custom software, we blend robust engineering with striking aesthetics. Our approach is straightforward: ship high-quality products that make an impact.",
  skills: [
    "Web Development", "UI/UX Design", "Software Engineering", "Cloud Architecture", "Data Science", "Mobile Apps"
  ],
  services: [
    {
      name: "Web Development",
      description: "Fast, responsive, and bold websites tailored to your brand."
    },
    {
      name: "UI/UX Design",
      description: "User-centric designs with a focus on usability and aesthetics."
    },
    {
      name: "Custom Software",
      description: "Scalable software solutions to meet your unique business needs."
    }
  ]
};

export const socials = [
  { name: "Twitter / X", url: siteConfig.social.twitter, color: "#000000" },
  { name: "LinkedIn", url: siteConfig.social.linkedin, color: "#0A66C2" },
  { name: "GitHub", url: siteConfig.social.github, color: "#181717" },
  { name: "Google Dev", url: siteConfig.social.gdev, color: "#4285F4" }
];

const QUICK_LINK_NAMES = new Set(['About', 'Services', 'Blog', 'Contact']);
export const footerLinks = siteConfig.navLinks.filter(link => QUICK_LINK_NAMES.has(link.name));

const escapeHtml = (unsafe: string) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export const safeAboutMe = escapeHtml(siteConfig.aboutMe)
  .replace(/\n/g, '<br/>')
  .replace(/\*\*(.*?)\*\*/g, (_, p1) => `<strong>${p1}</strong>`);
