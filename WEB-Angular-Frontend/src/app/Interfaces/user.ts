export interface User {
    id: number;
    username: string;
    password: string;
    token: string;
    activities: [{  actDate: Date,
                    actDescription: string,
                    workoutId: string}]
}