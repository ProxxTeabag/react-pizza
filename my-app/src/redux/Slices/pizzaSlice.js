import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasById',
    async (params) => {
        const {sortBy, order,category, search, currentPage} = params
      const { data } = await axios.get(`https://662553c304457d4aaf9e768b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
      return data
    },
  )


const initialState = {
    items: [],
    status: 'loading', // loading|success|error
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
            state.items = []
        },
    },
    extraReducers: { 
        [fetchPizzas.pending]: (state) => {
            state.status = "loading"
        },
        [fetchPizzas.fulfilled]: (state,action) => {
        state.items = action.payload
        state.status = "success"
    },
         [fetchPizzas.rejected]: (state,action) => {
        state.status = "error"
        state.items = []
    }
} 
    }
)


export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer