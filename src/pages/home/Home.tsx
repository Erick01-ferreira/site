import { Box, Heading, Button, Flex, Grid } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export  function Home() {
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
                  _hover={{ bgGradient: 'linear(to-r, teal.600, teal.700)' }}
                >
                  Filtrar
                </Button>

                import React from 'react';
                import { useDisclosure } from '@chakra-ui/react';



const ReportsPage: React.FC = () => {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="gray.100" minH="100vh" p={4}>
      <Box maxW="7xl" mx="auto" px={[4, 6, 8]} py={8}>
        {/* Header */}
        <Flex
          direction={['column', 'row']}
          justify="space-between"
          mb={8}
          align="center"
        >
          <Box>
            <Heading size="lg" color="gray.900">
              Registros de Ocorrências
            </Heading>
            <>
              Histórico completo de todas as ocorrências registradas
            </>
          </Box>

          {/* Botão de Nova Ocorrência */}
          <Button
            mt={[4, 0]}
            bgGradient="linear(to-r, red.500, red.600)"
            color="white"
            px={4}
            py={2}
            rounded="md"
            _hover={{ bg: 'red.700' }}
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