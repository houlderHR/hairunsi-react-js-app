import { FC, useState } from 'react';
import DeleteModal from '../../../../../../../../shared/authenticated/Modal/DeleteModal';
import Icon from '../../../../../../../../shared/Icon';
import Input from '../../../../../../../../shared/inputs/Input';

const EnvDetail: FC<{ item: { label: string; link: string } }> = ({ item }) => {
  const [showDeleteModal, setShowDeleteForm] = useState(false);
  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const [removeEnv, setRemoveEnv] = useState<{ label: string; link: string } | undefined>();

  return !showFormUpdate ? (
    <div className="min-h-[76px] w-full px-6 flex flex-row justify-between items-center border-[1px] border-solid border-transparent  hover:border-[1px] hover:border-solid hover:border-[#bdbdbd] hover:rounded-xl">
      <div className="w-1/2 lg:w-1/5 flex flex-row justify-between">
        <div className="text-[#CAC8FF] font-bold">{item.label}</div>
        <div className="text-primary font-normal">{item.link}</div>
      </div>
      <div className="flex flex-row justify-center gap-2 lg:gap-8">
        <Icon
          name="trash"
          className="text-[#bdbdbd] hover:text-red-500"
          height={18}
          width={14}
          onClick={() => {
            setShowDeleteForm(true);
            setShowFormUpdate(false);
          }}
        />
        <Icon
          name="pen"
          className="text-[#bdbdbd] hover:text-[#0d99ff]"
          height={18}
          width={14}
          onClick={() => {
            setShowFormUpdate(true);
            setShowDeleteForm(false);
            setRemoveEnv(item);
          }}
        />
      </div>
      {showDeleteModal && (
        <DeleteModal
          description="Vous êtes sur le point de supprimer un environnement"
          onClose={() => setShowDeleteForm(false)}
          confirmation="Etes-vous sûr de vouloir supprimer cet environnement ? 
          Attention, l’effacement est irreversible !"
          icon="remove-env"
          onDelete={() => {}}
        />
      )}
    </div>
  ) : (
    <div className="my-10 w-full min-h-[76px] flex flex-row justify-center items-center gap-5">
      <Input type="text" placeholder="Libellé" additionalClass="w-2/5" value={removeEnv?.label} />
      <Input type="text" placeholder="Lien" additionalClass="w-2/5" value={removeEnv?.link} />
      <div className="flex flex-row justify-evenly items-center w-1/5">
        <Icon name="x" className="text-[#808080] hover:text-red-500" size={24} />
        <Icon
          name="x"
          className="text-[#808080] hover:text-green-500"
          size={24}
          onClick={() => setShowFormUpdate(false)}
        />
      </div>
    </div>
  );
};

export default EnvDetail;
