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
