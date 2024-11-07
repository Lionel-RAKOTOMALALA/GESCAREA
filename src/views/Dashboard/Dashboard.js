import {
  Box,
  Button,
  Flex,
  Grid,
  Progress,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import BarChart from "components/Charts/BarChart";
import LineChart from "components/Charts/LineChart";
import IconBox from "components/Icons/IconBox";
import { PeopleIcon,BriefcaseIcon,SyncIcon,EducationIcon } from "components/Icons/Icons";
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
} from "components/Icons/Icons.js";
import React from "react";
import {
  barChartData,
  barChartOptions,
  lineChartData,
  lineChartOptions,
} from "variables/charts";
import { pageVisits, socialTraffic } from "variables/general";

export default function Dashboard() {
  const { colorMode } = useColorMode();
  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const iconBoxInside = useColorModeValue("white", "white");
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
  const journauxActions = [
    {
      action: "Création de l'employé",
      date: "2024-10-01",
      observations: "Employé ajouté avec succès."
    },
    {
      action: "Modification du statut",
      date: "2024-10-02",
      observations: "Statut mis à jour à permanent."
    },
    {
      action: "Affectation au poste",
      date: "2024-10-03",
      observations: "Affecté au poste de développeur."
    },
    {
      action: "Évaluation de performance",
      date: "2024-10-04",
      observations: "Performance excellente, score: 90."
    }
  ];
  
  const employeeStats = [
    {
      category: "Total Employés",
      count: 100, // Total des employés
      percentage: 100,
      color: "green"
    },
    {
      category: "Changements de Grade",
      count: 15, // Exemple de nombre de changements de grade
      percentage: 15, // Pourcentage de changements de grade
      color: "blue"
    },
    {
      category: "Changements de Corps",
      count: 5, // Exemple de nombre de changements de corps
      percentage: 5, // Pourcentage de changements de corps
      color: "yellow"
    },
    {
      category: "Employés en Congé",
      count: 10, // Exemple de nombre d'employés en congé
      percentage: 10, // Pourcentage d'employés en congé
      color: "orange"
    },
    {
      category: "Employés Affectés",
      count: 70, // Exemple de nombre d'employés affectés
      percentage: 70, // Pourcentage d'employés affectés
      color: "purple"
    }
  ];
  
  

  return (
    <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
<Box
  position="relative"
  zIndex="1"
  mb="20px"
  mx="-12px"
  mt="5px"
  px="12px"
  py="15px"
>
  <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
    <Card minH="125px" bg={cardBg} boxShadow={cardShadow} p="20px">
      <Flex direction="column" justify="space-between" h="100%">
        <Flex direction="row" align="center" justify="space-between" w="100%" mb="10px">
          <Stat me="auto">
            <StatLabel
              fontSize="xs"
              color="gray.400"
              fontWeight="bold"
              textTransform="uppercase"
              mb="8px"
            >
              Total Employés
            </StatLabel>
            <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
              150
            </StatNumber>
          </Stat>
          <IconBox borderRadius="50%" as="box" h="45px" w="45px" bg={iconBlue}>
            <PeopleIcon h="24px" w="24px" color={iconBoxInside} />
          </IconBox>
        </Flex>
        <Text color="gray.400" fontSize="sm" mt="auto">
          <Text as="span" color="green.400" fontWeight="bold">+2% </Text>
          depuis le mois dernier
        </Text>
      </Flex>
    </Card>

    <Card minH="125px" bg={cardBg} boxShadow={cardShadow} p="20px">
      <Flex direction="column" justify="space-between" h="100%">
        <Flex direction="row" align="center" justify="space-between" w="100%" mb="10px">
          <Stat me="auto">
            <StatLabel
              fontSize="xs"
              color="gray.400"
              fontWeight="bold"
              textTransform="uppercase"
              mb="8px"
            >
              Postes Vacants
            </StatLabel>
            <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
              8
            </StatNumber>
          </Stat>
          <IconBox borderRadius="50%" as="box" h="45px" w="45px" bg={iconBlue}>
            <BriefcaseIcon h="24px" w="24px" color={iconBoxInside} />
          </IconBox>
        </Flex>
        <Text color="gray.400" fontSize="sm" mt="auto">
          <Text as="span" color="red.500" fontWeight="bold">-1 poste </Text>
          depuis le mois dernier
        </Text>
      </Flex>
    </Card>

    <Card minH="125px" bg={cardBg} boxShadow={cardShadow} p="20px">
      <Flex direction="column" justify="space-between" h="100%">
        <Flex direction="row" align="center" justify="space-between" w="100%" mb="10px">
          <Stat me="auto">
            <StatLabel
              fontSize="xs"
              color="gray.400"
              fontWeight="bold"
              textTransform="uppercase"
              mb="8px"
            >
              DERNIERE SITUATION EN APPROCHE
            </StatLabel>
            <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
              12
            </StatNumber>
          </Stat>
          <IconBox borderRadius="50%" as="box" h="45px" w="45px" bg={iconBlue}>
            <SyncIcon h="24px" w="24px" color={iconBoxInside} />
          </IconBox>
        </Flex>
        <Text color="gray.400" fontSize="sm" mt="auto">
          <Text as="span" color="green.400" fontWeight="bold">+3 </Text>
          depuis le mois dernier
        </Text>
      </Flex>
    </Card>

    <Card minH="125px" bg={cardBg} boxShadow={cardShadow} p="20px">
      <Flex direction="column" justify="space-between" h="100%">
        <Flex direction="row" align="center" justify="space-between" w="100%" mb="10px">
          <Stat me="auto">
            <StatLabel
              fontSize="xs"
              color="gray.400"
              fontWeight="bold"
              textTransform="uppercase"
              mb="8px"
            >
              DERNIERE RECLASSEMENT
            </StatLabel>
            <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
              25
            </StatNumber>
          </Stat>
          <IconBox borderRadius="50%" as="box" h="45px" w="45px" bg={iconBlue}>
            <EducationIcon h="24px" w="24px" color={iconBoxInside} />
          </IconBox>
        </Flex>
        <Text color="gray.400" fontSize="sm" mt="auto">
          <Text as="span" color="green.400" fontWeight="bold">+10% </Text>
          depuis le mois dernier
        </Text>
      </Flex>
    </Card>
  </SimpleGrid>
</Box>



      
      <Grid
        templateColumns={{ sm: "1fr", lg: "2fr 1fr" }}
        templateRows={{ lg: "repeat(2, auto)" }}
        gap='20px'>
        <Card
          bg={cardBgGradient}
          p='0px'
          maxW={{ sm: "320px", md: "100%" }}>
          <Flex direction='column' mb='40px' p='28px 0px 0px 22px'>
            <Text color='#fff' fontSize='lg' fontWeight='bold' mb='6px'>
              Sales Overview
            </Text>
            <Text color='#fff' fontSize='sm'>
              <Text as='span' color='green.400' fontWeight='bold'>
                (+5) more{" "}
              </Text>
              in 2022
            </Text>
          </Flex>
          <Box minH='300px'>
            <LineChart
              chartData={lineChartData}
              chartOptions={lineChartOptions}
            />
          </Box>
        </Card>
        <Card p='0px' maxW={{ sm: "320px", md: "100%" }} bg={cardBg} boxShadow={cardShadow}>
          <Flex direction='column' mb='40px' p='28px 0px 0px 22px'>
            <Text color='gray.400' fontSize='sm' fontWeight='bold' mb='6px'>
              PERFORMANCE
            </Text>
            <Text color={textColor} fontSize='lg' fontWeight='bold'>
              Total orders
            </Text>
          </Flex>
          <Box minH='300px'>
            <BarChart chartData={barChartData} chartOptions={barChartOptions} />
          </Box>
        </Card>
        <Card p='0px' maxW={{ sm: "320px", md: "100%" }} bg={cardBg} boxShadow={cardShadow}>
  <Flex direction='column'>
    <Flex align='center' justify='space-between' p='22px'>
      <Text fontSize='lg' color={textColor} fontWeight='bold'>
        Journaux d'Actions
      </Text>
      <Button variant='primary' maxH='30px'>
        VOIR TOUT
      </Button>
    </Flex>
    <Box overflow={{ sm: "scroll", lg: "hidden" }}>
      <Table>
        <Thead>
          <Tr bg={tableRowColor}>
            <Th color='gray.400' borderColor={borderColor}>
              Action
            </Th>
            <Th color='gray.400' borderColor={borderColor}>
              Date
            </Th>
            <Th color='gray.400' borderColor={borderColor}>
              Observations
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {journauxActions.map((el, index, arr) => {
            return (
              <Tr key={index}>
                <Td
                  color={textTableColor}
                  fontSize='sm'
                  fontWeight='bold'
                  borderColor={borderColor}
                  border={index === arr.length - 1 ? "none" : null}>
                  {el.action}
                </Td>
                <Td
                  color={textTableColor}
                  fontSize='sm'
                  border={index === arr.length - 1 ? "none" : null}
                  borderColor={borderColor}>
                  {el.date}
                </Td>
                <Td
                  color={textTableColor}
                  fontSize='sm'
                  border={index === arr.length - 1 ? "none" : null}
                  borderColor={borderColor}>
                  {el.observations}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  </Flex>
</Card>




<Card p='0px' maxW={{ sm: "320px", md: "100%" }} bg={cardBg} boxShadow={cardShadow}>
  <Flex direction='column'>
    <Flex align='center' justify='space-between' p='22px'>
      <Text fontSize='lg' color={textColor} fontWeight='bold'>
        Statistiques des Employés
      </Text>
      <Button variant='primary' maxH='30px'>
        VOIR TOUT
      </Button>
    </Flex>
  </Flex>
    <Box overflow={{ sm: "scroll", lg: "hidden" }}>
    <Table>
    <Thead>
      <Tr bg={tableRowColor}>
        <Th color='gray.400' borderColor={borderColor} width='550px'> {/* Augmentez la largeur ici */}
          Catégorie
        </Th>
        <Th color='gray.400' borderColor={borderColor} width='50px'>
          Nombre
        </Th>
        <Th color='gray.400' borderColor={borderColor} width='50px'></Th>
      </Tr>
    </Thead>
    <Tbody>
      {employeeStats.map((el, index, arr) => {
        return (
          <Tr key={index}>
            <Td
              color={textTableColor}
              fontSize='sm'
              fontWeight='bold'
              borderColor={borderColor}
              border={index === arr.length - 1 ? "none" : null}>
              {el.category}
            </Td>
            <Td
              color={textTableColor}
              fontSize='sm'
              borderColor={borderColor}
              border={index === arr.length - 1 ? "none" : null}>
              {el.count}
            </Td>
            <Td
              color={textTableColor}
              fontSize='sm'
              borderColor={borderColor}
              border={index === arr.length - 1 ? "none" : null}>
              <Flex align='center'>
                <Text
                  color={textTableColor}
                  fontWeight='bold'
                  fontSize='sm'
                  me='12px'>{`${el.percentage}%`}</Text>
                <Progress
                  size='xs'
                  colorScheme={el.color}
                  value={el.percentage}
                  minW='120px'
                />
              </Flex>
            </Td>
          </Tr>
        );
      })}
    </Tbody>
  </Table>

    </Box>
</Card>

      </Grid>
    </Flex>
  );
}