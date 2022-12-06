import { buildConfig } from 'payload/config';

import Users from './collections/Users';
import Productos from './collections/Product';
import Media from './collections/Media';
import Orden from './collections/Orden';
import Lugar from './collections/Lugar';
import Cliente from './collections/Cliente';
import Cesta from './collections/Cesta';



export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Productos,
    Media,
    Orden,
    Lugar,
    Cliente,
    Cesta
  ],
});
