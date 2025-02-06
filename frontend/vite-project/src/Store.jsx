// STORE REDUX

// Ce code configure et exporte un store Redux en utilisant @reduxjs/toolkit
// Le store correspond à l'endroit où est centralisé, stocké et géré l'état global de l'application
// Il est géré avec un reducer (authReducer) qui gère l’état lié à l’authentification

import { configureStore } from '@reduxjs/toolkit'; // configureStore simplifie la configuration du store
import authReducer from './Auth/authSlice'; // reducer spécifique provenant de authSlice.js ; gère la state liée à l'authentification

// Création du Store Redux
// l’état de authReducer sera stocké sous state.auth (ex: state.auth.isAuthenticated)
export const store = configureStore({
  reducer: {
    auth: authReducer, 
  },
});

// Exportation du Store => il pourra être utilisé dans toute l'application via le Provider
export default store;


