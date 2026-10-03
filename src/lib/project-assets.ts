export type ProjectVisuals = {
  icon: string;
  screens: string[];
  landscape?: boolean;
};

const visuals = (slug: string, count: number, landscape = false): ProjectVisuals => ({
  icon: `/assets/projects/${slug}-icon.webp`,
  screens: Array.from({ length: count }, (_, index) => `/assets/projects/${slug}-${index + 1}.webp`),
  landscape,
});

export const projectAssets: Record<string, ProjectVisuals> = {
  besein: visuals("besein", 8),
  zien: visuals("zien", 8),
  diosync: visuals("diosync", 4),
  bunchy: visuals("bunchy", 4),
  ydf: visuals("ydf", 5),
  cyberwolf: visuals("cyberwolf", 8),
  jabburr: visuals("jabburr", 8),
  planify: visuals("planify", 7),
  "parure-la-plee": visuals("parure-la-plee", 8),
};