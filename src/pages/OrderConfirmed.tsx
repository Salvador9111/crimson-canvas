import { Link, useParams } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrderConfirmed() {
  const { id } = useParams();
  return (
    <div className="container-tight flex min-h-[60vh] flex-col items-center justify-center py-16 text-center animate-fade-up">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-foreground text-background">
        <Check className="h-8 w-8" strokeWidth={1.5} />
      </div>
      <h1 className="mt-10 text-4xl font-bold tracking-tight md:text-5xl">Thank you</h1>
      <p className="mt-4 max-w-md text-muted-foreground leading-relaxed">
        Your order has been placed. We've sent a confirmation to your email.
      </p>
      {id && <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Order #{id.slice(0, 8)}</p>}
      <div className="mt-10 flex gap-4">
        <Button asChild className="rounded-pill px-8"><Link to="/products">Continue shopping</Link></Button>
        <Button asChild variant="outline" className="rounded-pill px-8"><Link to="/account?tab=orders">View order</Link></Button>
      </div>
    </div>
  );
}
