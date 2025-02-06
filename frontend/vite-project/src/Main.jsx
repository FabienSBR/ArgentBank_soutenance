// Point d’entrée principal de l'application React

// Monte l'application dans le DOM, applique les styles CSS, et intègre Redux pour la gestion de l'état global


import React from 'react'; // import du framework React
import { createRoot } from 'react-dom/client'; // méthode de react-dom/client qui initialise l'affichage React
import { Provider } from 'react-redux'; // fournit le store Redux à l'application via Provider pour gérer l'état global
import App from './App.jsx'; // composant principal de l'application
import { store } from './Store.jsx'; // store Redux qui centralise l'état global de l'application

// import des fichiers de style
import "./main.css";
import "./styles/pages/sign-in.css";
import "./styles/pages/user.css";
import "./styles/components/features.css";
import "./styles/components/footer.css";
import "./styles/components/header.css";
import "./styles/components/hero.css";
import "./styles/components/user-content.css";
import "./styles/components/sign-in-content.css";


// Montage de l'application dans le DOM

// document.getElementById('root') -> sélectionne 'root' dans le fichier HTML, où React injecte l'application
// createRoot(...).render(...) -> crée une racine React et monte App dans le DOM

// <Provider store={store}> -> permet aux composants d'accéder au store Redux (gestion de l'état global)
// => obligatoire pour utiliser useSelector et useDispatch dans l’application

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
