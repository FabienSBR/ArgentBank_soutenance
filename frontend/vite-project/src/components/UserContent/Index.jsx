// Composant UserContent

// Affiche les informations de l'utilisateur connecté, permet d'éditer son nom d'utilisateur et affiche ses comptes bancaires
// Ce composant interagit avec Redux pour gérer l'état de l'utilisateur et du token d'authentification
// Il envoie des requêtes HTTP pour récupérer et mettre à jour les informations de l'utilisateur

// useState  pour gérer l'état local des champs comme l'édition du nom d'utilisateur et du nom saisi
import React, { useState } from 'react';

// useSelector permet d'accéder aux valeurs dans le store Redux 
// useDispatch permet de dispatcher actions Redux (récupérer informations utilisateur après une màj)
import { useSelector, useDispatch } from 'react-redux';

// composant personnalisé pour afficher modale : permet à l'utilisateur de modifier son username
import Modal from '../Modal/Index.jsx';

// fetchUserProfile : action Redux qui récupère les informations du profil utilisateur après la màj
import { fetchUserProfile } from '../../Auth/authSlice.jsx'; 

// affichage icône d'utilisateur dans la modale
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";


// Déclaration
const UserContent = () => {
  // État local
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token); 
  // isEditing : gère l'état qui détermine si l'utilisateur est en train d'éditer son nom
  const [isEditing, setIsEditing] = useState(false);
  // userName : gère l'état du nom d'utilisateur qui peut être modifié dans le formulaire
  const [userName, setUserName] = useState(user?.userName || ''); 


  // Fonctions de gestion

  // handleEditClick
  // -> lorsque l'utilisateur clique sur bouton "Edit Name", l'état isEditing est défini sur true => l'affichage modale permettant l'édition du nom
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // handleSave
  // -> requête PUT pour mettre à jour le nom d'utilisateur de l'utilisateur
  // [utilise le token d'authentification pour autoriser la màj]
  // -> fetchUserProfile est appelée pour récupérer les informations utilisateur mises à jour
  // setIsEditing(false) ferme modlae après l'enregistrement des modifications
  // message si erreur
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName }), 
      });

      if (!response.ok) {
        throw new Error('Failed to update userName');
      }

      dispatch(fetchUserProfile());
      setIsEditing(false); 
    } catch (error) {
      console.error('Error updating userName:', error);
    }
  };

  // handleCancel
  // -> lorsque l'utilisateur clique sur "Cancel", l'édition est annulée et le nom d'utilisateur redevient son état initial
  const handleCancel = () => {
    setIsEditing(false);
    setUserName(user?.userName || '');
  };

  return ( 
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{user?.userName}!</h1> {/* message personnalisé de bienvenu 'username' */}
        <button className="edit-button" onClick={handleEditClick}>Edit Name</button> {/* bouton d'édition */}
      </div>

       {/* Modale d'édition de l'userName ; firstName et lastName sont disabled car ils ne doivent pas être modifiés */}
      <Modal isOpen={isEditing} onClose={handleCancel}>
      <FontAwesomeIcon icon={faCircleUser} className="fa fa-user-circle sign-in-icon"/>
        <h2>Edit user info</h2> 
        <form className="edit-form" onSubmit={handleSave}>
          <div className="input-wrapper">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              id="userName"
              value={userName} 
              onChange={(e) => setUserName(e.target.value)} 
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={user?.firstName}
              disabled 
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={user?.lastName}
              disabled 
            />
          </div>
          <div className='edit-buttons'>
            <button className='edit-name-button' type="submit">Save</button>
            <button className='edit-name-button' type="button" onClick={handleCancel}>Cancel</button>
          </div>  
        </form>
      </Modal>

      {/* Contenu des cards 'Accounts' */}
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
};

// Exportation
export default UserContent;
