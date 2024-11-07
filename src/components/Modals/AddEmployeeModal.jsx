  import React, { useState } from 'react';
  import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Grid,
    GridItem,
    useToast,
    Text,
    Box,
    Heading,
    VStack,
    HStack,
    Icon,
    useColorModeValue,
    ScaleFade,
  } from '@chakra-ui/react';
  import { motion, AnimatePresence } from 'framer-motion';
  import { FiUser, FiBriefcase, FiMapPin, FiAward, FiClipboard } from 'react-icons/fi';

  const MotionBox = motion(Box);
  const MotionInput = motion(Input);
  const MotionSelect = motion(Select);

  const AnimatedFormControl = ({ children, ...props }) => {
    const bgColor = useColorModeValue('blue.50', 'blue.900');
    const borderColor = useColorModeValue('blue.500', 'blue.200');

    return (
      <FormControl
        {...props}
        as={motion.div}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <MotionBox
          whileHover={{ scale: 1.02, borderColor: borderColor }}
          whileFocus={{ scale: 1.02, borderColor: borderColor }}
          transition={{ duration: 0.2 }}
          borderRadius="md"
          p={1}
        >
          {children}
        </MotionBox>
      </FormControl>
    );
  };

  export const AddEmployeeModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [employe, setEmploye] = useState({
      nom: '',
      prenom: '',
      date_naissance: '',
      email: '',
      telephone: '',
      adresse: '',
      contact_flotte: '',
      contact_personnel: '',
      situation_matrimoniale: '',
      genre: '',
      age: '',
      password: '',
      username: '',
    });

    const [statut, setStatut] = useState({
      structure: '',
      indice: '',
      grade: '',
      corps: '',
      categorie: '',
      qualite: '',
      code_cadre: '',
      status: '',
      date_debut: '',
      date_fin: null,
    });

    const [affectation, setAffectation] = useState({
      id_departement: '',
      date_affectation: '',
      motif_depart_arrivee: '',
      lieu_affectation: '',
      date_prise_service: '',
      date_entree_admin: '',
    });

    const [diplome, setDiplome] = useState({
      id_diplome: '',
      cursus: '',
      diplome: '',
      date_obtention: '',
      etablissement: '',
    });

    const [decision, setDecision] = useState({
      id_decision: '',
      numero_decision: '',
      date_decision: '',
      commentaire: '',
    });

    const [poste, setPoste] = useState({
      titre_poste: '',
      description_poste: '',
      departement: '',
      salaire_min: 0,
      salaire_max: 0,
      effectifs_a_pourvoir: 0,
    });

    const [service, setService] = useState({
      nom_service: '',
      description: '',
    });

    const toast = useToast();
    const bgColor = useColorModeValue('white', 'gray.800');
    const inputBgColor = useColorModeValue('gray.50', 'gray.700');
    const inputBorderColor = useColorModeValue('gray.200', 'gray.600');
    const inputFocusBorderColor = useColorModeValue('blue.500', 'blue.300');

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const token = localStorage.getItem('token');
    
      // Créer un objet avec la structure correcte pour l'API
      const dataToSend = {
        employe: {
          nom: employe.nom,
          prenom: employe.prenom,
          date_naissance: employe.date_naissance,
          email: employe.email,
          telephone: employe.telephone,
          adresse: employe.adresse,
          contact_flotte: employe.contact_flotte,
          contact_personnel: employe.contact_personnel,
          situation_matrimoniale: employe.situation_matrimoniale,
          genre: employe.genre,
          age: employe.age,
          password: employe.password,
          username: employe.username,
        },
        statut: {
          structure: statut.structure,
          indice: statut.indice,
          grade: statut.grade,
          corps: statut.corps,
          categorie: statut.categorie,
          qualite: statut.qualite,
          code_cadre: statut.code_cadre,
          status: statut.status,
          date_debut: statut.date_debut,
          date_fin: statut.date_fin,
        },
        affectation: {
          id_departement: affectation.id_departement,
          date_affectation: affectation.date_affectation,
          motif_depart_arrivee: affectation.motif_depart_arrivee,
          lieu_affectation: affectation.lieu_affectation,
          date_prise_service: affectation.date_prise_service,
          date_entree_admin: affectation.date_entree_admin,
        },
        diplome: {
          id_diplome: diplome.id_diplome,
          cursus: diplome.cursus,
          diplome: diplome.diplome,
          date_obtention: diplome.date_obtention,
          etablissement: diplome.etablissement,
        },
        decision: {
          id_decision: decision.id_decision,
          numero_decision: decision.numero_decision,
          date_decision: decision.date_decision,
          commentaire: decision.commentaire,
        },
        poste: {
          titre_poste: poste.titre_poste,
          description_poste: poste.description_poste,
          departement: poste.departement,
          salaire_min: poste.salaire_min,
          salaire_max: poste.salaire_max,
          effectifs_a_pourvoir: poste.effectifs_a_pourvoir,
        },
        service: {
          nom_service: service.nom_service,
          description: service.description,
        },
      };
    
      try {
        const response = await fetch('http://localhost:8000/api/employes/ajouter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Cache-Control': 'no-cache',  // Désactive le cache
            'Pragma': 'no-cache',         // Option supplémentaire pour désactiver le cache
          },
          body: JSON.stringify(dataToSend),
        });
    
        if (response.ok) {
          toast({
            title: 'Employé ajouté avec succès',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          onClose();
        } else {
          console.error("Erreur ajout : ", await response.json());
          throw new Error("Erreur lors de l'ajout de l'employé");
        }
      } catch (error) {
        toast({
          title: 'Erreur',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };
      

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const renderStep = () => {
      switch (step) {
        case 1:
          return (
            <ScaleFade initialScale={0.9} in={true}>
              <VStack spacing={6} align="stretch">
                <Heading size="md" mb={4}>
                  <Icon as={FiUser} mr={2} />
                  Informations de l'employé
                </Heading>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                  <GridItem>
                    <AnimatedFormControl isRequired>
                      <FormLabel>Nom</FormLabel>
                      <MotionInput
                        value={employe.nom}
                        onChange={(e) => setEmploye({ ...employe, nom: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl isRequired>
                      <FormLabel>Prénom</FormLabel>
                      <MotionInput
                        value={employe.prenom}
                        onChange={(e) => setEmploye({ ...employe, prenom: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Téléphone</FormLabel>
                      <MotionInput
                        value={employe.telephone}
                        onChange={(e) => setEmploye({ ...employe, telephone: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Adresse</FormLabel>
                      <MotionInput
                        value={employe.adresse}
                        onChange={(e) => setEmploye({ ...employe, adresse: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Contact flotte</FormLabel>
                      <MotionInput
                        value={employe.contact_flotte}
                        onChange={(e) => setEmploye({ ...employe, contact_flotte: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Contact personnel</FormLabel>
                      <MotionInput
                        value={employe.contact_personnel}
                        onChange={(e) => setEmploye({ ...employe, contact_personnel: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Situation matrimoniale</FormLabel>
                      <MotionSelect
                        value={employe.situation_matrimoniale}
                        onChange={(e) => setEmploye({ ...employe, situation_matrimoniale: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      >
                        <option value="">Sélectionner</option>
                        <option value="Célibataire">Célibataire</option>
                        <option value="Marié(e)">Marié(e)</option>
                        <option value="Divorcé(e)">Divorcé(e)</option>
                        <option value="Veuf/Veuve">Veuf/Veuve</option>
                      </MotionSelect>
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Genre</FormLabel>
                      <MotionSelect
                        value={employe.genre}
                        onChange={(e) => setEmploye({ ...employe, genre: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      >
                        <option value="">Sélectionner</option>
                        <option value="M">Masculin</option>
                        <option value="F">Féminin</option>
                        <option value="Autre">Autre</option>
                      </MotionSelect>
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Âge</FormLabel>
                      <MotionInput
                        type="number"
                        value={employe.age}
                        onChange={(e) => setEmploye({ ...employe, age: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Nom d'utilisateur</FormLabel>
                      <MotionInput
                        value={employe.username}
                        onChange={(e) => setEmploye({ ...employe, username: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Mot de passe</FormLabel>
                      <MotionInput
                        type="password"
                        value={employe.password}
                        onChange={(e) => setEmploye({ ...employe, password: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Date de naissance</FormLabel>
                      <MotionInput
                        type="date"
                        value={employe.date_naissance}
                        onChange={(e) => setEmploye({ ...employe, date_naissance: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Email</FormLabel>
                      <MotionInput
                        type="email"
                        value={employe.email}
                        onChange={(e) => setEmploye({ ...employe, email: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                </Grid>
              </VStack>
            </ScaleFade>
          );
        case 2:
          return (
            <ScaleFade initialScale={0.9} in={true}>
              <VStack spacing={6} align="stretch">
                <Heading size="md" mb={4}>
                  <Icon as={FiBriefcase} mr={2} />
                  Statut
                </Heading>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Structure</FormLabel>
                      <MotionInput
                        value={statut.structure}
                        onChange={(e) => setStatut({ ...statut, structure: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Indice</FormLabel>
                      <MotionInput
                        value={statut.indice}
                        onChange={(e) => setStatut({ ...statut, indice: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Grade</FormLabel>
                      <MotionSelect
                        value={statut.grade}
                        onChange={(e) => setStatut({ ...statut, grade: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      >
                        <option value="">Sélectionner un grade</option>
                        <option value="Junior">Junior</option>
                        <option value="Intermédiaire">Intermédiaire</option>
                        <option value="Senior">Senior</option>
                      </MotionSelect>
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Corps</FormLabel>
                      <MotionInput
                        value={statut.corps}
                        onChange={(e) => setStatut({ ...statut, corps: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Catégorie</FormLabel>
                      <MotionInput
                        value={statut.categorie}
                        onChange={(e) => setStatut({ ...statut, categorie: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Qualité</FormLabel>
                      <MotionInput
                        value={statut.qualite}
                        onChange={(e) => setStatut({ ...statut, qualite: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Code Cadre</FormLabel>
                      <MotionInput
                        value={statut.code_cadre}
                        onChange={(e) => setStatut({ ...statut, code_cadre: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Status</FormLabel>
                      <MotionInput
                        value={statut.status}
                        onChange={(e) => setStatut({ ...statut, status: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Date de début</FormLabel>
                      <MotionInput
                        type="date"
                        value={statut.date_debut}
                        onChange={(e) => setStatut({ ...statut, date_debut: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Date de fin</FormLabel>
                      <MotionInput
                        type="date"
                        value={statut.date_fin}
                        onChange={(e) => setStatut({ ...statut, date_fin: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                </Grid>
              </VStack>
            </ScaleFade>
          );
        case 3:
          return (
            <ScaleFade initialScale={0.9} in={true}>
              <VStack spacing={6} align="stretch">
                <Heading size="md" mb={4}>
                  <Icon as={FiMapPin} mr={2} />
                  Affectation
                </Heading>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>ID Département</FormLabel>
                      <MotionInput
                        value={affectation.id_departement}
                        onChange={(e) => setAffectation({ ...affectation, id_departement: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Date d'affectation</FormLabel>
                      <MotionInput
                        type="date"
                        value={affectation.date_affectation}
                        onChange={(e) => setAffectation({ ...affectation, date_affectation: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Motif départ/arrivée</FormLabel>
                      <MotionInput
                        value={affectation.motif_depart_arrivee}
                        onChange={(e) => setAffectation({ ...affectation, motif_depart_arrivee: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Lieu d'affectation</FormLabel>
                      <MotionInput
                        value={affectation.lieu_affectation}
                        onChange={(e) => setAffectation({ ...affectation, lieu_affectation: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Date de prise de service</FormLabel>
                      <MotionInput
                        type="date"
                        value={affectation.date_prise_service}
                        onChange={(e) => setAffectation({ ...affectation, date_prise_service: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Date d'entrée admin</FormLabel>
                      <MotionInput
                        type="date"
                        value={affectation.date_entree_admin}
                        onChange={(e) => setAffectation({ ...affectation, date_entree_admin: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                </Grid>
              </VStack>
            </ScaleFade>
          );
        case 4:
          return (
            <ScaleFade initialScale={0.9} in={true}>
              <VStack spacing={6} align="stretch">
                <Heading size="md" mb={4}>
                  <Icon as={FiAward} mr={2} />
                  Diplôme et Décision
                </Heading>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>ID Diplôme</FormLabel>
                      <MotionInput
                        value={diplome.id_diplome}
                        onChange={(e) => setDiplome({ ...diplome, id_diplome: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Cursus</FormLabel>
                      <MotionInput
                        value={diplome.cursus}
                        onChange={(e) => setDiplome({ ...diplome, cursus: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Diplôme</FormLabel>
                      <MotionInput
                        value={diplome.diplome}
                        onChange={(e) => setDiplome({ ...diplome, diplome: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Date d'obtention</FormLabel>
                      <MotionInput
                        type="date"
                        value={diplome.date_obtention}
                        onChange={(e) => setDiplome({ ...diplome, date_obtention: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Établissement</FormLabel>
                      <MotionInput
                        value={diplome.etablissement}
                        onChange={(e) => setDiplome({ ...diplome, etablissement: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>ID Décision</FormLabel>
                      <MotionInput
                        value={decision.id_decision}
                        onChange={(e) => setDecision({ ...decision, id_decision: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Numéro de décision</FormLabel>
                      <MotionInput
                        value={decision.numero_decision}
                        onChange={(e) => setDecision({ ...decision, numero_decision: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Date de décision</FormLabel>
                      <MotionInput
                        type="date"
                        value={decision.date_decision}
                        onChange={(e) => setDecision({ ...decision, date_decision: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Commentaire</FormLabel>
                      <MotionInput
                        value={decision.commentaire}
                        onChange={(e) => setDecision({ ...decision, commentaire: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                </Grid>
              </VStack>
            </ScaleFade>
          );
        case 5:
          return (
            <ScaleFade initialScale={0.9} in={true}>
              <VStack spacing={6} align="stretch">
                <Heading size="md" mb={4}>
                  <Icon as={FiClipboard} mr={2} />
                  Poste et Service
                </Heading>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Titre du poste</FormLabel>
                      <MotionInput
                        value={poste.titre_poste}
                        onChange={(e) => setPoste({ ...poste, titre_poste: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Description du poste</FormLabel>
                      <MotionInput
                        value={poste.description_poste}
                        onChange={(e) => setPoste({ ...poste, description_poste: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Département</FormLabel>
                      <MotionInput
                        value={poste.departement}
                        onChange={(e) => setPoste({ ...poste, departement: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Salaire minimum</FormLabel>
                      <MotionInput
                        type="number"
                        value={poste.salaire_min}
                        onChange={(e) => setPoste({ ...poste, salaire_min: parseInt(e.target.value, 10) || 0 })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Salaire maximum</FormLabel>
                      <MotionInput
                        type="number"
                        value={poste.salaire_max}
                        onChange={(e) => setPoste({ ...poste, salaire_max: parseInt(e.target.value, 10) || 0 })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Effectifs à pourvoir</FormLabel>
                      <MotionInput
                        type="number"
                        value={poste.effectifs_a_pourvoir}
                        onChange={(e) => setPoste({ ...poste, effectifs_a_pourvoir: parseInt(e.target.value, 10) || 0 })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Nom du service</FormLabel>
                      <MotionInput
                        value={service.nom_service}
                        onChange={(e) => setService({ ...service, nom_service: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                  <GridItem>
                    <AnimatedFormControl>
                      <FormLabel>Description du service</FormLabel>
                      <MotionInput
                        value={service.description}
                        onChange={(e) => setService({ ...service, description: e.target.value })}
                        bg={inputBgColor}
                        borderColor={inputBorderColor}
                        _focus={{ borderColor: inputFocusBorderColor }}
                      />
                    </AnimatedFormControl>
                  </GridItem>
                </Grid>
              </VStack>
            </ScaleFade>
          );
        default:
          return null;
      }
    };

    return (
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent bg={bgColor}>
          <ModalHeader>
            <Heading size="lg">Ajouter un nouvel employé</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6} align="stretch">
              <Box>
                <MotionBox
                  height="4px"
                  bg="blue.100"
                  borderRadius="full"
                  overflow="hidden"
                >
                  <MotionBox
                    height="100%"
                    bg="blue.500"
                    initial={{ width: `${((step - 1) / 5) * 100}%` }}
                    animate={{ width: `${(step / 5) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </MotionBox>
                <HStack justify="space-between" mt={2}>
                  <Text fontSize="sm" fontWeight="bold">
                    Étape {step} sur 5
                  </Text>
                  <AnimatePresence mode="wait">
                    <MotionBox
                      key={step}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Text fontSize="sm" color="gray.500">
                        {step === 1 && "Informations de l'employé"}
                        {step === 2 && "Statut"}
                        {step === 3 && "Affectation"}
                        {step === 4 && "Diplôme et Décision"}
                        {step === 5 && "Poste et Service"}
                      </Text>
                    </MotionBox>
                  </AnimatePresence>
                </HStack>
              </Box>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleSubmit}>{renderStep()}</form>
              </MotionBox>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <HStack spacing={4}>
              {step > 1 && (
                <Button variant="outline" onClick={prevStep}>
                  Précédent
                </Button>
              )}
              {step < 5 ? (
                <Button colorScheme="blue" onClick={nextStep}>
                  Suivant
                </Button>
              ) : (
                <Button colorScheme="green" onClick={handleSubmit}>
                  Ajouter l'employé
                </Button>
              )}
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };