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

export type ImageProps = {
  name: string;
  url: string;
  content_type: string;
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
  lat: number;
  lng: number;
  elevation?: number;
  score?: number;
  preparation: PreparationProps[];
  image?: ImageProps;
  published?: boolean;
  reviewed?: boolean|null;
};

export type UserProps = {
  username:string;
  email:string;
  given_name:string;
  family_name:string;
  picture: string;
  admin:boolean;
  disabled:boolean;
};

export type PageProps = {
  _id: string;
  slug: string;
  title: string;
  html: string;
}
export interface MetaProps {
  title: string;
  description: string;
  image: string;
}
export interface AppProps {
  title: string;
  description: string;
  recipe_availability: string;
  recipe_image_error: string;
}

export const AppDetails: AppProps = {
  title: "Ayllu Food",
  description: "Una plataforma de recetas de cocina, donde puedes encontrar recetas de todos y compartir tus propias recetas.",
  recipe_availability: "Receta disponible en Ayllu Food",
  recipe_image_error:  "/error_recipe.png"
}