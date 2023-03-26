import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { CLOSE, LOGOUT, TITLE } from "../strings";

export function Layout({
  children,
  userName,
  onLogout,
  userAvatar,
  routes,
}: any) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Flex direction="column" minHeight="100vh">
      <Header
        onMenuClick={onToggle}
        userName={userName}
        userAvatar={userAvatar}
      />

      <Menu onLogout={onLogout} routes={routes} />
      <Box as="main" flex="1" p="4">
        {children}
      </Box>
      <Footer />
      <MobileMenu
        isOpen={isOpen}
        onMenuClose={onToggle}
        onLogout={onLogout}
        routes={routes}
      />
    </Flex>
  );
}

function Menu({ onLogout, routes }: any) {
  return (
    <HStack
      display={{ base: "none", md: "flex" }}
      justify="center"
      bg="gray.200"
    >
      {routes.map((route:any) => (
        <Box
          key={route.label}
          as="button"
          h={10}
          p={2.5}
          m={0}
          bg="gray.200"
          onClick={route.onClick}
        >
          {route.label}
        </Box>
      ))}
    </HStack>
  );
}

function Header({ onMenuClick, userName, userAvatar }: any) {
  return (
    <Flex
      as="header"
      bg="purple.900"
      color="white"
      h="60px"
      px="4"
      align="center"
      justify="space-between"
    >
      <Text fontSize="2xl">{TITLE}</Text>
      <Flex align="center">
        <Avatar size="sm" name="User Name" src={userAvatar} mr="2" />
        <Text fontSize="sm" mr="2">
          {userName}
        </Text>
        <IconButton
          icon={<HamburgerIcon />}
          aria-label="Menu"
          variant="ghost"
          display={{ base: "block", md: "none" }}
          onClick={onMenuClick}
        />
      </Flex>
    </Flex>
  );
}

function Footer() {
  return (
    <Flex
      as="footer"
      bg="purple.900"
      color="white"
      h="40px"
      align="center"
      justify="center"
    >
      2023 My Page
    </Flex>
  );
}

function MobileMenu({ isOpen, onMenuClose, onLogout, routes }: any) {
  return (
    <Box
      bg="purple.900"
      color="white"
      position="absolute"
      top="60px"
      left="0"
      right="0"
      bottom="0"
      display={{ base: isOpen ? "block" : "none" }}
      zIndex="docked"
      px="4"
      py="8"
    >
      <Stack spacing="4">
        {routes.map((route: any) => (
          <div key={route.label}>
            <Button variant="outline" onClick={route.onClick}>
              {route.label}
            </Button>
          </div>
        ))}
        <Button variant="outline" onClick={onMenuClose}>
          {CLOSE}
        </Button>
        <Button variant="ghost" onClick={onLogout}>
          {LOGOUT}
        </Button>
      </Stack>{" "}
    </Box>
  );
}
