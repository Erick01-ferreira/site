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
  useToast,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

type OccurrenceData = {
  id: string;
  title: string;
  description: string;
  date: string;
};

export const OccurrencesPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [occurrences, setOccurrences] = useState<OccurrenceData[]>([]);
  const [filterStart, setFilterStart] = useState("");
  const [filterEnd, setFilterEnd] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate loading data from an API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Mock data - in a real app, you would fetch from an API
        const mockData: OccurrenceData[] = [
          {
            id: "1",
            title: "Manutenção Preventiva",
            description: "Realizada manutenção nos equipamentos",
            date: "2023-05-15",
          },
          {
            id: "2",
            title: "Incidente de Segurança",
            description: "Falha no sistema de monitoramento",
            date: "2023-06-20",
          },
        ];
        setOccurrences(mockData);
      } catch (err) {
        setError("Falha ao carregar ocorrências. Tente novamente mais tarde.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const addOccurrence = (occurrence: OccurrenceData) => {
    setOccurrences((prev) => [occurrence, ...prev]);
    onClose();
    toast({
      title: "Ocorrência adicionada",
      description: "A nova ocorrência foi registrada com sucesso.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const filteredOccurrences = occurrences.filter((occ) => {
    const occDate = new Date(occ.date);
    const start = filterStart ? new Date(filterStart) : null;
    const end = filterEnd ? new Date(filterEnd) : null;
    
    // Reset time part to compare dates only
    if (start) start.setHours(0, 0, 0, 0);
    if (end) end.setHours(23, 59, 59, 999);
    
    return (!start || occDate >= start) && (!end || occDate <= end);
  });

  const clearFilters = () => {
    setFilterStart("");
    setFilterEnd("");
  };

  if (error) {
    return (
      <Box p={8}>
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
        <Button onClick={() => window.location.reload()}>Recarregar</Button>
      </Box>
    );
  }

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
      <Flex gap={4} mb={6} direction={["column", "row"]} align="flex-end">
        <Box flex={1}>
          <Text fontSize="sm" mb={1}>
            Data Início
          </Text>
          <Input
            type="date"
            value={filterStart}
            onChange={(e) => setFilterStart(e.target.value)}
            max={filterEnd || undefined}
          />
        </Box>
        <Box flex={1}>
          <Text fontSize="sm" mb={1}>
            Data Fim
          </Text>
          <Input
            type="date"
            value={filterEnd}
            onChange={(e) => setFilterEnd(e.target.value)}
            min={filterStart || undefined}
          />
        </Box>
        <Button
          variant="outline"
          onClick={clearFilters}
          isDisabled={!filterStart && !filterEnd}
        >
          Limpar Filtros
        </Button>
      </Flex>

      {/* Lista */}
      <Box bg="white" p={6} borderRadius="md" shadow="sm">
        {isLoading ? (
          <Flex justify="center">
            <Spinner size="xl" />
          </Flex>
        ) : filteredOccurrences.length === 0 ? (
          <Alert status="info">
            <AlertIcon />
            {filterStart || filterEnd 
              ? "Nenhuma ocorrência encontrada com os filtros aplicados."
              : "Nenhuma ocorrência registrada."}
          </Alert>
        ) : (
          <Box overflowX="auto">
            <Table variant="striped" colorScheme="gray">
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
                    <Td fontWeight="medium">{occ.title}</Td>
                    <Td whiteSpace="nowrap">
                      {new Date(occ.date).toLocaleDateString("pt-BR")}
                    </Td>
                    <Td>
                      <Text noOfLines={1} title={occ.description}>
                        {occ.description}
                      </Text>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
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
