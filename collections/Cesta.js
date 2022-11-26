const Cesta = {
    slug: 'cesta',
    admin: {
      useAsTitle: 'name',
    },
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    fields: [
        {
            name: 'productos',
            type: 'relationship',
            relationTo: 'product',
            hasMany: false
        },
        {
            name: 'valPedido',
            type: 'number',
            required: true,
            defaultValue: 0
        },
        {
            name: 'envPlat',
            type: 'number',
            defaultValue: 10

        },
        {
            name: 'activo',
            type: 'text',
            defaultValue: 'true'
        }
    ],
  };
  
  export default Cesta;