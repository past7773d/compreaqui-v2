const fs = require('fs');
const path = require('path');
const AFID = 'p20250725122731';

async function run() {
    console.log('🛡️ Segurança: Rodando Build Patched (15.1.5)');
    const dir = path.join(process.cwd(), 'src/data');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    try {
        // Adicionado User-Agent para evitar bloqueio 403/Empty
        const res = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=smartphone&limit=12', {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
        });
        const data = await res.json();
        
        const p = (data.results || []).map(i => ({
            nome: i.title.substring(0, 45),
            preco: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(i.price),
            link: `https://www.mercadolivre.com.br/sec/ads/v2/link?murl=${encodeURIComponent(i.permalink)}&afid=${AFID}`,
            imagem: i.thumbnail.replace('-I.jpg', '-O.jpg')
        }));

        fs.writeFileSync(path.join(dir, 'produtos.json'), JSON.stringify(p, null, 2));
        console.log(`✅ Sucesso: ${p.length} produtos minerados.`);
    } catch (e) {
        console.log('⚠️ Erro no build:', e.message);
        fs.writeFileSync(path.join(dir, 'produtos.json'), '[]');
    }
}
run();
