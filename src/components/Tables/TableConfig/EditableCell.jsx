import React, { useState } from 'react';

const EditableCell = ({ value, columnId, onBlur }) => {
    const [editValue, setEditValue] = useState(value);

    const handleBlur = () => {
        if (onBlur) {
            onBlur(editValue);  // Appelle la fonction onBlur lorsque l'utilisateur quitte le champ
        }
    };

    return (
        <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}  // Met à jour la valeur localement
            onBlur={handleBlur}  // Déclenche la mise à jour lors du blur
        />
    );
};

export default EditableCell;
