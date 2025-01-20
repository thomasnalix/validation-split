export interface User {
    about: string;
    experience: string;
    photo: string;
    phone: string;
    address: string;
    userType: 'Learner' | 'Trainer';
    trainer?: {
        horaires: string;
        pricePerHour: number;
        courseLocation: 'Remote' | 'Home' | 'Learner';
        iban: string;
    };
}
