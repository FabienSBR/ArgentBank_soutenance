// Authentification d'un utilisateur dans l'application React/Redux en utilisant Redux Toolkit

// Résumé du fonctionnement global :
//  1. Connexion : quand l'utilisateur se connecte, on utilise setToken pour enregistrer son token
//  2. Chargement du profil utilisateur :
//   -> fetchUserProfile est appelé
//   -> si le token est valide, l'API renvoie les infos de l'utilisateur
//   -> ces infos sont stockées dans state.user grâce à fulfilled
//  3. Déconnexion : 
//   -> logout réinitialise l'état (token et user à null)
//   -> l'utilisateur est considéré comme non authentifié


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// createSlice : Simplifie la création du store Redux en regroupant les reducers et les actions
// createAsyncThunk : Permet de gérer des actions asynchrones (comme un appel API) et les différents états de la requête (pending, fulfilled, rejected)



// Création de l'action asynchrone fetchUserProfile

//  1. createAsyncThunk crée une action asynchrone nommée "auth/fetchUserProfile"
//  2. l'action effectue un appel API pour récupérer le profil de l'utilisateur
//  3. avant l'appel, elle récupère le token d'authentification depuis le store Redux (getState().auth.token)
//  4. la requête est envoyée à l'API locale http://localhost:3001/api/v1/user/profile avec :
//   -> la méthode POST
//   -> un header d'authentification contenant le token
//   -> un header JSON pour le format des données
//  5. gestion des erreurs : si code HTTP différent de 200 => une erreur est levée (throw new Error)
//  6. retourne les données (data.body) qui seront stockées dans Redux
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { getState }) => {
    const token = getState().auth.token;
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const data = await response.json();
    return data.body;
  }
);


// Création du Slice Redux authSlice

// createSlice permet de créer un slice Redux (un morceau du store dédié à l'authentification)
const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    token: null, // token: stocke le jeton JWT de l'utilisateur
    user: null, // user: contient les informations du profil utilisateur
    isAuthenticated: false, // isAuthenticated: indique si l'utilisateur est connecté (true/false)
    status: 'idle', // status: état de la requête (idle, loading, succeeded, failed)
    error: null, // error: stocke les erreurs éventuelles
  },

  // Création des reducers synchrones
  reducers: {
    setToken(state, action) {
      state.token = action.payload; // stocke le token envoyé dans action.payload
      state.isAuthenticated = true; // met isAuthenticated à true
    },
    logout(state) {
      state.token = null; // réinitialise token à null
      state.user = null; // réinitialise user à null
      state.isAuthenticated = false; // passe isAuthenticated à false (déconnexion)
    },
  },

  // Gestion des reducers asynchrones (extraReducers)
  // Redux Toolkit permet de gérer les différents états d'une requête asynchrone (fetchUserProfile) avec extraReducers
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.fulfilled, (state, action) => { // si requête réussie
        state.user = action.payload; // => state.user est mis à jour avec les données de l'utilisateur
      })
      .addCase(fetchUserProfile.rejected, (state, action) => { // si requête échouée
        state.error = action.error.message; // => state.error est mis à jour avec le message d'erreur
        state.isAuthenticated = false; // => isAuthenticated passe à false
      });
  },
});


// Exportation des actions et du reducer

export const { setToken, logout } = authSlice.actions; // setToken et logout sont exportés pour être utilisés dans l'application
export default authSlice.reducer; // le reducer (authSlice.reducer) est exporté pour être ajouté au store Redux
