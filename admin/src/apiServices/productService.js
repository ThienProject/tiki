import * as request from "utils/request";

export const getPromotionToDay = async (q) => {
  try {
    const result = await request.get(`product/promotion`, {
      params: {
        q,
      },
    });
    return result.data;
  } catch (error) {
    console.warn(error);
    return null;
  }
};
export const getProductLimit = async (offset, size, idUser, category, productId) => {
  try {
    const result = await request.get(`product/limit`, {
      params: {
        id_user: idUser,
        offset,
        size,
        category,
        product_id: productId,
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createProduct = async (formData) => {
  const response = await request.post("/product/create", formData);
  return response.data;
};
