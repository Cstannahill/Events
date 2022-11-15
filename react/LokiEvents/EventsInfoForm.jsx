import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";

function EventsInfoForm(props) {
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
    <>
      <form onSubmit={handleSubmit}>
        <div className="d-flex wrapper justify-content-center text-dark my-6">
          <div className="form-group col-12 my-3 px-4 py-3 card techFormCard">
            <label className="fw-bold" htmlFor="inputName">
              Name of Event
            </label>
            <input
              type="text"
              className={`form-control techFormInput formInputText my-3 ${
                errors.name && touched.name && "is-invalid"
              }`}
              name="name"
              id="inputName"
              placeholder="Eventropolis"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && touched.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
            <label className="fw-bold" htmlFor="inputHeadline">
              Headline
            </label>
            <input
              type="text"
              className={`form-control techFormInput formInputText my-3 ${
                errors.headline && touched.headline && "is-invalid"
              }`}
              name="headline"
              id="inputHeadline"
              placeholder="4-Day event thing."
              value={values.headline}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.headline && touched.headline && (
              <div className="invalid-feedback">{errors.headline}</div>
            )}
            <label className="fw-bold" htmlFor="inputDescription">
              Description
            </label>
            <input
              type="text"
              className={`form-control techFormInput formInputText my-3 ${
                errors.description && touched.description && "is-invalid"
              }`}
              name="description"
              id="inputDescription"
              placeholder="Eventropolis is an event that etc."
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.description && touched.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
            <label className="fw-bold" htmlFor="inputSummary">
              Summary
            </label>
            <input
              type="text"
              className={`form-control techFormInput formInputText my-3 ${
                errors.summary && touched.summary && "is-invalid"
              }`}
              name="summary"
              id="inputSummary"
              placeholder="4-Day event fair."
              value={values.summary}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.summary && touched.summary && (
              <div className="invalid-feedback">{errors.summary}</div>
            )}
            <label className="fw-bold" htmlFor="inputSlug">
              Slug
            </label>
            <input
              type="text"
              className={`form-control techFormInput formInputText my-3 ${
                errors.slug && touched.slug && "is-invalid"
              }`}
              name="slug"
              id="inputSlug"
              placeholder="xyz123992"
              value={values.slug}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.slug && touched.slug && (
              <div className="invalid-feedback">{errors.slug}</div>
            )}
            <label className="fw-bold" htmlFor="inputStatusId">
              Status
            </label>
            <select
              type="text"
              className="form-control techFormInput formInputText my-3"
              name="statusId"
              id="inputStatusId"
              placeholder="Active, Flagged, Deleted, Not Set"
              value={values.statusId}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                appearance: "menulist",
              }}
            >
              <option value={0} key={`status${0}`}>
                {"Not Set"}
              </option>

              <option value={1} key={`status${1}`}>
                {"Active"}
              </option>

              <option value={2} key={`status${2}`}>
                {" "}
                {"Deleted"}
              </option>

              <option value={3} key={`status${3}`}>
                {" "}
                {"Flagged"}
              </option>
            </select>
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
            className="btn btn-lg btn-primary mx-2"
            disabled={isSubmitting}
          >
            {nextLabel}
          </button>
        </div>
      </form>
    </>
  );
}

export default withFormik({
  mapPropsToValues: (props) => ({
    name: props.event.name,
    headline: props.event.headline,
    description: props.event.description,
    summary: props.event.summary,
    slug: props.event.slug,
    statusId: props.event.statusId,
    id: props.event.id,
  }),

  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    headline: Yup.string().required(),
    description: Yup.string().required(),
    summary: Yup.string().required(),
    slug: Yup.string().required(),
    statusId: Yup.number().integer().required(),
  }),

  handleSubmit: (values, { props }) => {
    props.onNext(values);
  },
})(EventsInfoForm);
