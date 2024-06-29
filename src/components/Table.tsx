//@ts-nocheck
import React, { useState, useEffect, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { ProductService } from '../ProductService'
import { Button } from 'primereact/button'
import { PrimeIcons } from 'primereact/api'
import { CutoffType } from '../types/Base'

export default function DemoTable({ data, formFilters }: { data: CutoffType, formFilters: any }) {
  const cols = [
    {
      field: 'college_code',
      header: 'Code'
    },
    {
      field: 'college_name',
      header: 'College Name'
    },
    {
      field: 'cutoff',
      header: 'Cutoff'
    },
    {
      field: 'branch',
      header: 'Branch'
    },
    {
      field: 'category',
      header: 'Category'
    },
    {
      field: 'year',
      header: 'Year'
    }
  ]
  const dt = useRef<any>(null)

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly })
  }
  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field
  }))

  const exportPdf = () => {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then(() => {
        const doc = new jsPDF.default('portrait')
        // console.log('form filters >>', formFilters)
        // TODO: use form filters to name download file, for easier segregation
        doc.autoTable(exportColumns, data)
        doc.save('cutoff.pdf')
      })
    })
  }
  
  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="w-full flex justify-end">
          <Button
            className="w-[40%] md:w-[20%] text-black rounded-md "
            type="button"
            // severity="warning"
            disabled={data.length === 0}
            label="Download PDF"
            // icon="pi pi-download"
            onClick={exportPdf}
            data-pr-tooltip="PDF"
          />
        </div>
        <DataTable
          value={data}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          showGridlines
          tableStyle={{ minWidth: '50rem' }}
          emptyMessage={() => (
            <div className="text-black">No Cutoff Data Found</div>
          )}
          // bodyClassName="text-black"
        >
          <Column field="college_code" header="Code"></Column>
          <Column field="college_name" header="College Name"></Column>
          <Column field="cutoff" header="Cutoff"></Column>
          <Column field="branch" header="Branch"></Column>
          <Column field="category" header="Category"></Column>
          <Column field="year" header="Year"></Column>
        </DataTable>
      </div>
    </>
  )
}
