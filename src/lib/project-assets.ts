export type ProjectVisuals = {
  icon: string;
  screens: [string, string];
  landscape?: boolean;
};

const visuals = (slug: string, landscape = false): ProjectVisuals => ({
  icon: `/assets/projects/${slug}-icon.webp`,
  screens: [`/assets/projects/${slug}-1.webp`, `/assets/projects/${slug}-2.webp`],
  landscape,
});

export const projectAssets: Record<string, ProjectVisuals> = {
  besein: visuals("besein"),
  zien: visuals("zien"),
  diosync: visuals("diosync", true),
  bunchy: visuals("bunchy"),
  ydf: visuals("ydf", true),
  cyberwolf: visuals("cyberwolf"),
  jabburr: visuals("jabburr"),
  planify: visuals("planify"),
  "parure-la-plee": visuals("parure-la-plee", true),
};