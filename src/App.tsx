import { useState } from 'react';
import { useQuery } from 'react-query';

// Importing external components
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import AddShoppingCardIcon from '@material-ui/icons/AddShoppingCart';

// Importing internal components
import Item from './Item/Item';
import Cart from './Cart/Cart';

// Importing styles\
import { AppWrapper } from './App.styles';
import { StyledButton } from './App.styles';
import CartItem from './CartItem/CartItem';

// Setting Types
export type CartItemType = {
	id: number,
	category: string,
	description: string,
	image: string,
	price: number,
	title: string,
	amount: number
}

const getProducts = async (): Promise<CartItemType[]> =>
	await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {
	const [cartOpen, setCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([] as CartItemType[]);

	const { data, isLoading, error } = useQuery<CartItemType[]>(
		'products', getProducts
	);

	const getTotalItems = (items: CartItemType[]) => {
		return items.reduce((acc: number, item) => {
			return acc + item.amount
		}, 0);
	};

	const handleAddToCart = (clickedItem: CartItemType) => {
		setCartItems(prev => {
			const isItemInCart = prev.find(item => {
				return item.id === clickedItem.id
			});

			if (isItemInCart) {
				return prev.map((item) => {
					return item.id === clickedItem.id
						? { ...item, amount: item.amount + 1 }
						: item
				});
			}

			return [...prev, { ...clickedItem, amount: 1 }];
		})
	};

	const handleRemoveFromCart = (id: number) => {
		setCartItems(prev =>
			prev.reduce((acc, item) => {
				if (item.id === id) {
					if (item.amount === 1) {
						return acc;
					}
					return [...acc, { ...item, amount: item.amount - 1 }];
				} else {
					return [...acc, item];
				}
			}, [] as CartItemType[]),
		);
	};

	if (isLoading) {
		return <LinearProgress />
	}

	if (error) {
		return <h2>Something went wrong...</h2>
	}

	return (
		<AppWrapper>
			<Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
				<Cart
					cartItems={cartItems}
					addToCart={handleAddToCart}
					removeFromCart={handleRemoveFromCart}
				/>
			</Drawer>
			<StyledButton onClick={() => setCartOpen(true)}>
				<Badge badgeContent={getTotalItems(cartItems)} color='error'>
					<AddShoppingCardIcon />
				</Badge>
			</StyledButton>
			<Grid container spacing={3}>
				{
					data?.map(item => (
						<Grid item key={item.id} xs={12} sm={4}>
							<Item
								item={item}
								handleAddToCart={handleAddToCart}
							/>
						</Grid>
					))
				}
			</Grid>
		</AppWrapper>
	);
}

export default App;
