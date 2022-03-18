import { Card } from "@mui/material";
import "../Style/FavoriteCard.css";
import React, { useEffect, useState } from "react";
import { favoriteInterface } from "../types/index";
import useLogic from "../Hooks/FavoriteLogic";
import SearchBarUseLogin from "../Hooks/WeeklyDataCotainerLogic";
import { DailyForecastsInterface } from "../types";
import { useNavigate } from "react-router-dom";
import {useAppSelector} from "../store/hooks";

export default function OutlinedCard(props: any) {
  const { data }: { data: favoriteInterface } = props;
  const [apiData, setApiData] = useState<DailyForecastsInterface>({DailyForecasts: [],});
  const { calculateCSum } = SearchBarUseLogin();
  const { getCityWeather } = useLogic();
  const navigate = useNavigate();
  const {unit} = useAppSelector((state)=> state.weather)


  useEffect(() => {
    getCityWeather(data.cityName, data.key).then((data) => {
      setApiData(data);
    });
  }, []);
  function onBrowse() {
    navigate(`/${data.key}/${data.cityName}`);
  }
  return (
    <Card variant='outlined' className='favorite-card' onClick={onBrowse}>
      <div>
        {data.cityName}
        {apiData.DailyForecasts[0] && (
          <>
            <div>
              {
           `     ${calculateCSum(
                  apiData.DailyForecasts[0]?.Temperature.Minimum.Value,
                  apiData.DailyForecasts[0]?.Temperature.Maximum.Value
                )[2]} ° ${unit} `
              }
            </div>
          </>
        )}
      </div>

      <div>
        <img
          src={
            apiData.DailyForecasts[0]
              ? require(`../imgaes/${apiData.DailyForecasts[0]?.Day.Icon}.png`)
              : require(`../imgaes/search.gif`)
          }
        />
        <h3>{apiData.DailyForecasts[0]?.Day.IconPhrase}</h3>
      </div>
    </Card>
  );
}
