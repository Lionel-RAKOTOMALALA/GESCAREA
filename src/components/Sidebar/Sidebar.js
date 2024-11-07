import React from 'react';
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useColorModeValue,
  Icon,
  Collapse,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useAuthStore } from 'store/store';
import { navigate, useNavigate } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon, HamburgerIcon } from "@chakra-ui/icons";
import { NavLink, useLocation } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import IconBox from "components/Icons/IconBox";
import { LogoutIcon } from "components/Icons/Icons";
import { HSeparator } from "components/Separator/Separator";
import {
  renderThumbDark,
  renderThumbLight,
  renderTrack,
  renderTrackRTL,
  renderView,
  renderViewRTL
} from "components/Scrollbar/Scrollbar";

function Sidebar(props) {
  
  // Récupération des fonctions de Zustand
  const setActive = useAuthStore((state) => state.setActive);
  const setUsername = useAuthStore((state) => state.setUsername);

  const handleLogout = () => {
    // Vider tout le localStorage
    localStorage.clear();
     
    // Réinitialiser l'état du store Zustand
    setActive(false);    // Désactiver l'utilisateur
    setUsername('');     // Réinitialiser le nom d'utilisateur
    
 
     // Redirige l'utilisateur vers la page de connexion
     navigate('/auth/signin');
   };
  const location = useLocation();
  const mainPanel = React.useRef();
  const variantChange = "0.2s linear";

  const { logo, routes } = props;
  const navigate = useNavigate();

  const [openSubmenu, setOpenSubmenu] = React.useState(null);

  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };

  const createLinks = (routes) => {
    const activeBg = useColorModeValue("white", "navy.700");
    const inactiveBg = useColorModeValue("white", "navy.700");
    const activeColor = useColorModeValue("gray.700", "white");
    const inactiveColor = useColorModeValue("gray.400", "gray.400");
    const sidebarActiveShadow = "0px 7px 11px rgba(0, 0, 0, 0.04)";

    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }

      if (prop.name === "Mon Espace Personnel") {
        return (
          <Box key={key}>
            <Text
              color={inactiveColor}
              fontWeight="bold"
              mb="4px"
              ms="4px"
            >
              {prop.name}
            </Text>
            {prop.views && prop.views.map((view, viewKey) => (
              <NavLink to={view.layout + view.path} key={viewKey}>
                <Button
                  boxSize="initial"
                  justifyContent="flex-start"
                  alignItems="center"
                  bg="transparent"
                  mb={{
                    xl: "6px",
                  }}
                  mx={{
                    xl: "auto",
                  }}
                  py="12px"
                  ps={{
                    sm: "10px",
                    xl: "16px",
                  }}
                  borderRadius="15px"
                  _hover={{
                    bg: activeBg,
                  }}
                  w="100%"
                  _active={{
                    bg: activeBg,
                    transform: "none",
                    borderColor: "transparent",
                  }}
                  _focus={{
                    boxShadow: "none",
                  }}
                >
                  <Flex>
                    <IconBox
                      bg={activeRoute(view.layout + view.path) === "active" ? "blue.500" : inactiveBg}
                      color={activeRoute(view.layout + view.path) === "active" ? "white" : "blue.500"}
                      h="30px"
                      w="30px"
                      me="12px"
                      transition={variantChange}
                    >
                      {view.icon}
                    </IconBox>
                    <Text
                      color={activeRoute(view.layout + view.path) === "active" ? activeColor : inactiveColor}
                      my="auto"
                      fontSize="sm"
                    >
                      {view.name}
                    </Text>
                  </Flex>
                </Button>
              </NavLink>
            ))}
          </Box>
        );
      }

      if (prop.name === "Liste") {
        return (
          <Box key={key}>
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg={openSubmenu === prop.name ? activeBg : "transparent"}
              mb={{
                xl: "6px",
              }}
              mx={{
                xl: "auto",
              }}
              py="12px"
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              pe="16px" // Add right padding
              borderRadius="15px"
              _hover={{
                bg: activeBg,
              }}
              w="100%"
              _active={{
                bg: activeBg,
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: sidebarActiveShadow,
              }}
              onClick={() => setOpenSubmenu(openSubmenu === prop.name ? null : prop.name)}
            >
              <Flex justifyContent="space-between" alignItems="center" width="100%">
                <Flex alignItems="center">
                  <IconBox
                    bg={openSubmenu === prop.name ? "blue.500" : inactiveBg}
                    color={openSubmenu === prop.name ? "white" : "blue.500"}
                    h="30px"
                    w="30px"
                    me="12px"
                    transition={variantChange}
                  >
                    {prop.icon}
                  </IconBox>
                  <Text
                    color={openSubmenu === prop.name ? activeColor : inactiveColor}
                    my="auto"
                    fontSize="sm"
                    fontWeight={openSubmenu === prop.name ? "bold" : "normal"}
                  >
                    {prop.name}
                  </Text>
                </Flex>
                <Icon
                  as={openSubmenu === prop.name ? ChevronUpIcon : ChevronDownIcon}
                  color={openSubmenu === prop.name ? activeColor : inactiveColor}
                  transition={variantChange}
                />
              </Flex>
            </Button>
            <Collapse in={openSubmenu === prop.name} animateOpacity>
              <Stack
                pl={10}
                mt={2}
                spacing={2}
                transition={variantChange}
              >
                {prop.views.map((view, viewKey) => (
                  <NavLink to={view.layout + view.path} key={viewKey}>
                    <Text
                      color={activeRoute(view.layout + view.path) === "active" ? activeColor : inactiveColor}
                      fontSize="sm"
                      fontWeight={activeRoute(view.layout + view.path) === "active" ? "bold" : "normal"}
                      _hover={{
                        color: activeColor,
                        transition: variantChange,
                      }}
                    >
                      {view.name}
                    </Text>
                  </NavLink>
                ))}
              </Stack>
            </Collapse>
          </Box>
        );
      }

      return (
        <NavLink to={prop.layout + prop.path} key={key}>
          <Button
            boxSize="initial"
            justifyContent="flex-start"
            alignItems="center"
            bg={activeRoute(prop.layout + prop.path) === "active" ? activeBg : "transparent"}
            mb={{
              xl: "6px",
            }}
            mx={{
              xl: "auto",
            }}
            py="12px"
            ps={{
              sm: "10px",
              xl: "16px",
            }}
            borderRadius="15px"
            _hover={{
              bg: activeBg,
            }}
            w="100%"
            _active={{
              bg: activeBg,
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: activeRoute(prop.layout + prop.path) === "active" ? sidebarActiveShadow : "none",
            }}
          >
            <Flex>
              {typeof prop.icon === "string" ? (
                <Icon>{prop.icon}</Icon>
              ) : (
                <IconBox
                  bg={activeRoute(prop.layout + prop.path) === "active" ? "blue.500" : inactiveBg}
                  color={activeRoute(prop.layout + prop.path) === "active" ? "white" : "blue.500"}
                  h="30px"
                  w="30px"
                  me="12px"
                  transition={variantChange}
                >
                  {prop.icon}
                </IconBox>
              )}
              <Text
                color={activeRoute(prop.layout + prop.path) === "active" ? activeColor : inactiveColor}
                my="auto"
                fontSize="sm"
                fontWeight={activeRoute(prop.layout + prop.path) === "active" ? "bold" : "normal"}
              >
                {document.documentElement.dir === "rtl" ? prop.rtlName : prop.name}
              </Text>
            </Flex>
          </Button>
        </NavLink>
      );
    });
  };

  const links = <>{createLinks(routes)}</>;

  const sidebarBg = useColorModeValue("white", "navy.800");
  const sidebarRadius = "20px";
  const sidebarMargins = "0px";

  const brand = (
    <Box pt={"25px"} mb="12px">
      {logo}
      <HSeparator my="26px" />
    </Box>
  );

  return (
    <Box ref={mainPanel}>
      <Box display={{ sm: "none", xl: "block" }} position="fixed">
        <Box
          bg={sidebarBg}
          transition={variantChange}
          w="260px"
          maxW="260px"
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          h="calc(100vh - 32px)"
          ps="20px"
          pe="20px"
          m={sidebarMargins}
          filter="drop-shadow(0px 5px 14px rgba(0, 0, 0, 0.05))"
          borderRadius={sidebarRadius}
        >
          <Scrollbars
            autoHide
            renderTrackVertical={
              document.documentElement.dir === "rtl" ? renderTrackRTL : renderTrack
            }
            renderThumbVertical={useColorModeValue(renderThumbLight, renderThumbDark)}
            renderView={
              document.documentElement.dir === "rtl" ? renderViewRTL : renderView
            }
          >
            <Box>{brand}</Box>
            <Stack direction="column" mb="40px">
              <Box>{links}</Box>
              <Button
      onClick={handleLogout} // Associe la fonction de déconnexion ici
      boxSize="initial"
      justifyContent="flex-start"
      alignItems="center"
      bg="transparent"
      mb={{
        xl: "6px",
      }}
      mx={{
        xl: "auto",
      }}
      py="12px"
      ps={{
        sm: "10px",
        xl: "16px",
      }}
      borderRadius="15px"
      _hover={{
        bg: "transparent",
      }}
      w="100%"
      _active={{
        bg: "inherit",
        transform: "none",
        borderColor: "transparent",
      }}
      _focus={{
        boxShadow: "none",
      }}
    >
      <Flex>
        <IconBox
          bg="#F81037"
          color="white"
          h="30px"
          w="30px"
          me="12px"
          transition={variantChange}
        >
          <LogoutIcon w="20px" h="20px" color="white" />
        </IconBox>
        <Text color="#F81037" my="auto" fontSize="sm">
          Déconnexion
        </Text>
      </Flex>
    </Button>
            </Stack>
          </Scrollbars>
        </Box>
      </Box>
    </Box>
  );
}

