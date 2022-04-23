import toast from 'react-hot-toast';

export function showToast(message: string, variant: 'success' | 'warning' | 'error') {
  switch (variant) {
    case 'success':
      toast.success(message, {
        duration: 6000,
      });
      break;
    case 'warning':
      toast(message, {
        duration: 6000,
        icon: '⚠️',
        style: {
          background: '#FFEDD5',
          color: '#C2410C',
        },
      });
      break;
    case 'error':
      toast.error(message, {
        duration: 6000,
        style: {
          background: '#FEE2E2',
          color: '#B91C1C',
        },
      });
      break;
    default:
      toast.success(message, {
        duration: 6000,
      });
  }
}
