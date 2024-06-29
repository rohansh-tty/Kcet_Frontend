//@ts-nocheck
import React, { useState, useEffect, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { ProductService } from '../ProductService'
import { Button } from 'primereact/button'
import { CutoffType } from '../types/Base'



export default function DemoTable({ data }: { data: CutoffType }) {
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

        doc.autoTable(exportColumns, data)
        doc.save('cutoff.pdf')
      })
    })
  }
  return (
    <>
      <Button
      className='w-[20%] flex items-center'
        type="button"
        icon="pi pi-file-pdf"
        severity="warning"
        rounded
        label='Download PDF'
        onClick={exportPdf}
        data-pr-tooltip="PDF"
      /> 
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
    </>
  )
}
