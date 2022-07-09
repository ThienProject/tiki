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

const getProducts = async (req, res) =>{
    const offset = req.query.offset;
    const size = req.query.size;
    const [row_products, fields_products] = await pool.execute(`SELECT * FROM product 
    limit ${offset}, ${size}`);

    const [row_images, fields_images] =  await pool.execute(`SELECT image.* FROM image, product
    INNER JOIN 
	(select id_product 
            	from product
        		limit ${offset}, ${size}
	) as product2
ON product.id_product = product2.id_product 
    WHERE image.id_product = product.id_product 
    `);

    const [row_colors, fields_colors] =  await pool.execute(`SELECT color.* FROM color, product
    INNER JOIN 
	(select id_product 
            	from product
        		limit ${offset}, ${size}
	) as product2
    ON product.id_product = product2.id_product 
    WHERE color.id_product = product.id_product
    `);

    const [row_promotions, fields_promotion] = await pool.execute(`SELECT product.id_product, product.price as price_root, promotion.percent, (product.price * (1 - promotion.percent/100) ) as price_discount  FROM 	   product , promotion
	WHERE promotion.id_promotion = product.id_promotion
    limit ${offset}, ${size}`);

    row_products.forEach((product)=>{
        const formatter = new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
        });
        product.price = formatter.format(product.price);

        row_images.forEach((image)=>{
            if(product.id_product === image.id_product){
               if(!Array.isArray(product.images)) {
                product.images = [];
                }  
                image.image_link = process.env.URL +"/images/products/" +image.image_link ;
                product.images.push(image)
            }
        });
        row_colors.forEach((color)=>{
            if(!Array.isArray(product.colors)) {
                product.colors = [];
                }  
                product.colors.push(color)
        });
        row_promotions.forEach((promotion)=>{
            if(promotion.id_product === product.id_product){
                product.price_discount = formatter.format(promotion.price_discount);
                product.percent = promotion.percent;
            }
        })
    })

    return res.status(200).json({
        data:row_products
    })
}
export {
    getPromotion,
    getProducts
}