import pool from "../configs/connectBD";
const getFeaturedType = async (req, res) => {
  const limit = req.query.limit;
  try {
    const [row, fields] =
    await pool.execute(`SELECT type.* , view.view 
                        FROM    type, 
                                (SELECT product.id_type as id_type, sum(product.view) as view
                                FROM product 
                                GROUP by product.id_type
                                ) as view
                        where type.id_type = view.id_type
                        order by view.view DESC
                        LIMIT ${limit}`);
    return res.status(200).json({
        data : row
    })
  } catch (error) {
    return res.status(400).json({
        message : false,
        error : error
     })
  }

};
const getTypes = async (req, res) => {
  try {
    const [rows, fields] = await pool.execute(`select *from type`);
    return res.status(200).json({ data: rows })
  } catch (error) {
    return res.status(400).json({
      message : false,
      error : error
   })
  }
   
};
export {
    getFeaturedType,
    getTypes,
}
