
export interface IPaymentService {
    createStripeSession(userId:string, courseIds:[]):Promise<string>
}