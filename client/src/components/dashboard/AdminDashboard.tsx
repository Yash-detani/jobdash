import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Users, Store, Star, Plus } from "lucide-react";
import StatsCard from "./StatsCard";
import DataTable from "../data/DataTable";
import { Badge } from "@/components/ui/badge";
import StarRating from "../stores/StarRating";

interface AdminDashboardProps {
  onAddUser?: () => void;
  onAddStore?: () => void;
}

export default function AdminDashboard({ onAddUser, onAddStore }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  //todo: remove mock functionality
  const mockStats = {
    totalUsers: 1247,
    totalStores: 89,
    totalRatings: 3542,
    avgRating: 4.2
  };

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

  const mockStores = [
    {
      id: '1',
      name: 'Downtown Coffee Shop',
      email: 'info@downtowncoffee.com',
      address: '123 Main Street, Downtown District',
      rating: 4.3,
      totalRatings: 127
    },
    {
      id: '2',
      name: 'The Book Corner Store',
      email: 'hello@bookcorner.com',
      address: '456 Library Avenue, Academic Quarter',
      rating: 4.7,
      totalRatings: 89
    },
    {
      id: '3',
      name: 'Fresh Market Groceries',
      email: 'contact@freshmarket.com',
      address: '789 Commerce Street, Shopping District',
      rating: 4.1,
      totalRatings: 203
    }
  ];

  const mockRatings = [
    {
      id: '1',
      userName: 'Sarah Michelle Johnson Brown',
      storeName: 'Downtown Coffee Shop',
      rating: 5,
      date: '2024-01-15'
    },
    {
      id: '2',
      userName: 'Michael David Thompson Davis',
      storeName: 'The Book Corner Store',
      rating: 4,
      date: '2024-01-14'
    },
    {
      id: '3',
      userName: 'John Smith Anderson Williams',
      storeName: 'Fresh Market Groceries',
      rating: 3,
      date: '2024-01-13'
    }
  ];

  const userColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'address', label: 'Address', sortable: false },
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

  const storeColumns = [
    { key: 'name', label: 'Store Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'address', label: 'Address', sortable: false },
    {
      key: 'rating',
      label: 'Rating',
      sortable: true,
      render: (value: number, row: any) => (
        <div className="flex items-center gap-2">
          <StarRating value={value} readonly size="sm" />
          <span className="text-sm font-medium">{value.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground">({row.totalRatings})</span>
        </div>
      )
    }
  ];

  const ratingColumns = [
    { key: 'userName', label: 'User', sortable: true },
    { key: 'storeName', label: 'Store', sortable: true },
    {
      key: 'rating',
      label: 'Rating',
      sortable: true,
      render: (value: number) => (
        <StarRating value={value} readonly size="sm" />
      )
    },
    { key: 'date', label: 'Date', sortable: true }
  ];

  const roleFilterOptions = [
    { label: 'System Admin', value: 'system_admin' },
    { label: 'Normal User', value: 'normal_user' },
    { label: 'Store Owner', value: 'store_owner' }
  ];

  const handleAddUser = () => {
    console.log('Add user clicked');
    onAddUser?.();
  };

  const handleAddStore = () => {
    console.log('Add store clicked');
    onAddStore?.();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, stores, and monitor platform activity</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
          <TabsTrigger value="users" data-testid="tab-users">Users</TabsTrigger>
          <TabsTrigger value="stores" data-testid="tab-stores">Stores</TabsTrigger>
          <TabsTrigger value="ratings" data-testid="tab-ratings">Ratings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Total Users"
              value={mockStats.totalUsers}
              description="Active registered users"
              icon={Users}
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard
              title="Total Stores"
              value={mockStats.totalStores}
              description="Registered stores"
              icon={Store}
              trend={{ value: 5, isPositive: true }}
            />
            <StatsCard
              title="Total Ratings"
              value={mockStats.totalRatings}
              description="Submitted ratings"
              icon={Star}
              trend={{ value: 18, isPositive: true }}
            />
            <StatsCard
              title="Avg Rating"
              value={mockStats.avgRating}
              description="Overall platform rating"
              icon={Star}
              trend={{ value: 3, isPositive: true }}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">New user registration</p>
                      <p className="text-sm text-muted-foreground">Sarah Johnson joined</p>
                    </div>
                    <Badge variant="secondary">2 min ago</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">New store rating</p>
                      <p className="text-sm text-muted-foreground">5 stars for Coffee Shop</p>
                    </div>
                    <Badge variant="secondary">5 min ago</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Store registration</p>
                      <p className="text-sm text-muted-foreground">Fresh Market added</p>
                    </div>
                    <Badge variant="secondary">1 hour ago</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start" onClick={handleAddUser} data-testid="button-add-user">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New User
                  </Button>
                  <Button className="w-full justify-start" onClick={handleAddStore} data-testid="button-add-store">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Store
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Star className="mr-2 h-4 w-4" />
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Users Management</h2>
            <Button onClick={handleAddUser} data-testid="button-add-user-tab">
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
          <DataTable
            title="All Users"
            columns={userColumns}
            data={mockUsers}
            searchable
            filterable
            filterOptions={roleFilterOptions}
            onEdit={(user) => console.log('Edit user:', user)}
            onDelete={(user) => console.log('Delete user:', user)}
            onView={(user) => console.log('View user:', user)}
          />
        </TabsContent>

        <TabsContent value="stores" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Stores Management</h2>
            <Button onClick={handleAddStore} data-testid="button-add-store-tab">
              <Plus className="mr-2 h-4 w-4" />
              Add Store
            </Button>
          </div>
          <DataTable
            title="All Stores"
            columns={storeColumns}
            data={mockStores}
            searchable
            onEdit={(store) => console.log('Edit store:', store)}
            onDelete={(store) => console.log('Delete store:', store)}
            onView={(store) => console.log('View store:', store)}
          />
        </TabsContent>

        <TabsContent value="ratings" className="space-y-6">
          <h2 className="text-xl font-semibold">Ratings Overview</h2>
          <DataTable
            title="All Ratings"
            columns={ratingColumns}
            data={mockRatings}
            searchable
            onView={(rating) => console.log('View rating:', rating)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}