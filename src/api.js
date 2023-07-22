import axios from 'axios';

export const getPlacesData = async (type, sw, ne) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw[0],
        bl_longitude: sw[1],
        tr_longitude: ne[1],
        tr_latitude: ne[0],
      },
      headers: {
        'x-rapidapi-key': '815c23d74dmshda9661c107ed361p1fbed0jsna7690ceb2d12',
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
