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