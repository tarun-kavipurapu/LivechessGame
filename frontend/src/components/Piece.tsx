import React, { useState, useEffect, useRef } from "react";

const Piece = ({ piece, pos, setPos }) => {
  const [imagePath, setImagePath] = useState("/assets/pieces/empty.png");
  const element = useRef<HTMLImageElement>(null); // Explicitly define the type of element
  const handleDragStart = () => {
    setPos(pos);
    setTimeout(() => {
      element.current.style.display = "none";
    }, 0);
  };

  const handleDragEnd = () => {
    element.current.style.display = "block";
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
      className="piece"
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
