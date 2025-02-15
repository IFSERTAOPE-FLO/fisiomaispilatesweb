class MobileNavbar {




    constructor(mobileMenu, navList, navLinks) {
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeClass = "active";




        this.handleClick = this.handleClick.bind(this);
    }
    animateLinks() {
        this.navLinks.forEach((link, index) => {
            link.style.animation
              ? (link.style.animation = "")
              : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`);
        });
    }




    handleClick() {  
        this.navList.classList.toggle(this.activeClass);
        this.mobileMenu.classList.toggle(this.activeClass);
        this.animateLinks();
    }




    addClickEvent() {
        this.mobileMenu.addEventListener("click", this.handleClick);
    }




    init() {
    if(this.mobileMenu) {
    this.addClickEvent();
    }
    return this;
  }
}








const mobileNavbar = new MobileNavbar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li",
);
mobileNavbar.init();

// Seleciona todos os botões "Remarcar"
const botaoRemarcar = document.querySelectorAll('.botao.remarcar');

// Seleciona a janela de remarcar
const janelaRemarcar = document.getElementById('remarcar');

// Seleciona o botão de fechar da janela de remarcar
const botaoFechar = janelaRemarcar.querySelector('.fechar');

// Função para abrir a janela de remarcar
function abrirJanelaRemarcar() {
    janelaRemarcar.style.display = 'flex';
}

// Função para fechar a janela de remarcar
function fecharJanelaRemarcar() {
    janelaRemarcar.style.display = 'none';
}

// Adiciona evento de clique para abrir a janela ao botão "Remarcar"
botaoRemarcar.forEach(botao => {
    botao.addEventListener('click', abrirJanelaRemarcar);
});

// Adiciona evento de clique para fechar a janela ao botão "Fechar"
botaoFechar.addEventListener('click', fecharJanelaRemarcar);

// Fecha a janela caso o usuário clique fora da área da janela
janelaRemarcar.addEventListener('click', (e) => {
    if (e.target === janelaRemarcar) {
        fecharJanelaRemarcar();
    }
});
