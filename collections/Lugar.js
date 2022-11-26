const Lugar = {
    slug: 'lugar',
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
            name: 'lugar',
            type: 'text',
            required: true

        },
        {
            name: 'horario',
            type: 'text',
            required: true

        },
        {
            name: 'fecha',
            type: 'text',
            required: true

        }
    ],
  };
  
  export default Lugar;