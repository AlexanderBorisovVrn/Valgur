import { useState } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import {
  FieldValues,
  useForm,
  FormProvider,
} from "@pankod/refine-react-hook-form";
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
    <FormProvider {...methods}>
      <Form
        type="Edit"
        formLoading={formLoading}
        handleImageChange={handleImageChange}
        onFinishHandler={onFinishHandler}
        propertyImage={propertyImage}
      />
    </FormProvider>
  );
};
