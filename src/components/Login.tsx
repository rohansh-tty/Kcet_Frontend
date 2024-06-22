import { Sign } from 'crypto'
import { Button } from 'primereact/button'
import { TabPanel, TabView } from 'primereact/tabview'
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { client } from '../api/axiosInstance'
import { useAuthStore } from '../store/AuthStore'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { LoginResponseAPI } from '../store/CutoffStore'
import { Checkbox } from 'primereact/checkbox'
import { FrappeResponse } from '../types/Frappe'

type LoginInputs = {
  email: string
  password: string
}

type SignUpInputs = {
  username: string
  email: string
  password: string
}

export const Signup = ({ verifyHandler }: any) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<SignUpInputs>()
  const cookies = new Cookies()
  const navigate = useNavigate()
  const signup = useAuthStore((state) => state.signup)

  const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    try {
      const res: any = await signup(data.username, data.email, data.password)
      if (res?.status === 200) {
        localStorage.setItem('user', JSON.stringify(res?.data))
        toast.success('Signup Success')
        verifyHandler(true)
      } else {
        const errorMessage =
          JSON.parse(JSON.parse(res?.response?.data?._server_messages)[0])
            ?.message ?? ''

        if (errorMessage.trim().length > 0) {
          toast.error(`Failed to Signup, ${errorMessage}`)
        } else {
          toast.error(`Unexpected Issue ${res?.data?.status} }`)
        }
      }
    } catch (error) {
      toast.error(`Failed to Signup, ${error}`)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full ">
        {/* register your input into the hook by invoking the "register" function */}
        <div className="flex flex-col space-y-1 my-4 items-center justify-center">
          <label>Name</label>
          <input
            className="w-[40%]"
            defaultValue="test"
            {...register('username')}
          />
        </div>

        <div className="flex flex-col space-y-1 my-4 items-center justify-center">
          <label>Email</label>
          <input
            className="w-[40%]"
            defaultValue="metyho@citmo.net"
            {...register('email', {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'invalid email address'
              }
            })}
          />
        </div>

        {/* include validation with required or other standard HTML validation rules */}
        <div className="flex flex-col space-y-1 my-4 items-center justify-center">
          <label>Password</label>
          <input
            className="w-[40%]"
            defaultValue="test@123"
            {...register('password', { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.password && <span>This field is required</span>}
        </div>

        {/* <input type="submit" /> */}
        <div className="p-2 w-full flex items-center justify-center ">
          <button className="bg-blue-500 p-4 rounded-md  items-center flex text-lg">
            Submit
          </button>
        </div>
      </form>
    </>
  )
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<LoginInputs>()
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const loginInfo = useAuthStore((state) => state.loginResponse)
  const setLoginInfo = useAuthStore((state) => state.setLoginResponse)
  const cookies = new Cookies()

  // chevk if user is already logged in
  useEffect(() => {
    if (
      localStorage.getItem('user') &&
      'access_token' in JSON.parse(localStorage.getItem('user') || '')
    ) {
      navigate('/cutoff')
    }
  }, [])

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const res = await login(data.email, data.password)
      if (res?.status === 200) {
        setLoginInfo(res?.data)
        localStorage.setItem('user', JSON.stringify(res?.data))
        toast.success('Login Success')
        navigate('/cutoff')
      } else {
        // console.log('Login Failed >>>', res)
        toast.error(`Unexpected Issue ${res?.data?.status}, ${res?.data}`)
      }
    } catch (error) {
      toast.error(`Failed to Login, ${error}`)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full ">
      {/* register your input into the hook by invoking the "register" function */}
      <div className="flex flex-col space-y-1 my-4 items-center justify-center">
        <label>Email</label>
        <input
          className="w-[40%]"
          defaultValue=""
          {...register('email', {
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'invalid email address'
            }
          })}
        />
      </div>

      {/* include validation with required or other standard HTML validation rules */}
      <div className="flex flex-col space-y-1 my-4 items-center justify-center">
        <label>Password</label>
        <input
          className="w-[40%]"
          defaultValue=""
          {...register('password', { required: true })}
        />
        {/* errors will return when field validation fails  */}
        {errors.password && <span>This field is required</span>}
      </div>

      {/* <input type="submit" /> */}
      <div className="p-2 w-full flex items-center justify-center ">
        <button className="bg-blue-500 p-4 rounded-md  items-center flex text-lg">
          Submit
        </button>
      </div>
    </form>
  )
}

export const AuthPage = () => {
  const [signUpPressed, setBtnPressed] = useState(0)
  const [showVerify, setShowVerify] = useState(false)
  const verifyHandler = (value: boolean) => {
    if (signUpPressed) {
      setBtnPressed(0)
      setShowVerify(value)
    }
  }
  return (
    <>
      <div className="grid grid-rows-6 w-full h-full p-4  ">
        <Toaster />
        <div className="flex flex-col row-span-1 items-center justify-center p-8 w-full h-full">
          <h1 className="text-3xl">Cutoff Tracker for KCET Engineering</h1>
          <p>Includes First Round Cutoff Ranks from 2022, 2023</p>
        </div>

        {/* Web Responsive */}
        <div className="flex w-full h-full row-span-5  items-center justify-center">
          <div className=" lg:w-[40%] w-full h-full flex flex-col items-center justify-start  ">
            {!showVerify && (
              <div className="flex flex-row  items-center justify-center w-full p-4 space-x-8 ">
                <Button
                  className="py-2 px-4 font-bold text-xl"
                  onClick={() => setBtnPressed(1)}
                >
                  SignUp
                </Button>
                <Button
                  className="px-4 py-2 placeholder-opacity-80 font-bold text-xl"
                  onClick={() => setBtnPressed(0)}
                >
                  Login
                </Button>
              </div>
            )}

            <div className="w-full">
              {!!signUpPressed && <Signup verifyHandler={verifyHandler} />}
              {!signUpPressed && !showVerify && <Login />}
              {showVerify ? (
                <p className="text-center">
                  Thank you for signing up, you will be receiving a verfication
                  link in your email
                </p>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div>
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

        {/* Mobiel Responsive */}
        {/* <div className="grid grid-cols-2 lg:hidden w-full h-full row-span-5">
          <div className="col-span-2 bg-yellow-300 "></div>
          <div className="col-span-2 bg-red-400 ">
            {!showVerify && (
              <div className="flex flex-row space-x-4 items-center justify-center w-full">
                <Button onClick={() => setBtnPressed(1)}>SignUp</Button>
                <Button onClick={() => setBtnPressed(0)}>Login</Button>
              </div>
            )}

            <div className="w-full">
              {!!signUpPressed && <Signup verifyHandler={verifyHandler} />}
              {!signUpPressed && !showVerify && <Login />}
              {showVerify ? (
                <p className="text-center">
                  Thank you for signing up, you will be receiving a verfication
                  link in your email
                </p>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="col-span-2 bg-blue-300 "></div>
        </div> */}
      </div>
    </>
  )
}
export default Login
