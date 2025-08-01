import {
  Card,
  Grid,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

import {
  Check as CheckIcon,
  DeleteOutlineOutlined as DeleteIcon,
  ModeEditOutlineOutlined as EditIcon,
} from "@mui/icons-material";

import React, { useContext, useState } from "react";

import { TodosContext } from "../contexts/todosContext";

export default function Todo({ todo }) {
  const { todos, setTodos } = useContext(TodosContext);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
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
  }

  // ✏️ عند الضغط على زر "تعديل"
  function handleUpdateClick() {
    setShowUpdateDialog(true);
  }

  // ❌ إغلاق مربع حوار الحذف
  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  // ❌ إغلاق مربع حوار التعديل
  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }

  // ❌ عند الضغط على زر "حذف"
  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }

  // 🗑️ تأكيد الحذف
  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => t.id !== todo.id);
    setTodos(updatedTodos);
    setShowDeleteDialog(false);
    // 📝 حفظ التعديلات في localStorage
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  // ✅ تأكيد التعديل
  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return {
          ...t,
          title: updatedTodo.title,
          details: updatedTodo.details,
        };
      }
      return t;
    });
    setTodos(updatedTodos);
    setShowUpdateDialog(false);
    // 📝 حفظ التعديلات في localStorage
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  return (
    <>
      {/* 🗨️ مربع حوار تأكيد الحذف */}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handleDeleteDialogClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل أنت متأكد من رغبتك في حذف المهمة؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد إتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>إغلاق</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            نعم، قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* 📝 مربع حوار تعديل المهمة */}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handleUpdateClose}
        open={showUpdateDialog}
        aria-labelledby="edit-dialog-title"
      >
        <DialogTitle id="edit-dialog-title">تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) =>
              setUpdatedTodo({ ...updatedTodo, title: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e) =>
              setUpdatedTodo({ ...updatedTodo, details: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>إغلاق</Button>
          <Button onClick={handleUpdateConfirm} autoFocus>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>

      {/* 🧾 بطاقة عرض المهمة */}
      <Card
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: 5,
        }}
      >
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
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
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
                aria-label="delete"
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
