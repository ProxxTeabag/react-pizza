import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CartItem, CartSliceState } from "./types";
import { getCartFromLs } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { calcTotalCount } from "../../utils/calcTotalCount";



const {items, totalPrice, totalCount} = getCartFromLs()

const initialState: CartSliceState = {
    totalPrice,
    totalCount,
    items,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
         const findItem = state.items.find(obj => obj.id === action.payload.id)

         if (findItem) {
            findItem.count++
         } else {
            state.items.push({
            ...action.payload, 
            count: 1
        })
        }
        state.totalPrice = calcTotalPrice(state.items)
        state.totalCount = calcTotalCount(state.items)
         },
        minusItem (state, action: PayloadAction<number>) {
            const findItem = state.items.find(obj => obj.id === action.payload)
            if (findItem) {
                findItem.count--
        }
        state.totalPrice = state.items.reduce((sum, obj) => {
            return (obj.price * obj.count) + sum
             }, 0)
        state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0)
        },
        removeItem(state, action: PayloadAction<number>) {
            state.items = state.items.filter(obj => obj.id !== action.payload)
            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum
                 }, 0)
            state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0)
        },
        clearItems(state) {
            state.items = []
            state.totalPrice =  0
            state.totalCount = 0
        },
    }
    }
)



export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions

export default cartSlice.reducer