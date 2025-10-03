// 1. DADOS DO RESTAURANTE
const menuItems = [
    // MASSAS (Primi Piatti)
    { id: 10, nome: "Agnolotti de Costela Assada", descricao: "Agnolotti com porcini e tomatinhos frescos.", preco: 125.00, categoria: "Massas" },
    { id: 11, nome: "Spaghetti com Frutos do Mar", descricao: "Spaghetti com vôngole, camarões e azeite de limão.", preco: 138.00, categoria: "Massas" },
    { id: 12, nome: "Risoto Milanês", descricao: "Risoto cremoso com açafrão, harmonizando com os grelhados.", preco: 95.00, categoria: "Massas" },

    // GRELHADOS (Secondi Piatti)
    { id: 20, nome: "Filé Mignon Clássico", descricao: "Filé alto grelhado, servido com molho demi-glace e polenta cremosa.", preco: 155.00, categoria: "Grelhados" },
    { id: 21, nome: "Peixe do Dia na Brasa", descricao: "Peixe fresco grelhado, acompanhado de fregola sarda e abobrinha.", preco: 142.00, categoria: "Grelhados" },
    
    // ENTRADAS (Antipasti)
    { id: 30, nome: "Carpaccio de Carne", descricao: "Finas fatias de filé, alcaparras, parmesão e azeite trufado.", preco: 65.00, categoria: "Entradas" },
    { id: 31, nome: "Burrata com Tomates Confit", descricao: "Burrata fresca servida com pesto de manjericão e tomates confitados.", preco: 78.00, categoria: "Entradas" },
    
    // SOBREMESAS (Dolci)
    { id: 40, nome: "Tiramisu Clássico", descricao: "Receita tradicional italiana com mascarpone, café e Savoiardi.", preco: 48.00, categoria: "Sobremesas" },
];

let carrinho = []; 

// 2. ELEMENTOS DO DOM
const conteudoPrincipal = document.getElementById('conteudo');
const sideMenu = document.getElementById('side-menu'); 
const welcomeScreen = document.getElementById('welcome-screen');
const botoesAba = document.querySelectorAll('#side-menu-nav .aba-btn');
const notificacaoContainer = document.getElementById('notificacao-container');

// FUNÇÃO UTILITÁRIA
function encontrarItemMenu(id) {
    const itemIdNum = parseInt(id); 
    return menuItems.find(item => item.id === itemIdNum);
}

// 3. FUNÇÕES DE UX (Menu Lateral e Notificação)

/**
 * Função global para abrir/fechar o menu lateral usando classes CSS.
 * Esta abordagem é a mais robusta e garante que o clique funcione.
 */
function toggleSideMenu() {
    if (sideMenu) {
        sideMenu.classList.toggle('open');
    }
}

function mostrarNotificacao(mensagem) {
    const notificacao = document.createElement('div');
    notificacao.className = 'toast-notificacao';
    notificacao.textContent = mensagem;

    notificacaoContainer.appendChild(notificacao);
    
    setTimeout(() => {
        notificacao.classList.add('hide'); 
        setTimeout(() => {
            notificacao.remove();
        }, 500); 
    }, 3000);
}

// --- Conteúdos HTML de cada Aba (Mantido) ---
function getCardapioHTML() {
    let html = `<h2>Menu</h2><div id="lista-cardapio">`;
    
    const categorias = menuItems.reduce((acc, item) => {
        acc[item.categoria] = acc[item.categoria] || [];
        acc[item.categoria].push(item);
        return acc;
    }, {});

    for (const categoria in categorias) {
        html += `<section class="categoria-cardapio"><h3>${categoria}</h3>`;
        categorias[categoria].forEach(item => {
            html += `
                <div class="item-cardapio">
                    <div>
                        <h4>${item.nome}</h4>
                        <p>${item.descricao}</p>
                    </div>
                    <div class="item-acoes">
                        <strong>R$ ${item.preco.toFixed(2)}</strong>
                        <button onclick="adicionarAoCarrinho(${item.id})">Adicionar</button>
                    </div>
                </div>
            `;
        });
        html += `</section>`;
    }

    html += `</div>`;
    return html;
}

