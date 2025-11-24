export interface WeatherData {
  windSpeed: number;
  temperature: number;
  radiation: number;
  purity: number;
}

export enum MineralType {
  Basalt = 'Basalt',
  Sand = 'Sand',
  Uranium = 'Uranium',
  IronOxide = 'Iron Oxide',
}

export interface ReportData {
  title: string;
  content: string;
  recommendation: string;
}