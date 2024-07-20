import React from 'react';
import { product, productUpdateCart } from '../dataTypes/types/product';
import { useAddProductMutation, useGetCartQuery, useUpdateProductMutation } from '../apps/services/CartApi';
// ___________________________________________________________

const Product: React.FC<product> = (props) => {
    const { data: productsCart, isLoading: isGetLoading, isError: isGetError } = useGetCartQuery(null);
    const [addProduct, { isLoading }] = useAddProductMutation();
    const [updateProduct] = useUpdateProductMutation();

    const addProductCart = () => {
        if (!isGetLoading && !isGetError) {
            const temp = productsCart?.find((p) => p.id == props.id);
            if (!temp) {
                const newProduct = {
                    "id": props.id,
                    "product_name": props.product_name,
                    "price": props.price,
                    "img": props.img,
                    "brand": props.brand,
                    "category": props.category,
                    "numberOf": 1
                };

                addProduct(newProduct);
                alert("محصول به سبد خرید اضافه شد")

            } else {
                const product = { id: temp.id, numberOf: temp.numberOf + 1 };
                updateProduct(product);

                alert("به تعداد محصول در سبد خرید اضافه شد")
            }
        }
    }

    // -----------------------------------------------------------
    return (
        <div className='product-box'>
            <h3>{props.product_name}</h3>
            <img src={props.img} alt={props.product_name} />
            <p><strong>{props.price}</strong> تومان</p>
            <div>
                <span>برند : {props.brand}</span>
                <span>دسته بندی : {props.category}</span>
            </div>

            <button type="button" className='add-cart' disabled={isLoading} onClick={addProductCart}>اضافه به سبد خرید</button>
        </div>
    )
}

export default Product