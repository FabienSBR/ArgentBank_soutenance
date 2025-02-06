// Page utilisateur de l'application

import React from 'react';

// Import des composants
import Footer from '../../components/Footer/Index';
import Header from '../../components/Header/Index';
import UserContent from '../../components/UserContent/Index';

// Déclaration
const User = () => {
    return (
        <div className='user'>
          <Header />
          <UserContent />
          <Footer />
        </div>
    );
};

// Exportation
export default User;