import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { urls } from '../constants'

// Aquí hay que pasar la paginación
export const getHouses = createAsyncThunk(
  'houses/getHouses',
  async (options = { page: 1, max: 9 }) => {
    const { page, max } = options
    const res = await fetch(`${urls.houses}?_page=${page}&_limit=${max}`)
    const data = await res.json()
    return data
  },
)

const initialState = {
  reqStatus: 'initial',
  isLoading: false,
  isSuccess: false,
  isError: false,
  houses: {
    byId: {},
    allIds: [],
  },
  housesFilter: {
    city: '',
    type: '',
  },
}

const housesSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {
    setHousesTypeFilter: (state, action) => {
      state.housesFilter.type = action.payload
    },
    setHousesCityFilter: (state, action) => {
      state.housesFilter.city = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHouses.pending, (state) => {
      state.reqStatus = 'loading'
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
    })
    builder.addCase(getHouses.fulfilled, (state, action) => {
      state.reqStatus = 'success'
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      action.payload.forEach((house) => {
        state.houses.byId[house.id] = house
        if (!state.houses.allIds.includes(house.id)) {
          state.houses.allIds.push(house.id)
        }
      })
    })
    builder.addCase(getHouses.rejected, (state) => {
      state.reqStatus = 'failed'
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
    })
  },
})

export const { setHousesTypeFilter, setHousesCityFilter, setPage } =
  housesSlice.actions
export default housesSlice.reducer
