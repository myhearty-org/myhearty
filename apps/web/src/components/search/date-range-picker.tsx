import { Button } from '@mantine/core';
import addDays from 'date-fns/addDays';
import formatISO from 'date-fns/formatISO';
import fromUnixTime from 'date-fns/fromUnixTime';
import getUnixTime from 'date-fns/getUnixTime';
import { useEffect, useState } from 'react';
import { connectRange } from 'react-instantsearch-dom';

type DateRangePickerComponentProps = {
  min: any;
  max: any;
  currentRefinement: any;
  canRefine: boolean;
  refine: any;
  label: string;
};

function DateRangePickerComponent({
  min: defaultMin,
  max: defaultMax,
  currentRefinement,
  canRefine,
  refine,
  label,
}: DateRangePickerComponentProps) {
  const minDate = timestampToYYYYMMDD(defaultMin);
  const maxDate = timestampToYYYYMMDD(defaultMax, true);

  const [startDate, setStartDate] = useState(minDate);
  const [endDate, setEndDate] = useState(maxDate);

  useEffect(() => {
    if (canRefine) {
      setStartDate(timestampToYYYYMMDD(currentRefinement.min));

      const isEndDate = currentRefinement.max === defaultMax;
      setEndDate(timestampToYYYYMMDD(currentRefinement.max, isEndDate));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRefinement.min, currentRefinement.max]);

  if (minDate === maxDate) {
    return null;
  }

  function onMinChange(event: React.ChangeEvent<HTMLInputElement>) {
    const startDate = event.target.value;
    setStartDate(startDate);

    if (endDate && new Date(startDate) > new Date(endDate)) {
      setEndDate(maxDate);
    }
  }

  function onMaxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const endDate = event.target.value;
    setEndDate(endDate);

    if (startDate && new Date(endDate) < new Date(startDate)) {
      setStartDate(minDate);
    }
  }

  function onClick() {
    // Ensures that the date range is valid
    const min = Math.max(getUnixTime(new Date(startDate)), defaultMin);
    const max = Math.min(getUnixTime(new Date(endDate)), defaultMax);

    refine({ min, max });
  }

  return (
    <form className="flex w-full flex-col gap-4" action="" role="search" onSubmit={(e) => e.preventDefault()}>
      <label className="mb-1 whitespace-nowrap px-2 text-sm font-medium">{label}</label>
      <div className="flex w-full flex-col items-center gap-2">
        <input
          className="w-full min-w-0 rounded border border-gray-300 text-center text-xs shadow-sm transition"
          type="date"
          min={minDate}
          max={maxDate}
          value={startDate}
          onChange={onMinChange}
        />
        <span className="px-1.5 text-center text-xs">to</span>
        <input
          className="w-full min-w-0 rounded border border-gray-300 text-center text-xs shadow-sm transition"
          type="date"
          min={minDate}
          max={maxDate}
          value={endDate}
          onChange={onMaxChange}
        />
      </div>
      <Button size="xs" fullWidth type="submit" onClick={onClick}>
        Apply
      </Button>
    </form>
  );
}

export const DateRangePicker = connectRange(DateRangePickerComponent);

function timestampToYYYYMMDD(timestamp: number, isEndDate: boolean = false) {
  if (timestamp) {
    let date = fromUnixTime(timestamp);

    if (isEndDate) {
      date = addDays(fromUnixTime(timestamp), 1);
    }

    return formatISO(date, { representation: 'date' });
  } else {
    return '';
  }
}
