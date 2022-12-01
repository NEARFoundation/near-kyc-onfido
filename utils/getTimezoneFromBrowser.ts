const getTimezoneFromBrowser = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export default getTimezoneFromBrowser;
