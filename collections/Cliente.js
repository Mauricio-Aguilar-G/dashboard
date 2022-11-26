const Cliente = {
    slug: 'cliente',
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
            name: 'email',
            type: 'email',
            required: true

        },
        {
            name: 'instagram',
            type: 'text',
            required: true

        },
        {
            name: 'tel',
            type: 'number',
            required: true

        },
        {
            name: 'verificado',
            type: 'text',
            defaultValue: 'false',
            hidden: true
        }
    ],
  };
  
  export default Cliente;