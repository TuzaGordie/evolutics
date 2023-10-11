import { Day } from '../Shared/models/index.model';

export namespace Config {
  export const APIProductionServer: string =
    'https://ec2-18-219-154-9.us-east-2.compute.amazonaws.com:8005/core';
  export const APIStagingServer: string =
    // 'https://stagingcore.evoluticstech.com/core';
    'http://ec2-3-140-216-214.us-east-2.compute.amazonaws.com:30123/core'
    // 'http://ec2-3-140-216-214.us-east-2.compute.amazonaws.com:30123/core'; 
    // 'http://ec2-18-221-76-232.us-east-2.compute.amazonaws.com:8005/core'; 
  export const APIDevelopmentServer: string =
    'https://development.evoluticstech.com/core'; 
  export const secretKey: string =
    'MIICXAIBAAfBgQDfmljld9rdhvakQApmLCDOgdwdwdwo2/iwdoiP0nNERInBheMh7J/r5aU8PUAssIpGXET/8';

  export const Images = {
    pp: { src: '/assets/img/avatar.png', min: '/assets/img/avatar.min.png' },
    other: {
      src: '/assets/img/placeholder.png',
      min: '/assets/img/placeholder.min.png',
    },
  };
  export const Optioner: { num: number; letter: string }[] = [
    { num: 1, letter: 'a' },
    { num: 2, letter: 'b' },
    { num: 3, letter: 'c' },
    { num: 4, letter: 'd' },
    { num: 5, letter: 'e' },
    { num: 6, letter: 'f' },
    { num: 7, letter: 'g' },
    { num: 8, letter: 'h' },
    { num: 9, letter: 'i' },
    { num: 10, letter: 'j' },
  ];
  export const Months: { id: number; short: string; long: string }[] = [
    { id: 0, short: 'Jan', long: 'January' },
    { id: 1, short: 'Feb', long: 'February' },
    { id: 2, short: 'Mar', long: 'March' },
    { id: 3, short: 'Apr', long: 'April' },
    { id: 4, short: 'May', long: 'May' },
    { id: 5, short: 'Jun', long: 'June' },
    { id: 6, short: 'Jul', long: 'July' },
    { id: 7, short: 'Aug', long: 'August' },
    { id: 8, short: 'Sep', long: 'September' },
    { id: 9, short: 'Oct', long: 'October' },
    { id: 10, short: 'Nov', long: 'November' },
    { id: 11, short: 'Dec', long: 'December' },
  ];

  export const Days = [
    { index: 0, day: Day.sunday },
    { index: 1, day: Day.monday },
    { index: 2, day: Day.tuesday },
    { index: 3, day: Day.wednesday },
    { index: 4, day: Day.thursday },
    { index: 5, day: Day.friday },
    { index: 6, day: Day.saturday },
  ];

  export const Numbers: { num: number; label: string }[] = [
    { num: 1, label: 'First' },
    { num: 2, label: 'Second' },
    { num: 3, label: 'Third' },
    { num: 4, label: 'Fourth' },
    { num: 5, label: 'Fifth' },
    { num: 6, label: 'Sixth' },
    { num: 7, label: 'Seventh' },
    { num: 8, label: 'Eighth' },
    { num: 9, label: 'Ninth' },
    { num: 10, label: 'Tenth' },
  ];

  export const sexes = ['Female', 'Male'];

  export const Currency = '₦';
  export const TimeStampDay = 86400000;
  export const TimeStampWeek = 604800000;
  export const FormPresets = {
    addressPlaceholder: '1, Street Address.',
  };
}
