export const loadMaterial = () => {
  return async (dispatch) => {
    const res = await fetch("http://localhost:3003/materials", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const json = await res.json();
    if (res.ok) {
      dispatch({ type: "MATERIALS_LOAD/FULFILLED", payload: json });
    }
  };
};

export const newMaterial = ({ name, volumeType, price }) => {
  return async (dispatch) => {
    dispatch({ type: "new_material/pending" });
    const res = await fetch("http://localhost:3003/materials", {
      method: "POST",
      body: JSON.stringify({
        name,
        volumeType,
        price,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const json = await res.json();
    dispatch({ type: "NEW_MATERIAL/fulfilled", payload: json });
  };
};

export const deleteMaterial = (id) => {
  return async (dispatch) => {
    dispatch({ type: "delete_material/pending" });
    await fetch(`http://localhost:3003/materials/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch({ type: "DELETE_MATERIAL/fulfilled", payload: id });
  };
};

export const admission = (id, volume) => {
  return async (dispatch) => {
    dispatch({ type: "admission/pending", payload: id });
    try {
      const res = await fetch(
        `http://localhost:3003/materials/${id}/admission`,
        {
          method: "POST",
          body: JSON.stringify({volume: Number(volume)}),
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(volume)
      const json = await res.json();
      dispatch({ type: "ADMISSION/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "admission/rejected", error: e.toString() });
    }
  };
};

export const editMaterial = (id, name, price) => {
  const editInfo = {
    name,
    price,
  };
  return async (dispatch) => {
    dispatch({ type: "edit/pending", payload: id });
    const res = await fetch(`http://localhost:3003/materials/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(editInfo),
    });
    const json = await res.json();
    dispatch({ type: "EDIT", payload: json });
  };
};
