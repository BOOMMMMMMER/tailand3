export type City = 'Bangkok' | 'Pattaya';

export type Category = 'Temple' | 'Shopping' | 'Nature' | 'Nightlife' | 'Culture' | 'Food' | 'Family';

export interface Attraction {
  id: string;
  name: string;
  thaiName: string;
  city: City;
  description: string;
  image: string; // Placeholder URL
  category: Category;
  rating: number;
  location: string;
  highlights: string[];
}

export interface ItineraryRequest {
  city: City | 'Both';
  days: number;
  interests: string[];
  travelerType: 'Solo' | 'Couple' | 'Family' | 'Friends';
}

export interface AIResponse {
  text: string;
  relatedAttractions?: string[];
}
