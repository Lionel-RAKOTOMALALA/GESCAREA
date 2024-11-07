import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Grid,
  GridItem,
  Text,
  VStack,
  HStack,
  Badge,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
import { CalendarIcon, PhoneIcon, EmailIcon, BriefcaseIcon, GraduationCapIcon, FileTextIcon } from 'components/Icons/Icons';

export const ViewEmployeeModal = ({ isOpen, onClose, employee }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const sectionBgColor = useColorModeValue('gray.50', 'gray.700');

  // Vérifiez si employee est valide
  if (!employee) return null;

  // Assurez-vous que les propriétés sont des chaînes de caractères
  const employeeName = `${employee.nom || ''} ${employee.prenom || ''}`;
  const employeeTitle = employee.poste?.titre_poste || 'N/A'; // Assurez-vous que titre_poste est accessible

  const InfoItem = ({ icon, label, value }) => (
    <HStack spacing={2} align="flex-start">
      <Box as={icon} color="blue.500" mt={1} />
      <VStack align="start" spacing={0}>
        <Text fontSize="sm" fontWeight="medium" color="gray.500">{label}</Text>
        <Text fontSize="md" color={textColor}>{value || 'N/A'}</Text>
      </VStack>
    </HStack>
  );

  const Section = ({ title, children }) => (
    <Box bg={sectionBgColor} p={4} borderRadius="md" shadow="sm">
      <Text fontSize="lg" fontWeight="bold" mb={3} color={textColor}>{title}</Text>
      <VStack align="stretch" spacing={3}>
        {children}
      </VStack>
    </Box>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent bg={bgColor} mt="0vh">
        <ModalHeader bg="blue.500" color="white" borderTopRadius="md">
          Détails de l'employé
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody py={6}>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            <GridItem colSpan={3}>
              <HStack spacing={4} align="center">
                <Avatar size="xl" name={employeeName} src={employee.photo} />
                <VStack align="start" spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                    {employeeName}
                  </Text>
                  <Badge colorScheme="blue">{employeeTitle}</Badge>
                </VStack>
              </HStack>
            </GridItem>

            <GridItem colSpan={3}>
              <Section title="Informations personnelles">
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <InfoItem icon={CalendarIcon} label="Date de naissance" value={employee.date_naissance} />
                  <InfoItem icon={CalendarIcon} label="Âge" value={employee.age} />
                  <InfoItem icon={PhoneIcon} label="Téléphone" value={employee.contact_personnel} />
                  <InfoItem icon={EmailIcon} label="Email" value={employee.email} />
                </Grid>
                <InfoItem icon={FileTextIcon} label="Genre" value={employee.genre} />
                <InfoItem icon={FileTextIcon} label="Situation matrimoniale" value={employee.situation_matrimoniale} />
              </Section>
            </GridItem>

            <GridItem colSpan={1}>
              <Section title="ID">
                <InfoItem icon={FileTextIcon} label="ID de l'employé" value={employee.id_employe} />
              </Section>
            </GridItem>
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>Fermer</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
