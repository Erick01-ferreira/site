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
  FormErrorMessage,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

// Tipos para a resposta da API
type AuthResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
};

type ErrorResponse = {
  message: string;
  errors?: Record<string, string[]>;
};

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });
  
  const toast = useToast();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {
      username: username.trim() === "",
      password: password.trim() === "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Chamada real para a API
      const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, {
        username,
        password,
      });

      // Armazena o token no localStorage
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userData", JSON.stringify(response.data.user));

      // Feedback de sucesso
      toast({
        title: "Login realizado",
        description: `Bem-vindo, ${response.data.user.name}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Redireciona para a dashboard
      navigate("/dashboard");
      
    } catch (error) {
      // Tratamento de erros
      let errorMessage = "Erro ao realizar login";
      
      if (axios.isAxiosError(error)) {
        const serverError = error.response?.data as ErrorResponse;
        errorMessage = serverError.message || "Credenciais inválidas";
        
        // Trata erros de validação do backend
        if (serverError.errors) {
          setErrors({
            username: !!serverError.errors.username,
            password: !!serverError.errors.password,
          });
        }
      }

      toast({
        title: "Erro",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Flex direction="column" minH="100vh" bg="gray.50">
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
            <Text mt={2} color="red.100">
              Registro de ocorrências médicas
            </Text>
          </Box>

          {/* Formulário */}
          <Box as="form" onSubmit={handleSubmit} px={8} py={6}>
            <VStack spacing={4}>
              <FormControl id="username" isRequired isInvalid={errors.username}>
                <FormLabel>Usuário</FormLabel>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Informe seu usuário"
                  borderColor="gray.300"
                  _hover={{ borderColor: "gray.400" }}
                  focusBorderColor="red.500"
                />
                {errors.username && (
                  <FormErrorMessage>Usuário é obrigatório</FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="password" isRequired isInvalid={errors.password}>
                <FormLabel>Senha</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Informe sua senha"
                    borderColor="gray.300"
                    _hover={{ borderColor: "gray.400" }}
                    focusBorderColor="red.500"
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                      icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </InputRightElement>
                </InputGroup>
                {errors.password && (
                  <FormErrorMessage>Senha é obrigatória</FormErrorMessage>
                )}
              </FormControl>

              <Button
                type="submit"
                w="full"
                bgGradient="linear(to-r, red.500, red.600)"
                color="white"
                fontWeight="bold"
                py={2}
                _hover={{ bgGradient: "linear(to-r, red.600, red.700)" }}
                _focus={{ ring: 2, ringColor: "red.500" }}
                isLoading={isSubmitting}
                loadingText="Autenticando..."
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
              Sistema de Registro Médico v1.0
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}