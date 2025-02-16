document.addEventListener("DOMContentLoaded", function() {
    // Inicializar o carrossel //
    var elems = document.querySelectorAll(".carousel");
    var instances = M.Carousel.init(elems, {
        fullWidth: false,
        indicators: false
    });
    // Função para navegar no carrossel //
    var instance = M.Carousel.getInstance(document.querySelector(".carousel"));
    document.querySelector(".next").addEventListener("click", function() {
        instance.next();
    });
    document.querySelector(".prev").addEventListener("click", function() {
        instance.prev();
    });
});

//# sourceMappingURL=perfumes.4e8dcf00.js.map
