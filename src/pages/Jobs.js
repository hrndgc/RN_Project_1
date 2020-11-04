import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, FlatList} from 'react-native';

import {JobItem} from '../components'

const Jobs = (props) => {
  const [data, setData] = useState([]);
  const {selectedLanguage} = props.route.params;

  const fetchData = async () => {
    const reponse = await Axios.get(`https://jobs.github.com/positions.json?search=${selectedLanguage.toLowerCase()}`);
    setData(reponse.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderJobs = ({item}) => <JobItem job={item} />

  return (
    <SafeAreaView>
      <View>
        <Text style={{textAlign: "center", fontWeight: "bold"}}>JOBS FOR {selectedLanguage.toUpperCase()}</Text>
        <FlatList
          data={data}
          renderItem={renderJobs}
        />
      </View>
    </SafeAreaView>
  );
};

export { Jobs };
