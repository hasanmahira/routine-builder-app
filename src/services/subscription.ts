import { storeData, getData } from './storage';
import { User } from './auth';

const USER_KEY = 'user';

export const upgradeSubscription = async (): Promise<User | null> => {
  const user = await getData(USER_KEY);
  if (user) {
    const updatedUser: User = {
      ...user,
      subscriptionStatus: 'premium'
    };
    await storeData(USER_KEY, updatedUser);
    return updatedUser;
  }
  return null;
};

export const checkSubscriptionStatus = async (): Promise<'free' | 'premium' | null> => {
  const user = await getData(USER_KEY);
  return user ? user.subscriptionStatus : null;
};