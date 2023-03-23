import GlobalStyles from "@/theme/globalStyles"
import theme from '@/theme/theme'
import { ThemeProvider } from "styled-components"

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
