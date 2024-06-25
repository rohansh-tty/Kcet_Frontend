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
  const verifyCall = async (emailToken: any) => {
    return verifySignup(emailToken)
  }
  return (
    <div className="grid grid-cols-1 grid-row-3 space-x-6 gap-4">
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
          I understand and agree to Cutoff Tracker{"'"}s Privacy Notice and User
          Terms of Service.
        </label>
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-blue-500 px-6 py-4 font-bold rounded-md  items-center flex text-lg"
          onClick={async () => {
            toast.promise(verifyCall(emailToken), {
              loading: 'Verifying your email...',
              error: (err) => {
                return `Email Verification failed, ${err}`
              },
              success: (res) => {
                if (res?.status === 200) {
                  setTimeout(() => {
                    navigate('/')
                  }, 2000)
                  return 'Email Verification Success!'
                } else {
                  return `Unexpected Issue ${res?.data?.status}, ${res?.data}`
                }
              }
            })
          }}
        >
          Submit
        </button>
      </div>
      {/* Submit Button */}
      <div></div>
    </div>
  )
}

export const VerifyComponent = () => {
  return (
    <>
      <div className="grid grid-rows-6 w-full h-full p-4  ">
        <Toaster />
        <div className="flex flex-col row-span-1 items-center justify-center p-8 w-full h-full">
          <h1 className="text-3xl">Cutoff Tracker for KCET Engineering</h1>
          <p>Includes First Round Cutoff Ranks from 2022, 2023</p>
        </div>

        <div className="flex flex-col w-[full] row-span-5 items-center justify-start   p-4">
          <Verify />
        </div>
        <div className="flex flex-row items-center justify-center w-full h-full space-x-4">
          <p className="text-center">© 2023 Cutoff Tracker</p>

          <p className="text-center ">
            Made with ❤️ by{' '}
            <a
              className="hover:text-blue-400 no-underline"
              href="https://www.linkedin.com/in/rohan-shetty641/"
            >
              Rohan Shetty
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
