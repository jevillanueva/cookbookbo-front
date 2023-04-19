import { atom } from "recoil";

import { RecipeProps } from "const";

export const searchRecipeState = atom({
  key: "searchRecipeState",
  default: { search: "" },
});

export const homePageQueryState = atom({
  key: "homePageQueryState",
  default: { page: 1, size: 10 },
});


export const homePageRecipeSumState = atom({
  key: "homePageRecipeSumState",
  default: 0,
});

export const recipeDetailsIdState = atom({
  key: "recipeDetailsIdState",
  default: "",
});

export const searchBarVisible = atom({
  key: "SearchBarVisible",
  default: true,
});