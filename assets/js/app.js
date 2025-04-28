// Módulo principal do SAC UOL
const uolsacApp = angular.module('uolsacApp', []);

// Configurações do aplicativo
uolsacApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

// Controller principal
uolsacApp.controller('MainController', ['$scope', function($scope) {
    // Estado inicial do loader
    $scope.isLoading = false;

    // Função para mostrar/esconder o loader
    $scope.toggleLoader = function(show) {
        const loader = document.getElementById('loaderCurtain');
        loader.style.display = show ? 'block' : 'none';
        $scope.isLoading = show;
    };

    // Função de busca
    $scope.search = function(query) {
        if (query) {
            console.log('Buscando por:', query);
            // Implementar lógica de busca aqui
        }
    };

    // Inicialização
    $scope.init = function() {
        console.log('Aplicativo SAC UOL iniciado');
    };

    // Chamar inicialização
    $scope.init();

    // Dados do usuário
    $scope.userName = 'Kaique';
    
    // Carrossel de produtos
    $scope.produtos = [
        { nome: 'UOL Mail', icone: 'assets/images/uol-mail.svg' },
        { nome: 'UOL Play', icone: 'assets/images/uol-play.svg' },
        { nome: 'UOL Assine', icone: 'assets/images/assine-uol.svg' },
        { nome: 'UOL Assistência Técnica', icone: 'assets/images/assistencia-tecnica.svg' },
        { nome: 'Clube UOL', icone: 'assets/images/clube-uol.svg' }
    ];
    
    $scope.currentSlide = 0;
    $scope.itemsPerPage = 4;
    
    $scope.nextSlide = function() {
        if ($scope.currentSlide < $scope.produtos.length - $scope.itemsPerPage) {
            $scope.currentSlide++;
        }
    };
    
    $scope.prevSlide = function() {
        if ($scope.currentSlide > 0) {
            $scope.currentSlide--;
        }
    };
}]);

// Inicialização quando o documento estiver pronto
angular.element(document).ready(function() {
    // Remover classe no-js
    document.documentElement.classList.remove('no-js');

    // Carrossel do banner principal
    let currentBanner = 0;
    const banners = [
        'assets/images/Banner.png',
        'assets/images/Banner2.png',
        'assets/images/Banner3.png'
    ];
    
    function updateBanner() {
        $('.banner-carousel img').fadeOut(500, function() {
            $(this).attr('src', banners[currentBanner]).fadeIn(500);
        });
    }
    
    $('.prev-banner').click(function() {
        currentBanner = (currentBanner - 1 + banners.length) % banners.length;
        updateBanner();
    });
    
    $('.next-banner').click(function() {
        currentBanner = (currentBanner + 1) % banners.length;
        updateBanner();
    });
    
    setInterval(function() {
        currentBanner = (currentBanner + 1) % banners.length;
        updateBanner();
    }, 5000);
    
    // Autocomplete na busca
    const sugestoes = [
        'Como recuperar minha senha?',
        'Como alterar meu plano?',
        'Como cancelar minha assinatura?',
        'Como atualizar meus dados?',
        'Como solicitar segunda via de boleto?'
    ];
    
    $('.search-box input').on('input', function() {
        const query = $(this).val().toLowerCase();
        const matches = sugestoes.filter(s => 
            s.toLowerCase().includes(query)
        );
        
        const $suggestions = $('.search-suggestions');
        $suggestions.empty();
        
        if (matches.length > 0) {
            matches.forEach(sugestao => {
                $suggestions.append(`
                    <div class="suggestion-item">
                        <span class="material-icons">search</span>
                        <span>${sugestao}</span>
                    </div>
                `);
            });
        }
    });
    
    // Efeitos hover nos cards de ação
    $('.action-item').hover(
        function() {
            $(this).find('img').css('transform', 'scale(1.1)');
        },
        function() {
            $(this).find('img').css('transform', 'scale(1)');
        }
    );
    
    // Menu responsivo
    $('.menu-toggle').click(function() {
        $('.nav-links').toggleClass('active');
    });
    
    // Scroll suave para links internos
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 500);
        }
    });
    
    // Fechar menu ao clicar fora
    $(document).click(function(e) {
        if (!$(e.target).closest('.nav-links, .menu-toggle').length) {
            $('.nav-links').removeClass('active');
        }
    });
    
    // Ajustar layout em diferentes tamanhos de tela
    function adjustLayout() {
        const width = $(window).width();
        if (width <= 768) {
            $('.produtos-item').css('flex', '0 0 50%');
        } else if (width <= 480) {
            $('.produtos-item').css('flex', '0 0 100%');
        } else {
            $('.produtos-item').css('flex', '0 0 25%');
        }
    }
    
    $(window).resize(adjustLayout);
    adjustLayout();

    // --- Mais informações (expandir/recolher footer) ---
    const $moreInfoBtn = $('.more-info button');
    const $footerLinks = $('.footer-links');
    const $icon = $('.more-info .material-icons');

    // Defina aqui o estado inicial: true = expandido, false = recolhido
    let isFooterOpen = false;

    function setFooterState(open) {
        if (open) {
            $footerLinks.show();
            $icon.text('expand_more');
        } else {
            $footerLinks.hide();
            $icon.text('expand_less');
        }
    }

    function toggleFooterLinks() {
        isFooterOpen = !isFooterOpen;
        if (isFooterOpen) {
            $footerLinks.slideDown(250);
            $icon.text('expand_more');
        } else {
            $footerLinks.slideUp(250);
            $icon.text('expand_less');
        }
    }

    // Estado inicial
    setFooterState(isFooterOpen);

    $moreInfoBtn.on('click', function(e) {
        e.preventDefault();
        console.log('Botão Mais informações clicado');
        toggleFooterLinks();
    });
}); 