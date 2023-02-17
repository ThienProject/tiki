import pool from "../configs/connectBD";

const getColors = async (req, res) => {
  try {
    const [rows, fields] = await pool.execute(`select * from color_code`);
    return res.status(200).json({ data: rows });
  } catch (error) {
    throw error;
  }
};

export { getColors, }
