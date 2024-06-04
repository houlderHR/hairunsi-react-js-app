import useToggle from '../../../../hooks/useToggle';
import DropDown from '../../../../shared/authenticated/Modal/DropDown';
import Icon from '../../../../shared/Icon';
import InputIcon from '../../../../shared/inputs/InputIcon';

const AdditionalSidebarReport = () => {
  const { state: showTimeout, toggle: toggleTimeout } = useToggle();
  const { state: showState, toggle: toggleState } = useToggle();

  return (
    <div className="flex flex-row gap-x-12">
      <div className="relative" role="presentation" onClick={toggleTimeout}>
        <InputIcon
          onChange={() => {}}
          additionalClass="hover:bg-gray-100"
          additionalInputClass="py-5"
          placeholder="Temp écoulé"
          value=""
          endIcon={<Icon className="text-gray-1" name="sharp-arrow-drop-down" />}
          type="text"
        />
        {showTimeout && (
          <DropDown
            items={[
              { id: '1', name: '0,25 J/H' },
              { id: '2', name: '0,5 J/H' },
              { id: '3', name: '0,75 J/H' },
              { id: '4', name: '1 J/H' },
              { id: '5', name: '1,25 J/H' },
              { id: '6', name: '1,5 J/H' },
            ]}
          />
        )}
      </div>
      <div className="relative" role="presentation" onClick={toggleState}>
        <InputIcon
          onChange={() => {}}
          additionalClass="hover:bg-gray-100"
          additionalInputClass="py-5"
          placeholder="Statut"
          value=""
          endIcon={<Icon className="text-gray-1" name="sharp-arrow-drop-down" />}
          type="text"
        />
        {showState && (
          <DropDown
            items={[
              { id: '1', name: 'Terminé' },
              { id: '2', name: 'Bloqué' },
              { id: '3', name: 'En cours' },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default AdditionalSidebarReport;
