import styles from './Graph.module.scss';
import { getNoteName, getPivotDispersion } from './notes';

const HIGHEST_PIVOT_INDEX = 15; // f#1

const Graph = ({ pctg }: { pctg: number }) => {
  const pivot = Math.round((HIGHEST_PIVOT_INDEX * pctg) / 100);
  const dispersion = getPivotDispersion(pivot, HIGHEST_PIVOT_INDEX);

  const maxValue = Math.max(
    ...getPivotDispersion(HIGHEST_PIVOT_INDEX, HIGHEST_PIVOT_INDEX),
  );

  const totalNotes = dispersion.reduce(
    (acc: number, val: number) => acc + val,
    0,
  );

  return (
    <div className={styles.graph}>
      <div className={styles.info}>
        <p>
          total notes: <span>{totalNotes}</span>
        </p>
        <p>
          pivot: <span>{getNoteName(pivot)}</span>
        </p>
      </div>
      <div className={styles.bars}>
        {dispersion.map((numNotes: number, index: number) => (
          <div className={styles.bar}>
            <p>{`${getNoteName(index)}: ${numNotes}`}</p>
            <div
              style={
                numNotes === 0
                  ? { width: 0, opacity: 0 }
                  : { width: `${(numNotes / maxValue) * 100}%` }
              }
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Graph;
