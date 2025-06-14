import {
  Search,
  Filter,
  Download,
  Upload,
  UserPlus,
  RefreshCw,
  Users,
  Check,
  AlertCircle,
  MoreHorizontal,
  Edit,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Customer, PersonOfContact } from "@/types/stakeholders";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  VisibilityState,
  useReactTable,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { DataTablePagination } from "@/components/common/data-table-pagination";
import { DataTableViewOptions } from "@/components/common/data-table-view-option";
import { DataTableColumnHeader } from "@/components/common/data-table-column-header";

interface PaginatedResponse<T> {
  data: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

// Define columns for DataTable
const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => {
      const id = row.getValue("id") as number;
      return <div className="font-mono text-xs">#C0{id}</div>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Name" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "personOfContacts",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact Person" />
    ),
    cell: ({ row }) => {
      const contacts = row.getValue("personOfContacts") as PersonOfContact[];
      return contacts?.length > 0 ? contacts[0].name : "N/A";
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => {
      const customer = row.original;
      return `${customer.city}, ${customer.state}`;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 dark:text-red-400">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function CustomersPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [paginatedData, setPaginatedData] =
    useState<PaginatedResponse<Customer> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Dummy customer data
  const dummyCustomers: Customer[] = [
    {
      id: 1,
      name: "Acme Corporation",
      email: "contact@acmecorp.com",
      address: "123 Business Park",
      state: "California",
      city: "San Francisco",
      pincode: "94103",
      phone: "415-555-1234",
      gst: "29AABCU9603R1ZJ",
      pan: "AABCU9603R",
      residentialAddress: "123 Business Park, San Francisco",
      birthDate: null,
      anniversaryDate: null,
      oldCustomerId: 101,
      parentCompany: null,
      personOfContacts: [
        {
          id: 1,
          parentCompany: null,
          customerId: 1,
          name: "John Smith",
          email: "john@acmecorp.com",
          phone: "415-555-5678",
          address: "123 Business Park",
          state: "California",
          city: "San Francisco",
          pincode: "94103",
          residentialAddress: "456 Residence Ave, San Francisco",
          birthDate: new Date("1980-05-15"),
        },
      ],
    },
    {
      id: 2,
      name: "TechStart Inc.",
      email: "info@techstart.io",
      address: "456 Innovation Way",
      state: "New York",
      city: "New York City",
      pincode: "10001",
      phone: "212-555-9876",
      gst: "27AAACT5645R1ZX",
      pan: "AAACT5645R",
      residentialAddress: "456 Innovation Way, New York",
      birthDate: null,
      anniversaryDate: null,
      oldCustomerId: 102,
      parentCompany: null,
      personOfContacts: [
        {
          id: 2,
          parentCompany: null,
          customerId: 2,
          name: "Sarah Johnson",
          email: "sarah@techstart.io",
          phone: "212-555-1111",
          address: "456 Innovation Way",
          state: "New York",
          city: "New York City",
          pincode: "10001",
          residentialAddress: "789 Apartment Blvd, New York",
          birthDate: new Date("1985-11-23"),
        },
      ],
    },
    {
      id: 3,
      name: "Global Enterprises",
      email: "contact@globalent.com",
      address: "789 Corporate Blvd",
      state: "Texas",
      city: "Austin",
      pincode: "78701",
      phone: "512-555-7890",
      gst: "24AADCG1234R1ZP",
      pan: "AADCG1234R",
      residentialAddress: "789 Corporate Blvd, Austin",
      birthDate: null,
      anniversaryDate: null,
      oldCustomerId: 103,
      parentCompany: null,
      personOfContacts: [
        {
          id: 3,
          parentCompany: null,
          customerId: 3,
          name: "Michael Chen",
          email: "michael@globalent.com",
          phone: "512-555-4321",
          address: "789 Corporate Blvd",
          state: "Texas",
          city: "Austin",
          pincode: "78701",
          residentialAddress: "101 Residence Court, Austin",
          birthDate: new Date("1975-08-30"),
        },
      ],
    },
    {
      id: 4,
      name: "Swift Solutions",
      email: "hello@swiftsolutions.co",
      address: "321 Tech Lane",
      state: "Washington",
      city: "Seattle",
      pincode: "98101",
      phone: "206-555-3456",
      gst: "29AASCS9876R1ZK",
      pan: "AASCS9876R",
      residentialAddress: "321 Tech Lane, Seattle",
      birthDate: null,
      anniversaryDate: null,
      oldCustomerId: 104,
      parentCompany: null,
      personOfContacts: [
        {
          id: 4,
          parentCompany: null,
          customerId: 4,
          name: "Emily Wilson",
          email: "emily@swiftsolutions.co",
          phone: "206-555-7654",
          address: "321 Tech Lane",
          state: "Washington",
          city: "Seattle",
          pincode: "98101",
          residentialAddress: "555 Condo Ave, Seattle",
          birthDate: new Date("1990-03-12"),
        },
      ],
    },
    {
      id: 5,
      name: "Bright Ideas Ltd.",
      email: "ideas@brightideas.org",
      address: "654 Creative Drive",
      state: "Illinois",
      city: "Chicago",
      pincode: "60601",
      phone: "312-555-8765",
      gst: "24AABCB9090R1ZB",
      pan: "AABCB9090R",
      residentialAddress: "654 Creative Drive, Chicago",
      birthDate: null,
      anniversaryDate: null,
      oldCustomerId: 105,
      parentCompany: null,
      personOfContacts: [
        {
          id: 5,
          parentCompany: null,
          customerId: 5,
          name: "David Rodriguez",
          email: "david@brightideas.org",
          phone: "312-555-2345",
          address: "654 Creative Drive",
          state: "Illinois",
          city: "Chicago",
          pincode: "60601",
          residentialAddress: "222 Lakeview Dr, Chicago",
          birthDate: new Date("1988-07-19"),
        },
      ],
    },
    // Adding more dummy customers to demonstrate pagination
    {
      id: 6,
      name: "Blue Ocean Industries",
      email: "info@blueocean.com",
      address: "987 Ocean Ave",
      state: "Florida",
      city: "Miami",
      pincode: "33101",
      phone: "305-555-2233",
      gst: "33AABFB1234R1ZQ",
      pan: "AABFB1234R",
      residentialAddress: "987 Ocean Ave, Miami",
      birthDate: null,
      anniversaryDate: null,
      oldCustomerId: 106,
      parentCompany: null,
      personOfContacts: [
        {
          id: 6,
          parentCompany: null,
          customerId: 6,
          name: "Jennifer Lopez",
          email: "jennifer@blueocean.com",
          phone: "305-555-4455",
          address: "987 Ocean Ave",
          state: "Florida",
          city: "Miami",
          pincode: "33101",
          residentialAddress: "800 Sunset Dr, Miami",
          birthDate: new Date("1982-04-25"),
        },
      ],
    },
    {
      id: 7,
      name: "Green Valley Farms",
      email: "contact@greenvalley.org",
      address: "543 Rural Route",
      state: "Idaho",
      city: "Boise",
      pincode: "83702",
      phone: "208-555-6677",
      gst: "31AABCG7890R1ZX",
      pan: "AABCG7890R",
      residentialAddress: "543 Rural Route, Boise",
      birthDate: null,
      anniversaryDate: null,
      oldCustomerId: 107,
      parentCompany: null,
      personOfContacts: [
        {
          id: 7,
          parentCompany: null,
          customerId: 7,
          name: "Robert Green",
          email: "robert@greenvalley.org",
          phone: "208-555-8899",
          address: "543 Rural Route",
          state: "Idaho",
          city: "Boise",
          pincode: "83702",
          residentialAddress: "200 Mountain View, Boise",
          birthDate: new Date("1970-12-15"),
        },
      ],
    },
  ];

  // Simulate fetching paginated data from an API
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call delay
    const timer = setTimeout(() => {
      const { pageIndex, pageSize } = pagination;

      // Create sliced data based on current pagination state
      const startIndex = pageIndex * pageSize;
      const endIndex = startIndex + pageSize;
      const slicedData = dummyCustomers.slice(startIndex, endIndex);

      // Create pagination metadata
      const paginatedResponse: PaginatedResponse<Customer> = {
        data: slicedData,
        meta: {
          totalItems: dummyCustomers.length,
          itemCount: slicedData.length,
          itemsPerPage: pageSize,
          totalPages: Math.ceil(dummyCustomers.length / pageSize),
          currentPage: pageIndex + 1,
        },
      };

      setPaginatedData(paginatedResponse);
      setIsLoading(false);
    }, 500); // Simulate network delay

    return () => clearTimeout(timer);
  }, [pagination]);

