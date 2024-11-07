// importation
import React, { Component } from 'react';

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
  SettingsIcon
} from "components/Icons/Icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Tableau de bord",
    icon: <HomeIcon color='inherit' />,
    layout: "/admin"
  }, 
  {
    name: "Liste",
    icon: <HomeIcon color='inherit' />,
    layout: "/admin",
    category: "tableau",
    state: "tableauCollapse",
    views: [
      {
        path: "/tables",
        name: "Liste des employés",
        icon: <PersonIcon color='inherit' />,
        layout: "/admin",
      },
      {
        path: "/historiqueCarriere",
        name: "Historique des carrières",
        icon: <DocumentIcon color='inherit' />,
        layout: "/admin",
      },
      {
        path: "/service",
        name: "Service",
        icon: <SettingsIcon color='inherit' />,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/billing",
    name: "Facturation",
    icon: <CreditIcon color='inherit' />,
    layout: "/admin",
  },
  {
    path: "/assistance",
    name: "Assistance",
    icon: <SupportIcon color='inherit' />,
    layout: "/admin",
  },
  {
    name: "Mon Espace Personnel",  
    category: "user",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profil",
        icon: <PersonIcon color='inherit' />,
        secondaryNavbar: true,
        layout: "/admin",
      },
    ],
  },
];

export default dashRoutes;
