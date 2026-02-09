
export enum Category {
  DREAM = 'Dream',
  CAREER = 'Career',
  TRAVEL = 'Travel',
  MONEY = 'Money',
  SELF = 'Self'
}

export interface Task {
  id: string;
  title: string;
  category: Category;
  dueDate: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface UserProfile {
  name: string;
  avatar: string;
  streak: number;
  isPremium: boolean;
}

export interface DailyAction {
  id: string;
  text: string;
  category: Category;
}
