import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "./userSlice"
import trendingAnimeReducer from '../Utils/trendingAnimeSlice'
import trendingMovieReducer from '../Utils/trendingMovieSlice'
import airingAnimeReducer from '../Utils/airingAnimeSlice';


const appStore = configureStore(
    {
        reducer: {
            user: userReducer,
            trendingAnime: trendingAnimeReducer,
            trendingMovies: trendingMovieReducer,
            airingAnime: airingAnimeReducer,
        }
    }
)

export default appStore;