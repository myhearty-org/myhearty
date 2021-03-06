import { Button } from '@mantine/core';
import { Alert } from '@myhearty/ui/alert';
import { onlyPositiveInteger } from '@myhearty/utils/common';
import inRange from 'lodash/inRange';
import { useEffect, useState } from 'react';
import { connectRange } from 'react-instantsearch-dom';
import Rheostat, { PublicState } from 'rheostat';
import 'rheostat/css/rheostat.css';
import 'rheostat/initialize';

type NumberInputProps = {
  min: number;
  max: number;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function NumberInput({ min, max, value, onChange }: NumberInputProps) {
  return (
    <input
      className="spinner-none min-w-0 rounded border border-gray-300 text-center text-xs shadow-sm transition"
      type="number"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      step="1"
    />
  );
}

type RangeSliderComponentProps = {
  min: number;
  max: number;
  currentRefinement: any;
  canRefine: boolean;
  refine: any;
  label: string;
};

function RangeSliderComponent({
  min: defaultMin,
  max: defaultMax,
  currentRefinement,
  canRefine,
  refine,
  label,
}: RangeSliderComponentProps) {
  const [min, setMin] = useState(defaultMin);
  const [max, setMax] = useState(defaultMax);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    if (canRefine) {
      setMin(currentRefinement.min);
      setMax(currentRefinement.max);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRefinement.min, currentRefinement.max]);

  if (defaultMin === defaultMax) {
    return null;
  }

  function onChange({ values: [min, max] }: PublicState) {
    setErrorMessage('');

    if (currentRefinement.min !== min || currentRefinement.max !== max) {
      refine({ min, max });
    }
  }

  function onValuesUpdated({ values: [min, max] }: PublicState) {
    setErrorMessage('');

    setMin(min);
    setMax(max);
  }

  function onMinChange(event: React.ChangeEvent<HTMLInputElement>) {
    setErrorMessage('');

    if (onlyPositiveInteger(event.target.value)) {
      setMin(event.target.valueAsNumber);
    }
  }

  function onMaxChange(event: React.ChangeEvent<HTMLInputElement>) {
    setErrorMessage('');

    if (onlyPositiveInteger(event.target.value)) {
      setMax(event.target.valueAsNumber);
    }
  }

  function onClick() {
    setErrorMessage('');

    if (min > max) {
      setErrorMessage('Please input valid range');
      return;
    }

    if (
      (currentRefinement.min !== min || currentRefinement.max !== max) &&
      inRange(min, defaultMin, defaultMax + 1) &&
      inRange(max, defaultMin, defaultMax + 1)
    ) {
      refine({ min, max });
    }
  }

  return (
    <form className="flex w-full flex-col gap-4" action="" role="search" onSubmit={(e) => e.preventDefault()}>
      <label className="whitespace-nowrap px-2 text-sm font-medium">{label}</label>
      <div className="relative px-2">
        <Rheostat
          min={defaultMin}
          max={defaultMax}
          values={[currentRefinement.min, currentRefinement.max]}
          onChange={onChange}
          onValuesUpdated={onValuesUpdated}
          snap
        />
      </div>
      <div className="flex items-center justify-between">
        <NumberInput min={defaultMin} max={defaultMax - 1} value={min} onChange={onMinChange} />
        <span className="px-1.5 text-xs">to</span>
        <NumberInput min={defaultMin + 1} max={defaultMax} value={max} onChange={onMaxChange} />
      </div>
      {errorMessage && <Alert severity="error" message={errorMessage} />}
      <Button size="xs" fullWidth type="submit" onClick={onClick}>
        Apply
      </Button>
    </form>
  );
}

export const RangeSlider = connectRange(RangeSliderComponent);
