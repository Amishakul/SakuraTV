import TrendingAnime from './Trendinganime'
import AiringAnimeCarousel from "./AiringAnimeCarousel"
import TrendingMovies from './TrendingMovies'




const Home = () => {
  return (
    <div>
      <AiringAnimeCarousel />
      <TrendingAnime />
      <TrendingMovies />


      <br></br>
      <br></br>
    </div>
  )
}

export default Home
