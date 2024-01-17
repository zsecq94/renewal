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

  // content 영역 //
  const contents = [
    {
      $prevBtn: $(".content1-con > .title-box > .nav-box > .prev"),
      $nextBtn: $(".content1-con > .title-box > .nav-box > .next"),
      $contentCon: $(".content1-con > .hidden > .card-con"),
      translate: -16.7,
      translate2: 16.9,
      translateXs: 0,
      translateIdx: 1,

      // 모바일에서 데이터가 추가됐을때 수정
      length: 5,

      // 웹에서 데이터가 추가됐을때 수정
      btnValid: [1, 3],
      valid: -83.5,
    },
    {
      $prevBtn: $(".content2-con > .title-box > .nav-box > .prev"),
      $nextBtn: $(".content2-con > .title-box > .nav-box > .next"),
      $contentCon: $(".content2-con > .hidden > .card-con"),
      translate: -20,
      translate2: 20.5,
      translateXs: 0,
      translateIdx: 1,
      length: 4,
      btnValid: [1, 3],
      valid: -80,
    },
    {
      $prevBtn: $(".content4-con > .title-box > .nav-box > .prev"),
      $nextBtn: $(".content4-con > .title-box > .nav-box > .next"),
      $contentCon: $(".content4-con > .hidden > .card-con"),
      translate: -16.7,
      translate2: 16.9,
      translateXs: 0,
      translateIdx: 1,
      length: 5,
      btnValid: [1, 3],
      valid: -83.5,
    },
    {
      $contentCon: $(".content6-con > .hidden"),
      translate: -33.5,
      translateXs: 0,
      translateIdx: 1,
      length: 2,
      btnValid: [1, 3],
      valid: -67,
    },
  ];

  contents.forEach((content, index) => {
    let isDragging = false;
    let startPoint = 0;
    let endPoint = 0;
    let initialTranslateXs = 0;

    // web btn style
    if (index !== 3) {
      const contentBtnStyleUpdate = () => {
        if (content.translateIdx <= content.btnValid[0]) {
          content.$prevBtn.addClass("disabled");
        } else if (content.translateIdx >= content.btnValid[1]) {
          content.$nextBtn.addClass("disabled");
        } else {
          content.$prevBtn.removeClass("disabled");
          content.$nextBtn.removeClass("disabled");
        }
      };

      // prev
      content.$prevBtn.click(() => {
        if (content.translateIdx > content.btnValid[0]) {
          content.translateXs -= content.translate2;
          content.translateIdx--;
          content.$contentCon.css("transform", `translateX(-${content.translateXs}%)`);
        }
        contentBtnStyleUpdate();
      });

      // next
      content.$nextBtn.click(() => {
        if (content.translateIdx < content.btnValid[1]) {
          content.translateXs += content.translate2;
          content.translateIdx++;
          content.$contentCon.css("transform", `translateX(-${content.translateXs}%)`);
        }
        contentBtnStyleUpdate();
      });

      contentBtnStyleUpdate();
    }

    // touch 함수는 모바일 환경에서만 동작함
    // mobile start
    content.$contentCon.on("touchstart", (e) => {
      isDragging = true;
      startPoint = e.touches[0].pageX;
      initialTranslateXs = content.translateXs;
    });

    // mobile move
    content.$contentCon.on("touchmove", function (e) {
      if (isDragging) {
        const currentX = e.originalEvent.touches[0].clientX;
        const dx = currentX - startPoint;
        const percentageChange = (dx / $(this).width()) * 100;
        content.translateXs = initialTranslateXs + percentageChange;

        if (content.translateXs > 0) content.translateXs = 0;
        if (content.translateXs < content.valid) content.translateXs = content.valid;

        content.$contentCon.css("transform", `translateX(${content.translateXs}%)`);
      }
    });

    // mobile end
    content.$contentCon.on("touchend", (e) => {
      isDragging = false;
      endPoint = e.changedTouches[0].pageX;

      if (content.translateIdx >= 1 && content.translateIdx <= content.length && startPoint > endPoint) {
        let navCheck = startPoint - endPoint > 50;
        if (navCheck) {
          content.translateXs = content.translate * content.translateIdx;
          content.$contentCon.css("transform", `translateX(${content.translateXs}%)`);
          content.translateIdx++;
          if (index === 1) {
            circleStyleUpdate();
          }
        } else if (!navCheck) {
          content.translateXs = content.translate * (content.translateIdx - 1);
          content.$contentCon.css("transform", `translateX(${content.translateXs}%)`);
        }
      } else if (content.translateIdx >= 2 && content.translateIdx <= content.length + 1 && startPoint < endPoint) {
        let navCheck = endPoint - startPoint > 50;
        if (navCheck) {
          content.translateXs = content.translate * (content.translateIdx - 2);
          content.$contentCon.css("transform", `translateX(${content.translateXs}%)`);
          content.translateIdx--;
          if (index === 1) {
            circleStyleUpdate();
          }
        } else if (!navCheck) {
          content.translateXs = content.translate * (content.translateIdx - 1);
          content.$contentCon.css("transform", `translateX(${content.translateXs}%)`);
        }
      }
    });
  });

  // content2 bot circle
  const $botBtn = $(".content2-con > .hidden > .bot-btn");

  for (let i = 0; i < 5; i++) {
    $botBtn.append(`<div class="circle"></div>`);
  }

  const $circle = $(".content2-con > .hidden > .bot-btn > .circle");
  const circleStyleUpdate = () => {
    let idx = contents[1].translateIdx;
    $circle
      .css({
        border: "solid 1px #fff",
      })
      .each(function (index) {
        $(this).css({
          backgroundColor: idx === index + 1 ? "#fff" : "",
        });
      });
  };

  circleStyleUpdate();

  var container = document.getElementById("map1"); //지도를 담을 영역의 DOM 레퍼런스
  var options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(35.019686319905965, 126.7800942636125), //지도의 중심좌표.
    level: 5,
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
