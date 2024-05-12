import { Sign } from 'crypto'
import { Button } from 'primereact/button'
import { TabPanel, TabView } from 'primereact/tabview'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

type LoginInputs = {
  username: string
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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        {/* register your input into the hook by invoking the "register" function */}
        <label>Name</label>
        <input defaultValue="test" {...register('username')} />

        {/* include validation with required or other standard HTML validation rules */}
        <label>Email</label>
        <input {...register('email', { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.password && <span>This field is required</span>}

        <label>Password</label>
        <input {...register('password', { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.password && <span>This field is required</span>}

        <input type="submit" />
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      {/* register your input into the hook by invoking the "register" function */}
      <label>Email</label>
      <input defaultValue="test" {...register('username')} />

      {/* include validation with required or other standard HTML validation rules */}
      <label>Password</label>
      <input {...register('password', { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.password && <span>This field is required</span>}

      <input type="submit" />
    </form>
  )
}

export const AuthPage = () => {
  const [signUpPressed, setBtnPressed] = useState(0)
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row space-x-4">
          <Button onClick={()=>setBtnPressed(1)}>SignUp</Button>
          <Button onClick={()=>setBtnPressed(0)}>Login</Button>
        </div>

        {signUpPressed ? <Signup /> : <Login />}
        {/* <TabView>
          <TabPanel header="Log-In">
            <Login />
          </TabPanel>
          <TabPanel header="Sign-Up">
            <Signup />
          </TabPanel>
        </TabView> */}
      </div>
    </>
  )
}
export default Login
