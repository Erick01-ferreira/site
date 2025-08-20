import { Box, Flex, Heading, Text, Input, Button, VStack, FormControl, FormLabel } from "@chakra-ui/react";
import { useState } from 'react';
import { login } from '@/services/auth';

export default function Login() {
  const [loginField, setLoginField] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login({ login: loginField, password });
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message || 'Falha no login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box as="form" onSubmit={handleSubmit} bg="white" p={8} rounded="lg" shadow="md" minW="sm">
        <VStack spacing={4} align="stretch">
          <Heading size="md" textAlign="center">Entrar</Heading>
          <FormControl>
            <FormLabel>Login</FormLabel>
            <Input value={loginField} onChange={(e)=>setLoginField(e.target.value)} placeholder="seu usuário" />
          </FormControl>
          <FormControl>
            <FormLabel>Senha</FormLabel>
            <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••" />
          </FormControl>
          {error && <Text color="red.500" fontSize="sm">{error}</Text>}
          <Button type="submit" isLoading={loading} colorScheme="red">Entrar</Button>
        </VStack>
      </Box>
    </Flex>
  );
}
