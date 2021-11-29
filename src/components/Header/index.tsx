import { Flex } from '@chakra-ui/react'
import { Logo } from './Logo'
import { MenuNav } from './MenuNav'

export function Header() {
    return (
        <Flex
            as="header"
            w="100%"
            maxWidth={1480}
            h="20"
            mx="auto"
            mt="4"
            align="center"
            px="6"
        >
            <Logo />
            <MenuNav />

        </Flex >
    )
}