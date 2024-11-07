import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import avatar5 from "assets/img/avatars/avatar5.png";
import useFetch from "hooks/fetch.hook";
import React, { useEffect } from "react";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaCube,
  FaEnvelope,
  FaIdCard,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { useAuthStore } from "store/store";

function Profile() {
  const { colorMode } = useColorMode();
  const textColor = useColorModeValue("gray.700", "white");
  const bgProfile = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");
  const borderProfileColor = useColorModeValue("white", "transparent");
  const emailColor = useColorModeValue("gray.400", "gray.300");

  const iconBoxInside = useColorModeValue("white", "white");
  const iconTeal = useColorModeValue("teal.300", "teal.300");
  const iconBlue = useColorModeValue("blue.500", "blue.500");

// Récupérer apiData depuis le store
const apiData = useAuthStore((state) => state.apiData);
useFetch()
// Utiliser useEffect pour afficher les données en console
useEffect(() => {
  console.log("API Data profile:", apiData);
}, [apiData]);

// Vérifie si les données sont disponibles avant de les afficher
if (!apiData || !apiData.employe) return null;

  return (
    <Flex direction='column'>
      <Box
        mb={{ sm: "205px", md: "75px", xl: "70px" }}
        borderRadius='15px'
        px='0px'
        display='flex'
        flexDirection='column'
        justifyContent='center'
        align='center'
      >
        <Box
          bgImage={bgProfile}
          w='100%'
          h='300px'
          borderRadius='25px'
          bgPosition='50%'
          bgRepeat='no-repeat'
          position='relative'
          display='flex'
          justifyContent='center'
        >
          <Flex
            direction={{ sm: "column", md: "row" }}
            mx='1.5rem'
            maxH='330px'
            w={{ sm: "90%", xl: "95%" }}
            justifyContent={{ sm: "center", md: "space-between" }}
            align='center'
            backdropFilter='saturate(200%) blur(50px)'
            position='absolute'
            boxShadow='0px 2px 5.5px rgba(0, 0, 0, 0.02)'
            border='2px solid'
            borderColor={borderProfileColor}
            bg={bgProfile}
            p='24px'
            borderRadius='20px'
            transform={{
              sm: "translateY(45%)",
              md: "translateY(110%)",
              lg: "translateY(160%)",
            }}
          >
            <Flex
              align='center'
              mb={{ sm: "10px", md: "0px" }}
              direction={{ sm: "column", md: "row" }}
              w={{ sm: "100%" }}
              textAlign={{ sm: "center", md: "start" }}
            >
              <Avatar
                me={{ md: "22px" }}
                src={avatar5}
                w='80px'
                h='80px'
                borderRadius='15px'
              />
              <Flex direction='column' maxWidth='100%' my={{ sm: "14px" }}>
                <Text
                  fontSize={{ sm: "lg", lg: "xl" }}
                  color={textColor}
                  fontWeight='bold'
                  ms={{ sm: "8px", md: "0px" }}
                >
                  {apiData.employe.prenom} {apiData.employe.nom}
                </Text>
                <Text
                  fontSize={{ sm: "sm", md: "md" }}
                  color={emailColor}
                  fontWeight='semibold'
                >
                  {apiData.employe.profile}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Box>
      <Grid templateColumns={{ sm: "1fr", xl: "repeat(3, 1fr)" }} gap='22px'>
        <Card p='16px'>
          <CardHeader p='12px 5px' mb='12px'>
            <Text fontSize='lg' color={textColor} fontWeight='bold'>
              Informations Personnelles
            </Text>
          </CardHeader>
          <CardBody px='5px'>
            <Flex direction='column'>
              <Flex align='center' mb='18px'>
                <Icon as={FaIdCard} me='4px' color={iconBlue} />
                <Text fontSize='sm' color={textColor} fontWeight='bold' me='10px'>
                  Nom complet:{" "}
                </Text>
                <Text fontSize='sm' color='gray.400' fontWeight='400'>
                  {apiData.employe.prenom} {apiData.employe.nom}
                </Text>
              </Flex>
              <Flex align='center' mb='18px'>
                <Icon as={FaPhone} me='4px' color={iconBlue} />
                <Text fontSize='sm' color={textColor} fontWeight='bold' me='10px'>
                  Téléphone:{" "}
                </Text>
                <Text fontSize='sm' color='gray.400' fontWeight='400'>
                  {apiData.employe.contact_personnel}
                </Text>
              </Flex>
              <Flex align='center' mb='18px'>
                <Icon as={FaEnvelope} me='4px' color={iconBlue} />
                <Text fontSize='sm' color={textColor} fontWeight='bold' me='10px'>
                  Email:{" "}
                </Text>
                <Text fontSize='sm' color='gray.400' fontWeight='400'>
                  {apiData.employe.email}
                </Text>
              </Flex>
              <Flex align='center' mb='18px'>
                <Icon as={FaMapMarkerAlt} me='4px' color={iconBlue} />
                <Text fontSize='sm' color={textColor} fontWeight='bold' me='10px'>
                  Adresse:{" "}
                </Text>
                <Text fontSize='sm' color='gray.400' fontWeight='400'>
                  {apiData.employe.adresse}
                </Text>
              </Flex>
              <Flex align='center' mb='18px'>
                <Icon as={FaCalendarAlt} me='4px' color={iconBlue} />
                <Text fontSize='sm' color={textColor} fontWeight='bold' me='10px'>
                  Date de naissance:{" "}
                </Text>
                <Text fontSize='sm' color='gray.400' fontWeight='400'>
                  {new Date(apiData.employe.date_naissance).toLocaleDateString()}
                </Text>
              </Flex>
              <Flex align='center' mb='18px'>
                <Icon as={FaBriefcase} me='4px' color={iconBlue} />
                <Text fontSize='sm' color={textColor} fontWeight='bold' me='10px'>
                  Profil:{" "}
                </Text>
                <Text fontSize='sm' color='gray.400' fontWeight='400'>
                  {apiData.employe.profile}
                </Text>
              </Flex>

              <Flex align='center' mb='18px'>
                <Text fontSize='sm' color={textColor} fontWeight='bold' me='10px'>
                  Diplome:{" "}
                </Text>
                <Text fontSize='sm' color='gray.400' fontWeight='400'>
                  {apiData.diplomes[0].diplome}
                </Text>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
        <Card p='16px'>
          <CardHeader p='12px 5px' mb='12px'>
            <Text fontSize='lg' color={textColor} fontWeight='bold'>
              Statut
            </Text>
          </CardHeader>
          <CardBody px='5px'>
            <Flex direction='column'>
              <Flex align='center' mb='18px'>
                <Text fontSize='sm' color={textColor} fontWeight='bold' me='10px'>
                  Qualité:{" "}
                </Text>
                <Text fontSize='sm' color='gray.400' fontWeight='400'>
                  {apiData.statut.qualite}
                </Text>
              </Flex>
              <Flex align='center' mb='18px'>
                <Text fontSize='sm' color={textColor} fontWeight='bold' me='10px'>
                  Categorie:{" "}
                </Text>
                <Text fontSize='sm' color='gray.400' fontWeight='400'>
                  {apiData.statut.categorie}
                </Text>
              </Flex>
              <Flex align='center' mb='18px'>
                <Text fontSize='sm' color={textColor} fontWeight='bold' me='10px'>
                  Corps:{" "}
                </Text>
                <Text fontSize='sm' color='gray.400' fontWeight='400'>
                  {apiData.statut.corps}
                </Text>
              </Flex>
              <Flex align='center' mb='18px'>
                <Text fontSize='sm' color={textColor} fontWeight='bold' me='10px'>
                  Grade:{" "}
                </Text>
                <Text fontSize='sm' color='gray.400' fontWeight='400'>
                  {apiData.statut.grade}
                </Text>
              </Flex>
              <Flex align='center' mb='18px'>
                <Text fontSize='sm' color={textColor} fontWeight='bold' me='10px'>
                  Statut non encadré:{" "}
                </Text>
                <Text fontSize='sm' color='gray.400' fontWeight='400'>
                  {apiData.statut.situation_non_encadres}
                </Text>
              </Flex>
              <Flex align='center' mb='18px'>
                <Text fontSize='sm' color={textColor} fontWeight='bold' me='10px'>
                  Structure:{" "}
                </Text>
                <Text fontSize='sm' color='gray.400' fontWeight='400'>
                  {apiData.statut.structure}
                </Text>
              </Flex>
              <Flex align='center' mb='18px'>
                <Text fontSize='sm' color={textColor} fontWeight='bold' me='10px'>
                  Indice:{" "}
                </Text>
                <Text fontSize='sm' color='gray.400' fontWeight='400'>
                  {apiData.statut.indice}
                </Text>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
        <Card p='16px'>
          <CardHeader p='12px 5px' mb='12px'>
            <Text fontSize='lg' color={textColor} fontWeight='bold'>
              Documents
            </Text>
          </CardHeader>
          <CardBody px='5px'>
            <Flex direction='column'>
              <Flex align='center' mb='18px'>
                <Icon as={IoDocumentsSharp} me='4px' color={iconTeal} />
                <Text fontSize='sm' color={textColor} fontWeight='bold' me='10px'>
                  Contrat:{" "}
                </Text>
                <Button
                  size='sm'
                  colorScheme='teal'
                  variant='outline'
                  onClick={() => window.open(apiData.documents.contrat, '_blank')}
                >
                  Télécharger
                </Button>
              </Flex>
              <Flex align='center' mb='18px'>
                <Icon as={IoDocumentsSharp} me='4px' color={iconTeal} />
                <Text fontSize='sm' color={textColor} fontWeight='bold' me='10px'>
                  Attestation:{" "}
                </Text>
                <Button
                  size='sm'
                  colorScheme='teal'
                  variant='outline'
                  onClick={() => window.open(apiData.documents.attestation, '_blank')}
                >
                  Télécharger
                </Button>
              </Flex>
              <Flex align='center' mb='18px'>
                <Icon as={IoDocumentsSharp} me='4px' color={iconTeal} />
                <Text fontSize='sm' color={textColor} fontWeight='bold' me='10px'>
                  Certificat:{" "}
                </Text>
                <Button
                  size='sm'
                  colorScheme='teal'
                  variant='outline'
                  onClick={() => window.open(apiData.documents.certificat, '_blank')}
                >
                  Télécharger
                </Button>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  );
}

export default Profile;
