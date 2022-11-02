import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as cartService from '~/apiServices/cartService';
import store from '~/app/store';

export const addCart = createAsyncThunk('cart/add', async (params, thunkApi) => {
    const id_user = store.getState().auth.user.id_user;
    const newParams = { id_user, ...params };
    console.log(newParams);
    const res = await cartService.addCart(newParams);
    return newParams;
});
export const getCart = createAsyncThunk('cart/get', async (params, thunkApi) => {
    const res = await cartService.getCart(params);
    return res;
});
const initialState = {total : 0, items : []};
const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        INCREASE_QUANTITY: (state, action) => {
            const id = state.length;
            state.push({ id, ...action.payload });
        },
        DECREASE_QUANTITY: (state, action) => {
            state = state;
        },
        DELETE_CART_ITEM: (state, action) => {
            state = state;
        },
        CLEAR_CART: (state, action) => {
            state = state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addCart.fulfilled, (state, action) => {
            let isExist = false;
            state.forEach((item) => {
                if (item.id_product === action.payload.id_product) {
                    const { quantity: itemQuantity, ...itemMore } = item;
                    const { quantity: payloadQuantity, ...payloadMore } = action.payload;

                    console.log(JSON.stringify(itemMore), JSON.stringify(payloadMore));
                    if (JSON.stringify(itemMore) === JSON.stringify(payloadMore)) {
                        item.quantity += payloadQuantity;
                        isExist = true;
                    }
                }
            });
            if (!isExist) {
                state.push(action.payload);
            }
        });
        builder.addCase(getCart.fulfilled, (state, action) => {
            const {items, total} = action.payload;
            state.total = total;
            state.items = items;
        });
    },
});
const { reducer, actions } = cart;
export const { INCREASE_QUANTITY, DECREASE_QUANTITY, DELETE_CART_ITEM, CLEAR_CART } = actions;
export default reducer;
