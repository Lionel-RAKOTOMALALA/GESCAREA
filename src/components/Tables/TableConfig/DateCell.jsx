import React, { useState } from 'react';

const DateCell = ({ value, columnId, onBlur }) => {
    // Convertir la date en format ISO pour l'affichage initial
    const [editValue, setEditValue] = useState(
        value ? new Date(value).toISOString().split('T')[0] : ''
    );

    const handleBlur = () => {
        if (onBlur) {
            onBlur(editValue); // Appelle la fonction onBlur lorsque l'utilisateur quitte le champ
        }
    };

    return (
        <input
            type="date" // Utilisation de l'input date
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)} // Met à jour la valeur localement
            onBlur={handleBlur} // Déclenche la mise à jour lors du blur
             // Appelle onBlur lorsque l'input perd le focus
             size="sm" // Taille du champ de saisie
             w="85%" // Largeur du champ de saisie
             overflow="hidden" // Cache le débordement
             textOverflow="ellipsis" // Affiche des points de suspension si le texte déborde
             whiteSpace="nowrap"
        />
    );
};

export default DateCell;
