export interface Report {
  id: string;
  title: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  status: 'pending' | 'reviewing' | 'resolved';
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface CreateReportInput {
  title: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  images: File[];
}
