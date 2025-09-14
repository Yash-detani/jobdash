import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import LoginForm from "@/components/auth/LoginForm";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import StoreBrowser from "@/components/stores/StoreBrowser";
import StoreOwnerDashboard from "@/components/dashboard/StoreOwnerDashboard";
import NotFound from "@/pages/not-found";

type UserRole = 'system_admin' | 'normal_user' | 'store_owner';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

function DemoModeSelector({ onSelectUser }: { onSelectUser: (user: User) => void }) {
  //todo: remove mock functionality
  const demoUsers: User[] = [
    {
      id: '1',
      name: 'John Smith Anderson Williams',
      email: 'admin@storerating.com',
      role: 'system_admin'
    },
    {
      id: '2',
      name: 'Sarah Michelle Johnson Brown',
      email: 'sarah.johnson@example.com',
      role: 'normal_user'
    },
    {
      id: '3',
      name: 'Michael David Thompson Davis',
      email: 'michael@downtowncoffee.com',
      role: 'store_owner'
    }
  ];

  const roleColors = {
    system_admin: 'bg-destructive text-destructive-foreground',
    normal_user: 'bg-primary text-primary-foreground',
    store_owner: 'bg-accent text-accent-foreground'
  };

  const roleLabels = {
    system_admin: 'System Administrator',
    normal_user: 'Normal User',
    store_owner: 'Store Owner'
  };

  const roleDescriptions = {
    system_admin: 'Full access to manage users, stores, and view all analytics',
    normal_user: 'Browse stores, submit ratings, and manage personal account',
    store_owner: 'View store analytics, customer feedback, and rating insights'
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold mb-2">
            Store Rating System Demo
          </CardTitle>
          <p className="text-muted-foreground text-lg">
            Choose a user role to explore the complete functionality
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {demoUsers.map((user) => (
              <Card 
                key={user.id} 
                className="hover-elevate cursor-pointer border-2 transition-all duration-200 hover:border-primary"
                onClick={() => onSelectUser(user)}
                data-testid={`demo-user-${user.role}`}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold">
                      {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{user.name}</CardTitle>
                  <Badge className={`mx-auto ${roleColors[user.role]}`}>
                    {roleLabels[user.role]}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    {roleDescriptions[user.role]}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {user.email}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              This is a functional prototype demonstrating role-based access control, 
              comprehensive form validation, and modern UI components.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Router({ user, onLogout }: { user: User | null; onLogout: () => void }) {
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={user} 
        onLogout={onLogout}
        onSettingsClick={() => console.log('Settings clicked')}
      />
      <main className="container mx-auto px-6 py-8">
        <Switch>
          {user.role === 'system_admin' && (
            <Route path="/" component={() => 
              <AdminDashboard 
                onAddUser={() => console.log('Add user modal')}
                onAddStore={() => console.log('Add store modal')}
              />
            } />
          )}
          {user.role === 'normal_user' && (
            <Route path="/" component={() => 
              <StoreBrowser 
                userRole={user.role}
                onRateStore={(storeId, rating) => console.log(`User rated store ${storeId} with ${rating} stars`)}
              />
            } />
          )}
          {user.role === 'store_owner' && (
            <Route path="/" component={() => 
              <StoreOwnerDashboard 
                storeData={{
                  name: 'Downtown Coffee Shop',
                  rating: 4.3,
                  totalRatings: 127
                }}
              />
            } />
          )}
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showDemo, setShowDemo] = useState(true);

  const handleLogin = (credentials: { email: string; password: string }) => {
    console.log('Login with credentials:', credentials);
    // Mock authentication - in real app this would validate against backend
    setCurrentUser({
      id: '1',
      name: 'Demo User',
      email: credentials.email,
      role: 'normal_user'
    });
    setShowDemo(false);
  };

  const handleRegister = (userData: { name: string; email: string; address: string; password: string }) => {
    console.log('Register new user:', userData);
    // Mock registration - in real app this would create user in backend
    setCurrentUser({
      id: '2',
      name: userData.name,
      email: userData.email,
      role: 'normal_user'
    });
    setShowDemo(false);
  };

  const handleDemoUserSelect = (user: User) => {
    console.log('Demo user selected:', user);
    setCurrentUser(user);
    setShowDemo(false);
  };

  const handleLogout = () => {
    console.log('User logged out');
    setCurrentUser(null);
    setShowDemo(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {showDemo ? (
          <div className="space-y-8">
            <DemoModeSelector onSelectUser={handleDemoUserSelect} />
            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={() => setShowDemo(false)}
                data-testid="button-use-login-form"
              >
                Or use the login form instead
              </Button>
            </div>
          </div>
        ) : currentUser ? (
          <Router user={currentUser} onLogout={handleLogout} />
        ) : (
          <div className="space-y-4">
            <LoginForm onLogin={handleLogin} onRegister={handleRegister} />
            <div className="text-center">
              <Button 
                variant="ghost" 
                onClick={() => setShowDemo(true)}
                data-testid="button-back-to-demo"
              >
                ← Back to Demo Mode
              </Button>
            </div>
          </div>
        )}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
