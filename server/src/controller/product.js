import pool from "../configs/connectBD";
const getPromotion = async (req, res) =>{
    const id_promotion = req.query.q;
    const [rows, fields] = await pool.execute(`SELECT DISTINCT  product.*, image.*,
    promotion.promotion_quantity, promotion.percent ,
    DATE_FORMAT(promotion.date_begin, '%Y-%m-%d %H:%i:%s')  as date_begin, DATE_FORMAT(promotion.date_end,'%Y-%m-%d %H:%i:%s') as date_end,
    detail_promotion.remaining_quantity ,(
        CASE 
            promotion.id_promotion = detail_promotion.id_promotion
            WHEN promotion.promotion_quantity > detail_promotion.remaining_quantity && 
                            detail_promotion.remaining_quantity > 0 THEN 'selling'
            WHEN promotion.promotion_quantity = detail_promotion.remaining_quantity THEN 'not_yet' 
            ELSE 'sold_out'
        END) AS promotion_status 
    from product, image, promotion, detail_promotion
        WHERE promotion.id_promotion = detail_promotion.id_promotion 
            and detail_promotion.id_product = product.id_product
            and promotion.id_promotion = '${id_promotion}'
            and product.id_product = image.id_product 
            GROUP by product.id_product 
            order by product.price DESC`);
    return res.status(200).json({
        data:rows
    })
}
export {
    getPromotion
}