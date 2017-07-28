var btn_tender = document.querySelector(".btn_tenders");
var btn_fingers = document.querySelector(".btn_fingers");
var btn_strips = document.querySelector(".btn_strips");

btn_tender.addEventListener("click", function(e) {
  performSearch("tenders");
});

btn_fingers.addEventListener("click", function(e) {
  performSearch("fingers");
});

btn_strips.addEventListener("click", function(e) {
  performSearch("strips");
});
