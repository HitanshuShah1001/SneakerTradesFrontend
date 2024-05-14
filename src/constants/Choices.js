export const UPLOAD = 'Upload';
export const REQUEST = 'Request';
export const SNEAKER_ALERT_NOTIFICATIONS = [
  'New kicks alert! Check out the latest additions to our sneaker marketplace.',
  'Ready to step up your sneaker game? Explore fresh arrivals now!',
  'Limited edition drops incoming! Stay tuned for exclusive releases.',
  'Your dream sneakers await! Find your perfect pair on our app today.',
  "Don't miss out! Get notified when your favorite sneakers are available.",
  'Sneakerheads, rejoice! Discover rare finds and hot deals in our community.',
  'Upgrade your rotation with the hottest kicks. Shop now!',
  'Looking for a quick style refresh? Rent trendy sneakers hassle-free.',
  'Sneaker envy incoming! Browse unique styles and standout kicks.',
  'Keep your collection fresh with our curated selection of sneakers.',
];
export const findRandomQuote = () => {
  const randomIndex = Math.floor(
    Math.random() * SNEAKER_ALERT_NOTIFICATIONS.length,
  );
  return SNEAKER_ALERT_NOTIFICATIONS[randomIndex];
};

export const NOTIFICATION_REMINDER = `Reminder-Notification`;
export const SNEAKER_TRADES_TITLE = 'Sneaker Trades';
export const GENERAL = 'general';
