export interface BookingItem {
  id: string;
  serviceTitle: string;
  bookingCode: string;
  businessName: string;
  phone: string;
  address: string;
  date: string;
  time: string;
  duration: string;
  paymentType: "deposit_paid" | "no_deposit" | "passed_fee" | "passed_not_possible" | "completed" | "noshow" | "canceled";
  depositPaidAmount?: string;
  atVenueAmount: string;
  imageUrl: string;
  reschedulesLeft: number;
  freeCancelUntil?: string;
  bookedOnText?: string;
  policyName: string;
  policyRules: {
    label: string;
    value: string;
    isHighlighted?: boolean;
    isGreen?: boolean;
  }[];
  policyFooter: string;
  // Completed review states
  isReviewed?: boolean;
  reviewStars?: number;
  reviewText?: string;
  reviewDate?: string;
  paymentSummary?: {
    total: string;
    depositPaid: string;
    balancePaid: string;
    noDepositVariant?: boolean;
  };
  // No-show states
  noshowType?: "waived_refund" | "waived_returning" | "charged_retained" | "charged_additional" | "charged_no_deposit";
  noshowDateText?: string;
  noshowSummary?: {
    servicePrice: string;
    noShowFee: string;
    depositPaidText?: string;
    depositRetainedText?: string;
    additionalChargeText?: string;
    chargeInitiatedText?: string;
    totalCharged: string;
    footerNote?: string;
  };
  // Canceled states
  canceledType?: "by_you_free" | "by_business_no_deposit" | "by_business_deposit_refunded" | "by_you_retained_13" | "by_you_retained_50" | "by_you_fee_50";
  canceledDateText?: string;
  canceledSummary?: {
    servicePrice: string;
    depositPaid: string;
    refundedToCard?: string;
    refundCompletedText?: string;
    cancellationFee?: string;
    depositRetainedText?: string;
    additionalChargeText?: string;
    returningCustomerNoDeposit?: boolean;
    totalFee: string;
    footerNote?: string;
  };
}

