import { Flex, Button, Stack } from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Input } from '../components/Form/Input'

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

  const errors = formState.errors

  const handleSignin: SubmitHandler<SigninFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(values);

  }

  return (
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
      <Flex as="form" width="100%" maxWidth={360} bg="gray.800" p="8" borderRadius={8} flexDir="column" onSubmit={handleSubmit(handleSignin)}>
        <Stack spacing="4">
          <Input name="email" type="email" label="Email" error={errors.email} {...register('email')} />
          <Input name="password" type="password" label="Senha" error={errors.password} {...register('password')} />
        </Stack>
        <Button type="submit" mt="6" colorScheme="pink" size="lg" isLoading={formState.isSubmitting}>Login</Button>
      </Flex>
    </Flex>
  )
}
