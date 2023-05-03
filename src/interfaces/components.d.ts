import { ReactNode } from "react";
import {FieldValues, useForm} from '@pankod/refine-react-hook-form'
import { PropertyImageProps } from "./properties";
const { refineCore:{onFinish},register,handleSubmit} = useForm();

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
    formLoading:boolean;
    handleSubmit:typeof handleSubmit;
    handleImageChange:(file:File)=>void;
    onFinishHandler:(data:FieldValues)=>void
    propertyImage?:PropertyImageProps
}