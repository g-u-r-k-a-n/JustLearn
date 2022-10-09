window.onload = () => {
    const btnTop = document.querySelector(".back-to-top");
    document.addEventListener("scroll", () => {
        btnTop.style.display = this.scrollY > 200 ? "block" : "none";
    })
}