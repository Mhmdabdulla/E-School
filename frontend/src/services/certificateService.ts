import apiClient from "../lib/axios";
import { AxiosError } from "axios";

export const applyForCertificate = async (courseId: string) => {
  try {
    const res = await apiClient.post("/certificates/issue", { courseId });
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Apply Certificate Error:", axiosError);
    type ErrorResponseData = { message?: string };
    const errorData = axiosError.response?.data as ErrorResponseData;
    const errorMessage =
      errorData?.message || "Something went wrong while applying for the certificate.";
    throw new Error(errorMessage);
  }
};

export const downloadCertificate = async (certificateId: string) => {
    try {
      const response = await apiClient.get(`/certificates/download`, {
        params:{
            certificateUrl: certificateId
        },
        responseType: "blob",
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "certificate.pdf"); 
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed", error);
    }
  };

export const fetchCertificate = async (courseId: string) => {
  try {
    const res = await apiClient.get(`/certificates/${courseId}`);
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Fetch Certificate Error:", axiosError);
    type ErrorResponseData = { message?: string };
    const errorData = axiosError.response?.data as ErrorResponseData;
    const errorMessage =
      errorData?.message || "Failed to fetch certificate details.";
    throw new Error(errorMessage);
  }
};

export const getUserCertificates = async() => {
  try {
    const res = await apiClient.get("/certificates")
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error)
  }
}