import { twMerge } from 'tailwind-merge';
import { HeaderType } from '../../../../../../shared/authenticated/Table/Table';
import Icon from '../../../../../../shared/Icon';

const image = ['jpeg', 'png', 'jpg'];
const word = ['doc', 'docx'];

const getDocumentExtension = (
  document: string,
): 'image_hoverable' | 'word_hoverable' | 'pdf_hoverable' => {
  if (image.includes(document.split('.')[1])) {
    return 'image_hoverable';
  }
  if (word.includes(document.split('.')[1])) {
    return 'word_hoverable';
  }
  return 'pdf_hoverable';
};

export type ContractDataType = {
  description: string;
  startDate: string;
  endDate: string;
  attachment: string[];
};

export const ContractHeading: HeaderType<ContractDataType>[] = [
  {
    name: 'Date début',
    associated: (data) => data.startDate,
  },
  {
    name: 'Date fin',
    associated: (data) => data.endDate,
  },
  {
    name: 'Description',
    associated: (data) => data.description,
    className: 'uppercase max-xl:hidden w-[40%]',
  },
  {
    name: 'Pièces jointes',
    associated: (data) => (
      <div className="flex flex-row md:gap-x-7 gap-x-2 text-gray-9">
        {data.attachment.map((a) => (
          <Icon
            key={a}
            name={getDocumentExtension(a)}
            className={twMerge(
              'cursor-pointer duration-150',
              getDocumentExtension(a) === 'image_hoverable' && 'hover:text-secondary',
              getDocumentExtension(a) === 'pdf_hoverable' && 'hover:text-red-400',
              getDocumentExtension(a) === 'word_hoverable' && 'hover:text-[#56AFF0]',
            )}
            height={20}
            width={16}
          />
        ))}
      </div>
    ),
  },
  {
    name: 'Action',
    associated: () => '',
  },
];

export const ContractData: ContractDataType[] = [
  {
    description:
      'Une description du,Une description du,Une description du,Une description du,Une description du,Contrat 1',
    attachment: ['document2.docx', 'document1.pdf', 'document2.png'],
    startDate: '10/15/2023',
    endDate: '10/15/2024',
  },
  {
    description:
      'Une description du,Une description du,Une description du,Une description du,Une description du,Contrat 2',
    attachment: ['document1.pdf', 'document2.png'],
    startDate: '10/15/2023',
    endDate: '10/15/2024',
  },
  {
    description:
      'Une description du,Une description du,Une description du,Une description du,Contrat 3',
    attachment: ['document1.pdf', 'document2.png'],
    startDate: '10/15/2023',
    endDate: '10/15/2024',
  },
  {
    description:
      'Une description du,Une description du,Une description du,Une description du,Contrat 4',
    attachment: ['document1.pdf', 'document2.docx'],
    startDate: '10/15/2023',
    endDate: '10/15/2024',
  },
  {
    description:
      'Une description du,Une description du,Une description du,Une description du,Contrat 5',
    attachment: ['document1.pdf', 'document2.png'],
    startDate: '10/15/2023',
    endDate: '10/15/2024',
  },
  {
    description:
      'Une description du,Une description du,Une description du,Une description du,Contrat 6',
    attachment: ['document1.pdf', 'document2.png'],
    startDate: '10/15/2023',
    endDate: '10/15/2024',
  },
];

export const filterNameData = [
  { id: '1', name: 'John Doe', email: 'JohnDoe@mail.com', avatar: 'profile.png' },
  {
    id: '2',
    name: 'John Doe 2',
    email: 'JohnDoe2@hairun-technology.com',
    avatar: 'profile.png',
  },
  {
    id: '3',
    name: 'John Doe 3',
    email: 'JohnDoe3@hairun-technology.com',
    avatar: 'profile.png',
  },
  {
    id: '4',
    name: 'Capitain Doe 4',
    email: 'JohnDoe4@hairun-technology.com',
    avatar: 'profile.png',
  },
  {
    id: '5',
    name: 'John Doe 5',
    email: 'JohnDoe5@hairun-technology.com',
    avatar: 'profile.png',
  },
  {
    id: '6',
    name: 'Lenon Doe 6',
    email: 'JohnDoe6@hairun-technology.com',
    avatar: 'profile.png',
  },
];
