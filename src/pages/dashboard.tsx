import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Flex, Text } from '@chakra-ui/react'
import { Header } from "../components/Header";
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

export default function Dashboard() {

    const dataStorage = localStorage.getItem("userapp.data");
    const dataStore = JSON.parse(`${dataStorage}`);

    return (
        <Flex direction="column" h="100vh">
            <Header />
            <Flex w="100%"
                maxWidth={1480}
                my="6"
                mx="auto"
                px="6"
            >
                <Text>Bem vindo {dataStore.user.name}</Text>
            </Flex>
        </Flex>
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