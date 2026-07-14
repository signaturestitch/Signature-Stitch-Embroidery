const fonts = [
    { name: "Kids", file: "fonts/kids.ttf" },
    { name: "Cursive", file: "fonts/cursive.ttf" },
    { name: "Handwriting", file: "fonts/handwriting.ttf" },
    { name: "Sports", file: "fonts/sports.ttf" },
    { name: "Popular", file: "fonts/popular.ttf" }
];

function goToPreview() {
    const text = document.getElementById("designInput").value;
    localStorage.setItem("designText", text);
    window.location.href = "preview.html";
}

if (window.location.pathname.includes("preview.html")) {
    const text = localStorage.getItem("designText");
    const previewArea = document.getElementById("previewArea");

    fonts.forEach(font => {
        const canvas = document.createElement("canvas");
        canvas.width = 1200;
        canvas.height = 300;
        const ctx = canvas.getContext("2d");

        const fontFace = new FontFace(font.name, `url(${font.file})`);
        fontFace.load().then(loaded => {
            document.fonts.add(loaded);

            ctx.fillStyle = "black";
            ctx.font = `120px '${font.name}'`;
            ctx.fillText(text, 50, 200);

            const img = document.createElement("img");
            img.src = canvas.toDataURL();
            img.style.width = "100%";

            const div = document.createElement("div");
            div.className = "preview-item";
            div.innerHTML = `<h3>${font.name}</h3>`;
            div.appendChild(img);

            const btn = document.createElement("button");
            btn.innerText = "Choose This Font";
            btn.onclick = () => {
                localStorage.setItem("chosenFont", font.name);
                localStorage.setItem("chosenImage", img.src);
                window.location.href = "final.html";
            };

            div.appendChild(btn);
            previewArea.appendChild(div);
        });
    });
}

if (window.location.pathname.includes("final.html")) {
    document.getElementById("finalFontName").innerText =
        "Font: " + localStorage.getItem("chosenFont");

    document.getElementById("finalImage").src =
        localStorage.getItem("chosenImage");
}
