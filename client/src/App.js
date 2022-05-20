import "./App.css";
import {
  Home,
  Tienda,
  Blog,
  Cuenta,
  Carrito,
  CrearProducto,
  NavBar,
  Login,
} from "./Components/index";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <NavBar />
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/tienda" element={<Tienda />} />
          <Route exact path="/tienda/:id" element={"Detalles"} />
          <Route exact path="/carrito" element={<Carrito />} />
          <Route exact path="/blog" element={<Blog />} />
          <Route exact path="/usuario" element={<Cuenta />} />
          <Route exact path="/admin" element={"admin"} />
          <Route exact path="/admin/crear" element={<CrearProducto />} />
          <Route exact path="/login" element={<Login />} />
          {/*<Route exact path="/user/reviews" element={"user reviews"} />
        <Route exact path="/admin/cambiar/:id" element={"change something"} />*/}
        </Routes>
      </div>
    </div>
  );
}

export default App;
