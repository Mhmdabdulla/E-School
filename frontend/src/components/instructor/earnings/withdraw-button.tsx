import {type JSX } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card"
import { Button } from "../../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog"

interface WithdrawButtonProps {
  currentBalance: number
  open: boolean;
  setOpen: (val: boolean) => void
  form: JSX.Element
}
export function WithdrawButton({open, setOpen, form, currentBalance}: WithdrawButtonProps) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Balance</CardTitle>
        <CardDescription>Available for withdrawal</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">₹{currentBalance?.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-black hover:bg-black/90 text-white">Withdraw Money</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Withdraw Funds</DialogTitle>
              <DialogDescription>Enter your payment details to withdraw your funds.</DialogDescription>
            </DialogHeader>
            {form}
            {/* <WithdrawForm currentBalance={currentBalance} onSuccess={() => setOpen(false)} /> */}
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}