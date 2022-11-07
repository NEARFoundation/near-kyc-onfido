export default function Alert({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="alert alert-warning d-flex text-start" role="alert">
      <div className="me-3 mt-1">
        <i className="fa fa-exclamation-triangle" aria-hidden="true" />
      </div>
      <div>{children}</div>
    </div>
  );
}
