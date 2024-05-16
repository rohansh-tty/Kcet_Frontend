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

type LoginInputs = {
  email: string
  password: string
}

type SignUpInputs = {
  username: string
  email: string
  password: string
}

export const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<SignUpInputs>()
  const cookies = new Cookies()

  const onSubmit: SubmitHandler<SignUpInputs> = (data) => console.log(data)

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
            defaultValue="test"
            {...register('email')}
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
        <button>Submit</button>
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
      // navigate('/cutoff')
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
        console.log('Login Failed >>>', res)
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
          defaultValue="rohanshetty.dev@gmail.com"
          {...register('email')}
        />
      </div>

      {/* include validation with required or other standard HTML validation rules */}
      <div className="flex flex-col space-y-1 my-4 items-center justify-center">
        <label>Password</label>
        <input
          className="w-[40%]"
          defaultValue="rohan@123"
          {...register('password', { required: true })}
        />
        {/* errors will return when field validation fails  */}
        {errors.password && <span>This field is required</span>}
      </div>

      {/* <input type="submit" /> */}
      <button>Submit</button>
    </form>
  )
}

export const AuthPage = () => {
  const [signUpPressed, setBtnPressed] = useState(0)
  return (
    <>
      <div className="grid grid-rows-2 w-full h-full p-4 bg-green-300 ">
        <Toaster />
        <div className="flex flex-col  items-center justify-center p-8 w-full h-full">
          <h1 className="text-3xl">
            Simple Cutoff Tracker for KCET Engineering
          </h1>
          <p>Includes First Round Cutoff Ranks from 2022, 2023</p>
        </div>

        <div className="flex flex-col w-full items-center justify-center bg-yellow-500 p-4">
          <div className="flex flex-row space-x-4 items-center justify-center w-full ">
            <Button onClick={() => setBtnPressed(1)}>SignUp</Button>
            <Button onClick={() => setBtnPressed(0)}>Login</Button>
          </div>

          <div className='lg:w-[50%] w-full'>{signUpPressed ? <Signup /> : <Login />}</div>
        </div>
      </div>
    </>
  )
}
export default Login
