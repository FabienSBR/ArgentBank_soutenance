// Composant SignInContent qui permet aux utilisateurs de se connecter à l'application

// Lorsqu'un utilisateur saisit son email et son mot de passe et clique sur "Sign In", une requête HTTP est envoyée au backend pour vérifier les informations de connexion
// Si la connexion réussit, un jeton (token) est récupéré et stocké dans le store de Redux
// L'utilisateur est alors redirigé vers une autre page (profil utilisateur)
// Si la connexion échoue, un message d'erreur est affiché

// useState utilisé pour gérer l'état local des champs email, password et error
import React, { useState } from 'react';

// useDispatch permet d'envoyer des actions à Redux pour mettre à jour l'état global (stocker token)
import { useDispatch } from 'react-redux';

// setToken, fetchUserProfile : actions Redux pour définir le token dans le store et récupérer le profil utilisateur via une requête
import { setToken, fetchUserProfile } from '../../Auth/authSlice';

// FontAwesomeIcon et faCircleUser utilisés pour afficher une icône d'utilisateur
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

// useNavigate permet de rediriger l'utilisateur vers /user après une connexion réussie
import { useNavigate } from 'react-router-dom'; 

// Déclaration
const SignInContent = () => {
  // État local
  // -> email et password : variables d'état pour stocker la valeur des champs de saisie email+mdp dans le formulaire
  // -> error pour afficher message si connexion échoue
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useDispatch(); // màj état global
  const navigate = useNavigate(); // redirection si connexion réussie

  // Fonction handleLogin
  // -> fonction asynchrone qui est déclenchée lorsqu'un utilisateur soumet le formulaire
  // e.preventDefault() empêche le rechargement automatique de la page
  const handleLogin = async (e) => {
    e.preventDefault();

    // Requête de connexion (fetch) 
    // -> requête HTTP POST est envoyée au backend avec email+mdp dans requête, au format JSON
    // => si la requête réussit : réponse convertie en JSON et token extrait de la réponse
    // => sinon : message d'erreur 'login failed'
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email, 
          password,   
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const token = data.body.token;

      // Actions Redux :
      // dispatch(setToken(token)) : token stocké dans store Redux pour authentifier l'utilisateur dans le reste de l'application
      dispatch(setToken(token));
      // dispatch(fetchUserProfile()) : action qui déclenche requête pour récupérer profil utilisateur à partir du backend
      dispatch(fetchUserProfile());

      // Redirection : après login réussi, l'utilisateur est redirigé vers sa page /user ; sinon message d'erreur
      navigate('/user');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className='main bg-dark'>
      <section className="sign-in-content">
        <FontAwesomeIcon icon={faCircleUser} className="fa fa-user-circle sign-in-icon"/>
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input 
              type="text" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" className="sign-in-button">Sign In</button>
        </form>
      </section>  
    </div>
  );
};


// Exportation
export default SignInContent;
