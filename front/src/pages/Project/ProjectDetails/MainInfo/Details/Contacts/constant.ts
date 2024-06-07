type ContactsType = {
  client: {
    id: string;
    name: string;
    contact: {
      id: string;
      Label: string;
      value: string;
    };
  };
};

export default ContactsType;

export const mockContacts = [
  {
    client: {
      id: '0',
      name: 'test',
      contact: {
        id: '0',
        Label: 'Téléphone',
        value: '+33 2 21 46 23 78',
      },
    },
  },
  {
    client: {
      id: '1',
      name: 'New client',
      contact: {
        id: '0',
        Label: 'Email',
        value: 'adress@mail.mg',
      },
    },
  },
  {
    client: {
      id: '0',
      name: 'test',
      contact: {
        id: '0',
        Label: 'Téléphone',
        value: '+33 2 21 46 23 78',
      },
    },
  },
  {
    client: {
      id: '1',
      name: 'New client',
      contact: {
        id: '0',
        Label: 'Email',
        value: 'adress@mail.mg',
      },
    },
  },
  {
    client: {
      id: '0',
      name: 'test',
      contact: {
        id: '0',
        Label: 'Téléphone',
        value: '+33 2 21 46 23 78',
      },
    },
  },
  {
    client: {
      id: '1',
      name: 'New client',
      contact: {
        id: '0',
        Label: 'Email',
        value: 'adress@mail.mg',
      },
    },
  },
  {
    client: {
      id: '0',
      name: 'test',
      contact: {
        id: '0',
        Label: 'Téléphone',
        value: '+33 2 21 46 23 78',
      },
    },
  },
  {
    client: {
      id: '1',
      name: 'New client',
      contact: {
        id: '0',
        Label: 'Email',
        value: 'adress@mail.mg',
      },
    },
  },
];
