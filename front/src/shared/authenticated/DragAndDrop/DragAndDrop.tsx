import './style.scss';
import { ChangeEvent, DragEvent, FC, useRef, useState } from 'react';

interface FiLeExport {
  file: File | undefined | null;
  setFile: React.Dispatch<React.SetStateAction<File | undefined | null>>;
}

const DragAndDrop: FC<FiLeExport> = ({ file, setFile }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOver, setIsOver] = useState(false);
  const [image, setImage] = useState<string>();

  const setFileValue = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      setFile(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0]);
      setImage(url);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);

    setFile(event.dataTransfer.files.item(0));
    const url = URL.createObjectURL(event.dataTransfer.files[0]);
    setImage(url);
  };

  if (!file)
    return (
      <div
        className={isOver ? 'uploadtrue' : 'uploadfalse'}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <img src="/icon/upload-picture.svg" alt="upload" />
        <input
          type="file"
          id="file"
          accept="image/*"
          hidden
          onChange={setFileValue}
          ref={inputRef}
        />
        <div>
          Déposer ou{' '}
          <span
            role="presentation"
            onClick={() => inputRef.current?.click()}
            className="text-[#478fff] cursor-pointer"
          >
            Uploader
          </span>{' '}
          l’image
        </div>
      </div>
    );
  return (
    <div className="remove">
      <img src={image} alt="" className="picture" />
      <span role="presentation" onClick={() => setFile(null)} className="restore">
        Restaurer
      </span>
    </div>
  );
};

export default DragAndDrop;
