import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../components/Layout"), { ssr: false });
import NextLink from "next/link";
import db from "../utils/db";
import Product from "../models/Product";
import { useContext } from "react";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";
import axios from "axios";
export default function Home(props) {
  const router = useRouter();
  const { products } = props;
  const { state, dispatch } = useContext(Store);
  const addToCartHandler = async (product) => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock <= 0) {
      window.alert("Sorry, Product is out of stock");
      return;
    }
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };
  return (
    <div>
      <Layout ttile="PH SHOP" description="PH SHOP ECOMMERCE">
        <div>
          <h1>Products</h1>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item md={4} key={product.name}>
                <Card>
                  <NextLink href={`/product/${product.slug}`}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={product.image}
                        title={product.name}
                      ></CardMedia>
                      <CardContent>
                        <Typography>{product.name}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </NextLink>

                  <CardActions>
                    <Typography>${product.price}</Typography>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => addToCartHandler(product)}
                    >
                      Add to cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </Layout>
    </div>
  );
}
export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
