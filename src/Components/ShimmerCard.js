import React from 'react';

const ShimmerCard = ({ count = 1, type = 'vertical' }) => {
  const shimmerItems = Array.from({ length: count });

  return (
    <>
      {shimmerItems.map((_, index) => (
        <div
          key={index}
          className={`animate-pulse bg-gray-800 rounded-lg shadow-md overflow-hidden ${
            type === 'horizontal'
              ? 'min-w-[150px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px] h-[300px]'
              : 'h-[400px] w-full'
          }`}
        >
          <div className="bg-gray-700 h-3/4 w-full"></div>
          <div className="p-2">
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-600 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ShimmerCard;
