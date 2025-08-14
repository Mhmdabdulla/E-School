import { useEffect, useState } from "react";
import { RevenueChart } from "./revenue-chart";
import { RevenueStats } from "./revenue-stats";
import { WithdrawButton } from "./withdraw-button";
import { WithdrawalHistory } from "./withdrawal-history";
import { Sidebar } from "../common/Sidebar";
import PageHeader from "../common/Header";
import { createPayoutRequest, fetchInstructorWallet, fetchPayoutRequests,  } from "../../../services/earningService";
import {type Wallet } from "../../../types/wallet";
import { WithdrawForm } from "./withdraw-form";
import type{ PayoutRequest, PayoutRequestData } from "../../../types/revenue";
import { toast } from "sonner";

export default function EarningsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [walletData, setWalletData] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [payoutHistory, setPayoutHistory] = useState<PayoutRequestData[] >([])

  useEffect(() => {
    getWallet();
    getPayoutRequestHistory()
    setLoading(false);
  }, []);

  const getWallet = async () => {
    try {
      const data = await fetchInstructorWallet();
      setWalletData(data.wallet);
    } catch (error) {
      console.log(error);
    } 
  };

  const getPayoutRequestHistory = async () => {
    try {
      const data = await fetchPayoutRequests()
      setPayoutHistory(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handlePayoutRequestSubmit = async (data: PayoutRequest) => {
    try {
      setFormSubmitting(true);
      const {payout} = await createPayoutRequest(data);
      setPayoutHistory(prev => [payout, ...prev])
      setOpen(false);
      setFormSubmitting(false);
      toast.success("withdraw request is send successfully.");
    } catch (error) {
      console.log(error);
      toast.error("error while sending request, please try again");
    }
  };

  if (loading) {
    return <div></div>;
  }

  

  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <PageHeader />
        <div className="flex-1 overflow-y-auto p-6 pb-16 space-y-6 no-scrollbar">
          <RevenueStats wallet={walletData} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueChart />
            <div className="space-y-6">
              <WithdrawButton
                currentBalance={walletData?.balance as number}
                open={open}
                setOpen={setOpen}
                form={
                  <WithdrawForm
                    isSubmitting={formSubmitting}
                    currentBalance={walletData?.balance as number}
                    onCreateRequest={handlePayoutRequestSubmit}
                  />
                }
              />
              <WithdrawalHistory withdrawals={payoutHistory} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}