import React, { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { ProductService } from '../ProductService'

interface CutoffType {
  college_code: string
  cutoff: string
  branch: string
  category: string
  college_name: string
  year: string
}

export default function DemoTable({ data }: { data: CutoffType }) {
  return (
    <DataTable value={data} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} showGridlines tableStyle={{ minWidth: '50rem' }}>
      <Column field="college_code" header="Code"></Column>
      <Column field="college_name" header="College Name"></Column>
      <Column field="cutoff" header="Cutoff"></Column>
      <Column field="branch" header="Branch"></Column>
      <Column field="category" header="Category"></Column>
      <Column field="year" header="Year"></Column>
    </DataTable>
  )
}
