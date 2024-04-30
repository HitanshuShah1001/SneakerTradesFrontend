import notifee, {
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

export const reminderNotificationObj = {
  id: `Reminde-Notification`,
  title: 'Sneaker Trades',
  body: "Let's buy some sneakers!",
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
