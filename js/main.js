$(document).ready(() => {
  // 슬라이더 영역
  $(".slide:gt(0)").hide();
  const $timeSpan = $(".slide-con > .slide-bot-con > .slide-bot-box > .timer-box > .cur");
  const $timerLine = $(".slide-con > .slide-bot-con > .slide-bot-box > .timer-box > .timer-line > .time");
  const $prevBtn = $(".slide-con > .slide-bot-con > .slide-bot-box > .nav-box > .prev");
  const $nextBtn = $(".slide-con > .slide-bot-con > .slide-bot-box > .nav-box > .next");

  let timeLineWidth = 0;
  let currentPage = 1;

  const currentTime = () => {
    timeLineWidth += 0.175;
    if (timeLineWidth > 100) {
      timeLineWidth = 100;
    }
    $timerLine.css({
      width: timeLineWidth + "%",
    });
  };

  $timeSpan.html(`0${currentPage}`);

  const nextSlide = () => {
    currentPage = currentPage === 5 ? 1 : (currentPage += 1);
    $timeSpan.html(`0${currentPage}`);
    timeLineWidth = 0;
    $(".slide:first").fadeOut(1000).next().fadeIn(100).end().appendTo(".slides");
  };

  const prevSlide = () => {
    currentPage = currentPage === 1 ? 5 : (currentPage -= 1);
    $timeSpan.html(`0${currentPage}`);
    let current = $(".slide:visible");
    let last = $(".slide:last");

    current.fadeOut(1000);
    last.hide().prependTo(".slides").fadeIn(100);
  };

  $prevBtn.click(() => {
    clearInterval(interval);
    prevSlide();
    timeLineWidth = 0;
    interval = setInterval(nextSlide, 6000);
  });

  $nextBtn.click(() => {
    clearInterval(interval);
    nextSlide();
    timeLineWidth = 0;
    interval = setInterval(nextSlide, 6000);
  });

  setInterval(currentTime, 10);
  let interval = setInterval(nextSlide, 6000);

  let isWeb = window.innerWidth > 767;
  let swipers = [];

  const contents = [
    {
      content: ".content1-con > .mySwiper",
      slidesPerView: isWeb ? 4 : 1,
      spaceBetween: isWeb ? 30 : 10,
      pagination: {
        el: "",
      },
      navigation: {
        nextEl: ".content1-con > .title-box > .nav-box > .next",
        prevEl: ".content1-con > .title-box > .nav-box > .prev",
      },
    },
    {
      content: ".content2-con > .mySwiper",
      slidesPerView: isWeb ? 3 : 1,
      spaceBetween: isWeb ? 30 : 0,
      pagination: {
        el: ".content2-con > .mySwiper > .swiper-pagination",
      },
      navigation: {
        nextEl: ".content2-con > .title-box > .nav-box > .next",
        prevEl: ".content2-con > .title-box > .nav-box > .prev",
      },
    },
    {
      content: ".content4-con > .mySwiper",
      slidesPerView: isWeb ? 4 : 1,
      spaceBetween: isWeb ? 30 : 10,
      pagination: {
        el: "",
      },
      navigation: {
        nextEl: ".content4-con > .title-box > .nav-box > .next",
        prevEl: ".content4-con > .title-box > .nav-box > .prev",
      },
    },
  ];

  const createSwiper = (content) => {
    var swiper = new Swiper(content.content, {
      slidesPerView: content.slidesPerView,
      spaceBetween: content.spaceBetween,
      pagination: content.pagination,
      navigation: {
        nextEl: content.navigation.nextEl,
        prevEl: content.navigation.prevEl,
      },
    });

    swipers.push(swiper);

    swiper.on("slideChange", function () {
      if (this.activeIndex === 0) {
        $(content.navigation.prevEl).addClass("disabled");
        $(content.navigation.nextEl).removeClass("disabled");
      } else if (this.activeIndex === 2) {
        $(content.navigation.nextEl).addClass("disabled");
        $(content.navigation.prevEl).removeClass("disabled");
      } else {
        $(content.navigation.prevEl).removeClass("disabled");
        $(content.navigation.nextEl).removeClass("disabled");
      }
    });

    $(content.navigation.prevEl).addClass("disabled");
  };

  contents.forEach((content, index) => {
    createSwiper(content);
  });

  var footerSwiper = new Swiper(".footer1 > .con > .mySwiper", {
    slidesPerView: window.innerWidth > 767 ? 5 : 2,
    spaceBetween: 30,
  });

  $(window).resize(() => {
    let checkWidth = window.innerWidth > 767;
    if (isWeb !== checkWidth) {
      isWeb = checkWidth;
      footerSwiper.params.slidesPerView = isWeb ? 5 : 2;
      footerSwiper.update();

      swipers.forEach((swiper, index) => {
        if (index !== 1) {
          swiper.params.slidesPerView = isWeb ? 4 : 1;
          swiper.params.spaceBetween = isWeb ? 30 : 10;
        } else {
          swiper.params.slidesPerView = isWeb ? 3 : 1;
          swiper.params.spaceBetween = isWeb ? 30 : 0;
        }
        swiper.update();
      });
    }
  });

  var container = document.getElementById("map1"); //지도를 담을 영역의 DOM 레퍼런스
  var options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(35.019686319905965, 126.7800942636125), //지도의 중심좌표.
    level: 5,
    draggable: $(window).width() < 750 ? false : true,
  };

  var map = new kakao.maps.Map(container, options);

  // var markerPosition = new kakao.maps.LatLng(35.019686319905965, 126.7800942636125);

  // 마커를 생성합니다
  // var marker = new kakao.maps.Marker({
  //   position: markerPosition,
  //   map: map,
  // });

  // 마커가 지도 위에 표시되도록 설정합니다
  // marker.setMap(map);

  var container2 = document.getElementById("map2");
  var options2 = {
    center: new kakao.maps.LatLng(37.909321215454796, 126.7800942636125),
    level: 8,
    draggable: $(window).width() < 750 ? false : true,
  };

  var map2 = new kakao.maps.Map(container2, options2);

  // var markerPosition2 = new kakao.maps.LatLng(37.909321215454796, 126.83752088233827);

  // var marker2 = new kakao.maps.Marker({
  //   position: markerPosition2,
  // });

  // marker2.setMap(map2);

  map.relayout(); // 맵을 리레이아웃( 다시불러오기)
  map.setCenter(new kakao.maps.LatLng(35.019686319905965, 126.7800942636125));
  map2.setCenter(new kakao.maps.LatLng(37.909321215454796, 126.83752088233827));
});
