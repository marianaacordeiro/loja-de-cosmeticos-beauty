let debounceTimeout;
async function fetchProductData(searchTerm = "") {
    if (!searchTerm) return; // Não faz requisição se o campo estiver vazio
    const url = `https://ali-express1.p.rapidapi.com/productsByCategoryV2/660103?search_term=${searchTerm}&sort_type=default&page=1&page_size=20&sort_order=default`;
    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": "8092aa3c20msha0c6dd2b3ef663cp129613jsn0a4d9c464325",
            "x-rapidapi-host": "ali-express1.p.rapidapi.com"
        }
    };
    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`Erro na requisi\xe7\xe3o: ${response.status}`);
        const data = await response.json();
        console.log("\uD83D\uDFE2 Resposta completa da API:", data);
        let products = [];
        if (data.result && data.result.products) products = data.result.products;
        else if (data.data && data.data.products) products = data.data.products;
        else console.warn("\u26A0\uFE0F Estrutura da API pode ter mudado. Nenhum produto encontrado.");
        console.log("\uD83D\uDCCC Produtos encontrados:", products);
        updateProductList(products);
    } catch (error) {
        console.error("\uD83D\uDD34 Erro ao buscar os produtos:", error);
    }
}
function updateProductList(products) {
    const productList = document.getElementById("productCollection");
    if (!productList) {
        console.error("Elemento 'productCollection' n\xe3o encontrado no HTML!");
        return;
    }
    productList.innerHTML = "";
    if (products.length === 0) {
        productList.innerHTML = '<li class="collection-item">Nenhum produto encontrado.</li>';
        return;
    }
    products.forEach((product)=>{
        const title = product.product_title || "Sem t\xedtulo";
        const price = product.app_sale_price || "Pre\xe7o n\xe3o informado";
        const imageUrl = product.product_main_image_url || "images/default.jpg";
        const productUrl = product.product_detail_url || "#";
        const li = document.createElement("li");
        li.classList.add("collection-item", "avatar");
        li.innerHTML = `
      <img src="${imageUrl}" alt="${title}" class="circle" />
      <span class="title">${title}</span>
      <p><strong>Pre\xe7o:</strong> ${price}</p>
      <a href="${productUrl}" target="_blank" class="secondary-content">
        <i class="material-icons">shopping_cart</i>
      </a>
    `;
        productList.appendChild(li);
    });
}
// Debounce - aguarda o usuário parar de digitar por 1 segundo antes de fazer a requisição
document.getElementById("searchInput").addEventListener("input", (event)=>{
    const searchTerm = event.target.value.trim();
    // Limita as requisições com debounce
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(()=>{
        fetchProductData(searchTerm);
    }, 1000); // 1 segundo após o usuário parar de digitar
});
// Adiciona o ouvinte de evento para o botão de pesquisa
document.getElementById("searchButton").addEventListener("click", ()=>{
    const searchTerm = document.getElementById("searchInput").value.trim();
    fetchProductData(searchTerm);
});
// Carrega os produtos ao carregar a página
document.addEventListener("DOMContentLoaded", ()=>fetchProductData());

//# sourceMappingURL=pesquisa.8611d2ab.js.map
