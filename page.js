import React from 'react';

// Simulando os dados que virão do arquivo produtos.json
const produtos = [
  { id: 1, nome: "Produto Exemplo", preco: "R$ 0,00", link: "#", imagem: "https://via.placeholder.com/300" }
];

export default function Home() {
  return (
    <main style={{ fontFamily: 'sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#333' }}>🛒 Compre Aqui Sempre</h1>
        <p style={{ color: '#666' }}>As melhores ofertas do Mercado Livre, curadas por nossa inteligência artificial.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {produtos.map((prod) => (
          <div key={prod.id} style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <img src={prod.imagem} alt={prod.nome} style={{ width: '100%', borderRadius: '8px', marginBottom: '15px' }} />
            <h3 style={{ fontSize: '1.1rem', marginBottom: '10px', color: '#444' }}>{prod.nome}</h3>
            <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#00a650', marginBottom: '15px' }}>{prod.preco}</p>
            <a href={prod.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block', backgroundColor: '#3483fa', color: '#fff', padding: '10px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>
              Ver no Mercado Livre
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