export const bookingsList: BookingItem[] = [
  {
    id: "booking-1",
    serviceTitle: "Men's Haircut & Beard Trim",
    bookingCode: "123456",
    businessName: "Uncle SAM Gents Salon",
    phone: "+8566666",
    address: "Ermou 14, Larnacca",
    date: "Thu, 24 Oct",
    time: "10:30 AM",
    duration: "45min",
    paymentType: "deposit_paid",
    depositPaidAmount: "€35.00",
    atVenueAmount: "€35.00",
    imageUrl: "/image/profile.jpg",
    reschedulesLeft: 2,
    freeCancelUntil: "Wed 28 May at 10:30 AM",
    policyName: "Mario London Barber - cancellation & no show policy",
    policyRules: [
      { label: "More than 24 hours before", value: "Free", isGreen: true },
      { label: "12-24 hours before", value: "20% of service price" },
      { label: "2-12 hours before", value: "30% of service price" },
      { label: "Under 2 hours before", value: "50% of service price" },
      { label: "No-show", value: "50% of service price" },
    ],
    policyFooter: "Fees set by Mario London Barber, not by Bookly. Based on full service price.",
  },
  {
    id: "booking-2",
    serviceTitle: "Men's Haircut & Beard Trim",
    bookingCode: "123456",
    businessName: "Uncle SAM Gents Salon",
    phone: "+8566666",
    address: "Ermou 14, Larnacca",
    date: "Thu, 24 Oct",
    time: "10:30 AM",
    duration: "45min",
    paymentType: "no_deposit",
    atVenueAmount: "€35.00",
    imageUrl: "/image/profile.jpg",
    reschedulesLeft: 2,
    freeCancelUntil: "Wed 28 May at 10:30 AM",
    policyName: "Mario London Barber - cancellation & no show policy",
    policyRules: [
      { label: "More than 24 hours before", value: "Free", isGreen: true },
      { label: "12-24 hours before", value: "20% of service price" },
      { label: "2-12 hours before", value: "30% of service price" },
      { label: "Under 2 hours before", value: "50% of service price" },
      { label: "No-show", value: "50% of service price" },
    ],
    policyFooter: "Fees set by Mario London Barber, not by Bookly. Based on full service price.",
  },
  {
    id: "booking-3",
    serviceTitle: "Men's Haircut & Beard Trim",
    bookingCode: "123456",
    businessName: "Uncle SAM Gents Salon",
    phone: "+8566666",
    address: "Archangelou, 5 Larnaca",
    date: "Thu, 24 Oct",
    time: "10:30 AM",
    duration: "45min",
    paymentType: "passed_fee",
    depositPaidAmount: "€35.00",
    atVenueAmount: "€35.00",
    imageUrl: "/image/profile.jpg",
    reschedulesLeft: 2,
    policyName: "LCA Studios -- cancellation & no-show policy",
    policyRules: [
      { label: "More than 7 day before", value: "Free", isGreen: true },
      { label: "3-7 days before", value: "30% of service price" },
      { label: "Under 3 days - applies now", value: "50% of service price = €250", isHighlighted: true },
      { label: "No-show", value: "100% of service price" },
    ],
    policyFooter: "Fees set by Mario London Barber, not by Bookly. Based on full service price.",
  },
  {
    id: "booking-4",
    serviceTitle: "Men's Haircut & Beard Trim",
    bookingCode: "123456",
    businessName: "Uncle SAM Gents Salon",
    phone: "+8566666",
    address: "Archangelou, 5 Larnaca",
    date: "Thu, 24 Oct",
    time: "10:30 AM",
    duration: "45min",
    paymentType: "passed_not_possible",
    depositPaidAmount: "€35.00",
    atVenueAmount: "€35.00",
    imageUrl: "/image/profile.jpg",
    reschedulesLeft: 2,
    policyName: "LCA Studios -- cancellation & no-show policy",
    policyRules: [
      { label: "More than 7 day before", value: "Free", isGreen: true },
      { label: "3-7 days before", value: "30% of service price" },
      { label: "Under 3 days - applies now", value: "50% of service price = €250" },
      { label: "No-show", value: "100% of service price", isHighlighted: true },
    ],
    policyFooter: "Fees set by Mario London Barber, not by Bookly. Based on full service price.",
  },
  {
    id: "booking-5",
    serviceTitle: "Men's Haircut & Beard Trim",
    bookingCode: "123456",
    businessName: "Uncle SAM Gents Salon",
    phone: "+8566666",
    address: "Ermou 14, Larnacca",
    date: "Thu, 24 Oct",
    time: "10:30 AM",
    duration: "45min",
    paymentType: "completed",
    atVenueAmount: "€35.00",
    imageUrl: "/image/profile.jpg",
    reschedulesLeft: 0,
    bookedOnText: "Booked on Mon 7 Apr 2026 at 2:15 PM",
    policyName: "Payment summary",
    policyRules: [],
    policyFooter: "",
    isReviewed: true,
    reviewStars: 4,
    reviewText: "“Great cut and friendly service. Will be back.”",
    reviewDate: "Posted Fri 11 Apr 2026",
    paymentSummary: {
      total: "€35.00",
      depositPaid: "€35.00",
      balancePaid: "€35.00"
    }
  },
  {
    id: "booking-6",
    serviceTitle: "Men's Haircut & Beard Trim",
    bookingCode: "123456",
    businessName: "Uncle SAM Gents Salon",
    phone: "+8566666",
    address: "Ermou 14, Larnacca",
    date: "Thu, 24 Oct",
    time: "10:30 AM",
    duration: "45min",
    paymentType: "completed",
    atVenueAmount: "€35.00",
    imageUrl: "/image/profile.jpg",
    reschedulesLeft: 0,
    bookedOnText: "Booked on Mon 7 Apr 2026 at 2:15 PM",
    policyName: "Payment summary",
    policyRules: [],
    policyFooter: "",
    isReviewed: false,
    paymentSummary: {
      total: "€35.00",
      depositPaid: "€0.00",
      balancePaid: "€35.00",
      noDepositVariant: true
    }
  },
  {
    id: "booking-noshow-1",
    serviceTitle: "Men's Haircut & Beard Trim",
    bookingCode: "123456",
    businessName: "Uncle SAM Gents Salon",
    phone: "+8566666",
    address: "Ermou 14, Larnacca",
    date: "Thu, 24 Oct",
    time: "10:30 AM",
    duration: "45min",
    paymentType: "noshow",
    atVenueAmount: "€50.00",
    imageUrl: "/image/profile.jpg",
    reschedulesLeft: 0,
    bookedOnText: "Booked on Mon 7 Apr 2026 at 2:15 PM",
    noshowType: "waived_refund",
    noshowDateText: "No-show fee waived on Fri 17 Apr 2026 at 4:30 PM",
    policyName: "Mario London Barber - cancellation & no show policy",
    policyRules: [
      { label: "More than 24 hours before", value: "Free", isGreen: true },
      { label: "12-24 hours before", value: "20% of service price" },
      { label: "2-12 hours before", value: "30% of service price" },
      { label: "Under 2 hours before", value: "50% of service price" },
      { label: "No-show", value: "50% of service price" },
    ],
    policyFooter: "Fees set by Mario London Barber, not by Bookly. Based on full service price.",
    noshowSummary: {
      servicePrice: "€50.00",
      depositPaidText: "€10.00",
      noShowFee: "€0.00 charged",
      depositRetainedText: "€10.00",
      totalCharged: "€0.00",
      footerNote: "Uncle SAM Gents Salon chose to waive the fee for this appointment. Your next booking at Uncle SAM Gents Salon will require no deposit."
    }
  },
  {
    id: "booking-noshow-2",
    serviceTitle: "Men's Haircut & Beard Trim",
    bookingCode: "123456",
    businessName: "Uncle SAM Gents Salon",
    phone: "+8566666",
    address: "Ermou 14, Larnacca",
    date: "Thu, 24 Oct",
    time: "10:30 AM",
    duration: "45min",
    paymentType: "noshow",
    atVenueAmount: "€50.00",
    imageUrl: "/image/profile.jpg",
    reschedulesLeft: 0,
    bookedOnText: "Booked on Mon 7 Apr 2026 at 2:15 PM",
    noshowType: "waived_returning",
    noshowDateText: "No-show fee waived on Fri 17 Apr 2026 at 4:30 PM",
    policyName: "Mario London Barber - cancellation & no show policy",
    policyRules: [
      { label: "More than 24 hours before", value: "Free", isGreen: true },
      { label: "12-24 hours before", value: "20% of service price" },
      { label: "2-12 hours before", value: "30% of service price" },
      { label: "Under 2 hours before", value: "50% of service price" },
      { label: "No-show", value: "50% of service price" },
    ],
    policyFooter: "Fees set by Mario London Barber, not by Bookly. Based on full service price.",
    noshowSummary: {
      servicePrice: "€50.00",
      depositPaidText: "Deposit not needed - returning customer",
      noShowFee: "€0.00 charged",
      totalCharged: "€0.00",
      footerNote: "Uncle SAM Gents Salon chose to waive the fee for this appointment."
    }
  },
  {
    id: "booking-noshow-3",
    serviceTitle: "Men's Haircut & Beard Trim",
    bookingCode: "123456",
    businessName: "Uncle SAM Gents Salon",
    phone: "+8566666",
    address: "Ermou 14, Larnacca",
    date: "Thu, 24 Oct",
    time: "10:30 AM",
    duration: "45min",
    paymentType: "noshow",
    atVenueAmount: "€80.00",
    imageUrl: "/image/profile.jpg",
    reschedulesLeft: 0,
    bookedOnText: "Booked on Mon 7 Apr 2026 at 2:15 PM",
    noshowType: "charged_retained",
    noshowDateText: "No-show fee charged on Fri 17 Apr 2026 at 4:30 PM",
    policyName: "Mario London Barber - cancellation & no show policy",
    policyRules: [
      { label: "More than 24 hours before", value: "Free", isGreen: true },
      { label: "12-24 hours before", value: "20% of service price" },
      { label: "2-12 hours before", value: "30% of service price" },
      { label: "Under 2 hours before", value: "50% of service price" },
      { label: "No-show", value: "50% of service price" },
    ],
    policyFooter: "Fees set by Mario London Barber, not by Bookly. Based on full service price.",
    noshowSummary: {
      servicePrice: "€80.00",
      noShowFee: "€16.00 (20% - set by Business name)",
      depositRetainedText: "€16.00",
      additionalChargeText: "€0.00",
      chargeInitiatedText: "Charge initiated by Uncle SAM Gents Salon on Mon 7 Apr 2026 at 10:00 AM",
      totalCharged: "€16.00"
    }
  },
  {
    id: "booking-noshow-4",
    serviceTitle: "Men's Haircut & Beard Trim",
    bookingCode: "123456",
    businessName: "Uncle SAM Gents Salon",
    phone: "+8566666",
    address: "Ermou 14, Larnacca",
    date: "Thu, 24 Oct",
    time: "10:30 AM",
    duration: "45min",
    paymentType: "noshow",
    atVenueAmount: "€80.00",
    imageUrl: "/image/profile.jpg",
    reschedulesLeft: 0,
    bookedOnText: "Booked on Mon 7 Apr 2026 at 2:15 PM",
    noshowType: "charged_additional",
    noshowDateText: "No-show fee charged on Fri 17 Apr 2026 at 4:30 PM",
    policyName: "Mario London Barber - cancellation & no show policy",
    policyRules: [
      { label: "More than 24 hours before", value: "Free", isGreen: true },
      { label: "12-24 hours before", value: "20% of service price" },
      { label: "2-12 hours before", value: "30% of service price" },
      { label: "Under 2 hours before", value: "50% of service price" },
      { label: "No-show", value: "50% of service price" },
    ],
    policyFooter: "Fees set by Mario London Barber, not by Bookly. Based on full service price.",
    noshowSummary: {
      servicePrice: "€80.00",
      noShowFee: "€40.00 (50% - set by Business name)",
      depositRetainedText: "€16.00",
      additionalChargeText: "€24.00",
      chargeInitiatedText: "Charge initiated by Uncle SAM Gents Salon on Mon 7 Apr 2026 at 10:00 AM",
      totalCharged: "€40.00"
    }
  },
  {
    id: "booking-noshow-5",
    serviceTitle: "Men's Haircut & Beard Trim",
    bookingCode: "123456",
    businessName: "Uncle SAM Gents Salon",
    phone: "+8566666",
    address: "Ermou 14, Larnacca",
    date: "Thu, 24 Oct",
    time: "10:30 AM",
    duration: "45min",
    paymentType: "noshow",
    atVenueAmount: "€80.00",
    imageUrl: "/image/profile.jpg",
    reschedulesLeft: 0,
    bookedOnText: "Booked on Mon 7 Apr 2026 at 2:15 PM",
    noshowType: "charged_no_deposit",
    noshowDateText: "No-show fee charged on Fri 17 Apr 2026 at 4:30 PM",
    policyName: "Mario London Barber - cancellation & no show policy",
    policyRules: [
      { label: "More than 24 hours before", value: "Free", isGreen: true },
      { label: "12-24 hours before", value: "20% of service price" },
      { label: "2-12 hours before", value: "30% of service price" },
      { label: "Under 2 hours before", value: "50% of service price" },
      { label: "No-show", value: "50% of service price" },
    ],
    policyFooter: "Fees set by Mario London Barber, not by Bookly. Based on full service price.",
    noshowSummary: {
      servicePrice: "€80.00",
      noShowFee: "€40.00 (50% - set by Business name)",
      depositPaidText: "Deposit not needed - returning customer",
      chargeInitiatedText: "Charge initiated by Uncle SAM Gents Salon on Mon 7 Apr 2026 at 10:00 AM",
      totalCharged: "€40.00"
    }
  },
  {
    id: "booking-canceled-1",
    serviceTitle: "Men's Haircut & Beard Trim",
    bookingCode: "123456",
    businessName: "Uncle SAM Gents Salon",
    phone: "+8566666",
    address: "Ermou 14, Larnacca",
    date: "Thu, 24 Oct",
    time: "10:00 AM",
    duration: "45min",
    paymentType: "canceled",
    atVenueAmount: "€50.00",
    imageUrl: "/image/profile.jpg",
    reschedulesLeft: 0,
    bookedOnText: "Booked on Mon 7 Apr 2026 at 2:15 PM",
    canceledType: "by_you_free",
    canceledDateText: "Cancelled on Fri 17 Apr 2026 at 4:30 PM",
    policyName: "Mario London Barber - cancellation & no show policy",
    policyRules: [
      { label: "More than 24 hours before", value: "Free", isGreen: true },
      { label: "12-24 hours before", value: "20% of service price" },
      { label: "2-12 hours before", value: "30% of service price" },
      { label: "Under 2 hours before", value: "50% of service price" },
      { label: "No-show", value: "50% of service price" },
    ],
    policyFooter: "Fees set by Mario London Barber, not by Bookly. Based on full service price.",
    canceledSummary: {
      servicePrice: "€50.00",
      depositPaid: "€10.00",
      refundedToCard: "€10.00",
      refundCompletedText: "Refund completed 7 Apr 2026 at 2:15 PM",
      totalFee: "€10.00",
      footerNote: "When a business cancels, no fee is ever charged to you. Allow 3-5 business days for your refund"
    }
  },
  {
    id: "booking-canceled-2",
    serviceTitle: "Men's Haircut & Beard Trim",
    bookingCode: "123456",
    businessName: "Uncle SAM Gents Salon",
    phone: "+8566666",
    address: "Ermou 14, Larnacca",
    date: "Thu, 24 Oct",
    time: "10:00 AM",
    duration: "45min",
    paymentType: "canceled",
    atVenueAmount: "€500.00",
    imageUrl: "/image/profile.jpg",
    reschedulesLeft: 0,
    bookedOnText: "Booked on Mon 7 Apr 2026 at 2:15 PM",
    canceledType: "by_business_no_deposit",
    canceledDateText: "Cancelled by business name Fri 17 Apr 2026 at 4:30 PM",
    policyName: "Mario London Barber - cancellation & no show policy",
    policyRules: [
      { label: "More than 24 hours before", value: "Free", isGreen: true },
      { label: "12-24 hours before", value: "20% of service price" },
      { label: "2-12 hours before", value: "30% of service price" },
      { label: "Under 2 hours before", value: "50% of service price" },
      { label: "No-show", value: "50% of service price" },
    ],
    policyFooter: "Fees set by Mario London Barber, not by Bookly. Based on full service price.",
    canceledSummary: {
      servicePrice: "€500.00",
      depositPaid: "€0.00",
      totalFee: "€0.00"
    }
  },
  {
    id: "booking-canceled-3",
    serviceTitle: "Men's Haircut & Beard Trim",
    bookingCode: "123456",
    businessName: "Uncle SAM Gents Salon",
    phone: "+8566666",
    address: "Ermou 14, Larnacca",
    date: "Thu, 24 Oct",
    time: "10:00 AM",
    duration: "45min",
    paymentType: "canceled",
    atVenueAmount: "€500.00",
    imageUrl: "/image/profile.jpg",
    reschedulesLeft: 0,
    bookedOnText: "Booked on Mon 7 Apr 2026 at 2:15 PM",
    canceledType: "by_business_deposit_refunded",
    canceledDateText: "Cancelled by business name Fri 17 Apr 2026 at 4:30 PM",
    policyName: "Mario London Barber - cancellation & no show policy",
    policyRules: [
      { label: "More than 24 hours before", value: "Free", isGreen: true },
      { label: "12-24 hours before", value: "20% of service price" },
      { label: "2-12 hours before", value: "30% of service price" },
      { label: "Under 2 hours before", value: "50% of service price" },
      { label: "No-show", value: "50% of service price" },
    ],
    policyFooter: "Fees set by Mario London Barber, not by Bookly. Based on full service price.",
    canceledSummary: {
      servicePrice: "€500.00",
      depositPaid: "€35.00",
      refundedToCard: "€35.00",
      refundCompletedText: "Refund completed 7 Apr 2026 at 2:15 PM",
      totalFee: "€35.00",
      footerNote: "When a business cancels, no fee is ever charged to you. Allow 3-5 business days for your refund"
    }
  },
  {
    id: "booking-canceled-4",
    serviceTitle: "Men's Haircut & Beard Trim",
    bookingCode: "123456",
    businessName: "Uncle SAM Gents Salon",
    phone: "+8566666",
    address: "Ermou 14, Larnacca",
    date: "Thu, 24 Oct",
    time: "10:00 AM",
    duration: "45min",
    paymentType: "canceled",
    atVenueAmount: "€50.00",
    imageUrl: "/image/profile.jpg",
    reschedulesLeft: 0,
    bookedOnText: "Booked on Mon 7 Apr 2026 at 2:15 PM",
    canceledType: "by_you_retained_13",
    canceledDateText: "Cancelled on Fri 17 Apr 2026 at 4:30 PM",
    policyName: "Mario London Barber - cancellation & no show policy",
    policyRules: [
      { label: "More than 24 hours before", value: "Free", isGreen: true },
      { label: "12-24 hours before", value: "20% of service price" },
      { label: "2-12 hours before", value: "30% of service price" },
      { label: "Under 2 hours before", value: "50% of service price" },
      { label: "No-show", value: "50% of service price" },
    ],
    policyFooter: "Fees set by Mario London Barber, not by Bookly. Based on full service price.",
    canceledSummary: {
      servicePrice: "€50.00",
      depositPaid: "€13.00",
      cancellationFee: "€13.00 (20%)",
      depositRetainedText: "€13.00",
      totalFee: "€13.00"
    }
  },
  {
    id: "booking-canceled-5",
    serviceTitle: "Men's Haircut & Beard Trim",
    bookingCode: "123456",
    businessName: "Uncle SAM Gents Salon",
    phone: "+8566666",
    address: "Ermou 14, Larnacca",
    date: "Thu, 24 Oct",
    time: "10:00 AM",
    duration: "45min",
    paymentType: "canceled",
    atVenueAmount: "€50.00",
    imageUrl: "/image/profile.jpg",
    reschedulesLeft: 0,
    bookedOnText: "Booked on Mon 7 Apr 2026 at 2:15 PM",
    canceledType: "by_you_retained_50",
    canceledDateText: "Cancelled on Fri 17 Apr 2026 at 4:30 PM",
    policyName: "Mario London Barber - cancellation & no show policy",
    policyRules: [
      { label: "More than 24 hours before", value: "Free", isGreen: true },
      { label: "12-24 hours before", value: "20% of service price" },
      { label: "2-12 hours before", value: "30% of service price" },
      { label: "Under 2 hours before", value: "50% of service price" },
      { label: "No-show", value: "50% of service price" },
    ],
    policyFooter: "Fees set by Mario London Barber, not by Bookly. Based on full service price.",
    canceledSummary: {
      servicePrice: "€50.00",
      depositPaid: "€13.00",
      cancellationFee: "€13.00 (50%)",
      depositRetainedText: "€13.00",
      additionalChargeText: "–€13.00",
      totalFee: "€50.00"
    }
  },
  {
    id: "booking-canceled-6",
    serviceTitle: "Men's Haircut & Beard Trim",
    bookingCode: "123456",
    businessName: "Uncle SAM Gents Salon",
    phone: "+8566666",
    address: "Ermou 14, Larnacca",
    date: "Thu, 24 Oct",
    time: "10:00 AM",
    duration: "45min",
    paymentType: "canceled",
    atVenueAmount: "€50.00",
    imageUrl: "/image/profile.jpg",
    reschedulesLeft: 0,
    bookedOnText: "Booked on Mon 7 Apr 2026 at 2:15 PM",
    canceledType: "by_you_fee_50",
    canceledDateText: "Cancelled on Fri 17 Apr 2026 at 4:30 PM",
    policyName: "Mario London Barber - cancellation & no show policy",
    policyRules: [
      { label: "More than 24 hours before", value: "Free", isGreen: true },
      { label: "12-24 hours before", value: "20% of service price" },
      { label: "2-12 hours before", value: "30% of service price" },
      { label: "Under 2 hours before", value: "50% of service price" },
      { label: "No-show", value: "50% of service price" },
    ],
    policyFooter: "Fees set by Mario London Barber, not by Bookly. Based on full service price.",
    canceledSummary: {
      servicePrice: "€50.00",
      depositPaid: "€0.00",
      cancellationFee: "€13.00 (30%)",
      returningCustomerNoDeposit: true,
      totalFee: "€50.00"
    }
  }
];
