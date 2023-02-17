import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import { useState, useEffect, useRef } from "react";
import { PropTypes } from "prop-types";
import { InputLabel, NativeSelect, FormControl, IconButton, Paper } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { pink } from "@mui/material/colors";

function ViewImage({ image, type, listForType, inputId, onSelect, onSubtract }) {
  const [selectedObject, setSelectedObject] = useState(image);
  const [imgUrl, setImgUrl] = useState();
  const selectedRef = useRef();
  useEffect(() => {
    if (image?.image) {
      const url = window.URL.createObjectURL(image.image);
      setImgUrl(url);
      return () => window.URL.revokeObjectURL(imgUrl);
    }
    return null;
  }, [image]);
  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    const url = window.URL.createObjectURL(file);
    const idType = selectedObject[Object.keys(selectedObject)[0]];
    setSelectedObject({ ...selectedObject, image: file });
    setImgUrl(url);
    onSelect(idType, file);
  };
  const handleChangeSelection = (e) => {
    const idType = e.target.value;
    const imageFile = selectedObject[Object.keys(selectedObject)[1]];
    const data = { ...selectedObject };
    data[Object.keys(data)[0]] = idType;
    setSelectedObject(data);
    onSelect(idType, imageFile);
    // console.log(data);
  };

  useEffect(() => {
    const selected = selectedRef.current;
    const idType = selected.value;
    const imageFile = selectedObject[Object.keys(selectedObject)[1]];
    const data = { ...selectedObject };
    data[Object.keys(data)[0]] = idType;
    setSelectedObject(data);
    onSelect(idType, imageFile);
    // console.log(data, selected.value);
  }, [image]);
  return (
    <Paper
      variant="outlined"
      style={{
        padding: 0,
        margin: "10px 50px",
        marginBottom: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <MDBox m={1} width="50%" textAlign="left">
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            {`Pick ${type}`}
          </InputLabel>
          <NativeSelect
            defaultValue={30}
            inputProps={{
              name: type,
              id: `select-${type}-${inputId}`,
              ref: selectedRef,
            }}
            onChange={handleChangeSelection}
          >
            {listForType.map((item) => (
              <option key={item[Object.keys(item)[0]]} value={item[Object.keys(item)[0]]}>
                {item[Object.keys(item)[1]]}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
        <MDInput
          accept="image/*"
          type="file"
          id={`selectImg${type + inputId}`}
          style={{ display: "none" }}
        />
        <MDBox mt={1}>
          <IconButton component="label">
            <input onChange={handleChangeImage} hidden accept="image/*" type="file" />
            <AddPhotoAlternateIcon />
          </IconButton>
        </MDBox>
        {imgUrl && (
          <MDBox mt={1} textAlign="left">
            <img height="100px" src={imgUrl} alt="Selected" />
          </MDBox>
        )}
      </MDBox>
      <MDBox mt={1}>
        <IconButton component="label" onClick={() => onSubtract()}>
          <DeleteForeverOutlinedIcon sx={{ color: pink[500] }} />
        </IconButton>
      </MDBox>
    </Paper>
  );
}
ViewImage.propTypes = {
  image: PropTypes.objectOf(PropTypes.any),
  inputId: PropTypes.string && PropTypes.number,
  type: PropTypes.string,
  listForType: PropTypes.arrayOf(PropTypes.any),
  onSelect: PropTypes.func,
  onSubtract: PropTypes.func,
};
ViewImage.defaultProps = {
  image: {},
  inputId: 0,
  type: null,
  listForType: [],
  onSelect: null,
  onSubtract: null,
};
export default ViewImage;
