import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';
import { Error, Loader, SongCard } from '../components';

const AroundYou = () => {
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  console.log(country);

  useEffect(() => {
    axios
      .get(
        'https://geo.ipify.org/api/v2/country?apiKey=at_7dpFDf2216svwX2G0sFeOiqv9i6f5'
      )
      .then((res) => setCountry(res?.data?.location?.country))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [country]);

  if (isFetching && loading) return <Loader title="Loading songs around you" />;

  if (error && country) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="mt-4 mb-10 text-left text-3xl font-bold text-white">
        Around You&nbsp;
        <span className="font-black">{country}</span>
      </h2>

      <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
