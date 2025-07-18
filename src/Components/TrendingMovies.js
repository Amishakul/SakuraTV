import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchStart,
  fetchSuccess,
  fetchFailure,
} from '../Utils/trendingMovieSlice';
import ShimmerCard from './ShimmerCard';

const TrendingMovies = () => {
  const dispatch = useDispatch();
  const { movieList, loading } = useSelector((state) => state.trendingMovies);

  const scrollRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      // ✅ Avoid refetching if already available
      if (movieList.length > 0) return;

      dispatch(fetchStart());
      try {
        const res = await fetch(
          'https://api.jikan.moe/v4/top/anime?limit=20&type=movie'
        );
        const data = await res.json();

        const seenTitles = new Set();
        const uniqueMovies = [];

        for (const anime of data.data) {
          const englishTitle = anime.title_english;
          if (englishTitle && !seenTitles.has(englishTitle)) {
            seenTitles.add(englishTitle);
            uniqueMovies.push(anime);
          }
          if (uniqueMovies.length === 20) break;
        }

        dispatch(fetchSuccess(uniqueMovies));
      } catch (err) {
        dispatch(fetchFailure(err.toString()));
        console.error('Failed to fetch trending anime movies:', err);
      }
    };

    fetchTrendingMovies();
  }, [dispatch, movieList]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current && cardRef.current) {
        const cardWidth = cardRef.current.offsetWidth + 16;
        scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current && cardRef.current) {
      const cardWidth = cardRef.current.offsetWidth + 16;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <h2 className="text-2xl font-bold text-purple-600 mb-4 text-center">
        🎬 Top Anime Movies
      </h2>

      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 btn btn-circle btn-sm bg-white shadow hover:bg-purple-100"
        aria-label="Scroll Left"
      >
        ❮
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 btn btn-circle btn-sm bg-white shadow hover:bg-purple-100"
        aria-label="Scroll Right"
      >
        ❯
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar py-2"
      >
        {loading ? (
          <ShimmerCard count={6} type="horizontal" />
        ) : (
          movieList.map((anime, index) => (
            <div
              key={anime.mal_id}
              ref={index === 0 ? cardRef : null}
              className="flex-shrink-0 bg-base-100 shadow-lg rounded-xl overflow-hidden transition hover:scale-105 min-w-[150px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px] max-w-[150px] sm:max-w-[180px] md:max-w-[200px] lg:max-w-[220px] flex flex-col"
            >
              <div className="w-full aspect-[2/3]">
                <img
                  src={anime.images.jpg.large_image_url}
                  alt={anime.title_english || anime.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2">
                <h3 className="text-sm font-semibold truncate">
                  {anime.title_english || anime.title}
                </h3>
                <p className="text-xs text-gray-500">
                  ⭐ {anime.score || 'N/A'} | Ep: {anime.episodes || 'TBD'}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default React.memo(TrendingMovies); // ✅ Memoize component
