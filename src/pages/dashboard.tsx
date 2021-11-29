import { Flex, Text } from '@chakra-ui/react'
import { Header } from "../components/Header";

export default function Dashboard() {
    return (
        <Flex direction="column" h="100vh">
            <Header />
            <Flex w="100%"
                maxWidth={1480}
                my="6"
                mx="auto"
                px="6"
            >
                <Text>Bem vindo Usuário</Text>
            </Flex>
        </Flex>
    )
}