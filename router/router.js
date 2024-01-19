$(document).ready(() => {
  const router = () => {
    let route = window.location.hash.substr(2);
    if (route == "") route = "main";
    let fileName = route.split("/")[0];
    let selector = "#app";
    let filePath = "pages/";

    $.get(filePath + fileName + ".html", (data) => {
      $(selector).html(data);
      window.scrollTo(0, 0);
    });
  };

  $(window).on("hashchange", router);
  router();
});
