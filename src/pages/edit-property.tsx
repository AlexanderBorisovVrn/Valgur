import { useState } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";
import { useNavigate } from "@pankod/refine-react-router-v6";
import compression from "browser-image-compression";
import Form from "components/common/Form";
import { PropertyImageProps } from "interfaces/properties";
import { FileType } from "interfaces/components";

const imgCompressOpt = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

export const EditProperty = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const [propertyImage, setPropertyImage] = useState<PropertyImageProps>({
    name: "",
    url: "",
  });
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();

  const handleImageChange = (file: FileType) => {
    if (!file) {
      setPropertyImage({ name: "", url: "" });
      return;
    }

    const fileReader = new FileReader();
    compression(file as File, imgCompressOpt).then((compressed) => {
      fileReader.readAsDataURL(compressed);
      fileReader.onload = () => {
        setPropertyImage({
          name: file?.name,
          url: fileReader.result as string,
        });
      };
    });
  };

  const onFinishHandler = async (data: FieldValues) => {
    if (!propertyImage.name) {
      alert("Please, load an image");
      return;
    }

    await onFinish({
      ...data,
      photo: propertyImage.url,
      email: user.email,
    });
  };

  return (
    <Form
      type="Edit"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      propertyImage={propertyImage}
    />
  );
};
