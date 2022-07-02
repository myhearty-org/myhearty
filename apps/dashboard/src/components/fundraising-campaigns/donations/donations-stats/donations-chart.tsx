import { LoadingChart } from '@components/ui/loading';
import { RadioGroup } from '@headlessui/react';
import { Metrics } from '@myhearty/lib/types';
import { toLocaleFixed } from '@myhearty/utils/common';
import { ApexOptions } from 'apexcharts';
import cn from 'classnames';
import sub from 'date-fns/sub';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Props as ApexChartProps } from 'react-apexcharts';

const Chart = dynamic<ApexChartProps>(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <LoadingChart title={false} />,
});

type DonationsChartProps = {
  metrics: Metrics;
};

export function DonationsChart({ metrics }: DonationsChartProps) {
  const series = [
    {
      name: 'Donation',
      data: metrics.data,
      color: '#ec4899',
    },
  ];

  const [timeline, setTimeline] = useState('oneYear');

  function updateTimeline(timeline: string) {
    setTimeline(timeline);

    const startDate = metrics.data[0][0];
    const endDate = metrics.data[metrics.data.length - 1][0];

    let start = sub(endDate, { years: 1 }).getTime();

    if (timeline === 'oneMonth') {
      start = sub(endDate, { months: 1 }).getTime();
    } else if (timeline === 'threeMonths') {
      start = sub(endDate, { months: 3 }).getTime();
    } else if (timeline === 'sixMonths') {
      start = sub(endDate, { months: 6 }).getTime();
    }

    ApexCharts.exec('donations-area-chart', 'zoomX', Math.max(start, startDate), endDate);
  }

  return (
    <div className="flex w-full flex-col gap-4 rounded border border-gray-200 bg-white py-3 px-6 shadow-sm">
      <div className="flex flex-col justify-between gap-3 border-b border-gray-200 pb-1 sm:flex-row">
        <h2 className="font-medium">Total Raised Amount</h2>
        <TimelineRadioGroup value={timeline} onChange={updateTimeline} />
      </div>
      <Chart type="area" height={350} series={series} options={options} />
    </div>
  );
}

type TimelineRadioGroupProps = {
  value: string;
  onChange: (value: string) => void;
};

const timelineOptions = [
  { name: '1M', timeline: 'oneMonth' },
  { name: '3M', timeline: 'threeMonths' },
  { name: '6M', timeline: 'sixMonths' },
  { name: '1Y', timeline: 'oneYear' },
];

function TimelineRadioGroup({ value, onChange }: TimelineRadioGroupProps) {
  return (
    <RadioGroup value={value} onChange={onChange}>
      <RadioGroup.Label className="sr-only">Choose a timeline option</RadioGroup.Label>
      <div className="grid grid-cols-4 gap-3">
        {timelineOptions.map(({ name, timeline }) => (
          <RadioGroup.Option
            key={name}
            value={timeline}
            className={({ active, checked }) =>
              cn(
                'flex cursor-pointer items-center justify-center rounded border px-3 py-1 text-sm font-medium focus:outline-none',
                active && 'ring ring-pink-300',
                checked
                  ? 'border-transparent bg-pink-500 text-white'
                  : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50'
              )
            }>
            <RadioGroup.Label as="p">{name}</RadioGroup.Label>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}

const options: ApexOptions = {
  chart: {
    id: 'donations-area-chart',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica Neue, Ubuntu',
    foreColor: '#111827',
    toolbar: {
      show: false,
    },
  },
  fill: {
    type: 'solid',
    opacity: 0.3,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    x: {
      format: 'dd MMM yyyy',
    },
    style: {
      fontSize: '14px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica Neue, Ubuntu',
    },
  },
  grid: {
    show: false,
  },
  xaxis: {
    type: 'datetime',
    labels: {
      style: {
        colors: ['#111827'],
        fontSize: '14px',
        fontWeight: 500,
      },
    },
    axisBorder: {
      color: '#F3F4F6',
    },
    axisTicks: {
      color: '#F3F4F6',
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: ['#111827'],
        fontSize: '14px',
        fontWeight: 500,
      },
      formatter: (value) => `RM${toLocaleFixed(value)}`,
    },
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        xaxis: {
          labels: {
            show: false,
          },
        },
      },
    },
  ],
};
