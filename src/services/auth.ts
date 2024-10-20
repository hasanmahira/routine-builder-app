import { storeData, getData } from './storage';

const USER_KEY = 'user';

export interface User {
  id: string;
  email: string;
  subscriptionStatus: 'free' | 'premium';
}

export const signUp = async (email: string, password: string): Promise<User> => {
  // In a real app, you'd make an API call to create a user account
  const newUser: User = {
    id: Math.random().toString(36).substr(2, 9),
    email,
    subscriptionStatus: 'free'
  };
  await storeData(USER_KEY, newUser);
  return newUser;
};

export const signIn = async (email: string, password: string): Promise<User | null> => {
  // In a real app, you'd make an API call to verify credentials
  const user = await getData(USER_KEY);
  if (user && user.email === email) {
    return user;
  }
  return null;
};

export const getCurrentUser = async (): Promise<User | null> => {
  return await getData(USER_KEY);
};

export const signOut = async (): Promise<void> => {
  await AsyncStorage.removeItem(USER_KEY);
};