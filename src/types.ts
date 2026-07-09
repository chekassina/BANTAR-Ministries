export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  type: 'audio' | 'video' | 'written';
  url: string; // url to audio/video or full text for written
  thumbnail: string;
  category: string;
  description: string;
  duration?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: 'conference' | 'crusade' | 'weekly' | 'special';
  imageUrl: string;
  registrantsCount?: number;
}

export interface Product {
  id: string;
  name: string;
  price: number; // in CFA Francs (XAF) or USD
  description: string;
  type: 'book' | 'merch' | 'digital' | 'teaching';
  imageUrl: string;
  downloadUrl?: string; // For digital files (e.g. PDFs)
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  category: 'devotional' | 'announcement' | 'article';
  content: string;
  imageUrl: string;
  excerpt: string;
}

export interface PrayerRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  requestType: 'prayer' | 'distant' | 'counselling';
  message: string;
  date: string;
  status: 'pending' | 'prayed' | 'contacted';
}

export interface Testimony {
  id: string;
  name: string;
  title: string;
  message: string;
  date: string;
  approved: boolean;
}

export interface PartnershipApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  category: 'vision' | 'global' | 'revival';
  amount?: string;
  frequency: 'monthly' | 'one-time';
  date: string;
}

export interface CrisomApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  selectedCourse: string;
  essay: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface CrisomCourse {
  id: string;
  title: string;
  code: string;
  instructor: string;
  duration: string;
  description: string;
  syllabus: string[];
  materials?: string[];
}
