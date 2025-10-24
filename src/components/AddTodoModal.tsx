/**
 * Add/Edit Todo Modal Component
 */

import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Todo, TodoPriority, TodoStatus, CreateTodoInput } from '../types/Todo';
import { useTheme } from '../contexts/ThemeContext';
import { Input } from './Input';
import { Button } from './Button';
import { spacing, typography } from '../theme';

interface AddTodoModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (input: CreateTodoInput) => Promise<void>;
  editTodo?: Todo | null;
}

export const AddTodoModal: React.FC<AddTodoModalProps> = ({
  visible,
  onClose,
  onSave,
  editTodo,
}) => {
  const { colors } = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TodoPriority>(TodoPriority.MEDIUM);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ title?: string }>({});

  useEffect(() => {
    if (editTodo) {
      setTitle(editTodo.title);
      setDescription(editTodo.description || '');
      setPriority(editTodo.priority);
    } else {
      resetForm();
    }
  }, [editTodo]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority(TodoPriority.MEDIUM);
    setErrors({});
  };

  const validate = (): boolean => {
    const newErrors: { title?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      await onSave({
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        status: editTodo?.status || TodoStatus.ACTIVE,
      });
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error saving todo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
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

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={[styles.overlay, { backgroundColor: colors.overlay }]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={[styles.container, { backgroundColor: colors.surface }]}>
          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              {editTodo ? 'Edit Todo' : 'Add New Todo'}
            </Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Text style={[styles.closeIcon, { color: colors.textSecondary }]}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <Input
              label="Title *"
              value={title}
              onChangeText={setTitle}
              placeholder="Enter todo title"
              error={errors.title}
              autoFocus
            />

            <Input
              label="Description (Optional)"
              value={description}
              onChangeText={setDescription}
              placeholder="Add more details"
              multiline
              numberOfLines={4}
              style={styles.textArea}
            />

            <Text style={[styles.label, { color: colors.textPrimary }]}>Priority</Text>
            <View style={styles.priorityContainer}>
              {Object.values(TodoPriority).map((p) => (
                <TouchableOpacity
                  key={p}
                  style={[
                    styles.priorityButton,
                    { 
                      borderColor: getPriorityColor(p),
                      backgroundColor: priority === p ? getPriorityColor(p) : 'transparent',
                    },
                  ]}
                  onPress={() => setPriority(p)}
                >
                  <Text
                    style={[
                      styles.priorityButtonText,
                      { 
                        color: priority === p ? colors.textInverse : getPriorityColor(p),
                      },
                    ]}
                  >
                    {p.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View style={[styles.footer, { borderTopColor: colors.border }]}>
            <Button
              title="Cancel"
              onPress={handleClose}
              variant="outline"
              style={styles.footerButton}
            />
            <Button
              title={editTodo ? 'Update' : 'Add Todo'}
              onPress={handleSave}
              loading={loading}
              style={styles.footerButton}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
  },
  closeButton: {
    padding: spacing.xs,
  },
  closeIcon: {
    fontSize: typography.fontSize.xl,
  },
  content: {
    padding: spacing.lg,
  },
  label: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing.sm,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
  },
  priorityButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  footer: {
    flexDirection: 'row',
    padding: spacing.lg,
    gap: spacing.md,
    borderTopWidth: 1,
  },
  footerButton: {
    flex: 1,
  },
});

