const body = document.querySelector("body"),
      generator = document.querySelector(".generator"),
      reader = document.querySelector(".reader");

window.onload = winready;

function winready() {
    body.classList.add("active");
};

generator.addEventListener("click", function() {
    location.href = "https://qrcodetools.github.io/generator/";
});

reader.addEventListener("click", function() {
    location.href = "https://qrcodetools.github.io/reader/";
});