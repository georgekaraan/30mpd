import { extendTheme } from '@chakra-ui/react'

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false
}

const theme = extendTheme({
    fonts: {
        heading: `'Chivo', sans-serif`,
        body: `'Chivo', sans-serif`,
    },
    config
})

export default theme;