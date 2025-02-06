// Composant : Modale (pop-up) affichée lorsque l'utilisateur souhaite modifier son username

import React from 'react';

// Déclaration
// Modal est un composant fonctionnel qui reçoit trois props :
//  -> children : contenu dynamique qui sera affiché à l'intérieur de la modale (formulaire)
//  -> isOpen : booléen qui détermine si la modale doit être affichée ou non
//  -> onClose : fonction appelée pour fermer la modale, au clique
const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;
  // Si isOpen est faux (càd que la modale ne doit pas être affichée), le composant retourne null : aucun contenu ne sera rendu
  // => modale non visible
  return (
    <div className="modal-overlay"> 
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};
// modal-overlay : élément de fond qui recouvre l'écran -> effet de superposition (contenu en dessous plus flou/assombri)
//    => bloque l'interaction avec le reste de la page pendant que la modale est ouverte

// modal-content : conteneur principal de la modale où tout le contenu (les children) sera affiché
//    => c'est ici que se trouvent les éléments affichés dans la modale

// modal-close-button : bouton de fermeture

// children : cette prop permet de rendre dynamiquement du contenu à l’intérieur de la modale 
//    => si appel du composant avec <Modal>XXX</Modal>, le texte "XXX" sera rendu dans l'endroit spécifié par {children}


// Exportation
export default Modal;
