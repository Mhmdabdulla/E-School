
import { Trash2 } from "lucide-react"
import { Button } from "../../ui/button"
import { Link } from "react-router-dom"
import {type Course } from "../../../types/course"

interface CartItemProps {
  item: Course
  onRemove: () => void
  onMoveToWishlist: () => void
}

export function CartItem({ item, onRemove, onMoveToWishlist }: CartItemProps) {
  return (
    <div className="grid grid-cols-1 gap-4 rounded-lg border p-3 sm:grid-cols-12">
      <div className="col-span-6 flex gap-4">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md flex">
          <img src={item.thumbnail || "/placeholder.svg"} alt={item.title}  className="object-cover" />
        </div>
        <div className="flex flex-col">
          <Link to={`/courses/${item._id}`} className="font-medium text-md hover:underline">
            {item.title}
          </Link>
          <div className="mt-1 flex items-center text-sm text-muted-foreground">
            <div className="flex items-center">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`h-3 w-3 ${
                      i < Math.floor(Number(item.rating)) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                    }`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              <span className="ml-1">{item.rating}</span>
            </div>
            <span className="mx-2">•</span>
            <span>
              {/* {item.reviewCount.toLocaleString()} {item.reviewCount === 1 ? "review" : "reviews"} */}
            </span>
          </div>
          {/* <div className="mt-1 text-sm">
            <span>Course by: </span>
            <span className="text-muted-foreground">{item.instructorId.name}</span>
          </div> */}
        </div>
      </div>
      <div className="col-span-3 flex items-center justify-center sm:justify-center">
        <div className="flex flex-col items-start sm:items-center">
          {item.price && (
            <span className="text-sm text-muted-foreground line-through">${Number(item.price).toFixed(2)}</span>
          )}
          <span className="text-md font-bold">₹{Number(item.price).toFixed(2)}</span>
        </div>
      </div>

      <div className="col-span-3 flex items-center justify-between gap-2 sm:justify-center">
        <Button variant="outline" size="sm" className="" onClick={onMoveToWishlist}>
          Move To Wishlist
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="flex-shrink-0"
          onClick={onRemove}
        >
          <Trash2 className="h-5 w-5" />
          <span className="sr-only">Remove</span>
        </Button>
      </div>
    </div>
  )
}