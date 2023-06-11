import { Timestamp } from '@angular/fire/firestore';

export interface Blog {
  id?: string;
  date: Timestamp;
  thumbnail: string;
  title: string;
}
