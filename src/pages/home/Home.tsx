import { useEffect, useState } from "react";
import { Box, Button, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

// Mude para exportação nomeada ou remova o segundo export default
function Home() {
  const { user, logout } = useAuth();
  const [ocorrencias, setOcorrencias] = useState<number>(0);
  const [relatorios, setRelatorios] = useState<number>(0);
  const [usuarios, setUsuarios] = useState<number>(0);

  useEffect(() => {
    api.get<any[]>("/ocorrencias").then(res => setOcorrencias(res.data.length)).catch(() => {});
    api.get<any[]>("/relatorios").then(res => setRelatorios(res.data.length)).catch(() => {});
    
    if (user?.role === "ADMIN") {
      api.get<any[]>("/usuarios").then(res => setUsuarios(res.data.length)).catch(() => {});
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

// APENAS UM export default no arquivo
export default Home;