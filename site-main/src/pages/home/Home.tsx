import { Box, Heading, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <Box p={8} minH="100vh" bg="gray.50">
      <Flex
        direction="column"
        align="center"
        justify="center"
        maxW="6xl"
        mx="auto"
        textAlign="center"
        py={12}
      >
        <VStack spacing={6}>
          <Heading size="2xl" mb={4} color="teal.600">
            Sistema de Gerenciamento de Ocorrências
          </Heading>
          
          <Text fontSize="xl" color="gray.600" maxW="2xl">
            Gerencie e acompanhe todas as ocorrências de forma eficiente e organizada
          </Text>
          
          <Illustration boxSize="sm" mt={8} mb={12} />
          
          <Flex gap={4} direction={["column", "row"]}>
            <Button
              size="lg"
              colorScheme="teal"
              onClick={() => navigate("/relatorios")}
              px={8}
              _hover={{ transform: "translateY(-2px)" }}
            >
              Ver Relatórios
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              colorScheme="teal"
              onClick={() => navigate("/sobre")}
              px={8}
            >
              Sobre o Sistema
            </Button>
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );
}