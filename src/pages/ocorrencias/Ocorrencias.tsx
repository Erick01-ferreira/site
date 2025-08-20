<<<<<<< HEAD
import { useEffect, useState } from 'react';
import api from '@/services/api'; // ← Import correto (sem apiFetch)
import { Box, Heading, Table, Thead, Tr, Th, Tbody, Td, Text } from '@chakra-ui/react';

type Ocorrencia = {
  id: number;
  titulo?: string;
  descricao?: string;
  date?: string;
};

export default function Ocorrencias() {
  const [items, setItems] = useState<Ocorrencia[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get<Ocorrencia[]>('/ocorrencias')
      .then(response => setItems(response.data))
      .catch((e) => setError(e.message));
  }, []);

  return (
    <Box p={8}>
      <Heading size="lg" mb={4}>Ocorrências</Heading>
      {error && <Text color="red.500">{error}</Text>}
      <Table variant="simple">
        <Thead>
          <Tr><Th>ID</Th><Th>Título</Th><Th>Descrição</Th><Th>Data</Th></Tr>
        </Thead>
        <Tbody>
          {items.map((o) => (
            <Tr key={o.id}>
              <Td>{o.id}</Td>
              <Td>{o.titulo || '-'}</Td>
              <Td>{o.descricao || '-'}</Td>
              <Td>{o.date || '-'}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
=======
import { OccurrenceModal } from "@/components/OccurrenceModal";
import {
  Button,
  Input,
  useDisclosure,
  Box,
  Flex,
  Heading,
  Table,
  Text,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
} from "@chakra-ui/react";
import React, { useState } from "react";

type OccurrenceData = {
  id: string;
  title: string;
  description: string;
  date: string;
};

export const OccurrencesPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [occurrences, setOccurrences] = useState<OccurrenceData[]>([]);
  const [filterStart, setFilterStart] = useState("");
  const [filterEnd, setFilterEnd] = useState("");

  const addOccurrence = (occurrence: OccurrenceData) => {
    setOccurrences((prev) => [...prev, occurrence]);
  };

  const filteredOccurrences = occurrences.filter((occ) => {
    const occDate = new Date(occ.date);
    const start = filterStart ? new Date(filterStart) : null;
    const end = filterEnd ? new Date(filterEnd) : null;
    return (!start || occDate >= start) && (!end || occDate <= end);
  });

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading size="lg">Ocorrências</Heading>
          <Text color="gray.600" fontSize="sm">
            Registro e histórico de todas as ocorrências
          </Text>
        </Box>
        <Button colorScheme="blue" onClick={onOpen}>
          Nova Ocorrência
        </Button>
      </Flex>

      {/* Filtros */}
      <Flex gap={4} mb={6} direction={["column", "row"]}>
        <Box>
          <Text fontSize="sm" mb={1}>
            Data Início
          </Text>
          <Input
            type="date"
            value={filterStart}
            onChange={(e) => setFilterStart(e.target.value)}
          />
        </Box>
        <Box>
          <Text fontSize="sm" mb={1}>
            Data Fim
          </Text>
          <Input
            type="date"
            value={filterEnd}
            onChange={(e) => setFilterEnd(e.target.value)}
          />
        </Box>
      </Flex>

      {/* Lista */}
      <Box bg="white" p={6} borderRadius="md" shadow="sm">
        {filteredOccurrences.length === 0 ? (
          <Text color="gray.500">Nenhuma ocorrência registrada.</Text>
        ) : (
          <Table>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Título</Th>
                <Th>Data</Th>
                <Th>Descrição</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredOccurrences.map((occ) => (
                <Tr key={occ.id}>
                  <Td>{occ.id}</Td>
                  <Td>{occ.title}</Td>
                  <Td>{new Date(occ.date).toLocaleDateString()}</Td>
                  <Td>{occ.description}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>

      <OccurrenceModal
        isOpen={isOpen}
        onClose={onClose}
        onAddOccurrence={addOccurrence}
      />
    </Box>
  );
};
export default OccurrencesPage;
>>>>>>> 65822de8bba77526f9253822cefe2538951bda22