export function SidebarResponsive(props) {
  
  // Récupération des fonctions de Zustand
  const setActive = useAuthStore((state) => state.setActive);
  const setUsername = useAuthStore((state) => state.setUsername);

  const handleLogout = () => {
   // Vider tout le localStorage
   localStorage.clear();
    
   // Réinitialiser l'état du store Zustand
   setActive(false);    // Désactiver l'utilisateur
   setUsername('');     // Réinitialiser le nom d'utilisateur
   

    // Redirige l'utilisateur vers la page de connexion
    navigate('/auth/signin');
  };
  const navigate = useNavigate();

  const location = useLocation();
  const { logo, routes, colorMode, hamburgerColor, ...rest } = props;
  const mainPanel = React.useRef();

  const [openSubmenu, setOpenSubmenu] = React.useState(null);

  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };

  const activeBg = useColorModeValue("white", "navy.700");
  const inactiveBg = useColorModeValue("white", "navy.700");
  const activeColor = useColorModeValue("gray.700", "white");
  const inactiveColor = useColorModeValue("gray.400", "gray.400");
  const sidebarActiveShadow = "0px 7px 11px rgba(0, 0, 0, 0.04)";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const variantChange = "0.2s linear";

  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }

      if (prop.name === "Mon Espace Personnel") {
        return (
          <Box key={key}>
            <Text
              color={inactiveColor}
              fontWeight="bold"
              mb="4px"
              ms="4px"
            >
              {prop.name}
            </Text>
            {prop.views && prop.views.map((view, viewKey) => (
              <NavLink to={view.layout + view.path} key={viewKey}>
                <Button
                  boxSize="initial"
                  justifyContent="flex-start"
                  alignItems="center"
                  bg="transparent"
                  mb={{
                    xl: "6px",
                  }}
                  mx={{
                    xl: "auto",
                  }}
                  py="12px"
                  ps={{
                    sm: "10px",
                    xl: "16px",
                  }}
                  borderRadius="15px"
                  _hover={{
                    bg: activeBg,
                  }}
                  w="100%"
                  _active={{
                    bg: activeBg,
                    transform: "none",
                    borderColor: "transparent",
                  }}
                  _focus={{
                    boxShadow: "none",
                  }}
                >
                  <Flex>
                    <IconBox
                      bg={activeRoute(view.layout + view.path) === "active" ? "blue.500" : inactiveBg}
                      color={activeRoute(view.layout + view.path) === "active" ? "white" : "blue.500"}
                      h="30px"
                      w="30px"
                      me="12px"
                      transition={variantChange}
                    >
                      {view.icon}
                    </IconBox>
                    <Text
                      color={activeRoute(view.layout + view.path) === "active" ? activeColor : inactiveColor}
                      my="auto"
                      fontSize="sm"
                    >
                      {view.name}
                    </Text>
                  </Flex>
                </Button>
              </NavLink>
            ))}
          </Box>
        );
      }

      if (prop.name === "Liste") {
        return (
          <Box key={key}>
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg={openSubmenu === prop.name ? activeBg : "transparent"}
              mb={{
                xl: "6px",
              }}
              mx={{
                xl: "auto",
              }}
              py="12px"
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              pe="16px" // Add right padding
              borderRadius="15px"
              _hover={{
                bg: activeBg,
              }}
              w="100%"
              _active={{
                bg: activeBg,
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: sidebarActiveShadow,
              }}
              onClick={() => setOpenSubmenu(openSubmenu === prop.name ? null : prop.name)}
            >
              <Flex justifyContent="space-between" alignItems="center" width="100%">
                <Flex alignItems="center">
                  <IconBox
                    bg={openSubmenu === prop.name ? "blue.500" : inactiveBg}
                    color={openSubmenu === prop.name ? "white" : "blue.500"}
                    h="30px"
                    w="30px"
                    me="12px"
                    transition={variantChange}
                  >
                    {prop.icon}
                  </IconBox>
                  <Text
                    color={openSubmenu === prop.name ? activeColor : inactiveColor}
                    my="auto"
                    fontSize="sm"
                    fontWeight={openSubmenu === prop.name ? "bold" : "normal"}
                  >
                    {prop.name}
                  </Text>
                </Flex>
                <Icon
                  as={openSubmenu === prop.name ? ChevronUpIcon : ChevronDownIcon}
                  color={openSubmenu === prop.name ? activeColor : inactiveColor}
                  transition={variantChange}
                />
              </Flex>
            </Button>
            <Collapse in={openSubmenu === prop.name} animateOpacity>
              <Stack
                pl={10}
                mt={2}
                spacing={2}
                transition={variantChange}
              >
                {prop.views.map((view, viewKey) => (
                  <NavLink to={view.layout + view.path} key={viewKey}>
                    <Text
                      color={activeRoute(view.layout + view.path) === "active" ? activeColor : inactiveColor}
                      fontSize="sm"
                      fontWeight={activeRoute(view.layout + view.path) === "active" ? "bold" : "normal"}
                      _hover={{
                        color: activeColor,
                        transition: variantChange,
                      }}
                    >
                      {view.name}
                    </Text>
                  </NavLink>
                ))}
              </Stack>
            </Collapse>
          </Box>
        );
      }

      return (
        <NavLink to={prop.layout + prop.path} key={key}>
          <Button
            boxSize="initial"
            justifyContent="flex-start"
            alignItems="center"
            bg={activeRoute(prop.layout + prop.path) === "active" ? activeBg : "transparent"}
            mb={{
              xl: "6px",
            }}
            mx={{
              xl: "auto",
            }}
            py="12px"
            ps={{
              sm: "10px",
              xl: "16px",
            }}
            borderRadius="15px"
            _hover={{
              bg: activeBg,
            }}
            w="100%"
            _active={{
              bg: activeBg,
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: activeRoute(prop.layout + prop.path) === "active" ? sidebarActiveShadow : "none",
            }}
          >
            <Flex>
              {typeof prop.icon === "string" ? (
                <Icon>{prop.icon}</Icon>
              ) : (
                <IconBox
                  bg={activeRoute(prop.layout + prop.path) === "active" ? "blue.500" : inactiveBg}
                  color={activeRoute(prop.layout + prop.path) === "active" ? "white" : "blue.500"}
                  h="30px"
                  w="30px"
                  me="12px"
                  transition={variantChange}
                >
                  {prop.icon}
                </IconBox>
              )}
              <Text
                color={activeRoute(prop.layout + prop.path) === "active" ? activeColor : inactiveColor}
                my="auto"
                fontSize="sm"
                fontWeight={activeRoute(prop.layout + prop.path) === "active" ? "bold" : "normal"}
              >
                {document.documentElement.dir === "rtl" ? prop.rtlName : prop.name}
              </Text>
            </Flex>
          </Button>
        </NavLink>
      );
    });
  };

  const brand = (
    <Box pt={"25px"} mb="12px">
      {logo}
      <HSeparator my="26px" />
    </Box>
  );

  return (
    <>
      <Flex
        display={{ base: "flex", xl: "none" }}
        position="fixed"
        top="10px"
        left="10px"
        zIndex="999"
      >
        <Button
          variant="no-hover"
          onClick={onOpen}
          bg={hamburgerColor}
          borderRadius="15px"
        >
          <HamburgerIcon color={activeColor} w="20px" h="20px" />
        </Button>
      </Flex>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody
            p="20px"
            bg={useColorModeValue("white", "navy.800")}
            minH="100vh"
          >
            <Box>
              {brand}
              <Stack direction="column" mb="40px">
                <Box>{createLinks(routes)}</Box>
                <Button
      onClick={handleLogout} // Associe la fonction de déconnexion ici
      boxSize="initial"
      justifyContent="flex-start"
      alignItems="center"
      bg="transparent"
      mb={{
        xl: "6px",
      }}
      mx={{
        xl: "auto",
      }}
      py="12px"
      ps={{
        sm: "10px",
        xl: "16px",
      }}
      borderRadius="15px"
      _hover={{
        bg: "transparent",
      }}
      w="100%"
      _active={{
        bg: "inherit",
        transform: "none",
        borderColor: "transparent",
      }}
      _focus={{
        boxShadow: "none",
      }}
    >
      <Flex>
        <IconBox
          bg="#F81037"
          color="white"
          h="30px"
          w="30px"
          me="12px"
          transition={variantChange}
        >
          <LogoutIcon w="20px" h="20px" color="white" />
        </IconBox>
        <Text color="#F81037" my="auto" fontSize="sm">
          Déconnexion
        </Text>
      </Flex>
    </Button>
              </Stack>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Sidebar;