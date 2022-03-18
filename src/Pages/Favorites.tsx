import React from 'react';
import FavoriteCard from '../Components/FavoriteCard'
import '../Style/Favorites.css'
import {favoriteInterface} from "../types"
import useLogic from '../Hooks/FavoriteLogic'


function Favorites() {
    const {db} = useLogic()
    return (
        <div className='page-container' >
            <h1> Favorites </h1>
            <div className='favourite-card-container' >
                {db?.map((item: favoriteInterface)=> {
                    return <FavoriteCard key={item.key} data={{key: item.key, cityName: item.cityName}} />
                })
                }
            </div>
        </div>
    );
}

export default Favorites;
