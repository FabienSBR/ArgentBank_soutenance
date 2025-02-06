// Composant de route protégée (ProtectedRoute) dans l'application React utilisant React Router et Redux
// Il permet de restreindre l'accès à certaines pages uniquement aux utilisateurs authentifiés


import React from 'react';
import { useSelector } from 'react-redux'; // useSelector permet d'accéder à l'état global Redux (pour vérifier si l'utilisateur est authentifié)
import { Navigate, useLocation } from 'react-router-dom';
// Navigate permet de rediriger un utilisateur vers une autre page s'il n'est pas autorisé
// useLocation récupère l'URL actuelle, utile pour la redirection après authentification


// Déclaration du composant ProtectedRoute
// composant fonctionnel qui prend une propriété children
// children représente les composants enfants à afficher si l'utilisateur est authentifié
const ProtectedRoute = ({ children }) => {

  // Récupération de l'état d'authentification
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // on utilise useSelector pour accéder à state.auth.isAuthenticated (qui vient du authSlice de Redux)
  // isAuthenticated est un booléen (true/false)

  // Récupération de l'URL actuelle
  const location = useLocation();
  // useLocation() permet de récupérer l'URL en cours
  // sert à rediriger l'utilisateur vers la page qu'il voulait visiter après connexion

  // Redirection si l'utilisateur n'est pas authentifié
  // si isAuthenticated est false :
  // -> on redirige l'utilisateur vers la page de connexion (/sign-in)
  // -> on passe un objet state contenant { from: location } : permet de mémoriser où il voulait aller avant d’être redirigé
  if (!isAuthenticated) { 
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  // Affichage des enfants si l'utilisateur est authentifié
  // si isAuthenticated est true, le composant affiche children (c'est-à-dire la page protégée)
  return children;
};

// Export du composant pour l'utiliser ailleurs dans l'application
export default ProtectedRoute;
