export type ContactType = {
  id: string;
  Label: string;
  value: string;
};

type ClientType = {
  id: string;
  name: string;
  contact: ContactType[];
};

export default ClientType;

export const mockClients = [
  {
    id: '0',
    name: 'Client 1',
    contact: [
      {
        id: '0',
        Label: 'Téléphone',
        value: '+33 2 21 46 23 78',
      },
      {
        id: '0',
        Label: 'Email',
        value: 'adress@mail.mg',
      },
      {
        id: '0',
        Label: 'Téléphone',
        value: '+33 2 21 46 23 78',
      },
    ],
  },
  {
    id: '1',
    name: 'Client 2',
    contact: [
      {
        id: '0',
        Label: 'Email',
        value: 'adress@mail.mg',
      },
    ],
  },
];
