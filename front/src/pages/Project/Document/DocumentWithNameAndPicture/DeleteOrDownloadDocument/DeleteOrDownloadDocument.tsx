import { FC } from 'react';
import Action from './Action';

const DeleteOrDownloadDocument: FC<{ actions: (() => void)[] | undefined }> = ({ actions }) =>
  actions && (
    <div className="flex flex-row gap-8">
      <Action item="trash" additionalClassname="hover:text-red-500" onClick={actions[0]} />
      <Action item="download" additionalClassname="hover:text-[#0d99ff]" onClick={actions[1]} />
    </div>
  );

export default DeleteOrDownloadDocument;
