
export type product = {
    id: number,
    product_name: string,
    price: number,
    img: string,
    brand: string,
    category?: string
}

export type Products = {
    products_list: product[],
    errorMessage: null | string
}


export type productCart = product & {
    numberOf: number
}

export type productUpdateCart = {
    id: number,
    numberOf: number
}