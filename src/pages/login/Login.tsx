<<<<<<< HEAD
import { Box, Flex, Heading, Text, Input, Button, VStack, FormControl, FormLabel } from "@chakra-ui/react";
import { useState } from 'react';
import { login } from '@/services/auth';

export default function Login() {
  const [loginField, setLoginField] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login({ login: loginField, password });
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message || 'Falha no login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box as="form" onSubmit={handleSubmit} bg="white" p={8} rounded="lg" shadow="md" minW="sm">
        <VStack spacing={4} align="stretch">
          <Heading size="md" textAlign="center">Entrar</Heading>
          <FormControl>
            <FormLabel>Login</FormLabel>
            <Input value={loginField} onChange={(e)=>setLoginField(e.target.value)} placeholder="seu usuário" />
          </FormControl>
          <FormControl>
            <FormLabel>Senha</FormLabel>
            <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••" />
          </FormControl>
          {error && <Text color="red.500" fontSize="sm">{error}</Text>}
          <Button type="submit" isLoading={loading} colorScheme="red">Entrar</Button>
        </VStack>
      </Box>
=======
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Button,
  Image,
  VStack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
//import { useToast } from "@chakra-ui/toast";

export default function Login() {
  /*const toast = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: 'Login simulado',
      description: 'Usuário: teste1 | Senha: teste123',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };*/

  return (
    <Flex direction="column" minH="100vh" bg="gray.50" fontFamily="sans-serif">
      <Flex flex="1" align="center" justify="center" p={4}>
        <Box
          w="full"
          maxW="md"
          bg="white"
          rounded="lg"
          shadow="lg"
          overflow="hidden"
        >
          {/* Cabeçalho com Gradiente */}
          <Box
            bgGradient="linear(to-r, red.500, red.600)"
            py={6}
            px={8}
            textAlign="center"
            color="white"
          >
            <Image
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/be776e42-10a5-4e29-aa8a-d934c30dfded.png"
              alt="Ícone de capacete de bombeiro com cruz vermelha"
              mx="auto"
              h="20"
              w="20"
              borderRadius="full"
              border="4px solid white"
            />
            <Heading mt={4} fontSize="2xl" fontWeight="bold">
              Sistema Médico
            </Heading>
            <Text mt={2} color="blue.100">
              Registro de ocorrências médicas
            </Text>
          </Box>

          {/* Formulário */}
          <Box as="form" px={8} py={6}>
            <VStack>
              <FormControl id="username" isRequired>
                <FormLabel>Usuário</FormLabel>
                <Input
                  type="text"
                  placeholder="Informe seu usuário"
                  borderColor="blue.500"
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Senha</FormLabel>
                <Input
                  type="password"
                  placeholder="Informe sua senha"
                  borderColor="blue.500"
                />
              </FormControl>

              <Button
                type="submit"
                w="full"
                bgGradient="linear(to-r, red.500, red.600)"
                color="white"
                fontWeight="bold"
                py={2}
                _hover={{ bg: "red.700" }}
                _focus={{ ring: 2, ringColor: "red.500" }}
              >
                Acessar Sistema
              </Button>
            </VStack>
          </Box>

          {/* Rodapé */}
          <Box
            px={8}
            py={4}
            bg="gray.50"
            borderTop="1px solid"
            borderColor="gray.200"
            textAlign="center"
          >
            <Text fontSize="sm" color="gray.600">
              Use: <b></b> / <b></b>
            </Text>
          </Box>
        </Box>
      </Flex>
>>>>>>> 65822de8bba77526f9253822cefe2538951bda22
    </Flex>
  );
}
