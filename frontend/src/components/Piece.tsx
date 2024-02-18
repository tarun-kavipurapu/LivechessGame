import React, { useState, useEffect, useRef } from "react";

const Piece = ({ piece, pos, setPos }) => {
  const [imagePath, setImagePath] = useState("/assets/pieces/empty.png");
  const element = useRef<HTMLImageElement>(null); // Explicitly define the type of element
  const handleDragStart = () => {
    setPos(pos);
    setTimeout(() => {
      element.current.style.opacity = "0"; // Hide the piece during drag
    }, 0);
  };

  const handleDragEnd = () => {
    element.current.style.opacity = "1"; // Show the piece after drag
  };

  useEffect(() => {
    const firstLetter = piece === piece.toUpperCase() ? "w" : "b";
    const secondLetter = piece.toUpperCase();
    import(`/assets/pieces/${firstLetter + secondLetter}.png`)
      .then((image) => setImagePath(image.default))
      .catch((error) => console.error(error));
  }, [piece]);

  return (
    <img
      className="w-[70%] outline-0 bg-transparent" // Set background to transparent
      src={imagePath}
      alt=""
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      ref={element}
    />
  );
};

export default Piece;
