const API_URL = "http://localhost:5000/products";

const request = async (url, options) => {
  let response;

  try {
    response = await fetch(url, options);
  } catch {
    throw new Error(
      "Unable to connect to the backend. Make sure the API is running on port 5000."
    );
  }

  let data = null;

  try {
    data = await response.json();
  } catch {
    if (!response.ok) {
      throw new Error("The server returned an invalid response.");
    }
  }

  if (!response.ok) {
    throw new Error(data?.message || "The request could not be completed.");
  }

  return data;
};

export const getProducts = async () => {
  return request(API_URL);
};

export const addProduct = async (product) => {
  return request(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  });
};

export const updateProduct = async (id, product) => {
  return request(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  });
};

export const deleteProduct = async (id) => {
  return request(`${API_URL}/${id}`, {
    method: "DELETE"
  });
};

export const getLowStockProducts = async () => {
  return request(`${API_URL}/low-stock`);
};
