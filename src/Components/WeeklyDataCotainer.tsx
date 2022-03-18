import * as React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import "../Style/WeeklyDataContainer.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useLogic from "../Hooks/WeeklyDataCotainerLogic";
import Toggle from "./Toggle";

export default function BasicCard() {
  const {
    isInFavorites,
    weatherData,
    todayTemp,
    getDayName,
    calculateCSum,
    todayIcon,
    addFavorite,
    changeTemperature
  } = useLogic();

  return (
    <div className='weekly-data-container'>
      <div className='detail-container'>
        <div className='city-details'>
          <img
            className='squre'
            src={
              todayIcon !== ""
                ? require(`../imgaes/${todayIcon}.png`)
                : require(`../imgaes/search.gif`)
            }
          />
          <div>
            <h3>{weatherData.cityName}</h3>
            <h3>
              {todayTemp} ° {weatherData.unit}
            </h3>
            <Toggle data={{title: 'Celsius/Fahrenheit', func: changeTemperature}} />
          </div>
        </div>
        <div className='favourite-container'>
          <FavoriteIcon color={isInFavorites ? "error" : "disabled"} />
          <Button
            variant='outlined'
            onClick={addFavorite}
            className='favoriteButton'>
            {isInFavorites ? "Remove Favorites" : "Add to Favorites"}{" "}
          </Button>
        </div>
      </div>
      <h1 className='title'>Scattered Clouds</h1>
      <div className='cards-container'>
        {weatherData?.fiveDays.DailyForecasts?.map((day) => {
          return (
            <Card className='data-card' key={day.Date}>
              {getDayName(day.Date)}
              <h3>
                {todayTemp} ° {weatherData.unit}
              </h3>
              <h4>{`${
                calculateCSum(
                  day.Temperature.Minimum.Value,
                  day.Temperature.Maximum.Value
                )[0]
              } - ${
                calculateCSum(
                  day.Temperature.Minimum.Value,
                  day.Temperature.Maximum.Value
                )[1]
              }`}</h4>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
