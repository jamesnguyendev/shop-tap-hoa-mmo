import { create } from "zustand";
import { persist } from "zustand/middleware";
import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.NEXTAUTH_SECRET;

interface RememberState {
  remember: boolean;
  email: string;
  encryptedPassword: string;
  toggleRemember: () => void;
  setCredentials: (email: string, password: string) => void;
  clearCredentials: () => void;
  getDecryptedPassword: () => string | null;
}

export const useRememberStore = create<RememberState>()(
  persist(
    (set, get) => ({
      remember: false,
      email: "",
      encryptedPassword: "",
      toggleRemember: () => set((state) => ({ remember: !state.remember })),
      setCredentials(email, password) {
        const encrypted = CryptoJS.AES.encrypt(
          password,
          SECRET_KEY || "",
        ).toString();
        set({ email, encryptedPassword: encrypted });
      },
      clearCredentials: () => set({ email: "", encryptedPassword: "" }),
      getDecryptedPassword: () => {
        try {
          const bytes = CryptoJS.AES.decrypt(
            get().encryptedPassword,
            SECRET_KEY || "",
          );
          return bytes.toString(CryptoJS.enc.Utf8) || null;
        } catch (error) {
          console.log("Decryption error:", error);
          return "";
        }
      },
    }),
    {
      name: "remember-storage",
    },
  ),
);
