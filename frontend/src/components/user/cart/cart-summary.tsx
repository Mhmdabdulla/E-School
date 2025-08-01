import { Button } from "../../ui/button"
import { Separator } from "../../ui/separator"
import { useAppSelector } from "../../../redux/store"
import { makePayment } from "../../../services/paymentService"

interface CartSummaryProps {
  subtotal: number
  // discount: number
  taxes: number
  total: number
}

export function CartSummary({
  subtotal,
  // discount,
  taxes,
  total,
}: CartSummaryProps) {

  const cartItems = useAppSelector(state => state.cart.cartItems)

  const courseIds = cartItems.map(item => item._id)

  const handleCheckout = async () => {
    try {
     await makePayment(courseIds)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="rounded-lg border p-6">
      <h2 className="mb-4  font-semibold">Order Summary</h2>

      <div className="space-y-3">
        <div className="flex items-center text-sm justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-sm font-semibold">₹ {subtotal.toFixed(2)} </span>
        </div>

        {/* {discount > 0 && (
          <div className="flex items-center text-sm justify-between">
            <span className="text-muted-foreground">Coupon Discount</span>
            <span className="text-green-600">-₹ {discount.toFixed(2)} </span>
          </div>
        )} */}

        <div className="flex items-center text-sm justify-between">
          <span className="text-muted-foreground">Taxes</span>
          <span className="font-semibold">₹ {taxes.toFixed(2)} </span>
        </div>

        <Separator />

        <div className="flex items-center text-sm justify-between font-medium">
          <span>Total:</span>
          <span className="text-lg">₹ {total.toFixed(2)} </span>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {/* <div className="space-y-2">
          <div className="text-sm font-medium">Apply coupon code</div>
          <div className="flex gap-2">
            <Input
              placeholder="Coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              disabled={isApplyingCoupon || !!appliedCoupon}
            />
            <Button
              variant="secondary"
              onClick={onApplyCoupon}
              disabled={!couponCode || isApplyingCoupon || !!appliedCoupon}
            >
              {isApplyingCoupon ? "Applying..." : "Apply"}
            </Button>
          </div>
          {appliedCoupon && (
            <div className="text-sm text-green-600">Coupon "{appliedCoupon}" applied successfully!</div>
          )}
        </div> */}

        <Button onClick={handleCheckout} className="w-full bg-black text-white hover:bg-black/90">Proceed To Checkout</Button>

        <div className="text-center text-xs text-muted-foreground">
          By completing your purchase you agree to our{" "}
          <a href="#" className="underline hover:text-foreground">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  )
}