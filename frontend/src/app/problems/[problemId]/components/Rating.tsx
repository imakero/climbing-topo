type RatingProps = {
  rating: number;
};

const Rating = ({ rating }: RatingProps) => {
  if (!rating) return <span>🤮</span>;

  return <span>{"⭐ ".repeat(rating)}</span>;
};

export default Rating;
