// Page de login de l'application

import React from 'react';

// // Import des composants
import Header from '../../components/Header/Index';
import Footer from '../../components/Footer/Index';
import SignInContent from '../../components/SignInContent/Index';

// Déclaration
const SignIn = () => {
    return (
        <div className='sign-in'>
            <Header />
            <SignInContent />
            <Footer />
        </div>
    );
};

// Exportation
export default SignIn;