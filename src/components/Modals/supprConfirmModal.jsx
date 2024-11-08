'use client'

import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiAlertTriangle } from 'react-icons/fi'
import { supprimerEmploye } from '../../helper/helper' // Assurez-vous que l'import est correct pour votre chemin
import useFetchEmploye from 'hooks/employe.hook'

// Apply motion to ModalContent
const MotionModalContent = motion(ModalContent)
const MotionModalOverlay = motion(ModalOverlay)
const MotionHStack = motion(HStack)
const MotionText = motion(Text)
const MotionButton = motion(Button)

export default function SupprConfirmModal({ isOpen, onClose, onConfirm, employeeName, employeeId }) {
  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.800', 'white')
  const warningColor = useColorModeValue('red.500', 'red.300')

  const handleConfirmDelete = async () => {
    try {
      // Appel à la fonction API pour supprimer l'employé
      await supprimerEmploye(employeeId);
      console.log(`Employee ${employeeName} deleted`);
      
      // Fermer le modal et exécuter la logique de confirmation supplémentaire si nécessaire
      onConfirm();
      onClose();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'employé:", error);
      // Afficher un message d'erreur à l'utilisateur ou ajouter une logique d'erreur ici
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <MotionModalOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      <MotionModalContent
        bg={bgColor}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <ModalHeader color={textColor}>Confirmer la suppression</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <MotionHStack
              spacing={3}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <Icon as={FiAlertTriangle} w={6} h={6} color={warningColor} />
              <MotionText
                fontWeight="bold"
                color={warningColor}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Attention
              </MotionText>
            </MotionHStack>
            <MotionText
              color={textColor}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              Êtes-vous sûr de vouloir supprimer l'employé <strong>{employeeName}</strong> ?
            </MotionText>
            <MotionText
              color={textColor}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              Cette action est irréversible et supprimera définitivement toutes les données associées à cet employé.
            </MotionText>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={4}>
            <MotionButton
              variant="outline"
              onClick={onClose}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              Annuler
            </MotionButton>
            <MotionButton
              colorScheme="red"
              onClick={handleConfirmDelete}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              Confirmer la suppression
            </MotionButton>
          </HStack>
        </ModalFooter>
      </MotionModalContent>
    </Modal>
  )
}
