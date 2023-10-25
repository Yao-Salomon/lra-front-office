"use client"
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {Menu} from '@headlessui/react'
import Link from 'next/link';
import {AdjustmentsHorizontalIcon, BellAlertIcon, BriefcaseIcon, ChevronDoubleDownIcon, ChevronDownIcon, ChevronRightIcon, ChevronUpIcon, Cog6ToothIcon, CursorArrowRippleIcon, ForwardIcon, HomeIcon, HomeModernIcon, SwatchIcon, TableCellsIcon, UserPlusIcon, VariableIcon} from '@heroicons/react/24/outline'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="`{inter.className}` min-h-max bg-white bg-gradient-to-tr from-white from-80% via-blue-50 via-90% to-white to-95%">
        <main className="flex min-h-max flex-col">
          {children}
        </main>
      </body>
    </html>
  )
}
