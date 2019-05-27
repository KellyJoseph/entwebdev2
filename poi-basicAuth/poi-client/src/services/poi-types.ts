
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  admin: boolean;
}


export interface Photo {
  _id: string;
  title: string;
  url: string;
  public_id: string;
  location: string;
}

export interface Location {
  _id: string;
  name: string;
  description: string;
  author: string;
  region: string;
  lat: number;
  lng: number;
}

export interface Comment {
  _id: string;
  comment: string;
  author: string;
  location: string;
  time: string;
}

export interface Rating {
  _id: string;
  rating: number;
  author: string;
  location: string;
  time: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}
