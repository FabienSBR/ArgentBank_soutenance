// Composant Header avec une barre de navigation
// -> affiche un bouton de connexion si l’utilisateur n’est pas connecté
// -> affiche le nom d’utilisateur et un bouton de déconnexion si l’utilisateur est connecté

import React from 'react';

import logo from '/images/logo.webp' // import logo

// Redux :
//  -> useSelector permet d’accéder au state global (vérifier si un utilisateur est connecté)
//  -> useDispatch permet d’exécuter des actions Redux (comme logout)
//  -> logout : action qui déconnecte l’utilisateur
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Auth/authSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'; // icône de déconnexion
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"; // icône d’utilisateur

import { NavLink } from 'react-router-dom'; // NavLink permet de gérer la navigation sans rechargement de page

// Déclaration
const Header = () => {

  // Récupération des données de l’utilisateur
  // -> user : récupère l’utilisateur connecté dans le state Redux (state.auth.user)
  // -> dispatch : permet d’envoyer des actions Redux
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  // Gestion du bouton de déconnexion
  // -> au clique sur "Sign Out", l'action logout() est envoyée à Redux et l'utilisateur est déconnecté et redirigé
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img src={logo} className='main-nav-logo-image' alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div className='user-in'> 
        {user ? ( // si l’utilisateur est connecté : affiche nom et 'Sign Out' ; sinon affiche 'Sign In'
          <>
            <NavLink className="main-nav-item" to="/user">
              <FontAwesomeIcon icon={faCircleUser} className='fa fa-user-circle'/>
              {user.userName} 
            </NavLink>
            <NavLink className="main-nav-item" to="/" onClick={handleLogout}>
              <FontAwesomeIcon icon={faRightFromBracket} className='fa fa-sign-out'/>
              Sign Out 
            </NavLink>
          </>
        ) : (
          <NavLink className="main-nav-item" to="/sign-in">
            <FontAwesomeIcon icon={faCircleUser} className='fa fa-user-circle'/>
            Sign In 
          </NavLink>
          )
        }
      </div>      
    </nav>
  );
};

// Exportation
export default Header;