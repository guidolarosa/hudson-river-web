import GlobalStyles from "@/theme/globalStyles"
import theme from '@/theme/theme'
import { ThemeProvider } from "styled-components"

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Component {...pageProps}/>
    </ThemeProvider>
  )
}

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {}
 
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  return { pageProps }
}

