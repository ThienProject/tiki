import * as request from "utils/request";

const getTypes = async () => {
  try {
    const result = await request.get("types");
    return result.data;
  } catch (error) {
    console.warn(error);
    return null;
  }
};
export default getTypes;
