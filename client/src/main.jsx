import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import App from './App.jsx'
import './index.css'
import { PersistGate } from 'redux-persist/integration/react';
import { persister } from './app/store.js';

createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <PersistGate persistor={persister} >
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>

)
