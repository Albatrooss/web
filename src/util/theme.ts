import { Theme } from 'styled-components';

declare module 'styled-components' {
  interface Theme {
    borderRadius: string;
    boxShadow: string;
    color: {
      green: string;
      'white:dutch': string;
      brown: string;
      aero: string;
      'aero:dark': string;

      red: string;
      blue: string;
      yellow: string;
      orange: string;

      black: string;
      'black:200': string;
      'white:0': string;
      white: string;
      grey: string;
    };
  }
}

export const theme: Theme = {
  borderRadius: '4px',
  boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)',
  color: {
    green: '#7EAB1E',
    'white:dutch': '#E8DAB2',
    brown: '#573D1C',
    aero: '#7BB2D9',
    'aero:dark': '#6FA2C6',

    red: '#F06E6E',
    blue: '#6EBBF0',
    yellow: '#FAF86C',
    orange: '#F0BD6E',

    black: '#333333',
    'black:200': '#2F2F2F',
    'white:0': '#FFFFFF',
    white: '#F2F2F2',
    grey: '#C3C3C3',
  },
};
