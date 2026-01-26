// main script
(function () {
  "use strict";

  // home bannerSlider
  // ----------------------------------------
  new Swiper(".banner-slider", {
    autoHeight: true,
    // spaceBetween: 24,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // gallerySlider
  // ----------------------------------------
  new Swiper(".image-gallery", {
    autoHeight: true,
    spaceBetween: 12,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });

  new Swiper(".image-full-row-gallery", {
    autoHeight: true,
    spaceBetween: 24,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 4,
      },
    },
  });

  // Testimonial Slider
  // ----------------------------------------
  new Swiper(".testimonial-slider", {
    spaceBetween: 24,
    loop: true,
    pagination: {
      el: ".testimonial-slider-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });
})();
