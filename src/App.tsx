import React, { ReactElement, useState } from 'react'
import logo from './logo.svg'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Button } from 'primereact/button'
import ReactSelect from 'react-select'
import { FrappeApp } from 'frappe-js-sdk'
import Cutoff from './components/Cutoff'
import DemoTable from './components/Table'
import { Menubar } from 'primereact/menubar'
import { InputText } from 'primereact/inputtext'
import { Avatar } from 'primereact/avatar'
import { Badge } from 'primereact/badge'
import { Toaster } from 'react-hot-toast'

const frappe = new FrappeApp('http://127.0.0.1:8000')

type Inputs = {
  kcetRank: string
  category: string
  year: string
  branch: string
}

const Menu = () => {
  const itemRenderer = (item: any) => (
    <a className="flex align-items-center p-menuitem-link">
      <span className={item.icon} />
      <span className="mx-2">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
      {item.shortcut && (
        <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
          {item.shortcut}
        </span>
      )}
    </a>
  )
  const items = []

  const start = <span className="text-accent">KCET Cutoff Analyzer</span>
  const end = (
    <div className="flex align-items-center gap-2">
      {/* <span>Dark Mode</span> */}
    </div>
  )
  return (
    <div className="card">
      <Menubar model={items} start={start} end={end} />
    </div>
  )
}

function App(): ReactElement {
  const items = [
    {
      label: 'Home',
      icon: 'pi pi-home'
    },
    {
      label: 'Features',
      icon: 'pi pi-star'
    },
    {
      label: 'Contact',
      icon: 'pi pi-envelope'
    },{}
  ]
  return (
    <>
      <div className="flex flex-col h-screen w-screen overflow-y-scroll ">
        <Toaster />
        <Menu />
        <div className="flex h-full w-full items-center justify-center">
          <Cutoff />
        </div>
      </div>
    </>
  )
}

export default App
