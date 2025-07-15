import TrendingAnime from './Trendinganime'
import AiringAnimeCarousel from "./AiringAnimeCarousel"
import TrendingMovies from './TrendingMovies'
import PopularCharacters from './PopularCharacters'



const Home = () => {
  return (
    <div>
      <AiringAnimeCarousel />
      <TrendingAnime />
      <TrendingMovies />
      <PopularCharacters />


      <br></br>
      <br></br>
    </div>
  )
}

export default Home
