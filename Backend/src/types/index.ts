export interface User {
  id: number;
  username: string;
  password: string;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  is_active: number;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  image_url: string | null;
}

export interface GalleryItem {
  id: number;
  title: string;
  type: 'photo' | 'video';
  url: string;
  category: 'events' | 'activities' | 'classrooms' | 'celebrations';
}

export interface Teacher {
  id: number;
  name: string;
  qualification: string;
  experience: string;
  subject: string;
  image_url: string | null;
}

export interface Achievement {
  id: number;
  title: string;
  student_name: string;
  description: string;
  date: string;
  image_url: string | null;
}

export interface SchoolInfoRow {
  key: string;
  value: string;
}

export interface SchoolInfo {
  [key: string]: string;
}

export interface AuthRequest {
  username: string;
  password: string;
}

export interface JwtPayload {
  id: number;
  username: string;
}
