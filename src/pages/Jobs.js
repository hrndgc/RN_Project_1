import Axios from 'axios';
import Modal from 'react-native-modal';
import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, FlatList, Button} from 'react-native';

import {jobs} from '../styles'
import {JobItem} from '../components'

const Jobs = (props) => {
  const [data, setData] = useState([]);
  const [selectedJob, setSelectedJob] = useState("")
  const [modalFlag, setModalFlag] = useState(false);
  const {selectedLanguage} = props.route.params;

  const fetchData = async () => {
    const reponse = await Axios.get(`https://jobs.github.com/positions.json?search=${selectedLanguage.toLowerCase()}`);
    setData(reponse.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onJobSelect = (job) => {
    setModalFlag(true);
    setSelectedJob(job)
  }

  const renderJobs = ({item}) => <JobItem job={item} onSelect={() => onJobSelect(item)} />

  return (
    <SafeAreaView>
      <View>
        <Text style={{
          textAlign: "center", 
          fontWeight: "bold",
          fontSize: 20,
        }}>JOBS FOR {selectedLanguage.toUpperCase()}</Text>
        <FlatList data={data} renderItem={renderJobs}/>

        <Modal isVisible={modalFlag} onBackdropPress={() => setModalFlag(false)}>
          <View style={jobs.modalBackground}>
            <View style={{borderBottomWidth: 2, borderColor: "#bdbdbd"}}>
              <Text style={jobs.jobTitle}>{selectedJob.title}</Text>
              <Text>{selectedJob.location} / {selectedJob.title}</Text>
              <Text>{selectedJob.company}</Text>
            </View>
            <View style={jobs.jobDesc}>
              <Text numberOfLines={5}>{selectedJob.description}</Text>
            </View>
            <Button title="Save" onPress={() => null} />
          </View>
        </Modal>



      </View>
    </SafeAreaView>
  );
};

export { Jobs };
