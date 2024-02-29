//@ts-nocheck

import { writable } from 'svelte/store';
import { faker } from "@faker-js/faker";


export const cars = writable([]);


export const fetchCars = async () => {
    const newCars = [];
    for (let i = 0; i < 12; i++) {
        const car = {
            id: faker.vehicle.vin(),
            type: faker.vehicle.type(),
            brand: faker.vehicle.manufacturer(),
            model: faker.vehicle.model(),
            imageUrl: faker.image.urlLoremFlickr({ category: 'transport' }),
            price: faker.number.bigInt({ max: 100000 })

        };
        newCars.push(car);
 
    }
    cars.set(newCars);
};
