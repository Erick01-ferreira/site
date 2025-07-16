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
  onAddOccurrence: (occurrence: Occurrence) => void;
};

export const OccurrenceModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onAddOccurrence,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = () => {
    if (!title || !description || !date) return;

    const id = `OCC-${Date.now()}`;
    onAddOccurrence({ id, title, description, date });
    setTitle("");
    setDescription("");
    setDate("");
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
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Data</FormLabel>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
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
