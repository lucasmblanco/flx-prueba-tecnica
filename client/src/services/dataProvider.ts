const API_URL = "http://localhost:4000";

export const dataProvider = {
  getList: async (resource, params = {}) => {
    const url = new URL(`${API_URL}/${resource}`);

    if (params.filters) {
      for (const [key, value] of Object.entries(params.filters)) {
        if (value !== "") {
          url.searchParams.append(`${key}_like`, value);
        }
      }
    }

    if (params.pagination) {
      url.searchParams.append("page", params.pagination.page);
      url.searchParams.append("limit", params.pagination.limit);
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
    const response = await fetch(`${API_URL}/${resource}/${id}`);
    if (!response.ok) throw new Error("Error fetching item");
    const data = await response.json();
    return { data };
  },

  create: async (resource, payload) => {
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
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Error deleting item");
  },
};
