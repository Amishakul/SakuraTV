import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCharacters } from '../Utils/characterSlice';
import ShimmerCard from './ShimmerCard';

const PopularCharacters = () => {
  const dispatch = useDispatch();
  const characterList = useSelector((state) => state.characters.list);
  const isLoaded = useSelector((state) => state.characters.isLoaded);

  const scrollRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await fetch('https://api.jikan.moe/v4/top/characters?limit=8');
        const data = await res.json();

        const seenNames = new Set();
        const uniqueCharacters = [];

        for (const char of data.data) {
          const name = char.name;
          if (name && !seenNames.has(name)) {
            seenNames.add(name);
            uniqueCharacters.push(char);
          }
          if (uniqueCharacters.length === 20) break;
        }

        dispatch(setCharacters(uniqueCharacters));
      } catch (err) {
        console.error('Failed to fetch characters:', err);
      }
    };

    if (!isLoaded) {
      fetchCharacters();
    }
  }, [dispatch, isLoaded]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLoaded && scrollRef.current && cardRef.current) {
        const cardWidth = cardRef.current.offsetWidth + 16;
        scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isLoaded]);

  const scroll = (direction) => {
    if (scrollRef.current && cardRef.current) {
      const cardWidth = cardRef.current.offsetWidth + 16;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth',
      });
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

      <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">
        🌟 Popular Anime Characters
      </h2>

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

      <div ref={scrollRef} className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar py-2">
        {!isLoaded ? (
          <ShimmerCard count={8} type="horizontal" />
        ) : (
          characterList.map((char, index) => (
            <div
              key={char.mal_id}
              ref={index === 0 ? cardRef : null}
              className="flex-shrink-0 bg-base-100 shadow-lg rounded-xl overflow-hidden transition hover:scale-105 min-w-[150px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px] max-w-[150px] sm:max-w-[180px] md:max-w-[200px] lg:max-w-[220px] flex flex-col"
            >
              <div className="w-full aspect-[2/3]">
                <img
                  src={char.images.jpg.image_url}
                  alt={char.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2">
                <h3 className="text-sm font-semibold truncate">{char.name}</h3>
                <p className="text-xs text-gray-500 truncate">
                  {char.about?.slice(0, 80) || 'No description'}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PopularCharacters;
