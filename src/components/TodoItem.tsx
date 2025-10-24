/**
 * Todo Item Component
 * Displays a single todo item with all its details
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Todo, TodoStatus, TodoPriority } from '../types/Todo';
import { useTheme } from '../contexts/ThemeContext';
import { spacing, typography } from '../theme';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const { colors } = useTheme();
  const isCompleted = todo.status === TodoStatus.COMPLETED;

  const handleDelete = () => {
    Alert.alert(
      'Delete Todo',
      'Are you sure you want to delete this todo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(todo.id),
        },
      ]
    );
  };

  const getPriorityColor = (priority: TodoPriority) => {
    switch (priority) {
      case TodoPriority.HIGH:
        return colors.priorityHigh;
      case TodoPriority.MEDIUM:
        return colors.priorityMedium;
      case TodoPriority.LOW:
        return colors.priorityLow;
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <View style={[
      styles.container,
      { 
        backgroundColor: colors.surface,
        shadowColor: colors.shadow,
      },
      isCompleted && styles.completedContainer,
    ]}>
      {/* Priority Indicator */}
      <View
        style={[
          styles.priorityIndicator,
          { backgroundColor: getPriorityColor(todo.priority) },
        ]}
      />

      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => onToggle(todo.id)}
      >
        <View
          style={[
            styles.checkbox,
            { borderColor: colors.border },
            isCompleted && { 
              backgroundColor: colors.success,
              borderColor: colors.success,
            },
          ]}
        >
          {isCompleted && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            { color: colors.textPrimary },
            isCompleted && styles.completedTitle,
          ]}
          numberOfLines={2}
        >
          {todo.title}
        </Text>

        {todo.description && (
          <Text
            style={[
              styles.description,
              { color: colors.textSecondary },
              isCompleted && { color: colors.textLight },
            ]}
            numberOfLines={2}
          >
            {todo.description}
          </Text>
        )}

        <View style={styles.footer}>
          <View style={styles.badgeContainer}>
            <View
              style={[
                styles.priorityBadge,
                { backgroundColor: getPriorityColor(todo.priority) + '20' },
              ]}
            >
              <Text
                style={[
                  styles.priorityText,
                  { color: getPriorityColor(todo.priority) },
                ]}
              >
                {todo.priority.toUpperCase()}
              </Text>
            </View>
          </View>

          <Text style={[styles.dateText, { color: colors.textLight }]}>
            {formatDate(todo.createdAt)}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onEdit(todo)}
        >
          <Text style={styles.editIcon}>✏️</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleDelete}
        >
          <Text style={styles.deleteIcon}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completedContainer: {
    opacity: 0.7,
  },
  priorityIndicator: {
    width: 4,
    borderRadius: 2,
    marginRight: spacing.md,
  },
  checkboxContainer: {
    padding: spacing.xs,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
  },
  content: {
    flex: 1,
    marginRight: spacing.sm,
  },
  title: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.xs,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
  },
  description: {
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badgeContainer: {
    flexDirection: 'row',
  },
  priorityBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  priorityText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
  },
  dateText: {
    fontSize: typography.fontSize.xs,
  },
  actions: {
    justifyContent: 'space-between',
  },
  actionButton: {
    padding: spacing.xs,
  },
  editIcon: {
    fontSize: typography.fontSize.lg,
  },
  deleteIcon: {
    fontSize: typography.fontSize.lg,
  },
});

