import { Input, FormControl, FormErrorMessage } from "@chakra-ui/react"; // Importation des composants nécessaires
import { useEffect, useState } from "react";

const EditableCell = ({ value: initialValue, onChange, columnId }) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const onBlur = () => {
    if (validateValue(value)) {
      onChange(columnId, value);
      setError(""); // Réinitialiser l'erreur
    } else {
      setError("Valeur invalide."); // Message d'erreur
    }
  };

  const validateValue = (value) => {
    // Implémentez votre logique de validation ici
    return value.trim() !== ""; // Exemple : non vide
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <FormControl isInvalid={!!error} display="inline-block"> {/* Utilisation de FormControl pour gérer les erreurs */}
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        variant="filled"
        size="sm"
        minWidth="50px" // Largeur minimale pour le champ d'entrée
        maxWidth="300px" // Largeur maximale pour éviter que le champ ne devienne trop large
        width="fit-content" // Ajustement de la largeur en fonction du contenu
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      />
      <FormErrorMessage>{error}</FormErrorMessage> {/* Affichage du message d'erreur */}
    </FormControl>
  );
};

export default EditableCell;
