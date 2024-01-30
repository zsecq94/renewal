$(document).ready(() => {
  const router = () => {
    let route = window.location.hash.substr(2);
    if (route == "") route = "main";
    let fileName = route.split("/");
    let selector = "#app";
    let filePath = "pages/";

    $.get(filePath + fileName[0] + ".html", (data) => {
      $(selector).html(data);
      window.scrollTo(0, 0);
    });
  };

  $(window).on("hashchange", router);
  router();
});
