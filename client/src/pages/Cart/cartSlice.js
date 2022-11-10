import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as cartService from '~/apiServices/cartService';
import store from '~/app/store';


const insertCart = async (params) =>{
  
    const id_user = store.getState()?.auth?.user?.id_user;
    if (id_user) {
        const { products, ...moreParams } = params;
        const productObject = products[0];
        const newParams = { id_user, ...moreParams, ...productObject };
        const res = await cartService.addCart(newParams);
        console.log( "id new cart :",res.id_cart);
        return res.id_cart;
    }
}
const updateCart = async (id_cart, quantity) =>{
    try {
        await cartService.updateCart(id_cart, quantity);
    } catch (error) {
        throw error;
    }
    
}
const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
})

function calculated(priceString, quantity){
   const  priceFloat = ((priceString).substring(0, priceString.length - 2).replace(/\./g, ''));
   const into_money = priceFloat * quantity;
   return into_money;
}

export const changeAmountCart = createAsyncThunk('cart/update', async(params,thunkApi)=>{
    const {id_shop, id_cart, quantity} = params;
     await updateCart(id_cart, quantity);
     return {id_shop, id_cart, quantity};
})

export const addCart = createAsyncThunk('cart/add', async (params, thunkApi) => {
    const cartCurrent = JSON.parse(JSON.stringify(store.getState()?.cart));
    
    let isExistShop = false;
    const newCartItem = params;
    const newProduct = newCartItem.products[0] || {};
    let into_money = calculated(newProduct.price,newProduct.quantity ) ;
    newProduct.into_money = formatter.format(into_money);


    const promises =  cartCurrent.items.map(async (currentShop) => {
        if (currentShop.id_shop === newCartItem.id_shop){
            isExistShop = true;
            const products = currentShop.products;
            

            const indexProduct = products.findIndex(product => {
                return product.id_product === newProduct.id_product 
                    && product.id_color === newProduct.id_color
                    && product.id_size === newProduct.id_size}
                );

            // Existing product in shop
            if(indexProduct !== -1){
                products[indexProduct].quantity += newProduct.quantity;
                const quantity = products[indexProduct].quantity;
                into_money = (into_money/newProduct.quantity) * quantity;
                products[indexProduct].into_money = formatter.format(into_money);
                await updateCart(products[indexProduct].id_cart,products[indexProduct].quantity)
            }
            else{     
                cartCurrent.total = cartCurrent.total + 1; 
                const id_cart = await insertCart(params);
                newProduct.id_cart = id_cart;
                if(id_cart){
                    console.log(newProduct);
                    products.push(newProduct); 
                }
                
            }
           
        }
    });
    await Promise.all(promises);
    if (!isExistShop) {
        const id_cart =  await insertCart(params);
        newProduct.id_cart = id_cart;
        cartCurrent.items.push(newCartItem);
        cartCurrent.total = cartCurrent.total + 1; 
       
        
    } 
    return cartCurrent;
});



export const getCart = createAsyncThunk('cart/get', async (params, thunkApi) => {
    const res = await cartService.getCart(params);
    return res;
});

const initialState = { total: 0, items: [] };
const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addCart.fulfilled, (state, action) => {
            const { items, total } = action.payload;
            state.total = total;
            state.items = items;
        });
        builder.addCase(getCart.fulfilled, (state, action) => {
            const { items, total } = action.payload;
            state.total = total;
            state.items = items;
        });
        builder.addCase(changeAmountCart.fulfilled, (state, action) => {
            const {id_shop, id_cart, quantity} = action.payload;
           
            state.items.every((shop,indexShop)=>{
                if(shop.id_shop === id_shop ){
                    shop.products.every((product, indexProduct) =>{
                        console.log(product.id_cart , id_cart);
                        if(product.id_cart === id_cart){
                            if(quantity === 0){
                                if(shop.products.length === 1){
                                    //delete a shop
                                    state.items.splice(indexShop,1)
                                }
                                else{
                                    shop.products.splice(indexProduct,1);
                                }
                                return false;
                            }
                            product.quantity = quantity;
                            product.into_money = formatter.format(calculated(product.price, quantity));
                            console.log(product);
                            return false;
                            
                        }
                        return true;
                    })
                    return false;
                }
                else{
                    return true;
                }
            })
        });
    },
});
const { reducer, actions } = cart;
export const {  DELETE_CART_ITEM, CLEAR_CART } = actions;
export default reducer;
