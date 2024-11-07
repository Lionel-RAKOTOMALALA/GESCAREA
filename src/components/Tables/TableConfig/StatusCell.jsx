import { Box, Menu, MenuButton, MenuItem, MenuList, Text, useColorModeValue } from "@chakra-ui/react";

// Composant pour afficher et modifier le statut d'un élément
const StatusCell = ({ status, onStatusChange, statusOptions }) => {
  const { name, color } = status || {}; 
  const textColor = useColorModeValue("gray.700", "white"); // Couleur du texte selon le mode (clair/sombre)
  const buttonBg = useColorModeValue("gray.100", "gray.700"); // Fond du bouton

  return (
    <Menu isLazy offset={[0, 0]} flip={false} autoSelect={false}>
      <MenuButton
        h="100%"
        w="100%"
        textAlign="left"
        px={3} // Padding horizontal
        py={2} // Padding vertical
        bg={color || buttonBg} // Couleur de fond (statut ou couleur par défaut)
        borderRadius="8px" // Arrondi des bords
        color={textColor} // Couleur du texte
        _hover={{ bg: color || "gray.300" }} // Effet hover
      >
        <Text fontWeight="bold" color={textColor} fontSize="sm">
          {name || "Select status"}
        </Text>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => onStatusChange(null)}>
          <ColorIcon color="gray.500" mr={3} />
          <Text color={textColor}>None</Text>
        </MenuItem>
        {statusOptions.map((statusOption) => (
          <MenuItem
            key={statusOption.id}
            onClick={() => onStatusChange(statusOption)}
            _hover={{ bg: statusOption.color || "gray.300" }}
          >
            <ColorIcon color={statusOption.color} mr={3} />
            <Text color={textColor}>{statusOption.name}</Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

// Composant pour afficher un carré coloré
const ColorIcon = ({ color, ...props }) => (
  <Box w="12px" h="12px" bg={color} borderRadius="3px" {...props} />
);

export default StatusCell;
