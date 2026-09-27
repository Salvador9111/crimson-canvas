export interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  hasConsented: boolean;
  updatedAt: string | null;
}

export const COOKIE_STORAGE_KEY = "crimson_cookie_consent_v1";

export const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  functional: true,
  analytics: false,
  marketing: false,
  hasConsented: false,
  updatedAt: null,
};

export function getStoredCookiePreferences(): CookiePreferences {
  if (typeof window === "undefined") {
    return DEFAULT_PREFERENCES;
  }
  try {
    const raw = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (!raw) return DEFAULT_PREFERENCES;
    const parsed = JSON.parse(raw);
    return {
      necessary: true, // Always locked to true
      functional: Boolean(parsed.functional),
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      hasConsented: Boolean(parsed.hasConsented),
      updatedAt: parsed.updatedAt || null,
    };
  } catch (e) {
    return DEFAULT_PREFERENCES;
  }
}

export function saveCookiePreferences(
  prefs: Partial<Omit<CookiePreferences, "necessary" | "hasConsented" | "updatedAt">> & {
    hasConsented?: boolean;
  }
): CookiePreferences {
  const current = getStoredCookiePreferences();
  const updated: CookiePreferences = {
    necessary: true,
    functional: prefs.functional ?? current.functional,
    analytics: prefs.analytics ?? current.analytics,
    marketing: prefs.marketing ?? current.marketing,
    hasConsented: prefs.hasConsented ?? true,
    updatedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(
      new CustomEvent("crimson-cookie-consent-updated", { detail: updated })
    );
  } catch (e) {
    console.error("Failed to save cookie preferences", e);
  }

  return updated;
}

export function acceptAllCookies(): CookiePreferences {
  return saveCookiePreferences({
    functional: true,
    analytics: true,
    marketing: true,
    hasConsented: true,
  });
}

export function rejectNonEssentialCookies(): CookiePreferences {
  return saveCookiePreferences({
    functional: false,
    analytics: false,
    marketing: false,
    hasConsented: true,
  });
}
