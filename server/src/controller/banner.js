import pool from '../configs/connectBD';
const getSliderHomeTop= async (req, res)=>{
    const [rows, fields] = await pool.execute(`SELECT * FROM banner where name= 'slider_home_top'`);
        return res.status(200).json({
                data : rows
            })
}
const getHomeBanners = async (req, res) =>{
    const [rows, fields] = await pool.execute(`SELECT * FROM banner where name like 'banner_home%'`);
    return res.status(200).json({
        data : rows
    })
}
export {getSliderHomeTop,
getHomeBanners
}