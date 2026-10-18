import * as React from 'react';
import { cn } from '../../lib/utils';

// Minimal headless DataTable — full implementation (with react-table) added during feature work

interface Column<T> {
  key: string;
  header: string;
  cell?: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField: keyof T;
  className?: string;
  emptyMessage?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyField,
  className,
  emptyMessage = 'No results found.',
}: DataTableProps<T>) {
  return (
    <div className={cn('rounded-md border', className)}>
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr className="border-b transition-colors hover:bg-muted/50">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  'h-12 px-4 text-left align-middle font-medium text-muted-foreground',
                  col.className
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={String(row[keyField])}
                className="border-b transition-colors hover:bg-muted/50"
              >
                {columns.map((col) => (
                  <td key={col.key} className={cn('p-4 align-middle', col.className)}>
                    {col.cell ? col.cell(row) : String((row as Record<string, unknown>)[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
