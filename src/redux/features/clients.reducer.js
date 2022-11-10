const initialState = {
  clients: [],
  loading: false,
  adding: false,
  deleting: false,
  error: null,
};

export const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "clients/fetch/fulfilled":
      return {
        ...state,
        loading: false,
        clients: action.payload.clients,

      };
    case "clients/fetch/rejected":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "clients/fetch/pending":
      return {
        ...state,
        loading: true,
      };
    case "clients/add/pending":
      return {
        ...state,
        adding: true,
      };
    case "clients/add/fulfilled":
      return {
        ...state,
        adding: false,
        clients: [...state.clients, action.payload.clients],
      };
    case "clients/add/rejected":
      return {
        ...state,
        adding: false,
        error: action.error,
      };
    case "clients/delete/pending":
      return {
        ...state,
        clients: state.clients.map((item) => {
          if (item._id === action.payload) {
            return {
              ...item,
              deleting: true,
            };
          }
          return item;
        }),
      };
    case "clients/delete/fulfilled":
      return {
        ...state,
        deleting: false,
        clients: state.clients.filter(
          (client) => client._id !== action.payload
        ),
      };
    case "clients/delete/rejected":
      return {
        ...state,
        error: action.error,
        deleting: false,
      };
    default:
      return state;
  }
};

export const loadClients = () => {
  return async (dispatch, getState) => {
    dispatch({ type: "clients/fetch/pending" });
    const state = getState();
    try {
      const res = await fetch("http://localhost:3003/clients", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.application.token}`,
        },
      });
      const json = await res.json();
      dispatch({ type: "clients/fetch/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "clients/fetch/rejected", error: e.toString() });
    }
  };
};

export const addClient = (data) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "clients/add/pending" });
    try {
      const res = await fetch("http://localhost:3003/clients", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.application.token}`,
        },
      });
      const json = await res.json();
      console.log(json);

      dispatch({ type: "clients/add/fulfilled", payload: json });
      dispatch({ type: "cars/add/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "clients/add/rejected", error: e.toString() });
    }
  };
};

export const deleteClient = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "clients/delete/pending", payload: id });
    try {
      await fetch(`http://localhost:3003/clients/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${state.application.token}`,
        },
      });

      dispatch({ type: "clients/delete/fulfilled", payload: id });
    } catch (e) {
      dispatch({ type: "clients/delete/rejected", error: e.toString() });
    }
  };
};
