export type ProjectVisuals = {
  icon: string;
  /** Screenshot used wherever the project is shown with a single screen. */
  cover: string;
  screens: string[];
  /** Natural pixel size of the screenshots, so frames keep the real aspect ratio. */
  width: number;
  height: number;
  /** Brand colour taken from the app icon, used to tint its showcase panel. */
  tint: string;
};

const visuals = (
  slug: string,
  count: number,
  width: number,
  height: number,
  tint: string,
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
    tint,
  };
};

export const projectAssets: Record<string, ProjectVisuals> = {
  besein: visuals("besein", 8, 1242, 2687, "#5b46c9"),
  zien: visuals("zien", 8, 1242, 2687, "#1d6fb8"),
  // Screenshot 1 is only the splash screen, so the cover starts at screenshot 2.
  diosync: visuals("diosync", 4, 1108, 2400, "#3c59d1", 2),
  bunchy: visuals("bunchy", 4, 1242, 2687, "#1f9aa8"),
  ydf: visuals("ydf", 5, 1080, 2400, "#e0a100"),
  cyberwolf: visuals("cyberwolf", 8, 1237, 2688, "#3a5a78"),
  jabburr: visuals("jabburr", 8, 1237, 2688, "#e0457b"),
  planify: visuals("planify", 7, 1242, 2208, "#8a2a92"),
  "parure-la-plee": visuals("parure-la-plee", 8, 1109, 2400, "#b08d57"),
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
