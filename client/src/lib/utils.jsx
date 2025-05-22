import { LANGUAGE_TO_FLAG } from "../constants/consts";

export function getLanguageToFlag(lang) {
  if (!lang) return null;

  const langLowerCase = lang.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLowerCase];

  if (countryCode) {
    return (
      <img
        src={`https://flagsapi.com/${countryCode}/shiny/64.png`}
        alt={`${lang} flag`}
        className=" h-3 mr-1 inline-block"
      />
    );
  }
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
