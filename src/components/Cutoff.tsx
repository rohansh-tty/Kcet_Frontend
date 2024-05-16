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

const branch_map = [
  { value: '--', label: '--' },
  { value: 'DL', label: 'B.TECH IN CS 85679 --' },
  { value: 'DI', label: 'B Tech in RE 123589 --' },
  { value: 'BF', label: 'B Tech in DS 84094 --' },
  { value: 'CV', label: 'Civil Environment Engg' },
  { value: 'BR', label: 'BioMed. and Robotic Engg' },
  { value: 'UP', label: 'Planning' },
  { value: 'DG', label: 'DG' },
  { value: 'CW', label: 'B Tech in IT' },
  { value: 'DH', label: 'B Tech in RAI' },
  { value: 'BL', label: 'B Tech in AS' },
  { value: 'DN', label: 'B.Tech in VLSI' },
  { value: 'DM', label: 'B.TECH IN CS NW' },
  { value: 'DE', label: 'B Tech in PE' },
  { value: 'CZ', label: 'B Tech in LC' },
  { value: 'CX', label: 'B Tech in IY' },
  { value: 'CU', label: 'B Tech in IS' },
  { value: 'CQ', label: 'B Tech in IO' },
  { value: 'CM', label: 'B Tech in EV' },
  { value: 'BZ', label: 'B Tech in DS' },
  { value: 'BY', label: 'B Tech in DO' },
  { value: 'BX', label: 'B Tech in CY' },
  { value: 'BV', label: 'B Tech in CO' },
  { value: 'BU', label: 'B Tech in CI' },
  { value: 'BQ', label: 'B Tech in CG' },
  { value: 'BN', label: 'B Tech in BD' },
  { value: 'BJ', label: 'B Tech in EE' },
  { value: 'DB', label: 'B Tech in ME' },
  { value: 'BP', label: 'B Tech in CE' },
  { value: 'BH', label: 'B Tech in AI' },
  { value: 'SA', label: 'Smart Agritech' },
  { value: 'IO', label: 'CS- Internet of Things' },
  { value: 'Smart', label: 'Manf.' },
  { value: 'MM', label: 'Mechanical,' },
  { value: 'EA', label: 'Agriculture Engineering' },
  { value: 'CO', label: 'Computer Engineering' },
  { value: 'DC', label: 'Data Sciences' },
  { value: 'MEMechanical', label: '' },
  { value: 'MR', label: 'Marine\rEngineering' },
  { value: 'BW', label: 'B Tech in CS' },
  { value: 'BB', label: 'B Tech in EC' },
  { value: 'AM', label: 'B Tech in AM' },
  { value: 'RO', label: 'Auto. And Robot.' },
  { value: 'ZC', label: 'CSC' },
  { value: 'ES', label: 'Electronics and Computer' },
  { value: 'CC', label: 'Computer and Comm. Engg.' },
  { value: 'CECivil', label: '' },
  { value: 'RA', label: 'Robotics and Automation' },
  { value: 'MT', label: 'Mechatronics' },
  { value: 'CR', label: 'Ceramics' },
  { value: '1G', label: '' },
  { value: 'IP', label: 'Ind.Prodn.' },
  { value: 'CF', label: 'CS(Artificial Intelligence' },
  { value: 'BM', label: 'Bio Medical' },
  { value: 'EV', label: 'EC Engg(VLSI\rDesign)' },
  { value: 'RI', label: 'Robotics and AI' },
  { value: 'IC', label: 'CS-IoT, Cyber Security' },
  { value: 'CD', label: 'Computer Sc. and Design' },
  { value: 'CB', label: 'Comp. Sc. and Bus Sys.' },
  { value: 'AU', label: 'Automobile' },
  { value: 'AE', label: 'Aeronaut.Engg' },
  { value: 'MD', label: 'Med.Elect.' },
  { value: 'CA', label: 'CS (AI, Machine Learning)' },
  { value: 'AD', label: 'Artificial Intel, Data Sc' },
  { value: 'SE', label: 'Aero Space Engg.' },
  { value: 'DS', label: 'Comp. Sc. Engg- Data Sc.' },
  { value: 'CY', label: 'CS- Cyber Security' },
  { value: 'CH', label: 'Chemical' },
  { value: 'BT', label: 'Bio Technology' },
  { value: 'ET', label: 'Elec. Telecommn. Engg.' },
  { value: 'EI', label: 'Elec. Inst. Engg' },
  { value: 'IM', label: 'Ind. Engg. Mgmt.' },
  { value: 'TX', label: 'Textiles' },
  { value: 'ST', label: 'Silk Tech.' },
  { value: 'ME', label: 'Mechanical' },
  { value: 'IE', label: 'Info.Science' },
  { value: 'EE', label: 'Electrical' },
  { value: 'EC', label: 'Electronics' },
  { value: 'CS', label: 'Computers' },
  { value: 'CE', label: 'Civil' },
  { value: 'AI', label: 'Artificial Intelligence' }
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
  const getBranch = useCutoffStore((state)=>state.getBranch)
  const getCutoffResults = useCutoffStore((state)=>state.getCutoffResults)

  const loginResponse = useAuthStore((state)=>state.loginResponse)

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
    myHeaders.append('Authorization',  `Bearer ${loginResponse.access_token}`)
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
    <div className="flex flex-col overflow-auto h-full w-full items-start justify-start overflow-y-scroll">
      {/* <div className="h-full lg:w-[40%] md:w-full items-center justify-center"> */}
      <div className="flex   p-8 shadow-xl w-full h-[80%] ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col  space-y-8 h-full md:w-full lg:w-[55%] items-start justify-center overflow-y-scroll "
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
                defaultValue="3BG"
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
                defaultValue='1'
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
                defaultValue={["2023"]}
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
                defaultValue={[{"branch_short_name":"CS", "branch_name":'Computer Science'}]}
                render={({ field }) => (
                  <ReactSelect
                    isMulti={true}
                    className="w-full"
                    isClearable
                    blurInputOnSelect
                    {...field}
                    getOptionLabel={(option)=>option.branch_name}
                    getOptionValue={(option)=>option.branch_short_name}

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
              const formInputs = getValues()
              console.log('submit button pressed...', typeof formInputs)
              // console.log(getValues())
              const response = await getCutoffResults({
                min_cutoff: formInputs.min_cutoff,
                max_cutoff: formInputs.max_cutoff,
                branch: formInputs?.branch?.map((branch)=>branch.branch_short_name).join(','),
                year: formInputs.year.map((item: any) => item.value).join(','),
                round: formInputs.round.value,
                category: formInputs.category.value
              })
              console.log('response >>>', response)

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
        <div className="h-full md:w-full lg:w-[60%]  items-center justify-center">
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
