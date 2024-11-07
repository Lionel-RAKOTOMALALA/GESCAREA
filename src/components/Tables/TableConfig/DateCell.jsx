import { Input } from "@chakra-ui/react"; // Importation du composant Input de Chakra UI
import { useEffect, useState } from "react"; // Importation des hooks useEffect et useState de React

// Composant pour afficher une cellule de date
const DateCell = ({ value, updateData, rowId, columnId }) => {
    // État local pour stocker la valeur de la date
    const [date, setDate] = useState(value);

    // Fonction appelée lorsque l'input perd le focus (onBlur)
    const onBlur = () => {
        const newDate = new Date(date);
        updateData(rowId, columnId, newDate); // Met à jour uniquement la cellule avec l'ID concerné
    };

    // Synchronise la valeur de la date initiale avec la valeur locale lorsque value change
    useEffect(() => {
        setDate(value); // Met à jour l'état local si la valeur initiale change
    }, [value]);

    return (
        <Input
            type="date" // Type de champ date
            value={date} // La valeur de l'input est liée à l'état local
            onChange={(e) => setDate(e.target.value)} // Met à jour l'état local lors de la saisie
            onBlur={onBlur} // Appelle onBlur lorsque l'input perd le focus
            size="sm" // Taille du champ de saisie
            w="85%" // Largeur du champ de saisie
            overflow="hidden" // Cache le débordement
            textOverflow="ellipsis" // Affiche des points de suspension si le texte déborde
            whiteSpace="nowrap" // Empêche le texte de se diviser sur plusieurs lignes
        />
    );
};

export default DateCell; // Exporte le composant DateCell
