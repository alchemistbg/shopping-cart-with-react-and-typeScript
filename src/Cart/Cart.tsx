import CartItem from '../CartItem/CartItem';

// Styles
import { CartWrapper } from './Cart.styles';

// Types
import { CartItemType } from '../App';
// import { CartItemWrapper } from './../CartItem/CartItem.styles';

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
    const calculateTotal = (items: CartItemType[]) => {
        return items.reduce((acc: number, item) => {
            return acc + item.amount * item.price;
        }, 0);
    }

    return (
        <CartWrapper>
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? <p>No Items in cart!</p> : null}
            {cartItems.map((item) => {
                return <CartItem
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            })}
            <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
        </CartWrapper>
    )
}

export default Cart;