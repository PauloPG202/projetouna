import { useState } from 'react';
import '../styles/styles.css';

export default function Login() {
  const [modo, setModo] = useState('login'); // 'login' ou 'cadastro'
  const [tipo, setTipo] = useState('comum'); // 'comum' ou 'profissional'
  const [identificador, setIdentificador] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!identificador.trim() || !senha.trim()) {
      alert('Preencha todos os campos!');
      return;
    }

    if (tipo === 'profissional' && !identificador.endsWith('@ulife.com.br')) {
      alert('Profissionais devem usar um email institucional @ulife.com.br');
      return;
    }

    if (modo === 'cadastro') {
      if (senha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
      }
      alert(`Conta criada (${tipo}): ${identificador}`);
    } else {
      alert(`Login como ${tipo}: ${identificador}`);
    }

    setIdentificador('');
    setSenha('');
    setConfirmarSenha('');
  };

  return (
    <div className="pagina-login">
      <header className="cabecalho">
        <img src="/img/logo.png" alt="Entre Linhas" className="logo" />
        <h1 className="slogan">Privacidade para falar, profissionalismo para ouvir.</h1>
      </header>

      <section className="formulario-login">
        <h2>{modo === 'login' ? 'Entrar' : 'Criar Conta'}</h2>

        <div className="tipo-switch">
          <button
            className={tipo === 'comum' ? 'ativo' : ''}
            onClick={() => setTipo('comum')}
          >
            Usuário Comum
          </button>
          <button
            className={tipo === 'profissional' ? 'ativo' : ''}
            onClick={() => setTipo('profissional')}
          >
            Profissional
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="id">{tipo === 'comum' ? 'Apelido' : 'Email institucional'}</label>
          <input
            id="id"
            type="text"
            placeholder={tipo === 'comum' ? 'Ex: coração123' : 'exemplo@ulife.com.br'}
            value={identificador}
            onChange={(e) => setIdentificador(e.target.value)}
          />

          <label htmlFor="senha">Senha</label>
          <div className="senha-box">
            <input
              id="senha"
              type={mostrarSenha ? 'text' : 'password'}
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <img
              src={mostrarSenha ? '/img/password/view.png' : '/img/password/hide.png'}
              alt="Mostrar senha"
              className="toggle-senha"
              onClick={() => setMostrarSenha(!mostrarSenha)}
            />
          </div>

          {modo === 'cadastro' && (
            <>
              <label htmlFor="confirmar">Confirme sua senha</label>
              <div className="senha-box">
                <input
                  id="confirmar"
                  type={mostrarSenha ? 'text' : 'password'}
                  placeholder="Confirme a senha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                />
                <img
                  src={mostrarSenha ? '/img/password/view.png' : '/img/password/hide.png'}
                  alt="Mostrar senha"
                  className="toggle-senha"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                />
              </div>
            </>
          )}

          <button type="submit" className="btn-login-submit">
            {modo === 'login' ? 'Entrar' : 'Criar Conta'}
          </button>
        </form>

        <p className="alternar-modo">
          {modo === 'login' ? (
            <>
              Não tem conta?{' '}
              <button onClick={() => setModo('cadastro')}>Criar agora</button>
            </>
          ) : (
            <>
              Já tem conta?{' '}
              <button onClick={() => setModo('login')}>Fazer login</button>
            </>
          )}
        </p>
      </section>

      <footer className="rodape">
        <p>&copy; 2025 Entre Linhas — Todos os direitos reservados</p>
        <p><a href="#">Sobre</a> • <a href="#">Contato</a></p>
      </footer>
    </div>
  );
}