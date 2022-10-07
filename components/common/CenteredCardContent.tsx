/* eslint-disable react/require-default-props */
import LoadingSpinner from './LoadingSpinner';

import styles from './CenteredCardContent.module.css';

export default function CenteredCardContent({
  title,
  description,
  iconClasses,
  isLoading = false,
  children = null,
}: {
  title: string;
  description: string | JSX.Element;
  iconClasses: string;
  isLoading?: boolean;
  children?: React.ReactNode;
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
