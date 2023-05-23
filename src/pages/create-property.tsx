import { useState } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { loadCompressedImg } from "utils/loadCompressedImg";
import Form from "components/common/Form";
import { PropertyImageProps } from "interfaces/properties";
import { FileType } from "interfaces/components";



export const CreateProperty = () => {
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

 loadCompressedImg (file,(img:any)=> setPropertyImage({
    name: file?.name,
    url: img as string,
  }))
  };

  const onFinishHandler = async (data: FieldValues) => {
    if (!propertyImage.name) alert("Please, load an image");

    await onFinish({
      ...data,
      photo: propertyImage.url,
      email: user.email,
    });
  };

  return (
    <Form
      type="Create"
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
