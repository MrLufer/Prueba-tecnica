import React, {useEffect, useState} from 'react';
import typicodeApi from '../api/typicodeApi';

const useDetails = ({postId}: any) => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPostsfromId();
  }, []);

  const getImage = async id => {
    const res = await typicodeApi.get(`/photos?id=${id}`);
    if (res.status === 200) {
      return res.data[0].url;
    }
  };

  const getPostsfromId = async () => {
    const res = await typicodeApi.get(`/posts?id=${postId}`);
    if (res.status === 200) {
      const postswithImg = [];

      for (let post of res.data) {
        post.img = await getImage(post.id);
        postswithImg.push(post);
      }

      setPost(postswithImg[0]);
      setLoading(false);
    }
  };

  return [post, loading];
};

export default useDetails;
