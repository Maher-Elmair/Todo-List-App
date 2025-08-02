import { useState, useContext, useEffect, useMemo } from "react";
import {
  Container,
  Card,
  CardContent,
  Button,
  Typography,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import Todo from "./Todo";
import { TodosContext } from "../contexts/todosContext";
import { useToast } from "../contexts/ToastContext";

// ✅ المكون الرئيسي لقائمة المهام
export default function TodoList() {
  // 🧠 جلب المهام من الـ Context
  const { todos, setTodos } = useContext(TodosContext);
  const { showHideToast } = useToast();

  // 🧪 تعريف حالات التحكم
  const [dialogTodo, setDialogTodo] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");
  
  // ✅ استخدام useMemo لتقليل عمليات الفلترة الزائدة أثناء إعادة التصيير
  const completedTodos = useMemo(() => {
    return todos.filter((t) => t.isCompleted);
  }, [todos]);

  const notCompletedTodos = useMemo(() => {
    return todos.filter((t) => !t.isCompleted);
  }, [todos]);

  // 🔁 تحديد المهام التي سيتم عرضها حسب نوع الفلترة
  let todosToBeRendered = todos;
  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRendered = notCompletedTodos;
  }

  // 📦 تحميل المهام من localStorage عند أول تحميل للصفحة
  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    if (storageTodos) {
      setTodos(storageTodos);
    }
  }, []);

  // 🔁 تغيير نوع المهام المعروضة (فلترة)
  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }

  // ➕ إضافة مهمة جديدة
  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput(""); // إعادة تعيين الحقل بعد الإضافة
    showHideToast("تمت الإضافة بنجاح");
  }

  // 🧼 إظهار مربع حوار الحذف
  function openDeleteDialog(todo) {
    setDialogTodo(todo);
    setShowDeleteDialog(true);
  }

  // ❌ إغلاق مربع حوار الحذف
  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  // 🗑️ تأكيد الحذف
  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => t.id !== dialogTodo.id);
    setTodos(updatedTodos);
    setShowDeleteDialog(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    showHideToast("تم الحذف بنجاح");
  }

  // ✏️ إظهار مربع حوار التعديل
  function openUpdateDialog(todo) {
    setDialogTodo(todo);
    setShowUpdateDialog(true);
  }

  // ❌ إغلاق مربع حوار التعديل
  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }

  // ✅ تأكيد التعديل
  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id === dialogTodo.id) {
        return {
          ...t,
          title: dialogTodo.title,
          details: dialogTodo.details,
        };
      }
      return t;
    });

    setTodos(updatedTodos);
    setShowUpdateDialog(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    showHideToast("تم التحديث بنجاح");
  }

  // 🔁 إنشاء عناصر المهام
  const todosJsx = todosToBeRendered.map((t) => (
    <Todo
      key={t.id}
      todo={t}
      showDelete={openDeleteDialog}
      showUpdate={openUpdateDialog}
    />
  ));

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
            value={dialogTodo?.title}
            onChange={(e) =>
              setDialogTodo({ ...dialogTodo, title: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={dialogTodo?.details}
            onChange={(e) =>
              setDialogTodo({ ...dialogTodo, details: e.target.value })
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

      {/* 📋 واجهة المهام */}
      <Container maxWidth="sm">
        <Card
          sx={{
            minWidth: 275,
            maxHeight: "80vh",
            overflowY: "scroll",
          }}
        >
          <CardContent>
            {/* 🔠 عنوان الصفحة */}
            <Typography variant="h2" style={{ fontWeight: "bold" }}>
              مهامي
            </Typography>
            <Divider />

            {/* 🎛️ أزرار فلترة المهام */}
            <ToggleButtonGroup
              style={{ direction: "ltr", marginTop: "30px" }}
              value={displayedTodosType}
              exclusive
              onChange={changeDisplayedType}
              aria-label="text alignment"
              color="primary"
            >
              <ToggleButton value="non-completed">غير المنجز</ToggleButton>
              <ToggleButton value="completed">المنجز</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>

            {/* 📄 عرض المهام */}
            {todosJsx}

            {/* ➕ واجهة إضافة مهمة جديدة */}
            <Grid
              container
              spacing={2}
              columns={{ xs: 12 }}
              style={{ marginTop: "20px" }}
            >
              <Grid size={8}>
                <TextField
                  style={{ width: "100%" }}
                  label="عنوان المهمة"
                  variant="outlined"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                />
              </Grid>
              <Grid size={4}>
                <Button
                  style={{ width: "100%", height: "100%" }}
                  variant="contained"
                  onClick={handleAddClick}
                  disabled={titleInput.length === 0}
                >
                  إضافة
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
