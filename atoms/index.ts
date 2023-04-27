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

export const accessTokenState = atom({
  key: 'AccessTokenState',
  default: "",
});

export const searchRecipeUserPublishedState = atom({
  key: "searchRecipeUserPublishedState",
  default: { search: "" },
});
export const searchRecipeUserNotRequestedState = atom({
  key: "searchRecipeUserNotRequestedState",
  default: { search: "" },
});
export const searchRecipeUserNotReviewedState = atom({
  key: "searchRecipeUserNotReviewedState",
  default: { search: "" },
});
export const searchRecipeUserRejectedState = atom({
  key: "searchRecipeUserRejectedState",
  default: { search: "" },
});

export const searchRecipeUserPublishedQueryState = atom({
  key: "searchRecipeUserPublishedQueryState",
  default: { page: 1, size: 10 },
});
export const searchRecipeUserNotRequestedQueryState = atom({
  key: "searchRecipeUserNotRequestedQueryState",
  default: { page: 1, size: 10 },
});
export const searchRecipeUserNotReviewedQueryState = atom({
  key: "searchRecipeUserNotReviewedQueryState",
  default: { page: 1, size: 10 },
});
export const searchRecipeUserRejectedQueryState = atom({
  key: "searchRecipeUserRejectedQueryState",
  default: { page: 1, size: 10 },
});