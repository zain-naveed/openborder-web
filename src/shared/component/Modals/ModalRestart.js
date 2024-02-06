import React from "react";
import { useTranslation } from "react-i18next";

const ModalRestart = ({onPress}) => {
  const { t, i18n } = useTranslation();
  
  return (
    <div>
      <button
        type="button"
        className="btn btn-foot"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        {t('restart')}
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="mr-body">
                {t('restart-modal')}
              </div>
            </div>
            <div className="modal-footer mr-foot">
              <button type="button" className="btn btn-yes" data-dismiss="modal" onClick={onPress}>
                {t('yes')}
              </button>
              <button
                type="button"
                className="btn btn-no"
                data-dismiss="modal"
              >
                {t("no")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalRestart;
