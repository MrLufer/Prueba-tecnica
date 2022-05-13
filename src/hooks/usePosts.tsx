import React, {useEffect, useState} from 'react';
import typicodeApi from '../api/typicodeApi';

interface IProps {
  userId: number;
}

const usePosts = ({userId}: IProps) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getPostsfromId();
  }, []);

  const getThumbnailUrl = async id => {
    const res = await typicodeApi.get(`/photos?id=${id}`);
    if (res.status === 200) {
      return res.data[0].thumbnailUrl;
    }
  };

  const getPostsfromId = async () => {
    const res = await typicodeApi.get(`/posts?userId=${userId}`);
    if (res.status === 200) {
      const postswithImg = [];

      for (let post of res.data) {
        post.thumbnailUrl = await getThumbnailUrl(post.id);
        postswithImg.push(post);
      }

      setPosts(postswithImg);
      setLoading(false);
    }
  };
  return [posts, loading];
};

export default usePosts;
