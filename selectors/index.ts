import { selector } from "recoil";
import { accessTokenState, homePageQueryState, recipeDetailsIdState, searchRecipeState, searchRecipeUserNotRequestedQueryState, searchRecipeUserNotRequestedState, searchRecipeUserNotReviewedQueryState, searchRecipeUserNotReviewedState, searchRecipeUserPublishedQueryState, searchRecipeUserPublishedState, searchRecipeUserRejectedQueryState, searchRecipeUserRejectedState, searchRecipeUserState } from "atoms";
import { fetchMe, fetchRecipeDetailsById, fetchSearchRecipes, fetchSearchRecipesUser } from "lib/http";
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
    return { content: {} as UserProps };
  },
});

export const userRecipesPublishedQuery = selector({
  key: "userRecipesPublishedQuery",
  get: async ({ get }) => {
    const id = get(accessTokenState);
    if (id !== "") {
      const { page, size } = get(searchRecipeUserPublishedQueryState);
      const { search } = get(searchRecipeUserPublishedState);
      const state = "published";
      const response = await fetchSearchRecipesUser(id, { search, page, size, state });
      return response;
    }
    return { content: [], total: 0 };
  },
});
export const userRecipesNotRequestedQuery = selector({
  key: "userRecipesNotRequestedQuery",
  get: async ({ get }) => {
    const id = get(accessTokenState);
    if (id !== "") {
      const { page, size } = get(searchRecipeUserNotRequestedQueryState);
      const { search } = get(searchRecipeUserNotRequestedState);
      const state = "not_requested";
      const response = await fetchSearchRecipesUser(id, { search, page, size, state });
      return response;
    }
    console.log(id)
    return { content: [], total: 0 };
  },
});
export const userRecipesNotReviewedQuery = selector({
  key: "userRecipesNotReviewedQuery",
  get: async ({ get }) => {
    const id = get(accessTokenState);
    if (id !== "") {
      const { page, size } = get(searchRecipeUserNotReviewedQueryState);
      const { search } = get(searchRecipeUserNotReviewedState);
      const state = "not_reviewed";
      const response = await fetchSearchRecipesUser(id, { search, page, size, state });
      return response;
    }
    return { content: [], total: 0 };
  },
});
export const userRecipesRejectedQuery = selector({
  key: "userRecipesQuery",
  get: async ({ get }) => {
    const id = get(accessTokenState);
    if (id !== "") {
      const { page, size } = get(searchRecipeUserRejectedQueryState);
      const { search } = get(searchRecipeUserRejectedState);
      const state = "rejected";
      const response = await fetchSearchRecipesUser(id, { search, page, size, state });
      return response;
    }
    return { content: [], total: 0 };
  },
});