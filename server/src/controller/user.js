import pool from '../configs/connectBD'
import {
  createTokens,
  validateToken,
  refreshTokens,
  validateRefreshToken,
} from '../middleware/JWT'
const saltRounds = 10
const bcrypt = require('bcrypt')
const getAllUser = async (req, res) => {
  const [rows, fields] = await pool.execute('SELECT * FROM USER')

  return res.status(200).json({
    message: 'ok kkk',
    data: rows,
  })
}
const getAddress = async (req, res) => {
  //  const idUser =  req.params.id; // use in http/:id
  const idUser = req.query.id
  // console.log(req.params)
  const [rows, fields] = await pool.execute(`
    SELECT address.*, village.*, district.*, city.* FROM address, user , district, village, city
    WHERE address.id_user = user.id_user 
        AND user.id_user = '${idUser}'
    and village.id_district = district.id_district
    and address.id_village = village.id_village
    and district.id_city = city.id_city

    `)
  return res.status(200).json({
    message: 'success',
    data: rows,
  })
}
const searchShop = async (req, res) => {
  // console.log(req)
  const key = req.query.q
  const [rows, fields] = await pool.execute(`SELECT shop.*
    from  shop
    WHERE shop.id_shop in(
               SELECT us.id_shop from (
                (SELECT shop.id_shop , sum(star_product) as star_shop 
                from shop, product,
                           (SELECT  product.id_shop as id_shop, sum(rate.star) as star_product 
                            from shop, product, rate
                            WHERE 	shop.id_shop = product.id_shop
                                 and  shop.id_shop = product.id_shop
                                   and product.id_product = rate.id_product
                            GROUP by product.id_product) as star 
                WHERE star.id_shop = shop.id_shop
                    and product.id_shop = shop.id_shop
                    and product.id_shop = shop.id_shop
                    and	product.product_name like "${key}%" or shop.shop_name LIKE "%${key}%" 
                GROUP by shop.id_shop
                order by star_shop DESC
                 LIMIT 0, 10
                )
               ) as us
   )
    or  shop.id_shop in 
       (SELECT DISTINCT shop.id_shop
       FROM product, shop 
       WHERE shop.id_shop = product.id_shop
       and product.id_shop = shop.id_shop
       and	product.product_name like "%${key}%" or shop.shop_name LIKE "%${key}%"
        order by shop.id_shop ASC
        
       )
       LIMIT 0, 10

    `)

    console.log(rows);
  return res.status(200).json({
    message: 'success',
    data: rows,
  })
}
const create = async (req, res) => {
  if (0 == 0) {
    /*   console.log("has req body"); */
    /* let {   id_user, name, birth_day, phone,
            id_card, email, sex, address,
            username, password, avatar, id_permission,
            status 
        } = req.body; */

    /*  if (!name || !username || !email || !password) {
            return res.status(200).json({
                message: 'missing required params'
            })
        } */

    /*  await pool.execute('insert into user(id_user, name, birth_day, phone, id_card, email, sex, address, username, password, avatar, id_permission, status) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [  id_user, name, birth_day, phone,
                id_card, email, sex, address,
                username, password, avatar, id_permission,
                status]); */

    return res.status(200).json({
      message: 'success',
    })
  } else {
    // console.log('fail')
    return res.status(200).json({
      req,
      message: 'missing data',
    })
  }
}
const dlt = async (req, res) => {
  let id_user = req.params.id
  if (!id_user) {
    return res.status(200).json({
      message: 'missing required params',
    })
  }
  await pool.execute('delete from user where id_user = ?', [id_user])
  return res.status(200).json({
    message: 'success',
  })
}
const update = async (req, res) => {
  if (req.body) {
    let {
      id_user,
      name,
      birth_day,
      phone,
      id_card,
      email,
      sex,
      address,
      username,
      password,
      avatar,
      id_permission,
      status,
    } = req.body

    if (!id_user || !username || !email || !password) {
      return res.status(200).json({
        message: 'missing required params',
      })
    }

    await pool.execute(
      'update user set name = ?, birth_day = ?, phone = ?, id_card = ?, email = ?, sex = ?, address = ?, username = ?, password = ?, avatar = ?, id_permission = ?, status = ? where id_user = ?',

      [
        name,
        birth_day,
        phone,
        id_card,
        email,
        sex,
        address,
        username,
        password,
        avatar,
        id_permission,
        status,
        id_user,
      ],
    )

    return res.status(200).json({
      message: 'success',
    })
  } else {
    return res.status(200).json({
      message: 'missing data',
    })
  }
}
const profile = async (req, res) => {
  let { id } = req.body
  // const accessToken = req.cookies["access-token"];
  const reqToken = req.headers.authorization?.split(' ')
  if (reqToken) {
    const accessToken = reqToken[1]
    if (!accessToken)
      return res.status(400).json({ error: 'User not Authenticated!' })
    try {
      const validToken = validateToken(accessToken)
      if (validToken) {
        req.authenticated = true
        const [rows, fields] = await pool.execute(
          `select * from user where id_user = '${id}'`,
        )
        return res.status(200).json({ data: rows })
      }
    } catch (err) {
      return res.status(403).json({ error: err })
    }
  } else {
    return res.status(400).json({ error: 'please login' })
  }
}

