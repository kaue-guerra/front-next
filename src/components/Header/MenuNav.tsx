import { Flex, HStack, Icon, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { RiLogoutBoxLine } from 'react-icons/ri'

export function MenuNav() {
    return (
        <Flex align="center" ml="auto">
            <HStack spacing="4">
                <Link href="/profile">
                    <Text _hover={{ color: 'gray.500' }} cursor="pointer">Meu Perfil</Text>
                </Link>
                <Link href="/sair">
                    <Icon as={RiLogoutBoxLine} _hover={{ color: 'gray.500' }} cursor="pointer" />
                </Link>
            </HStack>
        </Flex>
    )
}