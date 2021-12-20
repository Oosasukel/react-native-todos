import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
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
    setTasks((previousState) => previousState.filter((task) => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
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
