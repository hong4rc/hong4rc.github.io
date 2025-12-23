# Design Pattern Opportunities

Analysis of where design patterns can improve code quality and maintainability.

## 1. ✅ Already Implemented: Analytics Module

**Current State:** ✅ Excellent
- Singleton Pattern (AnalyticsManager)
- Strategy Pattern (AnalyticsPlugin)
- Facade Pattern (tracker)
- Decorator Pattern (track functions)
- Observer Pattern (plugin notification)

## 2. 🔄 Theme Management (theme.ts)

**Current:** Basic Svelte store with localStorage
**Opportunities:**

### A. Strategy Pattern for Storage
```typescript
interface StorageStrategy {
  get(key: string): string | null;
  set(key: string, value: string): void;
}

class LocalStorageStrategy implements StorageStrategy { ... }
class SessionStorageStrategy implements StorageStrategy { ... }
class CookieStorageStrategy implements StorageStrategy { ... }

// Use:
const themeManager = new ThemeManager(new LocalStorageStrategy());
```

**Benefits:**
- Easy to switch storage methods
- Testable (mock storage)
- Server-side rendering friendly

### B. State Pattern for Theme Transitions
```typescript
interface ThemeState {
  enter(): void;
  exit(): void;
  getCSS(): string;
}

class LatteTheme implements ThemeState { ... }
class MochaTheme implements ThemeState { ... }

// Smooth transitions, validation, hooks
```

### C. Memento Pattern for Theme History
```typescript
class ThemeHistory {
  private history: Theme[] = [];

  save(theme: Theme): void { ... }
  undo(): Theme | null { ... }
  redo(): Theme | null { ... }
}

// Ctrl+Z to undo theme changes
```

## 3. 🔄 UTM Parameters (utm.ts)

**Current:** Simple function with object merging
**Opportunity:** Builder Pattern

```typescript
class UTMBuilder {
  private params: URLSearchParams;

  constructor(private baseUrl: string) {
    this.params = new URLSearchParams();
  }

  source(value: string): this {
    this.params.set('utm_source', value);
    return this;
  }

  medium(value: string): this {
    this.params.set('utm_medium', value);
    return this;
  }

  campaign(value: string): this {
    this.params.set('utm_campaign', value);
    return this;
  }

  content(value: string): this {
    this.params.set('utm_content', value);
    return this;
  }

  build(): string {
    const url = new URL(this.baseUrl);
    this.params.forEach((value, key) => {
      url.searchParams.set(key, value);
    });
    return url.toString();
  }
}

// Fluent API:
const url = new UTMBuilder('https://github.com/hong4rc')
  .source('portfolio')
  .medium('website')
  .campaign('social_links')
  .content('footer')
  .build();
```

**Benefits:**
- Fluent, readable API
- Type-safe parameter building
- Easy to extend with validation

## 4. 🔄 Blog Posts (posts.ts)

**Current:** Direct import and filtering
**Opportunities:**

### A. Repository Pattern
```typescript
interface BlogRepository {
  getAll(): Promise<BlogPost[]>;
  getBySlug(slug: string): Promise<BlogPost | null>;
  getByTag(tag: string): Promise<BlogPost[]>;
  search(query: string): Promise<BlogPost[]>;
}

class MarkdownBlogRepository implements BlogRepository {
  private cache: Map<string, BlogPost> = new Map();

  async getAll(): Promise<BlogPost[]> {
    // Lazy load, cache, etc.
  }
}

class ApiBlogRepository implements BlogRepository {
  // Fetch from CMS/API
}

// Easy to switch data sources
const repo: BlogRepository = new MarkdownBlogRepository();
```

### B. Factory Pattern for Post Creation
```typescript
class BlogPostFactory {
  static createFromMarkdown(path: string, module: PostModule): BlogPost {
    const slug = this.extractSlug(path);
    return {
      ...module.metadata,
      slug,
      readTime: this.calculateReadTime(module.content)
    };
  }

  static createFromAPI(data: any): BlogPost {
    // Transform API response
  }
}
```

### C. Proxy Pattern for Lazy Loading
```typescript
class LazyBlogPost {
  private content: PostModule | null = null;

  constructor(private metadata: BlogPost) {}

  async getContent(): Promise<PostModule> {
    if (!this.content) {
      this.content = await import(`/src/posts/${this.metadata.slug}.md`);
    }
    return this.content;
  }
}
```

