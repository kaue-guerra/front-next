import { Image } from "@chakra-ui/react"
import Link from 'next/link'

export function Logo() {
    return (
        <Link href="/dashboard">
            <a><Image src='logo.png' height="50px" /></a>
        </Link>
    )
}