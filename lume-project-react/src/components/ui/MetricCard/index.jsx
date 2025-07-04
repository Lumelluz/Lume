import styles from './MetricCard.module.css'

const MetricCard = ({ id, title, value, trend, trendColor }) => (
    <div id={id} className={styles.metricCard}>
        <h3 className={styles.metricTitle}>{title}</h3>
        <p className={styles.metricValue}>{value}</p>
        <p className={`${styles.metricTrend} ${styles[trendColor]}`} data-trend={trend}>{trend}</p>
    </div>
);

export default MetricCard;