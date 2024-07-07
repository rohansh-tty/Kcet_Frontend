import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

type Props = {}

const HomeLayout = ({ children }: any) => {
  return (
    <div className=" w-full h-full grid grid-rows-12">
      <Header />
      <main className=" row-span-10">{children}</main>
      <Footer />
    </div>
  )
}

export default HomeLayout
