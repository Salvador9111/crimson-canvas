import { Link, useParams } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrderConfirmed() {
  const { id } = useParams();
  return (
    <div className="container-tight flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Check className="h-8 w-8" />
      </div>
      <h1 className="font-display mt-8 text-4xl md:text-5xl">Thank you</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Your order has been placed. We've sent a confirmation to your email.
      </p>
      {id && <p className="mt-2 text-xs uppercase-tracked text-muted-foreground">Order #{id.slice(0, 8)}</p>}
      <div className="mt-8 flex gap-3">
        <Button asChild className="rounded-none"><Link to="/products">Continue shopping</Link></Button>
        <Button asChild variant="outline" className="rounded-none"><Link to="/account?tab=orders">View order</Link></Button>
      </div>
    </div>
  );
}
