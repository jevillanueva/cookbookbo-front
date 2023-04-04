import { selector } from "recoil";
import { homePageQueryState, searchRecipeState } from "atoms";
import { fetchSearchRecipes } from "lib/http";

export const homePageQuery = selector({
  key: "homePage",
  get: async ({ get }) => {
    const { page, size } = get(homePageQueryState);
    const { search } = get(searchRecipeState);
    const response = await fetchSearchRecipes({ search, page, size });
    return response;
  },
});