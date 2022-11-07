import { SubmitHandler, useForm, Validate } from 'react-hook-form';

import { MIN_AGE_FOR_APPLICANT } from '../../constants';
import type ApplicantProperties from '../../types/ApplicantProperties';
import Alert from '../common/Alert';
import PrivacyPolicyButtonModal from '../privacy-policy/PrivacyPolicyButtonModal';
// https://getbootstrap.com/docs/5.0/forms/floating-labels/
// https://getbootstrap.com/docs/5.0/forms/layout/
// https://getbootstrap.com/docs/5.0/layout/gutters/

// eslint-disable-next-line max-lines-per-function
export default function ApplicantForm({ onSubmit, loading, error }: { onSubmit: SubmitHandler<ApplicantProperties>; loading: boolean; error: boolean }): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicantProperties>({ mode: 'onTouched' });

  // eslint-disable-next-line no-magic-numbers
  const YEAR_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 365.2425;
  const EMAIL_VALIDATION_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const SPECIAL_CHARACTERS = /[\^!#$%*=<>;{}"]/; // https://documentation.onfido.com/#forbidden-characters

  const validateName: Validate<string> = (name: string) => {
    return !SPECIAL_CHARACTERS.test(name);
  };

  const validateMinAge: Validate<string> = (dateOfBirth: string) => {
    const age = Math.floor((Date.now() - new Date(dateOfBirth).getTime()) / YEAR_IN_MILLISECONDS);
    return age >= MIN_AGE_FOR_APPLICANT;
  };

  const trimInput = (input: string) => input.trim();

  return (
    <>
      {error && <Alert>Sorry an error occured, we invite you to review your information and try again</Alert>}
      <form className="applicant-form mt-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6 pb-2">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                aria-label="First Name"
                disabled={loading}
                {...register('firstName', { required: true, setValueAs: trimInput, validate: validateName })}
                required
              />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="firstName">First Name</label>
              {errors.firstName && (
                <p role="alert" className="d-block invalid-feedback text-start mb-0">
                  {errors.firstName.type === 'required' && 'First name is required'}
                  {errors.firstName.type === 'validate' && 'First name cannot contain special characters such as ^!#$%*=<>;{}"'}
                </p>
              )}
            </div>
          </div>
          <div className="col-md-6 pb-2">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                aria-label="Last Name"
                disabled={loading}
                {...register('lastName', { required: true, setValueAs: trimInput, validate: validateName })}
                required
              />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="lastName">Last Name</label>
              {errors.lastName && (
                <p role="alert" className="d-block invalid-feedback text-start mb-0">
                  {errors.lastName.type === 'required' && 'Last name is required'}
                  {errors.lastName.type === 'validate' && 'Last name cannot contain special characters such as ^!#$%*=<>;{}"'}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="pb-2">
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              aria-label="email"
              disabled={loading}
              {...register('email', {
                required: true,
                pattern: EMAIL_VALIDATION_REGEX,
                setValueAs: trimInput,
              })}
              required
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="email">Email Address</label>
            {errors.email && (
              <p role="alert" className="d-block invalid-feedback text-start mb-0">
                A valid email address is required
              </p>
            )}
          </div>
        </div>

        <div className="pb-2">
          <div className="form-floating">
            <input
              type="date"
              className="form-control"
              aria-label="Date of birth"
              disabled={loading}
              {...register('dob', {
                required: true,
                validate: validateMinAge,
              })}
              required
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="dob">Date of Birth</label>
            {errors.dob && (
              <p role="alert" className="d-block invalid-feedback text-start mb-0">
                Sorry, we can only verify people who are at least 18 years old
              </p>
            )}
          </div>
        </div>

        <div className="pb-2 mt-2">
          <div className="form-floating text-start">
            <div className="form-check">
              <input id="consent" type="checkbox" className="form-check-input" disabled={loading} {...register('consent', { required: true })} required />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="consent" className="form-check-label">
                I have read and agree to the <PrivacyPolicyButtonModal>privacy policy</PrivacyPolicyButtonModal>
              </label>
            </div>
            {errors.consent && (
              <p role="alert" className="d-block invalid-feedback text-start mb-0">
                You must agree to the privacy policy before submitting
              </p>
            )}
          </div>
        </div>

        <div className="d-grid mt-2">
          <button name="submit" type="submit" className="btn btn-lg btn-primary" disabled={loading}>
            Start {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> : <i className="fa fa-chevron-right" aria-hidden="true" />}
          </button>
        </div>
      </form>
    </>
  );
}
