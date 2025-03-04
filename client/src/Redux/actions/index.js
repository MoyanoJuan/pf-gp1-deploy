import axios from "axios";

const urlBase = "https://proyecto-final-gp1.herokuapp.com/";
const productos = "productos";
const categorias = "categorias";
const crear = "crear";
const admin = "admin/";
const ratings = "ratings/";
const pedido = "pedido/";
const usuario = "usuario/";

export function getProductos() {
  return async function (dispatch) {
    const data = JSON.parse(localStorage.getItem("productos"));

    if (data) {
      dispatch({ type: "GET_PRODUCTOS", payload: data });
    } else {
      const resp = await axios.get(`${urlBase}${productos}`);

      dispatch({ type: "GET_PRODUCTOS", payload: resp.data });
    }
  };
}

export function getProductosFiltrados(productosFiltrados) {
  return function (dispatch) {
    dispatch({ type: "GET_PRODUCTOS_FILTRADOS", payload: productosFiltrados });
  };
}

export function getDetail(id) {
  return function (dispatch) {
    axios(`${urlBase}producto/${id}`).then((res) =>
      dispatch({ type: "GET_DETAIL", payload: res.data })
    );
  };
}

export function clearDetail() {
  return function (dispatch) {
    dispatch({ type: "CLEAR_DETAIL" });
  };
}

export function getCategorias() {
  return async function (dispatch) {
    const resp = await axios.get(`${urlBase}${categorias}`);

    if (resp) {
      dispatch({ type: "GET_CATEGORIAS", payload: resp.data });
    }
  };
}

export function searchProduct(name) {
  return async function (dispatch) {
    const json = await axios.get(`${urlBase}${productos}?name=${name}`);

    return dispatch({
      type: "SEARCH_PRODUCTS",
      payload: json.data,
    });
  };
}

export function filtrarCategorias(payload) {
  return {
    type: "FILTRAR_CATEGORIAS",
    payload,
  };
}

export function getReviews(id) {
  return async function (dispatch) {
    const resp = await axios.get(`${urlBase}ratings/usuario/${id}`);

    if (resp) {
      dispatch({ type: "GET_REVIEWS", payload: resp.data });
    }
  };
}

export function getProductReviews(id) {
  return async function (dispatch) {
    const resp = await axios.get(`${urlBase}ratings/${id}`);

    if (resp) {
      dispatch({ type: "GET_PRODUCT_REVIEWS", payload: resp.data });
    }
  };
}

export function getAllReviews() {
  return async function (dispatch) {
    const resp = await axios.get(`${urlBase}ratings/`);

    if (resp) {
      dispatch({ type: "GET_ALL_REVIEWS", payload: resp.data });
    }
  };
}

export function deleteReview(id) {
  //habria que actualizar el estado de los reviews
  return async function (dispatch) {
    await axios.delete(`${urlBase}ratings/${id}`);
    return dispatch({ type: "DELETE_REVIEW", payload: id });
  };
}

export function postProducto(payload) {
  return async function (dispatch) {
    axios.post(`${urlBase}${admin}${crear}`, payload).then((res) => {
      dispatch({
        type: "POST_PRODUCTO",
        payload: res.data,
        categorias: payload.categorias,
      });
    });
  };
}

export function postPedido(body) {
  return function (dispatch) {
    axios.post(`${urlBase}${pedido}${crear}`, body).then((res) => {
      // dispatch({ type: "POST_PRODUCTO", payload: res.data });
      dispatch({ type: "POST_PEDIDO", payload: res.data });
    });
  };
}

export function putProducto(id, body) {
  return function (dispatch) {
    axios.put(`${urlBase}${admin}${id}`, body).then((res) => {
      dispatch({ type: "PUT_PRODUCTO", payload: res.data });
    });
  };
}

export function putPerfil(id, body) {
  return async function (dispatch) {
    await axios.put(`${urlBase}${admin}${usuario}${id}`, body);
    dispatch({ type: "PUT_PERFIL", payload: body });
  };
}

export function deleteProducto(id) {
  return function (dispatch) {
    axios.delete(`${urlBase}producto/${id}`).then((res) => {
      dispatch({ type: "DELETE_PRODUCTO", payload: res.data });
    });
  };
}

export function postCategoria(payload) {
  return async function (dispatch) {
    let json = await axios.post(`${urlBase}${categorias}/${crear}`, payload);

    //????????
    dispatch(getCategorias());
    return json;
  };
}

export function deleteCategoria(id) {
  return async function (dispatch) {
    await axios.delete(`${urlBase}${categorias}/${id}`);
    dispatch({ type: "DELETE_CATEGORIA", payload: id });
  };
}

export function postReviews(id, payload) {
  return async function (dispatch) {
    await axios.post(`${urlBase}${ratings}${crear}/${id}`, payload);

    return dispatch({
      type: "CREAR_REVIEW",
      payload,
    });
  };
}
export function enviarConsulta(payload) {
  return async function (dispatch) {
    await axios.post(`${urlBase}usuario/contacto`, payload);

    return dispatch({
      type: "ENVIAR_CONSULTA",
    });
  };
}

