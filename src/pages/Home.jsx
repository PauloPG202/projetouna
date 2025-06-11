import React, { useState } from 'react';
import '../styles/styles.css';

const categorias = [
  'Relacionamento', 'Família', 'Emprego', 'Amizades', 'Vida Financeira',
  'Saúde Mental', 'Luto', 'Sexualidade', 'Autoestima', 'Outros'
];

const reacoes = [
  { label: 'Curtir!', img: '/img/reactions/like.png' },
  { label: 'Força', img: '/img/reactions/força.png' },
  { label: 'Você não está sozinho!', img: '/img/reactions/hug.png' },
  { label: 'Isso irá passar!', img: '/img/reactions/vaipassar.png' },
  { label: 'Já deu tudo certo!', img: '/img/reactions/certo.png' },
];

export default function Home() {
  const [texto, setTexto] = useState('');
  const [selecionadas, setSelecionadas] = useState([]);
  const [filtro, setFiltro] = useState([]);
  const [desabafos, setDesabafos] = useState([]);
  const [menuReacaoAberto, setMenuReacaoAberto] = useState(null);
  const [reacoesAplicadas, setReacoesAplicadas] = useState({});
  const [comentarios, setComentarios] = useState({});
  const [mostrarComentario, setMostrarComentario] = useState(null);
  const [comentarioTexto, setComentarioTexto] = useState('');

  const toggleCategoria = (cat, origem = 'post') => {
    const lista = origem === 'post' ? selecionadas : filtro;
    const setLista = origem === 'post' ? setSelecionadas : setFiltro;

    if (lista.includes(cat)) {
      setLista(lista.filter(c => c !== cat));
    } else {
      setLista([...lista, cat]);
    }
  };

  const postar = () => {
    if (!texto.trim() || selecionadas.length === 0) {
      alert('Digite um desabafo válido e selecione ao menos uma categoria.');
      return;
    }

    const novoDesabafo = {
      id: Date.now(),
      texto,
      categorias: selecionadas,
      data: new Date().toLocaleString()
    };

    setDesabafos([novoDesabafo, ...desabafos]);
    setTexto('');
    setSelecionadas([]);
  };

  const aplicarReacao = (id, reacao) => {
    setReacoesAplicadas(prev => ({
      ...prev,
      [id]: reacao
    }));

    setMenuReacaoAberto(null);

    const elemento = document.getElementById(`desabafo-${id}`);
    if (elemento) {
      elemento.classList.add('reacted');
      setTimeout(() => elemento.classList.remove('reacted'), 1000);
    }
  };

  const enviarComentario = (id) => {
    if (!comentarioTexto.trim()) return;

    setComentarios(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), {
        texto: comentarioTexto,
        data: new Date().toLocaleString()
      }]
    }));

    setComentarioTexto('');
    setMostrarComentario(null);
  };

  return (
    <div className="pagina-home">
      <header className="cabecalho">
        <img src="/img/logo.png" alt="Entre Linhas" className="logo" />
        <h1 className="slogan">Privacidade para falar, profissionalismo para ouvir.</h1>
      </header>

      <section className="boas-vindas">
        <p>No <strong>Entre Linhas</strong>, acreditamos que todos têm algo a dizer — sentimentos, angústias e pensamentos que, muitas vezes, não encontram espaço para serem expressos no dia a dia.</p>
        <p>Nosso objetivo é oferecer um ambiente anônimo, seguro e respeitoso, onde qualquer pessoa possa desabafar livremente e se sentir ouvida.</p>
        <p>Criamos este espaço para acolher, não julgar. Porque ser ouvido, mesmo sem revelar quem você é, pode fazer toda a diferença.</p>
        <p>Aqui, sua voz tem valor — mesmo em silêncio, você não está sozinho.</p>
      </section>

      <div className="login-buttons">
        <button className="btn login-user"><img src="/img/user.png" alt="user" /></button>
      </div>

      <section className="bloco-desabafo">
        <h2>Escreva seu desabafo</h2>
        <textarea
          className="desabafo-input"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Digite aqui seu desabafo..."
        />
        <div className="categoria-lista">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => toggleCategoria(cat)}
              className={`btn-categoria ${selecionadas.includes(cat) ? 'selecionada' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button className="btn postar-btn" onClick={postar}>Postar</button>
      </section>

      <section className="filtro-categorias">
        <h3>Filtrar por categorias</h3>
        <div className="categoria-lista">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => toggleCategoria(cat, 'filtro')}
              className={`btn-categoria ${filtro.includes(cat) ? 'filtro-selecionado' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="timeline">
        <h3>Timeline</h3>
        {desabafos.length === 0 ? (
          <p className="sem-desabafos">Nenhum desabafo ainda.</p>
        ) : (
          desabafos
            .filter(d => filtro.length === 0 || d.categorias.some(c => filtro.includes(c)))
            .map(d => (
              <div key={d.id} id={`desabafo-${d.id}`} className="desabafo">
                <p>{d.texto}</p>
                <div className="categorias">
                  {d.categorias.map(cat => (
                    <span key={cat} className="tag">{cat}</span>
                  ))}
                </div>
                <small>{d.data}</small>

                <div
                  className="reagir-area"
                  onMouseEnter={() => setMenuReacaoAberto(d.id)}
                  onMouseLeave={() => setMenuReacaoAberto(null)}
                >
                  <button className="btn-reagir">Reagir</button>

                  {menuReacaoAberto === d.id && (
                    <div className="reacoes-popup">
                      {reacoes.map(r => (
                        <button
                          key={r.label}
                          onClick={() => aplicarReacao(d.id, r)}
                          className="btn-reacao"
                          title={r.label}
                        >
                          <img src={r.img} alt={r.label} />
                        </button>
                      ))}
                    </div>
                  )}

                  {reacoesAplicadas[d.id] && (
                    <div className="reacao-aplicada">
                      <img src={reacoesAplicadas[d.id].img} alt={reacoesAplicadas[d.id].label} />
                      <span>{reacoesAplicadas[d.id].label}</span>
                    </div>
                  )}
                </div>

                <div className="comentar-area">
                  <button
                    className="btn-comentar"
                    onClick={() =>
                      setMostrarComentario(mostrarComentario === d.id ? null : d.id)
                    }
                  >
                    Comentar
                  </button>

                  {mostrarComentario === d.id && (
                    <div className="comentario-box">
                      <textarea
                        className="comentario-input"
                        value={comentarioTexto}
                        onChange={(e) => setComentarioTexto(e.target.value)}
                        placeholder="Digite seu comentário..."
                      />
                      <button onClick={() => enviarComentario(d.id)} className="btn enviar-btn">Enviar</button>
                    </div>
                  )}

                  {comentarios[d.id] && (
                    <div className="lista-comentarios">
                      {comentarios[d.id].map((c, i) => (
                        <div key={i} className="comentario">
                          <p>{c.texto}</p>
                          <small>{c.data}</small>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
        )}
      </section>

      <footer className="rodape">
        <p>&copy; 2025 Entre Linhas — Todos os direitos reservados</p>
        <p><a href="#">Sobre</a> • <a href="#">Contato</a></p>
      </footer>
    </div>
  );
}
