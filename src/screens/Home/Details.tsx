import {useRoute} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  SafeAreaView,
  View,
  Text,
  useWindowDimensions,
} from 'react-native';
import useDetails from '../../hooks/useDetails';

const Details = () => {
  const route = useRoute();
  const {height, width} = useWindowDimensions();
  const {postId}: any = route.params;
  const [post, loading] = useDetails({postId});
  console.log(post);
  return (
    <SafeAreaView>
      <View
        style={{
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 25,
        }}>
        <Image
          source={{uri: post.img}}
          style={{width: width * 0.5, height: width * 0.5}}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 15,
            marginTop: 20,
          }}>
          {post?.title?.toUpperCase()}
        </Text>
        <Text>{post.body}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Details;
