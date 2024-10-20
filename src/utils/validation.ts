export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const validateRoutineName = (name: string): boolean => {
  return name.trim().length > 0;
};

export const validateTask = (task: string): boolean => {
  return task.trim().length > 0;
};