import { Footer, Header } from '@/components'
import React from 'react'

const HomeLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default HomeLayout