import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './styles.css'
import TopBar from './components/top-bar'
import NavBar from './components/navigation-bar'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700']})

export const metadata: Metadata = {
  title: 'Water Bottle Counter',
  description: 'Brought to you by Bottle Banishers',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <TopBar />
        <NavBar />
        {children}
      </body>
    </html>
  )
}
