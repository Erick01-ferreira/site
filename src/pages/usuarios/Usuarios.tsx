import React, { useState } from 'react';
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
  VStack,
} from '@chakra-ui/react';

type UserFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: { name: string; email: string }) => void;
};

export const UserFormModal: React.FC<UserFormModalProps> = ({
  isOpen,
  onClose,
  onAddUser,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (!name || !email) return;
    onAddUser({ name, email });
    setName('');
    setEmail('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Novo Usuário</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Nome</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isDisabled={!name || !email}
          >
            Adicionar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};


import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { UserFormModal } from '../components/UserFormModal';

type User = {
  id: number;
  name: string;
  email: string;
};

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const addUser = (user: Omit<User, 'id'>) => {
    const newUser: User = {
      id: Date.now(),
      ...user,
    };
    setUsers((prev) => [...prev, newUser]);
    toast({
      title: 'Usuário adicionado',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const deleteUser = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    toast({
      title: 'Usuário removido',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box bg="gray.50" minH="100vh" p={8}>
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading size="lg">Usuários</Heading>
          <Text color="gray.600" fontSize="sm">
            Gerencie os usuários cadastrados
          </Text>
        </Box>
        <Button colorScheme="blue" onClick={onOpen}>
          Novo Usuário
        </Button>
      </Flex>

      <Box bg="white" p={6} rounded="md" shadow="sm">
        {users.length === 0 ? (
          <Text color="gray.500">Nenhum usuário cadastrado.</Text>
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Email</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <IconButton
                      aria-label="Excluir"
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      size="sm"
                      onClick={() => deleteUser(user.id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>

      <UserFormModal isOpen={isOpen} onClose={onClose} onAddUser={addUser} />
    </Box>
  );
};

export default UsersPage;
