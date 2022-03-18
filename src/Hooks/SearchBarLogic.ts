import React, { useState, useEffect } from "react";
import {useAppDispatch} from "../store/hooks";
import {setWeather, setCity, setKey} from "../store/weather/weatherSlice";
import axios from "axios";
import { debounce } from "lodash"
import {cityInterFace, GeoInterface} from "../types"
import { useParams } from "react-router-dom";
import {toast} from "react-toastify";

const apiKey = `fOMWvj7Rbs1tAgENUzvWf1focIYwSa6X`;
export default function useLogic(){
    const [search, setSearch] = useState('')
    const [suggestions, setSuggestions] = useState<cityInterFace[] | []>([])
    const dispatch = useAppDispatch()
    const {cityParam,keyParam} = useParams();

    async function onChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        const debouncedSave = debounce(() => setSearch(e.target.value), 400);
        debouncedSave();
    }

    async function options(str: string) {
        if(str !== '') {
            const res = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${str}&language=en-us`)
            res.data.forEach((city: { LocalizedName: string, Key: string, Country: { LocalizedName: string } }) => {
                const newCity = {
                    city: city.LocalizedName,
                    country: city.Country.LocalizedName,
                    Key: city.Key
                }

                const filterSuggestions = [...suggestions, newCity].reduce((acc: cityInterFace[], current: cityInterFace) => {
                    const x = acc.find(suggestion => suggestion.city === current.city && suggestion.country === current.country);
                    if (!x) {
                        return acc.concat([current]);
                    } else {
                        return acc;
                    }
                }, []);

                setSuggestions(prv => [...filterSuggestions]);
            })
        }else bonusApi()
    }

   async function getCityWeather(city: string, key: string, redux = false){
       try{
           const res = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${apiKey}&language=en-us`)
          if(redux){
              dispatch(setWeather(res.data))
              dispatch(setCity(city))
              dispatch(setKey(key))
          } else return res.data
       }catch(ex) {
        toast.error((ex as Error).message)
       }

    }

  async function onClick(event: any, text: string) {
        if(text === 'selectOption'){
            const start = event.target.innerText.indexOf('-')
            const comma = event.target.innerText.indexOf(',')
            const key = event.target.innerText.slice(start + 2, event.target.innerText.length)
            const cityName = event.target.innerText.slice(0, comma)
          await  getCityWeather(cityName, key, true)
        }
    }



    async function bonusApi(){
        navigator.geolocation.getCurrentPosition((pos) => {
            geoApiRequest(pos.coords.latitude.toString(), pos.coords.longitude.toString())
        }, (err) => {
            getCityWeather('Tel Aviv', '215791', true)
        }, {})

      async function geoApiRequest(lat: string, log: string){
           const res:GeoInterface = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat},${log}`)
         await getCityWeather(res.data.AdministrativeArea.LocalizedName, res.data.Key, true)
      }
    }


    useEffect(() => {
        if(search !== "" ){
            options(search)
        } else if (keyParam) {
            getCityWeather(cityParam as string,keyParam,true);
        }

    }, [search])

    useEffect(()=>{
        if(keyParam) {
            getCityWeather(cityParam as string,keyParam,true)
        }else bonusApi()

    },[])
    return {
    suggestions,
        onChange,
        onClick,
        getCityWeather,

    }

}
