import React, { useState } from "react";
import axios from "axios";
import AxiosWithAuth from "./axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    AxiosWithAuth()
    .put(`http://localhost:5000/api/colors/${colorToEdit.id}`,colorToEdit)
    .then(res => {
      console.log(res.data)
      updateColors(colors.map(el => {
        return el.id === colorToEdit.id ? {...el,...res.data} : el;
      }))
    })
    .catch(err => console.log(err));
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    console.log(color)
    AxiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => {
        console.log(res);
        updateColors(colors.filter(el => el.id !== color.id))
      })
      .catch(err => console.log(err));
  };

  const addColor = e => {
    e.preventDefault();
    AxiosWithAuth()
      .post('http://localhost:5000/api/colors',colorToAdd)
      .then(res => {
        console.log(res.data);
        colors.push(colorToAdd)
        updateColors(colors.map(el => el));
      })
      .catch(err => console.log(err));

    e.target.value ="";
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>

      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

      <form className="add" onSubmit={addColor} >
        <legend>Add color</legend>
        <label>
          color name:
            <input
            onChange={e =>
              setColorToAdd({ ...colorToAdd, color: e.target.value })
            }
            placeholder='color'
          />
        </label>
        <label>
          hex code:
            <input
            onChange={e =>
              setColorToAdd({
                ...colorToAdd,
                code: { hex: e.target.value }
              })
            }
            placeholder='hex'

          />
        </label>
        <div className="button-row">
          <button type="submit">Add</button>
        </div>
      </form>
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}

      
    </div>
  );
};

export default ColorList;
