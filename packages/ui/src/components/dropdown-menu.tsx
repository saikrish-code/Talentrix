export {
  Root as DropdownMenu,
  CheckboxItem as DropdownMenuCheckboxItem,
  Content as DropdownMenuContent,
  Group as DropdownMenuGroup,
  Item as DropdownMenuItem,
  Label as DropdownMenuLabel,
  Portal as DropdownMenuPortal,
  RadioGroup as DropdownMenuRadioGroup,
  RadioItem as DropdownMenuRadioItem,
  Separator as DropdownMenuSeparator,
  Sub as DropdownMenuSub,
  SubContent as DropdownMenuSubContent,
  SubTrigger as DropdownMenuSubTrigger,
  Trigger as DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

// Shortcut helper (keyboard hint label)
import * as React from 'react';
import { cn } from '../lib/utils';

export function DropdownMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('ml-auto text-xs tracking-widest opacity-60', className)} {...props} />
  );
}
