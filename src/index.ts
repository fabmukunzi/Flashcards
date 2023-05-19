import { ApolloServer } from 'apollo-server';
import { context } from './context';
import { schema } from './schema';

export const server: ApolloServer = new ApolloServer({
  schema,
  context,
});

const port: number = 3005;
server.listen(port, () => {
  console.log(`Server is running on the port ${port}`);
});
