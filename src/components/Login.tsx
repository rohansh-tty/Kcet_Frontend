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
import { SignUpInputs, LoginInputs } from '../types/Base'

type SIGNUPROPTT = {
  loginToggleCallback: () => void
  verifyHandler: (boolean) => void
}
export const Signup = ({ verifyHandler, loginToggleCallback }: SIGNUPROPTT) => {
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
      const signUpCall = async (data: any) => {
        return signup(data.username, data.email, data.password)
      }
      toast.promise(signUpCall(data), {
        loading: 'Signing you up...',
        error: (err: any) => {
          return `Error in Signup, ${err}`
        },
        success: (res: any) => {
          if (res?.status === 200) {
            localStorage.setItem('user', JSON.stringify(res?.data))
            verifyHandler(true)
            return 'Signup Success'
          } else {
            const errorMessage =
              JSON.parse(JSON.parse(res?.response?.data?._server_messages)[0])
                ?.message ?? ''

            if (errorMessage.trim().length > 0) {
              return `Failed to Signup, ${errorMessage}`
            } else {
              return `Unexpected Issue ${res?.data?.status} }`
            }
          }
        }
      })
    } catch (error) {
      toast.error(`Failed to Signup, ${error}`)
    }
  }

  return (
    <div className="flex shadow-lg rounded-md overflow-hidden">
      <div className="hidden md:block w-full md:w-1/2 h-full ">
        <img
          className="bg-cover"
          src="/assets/students-6078679_1280.jpg"
          alt="login page background"
        />
      </div>
      <div className=" w-full md:w-1/2 flex items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col px-3 gap-3"
        >
          {/* register your input into the hook by invoking the "register" function */}
          <div className="">
            <label className="w-full">Name</label>
            <input
              className="w-full rounded-md"
              defaultValue=""
              {...register('username')}
            />
          </div>

          <div className="">
            <label className="w-full">Email</label>
            <input
              className="w-full rounded-md"
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
          <div className="">
            <label className="w-full">Password</label>
            <input
              className="w-full rounded-md"
              defaultValue=""
              {...register('password', { required: true })}
            />
            {/* errors will return when field validation fails  */}
            {errors.password && <span>This field is required</span>}
          </div>

          {/* <input type="submit" /> */}
          <div className="p-2 w-full flex items-center justify-left ">
            <button className="bg-blue-500 px-5 py-2 rounded-md  items-center flex text-lg">
              SignUp
            </button>
          </div>
          <div className="p-2 w-full flex items-center justify-left ">
            <p className="  rounded-md  items-center flex text-lg">
              Already Have an account{' '}
              <span
                className="text-blue-500 pl-2 cursor-pointer"
                onClick={() => {
                  loginToggleCallback()
                }}
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
type LOGINTY = {
  signUpToggleCallback: () => void
}
export const Login = ({ signUpToggleCallback }: LOGINTY) => {
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
      const loginCall = async (data: any) => {
        return login(data.email, data.password)
      }
      toast.promise(loginCall(data), {
        loading: 'Logging you in...',
        error: (err: any) => {
          return `Error in Login, ${err}`
        },
        success: (res: any) => {
          if (res?.status === 200) {
            setLoginInfo(res?.data)
            localStorage.setItem('user', JSON.stringify(res?.data))
            navigate('/cutoff')
            return 'Login Success'
          } else {
            return `Unexpected Issue ${res?.data?.status}, ${res?.data}`
          }
        }
      })
    } catch (error) {
      toast.error(`Failed to Login, ${error}`)
    }
  }

  return (
    <div className="flex shadow-lg rounded-md overflow-hidden">
      <div className=" w-full md:w-1/2 flex items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col px-3 gap-3"
        >
          {/* register your input into the hook by invoking the "register" function */}
          <div className=" ">
            <label className="w-full">Email</label>
            <input
              className="w-full rounded-md"
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
          <div className="">
            <label className="w-full">Password</label>
            <input
              className="w-full rounded-md"
              defaultValue=""
              {...register('password', { required: true })}
            />
            {/* errors will return when field validation fails  */}
            {errors.password && <span>This field is required</span>}
          </div>

          {/* <input type="submit" /> */}
          <div className="p-2 w-full flex items-center justify-left ">
            <button className="bg-blue-500 px-5 py-2 rounded-md  items-center flex text-lg">
              Login
            </button>
          </div>
          <div className="p-2 w-full flex items-center justify-left ">
            <p className="  rounded-md  items-center flex text-lg">
              Dont Have an account{' '}
              <span
                className="text-blue-500 pl-2 cursor-pointer"
                onClick={() => {
                  signUpToggleCallback()
                }}
              >
                Sign Up
              </span>
            </p>
          </div>
        </form>
      </div>
      <div className="hidden md:block w-full md:w-1/2 h-full ">
        <img
          className="bg-cover"
          src="/assets/lamp-post-4923527_1280.jpg"
          alt="login page background"
        />
      </div>
    </div>
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
    <div className=" w-full h-full p-4  ">
      <Toaster />
      {/* <div className="flex flex-col row-span-1 items-center justify-center p-8 w-full h-full">
          <h1 className="text-3xl">Cutoff Tracker for KCET Engineering</h1>
          <p>Includes First Round Cutoff Ranks from 2022, 2023</p>
        </div> */}

      {/* Web Responsive */}
      <div className="flex w-full  h-full items-center justify-center ">
        <div className=" lg:w-[40%]    ">
          {/* {!showVerify && (
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
          )} */}

          <div className="w-full h-full">
            {!!signUpPressed && (
              <Signup
                loginToggleCallback={() => {
                  setBtnPressed(0)
                }}
                verifyHandler={verifyHandler}
              />
            )}
            {!signUpPressed && !showVerify && (
              <Login
                signUpToggleCallback={() => {
                  setBtnPressed(1)
                }}
              />
            )}
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
      {/* <div>
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
        </div> */}

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
  )
}
export default Login
