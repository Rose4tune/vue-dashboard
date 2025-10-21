// Weather Types
export interface WeatherData {
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export interface WeatherResponse {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

// Quote Types
export interface Quote {
  message: string;
  author?: string;
  authorProfile?: string;
}

export interface QuoteResponse {
  message: string;
  author?: string;
  authorProfile?: string;
}

// Todo Types
export interface Todo {
  id: string;
  text: string;
  done: boolean;
  order: number;
  created_at?: string;
}

export interface TodoInput {
  text: string;
  done?: boolean;
  order?: number;
}

// API Error Types
export interface ApiError {
  message: string;
  status?: number;
}
