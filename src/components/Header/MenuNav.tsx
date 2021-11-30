import { Flex, HStack, Icon, Text, Button } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Router from 'next/router'
import { destroyCookie } from 'nookies'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { ActiveLink } from '../ActiveLink'



export function MenuNav() {

    function handleLogout() {
        localStorage.removeItem("userapp.data");
        destroyCookie({}, "userapp.token");
        Router.push('/');
    }

    return (
        <Flex align="center" ml="auto">
            <HStack spacing={["2", "4"]}>
                <ActiveLink href="/profile">
                    <Text _hover={{ color: 'gray.500' }} cursor="pointer">Meu Perfil</Text>
                </ActiveLink>
                <Button bg="gray.900" _hover={{ color: 'gray.500' }} onClick={handleLogout}>
                    <Icon as={RiLogoutBoxLine} _hover={{ color: 'gray.500' }} cursor="pointer" />
                </Button>
            </HStack>
        </Flex>
    )
}