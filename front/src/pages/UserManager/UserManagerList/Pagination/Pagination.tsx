import { FC } from 'react';

const Pagination: FC = () => (
  <div>
    <div className="content-pagination">
      <div className="line">
        <div>Lignes par page</div>
        <div className="line-number">
          <div>12</div>
          <div className="flex flex-col justify-center items-center">
            <img src="/icon/sharp-arrow-drop-down-grey.svg" alt="arrow" />
          </div>
        </div>
      </div>
      <div className="page">1-10 de 15</div>
    </div>
  </div>
);

export default Pagination;
