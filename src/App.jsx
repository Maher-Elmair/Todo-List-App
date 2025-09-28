import "./App.css";
import { useState } from "react";

// 📝 استيراد المكونات المطلوبة
import TodoList from "./components/TodoList";
import MySnackBar from "./components/MySnackBar";

// 🌍 استيراد السياقات
import TodosProvider from "./contexts/todosContext";
import { ToastProvider } from "./contexts/ToastContext";

// 🎨 استيراد مكونات Material UI
import { createTheme, ThemeProvider } from "@mui/material/styles";

// 🔑 استيراد uuid لتوليد معرّفات فريدة للمهام
import { v4 as uuidv4 } from "uuid";

// 🌈 تخصيص الثيم الخاص بالتطبيق باستخدام Material UI
const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"].join(","),
  },
  palette: {
    primary: {
      main: "#dd2c00",
    },
  },
});

// 💡 تعيين المهام الأولية في التطبيق
const initialTodos = [
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "قراءة فصل من كتاب تطوير الذات",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "ممارسة الرياضة",
    details: "التمرين لمدة 30 دقيقة في المنزل",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "مشروع React",
    details: "استكمال تصميم واجهة المستخدم",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastProvider>
          {/* 💫 التطبيق داخل صناديق التنسيق */}
          <div
            className="App"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#191b1f",
              height: "100vh",
              direction: "rtl",
            }}
          >
              {/* 📋 عرض قائمة المهام */}
              <TodoList />
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
