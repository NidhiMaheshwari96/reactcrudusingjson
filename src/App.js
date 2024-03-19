import "./App.css";
import Index from "./component";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Router } from "./Router";

function App() {
  const router = createBrowserRouter(Router);
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
      {/* <Index /> */}
    </div>
  );
}

export default App;
