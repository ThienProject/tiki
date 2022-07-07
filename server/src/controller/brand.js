import pool from "../configs/connectBD";
export const getBrandByType = async (req, res)=>{
    const key = req.query.q ;
    try {
        const [rows, fields] = await pool.execute(`Select * from brand where 
        brand.brand_type = '${key}'
        `)
        return res.status(200).json({
            message : 'success',
            data : rows
        })
    } catch (error) {
       return res.status(400).json({
            message : 'fail'
        })
    }
   
}