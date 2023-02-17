import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import ViewImage from "./ViewImage";

function PickImages({ imageList, type, listForType, onImageSelect }) {
  const [images, setImages] = useState(imageList);
  const handleImageSelect = (selectedImage, selectedIdType, index) => {
    setImages((prevImages) => {
      const updateImages = [...prevImages];
      const newImgObj = updateImages[index];
      newImgObj[Object.keys(newImgObj)[0]] = selectedIdType;
      newImgObj[Object.keys(newImgObj)[1]] = selectedImage;
      return updateImages;
    });
    onImageSelect(images);
  };
  const handleSubtractImages = (index) => {
    setImages((prevImages) => {
      const updateImages = [...prevImages];
      updateImages.splice(index, 1);
      return updateImages;
    });
    onImageSelect(images);
  };
  useEffect(() => {
    // console.log(images);
  }, [images]);
  return (
    <MDBox>
      {images.map((image, index) => (
        <ViewImage
          key={image.keyIndex}
          inputId={index}
          type={type}
          listForType={listForType}
          onSelect={(selectedIdType, selectedImage) => {
            handleImageSelect(selectedImage, selectedIdType, index);
          }}
          onSubtract={() => {
            handleSubtractImages(index);
          }}
          image={image}
        />
      ))}
      <MDBox mt={2}>
        <MDButton
          color="info"
          onClick={() => {
            setImages([...images, { idColor: null, image: null, keyIndex: images.length }]);
          }}
        >
          Add New Color
        </MDButton>
      </MDBox>
    </MDBox>
  );
}

PickImages.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.any.isRequired),
  type: PropTypes.string,
  listForType: PropTypes.arrayOf(PropTypes.any.isRequired),
  onImageSelect: PropTypes.func,
};
PickImages.defaultProps = {
  imageList: [],
  type: "color",
  listForType: [],
  onImageSelect: null,
};
export default PickImages;
