import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import Modal from '../../../../shared/authenticated/Modal';
import Icon from '../../../../shared/Icon';
import { ReportType } from '../constant';

type ReportModalProps = {
  onClose: () => void;
  reportDetail?: ReportType;
};

const checkStatusColor = (status: string) => {
  switch (status) {
    case 'Blocked':
      return 'text-red-500';
    case 'En cours':
      return 'text-secondary-2';
    case 'Terminé':
      return 'text-success-2';
    case 'Retard':
      return 'text-orange-500';
    default:
      return '';
  }
};

const DetailModal: FC<ReportModalProps> = ({ onClose, reportDetail }) => (
  <Modal
    title="Détail Compte rendu"
    onClose={onClose}
    classNames="2xl:w-1/3 xl:w-2/4 lg:w-2/4 md:w-3/4 sm:w-10/12 w-11/12 py-4 px-[26px]"
  >
    <table>
      <tbody className="text-gray-1 sm:text-base text-xs">
        <tr>
          <td className="uppercase text-secondary ml-8 pb-7 leading-5"># id</td>
          <td className="pb-7 uppercase">{reportDetail?.matricule}</td>
        </tr>
        <tr>
          <td className="text-secondary flex flex-row items-center leading-5 pb-7">
            <Icon name="calendar" />
            &nbsp;Date
          </td>
          <td className="pb-7">{reportDetail?.date}</td>
        </tr>
        <tr>
          <td className="text-secondary flex flex-row items-center leading-5 pb-7">
            <Icon name="circle" />
            &nbsp;Statut
          </td>
          <td
            className={twMerge(
              'pb-7',
              reportDetail?.state && checkStatusColor(reportDetail?.state),
            )}
          >
            {reportDetail?.state}
          </td>
        </tr>
        <tr>
          <td className="text-secondary flex flex-row items-center leading-5 pb-7">
            <Icon name="timeout" />
            &nbsp;Temps écoulé
          </td>
          <td className="pb-7">{reportDetail?.timeout}</td>
        </tr>
        <tr>
          <td className="text-secondary flex items-center mr-12 leading-5 pb-7">
            <Icon name="description" />
            &nbsp;Description
          </td>
          <td className="pb-7">{reportDetail?.description}</td>
        </tr>
      </tbody>
    </table>
  </Modal>
);

export default DetailModal;
