// created and .env file on the app's root folder for needed configuration
// (always starting with 'REACT_APP...') and added '.env on 'production' section
import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
);

