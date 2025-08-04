import apiClient from '../lib/axios'
import {loadStripe} from '@stripe/stripe-js'

export const makePayment = async (courseIds:string[]) => {
    try {
        // const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
        const stripeKey = 'pk_test_51RrFrN9LUJIVMpkoyt9pypqvjS24BuihpT0jtIPdRL5KbtFWaEi7PKIzNgEYsR511TinUzvn9zlhH15z6Yd7bYpQ00b4i7Bclv'
        const stripe = await loadStripe(stripeKey)
        const res = await apiClient.post("/payments/create-checkout-session", {courseIds})
        const sessionId = res.data.url
        console.log(sessionId)

        const result = await stripe?.redirectToCheckout({sessionId})
        if(result?.error){
            console.log(result.error)
        }
    } catch (error) {
        console.log(error)
    }
}