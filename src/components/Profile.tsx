import { on } from 'events'
import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { Menu } from 'primereact/menu'
import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

type ProfileInputs = {
  email: string
  name: string
}

const Profile = () => {
  const profileMenu = useRef(null)
  const navigate = useNavigate()

  const items = [
    {
      label: 'Account Settings',
      items: [
        // {
        //   label: 'Profile',
        //   icon: 'pi pi-user',
        //   command: () => {
        //     navigate('/profile')
        //   }
        // },
        {
          label: 'Logout',
          icon: 'pi pi-arrow-right',
          command: () => {
            localStorage.removeItem('user')
            navigate('/')
          }
        }
      ]
    }
  ]

  const loggedInUser = localStorage.getItem('user')
  const userObject = JSON.parse(loggedInUser ?? '')
  const onSubmit = (data: ProfileInputs) => {
    console.log('Data', data)
  }

  // console.log('Logged In User', typeof loggedInUser)
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    getValues
  } = useForm<ProfileInputs>({})
  return (
    <div className="grid grid-rows-9 grid-cols-1 h-full w-full bg-yellow-400">
      <div className="row-span-1 bg-blue-800 flex   items-center w-full  h-full">
        <div className="flex flex-row  items-center justify-between w-full p-8">
          <div
            className="font-bold text-2xl "
            onClick={() => {
              navigate('/cutoff')
            }}
          >
            <button>KCET Cutoff Analyzer</button>
          </div>
          <Menu model={items} popup ref={profileMenu} id="popup_menu_left" />

          <Avatar
            onClick={(event: any) => profileMenu?.current.toggle(event)}
            aria-controls="popup_menu_left"
            aria-haspopup
            label="V"
            size="large"
            style={{ backgroundColor: '#2196F3', color: '#ffffff' }}
          />
        </div>
      </div>
      <div className="w-full h-full row-span-8 bg-slate-800">
        <div className="grid lg:grid-cols-10 p-8 h-full bg-yellow-400">
          <div className="row-span-1 lg:col-span-2 bg-purple-500 lg:bg-green-200 h-full grid grid-rows-6 p-8 ">
            <div className=" row-span-3 flex flex-col items-start justify-center space-y-4 bg-blue-400">
              <p className="text-2xl font-bold">Profile</p>
              <Avatar
                className="w-[30%] lg:w-[50%] h-[75%] lg:h-[50%]"
                aria-controls="popup_menu_left"
                aria-haspopup
                label="V"
                size="xlarge"
                style={{ backgroundColor: '#2196F3', color: '#ffffff' }}
              />
              <div className="flex flex-col space-y-2">
                <p>
                  <b>Name</b>: {userObject.full_name}
                </p>
                <p>
                  <b>Email</b>: {userObject.email}
                </p>
              </div>
            </div>
          </div>
          <div className="row-span-1 lg:col-span-4 bg-green-300 h-full p-8">
            {/* <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-4 items-start justify-center"
            >
              <div className="flex flex-row w-full space-x-2">
                <div className="flex flex-col space-y-2 md:space-y-0">
                  <label className="text-black">Email</label>
                  <input
                    className="rounded-md  w-full"
                    defaultValue={userObject.email ?? ''}
                    {...register('email')}
                    disabled
                  />
                  {errors.email && <span>This field is required</span>}
                </div>

                <div className="flex flex-col space-y-2 md:space-y-0">
                  <label className="text-black">Name</label>
                  <input
                    className="rounded-md w-full"
                    defaultValue={userObject.full_name ?? ''}
                    {...register('name')}
                  />
                  {errors.name && <span>This field is required</span>}
                </div>
              </div>
              <Button
                className="bg-black text-primary w-[40%]"
                label="Update"
                icon="pi pi-check"
                iconPos="right"
                onClick={async () => {
                  const data = getValues()
                  // console.log('Data', data)
                  // onSubmit(data)
                }}
              />
            </form> */}
            
          </div>
          <div className="row-span-1 lg:col-span-4  bg-green-400 h-full">1</div>
        </div>
      </div>
    </div>
  )
}

export default Profile
