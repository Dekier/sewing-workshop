export default defineEventHandler(async (event) => {
  const placeId = 'ChIJxW1V00FDBEcRoaXxmrlq7Ko'.trim();
  const apiKey = 'AIzaSyCCzurmr3FtjmHaiBfPzDx3IAdgsTaOogY';

  const url = `https://places.googleapis.com/v1/places/${placeId}`;

  try {
    const data: any = await $fetch(url, {
      method: 'GET',
      headers: {
        'X-Goog-Api-Key': apiKey,
        // DODAJEMY reviews.publishTime do maski pól
        'X-Goog-FieldMask':
          'reviews.authorAttribution,reviews.rating,reviews.text,reviews.publishTime',
      },
      query: { languageCode: 'pl' },
    });

    if (!data.reviews) return [];

    return data.reviews.map((rev: any) => {
      // 1. Obliczamy datę z pola publishTime
      const dateObj = new Date(rev.publishTime);

      // 2. Formatujemy na polski: "listopad 2025"
      const rawDate = dateObj.toLocaleDateString('pl-PL', {
        month: 'long',
        year: 'numeric',
      });

      // 3. Powiększamy pierwszą literę (Listopad 2025)
      const formattedDate = rawDate.charAt(0).toUpperCase() + rawDate.slice(1);

      return {
        author_name: rev.authorAttribution?.displayName || 'Klient',
        rating: rev.rating,
        text: rev.text?.text || '',
        date: formattedDate, // Nowe pole z ładną datą
        author_url: rev.authorAttribution?.uri,
        profile_photo_url: rev.authorAttribution?.photoUri,
      };
    });
  } catch (error: any) {
    console.error('Błąd:', error.message);
    return [];
  }
});
