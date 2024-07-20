import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Products, product, productCart } from '../dataTypes/types/product';
import Product from './Product';
import { useGetCartQuery, useAddProductMutation, useDeleteProductMutation } from '../apps/services/CartApi';
// ___________________________________________________________

const Cart = () => {
  const [products, setProducts] = useState<Products>({ products_list: [], errorMessage: null });
  const { data: product_cart, isLoading: isGetLoading, isError: isGetError, error: getError } = useGetCartQuery(null);
  const [deleteProduct, { isLoading: isDeleteLoading }] = useDeleteProductMutation();
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3040/products")
      .then(response => setProducts({ products_list: response.data, errorMessage: null }))
      .catch(error => setProducts({ products_list: [], errorMessage: error }))
  }, [products]);


  const deleteProductCart = (id: number) => {
    deleteProduct(id);
    alert("محصول از سبد خرید حذف شد")
  }
  // -----------------------------------------------------------

  return (
    <div>
      {/* products */}
      <div className='products-area'>
        <h2 className='products-title'>لیست محصولات</h2>
        {products.errorMessage ? (
          <h2 className='error-message'>سرور با خطا مواجه شده است</h2>
        ) : (
          <div className='products-container'>
            {products.products_list.map((p: product) => (
              <Product key={p.id} product_name={p.product_name} price={p.price} img={p.img} category={p.category} brand={p.brand} id={p.id} />
            ))}
          </div>
        )}
      </div>

      {/* cart */}
      <div className='cart-area'>
        <h2 className='cart-title'>سبد خرید</h2>
        <table className='table-cart'>
          <caption>سبد خرید کالا</caption>
          <thead>
            <tr>
              <th>کد محصول</th>
              <th>عکس محصول</th>
              <th>نام محصول</th>
              <th>قیمت جزء</th>
              <th>تعداد محصول</th>
              <th>قیمت کل</th>
              <th>نام برند/دسته بندی</th>
              <th>خذف محصول</th>
            </tr>
          </thead>
          {isGetLoading || isGetError ?
            <tbody>
              <tr>
                <td colSpan={8}><h3>سبد خرید خالی میباشد</h3></td>
              </tr>
            </tbody>
            :

            <tbody>
              {product_cart?.length == 0 ? <tr><td colSpan={7}><h3>سبد خرید خالی میباشد</h3></td></tr> :


                product_cart?.map((pc) => (
                  <tr key={pc.id}>
                    <td>{pc.id}</td>
                    <td><img src={pc.img} alt={pc.product_name} /></td>
                    <td>{pc.product_name}</td>
                    <td>{pc.price}</td>
                    <td>{pc.numberOf}</td>
                    <td>{pc.price * pc.numberOf}</td>
                    <td>{pc.brand} / {pc.category}</td>
                    <td><button type="button" disabled={isDeleteLoading} onClick={() => deleteProductCart(pc.id)}>حذف محصول</button></td>
                  </tr>
                ))
              }

            </tbody>}

        </table>
      </div>
    </div>
  )
}

export default Cart