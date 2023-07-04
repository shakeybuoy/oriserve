import React, { useContext, useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";

export default function ImageComponent({ image, src }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setLoading(true);
    };
    img.src = src;
  }, [src]);
  return (
    <>
      {
        <div
          className={`w-full h-full aspect-${[image.width / image.height]} ${
            loading == false ? " block" : " hidden"
          } `}
        >
          <Blurhash
            width="100%"
            height="100%"
            resolutionX={32}
            resolutionY={32}
            hash={image.blur_hash}
          />
        </div>
      }
      {loading && (
        <img
          src={src}
          className="w-full h-full object-cover"
          alt={image.alt_description}
        />
      )}
    </>
  );
}
