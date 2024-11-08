import React, { useState, useEffect } from 'react'
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
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUser, FiBriefcase, FiMapPin, FiAward, FiClipboard } from 'react-icons/fi'

const MotionBox = motion(Box)
const MotionInput = motion(Input)
const MotionSelect = motion(Select)

const AnimatedFormControl = ({ children, ...props }) => {
  const bgColor = useColorModeValue('blue.50', 'blue.900')
  const borderColor = useColorModeValue('blue.500', 'blue.200')

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
  )
}

export default function EditEmployeeModal({ isOpen, onClose, employee = {} }) {
  const [step, setStep] = useState(1)
  const [employe, setEmploye] = useState({
    username: '',
    email: '',
    prenom: '',
    nom: '',
    date_naissance: '',
    age: '',
    genre: '',
    situation_matrimoniale: '',
    contact_personnel: '',
    contact_flotte: '',
    adresse: '',
  })

  const [statut, setStatut] = useState({
    code_cadre: '',
    qualite: '',
    categorie: '',
    corps: '',
    grade: '',
    indice: '',
    structure: '',
  })

  const [affectation, setAffectation] = useState({
    date_entree_admin: '',
    date_prise_service: '',
    lieu_affectation: '',
    motif_depart_arrivee: '',
  })

  const [diplome, setDiplome] = useState({
    cursus: '',
  })

  const [decision, setDecision] = useState({
    numero_decision: '',
    date_decision: '',
    commentaire: '',
  })

  const [poste, setPoste] = useState({
    titre_poste: '',
    description_poste: '',
    departement: '',
    salaire_min: 0,
    salaire_max: 0,
    effectifs_a_pourvoir: 0,
  })

  const [service, setService] = useState({
    nom_service: '',
    description: '',
  })

  const toast = useToast()
  const bgColor = useColorModeValue('white', 'gray.800')
  const inputBgColor = useColorModeValue('gray.50', 'gray.700')
  const inputBorderColor = useColorModeValue('gray.200', 'gray.600')
  const inputFocusBorderColor = useColorModeValue('blue.500', 'blue.300')

  useEffect(() => {
    if (employee) {
      setEmploye({
        username: employee.employe?.username || '',
        email: employee.employe?.email || '',
        prenom: employee.employe?.prenom || '',
        nom: employee.employe?.nom || '',
        date_naissance: employee.employe?.date_naissance ? new Date(employee.employe.date_naissance).toISOString().split('T')[0] : '',
        age: employee.employe?.age || '',
        genre: employee.employe?.genre || '',
        situation_matrimoniale: employee.employe?.situation_matrimoniale || '',
        contact_personnel: employee.employe?.contact_personnel || '',
        contact_flotte: employee.employe?.contact_flotte || '',
        adresse: employee.employe?.adresse || '',
      })
      setStatut({
        code_cadre: employee.statut?.code_cadre || '',
        qualite: employee.statut?.qualite || '',
        categorie: employee.statut?.categorie || '',
        corps: employee.statut?.corps || '',
        grade: employee.statut?.grade || '',
        indice: employee.statut?.indice || '',
        structure: employee.statut?.structure || '',
      })
      setAffectation({
        date_entree_admin: employee.affectation?.date_entree_admin ? new Date(employee.affectation.date_entree_admin).toISOString().split('T')[0] : '',
        date_prise_service: employee.affectation?.date_prise_service ? new Date(employee.affectation.date_prise_service).toISOString().split('T')[0] : '',
        lieu_affectation: employee.affectation?.lieu_affectation || '',
        motif_depart_arrivee: employee.affectation?.motif_depart_arrivee || '',
      })
      setDiplome({
        cursus: employee.diplome?.[0]?.cursus || '',
      })
      setDecision({
        numero_decision: employee.decision?.[0]?.numero_decision || '',
        date_decision: employee.decision?.[0]?.date_decision ? new Date(employee.decision[0].date_decision).toISOString().split('T')[0] : '',
        commentaire: employee.decision?.[0]?.commentaire || '',
      })
      setPoste({
        titre_poste: employee.poste?.titre_poste || '',
        description_poste: employee.poste?.description_poste || '',
        departement: employee.poste?.departement || '',
        salaire_min: employee.poste?.salaire_min || 0,
        salaire_max: employee.poste?.salaire_max || 0,
        effectifs_a_pourvoir: employee.poste?.effectifs_a_pourvoir || 0,
      })
      setService({
        nom_service: employee.service?.nom_service || '',
        description: employee.service?.description || '',
      })
    }
  }, [employee])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:8000/api/employes/${employee.employe._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
        body: JSON.stringify({
          employe,
          statut,
          affectation,
          diplome,
          decision,
          poste,
          service,
        }),
      })

      if (response.ok) {
        toast({
          title: 'Employé modifié avec succès',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        onClose()
      } else {
        throw new Error("Erreur lors de la modification de l'employé")
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

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
              </Grid>
            </VStack>
          </ScaleFade>
        )
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
                    <FormLabel>Grade</FormLabel>
                    <MotionInput
                      value={statut.grade}
                      onChange={(e) => setStatut({ ...statut, grade: e.target.value })}
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
              </Grid>
            </VStack>
          </ScaleFade>
        )
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
              </Grid>
            </VStack>
          </ScaleFade>
        )
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
        )
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
        )
      default:
        return null
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent bg={bgColor}>
        <ModalHeader>
          <Heading size="lg">Modifier les informations de l'employé</Heading>
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
                Enregistrer les modifications
              </Button>
            )}
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}