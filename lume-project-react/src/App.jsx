// Em src/App.jsx

import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes'; // Verifique se o caminho para o seu arquivo de rotas está correto

function App() {
  return (
    // Aqui é o único lugar onde o <BrowserRouter> deve viver.
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
