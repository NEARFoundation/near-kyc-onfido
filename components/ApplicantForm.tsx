export default function ApplicantForm({ onSubmit }: { onSubmit: (event: React.SyntheticEvent) => {} }): JSX.Element {
  // TODO Remove each field's defaultValue
  return (
    <form className="applicant-form" onSubmit={onSubmit}>
      <div className="form-group row">
        <label htmlFor="firstName" className="col-4 col-form-label">
          First Name
        </label>
        <div className="col-8">
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fa fa-id-card-o"></i>
              </div>
            </div>
            <input name="firstName" placeholder="Steve" defaultValue="Steve" type="text" className="form-control" required />
          </div>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="lastName" className="col-4 col-form-label">
          Last Name
        </label>
        <div className="col-8">
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fa fa-id-card-o"></i>
              </div>
            </div>
            <input name="lastName" placeholder="Jones" defaultValue="Jones" type="text" className="form-control" required />
          </div>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="email" className="col-4 col-form-label">
          Email Address
        </label>
        <div className="col-8">
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fa fa-envelope-o"></i>
              </div>
            </div>
            <input name="email" placeholder="sandra@example.com" defaultValue="steve@example.com" type="email" className="form-control" required />
          </div>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="dob" className="col-4 col-form-label">
          Date of Birth
        </label>
        <div className="col-8">
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fa fa-calendar"></i>
              </div>
            </div>
            <input name="dob" placeholder="1980-01-29" defaultValue="1980-02-02" type="date" className="form-control" required />
          </div>
        </div>
      </div>
      <div className="form-group row">
        <div className="offset-4 col-8">
          <button name="submit" type="submit" className="btn btn-primary">
            Start <i className="fa fa-chevron-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
}
