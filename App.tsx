/**
 * Main App Component
 * Todo List Application with persistent storage
 * Built with TypeScript and following SOLID principles
 */

import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Todo, CreateTodoInput, UpdateTodoInput } from './src/types/Todo';
import { TodoRepository } from './src/services/TodoRepository';
import { AsyncStorageService } from './src/services/AsyncStorageService';
import { useTodos } from './src/hooks/useTodos';
import {
  TodoItem,
  EmptyState,
  AddTodoModal,
  FilterTabs,
  FilterType,
  Button,
} from './src/components';
import { colors, spacing, typography } from './src/theme';

// Initialize services following Dependency Injection principle
const storageService = new AsyncStorageService<Todo[]>();
const todoRepository = new TodoRepository(storageService);

export default function App() {
  const {
    todos,
    activeTodos,
    completedTodos,
    loading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodoStatus,
    deleteAllTodos,
    refreshTodos,
  } = useTodos(todoRepository);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Filter todos based on active filter
  const filteredTodos = useMemo(() => {
    switch (activeFilter) {
      case 'active':
        return activeTodos;
      case 'completed':
        return completedTodos;
      default:
        return todos;
    }
  }, [activeFilter, todos, activeTodos, completedTodos]);

  // Sort todos by priority and creation date
  const sortedTodos = useMemo(() => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return [...filteredTodos].sort((a, b) => {
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return b.createdAt - a.createdAt;
    });
  }, [filteredTodos]);

  const handleAddTodo = () => {
    setEditingTodo(null);
    setModalVisible(true);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setModalVisible(true);
  };

  const handleSaveTodo = async (input: CreateTodoInput) => {
    if (editingTodo) {
      await updateTodo(editingTodo.id, input as UpdateTodoInput);
    } else {
      await createTodo(input);
    }
  };

  const handleDeleteAll = () => {
    if (todos.length === 0) return;

    Alert.alert(
      'Delete All Todos',
      'Are you sure you want to delete all todos? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete All',
          style: 'destructive',
          onPress: async () => {
            await deleteAllTodos();
          },
        },
      ]
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>My Tasks</Text>
        <Text style={styles.subtitle}>
          {activeTodos.length} active {activeTodos.length === 1 ? 'task' : 'tasks'}
        </Text>
      </View>
      {todos.length > 0 && (
        <TouchableOpacity onPress={handleDeleteAll} style={styles.deleteAllButton}>
          <Text style={styles.deleteAllText}>Clear All</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderEmptyState = () => {
    if (loading) return null;

    let title, message, icon;

    switch (activeFilter) {
      case 'active':
        title = 'No Active Tasks';
        message = 'All your tasks are completed! 🎉';
        icon = '✅';
        break;
      case 'completed':
        title = 'No Completed Tasks';
        message = 'Complete some tasks to see them here';
        icon = '📋';
        break;
      default:
        title = 'No Tasks Yet';
        message = 'Tap the + button to create your first task';
        icon = '📝';
    }

    return <EmptyState title={title} message={message} icon={icon} />;
  };

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>⚠️</Text>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <Button title="Try Again" onPress={refreshTodos} style={styles.retryButton} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {renderHeader()}

      <View style={styles.content}>
        <FilterTabs
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          allCount={todos.length}
          activeCount={activeTodos.length}
          completedCount={completedTodos.length}
        />

        <FlatList
          data={sortedTodos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoItem
              todo={item}
              onToggle={toggleTodoStatus}
              onDelete={deleteTodo}
              onEdit={handleEditTodo}
            />
          )}
          ListEmptyComponent={renderEmptyState}
          contentContainerStyle={
            sortedTodos.length === 0 ? styles.emptyList : styles.list
          }
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={refreshTodos}
              tintColor={colors.primary}
            />
          }
        />
      </View>

      <TouchableOpacity style={styles.fab} onPress={handleAddTodo}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      <AddTodoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveTodo}
        editTodo={editingTodo}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  deleteAllButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.error + '15',
  },
  deleteAllText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.error,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  list: {
    paddingBottom: spacing.xxxl,
  },
  emptyList: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.xl,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 32,
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  errorText: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  errorTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  errorMessage: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  retryButton: {
    minWidth: 120,
  },
});
