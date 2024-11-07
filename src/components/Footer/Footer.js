/*eslint-disable*/
import { Flex, Link, List, ListItem, Text } from "@chakra-ui/react";
import React from "react";

export default function Footer(props) {
  return (
    <Flex
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent='space-between'
      px='30px'
      pb='20px'>
      <Text
        color='gray.400'
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", xl: "0px" }}>
        &copy; {1900 + new Date().getYear()},{" "}
        <Text as='span'>
          Fait avec ❤️ par{" "}
        </Text>
        <Link
          color='blue.400'
          href='https://www.facebook.com/profile.php?id=61559973564566'
          target='_blank'>
          Rakotomalala Tolotriniaina Lionel
        </Link>
        &nbsp;|&nbsp;
        <Link
          color='blue.400'
          href='https://github.com/Lionel-RAKOTOMALALA'
          target='_blank'>
          GitHub
        </Link>
        {" "}pour une meilleure gestion des carrières
      </Text>
      <List display='flex'>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}>
          <Link color='gray.400' href='https://www.facebook.com/profile.php?id=61559973564566'>
            Facebook
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}>
          <Link color='gray.400' href='https://github.com/Lionel-RAKOTOMALALA'>
            GitHub
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}
