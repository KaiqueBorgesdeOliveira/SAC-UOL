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
        if (!query) {
            alert('Por favor, digite algo para buscar');
            return;
        }
        
        $scope.toggleLoader(true);
        
        // Simular uma busca
        setTimeout(() => {
            // Aqui você pode adicionar a lógica real de busca
            const results = [
                'Como recuperar minha senha?',
                'Como pagar minha fatura?',
                'Como cancelar meu serviço?'
            ].filter(item => item.toLowerCase().includes(query.toLowerCase()));
            
            if (results.length > 0) {
                alert('Resultados encontrados:\n\n' + results.join('\n'));
            } else {
                alert('Nenhum resultado encontrado para sua busca.');
            }
            
            $scope.toggleLoader(false);
            $scope.$apply();
        }, 1000);
    };
}]);

// Inicialização quando o documento estiver pronto
angular.element(document).ready(function() {
    // Remover classe no-js
    document.documentElement.classList.remove('no-js');
}); 