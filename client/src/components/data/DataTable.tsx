import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown, Search, Filter, Edit2, Trash2, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  title: string;
  columns: Column[];
  data: any[];
  searchable?: boolean;
  filterable?: boolean;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onView?: (row: any) => void;
  filterOptions?: { label: string; value: string }[];
  className?: string;
}

export default function DataTable({
  title,
  columns,
  data,
  searchable = true,
  filterable = false,
  onEdit,
  onDelete,
  onView,
  filterOptions,
  className
}: DataTableProps) {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('');

  // Sorting logic
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    console.log(`Sorting by ${key} in ${direction} order`);
  };

  // Filter and search logic
  const filteredData = data.filter(row => {
    const matchesSearch = searchTerm === '' || 
      columns.some(col => 
        String(row[col.key]).toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesFilter = filterValue === '' || 
      (filterOptions && filterOptions.some(opt => 
        opt.value === filterValue && String(row[opt.value]).toLowerCase().includes(filterValue.toLowerCase())
      ));
    
    return matchesSearch && matchesFilter;
  });

  // Sort filtered data
  const sortedData = sortConfig
    ? [...filteredData].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      })
    : filteredData;

  const handleEdit = (row: any) => {
    console.log('Edit clicked for:', row);
    onEdit?.(row);
  };

  const handleDelete = (row: any) => {
    console.log('Delete clicked for:', row);
    onDelete?.(row);
  };

  const handleView = (row: any) => {
    console.log('View clicked for:', row);
    onView?.(row);
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <CardTitle data-testid={`table-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {title}
          </CardTitle>
          
          <div className="flex items-center gap-4 flex-wrap">
            {searchable && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                  data-testid="input-search"
                />
              </div>
            )}
            
            {filterable && filterOptions && (
              <Select value={filterValue} onValueChange={setFilterValue}>
                <SelectTrigger className="w-48" data-testid="select-filter">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  {filterOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead 
                    key={column.key}
                    className={cn(
                      column.sortable && "cursor-pointer hover-elevate select-none"
                    )}
                    onClick={() => column.sortable && handleSort(column.key)}
                    data-testid={`header-${column.key}`}
                  >
                    <div className="flex items-center gap-2">
                      {column.label}
                      {column.sortable && (
                        <ArrowUpDown className="h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                ))}
                {(onEdit || onDelete || onView) && (
                  <TableHead className="text-right">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.length === 0 ? (
                <TableRow>
                  <TableCell 
                    colSpan={columns.length + (onEdit || onDelete || onView ? 1 : 0)} 
                    className="text-center py-8 text-muted-foreground"
                    data-testid="text-no-data"
                  >
                    No data found
                  </TableCell>
                </TableRow>
              ) : (
                sortedData.map((row, index) => (
                  <TableRow key={row.id || index} data-testid={`row-${row.id || index}`}>
                    {columns.map((column) => (
                      <TableCell key={column.key} data-testid={`cell-${column.key}-${row.id || index}`}>
                        {column.render ? column.render(row[column.key], row) : row[column.key]}
                      </TableCell>
                    ))}
                    {(onEdit || onDelete || onView) && (
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {onView && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleView(row)}
                              data-testid={`button-view-${row.id || index}`}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                          {onEdit && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(row)}
                              data-testid={`button-edit-${row.id || index}`}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          )}
                          {onDelete && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(row)}
                              data-testid={`button-delete-${row.id || index}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {sortedData.length > 0 && (
          <div className="mt-4 text-sm text-muted-foreground" data-testid="text-results-count">
            Showing {sortedData.length} of {data.length} results
          </div>
        )}
      </CardContent>
    </Card>
  );
}