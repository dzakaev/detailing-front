const initialState = {
  services: [],
  datess: [],
  error: null,
  loading: false,
  adding: false,
  editing: false
};

export const servicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SERVICESBYDATE_PENDING":
      return {
        ...state,
        loading: true
      };
    case "GET_SERVICESBYDATE_REJECTED":
      return {
        ...state,
        error: action.message
      };
    case "GET_SERVICESBYDATE_FULFILLED":
      return{
        ...state,
        services: action.payload.services,
        loading: false,
      };
    case "ADD_SERVICE_PENDING":
      return {
        ...state,
        adding: true,
      };
    case "ADD_SERVICES_REJECTED":
      return {
        ...state,
        error: action.message,
      };
    case "ADD_SERVICE_FULFILLED":
      return {
        ...state,
        services: [...state.services, action.payload.result],
        adding: false,
      };
    case "services/fetch/loading":
      return {
        ...state,
        loading: true,
      };
    case "services/fetch/fulfilled":
      return {
        ...state,
        loading: false,
        services: action.payload.services,
      };
    case "services/fetch/rejected":
      return {
        ...state,
        error: action.error,
      };
    case "DELETE_SERVICE_PENDING":
      return {
        ...state,
        deleting: true,
      };
    case "DELETE_SERVICE_FULFILLED":
      return {
        ...state,
        deleting: false,
        services: state.services.filter((item) => item._id !== action.payload),
      };
    case "DELETE_SERVICE_REJECTED":
      return {
        ...state,
        error: action.error,
      };
    case "EDIT_SERVICE_PENDING":
      return {
        ...state,
        editing: true,
      }
    case "EDIT_SERVICE_REJECTED":
      return {
        ...state,
        error: action.error
      }
    case "EDIT_SERVICE_FULFILLED":
      return {
        ...state,
        editing: false,
        services: state.services.map(service => {
          if(service._id === action.payload.result._id) {
            return action.payload.result
          }
          return service
        })
      }
    default:
      return state;
  }
};

export const getServicesByDate = (periods) => {
   return async (dispatch) => {
     dispatch({ type: "GET_SERVICESBYDATE_LOADING" });
     try {
       console.log("xonnwnxnx")
       const res = await fetch(`http://localhost:3003/services?periodStart=${periods[0]}&periodEnd=${periods[1]}`, {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`
         }
       })
       const json = await res.json();
       dispatch({ type: "GET_SERVICESBYDATE_FULFILLED", payload:json })
     }catch (e) {
       dispatch({ type: "GET_SERVICESBYDATE_REJECTED", error: e.message})
     }
   }

};

export const loadServices = () => {
  return async (dispatch) => {
    dispatch({ type: "services/fetch/loading" });
    try {
      const res = await fetch("http://localhost:3003/services", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const json = await res.json();
      dispatch({ type: "services/fetch/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "services/fetch/rejected", error: e.message });
    }
  };
};

export const addService = (data) => {
  return async (dispatch) => {
    dispatch({ type: "ADD_SERVICE_PENDING" });
    try {
      const res = await fetch("http://localhost:3003/services", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const json = await res.json();
      dispatch({ type: "ADD_SERVICE_FULFILLED", payload: json });
    } catch (e) {
      dispatch({ type: "ADD_SERVICE_REJECTED", error: e.message });
    }
  };
};

export const deleteService = (id) => {
  return async (dispatch) => {
    dispatch({ type: "DELETE_SERVICE_PENDING" });
    try {
      await fetch(`http://localhost:3003/services/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch({ type: "DELETE_SERVICE_FULFILLED", payload: id });
    } catch (e) {
      dispatch({ type: "DELETE_SERVICE_REJECTED", error: e.message });
    }
  };
};

export const editService = (id, name, cost) => {
  return async (dispatch) => {
    dispatch({ type: "EDIT_SERVICE_PENDING" });
    const editJournal = {
      name,
      cost,
    }
    try {
      const res = await fetch(`http://localhost:3003/services/${id}`,{
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editJournal),
      });
      const json = await res.json()
      console.log(json)
      dispatch ({ type: "EDIT_SERVICE_FULFILLED", payload: json })
    }catch (e) {
      dispatch ({ type: "EDIT_SERVICE_REJECTED", error: e.message})
    }
  }
}
