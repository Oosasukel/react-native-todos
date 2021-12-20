import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskAlreadyExists = tasks.find((task) => task.title === newTaskTitle);

    if (taskAlreadyExists)
      return Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome'
      );

    const newTask: Task = {
      title: newTaskTitle,
      done: false,
      id: new Date().getTime(),
    };

    setTasks((previousState) => [...previousState, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const newState = [...tasks];
    const taskToToggle = newState.find((task) => task.id === id);
    if (taskToToggle) {
      taskToToggle.done = !taskToToggle.done;
      setTasks(newState);
    }
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          onPress: () =>
            setTasks((previousState) =>
              previousState.filter((task) => task.id !== id)
            ),
        },
      ]
    );
  }

  function handleEditTask({
    taskId,
    taskNewTitle,
  }: {
    taskId: number;
    taskNewTitle: string;
  }) {
    const newState = [...tasks];
    const taskToEdit = newState.find((task) => task.id === taskId);
    if (taskToEdit) {
      taskToEdit.title = taskNewTitle;
      setTasks(newState);
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
