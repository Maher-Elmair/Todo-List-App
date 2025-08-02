import { createContext, useContext, useState } from "react";
import MySnackBar from "../components/MySnackBar";

// 🧪 إنشاء سياق جديد للتوست (Toast)
const ToastContext = createContext({});

// 🧠 مزود السياق الرئيسي ToastProvider
export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  // 🚀 دالة عرض التوست مع الرسالة وإغلاقه تلقائيًا بعد 2 ثانية
  function showHideToast(message) {
    setOpen(true);
    setMessage(message);  

    // ⏱️ بعد 2 ثانية: إخفاء التوست ومسح الرسالة
    setTimeout(() => {
      setOpen(false);
      setMessage("");
    }, 2000);
  }

  return (
    <ToastContext.Provider value={{ showHideToast }}>
      {children}

      <MySnackBar open={open} message={message} />
    </ToastContext.Provider>
  );
};

// 🧰 Hook مخصص لاستخدام السياق داخل أي مكون بسهولة
export const useToast = () => {
  return useContext(ToastContext);
};