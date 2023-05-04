export enum Size{
    small,
    medium,
    large,
    extraLarge,
    eight_oz,
    twellve_oz,
    sixteen_oz,
}

export enum Crust{
    classic,
    italian,
    glutenFree,
    drink
}

export enum Type {
    pizza,
    side,
    drink
}

interface Topings {
    bacon: boolean;
    pineapple: boolean;
    olives: boolean;
    bellPeppers: boolean;
    peperoni: boolean;
    sausage: boolean;
    extraCheese: boolean;
}

interface Custom {
    topings: Topings;
    crust: Crust;
    size: Size;
}

export interface MenuItem {
    id: number;
    type: Type;
    title: string;
    price: number;
    imageUrl: string;
    custom: Custom;
}