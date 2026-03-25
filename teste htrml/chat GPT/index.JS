let carrinho = [];
let total = 0;

function adicionarItem(nome, preco){
    carrinho.push({nome, preco});
    total += preco;
    atualizarCarrinho();
}

function atualizarCarrinho(){
    let lista = document.getElementById("listaCarrinho");
    let totalTexto = document.getElementById("total");

    lista.innerHTML = "";

    carrinho.forEach(item => {
        let li = document.createElement("li");
        li.innerText = item.nome + " - R$ " + item.preco.toFixed(2);
        lista.appendChild(li);
    });

    totalTexto.innerText = "Total: R$ " + total.toFixed(2);
}

function finalizarPedido(){
    if(carrinho.length === 0) return;

    let historico = JSON.parse(localStorage.getItem("historico")) || [];
    historico.push(carrinho);

    localStorage.setItem("historico", JSON.stringify(historico));

    carrinho = [];
    total = 0;

    atualizarCarrinho();
    carregarHistorico();
}

function carregarHistorico(){
    let lista = document.getElementById("historicoLista");
    lista.innerHTML = "";

    let historico = JSON.parse(localStorage.getItem("historico")) || [];

    historico.forEach((pedido, i) => {
        let li = document.createElement("li");
        li.innerText = "Pedido " + (i+1) + " (" + pedido.length + " itens)";
        lista.appendChild(li);
    });
}

/* BUSCA */
function buscar(){
    const campoPesquisa = document.getElementById("pesquisa").value.toLowerCase();
    const itens = document.querySelector("card")

    campoPesquisa.addEventListener("input", function(e){
        const termo = e.target.value.toLowerCase();
        itens.forEach(item => {
            const nome = item.querySelector("h3").textContent.toLowerCase();
            if(nome.includes(termo)){
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
    }
}

/* CARROSSEL */
let index = 0;

function avancar(){
    let carrossel = document.getElementById("carrossel");
    index = (index + 1) % 3;
    carrossel.style.transform = "translateX(-" + (index * 300) + "px)";
}

function voltar(){
    let carrossel = document.getElementById("carrossel");
    index = (index - 1 + 3) % 3;
    carrossel.style.transform = "translateX(-" + (index * 300) + "px)";
}

window.onload = carregarHistorico;