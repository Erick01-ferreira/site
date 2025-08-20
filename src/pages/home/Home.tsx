<<<<<<< HEAD
import { useEffect, useState } from "react";
import { Box, Button, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

// Interfaces para as respostas da API
interface Ocorrencia {
  id: string;
  // adicione outros campos conforme sua API
}

interface Relatorio {
  id: string;
  // adicione outros campos conforme sua API
}

interface Usuario {
  id: string;
  // adicione outros campos conforme sua API
}

export default function Home() {
  const { user, logout } = useAuth();
  const [ocorrencias, setOcorrencias] = useState<number>(0);
  const [relatorios, setRelatorios] = useState<number>(0);
  const [usuarios, setUsuarios] = useState<number>(0);

  useEffect(() => {
    // Com tipagem explícita
    api.get<Ocorrencia[]>("/ocorrencias").then(res => setOcorrencias(res.data.length)).catch(() => {});
    api.get<Relatorio[]>("/relatorios").then(res => setRelatorios(res.data.length)).catch(() => {});
    
    if (user?.role === "ADMIN") {
      api.get<Usuario[]>("/usuarios").then(res => setUsuarios(res.data.length)).catch(() => {});
    }
  }, [user]);

  return (
    <Box p={6}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Dashboard</Heading>
        <Button colorScheme="red" onClick={logout}>Logout</Button>
      </Flex>
      <Grid templateColumns={["1fr", "repeat(3, 1fr)"]} gap={6}>
        <GridItem bg="blue.500" color="white" p={6} rounded="xl" shadow="md">
          <Heading size="md">Ocorrências</Heading>
          <Text fontSize="2xl" fontWeight="bold">{ocorrencias}</Text>
        </GridItem>
        <GridItem bg="green.500" color="white" p={6} rounded="xl" shadow="md">
          <Heading size="md">Relatórios</Heading>
          <Text fontSize="2xl" fontWeight="bold">{relatorios}</Text>
        </GridItem>
        {user?.role === "ADMIN" && (
          <GridItem bg="purple.500" color="white" p={6} rounded="xl" shadow="md">
            <Heading size="md">Usuários</Heading>
            <Text fontSize="2xl" fontWeight="bold">{usuarios}</Text>
          </GridItem>
        )}
      </Grid>
    </Box>
  );
}
=======
import { Box, Heading, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <Box p={8}>
      <Heading>Home</Heading>
      <Button mt={4} colorScheme="blue" onClick={() => navigate("/relatorios")}>
        Ver Relatorios
      </Button>
    </Box>
  );
}

<Button
  id="filter-btn"
  w="full"
  bgGradient="linear(to-r, teal.500, teal.600)"
  color="white"
  px={4}
  py={2}
  rounded="md"
  _hover={{ bgGradient: "linear(to-r, teal.600, teal.700)" }}
>
  Filtrar
</Button>;

import React from "react";
import { useDisclosure } from "@chakra-ui/react";

const ReportsPage: React.FC = () => {
  const { onOpen } = useDisclosure();

  return (
    <Box bg="gray.100" minH="100vh" p={4}>
      <Box maxW="7xl" mx="auto" px={[4, 6, 8]} py={8}>
        {/* Header */}
        <Flex
          direction={["column", "row"]}
          justify="space-between"
          mb={8}
          align="center"
        >
          <Box>
            <Heading size="lg" color="gray.900">
              Registros de Ocorrências
            </Heading>
            <>Histórico completo de todas as ocorrências registradas</>
          </Box>

          {/* Botão de Nova Ocorrência */}
          <Button
            mt={[4, 0]}
            bgGradient="linear(to-r, red.500, red.600)"
            color="white"
            px={4}
            py={2}
            rounded="md"
            _hover={{ bg: "red.700" }}
            onClick={onOpen}
          >
            Nova Ocorrência
          </Button>
        </Flex>

        {/* Conteúdo aqui */}
        {/* A nova ocorrência será registrada quando o modal for aberto */}
      </Box>
    </Box>
  );
};

export default ReportsPage;
>>>>>>> 65822de8bba77526f9253822cefe2538951bda22
