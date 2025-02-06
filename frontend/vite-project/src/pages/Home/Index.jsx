// Page d’accueil de l’application

import React from 'react';

// Import des composants
import Header from '../../components/Header/Index';
import Hero from '../../components/Hero/Index';
import Footer from "../../components/Footer/Index";
import Features from '../../components/Features/Index';

// Déclaration
const Home = () => {
    return (
        <div>
            <Header />
            <Hero />
            <Features />
            <Footer />
        </div>
    );
};

// Exportation
export default Home;