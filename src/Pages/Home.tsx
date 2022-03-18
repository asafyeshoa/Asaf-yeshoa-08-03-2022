import React from 'react';
import InputWithIcon from '../Components/SearchBar'
import WeeklyDataCotanier from '../Components/WeeklyDataCotainer'
import '../Style/MainContainer.css'

function Home() {


    return (
        <div className='app-container' >
            <InputWithIcon/>
            <WeeklyDataCotanier/>
        </div>
    );
}

export default Home;
