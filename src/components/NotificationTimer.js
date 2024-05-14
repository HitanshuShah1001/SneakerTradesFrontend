import notifee, {RepeatFrequency, TriggerType} from '@notifee/react-native';
import {
  findRandomQuote,
  GENERAL,
  NOTIFICATION_REMINDER,
  SNEAKER_TRADES_TITLE,
} from '../constants/Choices';

export const reminderNotificationObj = {
  id: NOTIFICATION_REMINDER,
  title: SNEAKER_TRADES_TITLE,
  body: findRandomQuote(),
  android: {
    channelId: GENERAL,
  },
};

export const setNotificationTimer = async () => {
  try {
    await notifee.requestPermission();
    await notifee.cancelTriggerNotifications();
    let today = new Date(Date.now());
    today.setHours(19);
    today.setMinutes(15);
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
