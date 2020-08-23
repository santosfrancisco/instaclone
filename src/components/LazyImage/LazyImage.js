import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import { Small, FullImage } from './styles';

const LazyImage = ({ source, smallSource, aspectRatio, shouldLoad }) => {
  const opacity = new Animated.Value(0);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (shouldLoad) {
      setLoaded(true);
    }
  }, [shouldLoad]);

  const handleAnimate = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Small
      blurRadius={0.4}
      source={smallSource}
      ratio={aspectRatio}
      resizeMode="contain">
      {loaded && (
        <FullImage
          style={{ opacity }}
          source={source}
          ratio={aspectRatio}
          resizeMode="contain"
          onLoadEnd={handleAnimate}
        />
      )}
    </Small>
  );
};

export default LazyImage;
