import {
  useRef,
  type Dispatch,
  type MouseEvent,
  type SetStateAction,
  type TouchEvent,
} from 'react';
import styles from './Slider.module.scss';

const Slider = ({
  pctg,
  setPctg,
}: {
  pctg: number;
  setPctg: Dispatch<SetStateAction<number>>;
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{
    startX: number;
    startPctg: number;
    isDragging: boolean;
  }>({
    startX: 0,
    startPctg: 0,
    isDragging: false,
  });

  const getClientX = (
    e: MouseEvent | TouchEvent | globalThis.MouseEvent | globalThis.TouchEvent,
  ) => {
    if ('clientX' in e) return e.clientX;
    if ('touches' in e && e.touches.length) return e.touches[0].clientX;
    if ('changedTouches' in e && e.changedTouches.length)
      return e.changedTouches[0].clientX;
    return 0;
  };

  const handleThumbDown = (e: MouseEvent | TouchEvent) => {
    e.stopPropagation();
    if ((e as TouchEvent).touches) {
      (e as TouchEvent).preventDefault();
    }

    dragState.current.startX = getClientX(e);
    dragState.current.startPctg = pctg;
    dragState.current.isDragging = true;

    window.addEventListener('mousemove', handleDrag);
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchmove', handleDrag, { passive: false });
    window.addEventListener('touchend', handleDragEnd);
  };

  const handleDrag = (e: globalThis.MouseEvent | globalThis.TouchEvent) => {
    const track = trackRef.current;
    if (!track || !dragState.current.isDragging) return;
    if ('touches' in e) e.preventDefault();
    const clientX = getClientX(e);
    const deltaX = clientX - dragState.current.startX;
    const deltaPctg = (deltaX / track.offsetWidth) * 100;
    const newPctgCandidate = dragState.current.startPctg + deltaPctg;
    const newPctg = Math.max(0, Math.min(100, newPctgCandidate));
    setPctg(newPctg);
  };

  const handleDragEnd = () => {
    dragState.current.isDragging = false;
    window.removeEventListener('mousemove', handleDrag);
    window.removeEventListener('mousemove', handleDragEnd);
    window.removeEventListener('touchmove', handleDrag);
    window.removeEventListener('touchend', handleDragEnd);
  };

  return (
    <div className={styles.slider} ref={trackRef}>
      <div
        className={styles.ball}
        style={{ left: `${pctg}%` }}
        onMouseDown={(e) => handleThumbDown(e)}
        onTouchStart={(e) => handleThumbDown(e)}
      />
    </div>
  );
};

export default Slider;
