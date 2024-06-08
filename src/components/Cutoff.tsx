import React, { ReactElement, useEffect, useRef, useState } from 'react'
import logo from './logo.svg'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Button } from 'primereact/button'
import ReactSelect from 'react-select'
import { FrappeApp } from 'frappe-js-sdk'
import DemoTable from './Table'
import { get } from 'http'
import { log, table } from 'console'
import { useCutoffStore } from '../store/CutoffStore'
import { useAuthStore } from '../store/AuthStore'

import { Menubar } from 'primereact/menubar'
import { Avatar } from 'primereact/avatar'
import { InputText } from 'primereact/inputtext'
import { Badge } from 'primereact/badge'
import { Menu } from 'primereact/menu'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import Layout from './Layout'

const Test = () => {
  return (
    <>
      <div className=" w-full h-full">
        <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 h-full w-full">
          <div className="h-full w-full  flex  items-center justify-center">
            <h1>R1</h1>
          </div>
          <div className="h-full w-full ">
            <h1>R2</h1>
          </div>
        </div>
      </div>
    </>
  )
}

type BranchOptionType = {
  branch_name: string
  branch_short_name: string
}

type Inputs = {
  min_cutoff: string
  max_cutoff: string

  category: string[]
  year: string[]
  round: string
  branch: BranchOptionType[]
}

export interface CutoffArgs {
  min_cutoff: string
  max_cutoff: string
  branch: string
  round: string
  year: string
  category: string
}

const caste_category_columns = [
  '1G',
  '1K',
  '1R',
  '2AG',
  '2AK',
  '2AR',
  '2BG',
  '2BK',
  '2BR',
  '3AG',
  '3AK',
  '3AR',
  '3BG',
  '3BK',
  '3BR',
  'GM',
  'GMK',
  'GMR',
  'SCG',
  'SCK',
  'SCR',
  'STG',
  'STK',
  'STR'
]

export function TemplateDemo() {
  const itemRenderer = (item: any) => (
    <a className="flex align-items-center p-menuitem-link">
      <span className={item.icon} />
      <span className="mx-2">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
      {item.shortcut && (
        <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
          {item.shortcut}
        </span>
      )}
    </a>
  )
  const items = []

  // const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
  const start = (
    <>
      <div className="font-bold text-2xl ">
        <span>KCET Cutoff Analyzer</span>
      </div>
    </>
  )
  const end = (
    <div className="flex align-items-center gap-2">
      <InputText
        placeholder="Search"
        type="text"
        className="w-8rem sm:w-auto"
      />
      <Avatar
        image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
        shape="circle"
      />
    </div>
  )

  return (
    <div className="card">
      <Menubar model={items} start={start} end={end} />
    </div>
  )
}

