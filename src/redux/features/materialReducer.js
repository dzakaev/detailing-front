const initialState = {
  materials: [],
  loading: false,
  adding: false,
  editing: false,
  admission: false,
};

export const materialReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MATERIALS_LOAD/FULFILLED":
      return {
        ...state,
        materials: action.payload.materials,
        loading: false,
      };
    case "new_material/pending":
      return {
        ...state,
        adding: true,
      };
    case "NEW_MATERIAL/fulfilled":
      return {
        ...state,
        adding: false,
        materials: [action.payload.material, ...state.materials],
      };
    case "delete_material/pending":
      return {
        ...state,
        materials: state.materials.map(item => {
          if (item._id === action.payload) {
            return {
              ...item,
              deleting: true
            }
          }
          return item
        })
      }
    case "DELETE_MATERIAL/fulfilled":
      return {
        ...state,
        deleting: false,
        materials: state.materials.filter(
          (item) => item._id !== action.payload
        ),
      };
    case "admission/pending":
      return {
        ...state,
        admission: true,
      };
    case "ADMISSION":
      return {
        ...state,
        admission: false,
        materials: [action.payload.material, ...state.materials]
      }
    case "admission/rejected":
      return {
        ...state,
        admission: false,
        error: action.error,
      };
    case "edit/pending":
      return {
        ...state,
        editing: true
      }
    case "EDIT":
      return {
        ...state,
        editing: false,
        materials: state.materials.map((edit) => {
          if (edit._id === action.payload.materials._id) {
            return action.payload.materials;
          }
          return edit;
        }),
      };
    default:
      return state;
  }
};
