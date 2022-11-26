const Producto = {
    slug: 'product',
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
            name: 'src',
            type: 'upload',
            relationTo: 'media'
        },
        {
            name: 'title',
            type: 'text',
            required: true
        },
        {
            name: 'size', // required
            type: 'radio', // required
            options: [ // required
            {
                label: '22 MX',
                value: '22',
            },
            {
                label: '23 MX',
                value: '23',
            },
            {
                label: '24 MX',
                value: '24',
            },
            {
                label: '25 MX',
                value: '25',
            },
            {
                label: '26 MX',
                value: '26',
            },
            {
                label: '27 MX',
                value: '27',
            },
            {
                label: '28 MX',
                value: '28',
            },
            {
                label: '29 MX',
                value: '29',
            },
            {
                label: '30 MX',
                value: '30',
            },
        ],
        defaultValue: '25 MX',
        required: true,
        admin: {
            layout: 'horizontal',
            }
        
        },
        {
            name: 'price',
            type: 'number',
            required: true
        },
        {
            name: 'activo',
            type: 'text',
            defaultValue: 'True'
        }
    ],
  };
  
  export default Producto;