const Cutoff = () => {
  const [count, setCount] = useState(0)
  const [tableData, setTableData] = useState([])
  const [branchList, setBranchList] = useState([])
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    getValues
  } = useForm<Inputs>({})
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
  const getBranch = useCutoffStore((state) => state.getBranch)
  const getCutoffResults = useCutoffStore((state) => state.getCutoffResults)

  const loginResponse = useAuthStore((state) => state.loginResponse)

  const getCutoff = async (args: CutoffArgs) => {
    const myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${loginResponse.access_token}`)
    myHeaders.append('Access-Control-Allow-Origin', '*')

    const requestOptions = {
      method: 'GET',
      headers: myHeaders
    }

    // console.log('muyh', myHeaders)
    // const res = await getBranch(myHeaders)
    // console.log('res ', res)

    const res = await fetch(
      `http://development.localhost:8000/api/resource/Cutoff?filters=[["cutoff", ">", "${args.min_cutoff}"], ["cutoff", "<", "${args.max_cutoff}"], ["branch", "in", "${args.branch}"], ["round", "=", "${args.round}"], ["year", "in", "${args.year}"], ["category", "=", "${args.category}"]]&fields=["college_code", "cutoff", "branch", "category", "college_name", "year"]&limit_page_length=0`,
      requestOptions
    )
  }
  const getCategories = () => {}
  const getBranches = async () => {
    // api/resource/Branch?fields=["branch_name", "branch_short_name"]&limit_page_length=0
    const myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${loginResponse.access_token}`)
    myHeaders.append('Access-Control-Allow-Origin', '*')

    const requestOptions = {
      method: 'GET',
      headers: myHeaders
    }

    const res = await getBranch()
    setBranchList(res?.data)
  }

  useEffect(() => {
    if (localStorage.getItem('user')) {
      getBranches()
    } else {
      toast.error('Redirecting to Login Page')
      navigate('/')
    }
  }, [])

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
    <Layout>
      <div className="grid grid-rows-8  grid-cols-1  h-full w-full ">
        <div className="md:row-span-4  row-span-4 h-full w-full pl-8 flex items-start justify-start  border-2 ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col  space-y-8 h-full md:w-[40%] w-[90%] items-center justify-center    "
          >
            <div className="flex flex-row w-full space-x-2">
              <div className="flex flex-col space-y-2 md:space-y-0">
                <label className="text-black">Min Rank</label>
                <input
                  className="rounded-md md:w-[40%] w-full"
                  defaultValue="1000"
                  {...register('min_cutoff')}
                />
                {errors.min_cutoff && <span>This field is required</span>}
              </div>

              <div className="flex flex-col space-y-2 md:space-y-0">
                <label className="text-black">Max Rank</label>
                <input
                  className="rounded-md md:w-[40%] w-full"
                  defaultValue="15000"
                  {...register('max_cutoff')}
                />
                {errors.max_cutoff && <span>This field is required</span>}
              </div>
            </div>

            <div className="flex flex-row w-full space-x-2 ">
              {/* Caste */}
              <div className="flex flex-col w-full">
                <label className="text-black">Caste Category</label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      className="w-full"
                      isMulti={true}
                      isClearable
                      {...field}
                      options={caste_category_columns.map((item) => ({
                        value: item,
                        label: item
                      }))}
                    />
                  )}
                />
                {errors.category && <span>This field is required</span>}
              </div>

              {/* Round */}
              <div className="flex flex-col w-full">
                <label className="text-black">Round</label>
                <Controller
                  name="round"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      className="w-full"
                      isClearable
                      {...field}
                      options={[
                        { value: '1', label: '1' },
                        { value: '2', label: '2' },
                        { value: '3', label: '3' }
                      ]}
                    />
                  )}
                />
                {errors.category && <span>This field is required</span>}
              </div>
            </div>
            <div className="flex flex-row w-full space-x-2">
              {/* Year */}
              <div className="flex flex-col w-full">
                <label className="text-black">Year</label>
                <Controller
                  name="year"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      isMulti={true}
                      className="w-full "
                      isClearable
                      blurInputOnSelect
                      {...field}
                      options={['2019', '2020', '2021', '2022', '2023'].map(
                        (item) => ({
                          value: item,
                          label: item
                        })
                      )}
                    />
                  )}
                />
                {errors.year && <span>This field is required</span>}
              </div>

              {/* Branch */}
              <div className="flex flex-col w-full">
                <label className="text-black">Branch</label>
                <Controller
                  name="branch"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      isMulti={true}
                      className="w-full"
                      isClearable
                      blurInputOnSelect
                      {...field}
                      getOptionLabel={(option) => option.branch_name}
                      getOptionValue={(option) => option.branch_short_name}
                      // options={branch_map}
                      options={branchList}
                    />
                  )}
                />
                {errors.branch && <span>This field is required</span>}
              </div>
            </div>

            <div className="flex flex-row items-center justify-end w-full ">
              <Button
                className="bg-black text-primary  w-[50%] rounded-md"
                label="Submit"
                icon="pi pi-check"
                iconPos="right"
                onClick={async () => {
                  // TODO: uncomment this
                  const formInputs = getValues()
                  const response = await getCutoffResults({
                    min_cutoff: formInputs.min_cutoff,
                    max_cutoff: formInputs.max_cutoff,
                    branch: formInputs?.branch
                      ?.map((branch) => branch.branch_short_name)
                      .join(','),
                    year: formInputs.year
                      .map((item: any) => item.value)
                      .join(','),
                    round: formInputs.round.value,
                    category: formInputs.category
                      .map((item: any) => item.value)
                      .join(',')
                  })

                  // const resData = await response.text()
                  // sort data by cutoff in asceding order
                  setTableData(
                    response['data'].sort(
                      (a: any, b: any) => a.cutoff - b.cutoff
                    )
                  )
                }}
              />
            </div>
          </form>
        </div>
        <div className="md:row-span-4 row-span-4 md:h-full lg:w-full overflow-scroll flex items-center justify-start p-8">
          <div className="flex flex-col h-full w-full space-y-4">
            <span className="font-bold text-xl">Cutoff Results</span>
            <DemoTable data={tableData ?? []} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Cutoff

//   const formInputs = {
//     "min_cutoff": "1000",
//     "max_cutoff": "15000",
//     "category": {
//         "value": "3BG",
//         "label": "3BG"
//     },
//     "round": {
//         "value": "1",
//         "label": "1"
//     },
//     "year": [
//         {
//             "value": "2023",
//             "label": "2023"
//         }
//     ],
//     "branch": [
//         {
//             "branch_name": "Computer Science",
//             "branch_short_name": "CS"
//         }
//     ]
// }
