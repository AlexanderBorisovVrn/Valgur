import { BaseKey } from '@pankod/refine-core'
import { ReactNode } from 'react'

export interface IAgentCardProp {
    id?: BaseKey | undifined,
    name: string,
    email: string,
    avatar: string,
    noOfProperties: number
}

export interface IInfoBarProp{
    icon:ReactNode,
    name:string
}

export interface CustomButtonProps {
    type?: string;
    title: string;
    backgroundColor: string;
    color: string;
    fullWidth?: boolean;
    icon?: ReactNode;
    disabled?: boolean;
    handleClick?: () => void;
}

export interface ProfileProps {
    type: string;
    name: string;
    avatar: string;
    email: string;
    properties: Array | undefined;
}

export interface PropertyProps {
    _id: string;
    title: string;
    description: string;
    location: string;
    price: string;
    photo: string;
    creator: string;
}

