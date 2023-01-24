import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { urls } from '../constants'

export const getHouses = createAsyncThunk('houses/getHouses', async () => {
  const res = await fetch(urls.houses)
  const data = await res.json()
  return data
})

const initialState = {
  reqStatus: 'initial',
  houses: {
    byId: {},
    allIds: [],
  },
  housesFilter: {
    city: '',
    type: '',
  },
  page: {
    firstPage: 9,
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
    })
    builder.addCase(getHouses.fulfilled, (state, action) => {
      state.reqStatus = 'success'
      action.payload.forEach((house) => {
        state.houses.byId[house.id] = house
        if (!state.houses.allIds.includes(house.id)) {
          state.houses.allIds.push(house.id)
        }
      })
    })
    builder.addCase(getHouses.rejected, (state) => {
      state.reqStatus = 'failed'
    })
  },
})

export const { setHousesTypeFilter, setHousesCityFilter, setPage } =
  housesSlice.actions
export default housesSlice.reducer
