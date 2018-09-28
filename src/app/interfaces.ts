interface ProvidersList {
  id: number;
  title: string;
  slug: string;
}

interface PaymentData {
  data_send: string;
  provider: string;
}

export {
  ProvidersList,
  PaymentData
};
