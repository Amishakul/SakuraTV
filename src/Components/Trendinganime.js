import React, { useEffect, useRef, useState } from 'react';
import ShimmerCard from './ShimmerCard';

const Trendinganime = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const fetchTrendingAnime = async () => {
      try {
        const res = await fetch('https://api.jikan.moe/v4/top/anime?limit=20');
        const data = await res.json();

        const seenTitles = new Set();
        const uniqueAnime = [];

        for (const anime of data.data) {
          const englishTitle = anime.title_english;
          if (englishTitle && !seenTitles.has(englishTitle)) {
            seenTitles.add(englishTitle);
            uniqueAnime.push(anime);
          }
          if (uniqueAnime.length === 20) break;
        }

        setAnimeList(uniqueAnime);
      } catch (err) {
        console.error('Failed to fetch trending anime:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingAnime();
  }, []);

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

      <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">📈 Trending Anime</h2>

      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 btn btn-circle btn-sm bg-white shadow hover:bg-pink-100"
        aria-label="Scroll Left"
      >
        ❮
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 btn btn-circle btn-sm bg-white shadow hover:bg-pink-100"
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
          animeList.map((anime, index) => (
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

export default Trendinganime;
