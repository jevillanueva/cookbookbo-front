import { selector } from "recoil";
import { homePageQueryState, recipeDetailsIdState, searchRecipeState } from "atoms";
import { fetchRecipeDetailsById, fetchSearchRecipes } from "lib/http";

export const homePageQuery = selector({
  key: "homePage",
  get: async ({ get }) => {
    const { page, size } = get(homePageQueryState);
    const { search } = get(searchRecipeState);
    const response = await fetchSearchRecipes({ search, page, size });
    return response;
  },
});

export const recipeInfoQuery = selector({
  key: "RecipeInfoQuery",
  get: async ({ get }) => {
    const recipeID = get(recipeDetailsIdState);
    const response = await fetchRecipeDetailsById(recipeID);
    if (response.error) {
      throw response.error;
    }
    return response;
  },
});