  const activeCount = dummyCustomers.length;
  const inactiveCount = 2;
  const totalCount = activeCount + inactiveCount;

  // Set up table with tanstack/react-table
  const table = useReactTable({
    data: paginatedData?.data || [],
    columns,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: paginatedData?.meta.totalPages || 0,
    state: {
      sorting,
      pagination,
      columnVisibility,
    },
  });

  return (
    <div className="flex flex-col space-y-8 bg-background p-8">
      {/* Header section with title and action buttons */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-full md:w-auto flex justify-center md:justify-start order-2 md:order-1">
          <img
            src="/taskify-images/customer-master-man.png"
            alt="A person checking the customers list."
            className="h-40 md:h-56 object-contain rounded-lg shadow-md bg-white dark:bg-gray-800"
          />
        </div>

        <div className="flex-1 space-y-6 order-1 md:order-2">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
                <p className="text-muted-foreground mt-1">
                  Manage your customer relationships and interactions
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="h-10">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button variant="outline" size="sm" className="h-10">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm" className="h-10">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="shadow-sm hover:shadow transition-shadow duration-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Customers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div className="text-2xl font-bold">{totalCount}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow transition-shadow duration-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Customers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <div className="text-2xl font-bold">{activeCount}</div>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200 ml-2 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
                  >
                    {Math.round((activeCount / totalCount) * 100)}%
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow transition-shadow duration-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Inactive Customers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <div className="text-2xl font-bold">{inactiveCount}</div>
                  <Badge
                    variant="outline"
                    className="bg-red-50 text-red-700 border-red-200 ml-2 dark:bg-red-950 dark:text-red-300 dark:border-red-800"
                  >
                    {Math.round((inactiveCount / totalCount) * 100)}%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Filter section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card p-4 rounded-lg shadow-sm">
        <div className="flex w-full max-w-md items-center space-x-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              className="pl-10 h-10"
              type="text"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] h-10">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="h-10">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <DataTableViewOptions table={table} />
          <Button variant="ghost" size="sm" className="h-10">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Customer Table with Shadcn UI DataTable */}
      <div className="bg-card rounded-lg shadow-sm overflow-hidden">
        <div className="p-1">
          <div className="rounded-md">
            {isLoading ? (
              <div className="flex justify-center items-center h-[300px]">
                <div className="flex flex-col items-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Loading customers...
                  </p>
                </div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id} className="font-semibold">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row, index) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className={index % 2 === 0 ? "bg-muted/50" : ""}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No customers found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
        <div className="py-4">
          <DataTablePagination table={table} />
        </div>
      </div>
    </div>
  );
}
