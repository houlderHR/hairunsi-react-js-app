import { FC } from 'react';
import Modal from '../../../../shared/authenticated/Modal';
import Icon from '../../../../shared/Icon';

type DetailModalProps = {
  onClose: () => void;
  dailyDetail?: Record<string, string | number>;
};

const DetailModal: FC<DetailModalProps> = ({ onClose, dailyDetail }) => (
  <Modal title="Détail Daily" onClose={onClose}>
    <table>
      <tbody className="text-gray-1 text-xl">
        <tr>
          <td className="uppercase text-secondary ml-8 pb-7"># id</td>
          <td className="pb-7">{dailyDetail?.matricule}</td>
        </tr>
        <tr>
          <td className="text-secondary flex flex-row items-center pb-7">
            <Icon name="calendar" />
            &nbsp;Date
          </td>
          <td className="pb-7">{dailyDetail?.date}</td>
        </tr>
        <tr>
          <td className="text-secondary flex flex-row items-center  pb-7">
            <Icon name="description" />
            &nbsp;Description
          </td>
          <td className="pb-7">{dailyDetail?.objectif}</td>
        </tr>
        <tr>
          <td className="text-secondary flex items-center mr-12  pb-7">
            <Icon name="responsable" />
            &nbsp;Responsable
          </td>
          <td className="pb-7">M214 {dailyDetail?.name}</td>
        </tr>
        <tr>
          <td className="text-secondary flex items-center  pb-7">
            <Icon name="membre" />
            &nbsp;Membres
          </td>
          <td className="pb-7">
            <ul>
              <li>M215 Diane Russel</li>
              <li>M216 Jacon Russel</li>
              <li>M217 Firmino Russel</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </Modal>
);

export default DetailModal;
