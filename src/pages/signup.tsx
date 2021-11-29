import { Box, Divider, Flex, Heading, VStack, SimpleGrid, HStack, Button } from "@chakra-ui/react"
import { Input } from "../components/Form/Input"
import Link from 'next/link'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { useForm, SubmitHandler } from 'react-hook-form'

type CreateUserFormData = {
    name: string;
    email: string;
    country: string;
    city: string;
    zipcode: string;
    state: string;
    street: string;
    number: string;
    complement: string;
    cpf: string;
    pis: string;
    password: string;
    password_confirmation: string;
}

const createUserFormSchema = yup.object().shape({
    email: yup.string().required('E-mail Obrigatório').email('E-mail Inválido'),
    name: yup.string().required('Preencha seu nome'),
    country: yup.string().required('Preencha seu País'),
    city: yup.string().required('Preencha sua cidade'),
    state: yup.string().required('Preencha seu estado (UF)'),
    street: yup.string().required('Preencha a rua onde você mora'),
    number: yup.string().required('Preencha o  numero da sua casa'),
    complement: yup.string().required('Preencha o complemento'),
    cpf: yup.string().required('Preencha seu CPF'),
    pis: yup.string().required('Preencha seu PIS'),
    password: yup.string().required('Senha Obrigatória').min(6, 'precisa de no mínimo 6 caracteres'),
    password_confirmation: yup.string().oneOf([
        null, yup.ref('password')
    ], 'As senhas precisam ser iguais'),
})

export default function Signup() {
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createUserFormSchema)
    })

    const errors = formState.errors

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
        await new Promise(resolve => setTimeout(resolve, 2000))
        console.log(values)
    }

    return (
        <Box>
            <Flex w="100%" my="2" maxWidth={1480} mx="auto" px="6" >
                <Box as="form" flex="1" borderRadius={8} bg="gray.800" p="4" onSubmit={handleSubmit(handleCreateUser)} >
                    <Heading size="lg" fontWeight="normal" >Criar Usuário</Heading>

                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing="6">
                        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
                            <Input name="name" label="Nome Completo" error={errors.name} {...register('name')} />
                            <Input name="email" type="email" label="E-mail" error={errors.email} {...register('email')} />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
                            <Input name="city" label="Cidade" error={errors.city} {...register('city')} />
                            <Input name="zipcode" label="Cep" error={errors.zipcode} {...register('zipcode')} />
                            <Input name="country" label="País" error={errors.country} {...register('country')} />
                            <Input name="state" label="Estado" error={errors.state} {...register('state')} />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
                            <Input name="street" label="Rua" error={errors.street} {...register('street')} />
                            <Input name="Number" label="Número" error={errors.number} {...register('number')} />
                            <Input name="complement" label="Complemento" error={errors.complement} {...register('complement')} />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
                            <Input name="cpf" label="CPF" error={errors.cpf} {...register('cpf')} />
                            <Input name="pis" label="PIS" error={errors.pis} {...register('pis')} />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing="4" w="100%">
                            <Input name="password" label="Senha" type="password" error={errors.password} {...register('password')} />
                            <Input name="password_confirmation" label="Confirmação da senha" type="password" error={errors.password_confirmation} {...register('password')} />
                        </SimpleGrid>
                    </VStack>
                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Button colorScheme="whiteAlpha"><Link href="/">Cancelar</Link></Button>
                            <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting}>Salvar</Button>
                        </HStack>
                    </Flex>

                </Box>
            </Flex>
        </Box>
    )
}