import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content', // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    date: z.date().or(z.string()), // Decap CMS saves as string/date format
    summary: z.string(),
    image: z.string().optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
};
