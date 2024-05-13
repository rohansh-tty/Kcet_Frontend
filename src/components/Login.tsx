import { Sign } from 'crypto'
import { Button } from 'primereact/button'
import { TabPanel, TabView } from 'primereact/tabview'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

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
  const onSubmit: SubmitHandler<LoginInputs> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full ">
      {/* register your input into the hook by invoking the "register" function */}
      <div className="flex flex-col space-y-1 my-4 items-center justify-center">
        <label>Email</label>
        <input className="w-[40%]" defaultValue="test" {...register('email')} />
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
  )
}

export const AuthPage = () => {
  const [signUpPressed, setBtnPressed] = useState(0)
  return (
    <>
      <div className="flex flex-row w-screen h-full items-center p-4 ">
        <div className="flex flex-col border-2 w-[35%] h-[70%] p-4 items-center justify-center">
          <div className="flex flex-row space-x-4 items-center justify-center ">
            <Button onClick={() => setBtnPressed(1)}>SignUp</Button>
            <Button onClick={() => setBtnPressed(0)}>Login</Button>
          </div>

          {signUpPressed ? <Signup /> : <Login />}
        </div>
        <div className="flex  border-2 w-[65%] h-[70%] ">
          <div className="flex flex-col rounded-md border-1 items-start justify-center p-8">
            <h1 className="text-3xl">
              Simple Cutoff Tracker for KCET Engineering
            </h1>
            <p>
              Includes First Round Cutoff Ranks from 2022, 2023
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
export default Login
