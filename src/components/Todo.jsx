import {
  Card,
  Grid,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";

import {
  Check as CheckIcon,
  DeleteOutlineOutlined as DeleteIcon,
  ModeEditOutlineOutlined as EditIcon,
} from "@mui/icons-material";

import React, { useContext, useState } from "react";

import { TodosContext } from "../contexts/todosContext";
import { useToast } from "../contexts/ToastContext";

export default function Todo({ todo ,showDelete , showUpdate }) {
  const { todos, setTodos } = useContext(TodosContext);
  const { showHideToast } = useToast();


  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });

  // ✅ تحديث حالة الإنجاز للمهمة
  function handleCompleteClick() {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    setTodos(updatedTodos);
    // 📝 حفظ التعديلات في localStorage
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    showHideToast (" تم التعديل بنجاح")
  }

  // ✏️ عند الضغط على زر "تعديل"
  function handleUpdateClick() {
    showUpdate(todo);
  }

  // 🗑️ عند الضغط على زر "حذف"
  function handleDeleteClick() {
    showDelete(todo);
  }

  return (
    <>
     {/* Dialog الحذف المحلي القديم */}
      {/* Dialog التعديل المحلي القديم */}
      
      {/* 🧾 بطاقة عرض المهمة */}
      <Card
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: 5,
        }}>
        <CardContent>
          <Grid
            container
            spacing={2}
            columns={{ xs: 12 }}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* 📌 معلومات المهمة */}
            <Grid size={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {todo.details}
              </Typography>
            </Grid>

            {/* 🎛️ أزرار التحكم */}
            <Grid
              size={{ xs: 12, sm: 4 }}
              display="flex"
              justifyContent={{ xs: "center", sm: "space-around" }}
              alignItems="center"
              sx={{ mt: { xs: 2, sm: 0 }, gap: { xs: 2, sm: 0 } }}
            >
              {/* زر إنهاء المهمة */}
              <IconButton
                onClick={handleCompleteClick}
                className="iconButton"
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                }}
              >
                <CheckIcon />
              </IconButton>

              {/* زر التعديل */}
              <IconButton
                onClick={handleUpdateClick}
                className="iconButton"
                aria-label="edit"
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px",
                }}
              >
                <EditIcon />
              </IconButton>

              {/* زر الحذف */}
              <IconButton
                onClick={handleDeleteClick}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px",
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
