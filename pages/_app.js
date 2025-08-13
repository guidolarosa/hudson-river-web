import GlobalStyles from "@/theme/globalStyles"
import theme from '@/theme/theme'
import { ThemeProvider } from "styled-components"
import { PageTransition } from 'next-page-transitions'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <PageTransition timeout={300} classNames="page-transition">
        <Component {...pageProps}/>
      </PageTransition>
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

