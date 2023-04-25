import { selector } from "recoil";
import { accessTokenState, homePageQueryState, recipeDetailsIdState, searchRecipeState } from "atoms";
import { fetchMe, fetchRecipeDetailsById, fetchSearchRecipes } from "lib/http";
import { useSession } from "next-auth/react";
import { UserProps } from "const";
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


export const mePageQuery = selector({
  key: "MePageQuery",
  get: async ({ get }) => {
    const id = get(accessTokenState);
    if (id !== "") {
      const response = await fetchMe(id);
      if (response.error) {
        throw response.error;
      }
      return response;
    }
    return { content: {} as UserProps } ;
  },
});