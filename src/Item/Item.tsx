import Button from '@material-ui/core/Button';

// Importing types
import { CartItemType } from '../App';

// Importing style
import { ItemWrapper } from './Item.styles';

type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
}

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
    <ItemWrapper>
        <img src={item.image} alt={item.title} />

        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h3>$ {item.price.toFixed(2)}</h3>
        </div>
        <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
    </ItemWrapper>
);

export default Item;