import React from "react";
import { MTick } from "../../../assets";
import { useTranslation } from "react-i18next";


const ModalDone = ({ label }) => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Modal
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
          <div className="modal-content md-content">
            <div className="modal-body">
              <div className="md-body">
                <img src={MTick} />
                <p className="md-p">{t("congratulations")}</p>
                <p>
                  {t('modal-body')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDone;
