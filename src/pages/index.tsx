import { Flex, Button, Stack, Text } from '@chakra-ui/react'
import React, { useRef, useCallback, useEffect, useState, useContext } from "react";

import { useForm, SubmitHandler } from 'react-hook-form'
import Link from 'next/link'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Input } from '../components/Form/Input'
import { AuthContext } from '../contexts/AuthContext'

type SigninFormData = {
  email: string,
  password: string
}

const signinFormSchema = yup.object().shape({
  email: yup.string().required('E-mail Obrigatório').email('E-mail Inválido'),
  password: yup.string().required('Senha Obrigatória'),
})

export default function Signin() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signinFormSchema)
  })

  const { signIn } = useContext(AuthContext)

  const errors = formState.errors

  async function handleSignin(data) {
    await signIn(data)
  }

  return (
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">

      <Flex as="form" width="100%" maxWidth={360} bg="gray.800" p="8" borderRadius={8} flexDir="column" onSubmit={handleSubmit(handleSignin)}>
        <Text mb="6">Olá Visitante, Seja bem vindo!</Text>
        <Stack spacing="4">
          <Input name="email" type="email" label="Email" error={errors.email} {...register('email')} />
          <Input name="password" type="password" label="Senha" error={errors.password} {...register('password')} />
        </Stack>
        <Button mb="4" type="submit" mt="6" colorScheme="pink" size="lg" isLoading={formState.isSubmitting}>Login</Button>
        <Link href="/signup">Criar Conta</Link>
      </Flex>
    </Flex>
  )
}
