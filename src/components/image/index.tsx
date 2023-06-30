'use client';

import Image, { ImageProps } from 'next/image';
import React, { useEffect, useState } from 'react';
import Spinner from '@/components/spinner';

const NextImage = ({ src, alt, width, height, ...rest }: ImageProps) => {
  const [error, setError] = useState<boolean>(true);

  useEffect(() => {
    setError(false);
  }, [src]);

  if (error) {
    return (
      <Spinner
        className="flex items-center justify-center"
        style={{
          width: width && Number(width) - 2,
          height: height && Number(height) - 2,
        }}
      />
    );
  }
  return <Image {...rest} src={src} alt={alt} width={width} height={height} onError={() => setError(false)} />;
};

export default NextImage;
