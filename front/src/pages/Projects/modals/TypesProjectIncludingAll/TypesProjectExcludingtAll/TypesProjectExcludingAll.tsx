import { FC } from 'react';
import PROJECTS from '../../../projects';

const TypesProjectExcludingAll: FC<{ setValueType?: () => void }> = ({ setValueType }) =>
  PROJECTS.map((project: string) => (
    <label
      className="flex flex-row items-center gap-2"
      htmlFor={project}
      role="presentation"
      onClick={setValueType || undefined}
      key={project}
    >
      <input
        key={project}
        type="radio"
        name="project"
        id={project}
        value={project}
        readOnly
        className="w-[18px] h-[18px] form-radio accent-[#3B88FF]"
      />
      <span className="text-base lg:text-sm inline-block">{project}</span>
    </label>
  ));

export default TypesProjectExcludingAll;
