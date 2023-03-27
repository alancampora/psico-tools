import { Button, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import { FaSignInAlt } from "react-icons/fa";

const Hero = () => (
  <Flex
    backgroundImage="url('/hero.png')"
    backgroundSize="cover"
    backgroundPosition="center"
    height="100vh"
    alignItems="center"
    justifyContent="center"
  >
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      backgroundColor="rgba(0, 0, 0, 0.5)"
      borderRadius="md"
      padding="6"
      textAlign="center"
    >
      <Heading as="h1" size="2xl" color="white" marginTop="4">
        Psico-Tools
      </Heading>
      <Text fontSize="lg" color="white" marginTop="4">
        Desbloquea tu potencial con Psico-Tools - la plataforma definitiva para
        que los estudiantes aprovechen el poder de la tecnología y avancen en su
        carrera en psicología. Desde herramientas y recursos innovadores hasta
        orientación y apoyo experto, Psico-Tools permite a los estudiantes
        llevar sus habilidades al siguiente nivel. ¡Únete a nuestra comunidad
        hoy mismo y desbloquea un mundo de posibilidades!
      </Text>
      <Button
        leftIcon={<FaSignInAlt />}
        colorScheme="teal"
        size="lg"
        marginTop="8"
      >
        <Link href="/api/auth/login">Login</Link>
      </Button>
    </Flex>
  </Flex>
);

const IndexPage = () => (
  <>
    <Hero />
  </>
);

      //<Image src="/hero.png" alt="Psico-Tools Logo" width={200} height={200} />
export default IndexPage;
