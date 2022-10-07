import styles from './CenteredCard.module.css';

export default function CenteredCard({ children }: { children: React.ReactNode }): JSX.Element {
  return <div className={styles.card}>{children}</div>;
}
