import pool from '../configs/connectBD'

const getPromotion = async (req, res) => {
  const id_promotion = req.query.q
  const [
    rows,
    fields,
  ] = await pool.execute(`SELECT DISTINCT  product.*, image.*,
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
            order by product.price DESC`)
  return res.status(200).json({
    data: rows,
  })
}

const getProducts = async (req, res) => {
  const offset = req.query.offset;
  const size = req.query.size == 'all'
      ? '18446744073709551615' : req.query.size;
  const category =
    req.query.category != 'products'
      ? `'${req.query.category}'`
      : 'category.cate_name'
  const product_id = req.query.product_id
    ? `'${req.query.product_id}'`
    : 'product.id_product'
  const query = `SELECT product.* , type.*, category.* , user.* , shop.* 
  FROM product, type, category ,user, shop
    where product.id_type = type.id_type 
    and type.id_cate = category.id_cate
    and product.id_shop = user.id_user
    and category.cate_name = ${category}
    and product.id_product = ${product_id}
    and product.id_shop = shop.id_shop
    order by product.id_product
    limit  ${offset}, ${size}`
  const [row_products, fields_products] = await pool.execute(query)

  const [
    row_images,
    fields_images,
  ] = await pool.execute(`SELECT image.* FROM image, product
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
    

  const [row_colors, fields_colors] = await pool.execute(`
        SELECT 
        color.*, color_code.*, image.image_link 
        FROM color, image, color_code, product
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
    and color.id_color = color_code.id_color
    `)

  const [
    row_rate,
    fields_rate,
  ] = await pool.execute(`SELECT rate.*, user.fullname, \`order\`.date_received 
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
    `)

  const [
    row_promotions,
    fields_promotion,
  ] = await pool.execute(`SELECT product.id_product, product.price as price_root, promotion.percent, (product.price * (1 - promotion.percent/100) ) as price_discount  
    FROM  product , promotion , type, category
    where product.id_type = type.id_type 
    and type.id_cate = category.id_cate
    and category.cate_name = ${category}
    and product.id_product = ${product_id} 
    and promotion.id_promotion = product.id_promotion
    limit ${offset}, ${size}`)

  const [
    row_sizes,
    fields_sizes,
  ] = await pool.execute(`SELECT size.* FROM size, product
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
    `)

  const [
    row_brand,
    fields_brand,
  ] = await pool.execute(`SELECT product.id_product, brand.*
    FROM  product , type, category, brand
    where product.id_type = type.id_type 
    and type.id_cate = category.id_cate
    and category.cate_name = ${category}
    and product.id_product = ${product_id} 
    and brand.id_brand = product.id_brand
    limit ${offset}, ${size}`)

  const [
    row_sold,
    fields_sold,
  ] = await pool.execute(`SELECT detail_order.id_product ,sum(detail_order.quantity) as sold
     FROM detail_order , product
     WHERE detail_order.id_product = ${product_id}
     GROUP by detail_order.id_product
     `)

  row_products.forEach((product) => {
    const formatter = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    })
    product.price = formatter.format(product.price)
    product.avatar = process.env.URL + '/images/users/' + product.avatar
    row_images.forEach((image) => {
      if (product.id_product === image.id_product) {
        if (!Array.isArray(product.images)) {
          product.images = []
        }
        image.image_link =
          process.env.URL + '/images/products/' + image.image_link
        product.images.push(image)
      }
    })
    row_colors.forEach((color) => {
      if (color.id_product === product.id_product) {
        if (!Array.isArray(product.colors)) {
          product.colors = []
        }
        color.image_link =
          process.env.URL + '/images/products/' + color.image_link
        product.colors.push(color)
      }
    })

    row_sizes.forEach((size) => {
      if (size.id_product === product.id_product) {
        if (!Array.isArray(product.sizes)) {
          product.sizes = []
        }

        product.sizes.push(size)
      }
    })

    row_rate.forEach((rate) => {
      if (rate.id_product === product.id_product) {
        if (!Array.isArray(product.rates)) {
          product.rates = []
        }
        product.rates.push(rate)
      }
    })

    row_promotions.forEach((promotion) => {
      if (promotion.id_product === product.id_product) {
        product.price_discount = formatter.format(promotion.price_discount)
        product.percent = promotion.percent
      }
    })

    row_brand.forEach((brand) => {
      if (brand.id_brand === product.id_brand) {
        product.brand = brand.brand_name
      }
    })
    if (!product.brand) {
      product.brand = 'no brand'
    }

    row_sold.forEach((sold) => {
      if (sold.id_product === product.id_product) {
        product.sold = sold.sold
      }
    })
    if (!product.sold) {
      product.sold = 0
    }
  })

  return res.status(200).json({
    data: row_products,
  })
}

const getProductsByShop = async(req, res) =>{
  const  {id_shop} = req.body;
  if(!id_shop) id_shop = 1;
  try {
      const result = await pool.query(`select * from product where id_shop = '${id_shop}'`);
      const [rows, fields] = result;
      return res.send({data: rows});   
  } catch (error) {
      console.log(error);
  }

}

const create = async (req, res, next) => {
  let { id_shop, product_name, colors, description, type, price
    } = req.body;
  const imageColors = req.files['colors[image]'];
  const idColors = colors.id_color;
  const imageMain = req.files['image_main'][0].filename;
  console.log("image_main :", imageMain);
  console.log("imageColors :", imageColors);

  // console.log(imageMain, imageColors);
  if( !id_shop || !product_name || !colors || !description || !type || !price ) {
    return res.status(200).json({
      message: 'missing required params',
    });
  } else if (idColors?.length > 0 && !imageColors) {
    // Handle the case where no color files were uploaded
    console.log('No color files uploaded');
  } else {
    // console.log("colors", colors);
    const [rows, fields] = await pool.execute(`SELECT id_product from product ORDER BY id_product DESC limit 1`);
    const id_productOld = rows[0].id_product;
    let id_productNew = ((+(id_productOld.slice(2)) + 1)).toString();
    id_productNew = "PD" + ( id_productNew.length <= 2 ? "0" + id_productNew : id_productNew );
    const [rows2, fields2] = await pool.execute(`SELECT id_img from image ORDER BY id_img DESC limit 1`);
    let id_image = (+rows2[0].id_img) + 1;
    console.log(id_image);
    try {
      await pool.execute(`insert into product(id_product, id_shop, product_name, description, id_type, price) values ('${id_productNew}', '${id_shop}', '${product_name}', '${description}', '${type}', '${price}')`);
      let queryImage = `insert into image(id_img, id_product, image_link) values (${id_image},'${id_productNew}', '${imageMain}')`;
      let queryColor = `insert into color(id_color, id_product, color_quantity, color_image) values `;
      for(let i = 0; i < imageColors.length; i++) {
        id_image += 1;
        queryImage += `,(${id_image}, '${id_productNew}', '${imageColors[i].filename}')`;
        queryColor += `(${idColors[i]}, '${id_productNew}','10',${id_image}),`;
      }
      queryColor = queryColor.substring(0, queryColor.length - 1);
      await pool.execute(queryImage);
      await pool.execute(queryColor);
      return res.status(200).json({
        message: 'success',
      })


    } catch (error) {
      throw error;
    }
    
  }
}
export {getPromotion, getProducts, getProductsByShop, create }
