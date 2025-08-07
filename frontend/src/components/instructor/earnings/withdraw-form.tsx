import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "../../ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form"
import { Input } from "../../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select"
import { DialogFooter } from "../../ui/dialog"
import { Loader2 } from "lucide-react"
import {type PayoutRequest } from "../../../types/revenue"

// Flattened schema
const createWithdrawFormSchema = (currentBalance: number) =>
 z.object({
  amount: z.coerce
      .number({ invalid_type_error: "Amount must be a number" })
      .min(0.01, { message: "Amount must be greater than 0" })
      .max(currentBalance, { message: `Amount cannot exceed ₹${currentBalance.toFixed(2)}` })
      .refine((val) => !isNaN(val), { message: "Amount must be a valid number" }),
  method: z.string().min(1, { message: "Payment method is required" }),
  upiId: z.string().optional(),
  paypalEmail: z.string().optional(),
  accountHolderName: z.string().optional(),
  accountNumber: z.string().optional(),
  ifsc: z.string().optional(),
  bankName: z.string().optional(),
})
.superRefine((data, ctx) => {
  if (data.method === "upi") {
    if (!data.upiId || data.upiId.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["upiId"],
        message: "UPI ID is required for UPI payments",
      });
    }
  }

  if (data.method === "paypal") {
    if (!data.paypalEmail || data.paypalEmail.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["paypalEmail"],
        message: "PayPal email is required for PayPal payments",
      });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.paypalEmail)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["paypalEmail"],
        message: "Invalid email format",
      });
    }
  }

  if (data.method === "bank") {
    if (!data.accountHolderName || data.accountHolderName.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["accountHolderName"],
        message: "Account holder name is required for bank transfers",
      });
    }
    if (!data.accountNumber || data.accountNumber.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["accountNumber"],
        message: "Account number is required for bank transfers",
      });
    }
    if (!data.ifsc || data.ifsc.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["ifsc"],
        message: "IFSC code is required for bank transfers",
      });
    }
    if (!data.bankName || data.bankName.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["bankName"],
        message: "Bank name is required for bank transfers",
      });
    }
  }
});

type WithdrawFormValues = z.infer<ReturnType<typeof createWithdrawFormSchema>>

interface WithdrawFormProps {
  onCreateRequest: (data: PayoutRequest) => void
  currentBalance: number
  isSubmitting: boolean
}

export function WithdrawForm({ onCreateRequest, currentBalance, isSubmitting }: WithdrawFormProps) {

  const form = useForm<WithdrawFormValues>({
    resolver: zodResolver(createWithdrawFormSchema(currentBalance)),
    defaultValues: {
      amount: 0,
      method: undefined,
      upiId: "",
      paypalEmail: "",
      accountHolderName: "",
      accountNumber: "",
      ifsc: "",
      bankName: "",
    },
  })

  const method = form.watch("method")

  const onSubmit = async(data: WithdrawFormValues) => {
    const filteredData = {
      amount: data.amount,
      method: data.method,
      ...(data.method === "upi" && { upiId: data.upiId }),
      ...(data.method === "paypal" && { paypalEmail: data.paypalEmail }),
      ...(data.method === "bank" && {
        accountHolderName: data.accountHolderName,
        accountNumber: data.accountNumber,
        ifsc: data.ifsc,
        bankName: data.bankName,
      }),
    };
    onCreateRequest(filteredData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="Enter amount" {...field} />
              </FormControl>
              <FormDescription>
                Maximum withdrawal: ₹{currentBalance.toFixed(2)}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="method"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {method === "bank" && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="accountHolderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Holder Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter account holder name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter account number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ifsc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IFSC Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter IFSC code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter bank name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {method === "upi" && (
          <FormField
            control={form.control}
            name="upiId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UPI ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter UPI ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {method === "paypal" && (
          <FormField
            control={form.control}
            name="paypalEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PayPal Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter PayPal email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <DialogFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              "Submit Withdrawal Request"
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}