import React, { useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import store from './redux/store';
import { addTodo, deleteTodo, updateTodo } from './redux/todoSlice';

const TodoApp = () => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleAdd = () => {
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo));
      setNewTodo('');
    }
  };

  const handleUpdate = () => {
    if (editText.trim()) {
      dispatch(updateTodo({ id: editingId, newText: editText }));
      setEditingId(null);
      setEditText('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redux Todo App</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a todo..."
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            {editingId === item.id ? (
              <>
                <TextInput
                  style={styles.editInput}
                  value={editText}
                  onChangeText={setEditText}
                />
                <TouchableOpacity onPress={handleUpdate}>
                  <Text style={styles.saveBtn}>Save</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.todoText}>{item.text}</Text>
                <View style={styles.actions}>
                  <TouchableOpacity
                    onPress={() => {
                      setEditingId(item.id);
                      setEditText(item.text);
                    }}>
                    <Text style={styles.editBtn}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => dispatch(deleteTodo(item.id))}>
                    <Text style={styles.deleteBtn}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  inputRow: { flexDirection: 'row', marginBottom: 20 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 },
  button: { backgroundColor: '#007bff', padding: 10, marginLeft: 10, borderRadius: 5 },
  buttonText: { color: '#fff' },
  todoItem: { padding: 10, borderBottomWidth: 1, borderColor: '#eee' },
  todoText: { fontSize: 16 },
  actions: { flexDirection: 'row', marginTop: 5 },
  editBtn: { color: 'orange', marginRight: 10 },
  deleteBtn: { color: 'red' },
  editInput: { flex: 1, borderBottomWidth: 1, marginRight: 10 },
  saveBtn: { color: 'green' },
});
