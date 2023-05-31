import { useState } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import {
  FieldValues,
  useForm,
  FormProvider,
} from "@pankod/refine-react-hook-form";
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
  ...methods
  } = useForm();

  const handleImageChange = (file: FileType) => {
    if (!file) {
      setPropertyImage({ name: "", url: "" });
      return;
    }

    loadCompressedImg(file, (img: any) =>
      setPropertyImage({
        name: file?.name,
        url: img as string,
      })
    );
  };

  const onFinishHandler = async (data: FieldValues) => {
    if (!propertyImage.name) alert("Please, load an image");
    console.log(data)
    await onFinish({
      ...data,
      location:JSON.stringify(data.location),
      photo: propertyImage.url,
      email: user.email,
    });
  };

  return (
    <FormProvider {...methods}>
      <Form
        type="Create"
        formLoading={formLoading}
        handleImageChange={handleImageChange}
        onFinishHandler={onFinishHandler}
        propertyImage={propertyImage}
      />
    </FormProvider>
  );
};
