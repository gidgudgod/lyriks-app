import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { Error, Loader, ArtistCard } from '../components';

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title="Loading top artists" />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="mt-4 mb-10 text-left text-3xl font-bold text-white">
        Top Artists
      </h2>

      <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
        {data?.map((track) => (
          <ArtistCard key={track.key} track={track} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
