import { FC } from 'react';
import TypesProjectExcludingAll from './TypesProjectExcludingtAll';

const TypesProjectIncludingAll: FC<{ setValueType?: () => void }> = ({ setValueType }) => (
  <div className="flex flex-row 2xl:justify-start justify-center items-center text-gray-1 gap-8">
    <label
      className="flex flex-row items-center gap-2"
      htmlFor="Tout"
      role="presentation"
      onClick={setValueType || undefined}
    >
      <input
        type="radio"
        name="project"
        id="Tout"
        value="Tout"
        className="w-[18px] h-[18px] form-radio accent-[#3B88FF]"
        defaultChecked
      />
      <span className="text-sm lg:text-sm inline-block">Tout</span>
    </label>
    <TypesProjectExcludingAll setValueType={setValueType} />
  </div>
);

export default TypesProjectIncludingAll;
