const uolsacApp = angular.module('uolsacApp', []);

uolsacApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

uolsacApp.controller('MainController', ['$scope', function($scope) {
    $scope.isLoading = false;

    $scope.toggleLoader = function(show) {
        const loader = document.getElementById('loaderCurtain');
        loader.style.display = show ? 'block' : 'none';
        $scope.isLoading = show;
    };

    $scope.search = function(query) {
        if (query) {
            console.log('Buscando por:', query);
        }
    };


    $scope.init = function() {
        console.log('Aplicativo SAC UOL iniciado');
    };


    $scope.init();

    $scope.userName = 'Kaique';
    
    $scope.produtos = [
        { nome: 'UOL Mail', icone: 'assets/images/uol-mail.svg' },
        { nome: 'UOL Play', icone: 'assets/images/uol-play-teste.svg' },
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

angular.element(document).ready(function() {
    document.documentElement.classList.remove('no-js');

    let currentBanner = 0;
    const banners = [
        'assets/images/Banner.png',
        'assets/images/1500_LG.png',
        'assets/images/1500_dinner.png',
        'assets/images/1500_bangers.png'
    ];
    
    function updateBanner() {
        $('#banner-image').fadeOut(500, function() {
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
    
    $('.action-item').hover(
        function() {
            $(this).find('img').css('transform', 'scale(1.1)');
        },
        function() {
            $(this).find('img').css('transform', 'scale(1)');
        }
    );
    
    $('.menu-toggle').click(function() {
        $('.nav-links').toggleClass('active');
    });
    
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 500);
        }
    });
    
    $(document).click(function(e) {
        if (!$(e.target).closest('.nav-links, .menu-toggle').length) {
            $('.nav-links').removeClass('active');
        }
    });
    
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

    const $moreInfoBtn = $('.more-info-btn');
    const $footerLinks = $('.footer-links');
    const $icon = $('.more-info .more-info-icon');

    let isFooterOpen = false;

    function setFooterState(open) {
        if (open) {
            $footerLinks.show();
            $icon.text('expand_less');
            $moreInfoBtn.addClass('open');
        } else {
            $footerLinks.hide();
            $icon.text('expand_more');
            $moreInfoBtn.removeClass('open');
        }
    }

    function toggleFooterLinks() {
        isFooterOpen = !isFooterOpen;
        setFooterState(isFooterOpen);
    }

    setFooterState(isFooterOpen);

    $moreInfoBtn.on('click', function(e) {
        e.preventDefault();
        toggleFooterLinks();
    });
}); 