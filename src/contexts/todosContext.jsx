import { useReducer, createContext, useContext } from "react";
import todosReducer from "../reducers/todosReducer";

// 1️⃣ إنشاء السياق الرئيسي
export const TodosContext = createContext([]);
export const DispatchContext = createContext(null);

// 2️⃣ إنشاء المزود (Provider)
const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todosReducer, []);
  return (
    <TodosContext.Provider value={todos}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </TodosContext.Provider>
  );
};

// 3️⃣ هوك مخصص للوصول إلى السياق بسهولة
export const useTodos = () => {
  return useContext(TodosContext);
};
export const useTodosDispatch = () => {
  return useContext(DispatchContext);
};

// 4️⃣ تصدير المزود
export default TodosProvider;
