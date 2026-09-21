/**
 * i18n Localization Module for ঔষধBox (OushodBox)
 * Supports nested key resolution like t("common.save") with parameter interpolation.
 */

import { bn, type I18nKeys } from "./bn";

export const currentLocale = "bn";
export const translations = { bn };
export { bn };

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type TranslationKey = NestedKeyOf<I18nKeys>;

/**
 * Translates a key with optional parameter substitution.
 * Example: t("home.searchResultsTitle", { count: 5 })
 */
export function t(
  key: string,
  params?: Record<string, string | number>
): string {
  const keys = key.split(".");
  let current: any = bn;

  for (const k of keys) {
    if (current && typeof current === "object" && k in current) {
      current = current[k];
    } else {
      console.warn(`[i18n] Missing translation key: "${key}"`);
      return key;
    }
  }

  if (typeof current !== "string") {
    return key;
  }

  if (params) {
    return Object.entries(params).reduce(
      (str, [paramKey, paramValue]) =>
        str.replace(new RegExp(`\\{${paramKey}\\}`, "g"), String(paramValue)),
      current
    );
  }

  return current;
}
