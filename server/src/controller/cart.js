import {validateToken} from '../middleware/JWT'
import pool from '../configs/connectBD'
const formatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0,
})


export const deleteCart = async (req, res)=>{
  const {id_user} = req.body;
  // console.log(req.headers.authorization);
  try {
    const result = await pool.execute(
      `delete from cart where id_user = '${id_user}'`,
    )
    return res.status(200).json({status:'delete success'});
  } catch (error) {
    console.log (error);
    return res.status(404).json({ error });
  }
}
export const addCart = async (req, res) => {
  let { id_user, id_shop, id_product, id_size, id_color, quantity } = req.body

  try {
    const [rows, fields] = await pool.execute(
      `insert into cart(id_user, id_shop,id_product, id_size, id_color, quantity) value (${id_user}, ${id_shop}, '${id_product}', ${id_size}, ${id_color}, ${quantity})`,
    )
    return res.status(200).json({data: {id_cart: rows.insertId, status: 'success'}});
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
      return res.status(200).json('update success')
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
export const updateChecked =  async (req, res) =>{
  let {id_user, checked, id_shop, id_cart } = req.body;
  const condition = id_cart && {id_cart} || id_shop &&  {id_shop} || {id_user};
  // console.log(req.body);
  // console.log(condition);
  console.log(`update cart SET checked = '${checked}' WHERE ${[condition]}  = '${Object.values(condition)[0]}'
  and id_user = '${id_user}'`);
  try {
    const result = await pool.execute(
      `update cart SET checked = '${checked}' WHERE ${Object.keys(condition)[0]}  = '${Object.values(condition)[0]}'
                                                and id_user = '${id_user}'`,
    )
    return res.status(200).json('update success');
  } catch (error) {
      throw (error);
  }

}
export const getCart = async (req, res) => {
  const id_user = req?.query?.id_user

  if (id_user) {
    try {
      const [rows, fields] = await pool.execute(`SELECT shop.id_shop, shop.shop_name,
      cart.id_cart,
      cart.checked,
      cart.id_product, cart.quantity, 
      product.product_name, product.price, (product.price * cart.quantity) as into_money, cart.id_size, cart.id_color,
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
     GROUP by  cart.id_cart
     order by shop.id_shop
     `)
      
      const cart_items = [];
      let total = rows.length;
      let money_checked = 0;
      let checked_shop = 1;
      let allChecked = 1;
      rows.forEach((item) => {
      
      const { id_shop, shop_name, ...moreProduct } = item;
      moreProduct.price = formatter.format(moreProduct.price);
      moreProduct.into_money = formatter.format(moreProduct.into_money);
      moreProduct.image = process.env.URL + '/images/products/' + moreProduct.image;
      if(moreProduct.checked == 0){
        checked_shop = 0;
        allChecked = checked_shop;
      }
      else{
        const  priceFloat = Number.parseFloat((moreProduct.into_money).substring(0, moreProduct.into_money.length - 2).replace(/\./g, ''));
        money_checked += priceFloat;
      }


        const indexShop = cart_items.findIndex((data) => {
          return data.id_shop === item.id_shop
        })
       
        //existing in cart_items;
        if (indexShop !== -1) {
          const shop = cart_items[indexShop];
          shop.checked = checked_shop;

          shop.products.push(moreProduct);
        } else {
          checked_shop = moreProduct.checked;
          cart_items.push({ id_shop: id_shop, shop_name, checked : checked_shop, products: [moreProduct] })
        }
      })
      money_checked = formatter.format(money_checked)
      const newData = { items: cart_items, total, checked : allChecked, money_checked};
      return res.status(200).json({ data: newData })
    } catch (error) {
      console.log(error);
      return res.status(400).json(error)
    }
  }
}


