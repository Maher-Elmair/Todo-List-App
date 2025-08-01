// App.jsx
import "./App.css";
import { useState } from "react";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosContext } from "./contexts/todosContext";
import { v4 as uuidv4 } from "uuid";

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
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          background: "#191b1f",
          height: "100vh",
          direction: "rtl",
        }}
      >
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
