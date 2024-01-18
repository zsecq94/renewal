$(document).ready(() => {
  const router = () => {
    let route = window.location.hash.substr(2);
    console.log(window.location.hash);
    if (route == "") route = "main";
    let fileName = route;
    let selector = "#app";
    let filePath = "pages/";

    if (route.includes("about/")) {
      fileName = route.split("about/")[1];
      filePath += "about/";
      selector = "#about-content"; // about 페이지의 중단 부분에 해당하는 셀렉터
    }

    $.get(filePath + fileName + ".html", (data) => {
      $(selector).html(data);
    });
  };

  $(window).on("hashchange", router);
  router();
});