function getPedidosHTML() {
    return `
        <h2>Carrinho</h2>
        <div id="carrinho-vazio-msg" class="carrinho-vazio-msg-style">O carrinho de pedidos está vazio.</div>
        <ul id="lista-carrinho" class="lista-pedidos">
            </ul>
        <div id="resumo-pedido" class="resumo-pedido-style">
            <p id="total-pedido">Total: R$ 0.00</p>
            <button id="finalizar-btn" onclick="finalizarPedidoSimulado()">Finalizar Pedido</button>
        </div>
    `;
}

function getAvaliacoesHTML() {
    return `
        <div class="avaliacoes-container">
            <h2>Avaliações e Imprensa</h2>
            <div class="review-box">
                <h4>Guia Quatro Rodas - Destaque</h4>
                <p>“O Grelhado na Brasa é de uma delicadeza extraordinária. A casa **OUTBECO** eleva a experiência da culinária italiana na região.”</p>
            </div>
            <div class="review-box">
                <h4>Revista Gosto - Crítica</h4>
                <p>“Ambiente charmoso e envidraçado. O Agnolotti de costela é a nossa recomendação para uma noite inesquecível.”</p>
            </div>
            <p class="imprensa-contato">Para solicitações de imprensa ou parcerias, favor contatar a administração **OUTBECO**.</p>
        </div>
    `;
}

function getSobreHTML() {
    return `
        <h2>Sobre o OutBeco: Tradição no Ipiranga</h2>
        <div class="historia-container">
            <p class="historia-paragrafo">
                A história do **OutBeco** começa em 1975, quando a família Rossi, recém-chegada da Sicília, abriu um pequeno restaurante escondido em uma rua tranquila do Ipiranga. O nome "OutBeco" (adaptado de "Oltre il Vicolo", que significa "além do beco") era uma referência carinhosa ao seu local discreto, mas cheio de sabor.
            </p>
            <p class="historia-paragrafo">
                Desde então, mantivemos a tradição de usar receitas centenárias e ingredientes frescos, focando em massas artesanais, pães de fermentação natural e grelhados no ponto perfeito, honrando a culinária italiana autêntica e inesquecível.
            </p>

            <h3 class="sobre-h3">Localização e Horários</h3>
            <p class="local-info">
                <strong>Endereço:</strong><br>
                Rua Silva Bueno, 1234 - Ipiranga.<br>
                São Paulo - SP, Brasil.
            </p>
            <p class="local-info">
                <strong>Contato:</strong><br>
                Telefone: (11) 3513-7480<br>
                <strong>E-mail:</strong> contato@outbeco.com
            </p>

            <div class="horario-info">
                <p><strong>Segunda a Sexta (Dias de Semana):</strong></p>
                <p class="horario-range">11:00h às 22:00h</p>
            </div>
            <div class="horario-info">
                <p><strong>Sábados e Domingos (Finais de Semana):</strong></p>
                <p class="horario-range">10:00h à 01:00h (Madrugada)</p>
            </div>
        </div>
    `;
}

// 4. LÓGICA DO CARRINHO (Mantido)

function adicionarAoCarrinho(itemId) {
    const itemMenu = encontrarItemMenu(itemId);
    if (!itemMenu) return;

    const itemNoCarrinho = carrinho.find(item => item.itemId === itemId);

    if (itemNoCarrinho) {
        itemNoCarrinho.quantidade += 1;
    } else {
        carrinho.push({
            itemId: itemId,
            quantidade: 1
        });
    }

    mostrarNotificacao(`Adicionado: ${itemMenu.nome}`);
    
    if (document.querySelector('.aba-btn.active')?.dataset.aba === 'pedidos') {
        renderizarCarrinho();
    }
}

