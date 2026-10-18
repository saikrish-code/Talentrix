'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Logo,
  Button,
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  RoleBadge,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@talentrix/ui';
import { UserRole } from '@talentrix/shared-types';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Kanban,
  CalendarDays,
  BarChart3,
  Settings,
  Search,
  Bell,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Building2,
} from 'lucide-react';
import { cn } from '@talentrix/ui';

interface AppShellProps {
  children: React.ReactNode;
  userRole?: UserRole;
  userName?: string;
  userEmail?: string;
  tenantName?: string;
}

export function AppShell({
  children,
  userRole = UserRole.RECRUITER,
  userName = 'Sarah Jenkins',
  tenantName = 'Acme Corp',
}: AppShellProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);
  const [commandOpen, setCommandOpen] = React.useState(false);

  const navItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.RECRUITER, UserRole.HIRING_MANAGER, UserRole.INTERVIEWER],
    },
    {
      title: 'Jobs',
      href: '/jobs',
      icon: Briefcase,
      roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.RECRUITER, UserRole.HIRING_MANAGER],
    },
    {
      title: 'Candidates',
      href: '/candidates',
      icon: Users,
      roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.RECRUITER],
    },
    {
      title: 'Pipeline',
      href: '/pipeline',
      icon: Kanban,
      roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.RECRUITER, UserRole.HIRING_MANAGER],
    },
    {
      title: 'Interviews',
      href: '/interviews',
      icon: CalendarDays,
      roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.RECRUITER, UserRole.HIRING_MANAGER, UserRole.INTERVIEWER],
    },
    {
      title: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
      roles: [UserRole.ADMIN, UserRole.HR_MANAGER],
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: Settings,
      roles: [UserRole.ADMIN, UserRole.HR_MANAGER],
    },
  ];

  const filteredNav = navItems.filter((item) => item.roles.includes(userRole));

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <aside
        className={cn(
          'flex flex-col border-r bg-card transition-all duration-300 z-30 sticky top-0 h-screen',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          {!collapsed && <Logo size="md" />}
          {collapsed && <span className="font-bold text-lg text-primary mx-auto">Tr</span>}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {!collapsed && (
          <div className="p-3 border-b m-3 rounded-lg bg-muted/50 flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="truncate">
                <p className="text-xs font-semibold truncate">{tenantName}</p>
                <p className="text-[10px] text-muted-foreground">Enterprise Tenant</p>
              </div>
            </div>
          </div>
        )}

        <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
          {filteredNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground font-semibold'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  collapsed && 'justify-center px-2'
                )}
                title={collapsed ? item.title : undefined}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t">
          {!collapsed ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 overflow-hidden">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="truncate">
                  <p className="text-sm font-medium truncate">{userName}</p>
                  <RoleBadge role={userRole} className="mt-0.5 text-[10px] px-1.5 py-0" />
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild title="Sign Out">
                <Link href="/auth/login">
                  <LogOut className="h-4 w-4 text-muted-foreground" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex justify-center">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-4 w-full max-w-md">
            <Button
              variant="outline"
              className="w-full justify-start text-muted-foreground font-normal h-9 text-sm"
              onClick={() => setCommandOpen(true)}
            >
              <Search className="mr-2 h-4 w-4 shrink-0" />
              <span>Search candidates, jobs, pipelines...</span>
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                ⌘K
              </kbd>
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="relative h-9 w-9 p-0 rounded-full">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="font-semibold">Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start py-2">
                  <p className="text-xs font-medium">New Candidate Shortlisted</p>
                  <p className="text-[10px] text-muted-foreground">Sarah Jenkins scored 94% match for Senior Full Stack</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start py-2">
                  <p className="text-xs font-medium">Interview Feedback Submitted</p>
                  <p className="text-[10px] text-muted-foreground">David Chen completed Technical Round 2</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 gap-2 px-2">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{userName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings">Profile Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/design-system">Design System</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="text-destructive">
                  <Link href="/auth/login">Log out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>

      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Search platform..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => setCommandOpen(false)}>Dashboard</CommandItem>
            <CommandItem onSelect={() => setCommandOpen(false)}>Jobs</CommandItem>
            <CommandItem onSelect={() => setCommandOpen(false)}>Candidates</CommandItem>
            <CommandItem onSelect={() => setCommandOpen(false)}>Pipeline</CommandItem>
            <CommandItem onSelect={() => setCommandOpen(false)}>Interviews</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
