import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import LazyImage from '../../components/LazyImage';

import { Post, Header, Avatar, Name, Description, Loading } from './styles';

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [changedItems, setChangedItems] = useState([]);

  const loadFeed = useCallback(
    async (pageNumber = page, isRefreshing) => {
      if (total && pageNumber > total) return;
      setLoading(true);
      const perPage = 5;
      const response = await fetch(
        `http://localhost:3000/feed?_expand=author&_limit=${perPage}&_page=${pageNumber}`,
      );

      const data = await response.json();
      const totalItems = response.headers.get('X-Total-Count');

      setTotal(Math.ceil(totalItems / perPage));
      setFeed((currFeed) => (isRefreshing ? data : [...currFeed, ...data]));
      setPage(pageNumber + 1);
      setLoading(false);
    },
    [page, total],
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    loadFeed(1, true);
    setRefreshing(false);
  };

  const handleViewableItemsChanged = useCallback(({ changed }) => {
    setChangedItems(changed.map(({ item }) => item.id));
  }, []);

  useEffect(() => {
    loadFeed();
  }, []);

  return (
    <View>
      <FlatList
        data={feed}
        onEndReached={() => loadFeed(page)}
        onEndReachedThreshold={0.1}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 10 }}
        ListFooterComponent={loading && <Loading />}
        keyExtractor={(post) => String(post.id)}
        renderItem={({ item }) => (
          <Post>
            <Header>
              <Avatar source={{ uri: item.author.avatar }} />
              <Name>{item.author.name}</Name>
            </Header>
            <LazyImage
              shouldLoad={changedItems.includes(item.id)}
              aspectRatio={item.aspectRatio}
              source={{ uri: item.image }}
              smallSource={{ uri: item.small }}
            />
            <Description>
              <Name>{item.author.name}</Name> {item.description}
            </Description>
          </Post>
        )}
      />
    </View>
  );
};

export default Feed;
