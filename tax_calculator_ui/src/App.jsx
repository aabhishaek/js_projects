import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import RootLayout from "./components/RootLayout";
import SalaryForm from "./components/SalaryForm";
import SalaryDetail from "./components/SalaryDetail";

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index:true,
          element: <SalaryForm />
        },
        {
          path: 'salarydetails',
          element: <SalaryDetail />
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App;
