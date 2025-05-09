'use client'

import React from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Spinner,
  SortDescriptor,
} from '@heroui/react'

import { trpc } from '@/utils/trpc'
import { TR0001NetSaleDetail } from '@cirq/types/db'

export default function Home() {
  const { data: rows, isLoading } = trpc.report.netSaleReport.useQuery()

  const [page, setPage] = React.useState(1)
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'acc_no',
    direction: 'ascending',
  })

  const rowsPerPage = 20
  const pages = Math.ceil((rows?.length ?? 0) / rowsPerPage)

  const formatDate = (value: string | null) => {
    if (!value) return ''
    const date = new Date(value)
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const sortedRows = React.useMemo(() => {
    if (!rows) return []

    const sorted = [...rows]

    const { column, direction } = sortDescriptor

    sorted.sort((a, b) => {
      const aVal = a[column as keyof TR0001NetSaleDetail]
      const bVal = b[column as keyof TR0001NetSaleDetail]

      // Special handling for dates
      if (column === 'dist_dt') {
        const aDate = aVal ? new Date(aVal as string) : new Date(0)
        const bDate = bVal ? new Date(bVal as string) : new Date(0)
        return direction === 'ascending'
          ? aDate.getTime() - bDate.getTime()
          : bDate.getTime() - aDate.getTime()
      }

      // Fallback: string or number sorting
      const aStr = aVal !== null && aVal !== undefined ? String(aVal) : ''
      const bStr = bVal !== null && bVal !== undefined ? String(bVal) : ''

      const cmp = aStr.localeCompare(bStr, undefined, { numeric: true })
      return direction === 'ascending' ? cmp : -cmp
    })

    return sorted
  }, [rows, sortDescriptor])

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    return sortedRows.slice(start, start + rowsPerPage)
  }, [page, sortedRows])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!rows || rows.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-500">No data available.</p>
      </div>
    )
  }

  return (
    <Table
      aria-label="Net Sales Report"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={setPage}
          />
        </div>
      }
      classNames={{
        wrapper: 'min-h-[222px]',
      }}
    >
      <TableHeader>
        <TableColumn key="dist_dt" allowsSorting>
          DATE
        </TableColumn>
        <TableColumn key="agt_short_name" allowsSorting>
          AGENT
        </TableColumn>
        <TableColumn key="sto_qty" allowsSorting>
          STANDING ORDER
        </TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.row_id}>
            {(columnKey) => (
              <TableCell>
                {columnKey === 'dist_dt'
                  ? formatDate(item[columnKey as keyof TR0001NetSaleDetail] as string | null)
                  : getKeyValue(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
