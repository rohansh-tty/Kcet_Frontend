import React, { ReactElement, useState } from 'react'
import logo from './logo.svg'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Button } from 'primereact/button'
import ReactSelect from 'react-select'
import { FrappeApp } from 'frappe-js-sdk'
import Cutoff from './components/Cutoff'
import DemoTable from './components/Table'

const frappe = new FrappeApp('http://127.0.0.1:8000')

type Inputs = {
  kcetRank: string
  category: string
  year: string
  branch: string
}

function App(): ReactElement {
  return (
    <>
      <div className="flex flex-col h-[80%] w-[80%] items-center justify-center">
        <span className="font-recursive flex items-starts justify-start">
          KCET Cutoff Analyzer
        </span>
        <div className="flex flex-row h-full w-full items-center justify-center">
          <Cutoff />
        </div>
        {/* <Cutoff /> */}
      </div>
    </>
  )
}

export default App
