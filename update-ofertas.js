const fs = require('fs');
const path = require('path');
const AFID = 'p20250725122731';

async function run() {
    console.log('🛡️ Segurança: Build 15.1.5 | Minerando Ofertas...');
    const dir = path.join(process.cwd(), 'src/data');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    try {
        // Busca genérica para garantir resultados e lucros
        const res = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=smartphone&limit=12', {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const data = await res.json();
        
        const results = data.results || [];
        const p = results.map(i => ({
            nome: i.title.substring(0, 45),
            preco: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(i.price),
            link: `https://www.mercadolivre.com.br/sec/ads/v2/link?murl=${encodeURIComponent(i.permalink)}&afid=${AFID}`,
            imagem: i.thumbnail.replace('-I.jpg', '-O.jpg')
        }));

        fs.writeFileSync(path.join(dir, 'produtos.json'), JSON.stringify(p, null, 2));
        console.log(`✅ Sucesso: ${p.length} produtos injetados.`);
    } catch (e) {
        console.log('⚠️ Erro na mineração:', e.message);
        fs.writeFileSync(path.join(dir, 'produtos.json'), '[]');
    }
}
run();
