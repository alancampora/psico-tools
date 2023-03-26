import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { extendTheme } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Setup } from "../components";

import "@fontsource/merriweather/400.css";

const theme = extendTheme({
  fonts: {
    heading: `'Merriweather', serif`,
    body: `'Merriweather', serif`,
  },
});

export default function App({ Component, pageProps }:any) {
  return (
    <UserProvider loginUrl="/api/auth/login" profileUrl="/api/auth/me">
      <ChakraProvider theme={theme}>
        <Setup>

          <Component {...pageProps} />
        </Setup>
      </ChakraProvider>
    </UserProvider>
  );
}
