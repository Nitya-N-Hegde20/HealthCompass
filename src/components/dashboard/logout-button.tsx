'use client';

import { logout } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  return (
    <form action={logout} className="w-full">
      <Button variant="ghost" className="w-full justify-start gap-2">
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </form>
  );
}
