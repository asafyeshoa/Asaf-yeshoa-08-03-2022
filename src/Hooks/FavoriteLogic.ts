import SearchBarLogin from "./SearchBarLogic";

export default function useLogic(){

    const db  = JSON.parse(localStorage.getItem('taskDB') || "[]")
    const {getCityWeather} = SearchBarLogin()

    return {
        db,
        getCityWeather
    }
}

