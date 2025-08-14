import { Card, CardContent } from "../../ui/card";
import { AlertCircle } from "lucide-react";

export default function NoPayoutRequests() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-10">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-lg font-semibold">No Payout Requests Found</h2>
        <p className="text-sm text-muted-foreground text-center mt-2">
          There are currently no payout requests to display.
        </p>
      </CardContent>
    </Card>
  );
}