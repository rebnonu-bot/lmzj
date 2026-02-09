import { ref } from 'vue';

export interface AnimateOptions {
  duration?: number;
  decimals?: number;
}

export function useNumberAnimation() {
  const animateNumber = (
    targetValue: string | number,
    onUpdate: (val: string) => void,
    options: AnimateOptions = {}
  ) => {
    const { duration = 1500, decimals = 2 } = options;
    const target = typeof targetValue === 'string' ? parseFloat(targetValue) : targetValue;
    
    if (isNaN(target)) return;

    const startTime = Date.now();
    const hasDecimal = typeof targetValue === 'string' ? targetValue.includes('.') : false;

    const easeOutExpo = (x: number): number => {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    };

    const update = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const current = target * easeOutExpo(progress);

      let displayValue: string;
      if (hasDecimal || decimals > 0) {
        displayValue = current.toFixed(decimals);
      } else {
        displayValue = Math.floor(current).toString();
      }

      onUpdate(displayValue);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        onUpdate(target.toFixed(hasDecimal ? decimals : 0));
      }
    };

    requestAnimationFrame(update);
  };

  return {
    animateNumber
  };
}
