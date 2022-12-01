import getCountryByTimezone from 'country-by-timezone';
import lookup from 'country-code-lookup';

const DEFAULT_COUNTRY = 'USA';

const getCodeFromTimezone = (timezone: string) => {
  const countryData = getCountryByTimezone(timezone);
  return countryData.countryCode;
};

const getIsoCodeFromCode = (code: string) => {
  const countryData = lookup.byIso(code);
  return countryData?.iso3;
};

const getCountryCodeFromTimezone = (timezone: string): string => {
  try {
    const code = getCodeFromTimezone(timezone);
    const isoCode = getIsoCodeFromCode(code);

    return isoCode ?? DEFAULT_COUNTRY;
  } catch (error) {
    return DEFAULT_COUNTRY;
  }
};

export default getCountryCodeFromTimezone;
