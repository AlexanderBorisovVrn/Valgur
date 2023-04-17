export interface IPieChart {
    title:string,
    value:number,
    series:Array<number>,
    colors:Array<string>

}

export type ProgerssBarProps = {
    title:string,
    percentage:number,
    color:string
}