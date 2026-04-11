import { HashRouter, RouterProvider } from "react-router";
import router from "./routes";
import './App.css'


function App() {

  return (
    <HashRouter>
      <RouterProvider router={router} />
    </HashRouter>
  )

}

export default App
