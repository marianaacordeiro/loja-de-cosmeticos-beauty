// Inicialização com jQuery //
$(document).ready(function() {
    // Inicializa as tabs do Materialize
    if ($(".tabs").length) $(".tabs").tabs({
        swipeable: false,
        duration: 300
    });
    // Inicializa o menu lateral (Sidenav) //
    if ($(".sidenav").length) $(".sidenav").sidenav({
        edge: "left",
        draggable: true
    });
    // Redirecionamento ao clicar nas tabs (caso queira usar JS em vez do href)//
    $(".tab a").on("click", function(e) {
        e.preventDefault();
        const destino = $(this).attr("href");
        if (destino) window.location.href = destino;
    });
});

//# sourceMappingURL=index.8ec92154.js.map
