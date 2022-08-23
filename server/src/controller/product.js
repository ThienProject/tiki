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
    const category = req.query.category != 'products' ? `'${req.query.category}'` : 'category.cate_name';
    const product_id =  req.query.product_id ? `'${req.query.product_id}'` : 'product.id_product';
    const query = `SELECT product.* , type.*, category.*  FROM product, type, category
    where product.id_type = type.id_type 
    and type.id_cate = category.id_cate
    and category.cate_name = ${category}
    and product.id_product = ${product_id}
    limit  ${offset}, ${size}`
    console.log(query)
    const [row_products, fields_products] = await pool.execute(query);

    const [row_images, fields_images] =  await pool.execute(`SELECT image.* FROM image, product
    INNER JOIN 
	(select id_product 
            	from product , type, category
    where product.id_type = type.id_type 
    and type.id_cate = category.id_cate
    and category.cate_name = ${category}
    and product.id_product = ${product_id}
                order by id_product ASC
        		limit ${offset}, ${size}
	) as product2
ON product.id_product = product2.id_product 
    WHERE image.id_product = product.id_product 
    `);

    const [row_colors, fields_colors] =  await pool.execute(`SELECT color.*, image.image_link FROM color, image, product
    INNER JOIN 
	(select id_product 
            	from product , type, category
    where product.id_type = type.id_type 
    and type.id_cate = category.id_cate
    and category.cate_name = ${category}
    and product.id_product = ${product_id}
                order by id_product ASC
        		limit ${offset}, ${size}
	) as product2
    ON product.id_product = product2.id_product 
    WHERE color.id_product = product.id_product
    and color.color_image = image.id_img
    `);



    const [row_rate, fields_rate] =  await pool.execute(`SELECT rate.*, user.name, \`order\`.date_received 
    FROM rate,  user,  \`order\`, detail_order,
    product INNER JOIN 
	(select id_product 
            	from product , type, category
    where product.id_type = type.id_type 
    and type.id_cate = category.id_cate
    and category.cate_name = ${category}
    and product.id_product = ${product_id}
                order by id_product ASC
        		limit ${offset}, ${size}
	) as product2
    ON product.id_product = product2.id_product 
    WHERE rate.id_product = product.id_product
    and rate.id_user = user.id_user
    and rate.id_product = detail_order.id_product 
    and detail_order.id_order = \`order\`.id_order
    and rate.id_user = \`order\`.id_user
    `);

    const [row_promotions, fields_promotion] = await pool.execute(`SELECT product.id_product, product.price as price_root, promotion.percent, (product.price * (1 - promotion.percent/100) ) as price_discount  
    FROM  product , promotion , type, category
    where product.id_type = type.id_type 
    and type.id_cate = category.id_cate
    and category.cate_name = ${category}
    and product.id_product = ${product_id} 
    and promotion.id_promotion = product.id_promotion
    limit ${offset}, ${size}`);

    const [row_sizes, fields_sizes] =  await pool.execute(`SELECT size.* FROM size, product
    INNER JOIN 
	(select id_product 
            	from product , type, category
    where product.id_type = type.id_type 
    and type.id_cate = category.id_cate
    and category.cate_name = ${category}
    and product.id_product = ${product_id}
                order by id_product ASC
        		limit ${offset}, ${size}
	) as product2
    ON product.id_product = product2.id_product 
    WHERE size.id_product = product.id_product
    `);


    const [row_brand, fields_brand] = await pool.execute(`SELECT product.id_product, brand.*
    FROM  product , type, category, brand
    where product.id_type = type.id_type 
    and type.id_cate = category.id_cate
    and category.cate_name = ${category}
    and product.id_product = ${product_id} 
    and brand.id_brand = product.id_brand
    limit ${offset}, ${size}`);
    
     const [row_sold, fields_sold] = await pool.execute(`SELECT detail_order.id_product ,sum(detail_order.quantity) as sold
     FROM detail_order , product
     WHERE detail_order.id_product = ${product_id}
     GROUP by detail_order.id_product
     `)

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
            if(color.id_product === product.id_product){
                if(!Array.isArray(product.colors)) {
                    product.colors = [];
                }  
                color.image_link = process.env.URL +"/images/products/" +color.image_link;
                product.colors.push(color);
            }
            
        });

        row_sizes.forEach((size)=>{
            if(size.id_product === product.id_product){
                if(!Array.isArray(product.sizes)) {
                    product.sizes = [];
                }  
                
                product.sizes.push(size);
            }
            
        });

        row_rate.forEach((rate)=>{
            if(rate.id_product === product.id_product){
                if(!Array.isArray(product.rates)) {
                    product.rates = [];
                }  
                product.rates.push(rate);
            }
            
        });

        row_promotions.forEach((promotion)=>{
            if(promotion.id_product === product.id_product){
                product.price_discount = formatter.format(promotion.price_discount);
                product.percent = promotion.percent;
            }
        })

        row_brand.forEach((brand)=>{
            if(brand.id_brand === product.id_brand){
                product.brand = brand.brand_name;
            }
        })
        if(!product.brand){
            product.brand = 'no brand' ;
        }

        row_sold.forEach((sold)=>{
            if(sold.id_product === product.id_product){
                product.sold = sold.sold;
            }
        })
        if(!product.sold){
            product.sold = 0 ;
        }
    })

    return res.status(200).json({
        data:row_products
    })
}
export {
    getPromotion,
    getProducts
}