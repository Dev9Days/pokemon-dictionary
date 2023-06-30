import React, { useEffect, useState } from 'react';
import { Navigation, Pagination, Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface IProps {
  slideToIndex?: number;
  navigation?: boolean;
  pagination?: boolean;
  loop?: boolean;
  contents?: { slideKey: string; element: React.ReactNode }[];
  onSlideChange?(index: number): void;
}

const ContentCarousel = ({ slideToIndex, navigation, pagination, loop, contents, onSlideChange }: IProps) => {
  const [swiper, setSwiper] = useState<SwiperType>();
  useEffect(() => {
    if (swiper && (slideToIndex === 0 || slideToIndex) && swiper.realIndex !== slideToIndex) {
      swiper.slideTo(slideToIndex);
    }
  }, [swiper, slideToIndex]);

  if (contents && contents.length === 1) {
    return contents[0].element;
  }

  return (
    <Swiper
      navigation={navigation}
      pagination={{
        type: 'bullets',
        enabled: pagination,
        clickable: true,
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active',
      }}
      modules={[Navigation, Pagination]}
      loop={loop}
      onSwiper={setSwiper}
      onRealIndexChange={({ realIndex }) => {
        if (realIndex !== slideToIndex && onSlideChange) {
          onSlideChange(realIndex);
        }
      }}
      // @ts-ignore
      style={{ '--swiper-navigation-size': '20px' }}
    >
      {contents && contents.map((content) => <SwiperSlide key={content.slideKey}>{content.element}</SwiperSlide>)}
    </Swiper>
  );
};

export default ContentCarousel;
