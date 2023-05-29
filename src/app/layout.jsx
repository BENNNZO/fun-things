import './globals.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })

export const metadata = {
    title: 'Fun Things',
    description: 'Fun random things I (Benjamin Phillips) have made',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${poppins.className} overflow-hidden`}>{children}</body>
        </html>
    )
}
