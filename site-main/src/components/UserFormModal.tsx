import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

type UserFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: { name: string; email: string }) => Promise<void> | void;
};

export const UserFormModal: React.FC<UserFormModalProps> = ({
  isOpen,
  onClose,
  onAddUser,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(value !== '' && !validateEmail(value));
  };

  const handleSubmit = async () => {
    if (!name || !email || emailError) return;
    
    setIsSubmitting(true);
    try {
      await onAddUser({ name, email });
      setName("");
      setEmail("");
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && name && email && !emailError) {
      handleSubmit();
    }
  };

  const isFormValid = name && email && !emailError;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent onKeyDown={handleKeyDown}>
        <ModalHeader>Novo Usuário</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Nome</FormLabel>
              <Input 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite o nome completo"
              />
            </FormControl>
            <FormControl isRequired isInvalid={emailError}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="exemplo@email.com"
              />
              {emailError && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  Por favor, insira um email válido
                </Text>
              )}
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose} isDisabled={isSubmitting}>
            Cancelar
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isDisabled={!isFormValid}
            isLoading={isSubmitting}
            loadingText="Adicionando..."
          >
            Adicionar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
