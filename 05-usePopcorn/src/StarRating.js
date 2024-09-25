import { useState } from "react";
import Proptypes from "prop-types";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};
const starContainerStyle = {
  display: "flex",
};

// Validate
StarRating.propTypes = {
  maxRating: Proptypes.number, // .isRequired... 可以继续链接验证器
  onSetRating: Proptypes.func,
  defaultRating: Proptypes.number,
  messages: Proptypes.arrayOf(Proptypes.string),
  color: Proptypes.string,
  size: Proptypes.number,
  className: Proptypes.string,
};

export default function StarRating({
  maxRating = 5,
  onSetRating, //! 相当于将评分组件内部，创建了一个外部可直接使用的setter。 使用方法onSetRating = {onSetRating}即可
  color = "#fcc419",
  size = 32,
  className = "",
  messages = [],
  defaultRating = null,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [hovered, setHovered] = useState(defaultRating);

  function handleRating(stars) {
    setRating(stars);
    onSetRating(stars);
  }

  // css area
  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size}px`,
  };

  return (
    <div className="star-rating" style={containerStyle}>
      <div style={starContainerStyle} className={className}>
        {Array.from({ length: maxRating }, (_, i) => (
          <span>
            <Star
              key={i}
              onRating={() => handleRating(i + 1)}
              onHoverIn={() => setHovered(i + 1)}
              onHoverOut={() => setHovered(null)}
              isFull={hovered ? hovered >= i + 1 : rating >= i + 1}
              color={color}
              size={size}
            />
          </span>
        ))}
      </div>
      <p style={textStyle}>
        {maxRating === messages.length
          ? messages[hovered ? hovered - 1 : rating - 1]
          : hovered || rating}
      </p>
    </div>
  );
}

function Star({
  onRating,
  isFull = false,
  onHoverIn,
  onHoverOut,
  color,
  size,
}) {
  const starStyle = {
    width: `${size * 1.5}px`,
    height: `${size * 1.5}px`,
    display: "block",
    cursor: "pointer",
  };
  return (
    <span
      style={starStyle}
      role="button"
      onClick={onRating}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {isFull ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
