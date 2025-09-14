import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Settings, LogOut, User, Moon, Sun } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  user?: {
    name: string;
    email: string;
    role: 'system_admin' | 'normal_user' | 'store_owner';
  };
  onLogout?: () => void;
  onSettingsClick?: () => void;
}

const roleLabels = {
  system_admin: 'System Admin',
  normal_user: 'User',
  store_owner: 'Store Owner'
};

const roleColors = {
  system_admin: 'bg-destructive text-destructive-foreground',
  normal_user: 'bg-primary text-primary-foreground',
  store_owner: 'bg-accent text-accent-foreground'
};

export default function Header({ user, onLogout, onSettingsClick }: HeaderProps) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark', !isDark);
    console.log('Theme toggled to:', !isDark ? 'dark' : 'light');
  };

  const handleLogout = () => {
    console.log('Logout triggered');
    onLogout?.();
  };

  const handleSettings = () => {
    console.log('Settings clicked');
    onSettingsClick?.();
  };

  return (
    <header className="border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-foreground">Store Rating System</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 hover-elevate" data-testid="button-user-menu">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-sm">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{user.name}</span>
                    <Badge variant="secondary" className={`text-xs ${roleColors[user.role]}`}>
                      {roleLabels[user.role]}
                    </Badge>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSettings} data-testid="menu-settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} data-testid="menu-logout">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="default" data-testid="button-login">
              <User className="mr-2 h-4 w-4" />
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}