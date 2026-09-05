import logo from "@/assets/photos/logo.jpg.asset.json";
import thumbLogo from "@/assets/photos/thumb-logo.jpg.asset.json";

import autumn from "@/assets/photos/autumn-woodlot-aerial.jpg.asset.json";
import thumbAutumn from "@/assets/photos/thumb-autumn-woodlot-aerial.jpg.asset.json";
import conifer from "@/assets/photos/conifer-rows-aerial.jpg.asset.json";
import thumbConifer from "@/assets/photos/thumb-conifer-rows-aerial.jpg.asset.json";
import coyote from "@/assets/photos/coyote-thermal-find.jpg.asset.json";
import thumbCoyote from "@/assets/photos/thumb-coyote-thermal-find.jpg.asset.json";
import equipment from "@/assets/photos/equipment-truck-bed.jpg.asset.json";
import thumbEquipment from "@/assets/photos/thumb-equipment-truck-bed.jpg.asset.json";
import farmland from "@/assets/photos/farmland-treeline-aerial.jpg.asset.json";
import thumbFarmland from "@/assets/photos/thumb-farmland-treeline-aerial.jpg.asset.json";
import overhead from "@/assets/photos/overhead-tree-rows.jpg.asset.json";
import thumbOverhead from "@/assets/photos/thumb-overhead-tree-rows.jpg.asset.json";
import pine from "@/assets/photos/pine-grove-aerial.jpg.asset.json";
import thumbPine from "@/assets/photos/thumb-pine-grove-aerial.jpg.asset.json";
import treeFarm from "@/assets/photos/tree-farm-aerial.jpg.asset.json";
import thumbTreeFarm from "@/assets/photos/thumb-tree-farm-aerial.jpg.asset.json";
import winter from "@/assets/photos/winter-property-aerial.jpg.asset.json";
import thumbWinter from "@/assets/photos/thumb-winter-property-aerial.jpg.asset.json";

export const LOGO_URL = logo.url;
export const LOGO_THUMB_URL = thumbLogo.url;

export type GalleryPhoto = {
  id: string;
  url: string;
  thumb: string;
  alt: string;
  caption: string;
};

export const GALLERY: GalleryPhoto[] = [
  {
    id: "coyote-thermal-find",
    url: coyote.url,
    thumb: thumbCoyote.url,
    alt: "Thermal drone image showing a coyote located in heavy cover",
    caption: "Thermal find — coyote picked out of heavy cover",
  },
  {
    id: "tree-farm-aerial",
    url: treeFarm.url,
    thumb: thumbTreeFarm.url,
    alt: "Aerial photo of a tree farm with rows of evergreens",
    caption: "Tree farm survey flight",
  },
  {
    id: "autumn-woodlot-aerial",
    url: autumn.url,
    thumb: thumbAutumn.url,
    alt: "Aerial photo of an autumn woodlot in full color",
    caption: "Autumn woodlot from altitude",
  },
  {
    id: "farmland-treeline-aerial",
    url: farmland.url,
    thumb: thumbFarmland.url,
    alt: "Aerial photo of farmland meeting a treeline",
    caption: "Farmland and treeline edge — prime recovery ground",
  },
  {
    id: "pine-grove-aerial",
    url: pine.url,
    thumb: thumbPine.url,
    alt: "Aerial photo of a dense pine grove",
    caption: "Dense pine grove scan",
  },
  {
    id: "conifer-rows-aerial",
    url: conifer.url,
    thumb: thumbConifer.url,
    alt: "Aerial photo of conifer rows planted in straight lines",
    caption: "Conifer rows from above",
  },
  {
    id: "overhead-tree-rows",
    url: overhead.url,
    thumb: thumbOverhead.url,
    alt: "Straight-down aerial photo of tree rows",
    caption: "Straight-down mapping pass",
  },
  {
    id: "winter-property-aerial",
    url: winter.url,
    thumb: thumbWinter.url,
    alt: "Aerial photo of a snow-covered property in winter",
    caption: "Winter property flight",
  },
  {
    id: "equipment-truck-bed",
    url: equipment.url,
    thumb: thumbEquipment.url,
    alt: "Drone and thermal imaging equipment staged in a truck bed",
    caption: "Field kit staged and ready",
  },
];
