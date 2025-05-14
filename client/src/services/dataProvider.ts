import { API_URL, LIKE_FILTERS } from "../constants";
import type { DataProvider } from "../types";

const sleep = async (ms: number) =>
  await new Promise((resolve) => setTimeout(resolve, ms));

export const dataProvider: DataProvider = {
  getList: async (resource, params = {}) => {
    await sleep(3000);
    const url = new URL(`${API_URL}/${resource}`);

    if (params.filters) {
      for (const [key, value] of Object.entries(params.filters)) {
        if (value !== "") {
          if (LIKE_FILTERS.includes(key)) {
            url.searchParams.append(`${key}_like`, value);
          } else {
            url.searchParams.append(key, value);
          }
        }
      }
    }

    if (params.pagination) {
      url.searchParams.append("_page", params.pagination.page as string);
      url.searchParams.append("_limit", params.pagination.limit as string);
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error("Error fetching list");

    const data = await response.json();
    const total = Number(response.headers.get("X-Total-Count"));

    return {
      data,
      total,
    };
  },

  getOne: async (resource, id) => {
    await sleep(3000);
    const response = await fetch(`${API_URL}/${resource}/${id}`);
    if (!response.ok) throw new Error("Error fetching item");
    const data = await response.json();
    return { data };
  },

  create: async (resource, payload) => {
    await sleep(3000);
    const response = await fetch(`${API_URL}/${resource}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Error creating item");
    const data = await response.json();
    return { data };
  },

  update: async (resource, id, payload) => {
    await sleep(3000);
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Error updating item");
    const data = await response.json();
    return { data };
  },

  delete: async (resource, id) => {
    await sleep(3000);
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Error deleting item");
  },
};
