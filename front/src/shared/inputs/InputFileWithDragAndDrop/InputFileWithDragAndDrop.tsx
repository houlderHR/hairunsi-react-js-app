import './style.scss';
import { ChangeEvent, DragEvent, FC, useRef, useState } from 'react';
import Icon from '../../Icon';

interface FiLeExport {
  icon?: string;
  file: File | undefined | null;
  setFile: React.Dispatch<React.SetStateAction<File | undefined | null>>;
  link?: string | null | undefined;
  setLink?: React.Dispatch<React.SetStateAction<string | undefined | null>>;
  actionForFile?: string;
  typeFile?: string;
}

const InputFileWithDragAndDrop: FC<FiLeExport> = ({
  icon,
  file,
  setFile,
  link,
  setLink,
  actionForFile = 'Déposer ou',
  typeFile = "l'image",
}) => {
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

  if (!link && !file)
    return (
      <div
        className={isOver ? 'uploadtrue' : 'uploadfalse'}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {icon && <Icon name={icon} />}
        <input
          type="file"
          id="file"
          accept=".jpg, .png"
          hidden
          onChange={setFileValue}
          ref={inputRef}
        />
        <div>
          {actionForFile}&nbsp;
          <span
            role="presentation"
            onClick={() => inputRef.current?.click()}
            className="text-[#478fff] cursor-pointer"
          >
            Uploader
          </span>
          &nbsp; {typeFile}
        </div>
      </div>
    );
  return file?.type.includes('image') || link ? (
    <div className="remove flex flex-col">
      <img src={link || image} alt="" className="picture" />
      <span
        role="presentation"
        onClick={() => {
          if (setLink) {
            setFile(null);
            setLink(null);
          }
          setFile(null);
        }}
        className="restore group"
      >
        <Icon name="pen" className="hidden group-hover:flex" />
      </span>
    </div>
  ) : (
    <div className="flex flex-row remove">
      <div className="p-5 h-full text-center w-full text-gray-1 font-medium">{file?.name}</div>
      <span
        role="presentation"
        onClick={() => {
          if (setLink) {
            setFile(null);
            setLink(null);
          }
          setFile(null);
        }}
        className="restore group"
      >
        <Icon name="pen" className="hidden group-hover:flex" />
      </span>
    </div>
  );
};

export default InputFileWithDragAndDrop;
