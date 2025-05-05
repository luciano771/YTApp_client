import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./navigation/AppLayout";

import TaskForm from "./Menus/TaskForm";
import TasksList from "./Menus/TasksList";
import Dashboard from "./Dashboard/Dashboard";

 
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route index path="/" element={<Dashboard />} />
          <Route index path="/menus" element={<TasksList />} /> 
          <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/tasks/:id/edit" element={<TaskForm />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  </ThemeProvider>
  );
}


 