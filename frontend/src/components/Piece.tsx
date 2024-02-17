import React, { useState, useEffect } from "react";

const Piece = ({ piece }) => {
  const [imagePath, setImagePath] = useState("/assets/pieces/empty.png");

  useEffect(() => {
    const firstLetter = piece === piece.toUpperCase() ? "w" : "b";
    const secondLetter = piece.toUpperCase();
    import(`/assets/pieces/${firstLetter + secondLetter}.png`)
      .then((image) => setImagePath(image.default))
      .catch((error) => console.error(error));
  }, [piece]);

  return <img className="piece" src={imagePath} alt="" draggable={true} />;
};

export default Piece;
