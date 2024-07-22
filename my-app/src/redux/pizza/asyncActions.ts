import { createAsyncThunk } from "@reduxjs/toolkit"
import { Pizza, SearchPizzaParams } from "./types"
import axios from "axios"

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
    'pizza/fetchPizzasById',
    async (params) => {
        const {sortBy, order,category, search, currentPage} = params
      const { data } = await axios.get<Pizza[]>(`https://662553c304457d4aaf9e768b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
      return data
    },
  )