import notifee, {RepeatFrequency, TriggerType} from '@notifee/react-native';

export const NOTIFICATION_REMINDER = `Reminder-Notification`;
export const SNEAKER_TRADES_TITLE = 'Sneaker Trades';

export const reminderNotificationObj = {
  id: NOTIFICATION_REMINDER,
  title: SNEAKER_TRADES_TITLE,
  body: 'Sneaker alerts: Because missing out is not an option!',
  android: {
    channelId: 'general',
  },
};

export const setNotificationTimer = async () => {
  try {
    await notifee.requestPermission();
    await notifee.cancelTriggerNotifications();
    let today = new Date(Date.now());
    today.setHours(13);
    today.setMinutes(20);
    if (today.getTime() <= Date.now()) {
      today.setDate(today.getDate() + 1);
    }
    const res = await notifee.createTriggerNotification(
      reminderNotificationObj,
      {
        type: TriggerType.TIMESTAMP,
        timestamp: today.getTime(),
        repeatFrequency: RepeatFrequency.DAILY,
      },
    );
  } catch (e) {
    console.log(e, 'Error occured');
  }
};
