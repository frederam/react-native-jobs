import { useState, useEffect } from "react";

export const getImageSource = async (url, placeholder) => {
  try {
    if (!url) {
      return placeholder;
    }

    const response = await fetch(url);
    if (!response.ok) {
      return placeholder;
    } else if (url.toLowerCase().endsWith(".svg")) {
      return { svgUri: url };
    }

    return { uri: url };
  } catch (error) {
    return placeholder;
  }
};

export const useImageEffect = (url, placeholder) => {
  const [imageSource, setImageSource] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const source = await getImageSource(url, placeholder);
      setImageSource(source);
    };

    fetchImage();
  }, [url, placeholder]);

  return imageSource;
};
