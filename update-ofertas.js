const fs = require('fs');
const path = require('path');

const AFID = 'p20250725122731';

async function run() {
    console.log('🌐 Servidor Netlify: Minerando Ofertas...');
    const dir = path.join(process.cwd(), 'src/data');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    try {
        const res = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=iphone&limit=12');
        const data = await res.json();

        const p = (data.results || []).map(i => ({
            nome: i.title.substring(0, 50),
            preco: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(i.price),
            link: `https://www.mercadolivre.com.br/sec/ads/v2/link?murl=${encodeURIComponent(i.permalink)}&afid=${AFID}`,
            imagem: i.thumbnail.replace('-I.jpg', '-O.jpg')
        }));

        fs.writeFileSync(path.join(dir, 'produtos.json'), JSON.stringify(p, null, 2));
        console.log(`✅ ${p.length} Produtos injetados.`);
    } catch (e) {
        console.log('⚠️ Erro na API, usando banco vazio para não quebrar o build:', e.message);
        fs.writeFileSync(path.join(dir, 'produtos.json'), '[]');
    }
}

run();