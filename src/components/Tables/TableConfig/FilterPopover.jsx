import React from "react";

// Composant pour afficher un filtre avec une liste d'éléments
const FilterPopover = ({ data, renderItem }) => {
  // Vérifie si des données sont disponibles
  if (!data || data.length === 0) {
    return <div>No data available.</div>; // Message si aucune donnée n'est fournie
  }

  return (
    <div>
      {/* Itération sur les données pour rendre chaque élément */}
      {data.map((item) => (
        <div key={item.id}> {/* Assurez-vous que chaque élément a une clé unique */}
          {renderItem(item)} {/* Appelle la fonction renderItem pour afficher l'élément */}
        </div>
      ))}
    </div>
  );
};

export default FilterPopover; // Exporte le composant FilterPopover
