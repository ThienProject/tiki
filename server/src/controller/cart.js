import { response } from 'express'
import pool from '../configs/connectBD'
export const addCart = async (req, res) => {
  let { id_user, id_shop, id_product, id_size, id_color, quantity } = req.body

  try {
    const [rows, fields] = await pool.execute(
      `insert into cart(id_user, id_shop,id_product, id_size, id_color, quantity) value (${id_user}, ${id_shop}, '${id_product}', ${id_size}, ${id_color}, ${quantity})`,
    )
    return res.status(200).json('success')
  } catch (error) {
    return res.status(400).json(error)
  }
}

export const updateCart = async(req, res) =>{
  let {id_cart, quantity } = req.body;

  try {
    if(quantity > 0){
      const result = await pool.execute(
        `update cart SET quantity = '${quantity}' WHERE id_cart = '${id_cart}'`,
      )
      return res.status(200).json('delete success')
    }
    else{
      const result = await pool.execute(
        `delete from cart where id_cart = '${id_cart}'`,
      )
      return res.status(200).json('delete success')
    }
    
    
  } catch (error) {
    return res.status(400).json(error)
  }


}
export const getCart = async (req, res) => {
  const id_user = req?.query?.id_user
  if (id_user) {
    try {
      const [rows, fields] = await pool.execute(`SELECT shop.id_shop, shop.shop_name,
      cart.id_cart,
      cart.id_product, cart.quantity, 
      product.product_name, product.price, (product.price * cart.quantity) as 									into_money, cart.id_size, cart.id_color,
      image.image_link as image
   from image, product,cart, shop
   WHERE image.id_product = product.id_product
   and product.id_shop = shop.id_shop
   and cart.id_product = product.id_product
   and if( cart.id_color is NULL, image.id_img in(
       select image.id_img 
        from cart, image,  product  
         where cart.id_product = product.id_product
         and cart.id_user =  '${id_user}'
         and image.id_product = product.id_product
         GROUP by product.id_product
     ) , image.id_img in
     (
           select image.id_img
           FROM cart, color, image, product
           WHERE cart.id_color = color.id_color
           and color.color_image = image.id_img
           and product.id_product = cart.id_product 
           and cart.id_user = '${id_user}'
           GROUP by  product.id_product
      ) 
         )
     GROUP by  cart.id_cart`)
      // console.log(rows);
      const cart_items = []
      let total = rows.length

      rows.forEach((item) => {
        const indexShop = cart_items.findIndex((data) => {
          return data.id_shop === item.id_shop
        })
        const { id_shop,shop_name, ...moreProduct } = item
        let shop = cart_items[indexShop]
        const formatter = new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'VND',
          minimumFractionDigits: 0,
        })
        moreProduct.price = formatter.format(moreProduct.price);
        moreProduct.into_money = formatter.format(moreProduct.into_money)
        moreProduct.image = process.env.URL + '/images/products/' + moreProduct.image
        //existing in cart_items;
        if (indexShop !== -1) {
          const products = shop.products.push(moreProduct)
          shop = { ...shop, products }
        } else {
         
          cart_items.push({ id_shop: id_shop, shop_name, products: [moreProduct] })
        }
      })

      const newData = { items: cart_items, total }
      return res.status(200).json({ data: newData })
    } catch (error) {
      return res.status(400).json(error)
    }
  }
}
