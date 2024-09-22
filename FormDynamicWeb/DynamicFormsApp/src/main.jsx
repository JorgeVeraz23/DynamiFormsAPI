import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts'; // Asegúrate de que esta ruta sea correcta
import './index.css';
import AppRoutes from './routes/AppRoutes.jsx'; // Asegúrate de que la extensión es correcta

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </StrictMode>
  );
} else {
  console.error('Elemento raíz no encontrado');
}
