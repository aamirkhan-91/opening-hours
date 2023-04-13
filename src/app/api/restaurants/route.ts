import { RestaurantData } from '@type-definitions/types';
import { validateOpeningHours } from '@utils/validator';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  const json: RestaurantData = await request.json();

  const isValid = validateOpeningHours(json.openingHours);

  if (isValid) {
    const id = uuidv4();
    json.id = id;

    try {
      fs.writeFile(`restaurant-data/${id}.json`, JSON.stringify(json));
      return new Response(
        JSON.stringify({
          id,
        }),
        {
          status: 201,
        }
      );
    } catch (_e: unknown) {
      return new Response(JSON.stringify({ error: 'An unexpected error occurred. Please try again later.' }), {
        status: 500,
      });
    }
  } else {
    return new Response(
      JSON.stringify({ error: 'Invalid opening hours data provided. Please verify the provided input and try again.' }),
      {
        status: 400,
      }
    );
  }
}
