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
  useToast
} from "@chakra-ui/react";
import { useState } from 'react';
import { login } from '@/services/auth';

export default function Login() {
  const [loginField, setLoginField] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await login({ login: loginField, password });
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message || 'Falha no login');
      toast({
        title: 'Erro de login',
        description: err.message || 'Credenciais inválidas',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

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
          <Box as="form" onSubmit={handleSubmit} px={8} py={6}>
            <VStack spacing={4}>
              <FormControl id="username" isRequired>
                <FormLabel>Usuário</FormLabel>
                <Input
                  type="text"
                  placeholder="Informe seu usuário"
                  borderColor="blue.500"
                  value={loginField}
                  onChange={(e) => setLoginField(e.target.value)}
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Senha</FormLabel>
                <Input
                  type="password"
                  placeholder="Informe sua senha"
                  borderColor="blue.500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>

              {error && (
                <Text color="red.500" fontSize="sm">
                  {error}
                </Text>
              )}

              <Button
                type="submit"
                w="full"
                bgGradient="linear(to-r, red.500, red.600)"
                color="white"
                fontWeight="bold"
                py={2}
                isLoading={loading}
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
              Use: <b>teste1</b> / <b>teste123</b>
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}