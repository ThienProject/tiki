import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDInput from "components/MDInput";
import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Paper, Select } from "@mui/material";
import MDButton from "components/MDButton";
import typeController from "apiServices/typeService";
import colorController from "apiServices/colorService";
import * as productContainer from "apiServices/productService";
import { useSelector } from "react-redux";
import PickImages from "./components/PickImages";

function NewProduct() {
  const idUser = useSelector((state) => state.auth.user.id_user);
  const [selectColors, setSelectColors] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [types, setTypes] = useState([]);
  const [colors, setColors] = useState([]);
  const [typeSelected, setTypeSelected] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  useEffect(async () => {
    const result = await typeController();
    const result2 = await colorController();
    setTypes(result);
    setTypeSelected(result[0].id_type);
    setColors(result2);
  }, []);
  const handleSetColorImage = (images) => {
    setSelectColors(images);
  };
  const handleUpdatedImg = (e) => {
    const file = e.target.files[0];
    const url = window.URL.createObjectURL(file);
    setSelectedImage(file);
    // console.log(file, url);
    setImageUrl(url);
  };

  const handleSubmitData = () => {
    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("image_main", selectedImage);
    formData.append("description", descriptions);
    formData.append("type", typeSelected);
    formData.append("price", price);
    // formData.append("colors", JSON.stringify(selectColors));
    formData.append("id_shop", idUser);
    for (let i = 0; i < selectColors.length; i += 1) {
      const color = selectColors[i];
      formData.append(`colors[id_color]`, color.idColor);
      formData.append(`colors[image]`, color.image);
      // formData.append(`colors`, color.image);
    }
    formData.forEach((key, value) => {
      console.log(key, value);
    });
    console.log(selectColors);
    const fetchApi = async () => {
      const result = await productContainer.createProduct(formData);
      console.log(result);
    };
    fetchApi();
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Add New Product
                </MDTypography>
              </MDBox>
              <MDBox width="100%" p={3} mt={1}>
                <MDInput
                  fullWidth
                  type="text"
                  label="Product Name"
                  value={productName}
                  onChange={(e) => {
                    setProductName(e.target.value);
                  }}
                />
              </MDBox>
              <MDBox width="100%" p={3} pt={0} mt={1}>
                <MDInput
                  fullWidth
                  type="number"
                  label="Price"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value.trim());
                  }}
                />
              </MDBox>
              <MDBox width="100%" p={3} pt={0} mt={1}>
                <MDInput
                  fullWidth
                  type="text"
                  label="Description"
                  value={descriptions}
                  onChange={(e) => {
                    setDescriptions(e.target.value);
                  }}
                />
              </MDBox>
              <MDBox width="100%" p={3} pt={0} mt={1}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Product Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    value={typeSelected}
                    sx={{ pt: 1, pb: 1 }}
                    onChange={(e) => {
                      setTypeSelected(e.target.value);
                    }}
                  >
                    {types?.map((type) => (
                      <MenuItem key={type.id_type} value={type.id_type}>
                        {type.type_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBox>
              <MDBox width="100%" p={3} pt={0} mt={1}>
                <input
                  accept="image/*"
                  type="file"
                  id="select-image"
                  style={{ display: "none" }}
                  onChange={handleUpdatedImg}
                />
                <InputLabel htmlFor="select-image">
                  <MDButton variant="contained" color="primary" component="span">
                    Main Image
                  </MDButton>
                </InputLabel>
                {imageUrl && selectedImage && (
                  <MDBox mt={1} textAlign="left">
                    <img src={imageUrl} alt={selectedImage.name} height="100px" />
                  </MDBox>
                )}
              </MDBox>
              <MDBox width="100%" p={3} pt={0} mt={1}>
                <Paper>
                  <MDTypography ml={1} variant="h8">
                    Color
                  </MDTypography>
                  <MDBox pt={0} mt={0} pb={3} pl={1}>
                    <PickImages
                      type="color"
                      listForType={colors}
                      imageList={selectColors}
                      onImageSelect={(images) => {
                        handleSetColorImage(images);
                      }}
                    />
                  </MDBox>
                </Paper>
              </MDBox>
              <MDBox
                mb={2}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <MDButton
                  variant="gradient"
                  color="success"
                  onClick={() => {
                    if (!selectedImage || !productName.trim() || price <= 0) {
                      alert("Please select full data");
                    } else {
                      // console.log(
                      //   "color array : ",
                      //   selectColors,
                      //   "imageUrl : ",
                      //   selectedImage,
                      //   "type : ",
                      //   typeSelected
                      // );
                      handleSubmitData();
                    }
                  }}
                >
                  Submit
                </MDButton>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
export default NewProduct;
