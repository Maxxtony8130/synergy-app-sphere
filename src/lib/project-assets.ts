export type ProjectVisuals = {
  icon: string;
  /** Screenshot used wherever the project is shown with a single screen. */
  cover: string;
  screens: string[];
  /** Natural pixel size of the screenshots, so frames keep the real aspect ratio. */
  width: number;
  height: number;
};

const visuals = (
  slug: string,
  count: number,
  width: number,
  height: number,
  coverIndex = 1,
): ProjectVisuals => {
  const screens = Array.from(
    { length: count },
    (_, index) => `/assets/projects/${slug}-${index + 1}.webp`,
  );
  return {
    icon: `/assets/projects/${slug}-icon.webp`,
    cover: screens[coverIndex - 1] ?? screens[0] ?? "",
    screens,
    width,
    height,
  };
};

export const projectAssets: Record<string, ProjectVisuals> = {
  besein: visuals("besein", 8, 1242, 2687),
  zien: visuals("zien", 8, 1242, 2687),
  // Screenshot 1 is only the splash screen, so the cover starts at screenshot 2.
  diosync: visuals("diosync", 4, 1108, 2400, 2),
  bunchy: visuals("bunchy", 4, 1242, 2687),
  ydf: visuals("ydf", 5, 1080, 2400),
  cyberwolf: visuals("cyberwolf", 8, 1237, 2688),
  jabburr: visuals("jabburr", 8, 1237, 2688),
  planify: visuals("planify", 7, 1242, 2208),
  "parure-la-plee": visuals("parure-la-plee", 8, 1109, 2400),
};

/** Screens for previews: the cover first, never the Diosync splash screen. */
export function previewScreens(slug: string, count = 3): string[] {
  const v = projectAssets[slug];
  if (!v) return [];
  const rest = v.screens.filter(
    (s) => s !== v.cover && !(slug === "diosync" && s.endsWith("diosync-1.webp")),
  );
  return [v.cover, ...rest].slice(0, count);
}
