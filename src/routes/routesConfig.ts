export default [
  {
    key: 'home',
    name: 'menu.home',
    disable: true,
    page: 'home',
  },
  {
    key: 'data',
    name: 'menu.data',
    disable: true,
    children: [
      {
        key: 'announcement',
        name: 'menu.announcement',
        page: 'announcement',
        disable: true,
      },
      {
        key: 'DMS',
        name: 'DMS',
        page: 'dMSList',
        disable: true,
      },
      {
        key: 'featureNFT',
        name: 'menu.featureNFT',
        page: 'featureNFTList',
        disable: true,
      },
      {
        key: 'NFTCalendar',
        name: 'menu.NFTCalendar',
        page: 'nftCalendar',
        disable: true,
      },
    ],
  },
  {
    key: 'watchList',
    name: 'menu.watchList',
    page: 'watchList',
    disable: true,
  },
  // {
  //   key: 'featureNFTList',
  //   name: 'featureNFTList',
  //   page: 'featureNFTList',
  //   disable: false,
  // },
  // {
  //   key: 'DMSList',
  //   name: 'DMSList',
  //   page: 'dMSList',
  //   disable: false,
  // },
  // {
  //   key: 'fees',
  //   name: 'menu.fees',
  //   page: 'home',
  //   disable: true,
  // },
  {
    key: 'Discord',
    name: 'Discord',
    page: 'discord',
    disable: false,
  },
  {
    key: 'Marketing',
    name: 'marketing',
    page: 'marketing',
    disable: false,
  },
  {
    key: 'potofolio',
    name: 'potofolio',
    page: 'potofolio',
    disable: false,
  },
];
