import DataTable from '../data/DataTable';
import { Badge } from '@/components/ui/badge';
import StarRating from '../stores/StarRating';

export default function DataTableExample() {
  //todo: remove mock functionality
  const mockUsers = [
    {
      id: '1',
      name: 'John Smith Anderson Williams',
      email: 'john.anderson@example.com',
      address: '123 Main Street, Downtown District, Metropolitan City',
      role: 'system_admin'
    },
    {
      id: '2',
      name: 'Sarah Michelle Johnson Brown',
      email: 'sarah.johnson@example.com',
      address: '456 Oak Avenue, Residential Area, Suburban Town',
      role: 'normal_user'
    },
    {
      id: '3',
      name: 'Michael David Thompson Davis',
      email: 'michael.thompson@storeowner.com',
      address: '789 Business Boulevard, Commercial District',
      role: 'store_owner'
    }
  ];

  const userColumns = [
    {
      key: 'name',
      label: 'Name',
      sortable: true
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true
    },
    {
      key: 'address',
      label: 'Address',
      sortable: false
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      render: (value: string) => {
        const roleColors = {
          system_admin: 'bg-destructive text-destructive-foreground',
          normal_user: 'bg-primary text-primary-foreground',
          store_owner: 'bg-accent text-accent-foreground'
        };
        const roleLabels = {
          system_admin: 'System Admin',
          normal_user: 'User',
          store_owner: 'Store Owner'
        };
        return (
          <Badge className={roleColors[value as keyof typeof roleColors]}>
            {roleLabels[value as keyof typeof roleLabels]}
          </Badge>
        );
      }
    }
  ];

  const roleFilterOptions = [
    { label: 'System Admin', value: 'system_admin' },
    { label: 'Normal User', value: 'normal_user' },
    { label: 'Store Owner', value: 'store_owner' }
  ];

  return (
    <div className="p-6">
      <DataTable
        title="Users Management"
        columns={userColumns}
        data={mockUsers}
        searchable
        filterable
        filterOptions={roleFilterOptions}
        onEdit={(user) => console.log('Edit user:', user)}
        onDelete={(user) => console.log('Delete user:', user)}
        onView={(user) => console.log('View user:', user)}
      />
    </div>
  );
}