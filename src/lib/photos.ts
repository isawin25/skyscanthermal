import logo from "@/assets/photos/logo.jpg";
import thumbLogo from "@/assets/photos/thumb-logo.jpg";

import autumn from "@/assets/photos/autumn-woodlot-aerial.jpg";
import thumbAutumn from "@/assets/photos/thumb-autumn-woodlot-aerial.jpg";
import conifer from "@/assets/photos/conifer-rows-aerial.jpg";
import thumbConifer from "@/assets/photos/thumb-conifer-rows-aerial.jpg";
import coyote from "@/assets/photos/coyote-thermal-find.jpg";
import thumbCoyote from "@/assets/photos/thumb-coyote-thermal-find.jpg";
import equipment from "@/assets/photos/equipment-truck-bed.jpg";
import thumbEquipment from "@/assets/photos/thumb-equipment-truck-bed.jpg";
import farmland from "@/assets/photos/farmland-treeline-aerial.jpg";
import thumbFarmland from "@/assets/photos/thumb-farmland-treeline-aerial.jpg";
import overhead from "@/assets/photos/overhead-tree-rows.jpg";
import thumbOverhead from "@/assets/photos/thumb-overhead-tree-rows.jpg";
import pine from "@/assets/photos/pine-grove-aerial.jpg";
import thumbPine from "@/assets/photos/thumb-pine-grove-aerial.jpg";
import treeFarm from "@/assets/photos/tree-farm-aerial.jpg";
import thumbTreeFarm from "@/assets/photos/thumb-tree-farm-aerial.jpg";
import winter from "@/assets/photos/winter-property-aerial.jpg";
import thumbWinter from "@/assets/photos/thumb-winter-property-aerial.jpg";

export const LOGO_URL = logo;
export const LOGO_THUMB_URL = thumbLogo;

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
    url: coyote,
    thumb: thumbCoyote,
    alt: "Thermal drone image showing a coyote located in heavy cover",
    caption: "Thermal find — coyote picked out of heavy cover",
  },
  {
    id: "tree-farm-aerial",
    url: treeFarm,
    thumb: thumbTreeFarm,
    alt: "Aerial photo of a tree farm with rows of evergreens",
    caption: "Tree farm survey flight",
  },
  {
    id: "autumn-woodlot-aerial",
    url: autumn,
    thumb: thumbAutumn,
    alt: "Aerial photo of an autumn woodlot in full color",
    caption: "Autumn woodlot from altitude",
  },
  {
    id: "farmland-treeline-aerial",
    url: farmland,
    thumb: thumbFarmland,
    alt: "Aerial photo of farmland meeting a treeline",
    caption: "Farmland and treeline edge — prime recovery ground",
  },
  {
    id: "pine-grove-aerial",
    url: pine,
    thumb: thumbPine,
    alt: "Aerial photo of a dense pine grove",
    caption: "Dense pine grove scan",
  },
  {
    id: "conifer-rows-aerial",
    url: conifer,
    thumb: thumbConifer,
    alt: "Aerial photo of conifer rows planted in straight lines",
    caption: "Conifer rows from above",
  },
  {
    id: "overhead-tree-rows",
    url: overhead,
    thumb: thumbOverhead,
    alt: "Straight-down aerial photo of tree rows",
    caption: "Straight-down mapping pass",
  },
  {
    id: "winter-property-aerial",
    url: winter,
    thumb: thumbWinter,
    alt: "Aerial photo of a snow-covered property in winter",
    caption: "Winter property flight",
  },
  {
    id: "equipment-truck-bed",
    url: equipment,
    thumb: thumbEquipment,
    alt: "Drone and thermal imaging equipment staged in a truck bed",
    caption: "Field kit staged and ready",
  },
];
