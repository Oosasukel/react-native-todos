import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TaskItemProps {
  task: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (props: { taskId: number; taskNewTitle: string }) => void;
}

export function TaskItem({
  task,
  index,
  toggleTaskDone,
  removeTask,
  editTask,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setEditedValue(task.title);
    setIsEditing(false);
  };

  const handleSubmitEditing = () => {
    editTask({ taskId: task.id, taskNewTitle: editedValue });
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing) {
      textInputRef.current?.focus();
    } else {
      textInputRef.current?.blur();
    }
  }, [isEditing]);

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name='check' size={12} color='#FFF' />}
          </View>

          <TextInput
            value={editedValue}
            onChangeText={setEditedValue}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {isEditing ? (
          <TouchableOpacity onPress={handleCancelEditing}>
            <Icon name='x' size={24} color='#b2b2b2' />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing}>
            <Image source={editIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.iconsDivider} />

        <TouchableOpacity
          testID={`trash-${index}`}
          disabled={isEditing}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 20,
    paddingLeft: 24,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  taskButton: {
    flex: 1,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    height: 17,
    color: '#666',
    fontFamily: 'Inter-Medium',
    padding: 0,
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextDone: {
    height: 17,
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
    padding: 0,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  iconsDivider: {
    marginHorizontal: 12,
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
  },
});
