import { Status } from '@/interfaces/Order';

export const getOrderStatusColor = (status: Status): string => {
  switch (status) {
    case Status.incomplete:
      return 'bg-gray-500 text-black';
    case Status.unpaid:
      return 'bg-red-500 text-black';
    case Status.paid:
      return 'bg-orange-500 text-black';
    case Status.outForDeliver:
      return 'bg-yellow-500 text-black';
    case Status.complete:
      return 'bg-green-500 text-black';
    case Status.refunded:
        return `bg-blue text-black`;
    default:
      return 'bg-gray-700 text-black';
  }
};

export const getOrderStatusString = (status: Status): string => {
    switch (status) {
      case Status.incomplete:
        return 'Incomplete';
      case Status.unpaid:
        return 'Awaiting Payment';
      case Status.paid:
        return 'Payment Complete';
      case Status.outForDeliver:
        return 'Out for Delivery';
      case Status.complete:
        return 'Complete';
      case Status.refunded:
          return `Refunded`;
      default:
        return 'Incomplete';
    }
  };

export const getOrderRefundable = (status: Status): boolean =>{
    switch (status) {
        case Status.incomplete:
          return false;
        case Status.unpaid:
          return false;
        case Status.paid:
          return true;
        case Status.outForDeliver:
          return true;
        case Status.complete:
          return true;
        case Status.refunded:
            return false;
        default:
          return false;
      }
  }
  

