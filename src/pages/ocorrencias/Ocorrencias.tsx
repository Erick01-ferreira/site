// pages/OccurrencesPage.tsx
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { OccurrenceModal } from 'ocorrencias';

type Occurrencedata = {
  id: string;
  title: string;
  description: string;
  date: string;
};

const OccurrencesPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);
  const [filterStart, setFilterStart] = useState('');
  const [filterEnd, setFilterEnd] = useState('');

  const addOccurrence = (occurrence: Occurrence) => {
    setOccurrences((prev) => [...prev, occurrence]);
  };

  const filteredOccurrences = occurrences.filter((occ) => {
    const occDate = new Date(occ.date);
    const start = filterStart ? new Date(filterStart) : null;
    const end = filterEnd ? new Date(filterEnd) : null;

    return (
      (!start || occDate >= start) &&
      (!end || occDate <= end)
    );
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
      <Flex gap={4} mb={6} direction={['column', 'row']}>
        <Box>
          <Text fontSize="sm" mb={1}>Data Início</Text>
          <Input type="date" value={filterStart} onChange={(e) => setFilterStart(e.target.value)} />
        </Box>
        <Box>
          <Text fontSize="sm" mb={1}>Data Fim</Text>
          <Input type="date" value={filterEnd} onChange={(e) => setFilterEnd(e.target.value)} />
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


// components/OccurrenceModal.tsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';

type Occurrence = {
  id: string;
  title: string;
  description: string;
  date: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAddOccurrence: (occurrence: Occurrence) => void;
};

export const Occurrencemodal: React.FC<Props> = ({ isOpen, onClose, onAddOccurrence }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = () => {
    if (!title || !description || !date) return;

    const id = `OCC-${Date.now()}`;
    onAddOccurrence({ id, title, description, date });
    setTitle('');
    setDescription('');
    setDate('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Nova Ocorrência</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Título</FormLabel>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Descrição</FormLabel>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Data</FormLabel>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} mr={3}>
            Cancelar
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Registrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
