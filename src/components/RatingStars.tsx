export const renderRatingStars = (rating: number) => {
  const stars = [];
  const roundedRating = Math.round(rating / 2);

  for (let i = 0; i < 5; i++) {
    if (i < roundedRating) {
      stars.push(
        <span key={i} className="text-yellow-400">
          &#9733;
        </span>
      );
    } else {
      stars.push(
        <span key={i} className="text-gray-300">
          &#9733;
        </span>
      );
    }
  }

  return stars;
};
