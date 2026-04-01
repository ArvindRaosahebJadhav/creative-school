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
  image_url: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  type: 'photo' | 'video';
  url: string;
  category: string;
}

export interface Teacher {
  id: number;
  name: string;
  qualification: string;
  experience: string;
  subject: string;
  image_url: string;
}

export interface Achievement {
  id: number;
  title: string;
  student_name: string;
  description: string;
  date: string;
  image_url: string;
}

export interface SchoolInfo {
  [key: string]: string;
}