//?????????
export const setSort = (value) => (dispatch) => {
  dispatch({ type: "SET_SORT", payload: value });
};

export function setCarrito(carrito) {
  return function (dispatch) {
    dispatch({ type: "SET_CARRITO", payload: carrito });
  };
}

export function agregarCarrito(idProducto, cantidad) {
  return function (dispatch) {
    dispatch({ type: "AGREGAR_CARRITO", payload: { idProducto, cantidad } });
  };
}

export function restarCarrito(idProducto, cantidad) {
  return function (dispatch) {
    dispatch({ type: "RESTAR_CARRITO", payload: { idProducto, cantidad } });
  };
}

export function quitarItem(idProducto) {
  return function (dispatch) {
    dispatch({ type: "QUITAR_ITEM", payload: idProducto });
  };
}

//MOMENTO
export function getUser(mail) {
  return function (dispatch) {
    axios(`${urlBase}usuarios`).then((res) =>
      dispatch({ type: "GET_USER", payload: res.data, mail })
    );
  };
}

export function setUserInfo(user) {
  return function (dispatch) {
    dispatch({ type: "SET_USER", payload: user });
  };
}

//XD
export function getUsuarios() {
  return function (dispatch) {
    axios(`${urlBase}usuarios`).then((res) =>
      dispatch({ type: "GET_USUARIOS", payload: res.data })
    );
  };
}

export function postUsuario(body) {
  return function (dispatch) {
    axios
      .post(`${urlBase}crear`, body)
      .then((res) => dispatch({ type: "POST_USUARIO", payload: res.data }));
  };
}

export function changeUserMode(userInfo) {
  const user = { ...userInfo };

  user.visualizacion = user.visualizacion === "admin" ? "user" : "admin";

  return function (dispatch) {
    dispatch({
      type: "CHANGE_MODE",
      payload: user,
    });
  };
}

export function getPedidos() {
  return function (dispatch) {
    axios(`${urlBase}pedidos`).then((res) =>
      dispatch({ type: "GET_PEDIDOS", payload: res.data })
    );
  };
}

export function getPedidosUsuario(user) {
  return user
    ? function (dispatch) {
        axios(`${urlBase}pedidos`).then((res) =>
          dispatch({
            type: "GET_PEDIDOS_USUARIO",
            payload: res.data.filter((pedido) => pedido.usuarioId === user),
          })
        );
      }
    : () => {};
}

export function getDetalleEnvio(id) {
  return async function (dispatch) {
    const envio = await axios.get(`${urlBase}${pedido}${id}`);

    return dispatch({ type: "GET_DETALLE_ENVIO", payload: envio?.data });
  };
}

export function actualizarEstadoEnvio(id, payload, productos) {
  return async function (dispatch) {
    await axios
      .put(`${urlBase}${admin}${pedido}${id}`, { estado: payload.newEstado })
      .then((res) => {
        res.data.productos = productos;
        dispatch({ type: "ACTUALIZAR_ESTADO", payload: res.data });
      });
  };
}

export function getFavoritos(id) {
  return async function (dispatch) {
    const favoritos = await axios.get(`${urlBase}favoritos/wishlist/${id}`);

    dispatch({ type: "GET_FAVORITOS", payload: favoritos.data });
  };
}

export function añadirAFavoritos(productoFav) {
  return function (dispatch) {
    dispatch({ type: "AÑADIR_A_FAVORITOS", payload: productoFav });
  };
}

export function eliminarDeFavoritos(productoFav) {
  return function (dispatch) {
    dispatch({ type: "ELIMINAR_DE_FAVORITOS", payload: productoFav });
  };
}

export function enviarMail(userMail) {
  return async function (dispatch) {
    await axios.post(`${urlBase}usuario/confirmacion`, { mail: userMail });

    dispatch({ type: "ENVIAR_MAIL", payload: userMail });
  };
}

//????????
export function orderByStock(payload) {
  return { type: "ORDER_BY_STOCK", payload };
}

export function mailAdmin(userId, { newEstado }) {
  return async function (dispatch) {
    if (newEstado === "En preparación") {
      await axios.post(`${urlBase}usuario/confirmacion`, { userId: userId });
    }
    if (newEstado === "En camino") {
      await axios.post(`${urlBase}${admin}despachar`, { userId: userId });
    }
    if (newEstado === "En punto de entrega/poder del correo") {
      await axios.post(`${urlBase}${admin}correo`, { userId: userId });
    }
    if (newEstado === "Entregado") {
      await axios.post(`${urlBase}${admin}entrega`, { userId: userId });
    }

    dispatch({ type: "ENVIAR_MAIL" });
  };
}

export function deleteUsuario(id) {
  return async function (dispatch) {
    await axios.delete(
      `https://proyecto-final-gp1.herokuapp.com/usuario/${id}`
    );

    dispatch({ type: "DELETE_USUARIO", payload: id });
  };
}
