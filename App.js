import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Alert,
  Button,
} from 'react-native';
import Task from './src/components/Task';

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    const randomId = Math.floor(Math.random() * 1000);
    const a = taskItems.filter(x => x.id === randomId);

    if (a.length === 0) {
      const obj = {
        id: randomId,
        taskText: task,
        isActive: false,
      };
      setTaskItems([...taskItems, obj]);
      Keyboard.dismiss();
      setTask('');
    } else {
      Alert('ERROR');
    }
  };

  const completeTask = index => {
    let itemsCopy = [...taskItems];
    itemsCopy[index].isActive = !itemsCopy[index].isActive;
    setTaskItems(itemsCopy);
  };

  // const deleteTask = index => {
  //   let itemsCopy = [...taskItems];
  //   itemsCopy.splice(index, 1);
  //   setTaskItems(itemsCopy);
  // };

  const deleteAll = () => {
    setTaskItems([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDo</Text>
      <View style={styles.asd}>
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          value={task}
          onChangeText={text => setTask(text)}
        />

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.delete}>
        <Button title="Delete All" onPress={() => deleteAll()}></Button>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.tasksWrapper}>
          <View style={styles.items}>
            {taskItems.map((item, index) => {
              console.log(item, 'ITEM');
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => completeTask(index)}>
                  <Task text={item.taskText} isActive={item.isActive} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* <TouchableOpacity onPress={() => console.log(taskItems, 'BÜTÜN DATA')}>
          <Text>HEPSİ</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    padding: 25,
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  asd: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 310,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    fontSize: 30,
  },
  delete: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
