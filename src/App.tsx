import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./navigation/AppLayout";

import TaskForm from "./Menus/TaskForm";
import Notification from "./Menus/Notification";
import Dashboard from "./Dashboard/Dashboard";

 
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from "react-hot-toast";
import TagFilter from "./Menus/TagFilter";

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
          <Route index path="/Notification" element={<Notification/>} /> 
          <Route index path="/TagFilter" element={<TagFilter/>} />  
          {/* <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/tasks/:id/edit" element={<TaskForm />} /> */}
        </Routes>
      </AppLayout>
    </BrowserRouter>
    <Toaster position="top-right" />
  </ThemeProvider>
  );
}


 