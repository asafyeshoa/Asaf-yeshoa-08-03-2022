import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {DailyForecastsInterface, weatherState} from '../../types'


const initialState  = {
    fiveDays: {},
    cityName: '',
    key: '',
    unit:'C',
} as weatherState

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setWeather: (state, action: PayloadAction<DailyForecastsInterface>) => {
            const payload: DailyForecastsInterface = action.payload
            state.fiveDays = payload
        },
        setCity: (state, action: PayloadAction<string>) => {
            state.cityName = action.payload
        },
        setKey: (state, action: PayloadAction<string>) => {
            state.key = action.payload
        },
        setUnit:(state, action: PayloadAction<string>) => {
            state.unit = action.payload
        },
    },
})

export const { setWeather, setCity, setKey, setUnit} = weatherSlice.actions

export default weatherSlice.reducer
