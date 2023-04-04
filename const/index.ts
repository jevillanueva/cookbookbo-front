export interface SearchRecipe {
  search?: string;
  page?: number;
  size?: number;
};

export type IngredientProps = {
  name: string;
  optional: boolean;
  quantity_si: number;
  unit_si: string;
  quantity_equivalence: number;
  unit_equivalence: string;
};

export type PreparationProps = {
  name: string;
  ingredients: IngredientProps[];
  steps: { detail: string }[];
}

export type RecipeProps = {
  _id: string;
  name: string;
  description: string;
  lang: string;
  owner: string;
  publisher: string;
  tags: string[];
  year: number;
  location: string;
  category: string[];
  portion: number;
  preparation_time_minutes: number;
  calification: number;
  preparation: PreparationProps[];
  image_url: string;
};