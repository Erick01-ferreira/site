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