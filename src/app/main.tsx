import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'

import '../style/index.css'
import '../style/App.css'
import '../style/Grid.css';
import '../style/Border.css';
import '../style/Route.css';
import '../style/Buff.css';
import '../style/Icon.css';
import '../style/Nav.css'
import '../style/Modal.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
