const body = document.querySelector("body"),
      wrapper = document.querySelector(".wrapper"),
      form = document.querySelector("form"),
      fileInp = document.querySelector("input"),
      uploadBtn = document.querySelector(".uploadBtn"),
      closeBtn = document.querySelector(".close"),
      copyBtn = document.querySelector(".copy");


window.onload = winready;

function winready() {
    body.classList.add("active");
};

function fetchRequest(file, formData) {
    uploadBtn.innerText = "Scanning QR Code...";
    fetch("https://api.qrserver.com/v1/read-qr-code/", {
        method: 'POST', body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        uploadBtn.innerText = result ? "Upload QR Code image" : "Please try again";
        if(!result) return;
        document.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        wrapper.classList.add("active");
    }).catch(() => {
        uploadBtn.innerText = "Please try again";
    });
};

uploadBtn.addEventListener("click", function() {
    fileInp.click();
});

fileInp.addEventListener("change", async e => {
    let userFile = e.target.files[0];
    if(!userFile) return;
    let formData = new FormData();
    formData.append('file', userFile);
    fetchRequest(userFile, formData);
});

copyBtn.addEventListener("click", () => {
    let text = document.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
    copyBtn.innerText = "Copied";
});

closeBtn.addEventListener("click", () => {
    fileInp.value = '';
    wrapper.classList.remove("active");
    copyBtn.innerText = "Copy";
});
