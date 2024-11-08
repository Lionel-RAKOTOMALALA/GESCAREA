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
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { CalendarIcon, PhoneIcon, EmailIcon, BriefcaseIcon, GraduationCapIcon, FileTextIcon, MapPinIcon, UserIcon, BuildingIcon, CurrencyIcon } from '../Icons/Icons';

export const ViewEmployeeModal = ({ isOpen, onClose, employee }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const sectionBgColor = useColorModeValue('gray.50', 'gray.700');

  if (!employee) return null;

  const formatDate = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR');
  };

  const InfoItem = ({ icon, label, value }) => (
    <HStack spacing={2} align="flex-start">
      <Box as={icon} color="blue.500" size={20} />
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
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent bg={bgColor} mt="0vh">
        <ModalHeader bg="blue.500" color="white" borderTopRadius="md">
          Détails de l'employé
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody py={6}>
          <VStack spacing={6} align="stretch">
            <HStack spacing={4} align="center">
              <Avatar size="xl" name={`${employee.employe.nom} ${employee.employe.prenom}`} src={employee.employe.photo} />
              <VStack align="start" spacing={1}>
                <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                  {`${employee.employe.nom} ${employee.employe.prenom}`}
                </Text>
                <Badge colorScheme="blue">{employee.poste.titre_poste}</Badge>
              </VStack>
            </HStack>

            <Accordion allowMultiple defaultIndex={[0]}>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Informations personnelles
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <InfoItem icon={CalendarIcon} label="Date de naissance" value={formatDate(employee.employe.date_naissance)} />
                    <InfoItem icon={CalendarIcon} label="Âge" value={employee.employe.age} />
                    <InfoItem icon={PhoneIcon} label="Téléphone personnel" value={employee.employe.contact_personnel} />
                    <InfoItem icon={PhoneIcon} label="Téléphone professionnel" value={employee.employe.contact_flotte} />
                    <InfoItem icon={EmailIcon} label="Email" value={employee.employe.email} />
                    <InfoItem icon={UserIcon} label="Genre" value={employee.employe.genre} />
                    <InfoItem icon={UserIcon} label="Situation matrimoniale" value={employee.employe.situation_matrimoniale} />
                    <InfoItem icon={MapPinIcon} label="Adresse" value={employee.employe.adresse} />
                  </Grid>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Statut professionnel
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <InfoItem icon={FileTextIcon} label="Code cadre" value={employee.statut.code_cadre} />
                    <InfoItem icon={FileTextIcon} label="Qualité" value={employee.statut.qualite} />
                    <InfoItem icon={FileTextIcon} label="Catégorie" value={employee.statut.categorie} />
                    <InfoItem icon={FileTextIcon} label="Corps" value={employee.statut.corps} />
                    <InfoItem icon={FileTextIcon} label="Grade" value={employee.statut.grade} />
                    <InfoItem icon={FileTextIcon} label="Indice" value={employee.statut.indice} />
                    <InfoItem icon={BuildingIcon} label="Structure" value={employee.statut.structure} />
                  </Grid>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Affectation
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <InfoItem icon={CalendarIcon} label="Date d'entrée admin" value={formatDate(employee.affectation.date_entree_admin)} />
                    <InfoItem icon={CalendarIcon} label="Date de prise de service" value={formatDate(employee.affectation.date_prise_service)} />
                    <InfoItem icon={MapPinIcon} label="Lieu d'affectation" value={employee.affectation.lieu_affectation} />
                    <InfoItem icon={FileTextIcon} label="Motif départ/arrivée" value={employee.affectation.motif_depart_arrivee} />
                  </Grid>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Diplôme et Décision
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <VStack align="stretch" spacing={4}>
                    <Section title="Diplôme">
                      <InfoItem icon={GraduationCapIcon} label="Cursus" value={employee.diplome[0].cursus} />
                    </Section>
                    <Section title="Décision">
                      <InfoItem icon={FileTextIcon} label="Numéro de décision" value={employee.decision[0].numero_decision} />
                      <InfoItem icon={CalendarIcon} label="Date de décision" value={formatDate(employee.decision[0].date_decision)} />
                      <InfoItem icon={FileTextIcon} label="Commentaire" value={employee.decision[0].commentaire} />
                    </Section>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Poste et Service
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <VStack align="stretch" spacing={4}>
                    <Section title="Poste">
                      <InfoItem icon={BriefcaseIcon} label="Titre du poste" value={employee.poste.titre_poste} />
                      <InfoItem icon={FileTextIcon} label="Description du poste" value={employee.poste.description_poste} />
                      <InfoItem icon={BuildingIcon} label="Département" value={employee.poste.departement} />
                      <InfoItem icon={CurrencyIcon} label="Salaire min" value={`${employee.poste.salaire_min} €`} />
                      <InfoItem icon={CurrencyIcon} label="Salaire max" value={`${employee.poste.salaire_max} €`} />
                      <InfoItem icon={UserIcon} label="Effectifs à pourvoir" value={employee.poste.effectifs_a_pourvoir} />
                    </Section>
                    <Section title="Service">
                      <InfoItem icon={BuildingIcon} label="Nom du service" value={employee.service.nom_service} />
                      <InfoItem icon={FileTextIcon} label="Description du service" value={employee.service.description} />
                    </Section>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>Fermer</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};