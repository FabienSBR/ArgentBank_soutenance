// Routeur principal de l'application React 

// Gestion de la navigation entre différentes pages, dont certaines sont protégées grâce à un système d'authentification


import React from 'react'; // pour utiliser les composants React
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // active le routage dans l'application
import Home from './pages/Home/Index'; // page 'Home'
import SignIn from './pages/SignIn/Index'; // page 'SignIn'
import User from './pages/User/Index'; // page 'User'
import ProtectedRoute from './Auth/ProtectedRoute'; // composant qui protège la route 'User'

const App = () => {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} /> 
        <Route path='/user' element={
          <ProtectedRoute>
            <User />
          </ProtectedRoute>} 
        />
      </Routes>
    </BrowserRouter>
  );
};

// les pages 'Home' et 'SignIn' sont publiques

// la route 'User' est protégée par ProtectedRoute
//  -> si l'utilisateur est authentifié, il peut voir la page 'User'
//  -> sinon, il est redirigé vers 'SignIn'

export default App;