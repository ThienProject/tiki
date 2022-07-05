import pool from "../configs/connectBD";

const getCategory = async (req, res)=>{
    const [rows, fields] = await pool.execute(`Select *from category`);
    return res.status(200).json({
        data:rows
    })
}
export {
    getCategory
}