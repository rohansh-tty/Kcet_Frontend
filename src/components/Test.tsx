import React, { ReactElement, useEffect, useState } from 'react'
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

const Test = () => {
  return (
    <>
      <div className="bg-yellow-500 w-full h-full">
        <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 h-full w-full">
          <div className="h-full w-full bg-green-400 flex  items-center justify-center">
            <h1>R1</h1>
          </div>
          <div className="h-full w-full bg-blue-400">
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

  category: string
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
    getBranches()
  }, [])

  return (
      <div className="grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-2 h-full w-full">
        <div className="h-full w-full bg-green-400 flex  items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col  space-y-8 h-full md:w-full lg:w-[60%] items-start justify-center   "
          >
            {/* register your input into the hook by invoking the "register" function */}
            <div className="flex flex-row space-x-2">
              <div className="flex flex-col space-y-2 md:space-y-0">
                <label className="text-black">Min Rank</label>
                <input
                  className="rounded-md w-[40%]"
                  defaultValue="1000"
                  {...register('min_cutoff')}
                />
                {errors.min_cutoff && <span>This field is required</span>}
              </div>

              <div className="flex flex-col space-y-2 md:space-y-0">
                <label className="text-black">Max Rank</label>
                <input
                  className="rounded-md w-[40%]"
                  defaultValue="15000"
                  {...register('max_cutoff')}
                />
                {errors.max_cutoff && <span>This field is required</span>}
              </div>
            </div>

            <div className="flex flex-row w-full space-x-2">
              {/* Caste */}
              <div className="flex flex-col w-full">
                <label className="text-black">Caste Category</label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      className="w-full"
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

            {/* <input type="submit" /> */}
            {/* <Button
          onClick={() => {
            console.log('submit button pressed...')
          }}
          className="bg-black rounded-md w-[25%] p-2 text-primary md:p-1"
          label="Submit"
        /> */}
            <Button
              className="bg-black text-primary w-[40%]"
              label="Submit"
              icon="pi pi-check"
              iconPos="right"
              onClick={async () => {
                // TODO: uncomment this
                // const formInputs = getValues()
                const formInputs = {
                  "min_cutoff": "1000",
                  "max_cutoff": "15000",
                  "category": {
                      "value": "3BG",
                      "label": "3BG"
                  },
                  "round": {
                      "value": "1",
                      "label": "1"
                  },
                  "year": [
                      {
                          "value": "2023",
                          "label": "2023"
                      }
                  ],
                  "branch": [
                      {
                          "branch_name": "Computer Science",
                          "branch_short_name": "CS"
                      }
                  ]
              }
                // console.log('submit button pressed...',  formInputs)
                // console.log(getValues())
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
                  category: formInputs.category.value
                })

                // const resData = await response.text()
                // sort data by cutoff in asceding order
                setTableData(
                  response['data'].sort((a: any, b: any) => a.cutoff - b.cutoff)
                )
              }}
            />
          </form>
          {/* </div> */}
        </div>
        {tableData && tableData.length > 0 ? (
          <div className="md:h-full md:w-full overflow-scroll flex items-center justify-center bg-red-400">
            {' '}
            <DemoTable data={tableData} />
          </div>
        ) : (
          <></>
        )}
    </div>
  )
}

export default Cutoff
