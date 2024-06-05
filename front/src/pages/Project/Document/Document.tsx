import { useState } from 'react';
import DeleteModal from '../../../shared/authenticated/Modal/DeleteModal';
import InputFileWithDragAndDrop from '../../../shared/inputs/InputFileWithDragAndDrop';
import DOCUMENTS from './constant';
import DocumentWithNameAndPicture from './DocumentWithNameAndPicture/DocumentWithNameAndPicture';

const Document = () => {
  const [file, setFile] = useState<File | null | undefined>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<{ name: string; size: number }>();

  const deleteDocument = (document: { name: string; size: number }) => {
    setDocumentToDelete(document);
    setShowDeleteModal(true);
  };

  return (
    <div className="pt-[100px] w-full min-h-full flex flex-col justify-center items-center">
      <div className="w-full p-10  flex flex-col gap-y-7">
        <div className="w-full h-[76px] border-[1px] border-dashed border-[#bdbdbd] rounded-xl">
          <InputFileWithDragAndDrop
            file={file}
            setFile={setFile}
            actionForFile=""
            typeFile="votre document"
          />
        </div>
        <div className="w-full space-y-4 max-h-[340px] overflow-y-scroll scroll-smooth">
          {DOCUMENTS.length > 0 ? (
            DOCUMENTS.map((document: { name: string; size: number }, key: number) => (
              <DocumentWithNameAndPicture
                name={document.name}
                size={document.size}
                index={`${document.name}${document.size}${key}`}
                actions={[() => deleteDocument(document), () => {}]}
              />
            ))
          ) : (
            <div>Pas de document</div>
          )}
        </div>
      </div>
      {showDeleteModal && (
        <DeleteModal
          onClose={() => setShowDeleteModal(false)}
          onDelete={() => {}}
          icon="remove-document"
          description={`Vous êtes sur le point de supprimer ${documentToDelete?.name}`}
          confirmation="Etes-vous sûr de vouloir supprimer ce document ?
          Attention, l’effacement est irreversible !"
        />
      )}
    </div>
  );
};

export default Document;
