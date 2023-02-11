import {LinearProgress} from '@mui/material';
import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import TwitForm from '../../../components/TweetForm';
import {useLazyGetPostQuery} from '../../../redux/RTK/Servis';

const TweetView: React.FC = () => {
  const params = useParams().id?.slice(1);

  const [fetchPost, {data, isLoading, error}] = useLazyGetPostQuery();

  useEffect(() => {
    fetchPost(params as string);
  }, []);

  return (
    <>
      {!isLoading && data ? (
        <TwitForm
          id={data?.data._id}
          key={data?.data._id}
          text={data?.data.text}
          user={data?.data.user}
          images={data?.data.images}
          createAt={data?.data.createAt}
        />
      ) : (
        <LinearProgress />
      )}
    </>
  );
};

export default TweetView;
