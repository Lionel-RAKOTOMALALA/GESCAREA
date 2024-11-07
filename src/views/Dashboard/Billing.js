import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Text,
  useColorMode,
  useColorModeValue,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  HStack,
  SimpleGrid,
  Tooltip,
  Avatar,
  AvatarGroup,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { FaFileAlt, FaFilePdf, FaPrint, FaSearch, FaChartLine, FaEye, FaDownload } from "react-icons/fa";

// Mock data for impression lists
const reports = [
  { name: "Rapport quotidien", date: "30 Mai 2023", type: "Quotidien", pages: 5, status: "Généré", author: "Jean D." },
  { name: "Rapport d'incidents", date: "29 Mai 2023", type: "Quotidien", pages: 3, status: "En attente", author: "Marie L." },
  { name: "Rapport de patrouille", date: "28 Mai 2023", type: "Quotidien", pages: 4, status: "Généré", author: "Pierre M." },
  { name: "Résumé hebdomadaire", date: "22-28 Mai 2023", type: "Hebdomadaire", pages: 10, status: "Généré", author: "Sophie R." },
  { name: "Analyse des tendances", date: "15-21 Mai 2023", type: "Hebdomadaire", pages: 8, status: "En révision", author: "Luc B." },
  { name: "Rapport mensuel", date: "Mai 2023", type: "Mensuel", pages: 20, status: "Généré", author: "Claire T." },
];

function ImpressionLists() {
  const { colorMode } = useColorMode();
  const textColor = useColorModeValue("gray.700", "white");
  const bgCard = useColorModeValue("white", "navy.800");
  const bgHover = useColorModeValue("gray.100", "navy.700");
  const bgButton = useColorModeValue("teal.300", "teal.400");
  const iconColor = useColorModeValue("teal.300", "teal.300");

  const [searchTerm, setSearchTerm] = useState("");

  const filteredReports = reports.filter(report => 
    report.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Card mb='20px' align='center'>
        <CardBody>
          <Flex direction={{ base: "column", md: "row" }} align='center' justify='space-between' w='100%'>
            <VStack align={{ base: "center", md: "start" }} mb={{ base: 4, md: 0 }}>
              <Text color={textColor} fontSize='2xl' fontWeight='bold'>
                Centre d'Impression
              </Text>
              <Text color='gray.500'>Gérez et imprimez vos rapports facilement</Text>
            </VStack>
            <HStack>
              <Button
                leftIcon={<FaPrint />}
                bg={bgButton}
                color='white'
                _hover={{ bg: "teal.200" }}
                size='md'
              >
                Imprimer Tous
              </Button>
              <InputGroup maxW='300px'>
                <InputLeftElement pointerEvents='none'>
                  <FaSearch color='gray.300' />
                </InputLeftElement>
                <Input 
                  placeholder='Rechercher des rapports...' 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </HStack>
          </Flex>
        </CardBody>
      </Card>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={8}>
        <Card>
          <CardBody>
            <VStack align='center'>
              <Icon as={FaFilePdf} w={10} h={10} color={iconColor} />
              <Text fontSize='2xl' fontWeight='bold'>{reports.length}</Text>
              <Text>Rapports Disponibles</Text>
            </VStack>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <VStack align='center'>
              <Icon as={FaPrint} w={10} h={10} color={iconColor} />
              <Text fontSize='2xl' fontWeight='bold'>
                {reports.filter(r => r.status === "Généré").length}
              </Text>
              <Text>Rapports Générés</Text>
            </VStack>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <VStack align='center'>
              <Icon as={FaChartLine} w={10} h={10} color={iconColor} />
              <Text fontSize='2xl' fontWeight='bold'>+12.7%</Text>
              <Text>Augmentation ce mois</Text>
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>

      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
        <VStack spacing={6} align='stretch'>
          {filteredReports.map((report, index) => (
            <Card key={index} bg={bgCard} _hover={{ bg: bgHover, transform: "translateY(-5px)" }} transition="all 0.3s">
              <CardBody>
                <Flex justify='space-between' align='center'>
                  <HStack spacing={4}>
                    <Icon as={FaFileAlt} color={iconColor} boxSize={6} />
                    <VStack align='start' spacing={0}>
                      <Text fontWeight='bold' fontSize='lg'>{report.name}</Text>
                      <Text fontSize='sm' color='gray.500'>{report.date} • {report.type}</Text>
                    </VStack>
                  </HStack>
                  <HStack>
                    <Tooltip label="Voir le rapport">
                      <Button size='sm' variant='ghost' colorScheme='blue'>
                        <Icon as={FaEye} />
                      </Button>
                    </Tooltip>
                    <Tooltip label="Télécharger le PDF">
                      <Button size='sm' variant='ghost' colorScheme='green'>
                        <Icon as={FaDownload} />
                      </Button>
                    </Tooltip>
                  </HStack>
                </Flex>
                <Flex mt={4} justify='space-between' align='center'>
                  <HStack>
                    <Text fontSize='sm' color='gray.500'>{report.pages} pages</Text>
                    <Text fontSize='sm' color='gray.500'>•</Text>
                    <Text fontSize='sm' color='gray.500'>Par {report.author}</Text>
                  </HStack>
                  <Text
                    fontSize='sm'
                    fontWeight='bold'
                    color={
                      report.status === "Généré" ? "green.500" :
                      report.status === "En attente" ? "orange.500" :
                      "red.500"
                    }
                  >
                    {report.status}
                  </Text>
                </Flex>
              </CardBody>
            </Card>
          ))}
        </VStack>

        <VStack spacing={6}>
          <Card>
            <CardHeader>
              <Text fontSize='lg' fontWeight='bold'>Activité Récente</Text>
            </CardHeader>
            <CardBody>
              <VStack align='stretch' spacing={4}>
                {reports.slice(0, 5).map((report, index) => (
                  <HStack key={index} justify='space-between'>
                    <HStack>
                      <Avatar size='sm' name={report.author} />
                      <VStack align='start' spacing={0}>
                        <Text fontSize='sm' fontWeight='medium'>{report.name}</Text>
                        <Text fontSize='xs' color='gray.500'>{report.date}</Text>
                      </VStack>
                    </HStack>
                    <Text fontSize='xs' fontWeight='bold' color={report.status === "Généré" ? "green.500" : "orange.500"}>
                      {report.status}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <Text fontSize='lg' fontWeight='bold'>Collaborateurs Actifs</Text>
            </CardHeader>
            <CardBody>
              <AvatarGroup size='md' max={5}>
                {[...new Set(reports.map(r => r.author))].map((author, index) => (
                  <Avatar key={index} name={author} />
                ))}
              </AvatarGroup>
            </CardBody>
          </Card>
        </VStack>
      </Grid>
    </Flex>
  );
}

export default ImpressionLists;