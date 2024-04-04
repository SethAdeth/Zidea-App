import { Nav } from '@components/Nav'
import { Provider } from '@components/Providers'
import '@styles/globals.css'


export const metadata = {
  title: 'Z-idea App',
  description: 'Créer et Partager des Idées Pour le développement',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body >
        <Provider>
          <div className='main'>
            <div className='gradient'/>
          </div>

          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}