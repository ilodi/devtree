import colors from 'colors';
import server from './server';

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(colors.green.bold(`SERVER port: ${port}`));
});

let productName = 'Table';
let isAuth = false;
let price = 30;

type Product = {
  id: number;
  price: number;
  name: string;
};
