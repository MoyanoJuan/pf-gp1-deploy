import axios from "axios";

const initialState = {
  productos: [],
  productosFiltrados: [],
  categorias: [],
  productosCopiados: [],
  detalle: {},
  reviews: [],
  carrito: [],
  user: false,
  userInfo: {},
  pedidos: [],
  pedidosUsuario: [],
  usuarios: [],
  detalleEnvio: {},
  favoritos: [],
  idPedido: 0,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_PRODUCTOS":
      return {
        ...state,
        productos: action.payload,
        productosFiltrados: action.payload,
      };

    case "GET_PRODUCTOS_FILTRADOS":
      return {
        ...state,
        productosFiltrados: action.payload,
      };

    case "SET_SORT":
      if (action.payload !== "DEFAULT") {
        const filteredAux = [...state.productosFiltrados];

        // eslint-disable-next-line
        filteredAux.sort((a, b) => {
          if (action.payload === "A-Z")
            return a.nombre.toLowerCase() > b.nombre.toLowerCase()
              ? 1
              : b.nombre.toLowerCase() > a.nombre.toLowerCase()
              ? -1
              : 0;
          if (action.payload === "Z-A")
            return a.nombre.toLowerCase() < b.nombre.toLowerCase()
              ? 1
              : b.nombre.toLowerCase() < a.nombre.toLowerCase()
              ? -1
              : 0;
          if (action.payload === "Highest SpoonScore") {
            return Number(a.precio) < Number(b.precio)
              ? 1
              : Number(b.precio) < Number(a.precio)
              ? -1
              : 0;
          }
          if (action.payload === "Lowest SpoonScore")
            return Number(a.precio) > Number(b.precio)
              ? 1
              : Number(b.precio) > Number(a.precio)
              ? -1
              : 0;
        });

        return {
          ...state,
          productosFiltrados: filteredAux,
        };
      }

      return {
        ...state,
        productosFiltrados: [...state.productos],
      };

    case "GET_CATEGORIAS":
      return {
        ...state,
        categorias: action.payload,
      };

    case "GET_USUARIOS":
      return {
        ...state,
        usuarios: action.payload,
      };

    case "GET_PEDIDOS":
      return {
        ...state,
        pedidos: action.payload,
      };

    case "GET_PEDIDOS_USUARIO":
      return {
        ...state,
        pedidosUsuario: action.payload,
      };

    case "DELETE_CATEGORIA":
      return {
        ...state,
        categorias: state.categorias.filter((c) => c.id !== action.payload),
      };

    case "GET_DETAIL":
      return {
        ...state,
        detalle: action.payload,
      };

    case "GET_FAVORITOS":
      return {
        ...state,
        favoritos: action.payload,
      };

    case "CLEAR_DETAIL":
      return {
        ...state,
        detalle: {},
      };

    case "SEARCH_PRODUCTS":
      return {
        ...state,
        productos: action.payload,
      };

    case "FILTRAR_CATEGORIAS":
      //?????
      const productos = state.productosCopiados;
      const productosConCategoria =
        action.payload === "all"
          ? productos
          : // eslint-disable-next-line
            productos.filter((e) => {
              let names = e.categorias.map((c) => c.name);
              if (names.includes(action.payload)) return e;
            });
      return {
        ...state,
        productos: productosConCategoria,
      };

    case "ORDENAR_POR_NOMBRE":
      //creo que no se usan
      const productosSorted =
        action.payload === "asc"
          ? state.productos.sort((a, b) => {
              if (a.nombre > b.nombre) return 1;
              if (b.nombre > a.nombre) return -1;
              return 0;
            })
          : state.productos.sort((a, b) => {
              if (a.nombre > b.nombre) return -1;
              if (b.nombre > a.nombre) return 1;
              return 0;
            });
      return {
        ...state,
        productos: productosSorted,
      };

    case "ORDENAR_POR_PRECIO":
      //creo que no se usan

      const productosPrecio =
        action.payload === "desc"
          ? state.productos.sort((a, b) => {
              if (a.precio > b.precio) return 1;
              if (b.precio > a.precio) return -1;
              return 0;
            })
          : state.productos.sort((a, b) => {
              if (a.precio > b.precio) return -1;
              if (b.precio > a.precio) return 1;
              return 0;
            });

      return {
        ...state,
        productos: productosPrecio,
      };

    case "CREAR_REVIEW":
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };

    case "GET_REVIEWS":
      return {
        ...state,
        reviews: action.payload,
      };
    case "GET_ALL_REVIEWS":
      return {
        ...state,
        reviews: action.payload,
      };

    case "GET_PRODUCT_REVIEWS":
      return {
        ...state,
        reviews: action.payload,
      };

    case "DELETE_REVIEW":
      return {
        ...state,
        reviews: state.reviews.filter((r) => r.id !== action.payload),
      };

    case "SET_CARRITO":
      return {
        ...state,
        carrito: action.payload,
      };

    case "AGREGAR_CARRITO":
      let addCarrito = [];

      if (state.carrito !== null) {
        addCarrito = [...state.carrito];
      }

      let indexCarritoAdd = state.carrito?.findIndex(
        (carrito) => Number(carrito.id) === Number(action.payload.idProducto)
      );

      if (indexCarritoAdd !== -1) {
        addCarrito[indexCarritoAdd].cantidad = action.payload.cantidad;

        return {
          ...state,
          carrito: addCarrito,
        };
      } else {
        const productoSeleccionado = state.productos.find(
          (producto) =>
            Number(producto.id) === Number(action.payload.idProducto)
        );

        return {
          ...state,
          carrito: [
            ...state.carrito,
            {
              id: productoSeleccionado.id,
              nombre: productoSeleccionado.nombre,
              precio: productoSeleccionado.precio,
              imagen: productoSeleccionado.imagen,
              cantidad: action.payload.cantidad,
            },
          ],
        };
      }

    case "RESTAR_CARRITO":
      var newCarrito = [...state.carrito];

      var indexCarrito = state.carrito.findIndex(
        (carrito) => Number(carrito.id) === Number(action.payload.idProducto)
      );

      if (indexCarrito !== -1) {
        newCarrito[indexCarrito].cantidad =
          newCarrito[indexCarrito].cantidad - 1;
        return {
          ...state,
          carrito: newCarrito,
        };
      } else {
        const productoSeleccionado = state.productos.find(
          (producto) =>
            Number(producto.id) === Number(action.payload.idProducto)
        );

        return {
          ...state,
          carrito: [
            ...state.carrito,
            {
              id: productoSeleccionado.id,
              nombre: productoSeleccionado.nombre,
              precio: productoSeleccionado.precio,
              imagen: productoSeleccionado.imagen,
              cantidad: action.payload.cantidad,
            },
          ],
        };
      }

    case "QUITAR_ITEM":
      const data = state.carrito?.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        carrito: data,
      };

    case "POST_PRODUCTO":
      let prodAux = [...state.productos];

      localStorage.removeItem("productos");

      action.payload.categoria = action.categorias;

      prodAux = prodAux.concat(action.payload);

      localStorage.setItem("productos", JSON.stringify(prodAux));

      return {
        ...state,
        productos: prodAux,
        productosFiltrados: prodAux,
      };

    case "PUT_PERFIL":
      return {
        ...state,
        usuarios: state.usuarios.map((u) => {
          if (u.id === action.payload.id) {
            return action.payload;
          }
          return u;
        }),
      };

    case "PUT_PRODUCTO":
      const prods = [...state.productosFiltrados];

      localStorage.removeItem("productos");

      // eslint-disable-next-line
      prods.find((prod) => {
        if (prod.id === action.payload.id) {
          if (action.payload.nombre) {
            prod.nombre = action.payload.nombre;
          }
          if (action.payload.precio) {
            prod.precio = action.payload.precio;
          }
          if (action.payload.descripcion) {
            prod.descripcion = action.payload.descripcion;
          }
          if (action.payload.imagen) {
            prod.imagen = action.payload.imagen;
          }
          if (action.payload.stock) {
            prod.stock = action.payload.stock;
          }

          if (action.payload.categorias) {
            prod.categoria = action.payload.categorias;
          }
        }
      });

      localStorage.setItem("productos", JSON.stringify(prods));

      return {
        ...state,
        productos: prods,
        productosFiltrados: prods,
      };

    case "DELETE_PRODUCTO":
      let productosAux = [...state.productosFiltrados];

      const index = productosAux.findIndex((producto) => {
        return producto.id === Number(action.payload);
      });

      localStorage.removeItem("productos");

      productosAux = productosAux
        .slice(0, index)
        .concat(productosAux.slice(index + 1));

      localStorage.setItem("productos", JSON.stringify(productosAux));

      return {
        ...state,
        productos: state.productos.filter(
          (producto) => producto.id !== Number(action.payload)
        ),
        productosFiltrados: productosAux,
      };

    case "GET_USER":
      // eslint-disable-next-line
      const usuario = action.payload.find((usuario) => {
        if (usuario.mail === action.mail) {
          return usuario.isAdmin;
        }
      });

      const admin = usuario === undefined ? false : usuario.isAdmin;

      return {
        ...state,
        user: admin,
      };

    case "SET_USER":
      return {
        ...state,
        userInfo: action.payload,
      };

    case "CHANGE_MODE":
      return {
        ...state,
        userInfo: action.payload,
      };

    case "GET_DETALLE_ENVIO":
      return {
        ...state,
        detalleEnvio: action.payload,
      };

    case "ACTUALIZAR_ESTADO":
      return {
        ...state,
        detalleEnvio: action.payload,
      };

    case "AÑADIR_A_FAVORITOS":
      const idProducto = action.payload.id;
      const idUsuario = state.userInfo.uid;

      //???????????
      const favorites = axios.get(
        `https://proyecto-final-gp1.herokuapp.com/favoritos/wishlist/${idUsuario}`
      );

      if (
        favorites.data &&
        favorites.data.find((fav) => fav.id === state.productos.id)
      ) {
      } else {
        console.log("uwu");
        axios.post(
          "https://proyecto-final-gp1.herokuapp.com/favoritos/wishlist",
          {
            idProducto: idProducto,
            idUsuario: idUsuario,
          }
        );
      }

      const newFavorites = [...state.favoritos, action.payload];
      return {
        ...state,
        favoritos: newFavorites,
      };

    case "ELIMINAR_DE_FAVORITOS":
      const idProductoEliminar = action.payload;
      const idUsuarioEliminar = state.userInfo.uid;

      const favoritosFiltrados = state.favoritos.filter(
        (e) => e.id !== action.payload
      );

      axios.delete(
        "https://proyecto-final-gp1.herokuapp.com/favoritos/wishlist",
        {
          data: {
            idUsuario: idUsuarioEliminar,
            idProducto: idProductoEliminar,
          },
        }
      );

      return {
        ...state,
        favoritos: favoritosFiltrados,
      };

    case "POST_PEDIDO":
      let pedidosAux = [...state.pedidos];

      pedidosAux = pedidosAux.concat(action.payload);

      return {
        ...state,
        pedidos: pedidosAux,
        idPedido: action.payload.id,
      };

    case "ORDER_BY_STOCK": {
      let sortStock =
        action.payload === "Menor a Mayor"
          ? state.productos.sort((a, b) => {
              if (a.stock > b.stock) return 1;
              if (a.stock < b.stock) return -1;
              return 0;
            })
          : state.productos.sort((a, b) => {
              if (a.stock > b.stock) return -1;
              if (a.stock < b.stock) return 1;
              return 0;
            });

      return { ...state, productos: sortStock };
    }

    case "POST_USUARIO":
      let usuariosAux = [...state.usuarios];

      usuariosAux = usuariosAux.concat(action.payload);
      return {
        ...state,
        usuarios: usuariosAux,
      };

    case "DELETE_USUARIO":
      let usuariosDeleted = [...state.usuarios];

      usuariosDeleted = usuariosDeleted.filter((usuario) => {
        return usuario.id !== action.payload;
      });

      return {
        ...state,
        usuarios: usuariosDeleted,
      };

    default:
      return state;
  }
}
