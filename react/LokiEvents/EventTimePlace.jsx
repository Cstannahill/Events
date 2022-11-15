import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";

import AddressAutoComplete from "../../google/AddressAutoComplete";

function EventsLocation(props) {
  const { setEvent } = props;
  const {
    // Formik HOC props
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,

    // Loki props
    backLabel,
    nextLabel,
    onBack,
    // onNext,
    cantBack,
    // isInFinalStep,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex wrapper justify-content-center text-dark my-5">
        <div className="form-group col-12 my-5 px-4 py-3 techFormCard">
          <label className="fw-bold" htmlFor="inputDateStart">
            Start Date
          </label>
          <input
            type="datetime-local"
            className={`form-control techFormInput formInputText my-3 ${
              errors.dateStart && touched.dateStart && "is-invalid"
            }`}
            name="dateStart"
            id="inputDateStart"
            placeholder="Eventropolis"
            value={values.dateStart}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.dateStart && touched.dateStart && (
            <div className="invalid-feedback">{errors.dateStart}</div>
          )}
          <label className="fw-bold" htmlFor="inputDateEnd">
            End Date
          </label>
          <input
            type="datetime-local"
            className={`form-control techFormInput formInputText my-3 ${
              errors.dateEnd && touched.dateEnd && "is-invalid"
            }`}
            name="dateEnd"
            id="inputDateEnd"
            placeholder="4-Day event thing."
            value={values.dateEnd}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.dateEnd && touched.dateEnd && (
            <div className="invalid-feedback">{errors.dateEnd}</div>
          )}

          <label className="fw-bold" htmlFor="inputAddress">
            Address
          </label>
          <AddressAutoComplete values={values} setEvent={setEvent} />
          {errors.address && touched.address && (
            <div className="invalid-feedback">{errors.address}</div>
          )}
          <label className="fw-bold" htmlFor="inputZipCode">
            ZipCode
          </label>
          <input
            type="text"
            className={`form-control techFormInput formInputText my-3 ${
              errors.zipCode && touched.zipCode && "is-invalid"
            }`}
            name="zipCode"
            id="inputZipCode"
            placeholder="4-Day event fair."
            value={values.zipCode}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.zipCode && touched.zipCode && (
            <div className="invalid-feedback">{errors.zipCode}</div>
          )}
        </div>
      </div>

      <div className="button-group text-center">
        <button
          type="button"
          className="btn btn-lg btn-secondary mx-2"
          onClick={onBack}
          disabled={isSubmitting || cantBack}
        >
          {backLabel}
        </button>
        <button
          type="submit"
          className="btn btn-lg btn-md btn-primary mx-2"
          disabled={isSubmitting}
        >
          {nextLabel}
        </button>
      </div>
    </form>
  );
}

export default withFormik({
  mapPropsToValues: (props) => ({
    dateStart: props.event.dateStart,
    dateEnd: props.event.dateEnd,
    address: props.event.address,
    zipCode: props.event.zipCode,
  }),

  validationSchema: Yup.object().shape({
    dateStart: Yup.string().required(),
    dateEnd: Yup.string().required(),
    address: Yup.string().required(),
    zipCode: Yup.string().required(),
  }),

  handleSubmit: (values, { props }) => {
    props.onNext(values);
  },
})(EventsLocation);
