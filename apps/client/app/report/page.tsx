'use client'

import React, { useEffect, useState } from 'react'
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

  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState<number | null>(null)
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'acc_no',
    direction: 'ascending',
  })

  const calculateRowsPerPage = () => {
    const availableHeight = window.innerHeight - 200 // Adjust padding for other content
    const estimatedRowHeight = 38
    const count = Math.floor(availableHeight / estimatedRowHeight)
    setRowsPerPage(count > 0 ? count : 1)
  }

  useEffect(() => {
    calculateRowsPerPage()

    const handleResize = () => {
      calculateRowsPerPage()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const pages = Math.ceil((rows?.length ?? 0) / (rowsPerPage ?? 1))

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

      if (column === 'dist_dt') {
        const aDate = aVal ? new Date(aVal as string) : new Date(0)
        const bDate = bVal ? new Date(bVal as string) : new Date(0)
        return direction === 'ascending'
          ? aDate.getTime() - bDate.getTime()
          : bDate.getTime() - aDate.getTime()
      }

      const aStr = aVal !== null && aVal !== undefined ? String(aVal) : ''
      const bStr = bVal !== null && bVal !== undefined ? String(bVal) : ''

      const cmp = aStr.localeCompare(bStr, undefined, { numeric: true })
      return direction === 'ascending' ? cmp : -cmp
    })

    return sorted
  }, [rows, sortDescriptor])

  const items = React.useMemo(() => {
    if (!rowsPerPage) return []
    const start = (page - 1) * rowsPerPage
    return sortedRows.slice(start, start + rowsPerPage)
  }, [page, sortedRows, rowsPerPage])

  if (isLoading || !rows || rows.length === 0 || rowsPerPage === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Scrollable container for the table */}
      <div className="overflow-x-auto w-full">
        <Table
          aria-label="Net Sales Report"
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
          classNames={{
            wrapper: 'min-h-[222px]',
          }}
          className="table-fixed w-full"
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
            <TableColumn key="bxt_qty" allowsSorting>
              BOXOUTS
            </TableColumn>
            <TableColumn key="ext_qty" allowsSorting>
              EXTRAS
            </TableColumn>
            <TableColumn key="fre_qty" allowsSorting>
              FREE COPIES
            </TableColumn>
            <TableColumn key="dir_qty" allowsSorting>
              DIRECT DELIVERY
            </TableColumn>
            <TableColumn key="vch_qty" allowsSorting>
              DD VOUCHER
            </TableColumn>
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.row_id}>
                {(columnKey) => (
                  <TableCell
                    className={`whitespace-nowrap ${columnKey === 'sto_qty' || columnKey === 'bxt_qty' || columnKey === 'ext_qty' || columnKey === 'fre_qty' || columnKey === 'dir_qty' || columnKey === 'vch_qty' ? 'text-center' : ''}`}
                    style={
                      columnKey === 'sto_qty' ||
                      columnKey === 'bxt_qty' ||
                      columnKey === 'ext_qty' ||
                      columnKey === 'fre_qty' ||
                      columnKey === 'dir_qty' ||
                      columnKey === 'vch_qty'
                        ? { width: '1px' }
                        : {}
                    }
                  >
                    {columnKey === 'dist_dt'
                      ? formatDate(item[columnKey as keyof TR0001NetSaleDetail] as string | null)
                      : getKeyValue(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Fixed pagination controls at the bottom */}
      <div className="flex w-full justify-center mt-4">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    </div>
  )
}
