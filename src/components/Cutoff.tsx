import React, { ReactElement, useEffect, useState } from 'react'
import logo from './logo.svg'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Button } from 'primereact/button'
import ReactSelect from 'react-select'
import { FrappeApp } from 'frappe-js-sdk'
import DemoTable from './Table'
import { get } from 'http'
import { table } from 'console'

type Inputs = {
  cutoff: string
  category: string
  year: string
  round: string
  branch: string
}

interface CutoffArgs {
  cutoff: string
  branch: string
  round: string
  year: string
  category: string
}
const Cutoff = () => {
  const [count, setCount] = useState(0)
  const [tableData, setTableData] = useState([])
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    getValues
  } = useForm<Inputs>({})
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  const getCutoff = async (args: CutoffArgs) => {
    const myHeaders = new Headers()
    myHeaders.append('Authorization', 'Bearer lor3llTgUEx75XtE2ftEhvj0vBDQjD')
    myHeaders.append('Access-Control-Allow-Origin', '*')
    myHeaders.append(
      'Cookie',
      'full_name=Administrator; sid=2b1e3a3f46fc0eaea0c854951d873c41ec619f458376afd3f4ab588a; system_user=yes; user_id=Administrator; user_image='
    )


    // console.log('headers >>', myHeaders)
    const requestOptions = {
      method: 'GET',
      headers: myHeaders
    }

    const res = await fetch(
      `http://development.localhost:8000/api/resource/Cutoff?filters=[["cutoff", ">", "${args.cutoff}"], ["branch", "like", "${args.branch}"], ["round", "=", "${args.round}"], ["year", "=", "${args.year}"], ["category", "=", "${args.category}"]]&fields=["college_code", "cutoff", "branch", "category", "college_name"]&limit_page_length=0`,
      requestOptions
    )
    const resData = await res.text()
    // console.log('setting res data >>>', JSON.parse(resData) )
    // sort data by cutoff in asceding order 
    setTableData(JSON.parse(resData)['data'].sort((a: any, b: any) => a.cutoff - b.cutoff))

    // setTableData(JSON.parse(resData)['data'])
      // .then((response) => response.text())
      // .then((res) => setTableData(JSON.parse(res)['data']))
      // .catch((error) => console.log('error', error))
  }

  // useEffect(() => {
  //   console.log('data ', tableData)
  // }, [tableData])

  return (
    <div className="flex flex-row h-full w-full items-center justify-center">
      <div className="h-full w-[40%]  items-center justify-center">
        <div className="flex flex-row bg-primary rounded-xl p-8 shadow-xl w-full h-full md:overflow-y-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col  space-y-4 h-[80%]  pl-2 pt-2  "
          >
            {/* register your input into the hook by invoking the "register" function */}
            <div className="flex flex-col space-y-2 md:space-y-0">
              <label className="text-accent">Rank</label>
              <input
                className="rounded-md w-[40%]"
                defaultValue="12000"
                {...register('cutoff')}
              />
              {errors.cutoff && <span>This field is required</span>}
            </div>

            <div className="flex flex-col w-full">
              <label className="text-accent">Caste Category</label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <ReactSelect
                    className="w-[40%]"
                    isClearable
                    {...field}
                    options={[
                      { value: '2A', label: '2A' },
                      { value: '2B', label: '2B' },
                      { value: '3A', label: '3A' },
                      { value: '3A', label: '3A' },
                      { value: '3B', label: '3B' },
                      { value: '3C', label: '3C' },
                      { value: '3BG', label: '3BG' }
                    ]}
                  />
                )}
              />
              {errors.category && <span>This field is required</span>}
            </div>

            <div className="flex flex-col w-full">
              <label className="text-accent">Round</label>
              <Controller
                name="round"
                control={control}
                render={({ field }) => (
                  <ReactSelect
                    className="w-[40%]"
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

            <div className="flex flex-col w-full">
              <label className="text-accent">Year</label>
              <Controller
                name="year"
                control={control}
                render={({ field }) => (
                  <ReactSelect
                    className="w-[30%] md:w-full"
                    isClearable
                    blurInputOnSelect
                    {...field}
                    options={[
                      { value: '2018', label: '2018' },
                      { value: '2019', label: '2019' },
                      { value: '2020', label: '2020' },
                      { value: '2021', label: '2021' },
                      { value: '2022', label: '2022' },
                      { value: '2023', label: '2023' }
                    ]}
                  />
                )}
              />
              {errors.year && <span>This field is required</span>}
            </div>

            <div className="flex flex-col w-full">
              <label className="text-accent">Branch</label>
              <Controller
                name="branch"
                control={control}
                render={({ field }) => (
                  <ReactSelect
                    className="w-[75%]"
                    isClearable
                    blurInputOnSelect
                    {...field}
                    options={[
                      { value: 'CS', label: 'CS' },
                      {
                        value: 'EC',
                        label: 'EC'
                      },
                      {
                        value: 'IS',
                        label: 'IS'
                      },
                      { value: 'ME', label: 'ME' },
                      { value: 'CE', label: 'CE' },
                      {
                        value: 'EE',
                        label: 'EE'
                      }
                    ]}
                  />
                )}
              />
              {errors.branch && <span>This field is required</span>}
            </div>

            {/* <input type="submit" /> */}
            {/* <Button
          onClick={() => {
            console.log('submit button pressed...')
          }}
          className="bg-accent rounded-md w-[25%] p-2 text-primary md:p-1"
          label="Submit"
        /> */}
            <Button
              className="bg-accent text-primary w-[40%]"
              label="Submit"
              icon="pi pi-check"
              iconPos="right"
              onClick={async () => {
                console.log('submit button pressed...')
                console.log(getValues())
                const formInputs = getValues()
                await getCutoff({
                  cutoff: formInputs.cutoff,
                  branch: formInputs.branch.value,
                  year: formInputs.year.value,
                  round: formInputs.round.value,
                  category: formInputs.category.value
                })
              }}
            />
          </form>
        </div>
      </div>
      {tableData && tableData.length > 0 &&
        <div className="h-full w-[60%] bg- items-center justify-center">
          {' '}
          <DemoTable data={tableData} />
        </div>
      }
    </div>
  )
}

export default Cutoff
