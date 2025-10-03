// 1. DADOS DO RESTAURANTE (SIMULADOS)
const menuItems = [
    { 
        id: 1, 
        nome: "Filé Mignon Clássico", 
        descricao: "Filé alto de Angus, grelhado à perfeição e regado com nosso rico molho demi-glace. Acompanha polenta cremosa artesanal e aspargos frescos salteados no alho. Uma experiência de sabor intenso e textura suculenta que agrada aos paladares mais exigentes.", 
        preco: 155.00, 
        categoria: "Principais",
        imagem: 'juicy_steak_medium_rare_beef_with_spices_and_grilled_vegetables-1.jpg' 
    },
    { 
        id: 2, 
        nome: "Carpaccio de Carne", 
        descricao: "Fatias finíssimas de filé mignon cru, marinadas em azeite trufado de alta qualidade. Servido com lascas generosas de Parmesão Reggiano, alcaparras e um toque de rúcula fresca. Uma entrada leve e sofisticada, ideal para abrir o apetite.", 
        preco: 65.00, 
        categoria: "Entradas",
        imagem: 'carpaccio-de-carne.jpg' 
    },
    { 
        id: 3, 
        nome: "Spaghetti com Frutos do Mar", 
        descricao: "Massa fresca de grano duro cozida al dente, combinada com camarões graúdos, lulas e mexilhões frescos. O molho é leve, à base de tomate cereja e vinho branco, finalizado com um toque de azeite de limão siciliano.", 
        preco: 138.00, 
        categoria: "Principais",
        imagem: 'comidas-tipicas-brasileiras-no-analia.jpg' 
    },
];

let carrinho = []; 
const conteudoPrincipal = document.getElementById('conteudo');
const sideMenu = document.getElementById('side-menu'); 
const notificacaoContainer = document.getElementById('notificacao-container');


// --- Funções de Lógica e UX ---
function toggleSideMenu() {
    if (sideMenu) {
        // Usa o efeito de transição CSS
        sideMenu.classList.toggle('open');
    }
}

// --- 3.1. Conteúdo da PÁGINA INICIAL (APRESENTAÇÃO SEM PREÇOS) ---
function getApresentacaoHTML() {
    let html = `
        <h2 style="text-align: center; margin-bottom: 40px; color: #222;">A Essência da Nossa Gastronomia</h2>
        <p style="text-align: center; font-style: italic;">Uma seleção de nossos pratos mais aclamados e emblemáticos.</p>
    `;
    
    menuItems.forEach(item => {
        if (item.imagem) {
            html += `
                <div class="apresentacao-item">
                    <img src="${item.imagem}" alt="${item.nome}" loading="lazy">
                    <h3>${item.nome}</h3>
                    <p>${item.descricao}</p>
                    <button class="add-to-cart-btn" onclick="adicionarAoCarrinho(${item.id})">
                        Adicionar (R$ ${item.preco.toFixed(2)})
                    </button>
                </div>
            `;
        }
    });
    
    return html;
}

// --- 3.2. Conteúdo do MENU COMPLETO (COM PREÇOS E BOTÕES) ---
function getMenuCompletoHTML() {
    let html = `<h2 style="text-align: center; margin-bottom: 40px;">Cardápio Completo</h2><div id="lista-cardapio">`;
    
    // Agrupamento por categoria (simples)
    const categorias = menuItems.reduce((acc, item) => {
        acc[item.categoria] = acc[item.categoria] || [];
        acc[item.categoria].push(item);
        return acc;
    }, {});

    for (const categoria in categorias) {
        html += `<h3 style="margin-top: 40px; border-bottom: 1px solid #999; padding-bottom: 10px;">${categoria}</h3>`;
        categorias[categoria].forEach(item => {
            html += `
                <div class="item-cardapio" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #DDD; padding: 15px 0;">
                    <div>
                        <h4 style="margin: 0;">${item.nome}</h4>
                        <p style="margin: 5px 0 0 0; font-size: 0.9em;">${item.descricao}</p>
                    </div>
                    <div style="text-align: right;">
                        <strong>R$ ${item.preco.toFixed(2)}</strong>
                        <button onclick="adicionarAoCarrinho(${item.id})" style="background-color: #222; color: white; border: none; padding: 5px 10px; margin-left: 10px; cursor: pointer; font-size: 0.8em; border-radius: 3px;">
                            +
                        </button>
                    </div>
                </div>
            `;
        });
    }

    html += `</div>`;
    return html;
}

