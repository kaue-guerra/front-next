import { Box, Divider, Flex, Heading, VStack, SimpleGrid, HStack, Button } from "@chakra-ui/react"
import Link from 'next/link'
import { Input } from "../components/Form/Input"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useContext, useEffect, useState } from "react"
import { parseCookies } from "nookies"
import { AuthContext } from "../contexts/AuthContext"
import api from "../services/api"

type editUserFormData = {
    id: string;
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

const editUserFormSchema = yup.object().shape({
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

export default function Profile() {

    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [pis, setPis] = useState("");
    const [email, setEmail] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [complement, setComplement] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [userId, setUserId] = useState(1);

    useEffect(() => {


        async function loadData(): Promise<void> {
            try {
                const { 'userapp.token': token } = parseCookies();
                const { user } = useContext(AuthContext)
                const response = await api.get(`/users/${user.id}`, {

                });

                setName(response.data.name);
                setCpf(response.data.document);
                setPis(response.data.pis);
                setEmail(response.data.email);
                setZipcode(response.data.zipcode);
                setStreet(response.data.street);
                setNumber(response.data.number);
                setComplement(response.data.complement);
                setCity(response.data.city);
                setState(response.data.state);
                setCountry(response.data.country);
                setUserId(response.data.id);
            } catch (error) {
            }
        }

        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(editUserFormSchema)
    })

    const errors = formState.errors

    const handleEditUser: SubmitHandler<editUserFormData> = async (values) => {
        await new Promise(resolve => setTimeout(resolve, 2000))
        console.log(values)
    }



    return (
        <Box>
            <Flex w="100%" my="2" maxWidth={1480} mx="auto" px="6" >
                <Box as="form" flex="1" borderRadius={8} bg="gray.800" p="4" onSubmit={handleSubmit(handleEditUser)} >
                    <Heading size="lg" fontWeight="normal" >Editar Usuário</Heading>

                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing="6">
                        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
                            <Input value={name} name="name" label="Nome Completo" error={errors.name} {...register('name')} />
                            <Input value={email} name="email" type="email" label="E-mail" error={errors.email} {...register('email')} />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
                            <Input value={city} name="city" label="Cidade" error={errors.city} {...register('city')} />
                            <Input value={zipcode} name="zipcode" label="Cep" error={errors.zipcode} {...register('zipcode')} />
                            <Input value={country} name="country" label="País" error={errors.country} {...register('country')} />
                            <Input value={state} name="state" label="Estado" error={errors.state} {...register('state')} />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
                            <Input value={street} name="street" label="Rua" error={errors.street} {...register('street')} />
                            <Input value={number} name="Number" label="Número" error={errors.number} {...register('number')} />
                            <Input value={complement} name="complement" label="Complemento" error={errors.complement} {...register('complement')} />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
                            <Input value={cpf} name="cpf" label="CPF" error={errors.cpf} {...register('cpf')} />
                            <Input value={pis} name="pis" label="PIS" error={errors.pis} {...register('pis')} />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing="4" w="100%">
                            <Input name="password" label="Senha" type="password" error={errors.password} {...register('password')} />
                            <Input name="password_confirmation" label="Confirmação da senha" type="password" error={errors.password_confirmation} {...register('password')} />
                        </SimpleGrid>
                    </VStack>
                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Button colorScheme="whiteAlpha"><Link href="/dashboard">Cancelar</Link></Button>
                            <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting}>Salvar</Button>
                        </HStack>
                    </Flex>

                </Box>
            </Flex>
        </Box>
    )
}