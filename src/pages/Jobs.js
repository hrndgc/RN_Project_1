import Axios from 'axios';
import Modal from 'react-native-modal';
import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, FlatList} from 'react-native';

import {jobs} from '../styles'
import {JobItem} from '../components'

const Jobs = (props) => {
  const [data, setData] = useState([]);
  const [modalFlag, setModalFlag] = useState(false);
  const {selectedLanguage} = props.route.params;

  const fetchData = async () => {
    const reponse = await Axios.get(`https://jobs.github.com/positions.json?search=${selectedLanguage.toLowerCase()}`);
    setData(reponse.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onJobSelect = () => {
    setModalFlag(true);
  }

  const renderJobs = ({item}) => <JobItem job={item} onSelect={onJobSelect} />

  return (
    <SafeAreaView>
      <View>
        <Text style={{
          textAlign: "center", 
          fontWeight: "bold",
          fontSize: 20,
        }}>JOBS FOR {selectedLanguage.toUpperCase()}</Text>
        <FlatList data={data} renderItem={renderJobs}/>

        <Modal isVisible={modalFlag}>
          <View style={jobs.modalBackground}>
          <Text>Selammmm</Text>
          </View>
        </Modal>



      </View>
    </SafeAreaView>
  );
};

export { Jobs };
