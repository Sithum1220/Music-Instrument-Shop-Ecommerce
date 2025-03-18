// src/api/stripePovider.tsx
import React, { ReactNode } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Oqpc6DDs5wFiqTUqxEnnoVTjDMMCjMgbCnSwxKmVcHMCT8rLXO4wL7nTptnarrKOUMw4XRe1RNmvTBfWgC3t3mp00rTvqUUAW');

interface StripeProviderProps {
  children: ReactNode;
}

const StripeProvider = ({ children }: StripeProviderProps) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;