// --- Outras Funções (getPedidosHTML, getSobreHTML, etc.) Mantidas ---
function getPedidosHTML() { 
    let html = `
        <h2 style="text-align: center;">Seu Pedido</h2>
        <div id="carrinho" style="background-color: white; padding: 30px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
            <p id="carrinho-vazio" style="display: ${carrinho.length === 0 ? 'block' : 'none'};">Seu carrinho está vazio.</p>
            <ul id="lista-carrinho" style="list-style: none; padding: 0;"></ul>
            <div id="total-pedido" style="text-align: right; font-size: 1.5em; margin-top: 20px;">Total: R$ 0.00</div>
            <button id="finalizar-pedido" ${carrinho.length === 0 ? 'disabled' : ''} onclick="finalizarPedidoSimulado()" style="width: 100%; padding: 15px; background-color: #8B4513; color: white; border: none; cursor: pointer; margin-top: 15px; font-size: 1.1em;">Finalizar Pedido</button>
        </div>
    `;
    return html;
}

function getSobreHTML() {
    return `
        <h2 style="text-align: center;">Nossa História</h2>
        <p>A história do **OutBeco** é um legado de paixão pela gastronomia. Desde 1975, focamos na excelência de ingredientes e na técnica impecável, com inspiração na culinária italiana clássica e moderna. Nossa missão é oferecer não apenas uma refeição, mas uma experiência sensorial completa, digna dos melhores restaurantes do mundo.</p>
        <h3 style="margin-top: 30px;">Filosofia</h3>
        <p>Acreditamos que a simplicidade, quando executada com maestria, é a maior sofisticação. Cada prato é uma homenagem à matéria-prima.</p>
    `;
}

// ... Inclua as funções getHorarioHTML e getAvaliacoesHTML se necessário

// --- Funções de Carrinho ---
function adicionarAoCarrinho(id) {
    const item = menuItems.find(i => i.id === id);
    if (item) {
        carrinho.push(item);
        // Não usar alert, mas sim a notificação elegante
        mostrarNotificacao(`Item adicionado: ${item.nome}`); 
        if (document.querySelector('.aba-btn.active')?.dataset.aba === 'pedidos') {
            renderizarCarrinho();
        }
    }
}
function renderizarCarrinho() {
    const listaCarrinho = document.getElementById('lista-carrinho');
    const totalPedido = document.getElementById('total-pedido');
    const finalizarBtn = document.getElementById('finalizar-pedido');
    const carrinhoVazioMsg = document.getElementById('carrinho-vazio');
    
    if (!listaCarrinho) return; 

    listaCarrinho.innerHTML = '';
    let total = 0;

    if (carrinho.length === 0) {
        carrinhoVazioMsg.style.display = 'block';
        finalizarBtn.disabled = true;
    } else {
        carrinhoVazioMsg.style.display = 'none';
        finalizarBtn.disabled = false;
        
        carrinho.forEach((item, index) => {
            total += item.preco;
            const li = document.createElement('li');
            li.style.cssText = 'display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px dashed #DDD;';
            li.innerHTML = `
                <span>${item.nome}</span>
                <span>R$ ${item.preco.toFixed(2)} 
                    <button onclick="removerDoCarrinho(${index})" style="background: none; border: 1px solid #AAA; color: #AAA; padding: 2px 6px; margin-left: 10px; cursor: pointer;">x</button>
                </span>
            `;
            listaCarrinho.appendChild(li);
        });
    }

    totalPedido.textContent = `Total: R$ ${total.toFixed(2)}`;
}
// ... (RemoverDoCarrinho, FinalizarPedidoSimulado, e MostrarNotificacao devem ser mantidos)

// --- Funções Principais ---
function mostrarAba(abaId) {
    // 1. Fecha o menu full-screen
    if (sideMenu) {
        sideMenu.classList.remove('open');
    }

    // 2. Atualiza o estado ativo
    document.querySelectorAll('#side-menu-nav .aba-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.aba === abaId) {
            btn.classList.add('active');
        }
    });

    // 3. Carrega o HTML
    switch (abaId) {
        case 'cardapio':
            conteudoPrincipal.innerHTML = getApresentacaoHTML(); // Apresentação sem preço
            break;
        case 'menu-completo':
            conteudoPrincipal.innerHTML = getMenuCompletoHTML(); // Menu com preço e botão
            break;
        case 'pedidos':
            conteudoPrincipal.innerHTML = getPedidosHTML();
            renderizarCarrinho(); 
            break;
        case 'sobre':
            conteudoPrincipal.innerHTML = getSobreHTML();
            break;
        // ... Outras abas
        default:
            conteudoPrincipal.innerHTML = '<h2>Página Não Encontrada.</h2>';
    }
}


// 4. INICIALIZAÇÃO E LISTENERS
document.addEventListener('DOMContentLoaded', () => {
    mostrarAba('cardapio'); // Padrão: Página de Apresentação
    
    document.querySelectorAll('#side-menu-nav .aba-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const abaId = btn.dataset.aba;
            mostrarAba(abaId);
        });
    });
});