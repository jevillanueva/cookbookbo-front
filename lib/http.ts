import axios from "axios";
import { RecipeProps } from "const";
// import { BookProps, BookDetailProps, BookRatingsProps } from "const";
export async function fetchSearchRecipes(data: {
  search?: string;
  page?: number;
  size?: number;
}): Promise<{ content: RecipeProps[]; total: number; error?: any }> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const queryArray = Object.keys(data).reduce((prev: string[], item) => {
      const value = data[item as keyof typeof data];
      if (value) {
        prev.push(`${item}=${value}`);
      }
      return prev;
    }, []);
    const response = await axios.get(`${API_URL}/recipe/public?${queryArray.join(`&`)}`);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return response.data;
  } catch (error) {
    console.error(error);
    return { error, content: [], total: 0 };
  }
}