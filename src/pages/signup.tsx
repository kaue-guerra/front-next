import { Box, Divider, Flex, Heading, VStack, SimpleGrid, HStack, Button } from "@chakra-ui/react"
import { Input } from "../components/Form/Input"

export default function Signup() {
    return (
        <Box>
            <Flex w="100%" my="2" maxWidth={1480} mx="auto" px="6" >
                <Box flex="1" borderRadius={8} bg="gray.800" p="4">
                    <Heading size="lg" fontWeight="normal" >Criar Usuário</Heading>

                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing="6">
                        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
                            <Input name="name" label="Nome Completo" />
                            <Input name="email" type="email" label="E-mail" />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
                            <Input name="city" label="Cidade" />
                            <Input name="zipcode" label="Cep" />
                            <Input name="country" label="País" />
                            <Input name="state" label="Estado" />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
                            <Input name="street" label="Rua" />
                            <Input name="Number" label="Número" />
                            <Input name="complement" label="Complemento" />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
                            <Input name="cpf" label="CPF" />
                            <Input name="pis" label="PIS" />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing="4" w="100%">
                            <Input name="password" label="Senha" type="password" />
                            <Input name="password_confirmation" label="Confirmação da senha" type="password" />
                        </SimpleGrid>
                    </VStack>
                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Button colorScheme="whiteAlpha">Cancelar</Button>
                            <Button colorScheme="pink">Salvar</Button>
                        </HStack>
                    </Flex>

                </Box>
            </Flex>
        </Box>
    )
}