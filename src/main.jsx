import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/global.css';
import './styles/animations.css';
import './styles/navbar.css';
import './styles/components.css';
import './styles/home.css';
import './styles/about.css';
import './styles/services.css';
import './styles/industries.css';
import './styles/contact.css';
import './styles/footer.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
