import { Box, Divider, Flex, Heading, VStack, SimpleGrid, HStack, Button } from "@chakra-ui/react"
import Link from 'next/link'
import { Input } from "../components/Form/Input"
import { Header } from "../components/Header";

import { ToastContainer, toast, Bounce } from "react-toastify";

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useCallback, useContext, useEffect, useState } from "react"
import { parseCookies, destroyCookie } from "nookies"
import { AuthContext } from "../contexts/AuthContext"
import api from "../services/api"
import { GetServerSideProps } from "next";
import Router from "next/router";

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
    password: yup.string().min(6, 'precisa de no mínimo 6 caracteres'),
    password_confirmation: yup.string().oneOf([
        null, yup.ref('password')
    ], 'As senhas precisam ser iguais'),
})

export default function Profile() {

    const { user } = useContext(AuthContext)

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(editUserFormSchema)
    })

    const errors = formState.errors

    const handleEditUser: SubmitHandler<editUserFormData> = async (data) => {

        const dataStorage = localStorage.getItem("userapp.data");
        const dataStore = JSON.parse(`${dataStorage}`);

        await api
            .put(`/users/${dataStore.user.id}`, data, {
                headers: {
                    Authorization: `Bearer ${dataStore.access_token}`,
                },
            }).then((response) => {
                const dataRes = {
                    user: {
                        id: dataStore.user.id,
                        name: dataStore.user.name,
                        email: dataStore.user.email,
                    },
                    access_token: dataStore.access_token,
                };
                Router.push('/dashboard')
                localStorage.removeItem("userapp.data");
                localStorage.setItem("userapp.data", JSON.stringify(dataStore));

            }
            )
        toast("Dados Atualizados.", {
            position: "top-right",
        });
    }

    const handleDeleteUser = useCallback(async (id: number) => {
        try {
            const dataStorage = localStorage.getItem("userapp.data");
            const dataStore = JSON.parse(`${dataStorage}`);

            await api
                .delete(`/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${dataStore.accessToken}`,
                    },
                })
                .then(() => {
                    localStorage.removeItem("userapp.data");
                    destroyCookie({}, "userapp.token");

                    toast.info(
                        `Usuário Deletado. Redirecionando para tela de login...`,
                        {
                            position: "top-right",
                        }
                    );

                    setTimeout(() => {
                        Router.push("/");
                    }, 5000);
                });
        } catch (error) {
            toast.error(`${error["detail"]}`, {
                position: "top-right",
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);





    return (
        <Box>
            <Header />
            <ToastContainer transition={Bounce} />
            <Flex w="100%" my="2" maxWidth={1480} mx="auto" px="6" >
                <Box as="form" flex="1" borderRadius={8} bg="gray.800" p="4" onSubmit={handleSubmit(handleEditUser)} >
                    <Heading size="lg" fontWeight="normal" >Editar Usuário</Heading>

                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing="6">
                        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
                            <Input defaultValue={user.name} type="text" name="name" label="Nome Completo" error={errors.name} {...register('name')} />
                            <Input defaultValue={user.email} name="email" type="email" label="E-mail" error={errors.email} {...register('email')} />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
                            <Input defaultValue={user.city} type="text" name="city" label="Cidade" error={errors.city} {...register('city')} />
                            <Input defaultValue={user.zipcode} type="text" name="zipcode" label="Cep" error={errors.zipcode} {...register('zipcode')} />
                            <Input defaultValue={user.country} type="text" name="country" label="País" error={errors.country} {...register('country')} />
                            <Input defaultValue={user.state} type="text" name="state" label="Estado" error={errors.state} {...register('state')} />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
                            <Input defaultValue={user.street} type="text" name="street" label="Rua" error={errors.street} {...register('street')} />
                            <Input defaultValue={user.number} type="text" name="Number" label="Número" error={errors.number} {...register('number')} />
                            <Input defaultValue={user.complement} type="text" name="complement" label="Complemento" error={errors.complement} {...register('complement')} />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
                            <Input defaultValue={user.cpf} type="text" name="cpf" label="CPF" error={errors.cpf} {...register('cpf')} />
                            <Input defaultValue={user.pis} type="text" name="pis" label="PIS" error={errors.pis} {...register('pis')} />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing="4" w="100%">
                            <Input name="password" label="Senha" type="password" error={errors.password} {...register('password')} />
                        </SimpleGrid>
                    </VStack>
                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Button colorScheme="whiteAlpha"><Link href="/dashboard">Cancelar</Link></Button>
                            <Button onClick={() => handleDeleteUser(user.id)} type="submit" colorScheme="red" isLoading={formState.isSubmitting}>Deletar</Button>
                            <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting}>Salvar</Button>
                        </HStack>
                    </Flex>

                </Box>
            </Flex>
        </Box>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { ['userapp.token']: token } = parseCookies(ctx)

    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
        }
    }

}