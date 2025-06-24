import {ClerkProvider,SignInButton,SignedIn,SignedOut,UserButton} from '@clerk/nextjs'
import './globals.css'
import { ModalProvider } from '@/providers/modal-provider'
import { ToasterProvider } from '@/providers/toast-provider'
import { ThemeProvider } from '@/providers/theme-provider'


export default function RootLayout(
  {children,}: {children: React.ReactNode}) 
  { 
    return (
    <ClerkProvider>
      <html lang="en">
        <body>
           <ToasterProvider/>
           <ModalProvider />
           {children}
        </body>

      </html>
    </ClerkProvider>
  )
}