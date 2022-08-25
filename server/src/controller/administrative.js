import pool from "../configs/connectBD";

export async function  getCity(req, res){
    const [rows, fields] = await pool.execute(`select * from city`);
    return res.status(200).json({
        data : rows
    })
}

export async function  getDistrict(req, res){
    const id_city = req.query.idCity;
    const [rows, fields] = await pool.execute(`select district.* from  district
        where district.id_city = '${id_city}'
    `);
    return res.status(200).json({
        data : rows
    })
}

export async function  getVillage(req, res){
    const id_district = req.query.idDistrict;
    const [rows, fields] = await pool.execute(`select * from village 
        where village.id_district = '${id_district}'
    `);
    return res.status(200).json({
        data : rows
    })
}