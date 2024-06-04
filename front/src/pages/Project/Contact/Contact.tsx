import { useState } from 'react';
import InputFileWithDragAndDrop from '../../../shared/inputs/InputFileWithDragAndDrop';

const Contact = () => {
  const [file, setFile] = useState<File | null | undefined>();
  return (
    <div className="pt-[50px] w-full min-h-full flex flex-col justify-center items-center">
      <div className="w-full h-[50px] border-solid border-ellow-500  bg-red-400">
        <InputFileWithDragAndDrop file={file} setFile={setFile} />
      </div>
    </div>
  );
};

export default Contact;
