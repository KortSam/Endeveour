export interface Artwork {
  id: string;
  objectNumber: string;
  title: string;
  titles: string;
  webImage: { url: string };
  dating: {
    presentingDate: string;
  };
  label: {
    description: string;
  };
}

export interface ArtworkDetail extends Artwork {
  longTitle: string;
}

//normaly I wouldn't store this here but just for easy access it is here!
const RIJKS_API_KEY = '2nxMGcgf';



export const searchArtworks = async (
  query: string,
  sortOption: string
): Promise<Artwork[]> => {
  let url = `https://www.rijksmuseum.nl/api/en/collection?key=${RIJKS_API_KEY}&ps=50`;
  if (sortOption) url += `&s=${sortOption}`;
  if (query) url += `&q=${query}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.artObjects;
};

export const getArtworkDetails = async (id: string): Promise<ArtworkDetail> => {
  const res = await fetch(
    `https://www.rijksmuseum.nl/api/nl/collection/${id}?key=${RIJKS_API_KEY}`
  );
  const data = await res.json();
  return data.artObject;
};
