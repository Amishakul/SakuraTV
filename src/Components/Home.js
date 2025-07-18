import TrendingAnime from './Trendinganime'
import AiringAnimeCarousel from "./AiringAnimeCarousel"
import TrendingMovies from './TrendingMovies'
import Footer from './Footer'

const Home = () => {
  return (
    <div>
      <AiringAnimeCarousel />
      <TrendingAnime />
      <TrendingMovies />
      <Footer />
    </div>
  )
}

export default Home
