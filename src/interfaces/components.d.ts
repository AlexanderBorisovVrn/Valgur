import { ReactNode } from "react";
import {useForm} from '@pankod/refine-react-hook-form'
import { PropertyImageProps } from "./properties";
const { refineCore:{onFinish,formLoading},register,handleSubmit} = useForm();

export type CustomButtonProps = {
    type?:string;
    title:string;
    handleClick?:()=>void;
    backgroundColor:string;
    color:string;
    icon?:ReactNode;
    fullWidth?:boolean;
}

export interface IForm{
    type:'Create' | 'Edit';
    register:typeof register;
    onFinish:typeof onFinish;
    formLoading:typeof formLoading;
    handleSubmit:typeof handleSubmit;
    handleImageChange?:()=>void;
    onFinishHandler:()=>void
    propertyImage?:PropertyImageProps
}