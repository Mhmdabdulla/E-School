import { useEffect } from "react"
import { Button } from "../../components/ui/button"
import { Link } from "react-router-dom"
import { CartItem } from "../../components/user/cart/cart-item"
import { CartSummary } from "../../components/user/cart/cart-summary"
import Header from "../../components/user/home/Header"
import { toast } from "sonner"
import { fetchCartItems, moveToWishlist, removeFromCart } from "../../redux/thunks/cartThunk"
import { useAppDispatch, useAppSelector } from "../../redux/store"

export default function CartPage() {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  
  useEffect(() => {
    const getCartData = async () => {
      try {
        dispatch(fetchCartItems())
      } catch (error) {
        console.error(error)
      }
    }

    getCartData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemoveItem = async (_id: string) => {
    try {
      await dispatch(removeFromCart(_id))
      toast.success("course removed from cart", {position:"top-right"})
    } catch (error) {
      console.error(error)
    }
    
  }

  const handleMoveToWishlist = async(_id: string) => {
    try {
      const result = await dispatch(moveToWishlist(_id))
      if(result.meta.requestStatus === "fulfilled"){
        toast.success("course moved to wishlist successfully", {position:"top-right"})
      }else{
        throw new Error("course is alredy in your wishlist")
      }
    } catch (error) {
      console.error(error)
      toast.error("course is alredy in your wishlist", {position:"top-right"})
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0)
  const tax = subtotal * 0.18;

  return (
    <>
    <Header/>
    <div className="container mx-auto px-[4%] py-8">

      <h1 className="mb-8 text-2xl font-semibold sm:text-sm">
        Shopping Cart {cartItems.length > 0 && `(${cartItems.length})`}
      </h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
          <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
          <p className="mb-6 text-muted-foreground">Browse our courses and find something you'd like to learn!</p>
          <Button asChild className="bg-black text-white hover:bg-black/90">
            <Link to="/courses">Browse Courses</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-4 hidden grid-cols-12 gap-4 rounded-lg bg-muted py-3 px-5 sm:grid">
              <div className="col-span-6 font-semibold text-sm ">Course</div>
              <div className="col-span-3 text-center font-semibold text-sm ">Price</div>
              <div className="col-span-3 text-center font-semibold text-sm  ">Action</div>
            </div>
            <div className="space-y-4">
              {cartItems.map((item :any) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onRemove={() => handleRemoveItem(item._id)}
                  onMoveToWishlist={() => handleMoveToWishlist(item._id)}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <CartSummary
              subtotal={subtotal}
              taxes={tax}
              total={subtotal}
            />
          </div>
        </div>
      )}
    </div>
    </>
  )
}