import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { extendTheme } from '@chakra-ui/react'
import { ChakraProvider } from "@chakra-ui/react";

import '@fontsource/merriweather/400.css'

const theme = extendTheme({
  fonts: {
    heading: `'Merriweather', serif`,
    body: `'Merriweather', serif`,
  },
})


export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </UserProvider>
  );
}
