var api_token = 'pk.eyJ1IjoiaXNrZXQtZHMiLCJhIjoiY2tsaW8wbGk4MjlydzJ3bWw0dmZtamx5YiJ9.EB0XJQ8PYenbiHE1rZJ2jw';

var leps_api_token = 'pk.eyJ1IjoibWF0aGV1c2xlcHMiLCJhIjoiY2t4OThqbXBtMDBpZzJwdGhhcmkzbzVvcyJ9.oiI_8BwQysQvBumg-wKOUQ'

var config = {
    style: 'mapbox://styles/isket-ds/cklip8mlv05pr17qbx28izgsp/draft',
    accessToken: api_token,
    showMarkers: false,
    markerColor: '#3FB1CE',
    theme: 'dark',
    use3dTerrain: false,
    title: 'Impacto da pandemia de 2020 no mercado de Airbnb',
    subtitle: 'A equipe da Isket fez uma análise do mercado de short-stay na cidade de Curitiba antes e depois da pandemia do COVID-19.',
    byline: 'Por Arthur Rocha | Fevereiro - 2021',
    footer: 'Isket 2021: todos os direitos reservados',
    chapters: [
        {
            id: 'inicio',
            alignment: 'left',
            hidden: false,
            title: 'Antes da pandemia',
            //image: './path/to/image/source.png',
            description: 'No início de 2020, Curitiba contava com mais de 2.500 anúncios ativos na plataforma do Airbnb.',
            location: {
                center: [-49.27100, -25.42783],
                zoom: 10.87,
                pitch: 0.50,
                bearing: -28.00
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                // {
                //     layer: 'layer-name',
                //     opacity: 1,
                //     duration: 5000
                // }
            ],
            onChapterExit: [
                // {
                //     layer: 'layer-name',
                //     opacity: 0
                // }
            ]
        },
        {
            id: 'zoom-centro',
            alignment: 'right',
            hidden: false,
            title: 'Região Matriz',
            //image: './path/to/image/source.png',
            description: 'Desses mais de 2.500 Airbnb\'s, aproximadamente 59% se localizavam na região Matriz de Curitiba. Essa região contempla os bairros centrais da cidade (Água Verde, Batel, Centro, Juvevê, Centro Cívico, Cristo Rei, entre outros).',
            location: {
                center: [-49.26981, -25.42904],
                zoom: 13.33,
                pitch: 60.00,
                bearing: -29.60
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                 {
                     layer: 'regiao-matriz',
                     opacity: .55,
                     duration: 800
                 }
            ],
            onChapterExit: [
                {
                    layer: 'regiao-matriz',
                    opacity: 0
                }
            ]
        },
        {
            id: 'pontos-antigos',
            alignment: 'left',
            hidden: false,
            title: 'Matriz (Antes)',
            image: './img/escala.svg',
            description: 'Em Fevereiro de 2020, o valor médio da diária na região Matriz era de R$ 135,00 aproximadamente.',
            location: {
                center: [-49.27002, -25.42894],
                zoom: 14.39,
                pitch: 54.50,
                bearing: -67.20
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'airbnb-antes',
                    opacity: 1,
                    duration: 800
                }
            ],
            onChapterExit: [
                {
                    layer: 'airbnb-antes',
                    opacity: 0
                }
            ]
        },
        {
            id: 'pontos-novos',
            alignment: 'right',
            hidden: false,
            title: 'Matriz (Depois)',
            image: './img/escala.svg',
            description: 'Em Novembro de 2020, o número total de airbnbs na região Matriz reduziu mais de 30% se comparado a Fevereiro do mesmo ano! Enquanto isso, o valor médio da diária teve uma redução de cerca de 10% em meados de Agosto, mas em Novembro subiu por volta de 27%, demonstrando a necessidade do mercado de "compensar" o que foi perdido na pandemia.',
            location: {
                center: [-49.27002, -25.42894],
                zoom: 14.39,
                pitch: 54.50,
                bearing: -67.20
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'airbnb-depois',
                    opacity: 1,
                    duration: 800
                }
            ],
            onChapterExit: [
                {
                    layer: 'airbnb-depois',
                    opacity: 0
                }
            ]
        },
        {
            id: 'regioes-atingidas',
            alignment: 'left',
            hidden: false,
            title: 'Regiões mais atingidas',
            //image: './path/to/image/source.png',
            description: 'Os bairros com maior índice de redução foram Juvevê, Vila Izabel, Atuba, Mercês e Capão Raso.',
            location: {
                center: [-49.27100, -25.42783],
                zoom: 11.5,
                pitch: 0.50,
                bearing: -28.00
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [ 
                {                  
                    layer: 'regioes-mais-afetadas',
                    opacity: 1,
                    duration: 800
                 }
        ],
            onChapterExit: [
                {                  
                    layer: 'regioes-mais-afetadas',
                    opacity: 0
                 }
            ]
        },
        {
            id: 'zoom-out-cwb',
            alignment: 'center',
            hidden: false,
            title: 'Cenário Geral',
            //image: './path/to/image/source.png',
            description: 'No geral, Curitiba teve uma redução de aproximadamente 25% na quantidade de Airbnbs entre Fevereiro a Novembro de 2020. Por outro lado, apesar do aumento de preço visto nos últimos meses, há expectativas de retorno desse mercado, acompanhando o crescimento imobiliário da cidade.',
            location: {
                center: [-49.27100, -25.42783],
                zoom: 10,
                pitch: 0.50,
                bearing: -28.00
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [ 
                {                  
                    layer: 'contorno-cwb',
                    opacity: 1,
                    duration: 800
                 }
        ],
            onChapterExit: [
                {                  
                    layer: 'contorno-cwb',
                    opacity: 0
                 }
            ]
        }
    ]
};

