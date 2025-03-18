"use client";

import Link from "next/link";
import { createClient } from "../../supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { UserCircle, Home, Camera, MessageCircle, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardNavbar() {
  const supabase = createClient();
  const router = useRouter();

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" prefetch className="text-2xl font-bold text-red-600">
            DOUBLE JEU
          </Link>
        </div>

        <div className="hidden md:flex gap-6 items-center">
          <Link
            href="/dashboard"
            className="font-medium text-gray-700 hover:text-red-600 transition-colors flex items-center gap-1.5"
          >
            <Home className="h-4 w-4" />
            Accueil
          </Link>
          <Link
            href="#"
            className="font-medium text-gray-700 hover:text-red-600 transition-colors flex items-center gap-1.5"
          >
            <Camera className="h-4 w-4" />
            Photos
          </Link>
          <Link
            href="#"
            className="font-medium text-gray-700 hover:text-red-600 transition-colors flex items-center gap-1.5"
          >
            <MessageCircle className="h-4 w-4" />
            Forum
          </Link>
          <Link
            href="#"
            className="font-medium text-gray-700 hover:text-red-600 transition-colors flex items-center gap-1.5"
          >
            <Users className="h-4 w-4" />
            Membres
          </Link>
        </div>

        <div className="flex gap-4 items-center">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
          >
            Retour au site
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <UserCircle className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push("/");
                }}
              >
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
