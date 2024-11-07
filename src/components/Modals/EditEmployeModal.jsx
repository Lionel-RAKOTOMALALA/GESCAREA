import React, { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';

export const EditEmployeeModal = ({ isOpen, onClose, employee }) => {
  const [employe, setEmploye] = useState({
    nom: '',
    prenom: '',
    dateNaissance: '',
    lieuNaissance: '',
    adresse: '',
    telephone: '',
    email: '',
  });

  const [statut, setStatut] = useState({
    type: '',
    dateDebut: '',
    dateFin: '',
  });

  const [affectation, setAffectation] = useState({
    service: '',
    poste: '',
    dateAffectation: '',
  });

  const [diplome, setDiplome] = useState({
    titre: '',
    specialite: '',
    dateObtention: '',
  });

  const [decision, setDecision] = useState({
    type: '',
    numero: '',
    date: '',
  });

  const toast = useToast();

  // Mettez à jour l'état avec les données de l'employé lors de l'ouverture du modal
  console.log(employee);
  
  useEffect(() => {
    if (employee) {
      setEmploye({
        nom: employee.nom || '',
        prenom: employee.prenom || '',
        dateNaissance: employee.date_naissance || '',
        lieuNaissance: employee.lieu_naissance || '',
        adresse: employee.adresse || '',
        telephone: employee.telephone || '',
        email: employee.email || '',
      });
      /*setStatut({
        type: employee.statut.type || '',
        dateDebut: employee.statut.dateDebut || '',
        dateFin: employee.statut.dateFin || '',
      });
      setAffectation({
        service: employee.affectation.service || '',
        poste: employee.affectation.poste || '',
        dateAffectation: employee.affectation.dateAffectation || '',
      });
      setDiplome({
        titre: employee.diplome.titre || '',
        specialite: employee.diplome.specialite || '',
        dateObtention: employee.diplome.dateObtention || '',
      });
      setDecision({
        type: employee.decision.type || '',
        numero: employee.decision.numero || '',
        date: employee.decision.date || '',
      });*/
    }
  }, [employee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/employes/${employee._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employe,
          statut,
          affectation,
          diplome,
          decision,
        }),
      });

      if (response.ok) {
        toast({
          title: 'Employé modifié avec succès',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        onClose();
      } else {
        throw new Error("Erreur lors de la modification de l'employé");
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent mt="2vh">
        <ModalHeader>Modifier les informations de l'employé</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Nom</FormLabel>
                  <Input
                    value={employe.nom}
                    onChange={(e) => setEmploye({ ...employe, nom: e.target.value })}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Prénom</FormLabel>
                  <Input
                    value={employe.prenom}
                    onChange={(e) => setEmploye({ ...employe, prenom: e.target.value })}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Date de naissance</FormLabel>
                  <Input
                    type="date"
                    value={employe.dateNaissance}
                    onChange={(e) => setEmploye({ ...employe, dateNaissance: e.target.value })}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Lieu de naissance</FormLabel>
                  <Input
                    value={employe.lieuNaissance}
                    onChange={(e) => setEmploye({ ...employe, lieuNaissance: e.target.value })}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Téléphone</FormLabel>
                  <Input
                    value={employe.telephone}
                    onChange={(e) => setEmploye({ ...employe, telephone: e.target.value })}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={employe.email}
                    onChange={(e) => setEmploye({ ...employe, email: e.target.value })}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={3}>
                <FormControl>
                  <FormLabel>Adresse</FormLabel>
                  <Input
                    value={employe.adresse}
                    onChange={(e) => setEmploye({ ...employe, adresse: e.target.value })}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Type de statut</FormLabel>
                  <Select
                    value={statut.type}
                    onChange={(e) => setStatut({ ...statut, type: e.target.value })}
                  >
                    <option value="">Sélectionner un type</option>
                    <option value="CDI">CDI</option>
                    <option value="CDD">CDD</option>
                    <option value="Stage">Stage</option>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Date de début du statut</FormLabel>
                  <Input
                    type="date"
                    value={statut.dateDebut}
                    onChange={(e) => setStatut({ ...statut, dateDebut: e.target.value })}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Date de fin du statut</FormLabel>
                  <Input
                    type="date"
                    value={statut.dateFin}
                    onChange={(e) => setStatut({ ...statut, dateFin: e.target.value })}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Service</FormLabel>
                  <Input
                    value={affectation.service}
                    onChange={(e) => setAffectation({ ...affectation, service: e.target.value })}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Poste</FormLabel>
                  <Input
                    value={affectation.poste}
                    onChange={(e) => setAffectation({ ...affectation, poste: e.target.value })}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Date d'affectation</FormLabel>
                  <Input
                    type="date"
                    value={affectation.dateAffectation}
                    onChange={(e) => setAffectation({ ...affectation, dateAffectation: e.target.value })}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Titre de diplôme</FormLabel>
                  <Input
                    value={diplome.titre}
                    onChange={(e) => setDiplome({ ...diplome, titre: e.target.value })}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Spécialité</FormLabel>
                  <Input
                    value={diplome.specialite}
                    onChange={(e) => setDiplome({ ...diplome, specialite: e.target.value })}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Date d'obtention</FormLabel>
                  <Input
                    type="date"
                    value={diplome.dateObtention}
                    onChange={(e) => setDiplome({ ...diplome, dateObtention: e.target.value })}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Type de décision</FormLabel>
                  <Input
                    value={decision.type}
                    onChange={(e) => setDecision({ ...decision, type: e.target.value })}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Numéro de décision</FormLabel>
                  <Input
                    value={decision.numero}
                    onChange={(e) => setDecision({ ...decision, numero: e.target.value })}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Date de décision</FormLabel>
                  <Input
                    type="date"
                    value={decision.date}
                    onChange={(e) => setDecision({ ...decision, date: e.target.value })}
                  />
                </FormControl>
              </GridItem>
            </Grid>
            <ModalFooter>
              <Button colorScheme="blue" type="submit">
                Enregistrer
              </Button>
              <Button variant="outline" onClick={onClose} ml={3}>
                Annuler
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
