import { REACT_APP_WEATHER_API } from '@env';

const devEnvironmentVariables = {
  REACT_APP_WEATHER_API,
};

const prodEnvironmentVariables = {
  REACT_APP_WEATHER_API,
};

export default __DEV__ ? devEnvironmentVariables : prodEnvironmentVariables;
