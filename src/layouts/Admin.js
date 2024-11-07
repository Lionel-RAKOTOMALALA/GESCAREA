// Chakra imports
import {
  Portal,
  useDisclosure,
  Stack,
  Box,
  useColorMode,
} from "@chakra-ui/react";
import Configurator from "components/Configurator/Configurator";
import Footer from "components/Footer/Footer.js";
import { AuthorizeUser } from "middleware/auth";
import {
  ArgonLogoDark,
  ArgonLogoLight,
  ChakraLogoDark,
  ChakraLogoLight,
} from "components/Icons/Icons";
// Layout components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import React, { useState } from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import dashRoutes from "routes.js";
// Custom Chakra theme
import FixedPlugin from "../components/FixedPlugin/FixedPlugin";
// Custom components
import MainPanel from "../components/Layout/MainPanel";
import PanelContainer from "../components/Layout/PanelContainer";
import PanelContent from "../components/Layout/PanelContent";
import bgAdmin from "assets/img/admin-background.png";
import Dashboard from "../views/Dashboard/Dashboard";
import Assistance from "../views/Dashboard/Assistance"
import Tables from "views/Dashboard/Tables";
import Profile from "views/Dashboard/Profile";
import Billing from "views/Dashboard/Billing";
export default function Dashboarda(props) {
  const { ...rest } = props;
  // states and functions
  const [fixed, setFixed] = useState(false);
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation(); // Use location hook to get pathname

  // functions for changing the states from components
  const getRoute = () => {
    return location.pathname !== "/admin/full-screen-maps";
  };

  const getActiveRoute = (routes) => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].views);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else if (location.pathname.includes(routes[i].layout + routes[i].path)) {
        return routes[i].name;
      }
    }
    return activeRoute;
  };

  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].views);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else if (location.pathname.includes(routes[i].layout + routes[i].path)) {
        if (routes[i].secondaryNavbar) {
          return routes[i].secondaryNavbar;
        }
      }
    }
    return activeNavbar;
  };

  const getRoutes = (routes) => {
    
    return routes.map((route, key) => {
    console.log(route.component);
      if (route.layout === "/admin" && route.component) { 
        return route.views ? (
          <Route path={route.layout + route.path}>
            {getRoutes(route.views)}
          </Route>
        ) : (
          <Route
            path={route.layout + route.path}
            element={route.component}
            key={key}
          />
        );
      }
      return null;
    }).filter(Boolean);
  };
  


  document.documentElement.dir = "ltr";

  return (
    <Box>
      <Box
        minH="40vh"
        w="100%"
        position="absolute"
        bgImage={colorMode === "light" ? bgAdmin : "none"}
        bg={colorMode === "light" ? bgAdmin : "navy.900"}
        bgSize="cover"
        top="0"
      />
      <Sidebar
        routes={dashRoutes}
        logo={
          <Stack direction="row" spacing="12px" align="center" justify="center">
            {colorMode === "dark" ? (
              <ArgonLogoLight w="74px" h="27px" />
            ) : (
              <ArgonLogoDark w="74px" h="27px" />
            )}
            <Box
              w="1px"
              h="20px"
              bg={colorMode === "dark" ? "white" : "gray.700"}
            />
            {colorMode === "dark" ? (
              <ChakraLogoLight w="82px" h="21px" />
            ) : (
              <ChakraLogoDark w="82px" h="21px" />
            )}
          </Stack>
        }
        display="none"
        {...rest}
      />
      <MainPanel
        w={{
          base: "100%",
          xl: "calc(100% - 275px)",
        }}
      >
        <Portal>
          <AdminNavbar
            onOpen={onOpen}
            brandText={getActiveRoute(dashRoutes)}
            secondary={getActiveNavbar(dashRoutes)}
            fixed={fixed}
            {...rest}
          />
        </Portal>
        {getRoute() ? (
          <PanelContent>
            <PanelContainer>
              <Routes>
              <Route path="/tables" element={<Tables/>}/>
              <Route path="/historiqueCarriere" element={<Tables/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/billing" element={<Billing/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/assistance" element={<Assistance/>}/>
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              </Routes>
            </PanelContainer>
          </PanelContent>
        ) : null}
        <Footer />
        <Portal>
          <FixedPlugin
            secondary={getActiveNavbar(dashRoutes)}
            fixed={fixed}
            onOpen={onOpen}
          />
        </Portal>
        <Configurator
          secondary={getActiveNavbar(dashRoutes)}
          isOpen={isOpen}
          onClose={onClose}
          isChecked={fixed}
          onSwitch={(value) => {
            setFixed(value);
          }}
        />
      </MainPanel>
    </Box>
  );
}
