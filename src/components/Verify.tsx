import { Checkbox } from 'primereact/checkbox'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useAuthStore } from '../store/AuthStore'
import { useNavigate, useParams } from 'react-router-dom'

const Verify = () => {
  const [checkboxState, setCheckboxState] = useState(false)
  const onRulesCheck = () => {
    setCheckboxState((prevState) => !prevState)
  }
  const verifySignup = useAuthStore((state) => state.verifySignup)

  const params = new URLSearchParams(window.location.search)
  const emailToken = params.get('token')
  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-1 grid-row-3 space-x-6">
      {/* Checkbox */}
      <div className="flex items-center justify-center">
        <p className="font-bold text-xl">Verify Email</p>
      </div>
      <div className="flex flex-row space-x-4  bg-greespan-400 items-center justify-center">
        <Checkbox
          inputId="cb1"
          value="Condition"
          onChange={onRulesCheck}
          checked={checkboxState}
        />
        <label htmlFor="cb1" className="break-normal p-checkbox-label">
          I understand and agree to Observance{"'"}s Privacy Notice and User
          Terms of Service
        </label>
      </div>
      <button
        onClick={async () => {
          console.log('token >', emailToken)
          const res = await verifySignup(emailToken || '')
          if (res?.status === 200) {
            navigate('/cutoff')
          } else {
            console.log('Login Failed >>>', res)
            toast.error(`Unexpected Issue ${res?.data?.status}, ${res?.data}`)
          }
        }}
      >
        Submit
      </button>
      {/* Submit Button */}
      <div></div>
    </div>
  )
}

export const VerifyComponent = () => {
  return (
    <>
      <div className="grid grid-rows-6 w-full h-full p-4 bg-green-300 ">
        <Toaster />
        <div className="flex flex-col row-span-1 items-center justify-center p-8 w-full h-full">
          <h1 className="text-3xl">
            Simple Cutoff Tracker for KCET Engineering
          </h1>
          <p>Includes First Round Cutoff Ranks from 2022, 2023</p>
        </div>

        <div className="flex flex-col w-[full] row-span-5 items-center justify-start bg-yellow-500 p-4">
          <Verify />
        </div>
      </div>
    </>
  )
}