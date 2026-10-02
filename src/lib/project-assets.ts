import beseinIcon from "@/assets/projects/besein-icon.jpg.asset.json";
import beseinOne from "@/assets/projects/besein-1.jpg.asset.json";
import beseinTwo from "@/assets/projects/besein-2.jpg.asset.json";
import zienIcon from "@/assets/projects/zien-icon.jpg.asset.json";
import zienOne from "@/assets/projects/zien-1.jpg.asset.json";
import zienTwo from "@/assets/projects/zien-2.jpg.asset.json";
import diosyncIcon from "@/assets/projects/diosync-icon.jpg.asset.json";
import diosyncOne from "@/assets/projects/diosync-1.jpg.asset.json";
import diosyncTwo from "@/assets/projects/diosync-2.jpg.asset.json";
import bunchyIcon from "@/assets/projects/bunchy-icon.jpg.asset.json";
import bunchyOne from "@/assets/projects/bunchy-1.jpg.asset.json";
import bunchyTwo from "@/assets/projects/bunchy-2.jpg.asset.json";
import ydfIcon from "@/assets/projects/ydf-icon.jpg.asset.json";
import ydfOne from "@/assets/projects/ydf-1.jpg.asset.json";
import ydfTwo from "@/assets/projects/ydf-2.jpg.asset.json";
import cyberwolfIcon from "@/assets/projects/cyberwolf-icon.jpg.asset.json";
import cyberwolfOne from "@/assets/projects/cyberwolf-1.jpg.asset.json";
import cyberwolfTwo from "@/assets/projects/cyberwolf-2.jpg.asset.json";
import jabburrIcon from "@/assets/projects/jabburr-icon.jpg.asset.json";
import jabburrOne from "@/assets/projects/jabburr-1.jpg.asset.json";
import jabburrTwo from "@/assets/projects/jabburr-2.jpg.asset.json";
import planifyIcon from "@/assets/projects/planify-icon.jpg.asset.json";
import planifyOne from "@/assets/projects/planify-1.jpg.asset.json";
import planifyTwo from "@/assets/projects/planify-2.jpg.asset.json";
import parureIcon from "@/assets/projects/parure-la-plee-icon.jpg.asset.json";
import parureOne from "@/assets/projects/parure-la-plee-1.jpg.asset.json";
import parureTwo from "@/assets/projects/parure-la-plee-2.jpg.asset.json";

type AssetPointer = { url: string };

export type ProjectVisuals = {
  icon: string;
  screens: [string, string];
  landscape?: boolean;
};

const visuals = (
  icon: AssetPointer,
  first: AssetPointer,
  second: AssetPointer,
  landscape = false,
): ProjectVisuals => ({ icon: icon.url, screens: [first.url, second.url], landscape });

export const projectAssets: Record<string, ProjectVisuals> = {
  besein: visuals(beseinIcon, beseinOne, beseinTwo),
  zien: visuals(zienIcon, zienOne, zienTwo),
  diosync: visuals(diosyncIcon, diosyncOne, diosyncTwo, true),
  bunchy: visuals(bunchyIcon, bunchyOne, bunchyTwo),
  ydf: visuals(ydfIcon, ydfOne, ydfTwo, true),
  cyberwolf: visuals(cyberwolfIcon, cyberwolfOne, cyberwolfTwo),
  jabburr: visuals(jabburrIcon, jabburrOne, jabburrTwo),
  planify: visuals(planifyIcon, planifyOne, planifyTwo),
  "parure-la-plee": visuals(parureIcon, parureOne, parureTwo, true),
};