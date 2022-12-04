import { Grid, LinearProgress } from '@mui/material';
import { dblClick } from '@testing-library/user-event/dist/click';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SideBar from '../../../components/SideBar';
import TwitForm from '../../../components/TwitForm';
import { useLazyGetPostQuery } from '../../../redux/RTK/Servis';
import { Tweet } from '../../../redux/slice/Tweets';

const TweetView: React.FC = () => {
  const params = useParams().id?.slice(1);

  const [fetchPost, { data, isLoading, error }] = useLazyGetPostQuery();

  useEffect(() => {
    fetchPost(params);
  }, []);

  return (
        <>
          {!isLoading && data? (
            <TwitForm
              key={data?.data._id}
              text={data?.data.text}
              user={data?.data.user}
            />
          ) : (
            <LinearProgress />
          )}
        </>
  );
};

export default TweetView;