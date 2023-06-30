export const RegionNumbers = Object.freeze<Record<string, number>>({
  /** 일본어(히라가나+가타카나) */
  'JA-HRKT': 1,
  /** 일본어 로마자 표기 */
  ROOMAJI: 2,
  /** 한국어 */
  KO: 3,
  /** 중국어(번체) */
  'ZH-HANT': 4,
  /** 프랑스어 */
  FR: 5,
  /** 독일어 */
  DE: 6,
  /** 스페인어 */
  ES: 7,
  /** 이탈리아어 */
  IT: 8,
  /** 영어 */
  EN: 9,
  /** 일본어 */
  JA: 11,
  /** 중국어(간체) */
  'ZH-HANS': 12,
});

// TODO: icon으로 변경
export const CountryIcon = Object.freeze<Record<number, string>>({
  [RegionNumbers['JA-HRKT']]: '일본어(히라가나+가타카나)',
  [RegionNumbers.ROOMAJI]: '일본어 로마자 표기',
  [RegionNumbers.KO]: '한국어',
  [RegionNumbers['ZH-HANT']]: '중국어(번체)',
  [RegionNumbers.FR]: '프랑스어',
  [RegionNumbers.DE]: '독일어',
  [RegionNumbers.ES]: '스페인어',
  [RegionNumbers.IT]: '이탈리아어',
  [RegionNumbers.EN]: '영어',
  [RegionNumbers.JA]: '일본어',
  [RegionNumbers['ZH-HANS']]: '중국어(간체)',
});
