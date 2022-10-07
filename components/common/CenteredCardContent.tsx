import LoadingSpinner from './LoadingSpinner';

import styles from './CenteredCardContent.module.css';

export default function CenteredCardContent({
  title,
  description,
  iconClasses,
  isLoading = false,
  children,
}: {
  title: string;
  description: string;
  iconClasses: string;
  // eslint-disable-next-line react/require-default-props
  isLoading?: boolean;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className={styles.contentCentered}>
      {isLoading && <LoadingSpinner />}
      <i className={iconClasses} style={{ fontSize: '98px' }} aria-hidden="true" />
      <h1 className="fs-2 mb-2">{title}</h1>
      <p className="text-secondary mb-4">{description}</p>
      {children}
    </div>
  );
}
