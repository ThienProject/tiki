/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getProductLimit } from "apiServices/productService";

export default function data() {
  const user = useSelector((state) => state.auth.user);
  const idUser = user?.id_user;
  const [products, setProducts] = useState([]);
  useEffect(async () => {
    if (idUser) {
      const newProducts = await getProductLimit(0, "all", idUser, "products");
      setProducts((prev) => [...prev, ...newProducts]);
    }
  }, []);
  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar
        src={image}
        name={name.length > 20 ? `${name.slice(0, 20)}...` : name}
        size="sm"
        variant="rounded"
      />
      <MDTypography
        display="block"
        wordwrap="break-word"
        variant="button"
        fontWeight="medium"
        ml={1}
        lineHeight={1}
      >
        {name.length > 40 ? `${name.slice(0, 40)}...` : name}
      </MDTypography>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      { Header: "project", accessor: "project", width: "30%", align: "left" },
      { Header: "budget", accessor: "budget", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "completion", accessor: "completion", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows: products.map((product) => ({
      project: <Project image={product.image} name={product.product_name} />,
      budget: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {product.price}
        </MDTypography>
      ),
      status: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {product.status}
        </MDTypography>
      ),
      completion: <Progress color="info" value={60} />,
      action: (
        <MDTypography component="a" href="#" color="text">
          <Icon>more_vert</Icon>
        </MDTypography>
      ),
    })),
  };
}
