import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Grid, List } from "lucide-react";
import StoreCard from "./StoreCard";

interface Store {
  id: string;
  name: string;
  address: string;
  email: string;
  rating: number;
  totalRatings: number;
  userRating?: number;
}

interface StoreBrowserProps {
  userRole: 'normal_user' | 'system_admin' | 'store_owner';
  onRateStore?: (storeId: string, rating: number) => void;
}

export default function StoreBrowser({ userRole, onRateStore }: StoreBrowserProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [addressFilter, setAddressFilter] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  //todo: remove mock functionality
  const mockStores: Store[] = [
    {
      id: '1',
      name: 'Downtown Coffee Shop',
      address: '123 Main Street, Downtown District',
      email: 'info@downtowncoffee.com',
      rating: 4.3,
      totalRatings: 127,
      userRating: 4
    },
    {
      id: '2',
      name: 'The Book Corner Store',
      address: '456 Library Avenue, Academic Quarter',
      email: 'hello@bookcorner.com',
      rating: 4.7,
      totalRatings: 89,
      userRating: 5
    },
    {
      id: '3',
      name: 'Fresh Market Groceries',
      address: '789 Commerce Street, Shopping District',
      email: 'contact@freshmarket.com',
      rating: 4.1,
      totalRatings: 203
    },
    {
      id: '4',
      name: 'Tech Gadgets Electronics',
      address: '321 Innovation Drive, Tech Park',
      email: 'support@techgadgets.com',
      rating: 4.5,
      totalRatings: 156,
      userRating: 3
    },
    {
      id: '5',
      name: 'Artisan Bakery & Cafe',
      address: '654 Artisan Lane, Creative District',
      email: 'hello@artisanbakery.com',
      rating: 4.6,
      totalRatings: 92
    },
    {
      id: '6',
      name: 'Sports Equipment Pro',
      address: '987 Athletic Boulevard, Sports Complex',
      email: 'info@sportsequipmentpro.com',
      rating: 4.2,
      totalRatings: 174,
      userRating: 4
    }
  ];

  // Filter stores based on search and address
  const filteredStores = mockStores.filter(store => {
    const matchesName = store.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAddress = store.address.toLowerCase().includes(addressFilter.toLowerCase());
    return matchesName && matchesAddress;
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    console.log('Searching stores by name:', term);
  };

  const handleAddressFilter = (address: string) => {
    setAddressFilter(address);
    console.log('Filtering stores by address:', address);
  };

  const handleRateStore = (storeId: string, rating: number) => {
    console.log(`Rating store ${storeId} with ${rating} stars`);
    onRateStore?.(storeId, rating);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Browse Stores</h1>
          <p className="text-muted-foreground">Discover and rate stores in your area</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
            data-testid="button-grid-view"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
            data-testid="button-list-view"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search Stores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by store name..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
                data-testid="input-search-name"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filter by address..."
                value={addressFilter}
                onChange={(e) => handleAddressFilter(e.target.value)}
                className="pl-10"
                data-testid="input-search-address"
              />
            </div>
          </div>
          {(searchTerm || addressFilter) && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Showing {filteredStores.length} of {mockStores.length} stores
              </span>
              {(searchTerm || addressFilter) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setAddressFilter('');
                  }}
                  data-testid="button-clear-filters"
                >
                  Clear filters
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stores Grid/List */}
      {filteredStores.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No stores found</h3>
            <p className="text-muted-foreground" data-testid="text-no-stores">
              {searchTerm || addressFilter
                ? 'Try adjusting your search criteria'
                : 'No stores are currently available'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div 
          className={viewMode === 'grid' 
            ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3' 
            : 'space-y-4'
          }
          data-testid="stores-container"
        >
          {filteredStores.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              userRole={userRole}
              onRate={handleRateStore}
            />
          ))}
        </div>
      )}
    </div>
  );
}