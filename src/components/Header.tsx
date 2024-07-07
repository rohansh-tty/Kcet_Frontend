import React from 'react'

type Props = {}

const Header = (props: Props) => {
  return (
    <header className="flex flex-col row-span-1  items-center justify-center  w-full  h-[100px] ">
      <h1 className="text-3xl">Cutoff Tracker for KCET Engineering</h1>
      <p>Includes First Round Cutoff Ranks from 2022, 2023</p>
    </header>
  )
}

export default Header
