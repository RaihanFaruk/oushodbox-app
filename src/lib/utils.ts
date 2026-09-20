/**
 * ঔষধBox — Utility Functions
 */

/**
 * Opens WhatsApp with a pre-filled medicine share message.
 * This is a demo/simulation — message content is illustrative only.
 */
export function shareToWhatsApp(
  drugName: string,
  generic: string,
  manufacturer: string,
  price: string
): void {
  const text = encodeURIComponent(
    `*ঔষধBox ফার্মাসিউটিক্যাল তথ্য শেয়ার*\n\n` +
      `💊 *ঔষধের নাম:* ${drugName}\n` +
      `🔬 *জেনেরিক ফর্মুলা:* ${generic}\n` +
      `🏭 *প্রস্তুতকারক:* ${manufacturer}\n` +
      `💰 *সর্বোচ্চ MRP মূল্য:* ${price}\n\n` +
      `_তথ্যসূত্র: DGDA নিবন্ধিত। ঔষধBox ফার্মাসিউটিক্যাল_`
  );
  window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
}

/**
 * Triggers the browser PWA install prompt (BeforeInstallPromptEvent).
 * Falls back gracefully if the prompt is not available.
 */
export function triggerPwaInstall(): void {
  // In production, this would use a stored `beforeinstallprompt` event.
  alert(
    'ঔষধBox PWA ইন্সটলেশন ডেমো: ব্রাউজার মেনু থেকে "Install" বা "Add to Home screen" সিলেক্ট করুন।'
  );
}

/**
 * Formats a number or numeric string as Bengali numerals.
 */
export function toBengaliNumeral(n: number | string): string {
  const bn = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return n
    .toString()
    .split("")
    .map((c) => (c >= "0" && c <= "9" ? bn[parseInt(c)] : c))
    .join("");
}


/**
 * Returns the current hour-appropriate greeting in Bengali.
 */
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "শুভ সকাল 🌅";
  if (hour < 17) return "শুভ দুপুর ☀️";
  if (hour < 20) return "শুভ সন্ধ্যা 🌆";
  return "শুভ রাত্রি 🌙";
}
