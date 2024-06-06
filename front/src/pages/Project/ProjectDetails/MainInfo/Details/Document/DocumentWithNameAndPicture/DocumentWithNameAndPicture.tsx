import { FC } from 'react';
import Icon from '../../../../../../../shared/Icon';
import DeleteOrDownloadDocument from './DeleteOrDownloadDocument';

interface IDocumentWithNameAndPicture {
  name: string;
  size: number;
  index?: string;
  actions?: (() => void)[];
}

const DocumentWithNameAndPicture: FC<IDocumentWithNameAndPicture> = ({
  name,
  size,
  index = `${name}${size}`,
  actions,
}) => {
  const loadingPicture = (extension: string) => {
    if (extension.substring(extension.lastIndexOf('.') + 1).includes('doc')) return 'word';
    if (extension.substring(extension.lastIndexOf('.') + 1).includes('pdf')) return 'pdf';
    return 'image';
  };
  return (
    <div className="min-h-[76px] w-full px-6 flex flex-row justify-between items-center border-[1px] border-solid border-transparent  hover:border-[1px] hover:border-solid hover:border-[#bdbdbd] hover:rounded-xl">
      <div className="h-full flex flex-row gap-3 justify-center items-center" key={index}>
        <Icon name={loadingPicture(name)} height={30} width={30} className="text-green-400" />
        <div className="flex flex-col justify-center items-start gap-1">
          <div className="text-base font-normal text-[#272727]">{name}</div>
          <div className="text-xs font-normal text-[#bdbdbd]">{size}Ko</div>
        </div>
      </div>

      <DeleteOrDownloadDocument actions={actions} />
    </div>
  );
};

export default DocumentWithNameAndPicture;
