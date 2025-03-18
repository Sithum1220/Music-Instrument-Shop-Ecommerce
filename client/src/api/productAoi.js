
const BASE_URL = "http://localhost:4000"; // Replace this with your backend URL

// export const addProduct = async (productData) => {
//   try {
//     const response = await fetch(`${BASE_URL}/products/add`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//       body: JSON.stringify(productData),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to add product");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     throw new Error("Failed to add product");
//   }
// };
export const addProduct = async (productData) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage

  try {
    const response = await fetch(`${BASE_URL}/products/add`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`, // Include the token in the headers
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error("Failed to add product");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to add product");
  }
};
