import React, { useEffect, useState } from 'react';

const AiringAnimeCarousel = () => {
  const [animeList, setAnimeList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAiringAnime = async () => {
      try {
        const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=airing&limit=25');
        if (!response.ok) throw new Error('Failed to fetch airing anime');
        const data = await response.json();

        // Remove duplicates by `mal_id`
        const uniqueMap = new Map();
        data.data.forEach(item => {
          if (!uniqueMap.has(item.mal_id)) {
            uniqueMap.set(item.mal_id, item);
          }
        });

        // Keep only TV, ONA, and Movie types
        const filtered = [...uniqueMap.values()].filter(anime =>
          ['TV', 'ONA', 'Movie'].includes(anime.type)
        );

        setAnimeList(filtered);
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

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % animeList.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [animeList]);

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + animeList.length) % animeList.length);
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % animeList.length);
  };

  if (loading) return <p className="text-center py-6">Loading airing anime...</p>;

  const currentAnime = animeList[currentIndex];
  const title = currentAnime.title_english || currentAnime.title; // Use English title if available

  return (
    <div className="relative w-full max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">🔥 Trending Airing Anime</h2>

      {/* Slide container */}
      <div className="relative bg-black shadow-xl rounded-lg overflow-hidden h-[500px] sm:h-[600px] flex items-center justify-center">
        
        {/* Cinematic background */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentAnime.images.jpg.large_image_url}
            alt=""
            className="w-full h-full object-cover blur-md opacity-30"
          />
        </div>

        {/* Foreground poster */}
        <img
          src={currentAnime.images.jpg.large_image_url}
          alt={title}
          className="z-10 max-h-full max-w-full object-contain"
        />

        {/* Overlay text */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 z-20">
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-sm mt-1">
            ⭐ {currentAnime.score || 'N/A'} | Episodes: {currentAnime.episodes || 'TBD'} | Type: {currentAnime.type}
          </p>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 btn btn-circle bg-white shadow hover:bg-pink-100 z-30"
        aria-label="Previous Slide"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 btn btn-circle bg-white shadow hover:bg-pink-100 z-30"
        aria-label="Next Slide"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {animeList.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'bg-pink-600 scale-110' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default AiringAnimeCarousel;
