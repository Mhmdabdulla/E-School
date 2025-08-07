import apiClient from "../lib/axios"
import {type PayoutRequest } from "../types/revenue"
import axios from "axios"

export const fetchInstructorWallet = async () =>{
    try {
        const res = await apiClient.get("/wallets/")
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const fetchRevenueStats = async (type: string) =>{
    try {
        const res = await apiClient.get("/instructors/revenue",{
            params:{
                type
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const createPayoutRequest = async (data: PayoutRequest) => {
    try {
        const res = await apiClient.post("/payouts", data)
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const fetchPayoutRequests = async () => {
    try {
        const res = await apiClient.get("/payouts")
        return res.data
    } catch (error) {
        console.log(error)
    }
}


export const getAllPayoutRequestsForAdmin = async (
  ) => {
    try {
      const res = await apiClient.get("/payouts/all")
      console.log(res.data)
      return res.data
    } catch (error) {
      throw new Error(`Error fetching payout requests: ${(error as Error).message}`);
    }
  };

  export const approvePayoutRequest = async (payoutRequestId: string, adminNote?: string) => {
    try {
      const res = await apiClient.patch(`/payouts/${payoutRequestId}/approve`, {adminNote})
      console.log(res.data)
      return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || "Unexpected error occurred";
            throw new Error(`Error approving payout request: ${message}`);
          }
          throw new Error("Unknown error approving payout request");
    }
  };

  export const rejectPayoutRequest = async (payoutRequestId: string, adminNote?: string) => {
    try {
      const res = await apiClient.patch(`/payouts/${payoutRequestId}/reject`, {adminNote})
      console.log(res.data)
      return res.data;
    } catch (error) {
      throw new Error(`Error approving payout request: ${(error as Error).message}`);
    }
  };