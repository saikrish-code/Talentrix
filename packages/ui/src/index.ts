// ============================================================
// @talentrix/ui — shared component library barrel export
// ============================================================

// Utilities
export { cn } from './lib/utils';

// Base components (shadcn/ui wrappers)
export { Button, buttonVariants } from './components/button';
export { Badge, badgeVariants } from './components/badge';
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './components/card';
export { Input, type InputProps } from './components/input';
export { Label } from './components/label';
export { Separator } from './components/separator';
export { Avatar, AvatarImage, AvatarFallback } from './components/avatar';
export { Progress } from './components/progress';
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from './components/command';
export {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from './components/select';
export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/tabs';
export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './components/dialog';
export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './components/dropdown-menu';
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './components/tooltip';
export { Popover, PopoverContent, PopoverTrigger } from './components/popover';
export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './components/toast';
export { useToast } from './hooks/use-toast';

// Talentrix-specific compound components
export { StatusBadge } from './components/talentrix/status-badge';
export { RoleBadge } from './components/talentrix/role-badge';
export { LoadingSpinner } from './components/talentrix/loading-spinner';
export { EmptyState } from './components/talentrix/empty-state';
export { PageHeader } from './components/talentrix/page-header';
export { DataTable } from './components/talentrix/data-table';
export { Logo, type LogoProps } from './components/talentrix/logo';
