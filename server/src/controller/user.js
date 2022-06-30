import pool from '../configs/connectBD';


const getAllUser = async (req, res)=>{
    const [rows, fields] = await pool.execute('SELECT * FROM USER');

        return res.status(200).json({
                message :"ok kkk",
                data : rows
                
            })
}
const searchShop = async (req, res)=>{
   // console.log(req)
    const  key = req.query.q;
    const [rows, fields] = await pool.execute(`SELECT user.* 
    from  user
    WHERE user.id_user in(
               SELECT us.id_user from (
                (SELECT user.id_user , sum(star_product) as star_shop 
                from user, product, 
                           (SELECT  product.id_user as id_shop, sum(rate.star) as star_product 
                            from user, product, rate
                            WHERE 	user.id_user = product.id_user
                                   and product.id_product = rate.id_product
                            GROUP by product.id_product) as star 
                WHERE star.id_shop = user.id_user
                    and product.id_user = user.id_user
                    and	product.name like "${key}%" or user.shop_name LIKE "%${key}%" 
                GROUP by user.id_user
                order by star_shop DESC
                 LIMIT 0, 10
                )
               ) as us
   )
    or  user.id_user in 
       (SELECT DISTINCT user.id_user
       FROM product, user 
       WHERE user.id_user = product.id_user
       and	product.name like "%${key}%" or user.shop_name LIKE "%${key}%"
        order by user.id_user ASC
        
       )
       LIMIT 0, 10
    `);
    return res.status(200).json({
        message :"success",
        data : rows
    })
}
const create = async (req, res) =>{

    if(0==0){
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
            message : 'success'
        })
    }
    else {
        console.log("fail");
        return res.status(200).json({
            req,
            message: 'missing data'
        })
    }
}
const dlt = async (req, res) =>{
    let id_user = req.params.id;
    if (!id_user) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await pool.execute('delete from user where id_user = ?', [id_user])
    return res.status(200).json({
        
        message: 'success'
    })
}
const update = async (req, res) =>{

    if(req.body){
        let {id_user, name, birth_day, phone,
            id_card, email, sex, address,
            username, password, avatar, id_permission,
            status 
        } = req.body;
    
        if (!id_user || !username || !email || !password) {
            return res.status(200).json({
                message: 'missing required params'
            })
        }

        await pool.execute('update user set name = ?, birth_day = ?, phone = ?, id_card = ?, email = ?, sex = ?, address = ?, username = ?, password = ?, avatar = ?, id_permission = ?, status = ? where id_user = ?',


            [    name, birth_day, phone,
                id_card, email, sex, address,
                username, password, avatar, id_permission,
                status ,id_user]);

        return res.status(200).json({
            message : 'success'
        })
    }
    else {
        return res.status(200).json({
          
            message: 'missing data'
        })
    }
}
module.exports = {
    getAllUser,
    create,
    dlt,
    update,
    searchShop
}