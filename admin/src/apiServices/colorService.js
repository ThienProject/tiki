import * as request from "utils/request";

const getColors = async () => {
  try {
    const result = await request.get("colors");
    return result.data;
  } catch (error) {
    console.warn(error);
    return null;
  }
};
export default getColors;
