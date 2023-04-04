import { atom } from "recoil";

import { RecipeProps } from "const";

export const searchRecipeState = atom({
  key: "searchRecipeState",
  default: { search: "" },
});

export const homePageQueryState = atom({
  key: "homePageQueryState",
  default: { page: 1, size: 1 },
});


export const homePageRecipeSumState = atom({
  key: "homePageRecipeSumState",
  default: 0,
});