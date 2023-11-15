# 🏡 CasaIdeal: Seu App de Busca de Imóveis Ideal

O CasaIdeal é uma aplicação desenvolvida utilizando Node.js, Next.js e MongoDB, projetada para atender agentes imobiliários na escolha do imóvel ideal para seus clientes, levando em consideração requisitos específicos.

## Funcionalidades Principais

- **Filtro Avançado de Pesquisa:** Utilize um filtro avançado para encontrar o imóvel perfeito, considerando tipologia, valor máximo, tipo, tipo de negócio e características específicas, com a capacidade de atribuir níveis de priorização, facilitando a seleção de imóveis ideais para seus clientes, proporcionando uma experiência personalizada.
- **Visualização Detalhada de Imóveis:** Após a geração da lista de imóveis pelo filtro, abra a página específica de cada imóvel para acessar todas as informações necessárias para a execução do negócio.

## Tecnologias Utilizadas

- **Node.js:** Base da aplicação, proporcionando uma execução eficiente do lado do servidor.
- **Next.js:** Framework React para uma experiência de desenvolvimento moderna e eficiente.
- **MongoDB:** Banco de dados NoSQL para armazenar e gerenciar informações sobre imóveis de forma flexível e escalável.

## Como Iniciar

Siga estas etapas para configurar e executar o CasaIdeal em seu ambiente de desenvolvimento:

1. **Pré-requisitos:**
   - Certifique-se de ter o Node.js instalado em sua máquina.
   - Garanta que o MongoDB esteja instalado, e utilize o MongoDB Compass para facilitar a administração visual do banco de dados.

2. **Configuração do Banco de Dados:**
   - Abra o MongoDB Compass e conecte-se a uma instância local ou remota do MongoDB.
   - Crie uma nova database chamada "CasaIdeal".
   - Dentro da database "CasaIdeal", crie uma collection chamada "imoveis".

3. **Seed de Imóveis:**
   - Na raiz do projeto, localize o arquivo `imoveis.json` em `/public/assets/data`.
   - Utilize o MongoDB Compass para [importar este arquivo](https://www.mongodb.com/docs/compass/current/import-export/) (`imoveis.json`) na collection "imoveis" da database "CasaIdeal". Isso preencherá a collection com dados de exemplo.

4. **Instalação das Dependências:**
   ```bash
   npm install
   ```

5. **Inicie a aplicação:**
   ```bash
   npm run dev
   ```

6. **Acesse a aplicação:**
    - Abra seu navegador e visite http://localhost:3000 para explorar imóveis.

