import {useAppSelector} from "../store/hooks";
import {useEffect, useState} from "react";
import {cityInterFace} from "../types"
import {useAppDispatch} from "../store/hooks";
import {setUnit} from "../store/weather/weatherSlice";


export default function useLogic(){

    const [todayTemp, setTodayTemp] = useState('')
    const [todayIcon, setTodayIcon] = useState('')
    const [isInFavorites,setInFavorites] = useState<Boolean>(false);
    const favorites : Array<cityInterFace>= JSON.parse(localStorage.getItem('taskDB') || "[]")
    const dispatch = useAppDispatch()
    const weatherData = useAppSelector((state) => state.weather)


    function changeTemperature(event: any){
        if(event.target.checked){
            dispatch(setUnit('F'))
        } else dispatch(setUnit('C'))

    }

    function getDayName(date: string) {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const d = new Date(date);
        return days[d.getDay()];
    }


    function calculateCSum(minF: number, maxF: number){
        const minC = (5/9) * (minF - 32)
        const maxC = (5/9) * (maxF - 32)
        const average = weatherData.unit === "F" ? (minF + maxF) / 2 : (minC + maxC) / 2
        if(weatherData.unit === 'F'){
            return [minF.toFixed(2), maxF.toFixed(2), average.toFixed()]
        } else return [minC.toFixed(1), maxC.toFixed(1), average.toFixed()]

    }

    function getTodayIcon(id: number) {
        setTodayIcon(id.toString())
    }

    function addFavorite(){
       const payload = {
           cityName: weatherData.cityName,
           key: weatherData.key,
       }

       if(!localStorage.getItem('taskDB')){
           localStorage.setItem('taskDB', JSON.stringify([payload]))
           setInFavorites(true);
       } else {
           const newPayload = JSON.parse(localStorage.getItem("taskDB") || '[]')
           const isFound = newPayload.find((item:cityInterFace)=>item.key === payload.key)
           const _payload = isFound ? newPayload.filter((item:cityInterFace)=>item.key !== payload.key) : [
               ...newPayload,payload
           ]
           localStorage.setItem('taskDB', JSON.stringify(_payload))
           setInFavorites(!isFound);
       }
    }

    useEffect(() => {

        if(weatherData.cityName !== ''){
           const temp = calculateCSum(weatherData.fiveDays.DailyForecasts[0].Temperature.Minimum.Value, weatherData.fiveDays.DailyForecasts[0].Temperature.Maximum.Value)
            getTodayIcon(weatherData.fiveDays.DailyForecasts[0].Day.Icon)
            setTodayTemp(temp[0])
        }
        setInFavorites(!!favorites.find(item=>item.key === weatherData.key))
    },[weatherData])

    return{
        weatherData,
        getDayName,
        todayTemp,
        calculateCSum,
        todayIcon,
        addFavorite,
        isInFavorites,
        changeTemperature
    }
}
