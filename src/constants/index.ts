export interface IReferralsPropery  {
  title:string;
  percentage:number;
  color:string;
}

export const propertyReferralsInfo:Array<IReferralsPropery> = [
    {
      title: 'Social Media',
      percentage: 64,
      color: '#6C5DD3',
    },
    {
      title: 'Marketplace',
      percentage: 40,
      color: '#7FBA7A',
    },
    {
      title: 'Websites',
      percentage: 50,
      color: '#FFCE73',
    },
    {
      title: 'Digital Ads',
      percentage: 80,
      color: '#FFA2C0',
    },
    {
      title: 'Others',
      percentage: 15,
      color: '#F45252',
    },
  ];