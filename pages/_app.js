import '@styles/globals.css'
import 'tailwindcss/tailwind.css';

const Noop = ({children}) => <>{children}</>

function MyApp({ Component, pageProps }) {

  const Layout = Component.Layout ?? Noop

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp