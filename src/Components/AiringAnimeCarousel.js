import React, { useEffect, useState } from 'react';
import ShimmerCard from './ShimmerCard';

const AiringAnimeCarousel = () => {
  const [animeList, setAnimeList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());

  function getItemsPerSlide() {
    if (window.innerWidth >= 1024) return 3;
    return 1;
  }

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
      setCurrentIndex(0);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchAiringAnime = async () => {
      try {
        const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=airing&limit=20');
        const data = await response.json();

        const uniqueMap = new Map();
        data.data.forEach(item => {
          if (!uniqueMap.has(item.mal_id)) {
            uniqueMap.set(item.mal_id, item);
          }
        });

        const filtered = [...uniqueMap.values()].filter(anime =>
          ['TV', 'ONA', 'Movie'].includes(anime.type)
        );

        const isPortrait = (imgUrl) =>
          new Promise(resolve => {
            const img = new Image();
            img.src = imgUrl;
            img.onload = () => resolve(img.naturalHeight > img.naturalWidth);
            img.onerror = () => resolve(false);
          });

        const filteredPortraits = [];
        for (const anime of filtered) {
          const url = anime.images.jpg.large_image_url;
          if (await isPortrait(url)) {
            filteredPortraits.push(anime);
          }
        }

        setAnimeList(filteredPortraits);
      } catch (error) {
        console.error('Error fetching airing anime:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAiringAnime();
  }, []);

  useEffect(() => {
    if (animeList.length === 0) return;
    const interval = setInterval(() => nextSlide(), 5000);
    return () => clearInterval(interval);
  }, [animeList, itemsPerSlide]);

  const totalSlides = Math.ceil(animeList.length / itemsPerSlide);

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + totalSlides) % totalSlides);
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % totalSlides);
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto py-10 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-6 text-center">
          🔥 Trending Airing Anime
        </h2>
        <div className={`grid gap-6 ${itemsPerSlide === 3 ? 'grid-cols-3' : 'grid-cols-1'}`}>
          <ShimmerCard count={itemsPerSlide} type="vertical" />
        </div>
      </div>
    );
  }

  const startIdx = currentIndex * itemsPerSlide;
  let currentSlideItems = [];

  if (startIdx + itemsPerSlide <= animeList.length) {
    currentSlideItems = animeList.slice(startIdx, startIdx + itemsPerSlide);
  } else {
    const endSlice = animeList.slice(startIdx);
    const remaining = itemsPerSlide - endSlice.length;
    const startSlice = animeList.slice(0, remaining);
    currentSlideItems = [...endSlice, ...startSlice];
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-6 text-center">
        🔥 Trending Airing Anime
      </h2>

      <div className="relative bg-black shadow-xl rounded-lg overflow-hidden p-4 sm:p-6 group">
        <div
          className={`grid gap-6 transition-all duration-500 ${
            itemsPerSlide === 3 ? 'grid-cols-3' : 'grid-cols-1'
          }`}
        >
          {currentSlideItems.map(anime => {
            const title = anime.title_english || anime.title;
            const genres = anime.genres?.map(g => g.name).join(', ') || 'N/A';

            return (
              <div key={anime.mal_id} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg flex flex-col">
                <div className="relative w-full h-[300px] sm:h-[400px]">
                  <img
                    src={anime.images.jpg.large_image_url}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover blur-md opacity-30"
                    aria-hidden="true"
                  />
                  <img
                    src={anime.images.jpg.large_image_url}
                    alt={title}
                    className="relative z-10 object-contain w-full h-full"
                  />
                </div>
                <div className="p-4 bg-gradient-to-t from-black/90 to-transparent text-white">
                  <h3 className="text-lg font-bold truncate">{title}</h3>
                  <p className="text-sm mt-1">⭐ {anime.score || 'N/A'} | Ep: {anime.episodes || 'TBD'} | {anime.type}</p>
                  <p className="text-sm mt-1 italic text-pink-400 truncate" title={genres}>
                    Genres: {genres}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition duration-300 bg-white/70 hover:bg-pink-100 btn btn-circle"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition duration-300 bg-white/70 hover:bg-pink-100 btn btn-circle"
        >
          ❯
        </button>
      </div>

      <div className="flex justify-center mt-6 space-x-2 sm:space-x-3">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'bg-pink-600 scale-125' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default AiringAnimeCarousel;
