import express from "express"
import { createProduct, deleteProduct, getOneProduct, getProducts, updatePartialUser } from "./logics";
import { isIdProductValid, verifyNameUnique } from "./middlewares";

const app = express();
app.use(express.json());

app.post('/products', verifyNameUnique, createProduct);
app.get('/products', getProducts);
app.get('/products/:id', isIdProductValid, getOneProduct);
app.patch('/products/:id', isIdProductValid, verifyNameUnique, updatePartialUser);
app.delete('/products/:id', isIdProductValid, deleteProduct);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
