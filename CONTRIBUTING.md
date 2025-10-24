# Contributing to Todo List App

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git
- Code editor (VS Code recommended)
- Basic knowledge of React Native and TypeScript

### Setting Up Development Environment

1. **Fork the repository**
   ```bash
   # Click "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/chapter-one-todo-list.git
   cd chapter-one-todo-list
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/chapter-one-todo-list.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Start development server**
   ```bash
   npm start
   ```

## Development Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `style/` - Code style changes

### 2. Make Changes

- Follow the [Coding Standards](#coding-standards)
- Write clean, readable code
- Add comments where necessary
- Update documentation if needed

### 3. Test Your Changes

```bash
# Type check
npx tsc --noEmit

# Test on iOS
npm run ios

# Test on Android
npm run android
```

### 4. Commit Your Changes

Follow the [Commit Guidelines](#commit-guidelines):

```bash
git add .
git commit -m "feat: add new feature description"
```

### 5. Keep Your Branch Updated

```bash
git fetch upstream
git rebase upstream/master
```

### 6. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 7. Create Pull Request

- Go to GitHub and create a pull request
- Fill out the pull request template
- Link any related issues

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid using `any` type
- Use enums for constants

Example:
```typescript
// Good
interface TodoProps {
  todo: Todo;
  onToggle: (id: string) => void;
}

// Bad
interface TodoProps {
  todo: any;
  onToggle: any;
}
```

### React Components

- Use functional components with hooks
- Follow component structure:
  ```typescript
  // 1. Imports
  import React from 'react';
  
  // 2. Types/Interfaces
  interface MyComponentProps {
    // ...
  }
  
  // 3. Component
  export const MyComponent: React.FC<MyComponentProps> = (props) => {
    // 4. Hooks
    const [state, setState] = useState();
    
    // 5. Handlers
    const handleClick = () => {};
    
    // 6. Render
    return <View>...</View>;
  };
  
  // 7. Styles
  const styles = StyleSheet.create({
    // ...
  });
  ```

### SOLID Principles

Follow SOLID principles as demonstrated in the codebase:

1. **Single Responsibility**: Each class/function should have one job
2. **Open/Closed**: Open for extension, closed for modification
3. **Liskov Substitution**: Use interfaces properly
4. **Interface Segregation**: Small, focused interfaces
5. **Dependency Inversion**: Depend on abstractions

### Naming Conventions

- **Components**: PascalCase (`TodoItem.tsx`)
- **Hooks**: camelCase with 'use' prefix (`useTodos.ts`)
- **Services**: PascalCase (`TodoRepository.ts`)
- **Interfaces**: PascalCase with 'I' prefix (`ITodoRepository.ts`)
- **Types**: PascalCase (`TodoPriority`)
- **Variables**: camelCase (`isLoading`)
- **Constants**: UPPER_SNAKE_CASE (`STORAGE_KEY`)

### File Organization

```
src/
├── components/       # UI components
├── hooks/           # Custom hooks
├── services/        # Business logic
│   └── interfaces/  # Service interfaces
├── theme/           # Design tokens
└── types/           # Type definitions
```

### Imports

Order imports logically:

```typescript
// 1. External libraries
import React from 'react';
import { View, Text } from 'react-native';

// 2. Internal types
import { Todo } from '../types/Todo';

// 3. Internal components/hooks
import { Button } from '../components';
import { useTodos } from '../hooks/useTodos';

// 4. Styles
import { colors, spacing } from '../theme';
```

### Comments

- Add comments for complex logic
- Use JSDoc for functions and components
- Keep comments up to date

Example:
```typescript
/**
 * Custom Hook for Todo Management
 * Encapsulates todo state and operations
 */
export const useTodos = (todoRepository: ITodoRepository) => {
  // Implementation
};
```

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(todos): add priority filtering

Added ability to filter todos by priority level.
Users can now view high, medium, or low priority tasks separately.

Closes #123
```

```bash
fix(storage): handle AsyncStorage errors

Added proper error handling for AsyncStorage operations
to prevent app crashes when storage is unavailable.
```

## Pull Request Process

### Before Submitting

1. ✅ Code follows style guidelines
2. ✅ Self-review completed
3. ✅ Comments added for complex code
4. ✅ Documentation updated
5. ✅ No linter errors
6. ✅ Tested on iOS and Android
7. ✅ No console warnings

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How to test the changes

## Screenshots (if applicable)
Add screenshots

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No linter errors
- [ ] Tested on devices
```

### Review Process

1. At least one maintainer must review
2. All comments must be addressed
3. CI checks must pass
4. No merge conflicts

## Testing

### Manual Testing

Test on both platforms:

```bash
# iOS
npm run ios

# Android
npm run android
```

### Test Checklist

- [ ] Create new todo
- [ ] Edit existing todo
- [ ] Toggle todo status
- [ ] Delete todo
- [ ] Filter todos (All, Active, Completed)
- [ ] Delete all todos
- [ ] Close and reopen app (test persistence)
- [ ] Test with empty state
- [ ] Test with many todos
- [ ] Test error states

### Type Checking

```bash
npx tsc --noEmit
```

## Documentation

### When to Update Documentation

- Adding new features
- Changing existing behavior
- Adding new dependencies
- Changing architecture

### Documentation Files

- `README.md` - Getting started guide
- `ARCHITECTURE.md` - Architecture documentation
- `CONTRIBUTING.md` - This file
- Code comments - Inline documentation

### Writing Good Documentation

- Be clear and concise
- Include code examples
- Add screenshots where helpful
- Keep it up to date

## Questions?

- Open an issue with the `question` label
- Reach out to maintainers
- Check existing documentation

## Recognition

Contributors will be recognized in the project README.

Thank you for contributing! 🎉

