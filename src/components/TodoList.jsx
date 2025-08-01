import * as React from "react";
import { useState, useContext, useEffect } from "react";
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
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
import { TodosContext } from "../contexts/todosContext";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  // ✅ مصفوفات الفلترة المحسوبة من todos مباشرة (وليس من التخزين المحلي)
  const completedTodos = todos.filter((t) => t.isCompleted);
  const notCompletedTodos = todos.filter((t) => !t.isCompleted);

  let todosToBeRendered = todos;

  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  // 🧱 تحويل قائمة المهام إلى عناصر JSX
  const todosJsx = todosToBeRendered.map((t) => <Todo key={t.id} todo={t} />);

  // ✅ تحميل المهام من Local Storage عند تحميل المكون لأول مرة
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    //السطر القادم يسبب خطاء في حالة عدم وجود بيانات في
    // ال localStorage ولهاذا تم  تفادي هذة المشكلو في الاسفل مع السطر بعد القادم
    //const storageTodos = JSON.parse(localStorage.getItem("todos"));

    //تحسين الكود عبر التحقق من وجود بيانات
    // في `localStorage` قبل محاولة تحميلها، لتفادي الأخطاء عند التشغيل الأول.
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];

    setTodos(storageTodos);
  }, [setTodos]); // ✅ كده التحذير هيختفي

  // ✅ تغيير نوع المهام المعروضة عند تغيير الفلتر
  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }

  // 🆕 عند الضغط على زر "إضافة" مهمة جديدة
  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };

    // 🔁 تحديث الحالة (state) والمصفوفة الجديدة
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);

    // 💾 حفظ المهام في Local Storage
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    // 🧼 تفريغ حقل الإدخال بعد الإضافة
    setTitleInput("");
  }

  return (
    <Container maxWidth="sm">
      <Card
        sx={{
          minWidth: 275,
          maxHeight: "80vh",
          overflowY: "scroll",
        }}
      >
        <CardContent>
          <Typography variant="h2" style={{ fontWeight: "bold" }}>
            مهامي
          </Typography>
          <Divider />

          {/* 🎛️ أزرار الفلترة */}
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

          {/* 📋 عرض المهام حسب الفلتر المختار */}
          {todosJsx}

          {/* ➕ إضافة مهمة جديدة */}
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
  );
}
