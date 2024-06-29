import { Avatar } from 'primereact/avatar'
import { Menu } from 'primereact/menu'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Layout = ({ children }: any) => {
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

  const [labelValue, setLabelValue] = useState('A')
  useEffect(() => {
    const userObject = localStorage.getItem('user')
    if (userObject) {
      const firstLetter = JSON.parse(localStorage.getItem('user') ?? '')
        ?.full_name[0]
      setLabelValue(firstLetter)
    }
  }, [])

  return (
    <div className="grid grid-rows-10  grid-cols-1  h-screen w-full">
      <div className="row-span-1  flex   items-center w-full  ">
        <div className="flex flex-row  items-center justify-between w-full p-8">
          <div className="font-bold text-2xl ">
            <span>KCET Cutoff Analyzer</span>
          </div>
          <Menu model={items} popup ref={profileMenu} id="popup_menu_left" />

          <Avatar
            onClick={(event: any) => {
              if (profileMenu.current) {
                // @ts-ignore
                profileMenu.current?.toggle(event)
              }
            }}
            aria-controls="popup_menu_left"
            aria-haspopup
            label={labelValue}
            size="large"
            style={{ backgroundColor: '#2196F3', color: '#ffffff' }}
          />
        </div>
        {/* <TemplateDemo /> */}
      </div>
      <main className="row-span-8">{children}</main>
      <div className="row-span-1">
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
    </div>
  )
}

export default Layout
