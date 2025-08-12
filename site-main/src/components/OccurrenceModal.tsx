import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

type Occurrence = {
  id: string;
  title: string;
  description: string;
  date: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAddOccurrence: (occurrence: Occurrence) => Promise<void> | void;
};

export const OccurrenceModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onAddOccurrence,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    date: false,
    futureDate: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const validateForm = () => {
    const newErrors = {
      title: !title.trim(),
      description: !description.trim(),
      date: !date,
      futureDate: isFutureDate(date)
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const isFutureDate = (dateString: string) => {
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate > today;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      const id = `OCC-${Date.now()}`;
      await onAddOccurrence({ id, title, description, date });
      
      toast({
        title: "Ocorrência registrada",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      
      setTitle("");
      setDescription("");
      setDate(new Date().toISOString().split('T')[0]);
      onClose();
    } catch (error) {
      toast({
        title: "Erro ao registrar",
        description: "Ocorreu um erro ao registrar a ocorrência",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSubmitting) {
      handleSubmit();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent onKeyDown={handleKeyDown}>
        <ModalHeader>Nova Ocorrência</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired isInvalid={errors.title}>
              <FormLabel>Título</FormLabel>
              <Input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Descreva brevemente a ocorrência"
              />
              {errors.title && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  Título é obrigatório
                </Text>
              )}
            </FormControl>

            <FormControl isRequired isInvalid={errors.description}>
              <FormLabel>Descrição</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva detalhadamente a ocorrência"
                minH="120px"
              />
              {errors.description && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  Descrição é obrigatória
                </Text>
              )}
            </FormControl>

            <FormControl isRequired isInvalid={errors.date || errors.futureDate}>
              <FormLabel>Data</FormLabel>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
              {errors.date && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  Data é obrigatória
                </Text>
              )}
              {errors.futureDate && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  Data não pode ser futura
                </Text>
              )}
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button 
            variant="ghost" 
            onClick={onClose} 
            mr={3}
            isDisabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button 
            colorScheme="blue" 
            onClick={handleSubmit}
            isLoading={isSubmitting}
            loadingText="Registrando..."
          >
            Registrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};