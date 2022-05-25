import { useContext } from 'react';

import './checkout.styles.scss';
import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../../componets/checkout-item/checkout-item.component'


const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext)
  const checkoutHeaderTitles = [
    { id: 0, name: 'Product' },
    { id: 1, name: 'Description' },
    { id: 2, name: 'Quantity' },
    { id: 3, name: 'Price' },
    { id: 3, name: 'Remove' },
  ]
  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        {checkoutHeaderTitles.map(({ id, name }) => (
          <div className='header-block' id={id}>
            <span>{name}</span>
          </div>
        ))}
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem cartItem={cartItem} />
      ))}
      <span className='total'> Total: ${cartTotal}</span>
    </div>
  )
}

export default Checkout

