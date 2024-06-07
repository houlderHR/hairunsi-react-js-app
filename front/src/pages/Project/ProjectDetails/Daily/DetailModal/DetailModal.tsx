import { FC } from 'react';
import Modal from '../../../../../shared/authenticated/Modal';
import Icon from '../../../../../shared/Icon';
import { DailyDataType } from '../constant';

type DetailModalProps = {
  onClose: () => void;
  dailyDetail?: DailyDataType;
};

const DetailModal: FC<DetailModalProps> = ({ onClose, dailyDetail }) => (
  <Modal
    title="Détail Daily"
    onClose={onClose}
    classNames="2xl:w-1/3 xl:w-2/4 lg:w-2/4 md:w-3/4 sm:w-10/12 w-11/12 py-4 px-[26px]"
  >
    <table>
      <tbody className="text-gray-1 xl:text-xl sm:text-base text-xs">
        <tr>
          <td className="uppercase text-secondary items-center pb-7 flex flex-row justify-start gap-2">
            <Icon name="#" width={18} height={16} />
            id
          </td>
          <td className="pb-7">{dailyDetail?.matricule}</td>
        </tr>
        <tr>
          <td className="text-secondary flex flex-row items-center pb-7 gap-2">
            <Icon name="calendar" />
            Date
          </td>
          <td className="pb-7">{dailyDetail?.date}</td>
        </tr>
        <tr>
          <td className="text-secondary flex flex-row items-center  pb-7 gap-2">
            <Icon name="description" />
            Description
          </td>
          <td className="pb-7">{dailyDetail?.objectif}</td>
        </tr>
        <tr>
          <td className="text-secondary flex items-center mr-12  pb-7 gap-2">
            <Icon name="responsable" />
            Responsable
          </td>
          <td className="pb-7">M214 {dailyDetail?.name}</td>
        </tr>
        <tr>
          <td className="text-secondary flex items-center  pb-7 gap-2">
            <Icon name="membre" />
            Membres
          </td>
          <td className="pb-7">
            <ul>
              {dailyDetail?.membre.map((member) => (
                <li key={member.matricule}>
                  <span className="uppercase">{member.matricule}</span>
                  <span className="text-[40px] mx-2 text-gray-9">.</span>
                  {member.name}&nbsp;
                  <span className="text-[40px] mx-2 text-gray-9">.</span>
                  {member.timeout}
                </li>
              ))}
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </Modal>
);

export default DetailModal;
