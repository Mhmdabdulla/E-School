import { updateUser } from "../redux/slices/authSlice";
import { type AppDispatch } from "../redux/store";
import apiClient from "../lib/axios";

export const updateProfile = async (formData: FormData, dispatch: AppDispatch) => {
  const response = await apiClient.put(`/users/profile`, formData, {
    withCredentials: true,
  });
  dispatch(
    updateUser({
      user: response.data.user,
    })
  );
};

export const changePassword = async (currentPassword: string, newPassword: string) => {
  try {
    const response = await apiClient.patch(
      `users/change-password`,
      { currentPassword, newPassword },
      { withCredentials: true }
    );
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await apiClient.get(`users/profile`, { withCredentials: true });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const sendInstructorApplication = async (formData: FormData) => {
  try {
    const response = apiClient.post(`users/become-instructor`, formData, { withCredentials: true });
    return response;
  } catch (error: any) {
    console.log(error);
    return error.response;
  }
};

export const getApplications = async () => {
    const res = await apiClient.get("users/applications");
    return res.data;

};

export const getUsers = async (page:number,limit:number,searchQuery:string) => {
 try {
  const res = await apiClient.get(`/users`, {params: {
    page,
    limit,
    searchQuery
  }});
  return res.data
 } catch (error) {
  console.log(error)
 }
};

export const toggleUserStatus = async (userId: string) => {
  try {
    const response = await apiClient.patch(`/users/${userId}/status`, {}, { withCredentials: true });

    return response;
  } catch (error: any) {
    console.log(error);
    return error.response;
  }
};

export const getUserDashboard = async () => {
  try {
    const res = await apiClient.get("/users/dashboard");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};