import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import useToggle from '../../../../../../hooks/useToggle';
import DashedButton from '../../../../../../shared/authenticated/buttons/DashedButton';
import DeleteModal from '../../../../../../shared/authenticated/Modal/DeleteModal';
import Icon from '../../../../../../shared/Icon';
import { DataItemLink, DataItemSketch } from './constant';
import ContentItem from './ContentItem';
import InputItem from './InputItem';

const Link = () => {
  const { state: newLink, toggle: toggleNewLink } = useToggle();
  const { state: showEditItem, toggle: toggleEditItem } = useToggle();
  const { state: showDeleteModal, toggle: toggleShowDeleteModal } = useToggle();
  const [unfold, setUnfold] = useState<{ link: boolean; sketch: boolean }>({
    link: false,
    sketch: false,
  });
  const [selectedItem, setSelectedItem] = useState<{ label: string; value: string }>();

  const editCurrentItem = (item: { label: string; value: string }) => () => {
    setSelectedItem(item);
    toggleEditItem();
  };

  const closeEditItem = () => {
    toggleEditItem();
    setSelectedItem(undefined);
  };

  return (
    <>
      <div className="pt-14 pb-8 px-16 w-full bg-white z-10">
        {!newLink && <DashedButton onClick={toggleNewLink} title="Ajouter un lien" />}
        {newLink && <InputItem onClose={toggleNewLink} onEdit={() => {}} />}
        <div className="mt-10 flex flex-col items-center justify-center text-secondary-2 gap-y-[14px] mb-6">
          <div className="flex flex-row items-center justify-center gap-x-3 text-base font-medium">
            <Icon name="link" size={18} />
            Autres liens
          </div>
          <Icon
            name="sharp-arrow-drop-down"
            height={8}
            width={14}
            onClick={() => setUnfold({ link: !unfold.link, sketch: unfold.sketch })}
            className={twMerge('duration-300', unfold?.link ? 'rotate-180' : 'rotate-0')}
          />
        </div>
        <div
          className={twMerge(
            'flex flex-col gap-y-2 duration-300 opacity-100',
            unfold?.link ? '-translate-y-full opacity-0 -z-30 hidden' : 'translate-y-0',
          )}
        >
          {DataItemLink.map((item) => (
            <div key={item.label}>
              {!(selectedItem?.label === item.label) && (
                <ContentItem
                  openEdit={editCurrentItem(item)}
                  onDelete={toggleShowDeleteModal}
                  item={item}
                />
              )}
              {selectedItem?.label === item.label && showEditItem && (
                <InputItem
                  inputContainerClassName="sm:flex-row flex-col gap-y-2 items-center"
                  item={item}
                  onClose={closeEditItem}
                  onEdit={() => {}}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-center text-secondary-2 gap-y-[14px] mb-6">
          <div className="flex flex-row items-center justify-center gap-x-3 text-base font-medium">
            <Icon name="link" size={18} />
            Liens des maquettes
          </div>
          <Icon
            name="sharp-arrow-drop-down"
            height={8}
            width={14}
            className={twMerge('duration-300', unfold?.sketch ? 'rotate-180' : 'rotate-0')}
            onClick={() => setUnfold({ link: unfold.link, sketch: !unfold.sketch })}
          />
        </div>
        <div
          className={twMerge(
            'flex flex-col gap-y-2 duration-300 opacity-100',
            unfold?.sketch ? '-translate-y-full opacity-0 -z-30 hidden' : 'translate-y-0',
          )}
        >
          {DataItemSketch.map((item) => (
            <div key={item.label}>
              {!(selectedItem?.label === item.label) && (
                <ContentItem
                  openEdit={editCurrentItem(item)}
                  onDelete={toggleShowDeleteModal}
                  item={item}
                />
              )}
              {selectedItem?.label === item.label && showEditItem && (
                <InputItem item={item} onClose={closeEditItem} onEdit={() => {}} />
              )}
            </div>
          ))}
        </div>
      </div>
      {showDeleteModal && (
        <DeleteModal
          description="Vous etes sur le point de supprimer un lien"
          onClose={toggleShowDeleteModal}
          onDelete={() => {}}
          confirmation="Etes-vous sûr de vouloir supprimer ce lien ? 
        Attention, l’effacement est irreversible !"
          icon="delete-link"
        />
      )}
    </>
  );
};

export default Link;
