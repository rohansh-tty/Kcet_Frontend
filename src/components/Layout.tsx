import { Avatar } from 'primereact/avatar'
import { Menu } from 'primereact/menu'
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const Layout = () => {
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

  return (
    <div className="grid grid-rows-9  grid-cols-1  h-full w-full bg-yellow-400">
      <div className="row-span-1 bg-blue-800 flex   items-center w-full  ">
        <div className="flex flex-row  items-center justify-between w-full p-8">
          <div className="font-bold text-2xl ">
            <span>KCET Cutoff Analyzer</span>
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
        {/* <TemplateDemo /> */}
      </div>
      <div></div>
    </div>
  )
}

export default Layout
