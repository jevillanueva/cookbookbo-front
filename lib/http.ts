import axios from "axios";
import { useSession } from "next-auth/react";
import { RecipeProps, UserProps } from "const";
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
export async function fetchRecipeDetailsById(id: string): Promise<{
  content: RecipeProps;
  error?: any;
}> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const response = await axios.get(`${API_URL}/recipe/public/${id}`);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data };
  } catch (error) {
    console.error(error);
    return { error, content: {} as RecipeProps };
  }
}
export async function fetchLoginAPI(access_token: string) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const response = await axios.get(`${API_URL}/google/login/public`, { "headers": { "Authorization": `Bearer ${access_token}` } });
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return response.data.token;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchSignOutAPI(access_token: string) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const response = await axios.get(`${API_URL}/google/logout/public`, { "headers": { "Authorization": `Bearer ${access_token}` } });
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}


export async function fetchMe(access_token: string): Promise<{
  content: UserProps;
  error?: any;
}> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const response = await axios.get(`${API_URL}/users/me/public`, { "headers": { "Authorization": `Bearer ${access_token}` } });
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data };
  } catch (error) {
    console.error(error);
    return { error, content: {} as UserProps };
  }
}

export async function fetchSearchRecipesUser(access_token: string, data: {
  search?: string;
  page?: number;
  size?: number;
  state?: string;
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
    const response = await axios.get(`${API_URL}/recipe/user/public?${queryArray.join(`&`)}`, { "headers": { "Authorization": `Bearer ${access_token}` } });
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return response.data;
  } catch (error) {
    console.error(error);
    return { error, content: [], total: 0 };
  }
}

export async function deleteRecipesUser(access_token: string, id: string): Promise<{ message?: any, error?: any }> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const response = await axios.delete(`${API_URL}/recipe/user/public/${id}`, { "headers": { "Authorization": `Bearer ${access_token}` } });
    if (response.status !== 204) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { message: "" };
  } catch (error) {
    try {
      if (error.response.data.message) {
        return { error, message: error.response.data.message };
      }
      return { error, message: error.message };
    } catch (e) {
      console.error(e);
      return { error, message: e.message };
    }
  }
}

export async function reviewRecipeUser(access_token: string, id: string): Promise<{ message?: any, error?: any }> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const response = await axios.patch(`${API_URL}/recipe/user/public/${id}/review`, {}, { "headers": { "Authorization": `Bearer ${access_token}` } });
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { message: "" };
  } catch (error) {
    try {
      if (error.response.data.message) {
        return { error, message: error.response.data.message };
      }
      return { error, message: error.message };
    } catch (e) {
      console.error(e);
      return { error, message: e.message };
    }
  }
}

export async function unReviewRecipeUser(access_token: string, id: string): Promise<{ message?: any, error?: any }> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const response = await axios.patch(`${API_URL}/recipe/user/public/${id}/unreview`, {}, { "headers": { "Authorization": `Bearer ${access_token}` } });
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { message: "" };
  } catch (error) {
    try {
      if (error.response.data.message) {
        return { error, message: error.response.data.message };
      }
      return { error, message: error.message };
    } catch (e) {
      console.error(e);
      return { error, message: e.message };
    }
  }
}

export async function unPublishRecipeUser(access_token: string, id: string): Promise<{ message?: any, error?: any }> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const response = await axios.patch(`${API_URL}/recipe/user/public/${id}/unpublish`, {}, { "headers": { "Authorization": `Bearer ${access_token}` } });
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { message: "" };
  } catch (error) {
    try {
      if (error.response.data.message) {
        return { error, message: error.response.data.message };
      }
      return { error, message: error.message };
    } catch (e) {
      console.error(e);
      return { error, message: e.message };
    }
  }
}

export async function changeImageRecipeUser(access_token: string, id: string, file: any): Promise<{ message?: any, error?: any }> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const fd = new FormData();
    fd.append("file", file, file.name )
    const response = await axios.patch(`${API_URL}/recipe/user/public/${id}/image`, fd, { "headers": { "Authorization": `Bearer ${access_token}`, "Content-Type": "application/x-www-form-urlencoded" } });
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { message: "" };
  } catch (error) {
    try {
      if (error.response.data.message) {
        return { error, message: error.response.data.message };
      }
      return { error, message: error.message };
    } catch (e) {
      console.error(e);
      return { error, message: e.message };
    }
  }
}

export async function postNewRecipeUser(access_token: string, recipe: RecipeProps): Promise<{ message?: any, error?: any }> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const response = await axios.post(`${API_URL}/recipe/user/public`, recipe, { "headers": { "Authorization": `Bearer ${access_token}` } });
    if (response.status !== 201) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { message: "" };
  } catch (error) {
    try {
      if (error.response.data.message) {
        return { error, message: error.response.data.message };
      }
      return { error, message: error.message };
    } catch (e) {
      console.error(e);
      return { error, message: e.message };
    }
  }
}