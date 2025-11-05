import { Link } from "react-router-dom";
import { Home, ShoppingBag, Info, Users, Mail, Package, RotateCcw, FileText, Shield } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface MobileNavProps {
  trigger: React.ReactNode;
}

export function MobileNav({ trigger }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 mt-6">
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start gap-3" size="lg">
              <Home className="h-5 w-5" />
              Home
            </Button>
          </Link>
          <Link to="/shop">
            <Button variant="ghost" className="w-full justify-start gap-3" size="lg">
              <ShoppingBag className="h-5 w-5" />
              Explore Gifts
            </Button>
          </Link>
          <Link to="/resellers">
            <Button variant="ghost" className="w-full justify-start gap-3" size="lg">
              <Users className="h-5 w-5" />
              For Resellers
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="ghost" className="w-full justify-start gap-3" size="lg">
              <Info className="h-5 w-5" />
              About
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="ghost" className="w-full justify-start gap-3" size="lg">
              <Mail className="h-5 w-5" />
              Contact
            </Button>
          </Link>

          <Separator className="my-4" />

          <div className="text-sm font-medium text-muted-foreground px-4 mb-2">Support</div>
          <Link to="/shipping">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Package className="h-4 w-4" />
              Shipping
            </Button>
          </Link>
          <Link to="/returns">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <RotateCcw className="h-4 w-4" />
              Returns
            </Button>
          </Link>
          <Link to="/terms">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <FileText className="h-4 w-4" />
              Terms
            </Button>
          </Link>
          <Link to="/privacy">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Shield className="h-4 w-4" />
              Privacy
            </Button>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