## 5. 🔄 Command Palette (Already Good, But Can Improve)

**Current:** Custom command registry
**Opportunity:** Enhanced Command Pattern

```typescript
// Add undo/redo support
interface Command {
  execute(): void;
  undo(): void;
  canUndo: boolean;
}

class NavigationCommand implements Command {
  private previousSection: string;

  execute() {
    this.previousSection = getCurrentSection();
    navigateTo(this.targetSection);
  }

  undo() {
    navigateTo(this.previousSection);
  }

  canUndo = true;
}

class ThemeChangeCommand implements Command {
  private previousTheme: Theme;

  execute() {
    this.previousTheme = theme.get();
    theme.set(this.newTheme);
  }

  undo() {
    theme.set(this.previousTheme);
  }

  canUndo = true;
}

// Command history
class CommandHistory {
  private history: Command[] = [];
  private position = -1;

  execute(command: Command) {
    command.execute();
    if (command.canUndo) {
      this.history = this.history.slice(0, this.position + 1);
      this.history.push(command);
      this.position++;
    }
  }

  undo() {
    if (this.position >= 0) {
      this.history[this.position].undo();
      this.position--;
    }
  }

  redo() {
    if (this.position < this.history.length - 1) {
      this.position++;
      this.history[this.position].execute();
    }
  }
}

// Ctrl+Z for undo!
```

## 6. 🔄 Config Management (config.ts)

**Current:** Plain exported object
**Opportunity:** Singleton with Type-Safe Access

```typescript
class ConfigManager {
  private static instance: ConfigManager;
  private config: typeof rawConfig;

  private constructor() {
    this.config = this.loadConfig();
  }

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  get<K extends keyof typeof rawConfig>(key: K): typeof rawConfig[K] {
    return this.config[key];
  }

  getFeature(feature: keyof typeof rawConfig.features): boolean {
    return this.config.features[feature];
  }

  // Validation, environment overrides, etc.
  private loadConfig() {
    const config = { ...rawConfig };

    // Override from environment
    if (import.meta.env.VITE_GA_ID) {
      config.analytics.googleAnalyticsId = import.meta.env.VITE_GA_ID;
    }

    return config;
  }
}

// Type-safe access
const config = ConfigManager.getInstance();
config.get('analytics').googleAnalyticsId;
```

## 7. 🔄 Form Validation (If/When Needed)

**Opportunity:** Chain of Responsibility

```typescript
abstract class ValidationHandler {
  protected next: ValidationHandler | null = null;

  setNext(handler: ValidationHandler): ValidationHandler {
    this.next = handler;
    return handler;
  }

  abstract validate(value: string): ValidationResult;

  protected validateNext(value: string): ValidationResult {
    if (this.next) {
      return this.next.validate(value);
    }
    return { valid: true };
  }
}

class RequiredValidator extends ValidationHandler {
  validate(value: string): ValidationResult {
    if (!value.trim()) {
      return { valid: false, error: 'This field is required' };
    }
    return this.validateNext(value);
  }
}

class EmailValidator extends ValidationHandler {
  validate(value: string): ValidationResult {
    if (!value.includes('@')) {
      return { valid: false, error: 'Invalid email' };
    }
    return this.validateNext(value);
  }
}

// Chain validators
const validator = new RequiredValidator()
  .setNext(new EmailValidator())
  .setNext(new MaxLengthValidator(100));

const result = validator.validate(email);
```

## Priority Ranking

### High Priority (Most Impact)
1. **UTM Builder Pattern** - Immediate benefit, clean API
2. **Blog Repository Pattern** - Easier to extend, better testing
3. **Theme Storage Strategy** - Better SSR, testing

### Medium Priority
4. **Command History with Undo** - Cool feature, good UX
5. **Config Manager** - Better validation, environment handling

### Low Priority (Nice to Have)
6. **Theme State Pattern** - Only if complex transitions needed
7. **Form Validation Chain** - Only when forms are added

## Recommendation

**Start with:** UTM Builder Pattern (Quick win, immediate benefit)
**Then:** Blog Repository Pattern (Biggest architectural improvement)
**Finally:** Theme Storage Strategy (Better testability)

Would you like me to implement any of these?
