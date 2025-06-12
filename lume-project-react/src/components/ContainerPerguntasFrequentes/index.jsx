import styles from '../ContainerPerguntasFrequentes/ContainerPerguntasFrequentes.module.css'

function ContainerPerguntasFrequentes() {
  return (
    <section className={styles.faq_container} aria-labelledby="faq-title">
      <h1 id="faq-title" className={styles.title}>Perguntas Frequentes</h1>

      <div className={styles.faq_grid}>
        <div className={styles.faq_column} role="list">
          <h2>Como funciona o marketplace?</h2>
          <p>Nosso marketplace conecta vendedores conscientes com consumidores sustentáveis 🌿</p>
          <ul>
            <li>Navegue pelos produtos ecológicos 🛍️</li>
            <li>Compre de quem compartilha os mesmos valores 🌱</li>
            <li>Apoie o meio ambiente com cada compra! 🌍</li>
          </ul>

          <h2>Quero vender! Como faço?</h2>
          <ul>
            <li>Cadastre-se como vendedor</li>
            <li>Complete seu perfil e informações de pagamento</li>
            <li>Cadastre seus produtos com fotos, preço e descrição</li>
            <li>Aguarde a validação (se necessário)</li>
            <li>Comece a vender! 📦</li>
          </ul>

          <h2>Trocas e devoluções</h2>
          <p>Se precisar trocar ou devolver:</p>
          <ul>
            <li>Prazo: até 7 dias após o recebimento</li>
            <li>Produto deve estar em boas condições, sem uso</li>
            <li>Alguns produtos podem ter política específica de troca</li>
            <li>Envie um e-mail para nosso suporte com o número do pedido</li>
          </ul>

          <h2>Precisa de ajuda?</h2>
          <p>Fale com a gente!</p>
          <ul>
            <li>Atendimento de segunda a sexta, das 9h às 18h.</li>
            <li>contato@nomedamarketplace.com</li>
            <li>@lumeluz_ · 11-2345-4432 · Facebook</li>
          </ul>
        </div>

        <div className={styles.faq_column} role="list">
          <h2>Quais formas de pagamento posso usar?</h2>
          <ul>
            <li><strong>Cartão de crédito</strong> (parcelamos!)</li>
            <li>Pix</li>
            <li>Carteiras digitais (como Mercado Pago ou similares)</li>
          </ul>

          <h2>Entrega: como funciona?</h2>
          <ul>
            <li>Trabalhamos com Correios e transportadoras parceiras</li>
            <li>Produtos com entrega ecológica (opcional em algumas regiões)</li>
            <li>Você recebe um código de rastreio no e-mail assim que o pedido for enviado</li>
            <li>Prazos variam de acordo com a sua localização</li>
          </ul>

          <h2>O que é um produto sustentável?</h2>
          <p>Produtos sustentáveis são aqueles que:</p>
          <ul>
            <li>Reduzem o impacto no meio ambiente</li>
            <li>São feitos com materiais recicláveis ou biodegradáveis</li>
            <li>Utilizam produção ética e com menos desperdício</li>
            <li>São locais, veganos, ou feitos à mão com responsabilidade</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ContainerPerguntasFrequentes
