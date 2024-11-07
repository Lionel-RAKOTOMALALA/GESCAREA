import React, { useState } from "react";
import { Flex, useColorModeValue, Text, Button } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import EmployeeTable from "../../components/Tables/Employe/EmployeeTable"; // Adjust the path if necessary
import HistoriqueCarriere from "../../components/Tables/HistoriqueCarriere/HistoriqueCarriereTable"; // Adjust the path if necessary
import { AddEmployeeModal } from "../../components/Modals/AddEmployeeModal"; // Adjust path if necessary

function Tables() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const iconBoxInside = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textTableColor = useColorModeValue("gray.500", "white");
  const cardBg = useColorModeValue("white", "navy.800");
  const cardShadow = useColorModeValue(
    "0px 3px 5px rgba(0, 0, 0, 0.02)",
    "0px 3px 5px rgba(255, 255, 255, 0.02)"
  );
  const cardBgGradient = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
  );

  // Specific button colors based on the mode
  const buttonBg = useColorModeValue("blue.500", "white");
  const buttonColor = useColorModeValue("white", "blue.500");

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card
        p="0px"
        maxW={{ sm: "320px", md: "100%" }}
        bg={cardBg}
        boxShadow={cardShadow}
        overflowX={{ sm: "scroll", xl: "hidden" }}
      >
        <Flex align="center" justify="space-between" p="22px">
          <Text fontSize="lg" color={textColor} fontWeight="bold">
            {location.pathname === "/admin/tables" ? "Informations sur les Employés" : "Historique de Carrière"}
          </Text>
          {location.pathname === "/admin/tables" && (
            <Button
              variant="primary"
              maxH="30px"
              color={buttonColor}
              bg={buttonBg}
              _hover={{ bg: useColorModeValue("blue.600", "gray.100") }}
              onClick={onOpen} // Open modal on click
            >
              Ajouter
            </Button>
          )}
        </Flex>
        <CardBody bg={cardBg}>
          {location.pathname === "/admin/tables" ? (
            <EmployeeTable />
          ) : location.pathname === "/admin/historiqueCarriere" ? (
            <HistoriqueCarriere />
          ) : (
            <Text color={textColor}>Aucune donnée à afficher</Text>
          )}
        </CardBody>
      </Card>

      {/* AddEmployeeModal component */}
      <AddEmployeeModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}

export default Tables;