const login = async (req, res) => {
  let { phone, password, email } = req.body
  // console.log(phone);
  try {
    const [rows, fields] = await pool.execute(
      `select * from user where ${email ? 'email' : 'phone'} = '${
        email ? email : phone
      }'`,
    )
    if (rows.length > 0) {
      const hash = rows[0].password
      const match = await bcrypt.compare(password, hash)
      if (match) {
        //  console.log(true)
        const { password, ...user } = rows[0]
        const payload = { fullname: user.fullname, id: user.id_user }
        const accessToken = createTokens(payload)
        // console.log("accessToken :",accessToken );
        const refreshToken = createTokens(payload, true)
        // console.log("refreshToken :", refreshToken);
        return res.status(200).json({
          data: {
            user,
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
        })
      } else {
        return res.status(200).json({ data: 'false' })
      }
    } else {
      return res.status(200).json({ data: 'no_account' })
    }
  } catch (error) {
    return res.status(404).json({ err: error })
  }
}
const getToken = async (req, res) => {
  let { id, name } = req.body
  const payload = { fullname: name, id: id }
  const reqRefreshToken = req.headers.refreshtoken.split(' ')

  const refreshToken = reqRefreshToken[1]

  if (!refreshToken)
    return res.status(400).json({ error: 'User not Authenticated!' })
  try {
    const validRefreshToken = validateRefreshToken(refreshToken)
    console.log(validRefreshToken)
    if (validRefreshToken) {
      req.authenticated = true
      const accessToken = createTokens(payload)
      return res.status(200).json({ data: accessToken })
    }
  } catch (err) {
    return res.status(400).json({ error: err })
  }
}
const register = async (req, res) => {
  let { phone, password, email, fullname } = req.body
  // console.log(fullname)
  bcrypt.hash(password, saltRounds, async function (err, hash) {
    try {
      // console.log(
      //   `insert into user(${
      //     email ? 'email' : 'phone'
      //   }, password, fullname) VALUES (?,?,?)`,
      //   [email ? email : phone, hash, fullname],
      // )
      await pool.execute(
        `insert into user(${
          email ? 'email' : 'phone'
        }, password, fullname) VALUES (?,?,?)`,
        [email ? email : phone, hash, fullname],
      )

      return res.json('success')
    } catch (error) {
      return res.status(400).json({ err: error })
    }
  })
}

module.exports = {
  getAllUser,
  create,
  dlt,
  update,
  searchShop,
  getAddress,
  login,
  register,
  profile,
  getToken,
}