var configLeps = {
    style: 'mapbox://styles/matheusleps/ckxz0stgh0phu14l9ucpfad1t',
    accessToken: leps_api_token,
    showMarkers: false,
    markerColor: '#3FB1CE',
    theme: 'dark',
    use3dTerrain: false,
    title: 'Resumo Mercado Imobiliário 2021 em Curitiba',
    subtitle: 'A equipe da Isket fez uma análise de como foi o ano de 2021 para o setor imobiliário em Curitiba, ano onde surgiram as primeiras vacinas aparecerem contra o COVID-19.',
    byline: 'Por Matheus R. Oliveira | Dezembro - 2021',
    footer: 'Isket 2021: todos os direitos reservados',
    chapters: [
        {
            id: 'inicio',
            alignment: 'left',
            hidden: false,
            title: 'Bairros Destaques',
            description: 'O Água Verde liderou em quantidade de vendas o ano de 2021 com valor médio de R$ 776.000,00. O Centro foi destaque em quantidade de locações com valor médio de R$ 1.150,00.',
            location: {
                center: [-49.27100, -25.42783],
                zoom: 12.23,
                pitch: 0.50,
                bearing: -28.00
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'centro-cwb',
                    opacity: .55
                },
                {
                    layer: 'agua-verde',
                    opacity: .55
                },
            ],
            onChapterExit: [
                {
                     layer: 'centro-cwb',
                     opacity: 0
                },
                {
                    layer: 'agua-verde',
                    opacity: 0
               }
            ]
        },
        {
            id: 'zoom-quartos',
            alignment: 'right',
            hidden: false,
            title: 'Vendas',
            description: 'O tipo de imóvel mais comprado na capital paranaense foram os apartamentos de 3 (três) quartos.',
            location: {
                center: [-49.28277, -25.45511],
                zoom: 14.62,
                pitch: 54.50,
                bearing: 15.20
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'agua-verde-zoom',
                    opacity: .44
                },
                {
                    layer: 'pontos-3q',
                    opacity: 1
                }
            ],
            onChapterExit: [
                {
                    layer: 'pontos-3q',
                    opacity: 0
                },
                {
                    layer: 'agua-verde-zoom',
                    opacity: 0
                }
            ]
        },
        {
            id: 'zoom-dois-quartos',
            alignment: 'left',
            hidden: false,
            title: 'Locação',
            description: 'Já o tipo de imóvel mais locado em Curitiba foram os apartamentos de 2 (dois) quartos.',
            location: {
                center: [-49.26976, -25.43182],
                zoom: 14.62,
                pitch: 47,
                bearing: -60.80
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'centro-zoom',
                    opacity: .44
                },
                {
                    layer: 'pontos-2q',
                    opacity: 1
                }
            ],
            onChapterExit: [
                {
                    layer: 'centro-zoom',
                    opacity: 0
                },
                {
                    layer: 'pontos-2q',
                    opacity: 0
                }
            ]
        },
        {
            id: 'zoom-centro',
            alignment: 'right',
            hidden: false,
            title: 'Valorização',
            description: 'Cabral foi o bairro mais valorizado, aproximadamente 28% a mais em relação ao ano anterior (2020).',
            location: {
                center: [-49.25212, -25.40755],
                zoom: 14.87,
                pitch: 48.50,
                bearing: 16
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                 {
                     layer: 'cabral',
                     opacity: .55,
                     duration: 800
                 }
            ],
            onChapterExit: [
                {
                    layer: 'cabral',
                    opacity: 0
                }
            ]
        },
        {
            id: 'zoom-out-cwb',
            alignment: 'center',
            hidden: false,
            title: 'Cenário Geral',
            //image: './path/to/image/source.png',
            description: 'O mercado imobiliário de Curitiba ainda se recupera da pandemia, as classes mais baixas foram afetadas e isso resultou em uma diminuição no valor dos aluguéis. Já os valores de venda se mantiveram em alta, mostrando que o público de classe mais alta não deixou de comprar imóveis.',
            location: {
                center: [-49.27100, -25.42783],
                zoom: 10.5,
                pitch: 0,
                bearing: 7.2
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [ 
                {                  
                    layer: 'curitiba',
                    opacity: 1,
                    duration: 800
                 }
        ],
            onChapterExit: [
                {                  
                    layer: 'curitiba',
                    opacity: 0
                 }
            ]
        }
    ]
};