function ajustarQuantidade(index, operacao) {
    let itemCarrinho = carrinho[index];

    if (operacao === '+') {
        itemCarrinho.quantidade += 1;
    } else if (operacao === '-') {
        itemCarrinho.quantidade -= 1;
    } else if (operacao === 'remover') {
        carrinho.splice(index, 1);
        mostrarNotificacao(`Item removido do pedido.`);
        renderizarCarrinho(); 
        return; 
    }

    if (itemCarrinho.quantidade <= 0) {
        carrinho.splice(index, 1);
        mostrarNotificacao(`Item removido do pedido.`);
    }
    
    renderizarCarrinho();
}

function renderizarCarrinho() {
    const listaCarrinho = document.getElementById('lista-carrinho');
    const totalPedido = document.getElementById('total-pedido');
    const vazioMsg = document.getElementById('carrinho-vazio-msg');
    const finalizarBtn = document.getElementById('finalizar-btn');

    if (!listaCarrinho) return; 

    listaCarrinho.innerHTML = '';
    let total = 0;

    if (carrinho.length === 0) {
        vazioMsg.style.display = 'block';
        finalizarBtn.disabled = true;
    } else {
        vazioMsg.style.display = 'none';
        finalizarBtn.disabled = false;
        
        carrinho.forEach((itemCarrinho, index) => {
            const itemMenu = encontrarItemMenu(itemCarrinho.itemId);

            if (itemMenu) {
                const subtotal = itemMenu.preco * itemCarrinho.quantidade;
                total += subtotal;
                
                const li = document.createElement('li');
                li.className = 'item-carrinho-linha';
                li.innerHTML = `
                    <span class="item-nome">${itemMenu.nome}</span>
                    <div class="controles-quantidade">
                        <button class="btn-quantidade" onclick="ajustarQuantidade(${index}, '-')">-</button>
                        <span class="quantidade-display">${itemCarrinho.quantidade}</span>
                        <button class="btn-quantidade" onclick="ajustarQuantidade(${index}, '+')">+</button>
                    </div>
                    <span class="item-preco-total">R$ ${subtotal.toFixed(2)}</span>
                    <button class="btn-remover-item" onclick="ajustarQuantidade(${index}, 'remover')">X</button>
                `;
                listaCarrinho.appendChild(li);
            }
        });
    }

    totalPedido.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function finalizarPedidoSimulado() {
    if (carrinho.length === 0) return;

    const total = carrinho.reduce((sum, itemCarrinho) => {
        const itemMenu = encontrarItemMenu(itemCarrinho.itemId);
        return sum + (itemMenu ? itemMenu.preco * itemCarrinho.quantidade : 0);
    }, 0).toFixed(2);
    
    mostrarNotificacao(`🎉 Pedido de R$ ${total} Finalizado! Obrigado por pedir no OUTBECO! 🎉`);

    carrinho = [];
    mostrarAba('cardapio');
}


// 5. FUNÇÃO PRINCIPAL DE ABA
function mostrarAba(aba) {
    // 1. Esconde a tela de boas-vindas e mostra o conteúdo principal
    document.body.classList.add('welcome-hidden');
    
    // 2. Fecha o menu lateral removendo a classe 'open'
    if (sideMenu) {
        sideMenu.classList.remove('open'); 
    }

    // 3. Atualiza os botões ativos (agora apenas no side menu)
    botoesAba.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.aba === aba) {
            btn.classList.add('active');
        }
    });

    let html = '';
    switch (aba) {
        case 'cardapio':
            html = getCardapioHTML();
            break;
        case 'pedidos':
            html = getPedidosHTML(); 
            break;
        case 'sobre': 
            html = getSobreHTML();
            break;
        case 'avaliacoes':
            html = getAvaliacoesHTML();
            break;
    }

    conteudoPrincipal.innerHTML = html;
    
    if (aba === 'pedidos') {
        renderizarCarrinho();
    }
}


// 6. INICIALIZAÇÃO E LISTENERS
document.addEventListener('DOMContentLoaded', () => {
    // Adiciona listeners aos botões do Side Menu
    botoesAba.forEach(btn => {
        btn.addEventListener('click', (e) => {
            mostrarAba(btn.dataset.aba);
        });
    });
});