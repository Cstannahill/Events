import React from "react";
import { withFormik } from "formik";

function EventsImage(props) {
  const {
    // Formik HOC props
    values,
    // touched,
    // errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    // handleFile,
    // Loki props,
    backLabel,
    nextLabel,
    onBack,
    // onNext,
    cantBack,
    // isInFinalStep,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex wrapper justify-content-center text-dark my-6">
        <div className="form-group col-12 my-3 px-4 py-3 card techFormCard">
          <label className="fw-bold" htmlFor="inputImgUrl">
            Images
          </label>
          <input
            type="text"
            className="form-control techFormInput formInputText my-3"
            name="primaryImage.url"
            id="inputImgUrl"
            placeholder="https://image.architonic.com/imgArc/project-1/4/5201637/evolution-design-google-hub-architonic-009-f0-reception-02.jpg"
            value={values?.primaryImage?.url}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <label className="fw-bold" htmlFor="inputTypeId">
            Image Type
          </label>
          <div className="form-group">
            <select
              type="text"
              className="form-control techFormInput formInputText my-3"
              name="primaryImage.typeId"
              id="inputTypeId"
              placeholder="Event"
              value={values?.primaryImage?.typeId}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                appearance: "menulist",
              }}
            >
              <option value={6} key={`status${6}`}>
                {"Flyer"}
              </option>

              <option value={7} key={`status${7}`}>
                {"Event"}
              </option>

              <option value={8} key={`status${8}`}>
                {" "}
                {"Venue"}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div className="button-group text-center">
        <button
          type="button"
          className="btn btn-lg mx-2 btn-secondary"
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
  );
}

export default withFormik({
  mapPropsToValues: (props) => ({
    primaryImage: {
      id: props.event.primaryImage.id,
      url: props.event.primaryImage.url,
      typeId: props.event.primaryImage.typeId,
    },
  }),

  //   validationSchema: Yup.object().shape({
  //     name: Yup.string().required(),
  //     email: Yup.string().email().required(),
  //   }),

  handleSubmit: (values, { props }) => {
    props.onNext(values);
  },
})(EventsImage);
