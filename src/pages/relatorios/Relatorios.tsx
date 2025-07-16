import { Box, Heading, Text } from '@chakra-ui/react';

export default function Relatorios() {
  return (
    <Box p={8}>
      <Heading>Relatorios</Heading>
      <Text>Lista de relatorios aqui...</Text>
    </Box>
  
}
);


import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Grid,
  GridItem,
  VStack,
} from '@chakra-ui/react';

const ReportsPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filterData, setFilterData] = useState({
    dateFrom: '',
    dateTo: '',
    type: '',
  });
  const toast = useToast();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilterData({
      ...filterData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmitReport = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: 'Ocorrência registrada!',
      description: 'Sua ocorrência foi registrada com sucesso.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <Box bg="gray.100" minH="100vh" p={4}>
      <Box maxW="7xl" mx="auto" px={[4, 6, 8]} py={8}>
        {/* Header */}
        <Flex direction={['column', 'row']} justify="space-between" mb={8} align="center">
          <Box>
            <Heading size="lg" color="gray.900">
              Registros de Ocorrências
            </Heading>
            <Text mt={2} fontSize="sm" color="gray.600">
              Histórico completo de todas as ocorrências registradas
            </Text>
          </Box>
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

        {/* Filtros */}
        <Box bg="white" p={4} rounded="lg" shadow="sm" mb={8}>
          <Grid templateColumns="repeat(1, 1fr)" gap={4} md={{ templateColumns: 'repeat(4, 1fr)' }}>
            <GridItem>
              <FormControl>
                <FormLabel htmlFor="dateFrom" fontSize="sm">Data Início</FormLabel>
                <Input
                  type="date"
                  id="dateFrom"
                  value={filterData.dateFrom}
                  onChange={handleFilterChange}
                  borderColor="red.500"
                />
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl>
                <FormLabel htmlFor="dateTo" fontSize="sm">Data Fim</FormLabel>
                <Input
                  type="date"
                  id="dateTo"
                  value={filterData.dateTo}
                  onChange={handleFilterChange}
                  borderColor="red.500"
                />
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl>
                <FormLabel htmlFor="type" fontSize="sm">Tipo</FormLabel>
                <Select
                  id="type"
                  value={filterData.type}
                  onChange={handleFilterChange}
                  focusBorderColor="red.500"
                >
                  <option value="">Todos</option>
                  <option value="fire">Incêndio</option>
                  <option value="rescue">Resgate</option>
                  <option value="drill">Simulado</option>
                  <option value="inspection">Vistoria</option>
                </Select>
              </FormControl>
            </GridItem>

            <GridItem display="flex" alignItems="end">
              <Button
                bgGradient="linear(to-r, red.500, red.600)"
                color="white"
                px={4}
                py={2}
                rounded="md"
                _hover={{ bg: 'red.700' }}
                onClick={() => toast({
                  title: 'Filtros aplicados',
                  description: 'Filtros de data e tipo aplicados com sucesso.',
                  status: 'info',
                  duration: 3000,
                  isClosable: true,
                })}
              >
                Filtrar
              </Button>
            </GridItem>
          </Grid>
        </Box>

        {/* Lista de Relatórios */}
        <Box id="reports-list">
          {/* Aqui serão exibidos os relatórios filtrados */}
        </Box>
      </Box>

      {/* Modal de Novo Relatório */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registro de Ocorrência</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmitReport}>
              <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                  <FormLabel htmlFor="location">Local/Setor</FormLabel>
                  <Input id="location" placeholder="Ex: Pronto Socorro, Enfermaria 3" required />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="datetime">Data/Hora</FormLabel>
                  <Input type="datetime-local" id="datetime" required />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="type">Tipo de Ocorrência</FormLabel>
                  <Select id="type" required>
                    <option value="">Selecione</option>
                    <option value="emergency">Emergência</option>
                    <option value="consultation">Consulta</option>
                    <option value="surgery">Cirurgia</option>
                    <option value="examination">Exame</option>
                    <option value="procedure">Procedimento</option>
                    <option value="medication">Medicação</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="severity">Gravidade</FormLabel>
                  <Select id="severity" required>
                    <option value="">Selecione</option>
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                    <option value="critical">Crítica</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="description">Descrição</FormLabel>
                  <Textarea id="description" placeholder="Descreva detalhadamente a ocorrência..." required />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="actions">Ações Tomadas</FormLabel>
                  <Textarea id="actions" placeholder="Descreva as ações realizadas..." required />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="team">Equipe Envolvida</FormLabel>
                  <Input id="team" placeholder="Nomes dos brigadistas envolvidos" />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="equipment">Equipamentos Utilizados</FormLabel>
                  <Input id="equipment" placeholder="Ex: Extintor ABC, mangueira..." />
                </FormControl>
              </VStack>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              bgGradient="linear(to-r, red.500, red.600)"
              color="white"
              type="submit"
              onClick={handleSubmitReport}
              _hover={{ bg: 'red.700' }}
            >
              Registrar Ocorrência
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ReportsPage;


