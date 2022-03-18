import {store} from "../store/store";

export interface favoriteInterface { key: string, cityName: string}

export interface cityInterFace {city: string, country: string, Key: string,key?:string}

export interface forcastData {
    Date: string
    Icon: number
    IconPhrase: string
    HasPrecipitation: boolean
    PrecipitationType: string
    PrecipitationIntensity: string
    Day: DayNight
    Night: DayNight
    Sources: string[]
    Temperature: {
        Maximum: minMax
        Minimum: minMax
    }
}
export interface DailyForecastsInterface {
    Headline?: {
        Category: string
        EffectiveDate: string
        EffectiveEpochDate: number
        EndDate: string
        EndEpochDate: number
        Link: string
        MobileLink: string
        Severity: number
        Text: string
    }
    DailyForecasts: Array<forcastData>
}
export interface minMax {
    Value: number
    Unit: string
    UnitType: number
}
export interface DayNight {
    HasPrecipitation: boolean
    Icon: number
    IconPhrase: string
}
export interface weatherState {
    fiveDays: DailyForecastsInterface
    cityName: string
    key: string
    unit:string,
}
export interface GeoInterface {
 data: {
     Key: string
     AdministrativeArea: {
         LocalizedName: string
     }
 }
}


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
