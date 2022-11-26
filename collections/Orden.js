const Orden = {
    slug: 'orden',
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
            name: 'cliente',
            type: 'relationship', // required
            relationTo: 'cliente', // required
            hasMany: false
        },
        {
            name: 'cesta',
            type: 'relationship', // required
            relationTo: 'cesta', // required
            hasMany: false,
        },
        {
            name: 'lugar',
            type: 'relationship',
            relationTo: 'lugar',
            hasMany: false
        },
        {
            name: 'activo',
            type: 'text',
            defaultValue: 'True',
            hidden: true
        },
        {
            name: 'fecha',
            type: 'date',
            
        }
    ],
  };
  
  export default Orden;