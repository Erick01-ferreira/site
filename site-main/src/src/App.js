import { useState, useEffect } from 'react';

function App() {
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    fetch('/api/mensagem')
      .then(res => res.text())
      .then(data => setMensagem(data));
  }, []);

  return (
    <div>
      <h1>Meu App React</h1>
      <p>Mensagem do backend: {mensagem}</p>
    </div>
  );
}

export default App;