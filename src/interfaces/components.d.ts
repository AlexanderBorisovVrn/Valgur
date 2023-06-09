import { ReactNode, CSSProperties } from "react";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";
import { PropertyImageProps } from "./properties";
const {
  refineCore: { onFinish },
  register,
  handleSubmit,
} = useForm();
import { Button, SxProps } from "@pankod/refine-mui";

export interface CustomButtonProps {
  type?: string;
  title: string;
  handleClick?: () => void;
  backgroundColor?: string;
  color?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
  style?: CSSProperties;
  disabled?:boolean
}

export type FileType = File | null


export interface IForm {
  type: "Create" | "Edit";
  formLoading: boolean;
  handleImageChange: (file: FileType) => void;
  onFinishHandler: (data: FieldValues) => void;
  propertyImage: T extends PropertyImageProps ? PropertyImageProps : undefined;
}

export interface IClosePrevImage extends PropertyImageProps{
  cb:IForm['handleImageChange']
}