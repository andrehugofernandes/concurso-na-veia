"use client";

import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useTheme } from "@/lib/contexts/theme-context";

// Inicializar o Stripe (certifique-se de usar a chave pública)
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

interface StripeEmbeddedCheckoutProps {
  clientSecret: string;
}

export function StripeEmbeddedCheckout({
  clientSecret,
}: StripeEmbeddedCheckoutProps) {
  const { theme } = useTheme();
  
  // Opções de aparência para o Embedded Checkout se adequar ao tema
  const options = {
    clientSecret,
  };

  return (
    <div className="w-full h-full min-h-[500px]">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout className="w-full h-full" />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
