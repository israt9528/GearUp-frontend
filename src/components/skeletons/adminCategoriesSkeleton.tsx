import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function CategoriesTableSkeleton() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-indigo-100/50">
          <TableRow>
            <TableHead className="px-6 py-4">
              <div className="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            </TableHead>
            <TableHead className="px-6 py-4">
              <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Generate 5 dummy rows */}
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index} className="border-b border-border">
              <TableCell className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 shrink-0 animate-pulse rounded-lg bg-muted" />
                  <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <div className="h-4 w-64 animate-pulse rounded bg-muted" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
