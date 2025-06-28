import imagemProduto1 from '../assets/img/imagemProduto1.png';
import imagemProduto2 from '../assets/img/imagemProduto2.png';
import imagemProduto3 from '../assets/img/imagemProduto3.png';
import imagemProduto4 from '../assets/img/imagemProduto4.png';
import imagemProdutoEspecificoGrande from '../assets/img/imagemProdutoEspecificoGrande.png';
import customerPhoto1 from '../assets/img/agua1.png';
import customerPhoto2 from '../assets/img/agua1.png';
import customerPhoto3 from '../assets/img/agua1.png';

// fonte de dados "mockada". No futuro, virá de uma API do Java para o ProductContext.
export const listaDeProdutos = [
    // {
    //     id: 1,
    //     productName: 'Camiseta Orgânica Branca',
    //     companyName: 'EcoVest',
    //     isVerified: true,
    //     rating: 4.9,
    //     originalPrice: 99.90,
    //     currentPrice: 89.90,
    //     discountPercentage: 10,
    //     sells: 50,
    //     date: '2025-06-03T12:00:00Z',
    //     imageUrl: imagemProduto1,
    //     galleryImages: [imagemProduto1, imagemProduto2, imagemProduto3, imagemProduto4],
    //     imageAlt: 'Camiseta Orgânica',
    //     installments: 'em 3x R$ 29,97',
    //     specialDiscount: '10% OFF na primeira compra',
    //     shippingInfo: 'gratuito',
    //     benefits: ['Algodão Orgânico', 'Sustentável'],
    //     categoria: 'Roupas ecológicas',
    //     description: 'Uma camiseta clássica feita com 100% de algodão orgânico, perfeita para o dia a dia, com um toque macio e um caimento confortável. Produzida de forma sustentável para um guarda-roupa mais consciente.',
    //     features: ['100% Algodão Orgânico', 'Certificado GOTS', 'Produção Fair Trade', 'Tingimento Natural', 'Livre de Plástico'],
    //     reviews: [],
    //     ratingSummary: {},
    //     customerMedia: [],
    //     relatedProducts: [2, 3, 4, 9]
    // },
    // {
    //     id: 2,
    //     productName: 'Sabonete Vegano em Barra',
    //     companyName: 'Aroma Natural',
    //     isVerified: true,
    //     rating: 4.8,
    //     originalPrice: 24.90,
    //     currentPrice: 19.50,
    //     discountPercentage: 21,
    //     sells: 150,
    //     date: '2025-05-20T12:00:00Z',
    //     imageUrl: imagemProdutoEspecificoGrande,
    //     galleryImages: [imagemProdutoEspecificoGrande, imagemProduto1, imagemProduto2, imagemProduto3],
    //     imageAlt: 'Sabonete de Lavanda',
    //     installments: 'em 2x R$ 9,75',
    //     specialDiscount: null,
    //     shippingInfo: 'R$ 5,00',
    //     benefits: ['Natural', 'Vegano'],
    //     categoria: 'Casa e decoração',
    //     description: 'Ideal para limpeza do corpo sutil e abertura de caminhos. O Sabonete 7 ervas, além de promover uma limpeza no corpo físico, também age no campo espiritual, equilibrando as energias. Combinação entre si, as ervas podem ter diferentes funções, como limpar, energizar e acalmar.',
    //     features: ['Vegano e Cruelty-Free', 'Aroma Floral', 'Com óleos essenciais', 'Embalagem reciclável', 'Aproximadamente 100g'],
    //     reviews: [
    //         { id: 1, author: 'Ana P.', rating: 5, title: 'Gostei muito!', text: 'Era exatamente o que eu estava precisando. Cheiro maravilhoso!', date: '21/05/2025' },
    //         { id: 2, author: 'João C.', rating: 5, title: 'Excelente', text: 'Deixa a pele super macia e o aroma é relaxante. Recomendo.', date: '20/05/2025' },
    //         { id: 3, author: 'Mariana S.', rating: 4, title: 'Muito bom', text: 'Ótimo produto, só achei que derrete um pouco rápido no banho.', date: '18/05/2025' },
    //     ],
    //     ratingSummary: { 5: 28, 4: 2, 3: 1, 2: 0, 1: 0 },
    //     customerMedia: [customerPhoto1, customerPhoto2, customerPhoto3],
    //     relatedProducts: [1, 3, 4, 5]
    // },
    // {
    //     id: 3,
    //     productName: 'Tênis Vegano Urbano',
    //     companyName: 'Pé Leve',
    //     isVerified: false,
    //     rating: 4.5,
    //     originalPrice: 249.00,
    //     currentPrice: 249.00,
    //     discountPercentage: 0,
    //     sells: 25,
    //     date: '2025-04-10T12:00:00Z',
    //     imageUrl: imagemProduto3,
    //     galleryImages: [imagemProduto3, imagemProduto4, imagemProduto1, imagemProduto2],
    //     imageAlt: 'Tênis Vegano',
    //     installments: 'em 6x R$ 41,50',
    //     specialDiscount: null,
    //     shippingInfo: 'gratuito',
    //     benefits: ['Material Reciclado', 'Cruelty-free'],
    //     categoria: 'Calçados veganos',
    //     description: 'Conforto e estilo para o seu dia a dia, com a consciência tranquila. Este tênis é feito com lona de algodão reciclado e solado de borracha natural, provando que moda e sustentabilidade podem andar juntas.',
    //     features: ['100% Vegano', 'Solado de Borracha Natural da Amazônia', 'Lona Reciclada', 'Cadarços de Algodão Orgânico', 'Feito no Brasil'],
    //     reviews: [
    //         { id: 5, author: 'Lucas R.', rating: 5, title: 'Muito confortável!', text: 'Além de lindo, é super confortável para usar o dia todo.', date: '10/05/2025' },
    //     ],
    //     ratingSummary: { 5: 15, 4: 8, 3: 2, 2: 0, 1: 0 },
    //     customerMedia: [customerPhoto2, customerPhoto3],
    //     relatedProducts: [1, 2, 4, 10]
    // },
    // {
    //     id: 4,
    //     productName: 'Kit Limpeza Ecológico',
    //     companyName: 'Casa Limpa Verde',
    //     isVerified: true,
    //     rating: 5.0,
    //     originalPrice: 140.00,
    //     currentPrice: 120.00,
    //     discountPercentage: 15,
    //     sells: 70,
    //     date: '2025-06-01T12:00:00Z',
    //     imageUrl: imagemProduto4,
    //     galleryImages: [imagemProduto4, imagemProduto2, imagemProduto1, imagemProduto3],
    //     imageAlt: 'Kit Limpeza Ecológico',
    //     installments: 'em 4x R$ 30,00',
    //     specialDiscount: null,
    //     shippingInfo: 'gratuito',
    //     benefits: ['Biodegradável', 'Rende Mais'],
    //     categoria: 'Produtos de limpeza ecológicos',
    //     description: 'Limpe sua casa de forma eficiente e sem agredir o planeta. Nosso kit contém produtos concentrados e biodegradáveis que cuidam do seu lar e da natureza.',
    //     features: ['Fórmula Hipoalergênica', 'Livre de Fosfatos e Cloro', 'Embalagens 100% Recicladas e Recicláveis', 'Produto Concentrado', 'Não testado em animais'],
    //     reviews: [
    //         { id: 6, author: 'Sofia L.', rating: 5, title: 'Perfeito!', text: 'Limpa muito bem e o cheiro é suave. Adorei saber que não polui o meio ambiente.', date: '01/06/2025' },
    //     ],
    //     ratingSummary: { 5: 65, 4: 5, 3: 0, 2: 0, 1: 0 },
    //     customerMedia: [customerPhoto1, customerPhoto3],
    //     relatedProducts: [1, 2, 3, 7]
    // }
]
