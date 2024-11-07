import React, { useState } from 'react'
import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  Button,
  Icon,
  useColorModeValue,
  VStack,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Avatar,
  Badge,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { FaQuestionCircle, FaBook, FaHeadset, FaComments, FaSearch, FaUser, FaClock } from "react-icons/fa";

const AssistanceOption = ({ icon, title, description, action, onClick }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const iconColor = useColorModeValue("teal.300", "teal.300");
  const bgHover = useColorModeValue("gray.100", "gray.600");

  return (
    <Card 
      _hover={{ 
        transform: "translateY(-5px)", 
        boxShadow: "xl",
        bg: bgHover 
      }} 
      transition="all 0.3s"
      cursor="pointer"
      onClick={onClick}
    >
      <CardBody>
        <Flex direction="column" align="center" justify="center" textAlign="center">
          <Icon as={icon} w={12} h={12} mb={4} color={iconColor} />
          <Heading size="md" mb={2} color={textColor}>
            {title}
          </Heading>
          <Text mb={4} color="gray.500">
            {description}
          </Text>
          <Button colorScheme="teal" size="sm">
            {action}
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
};

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("white", "gray.700");

  return (
    <Box 
      borderWidth="1px" 
      borderRadius="md" 
      p={4} 
      mb={4} 
      bg={bgColor}
      boxShadow="sm"
      _hover={{ boxShadow: "md" }}
    >
      <Flex justify="space-between" align="center" onClick={() => setIsOpen(!isOpen)} cursor="pointer">
        <Heading size="sm" color={textColor}>{question}</Heading>
        <Icon as={isOpen ? FaQuestionCircle : FaQuestionCircle} />
      </Flex>
      {isOpen && (
        <Text mt={4} color="gray.500">
          {answer}
        </Text>
      )}
    </Box>
  );
};

const Assistance = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const cardBg = useColorModeValue("white", "gray.800");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState(0);

  const faqItems = [
    { question: "Comment puis-je réinitialiser mon mot de passe ?", answer: "Vous pouvez réinitialiser votre mot de passe en cliquant sur 'Mot de passe oublié' sur la page de connexion." },
    { question: "Où puis-je trouver mes rapports mensuels ?", answer: "Vos rapports mensuels sont disponibles dans la section 'Rapports' de votre tableau de bord." },
    { question: "Comment contacter le support technique ?", answer: "Vous pouvez contacter le support technique via le chat en direct ou en envoyant un e-mail à support@srsp.fr." },
  ];

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex
        direction="column"
        bgColor={bgColor}
        borderRadius="15px"
        px="24px"
        py="24px"
        mb="24px"
      >
        <Heading size="lg" mb={6} color={textColor}>
          Centre d'Assistance
        </Heading>
        <Text fontSize="md" mb={8} color="gray.500">
          Bienvenue dans votre centre d'assistance. Comment pouvons-nous vous aider aujourd'hui ?
        </Text>
        <InputGroup mb={8}>
          <InputLeftElement pointerEvents="none">
            <Icon as={FaSearch} color="gray.300" />
          </InputLeftElement>
          <Input placeholder="Rechercher de l'aide..." />
        </InputGroup>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
          <AssistanceOption
            icon={FaQuestionCircle}
            title="FAQ"
            description="Trouvez rapidement des réponses aux questions fréquemment posées."
            action="Consulter la FAQ"
            onClick={() => setActiveTab(0)}
          />
          <AssistanceOption
            icon={FaBook}
            title="Guides"
            description="Accédez à nos guides détaillés pour une assistance pas à pas."
            action="Voir les Guides"
            onClick={() => setActiveTab(1)}
          />
          <AssistanceOption
            icon={FaHeadset}
            title="Support Technique"
            description="Contactez notre équipe de support technique pour une assistance personnalisée."
            action="Contacter le Support"
            onClick={onOpen}
          />
          <AssistanceOption
            icon={FaComments}
            title="Chat en Direct"
            description="Discutez en temps réel avec un de nos agents d'assistance."
            action="Démarrer le Chat"
            onClick={() => setActiveTab(2)}
          />
        </Grid>
      </Flex>
      
      <Card>
        <CardHeader p="12px 5px" mb="12px">
          <Heading size="md" color={textColor}>
            Ressources d'Assistance
          </Heading>
        </CardHeader>
        <CardBody px="5px">
          <Tabs isFitted variant="enclosed" index={activeTab} onChange={(index) => setActiveTab(index)}>
            <TabList mb="1em">
              <Tab>FAQ</Tab>
              <Tab>Guides</Tab>
              <Tab>Chat en Direct</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <VStack align="stretch" spacing={4}>
                  {faqItems.map((item, index) => (
                    <FaqItem key={index} question={item.question} answer={item.answer} />
                  ))}
                </VStack>
              </TabPanel>
              <TabPanel>
                <VStack align="stretch" spacing={4}>
                  <Box p={4} borderWidth="1px" borderRadius="md" bg={cardBg}>
                    <Heading size="sm" mb={2}>Guide d'utilisation du tableau de bord</Heading>
                    <Text color="gray.500" mb={2}>Apprenez à utiliser efficacement votre tableau de bord SRSP.</Text>
                    <Button colorScheme="blue" size="sm">Lire le guide</Button>
                  </Box>
                  <Box p={4} borderWidth="1px" borderRadius="md" bg={cardBg}>
                    <Heading size="sm" mb={2}>Procédures de sécurité</Heading>
                    <Text color="gray.500" mb={2}>Guide complet sur les procédures de sécurité standard.</Text>
                    <Button colorScheme="blue" size="sm">Lire le guide</Button>
                  </Box>
                </VStack>
              </TabPanel>
              <TabPanel>
                <VStack align="stretch" spacing={4}>
                  <Box p={4} borderWidth="1px" borderRadius="md" bg={cardBg}>
                    <Heading size="sm" mb={4}>Chat en Direct</Heading>
                    <VStack align="stretch" spacing={4}>
                      <HStack>
                        <Avatar size="sm" name="Agent Support" />
                        <Box bg="gray.100" p={2} borderRadius="md" flex={1}>
                          <Text fontSize="sm">Bonjour ! Comment puis-je vous aider aujourd'hui ?</Text>
                        </Box>
                      </HStack>
                      <HStack justifyContent="flex-end">
                        <Box bg="blue.100" p={2} borderRadius="md" flex={1}>
                          <Text fontSize="sm">J'ai une question sur mon rapport mensuel.</Text>
                        </Box>
                        <Avatar size="sm" name="Vous" />
                      </HStack>
                    </VStack>
                    <Divider my={4} />
                    <InputGroup size="md">
                      <Input pr="4.5rem" placeholder="Tapez votre message..." />
                      <Button colorScheme="blue" size="sm" position="absolute" right={0} top={0} zIndex={1}>
                        Envoyer
                      </Button>
                    </InputGroup>
                  </Box>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contacter le Support Technique</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Text>Choisissez votre méthode de contact préférée :</Text>
              <Button leftIcon={<FaHeadset />} colorScheme="blue">Appel Téléphonique</Button>
              <Button leftIcon={<FaComments />} colorScheme="green">Chat en Direct</Button>
              <Button leftIcon={<FaUser />} colorScheme="purple">Demande de Rappel</Button>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Icon as={FaClock} />
              <Text fontSize="sm">Temps d'attente estimé : 5 minutes</Text>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Assistance;