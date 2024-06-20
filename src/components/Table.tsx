import React, { useState, useEffect, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { ProductService } from '../ProductService'
import { Button } from 'primereact/button'

interface CutoffType {
  college_code: string
  cutoff: string
  branch: string
  category: string
  college_name: string
  year: string
}

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

        // doc.autoTable(exportColumns, )
        doc.save('cutoff.pdf')
      })
    })
  }

  const exportExcel = () => {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(data)
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] }
      const excelBuffer = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      })

      saveAsExcelFile(excelBuffer, 'products')
    })
  }

  const saveAsExcelFile = (buffer, fileName) => {
    import('file-saver').then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        let EXCEL_EXTENSION = '.xlsx'
        const data = new Blob([buffer], {
          type: EXCEL_TYPE
        })

        module.default.saveAs(
          data,
          fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
        )
      }
    })
  }
  //@ts-ignore

  return (
    <>
      {/* <Button
        type="button"
        icon="pi pi-file"
        rounded
        onClick={() => exportCSV(false)}
        data-pr-tooltip="CSV"
      />
      <Button
        type="button"
        icon="pi pi-file-excel"
        severity="success"
        rounded
        onClick={exportExcel}
        data-pr-tooltip="XLS"
      />
      <Button
        type="button"
        icon="pi pi-file-pdf"
        severity="warning"
        rounded
        onClick={exportPdf}
        data-pr-tooltip="PDF"
      /> */}
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
