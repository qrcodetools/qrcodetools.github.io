const body = document.querySelector("body"),
      wrapper = document.querySelector(".wrapper"),
      qrInput = wrapper.querySelector(".form input"),
      generateBtn = wrapper.querySelector(".form button"),
      qrImg = wrapper.querySelector(".qr-code img"),
      closeBtn = wrapper.querySelector(".buttons .close"),
      downloadBtn = wrapper.querySelector(".buttons .download")
      

window.onload = winready;

function winready() {
    body.classList.add("active");
};

let preValue;

generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value.trim();
    if(!qrValue || preValue === qrValue) return;
    preValue = qrValue;
    generateBtn.innerText = "Generating QR Code...";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    qrImg.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
    });
});

qrInput.addEventListener("keyup", () => {
    if(!qrInput.value.trim()) {
        wrapper.classList.remove("active");
        preValue = "";
    }
});

closeBtn.addEventListener("click", () => {
    document.querySelector("input").value='';
    wrapper.classList.remove("active");
    preValue = "";
});

downloadBtn.addEventListener("click", e => {
    e.preventDefault();
    fetchFile('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + qrInput.value);
});

function fetchFile(url) {
    fetch(url).then(res => res.blob()).then(file => {
        console.log(file);
    })
};