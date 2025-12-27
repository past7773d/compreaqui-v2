const fs = require('fs');
const AFID = 'p20250725122731';

async function run() {
    console.log('🌐 Servidor Netlify: Buscando ofertas reais...');
    try {
        // Buscando direto da API oficial de tendências (mais estável)
        const url = `https://api.mercadolibre.com/sites/MLB/search?q=iphone&limit=12`;
        const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const data = await res.json();

        const results = data.results || [];
        if (results.length === 0) throw new Error('API sem resultados no servidor');

        const p = results.map(i => ({
            nome: i.title.substring(0, 50),
            preco: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(i.price),
            link: `https://www.mercadolivre.com.br/sec/ads/v2/link?murl=${encodeURIComponent(i.permalink)}&afid=${AFID}`,
            imagem: i.thumbnail.replace('-I.jpg', '-O.jpg')
        }));

        const dir = './src/data';
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(`${dir}/produtos.json`, JSON.stringify(p, null, 2));

        console.log('✅ Dados injetados com sucesso no build!');
    } catch (e) {
        console.log('❌ Erro no build:', e.message);
        // Cria um arquivo vazio para não quebrar o build do Next.js
        if (!fs.existsSync('./src/data')) fs.mkdirSync('./src/data', { recursive: true });
        fs.writeFileSync('./src/data/produtos.json', '[]');
    }
}
run();