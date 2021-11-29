import { Flex, HStack, Icon, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { ActiveLink } from '../ActiveLink'

export function MenuNav() {
    return (
        <Flex align="center" ml="auto">
            <HStack spacing={["2", "4"]}>
                <ActiveLink href="/profile">
                    <Text _hover={{ color: 'gray.500' }} cursor="pointer">Meu Perfil</Text>
                </ActiveLink>
                <Link href="/sair">
                    <Icon as={RiLogoutBoxLine} _hover={{ color: 'gray.500' }} cursor="pointer" />
                </Link>
            </HStack>
        </Flex>
    )
}