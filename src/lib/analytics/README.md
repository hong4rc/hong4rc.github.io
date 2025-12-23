# Analytics Module

Clean, maintainable analytics implementation using multiple design patterns.

## Architecture

### Design Patterns Used

1. **Singleton Pattern** (`AnalyticsManager`)
   - Single instance manages all analytics
   - Centralized event tracking

2. **Strategy Pattern** (`AnalyticsPlugin` interface)
   - Easy to add new analytics providers (GA4, Plausible, Mixpanel, etc.)
   - Each provider implements the same interface

3. **Facade Pattern** (`tracker` object)
   - Simplified API for common tracking needs
   - Hide complexity behind clean interface

4. **Decorator Pattern** (`track()`, `trackSocial()`, etc.)
   - Wrap event handlers with tracking
   - Clean, functional approach

5. **Observer Pattern** (implicit in Manager)
   - Manager notifies all registered plugins
   - Plugins observe events independently

## Usage

### Basic Setup (Already Done)

```typescript
// src/lib/components/Analytics.svelte
import { analytics, GoogleAnalyticsPlugin } from '$lib/analytics';

analytics.register(new GoogleAnalyticsPlugin('G-XXXXXXXXXX'));
analytics.init();
```

### Tracking Events

#### Option 1: Use the Tracker Facade (Recommended)

```typescript
import { tracker } from '$lib/analytics';

// Theme change
tracker.themeChange('mocha', 'dropdown');

// Navigation
tracker.navigate('hero', 'keyboard');

// Social click
tracker.social('github', 'contact_section');

// Blog interactions
tracker.blogView('my-post-slug', 'My Post Title');
tracker.blogSelect('my-post-slug', 'My Post Title');

// External links
tracker.externalLink('tool', 'LazyVim', 'https://lazyvim.org');

// Keyboard shortcuts
tracker.shortcut('Space+h', 'goto_hero');
```

#### Option 2: Use Decorators (Cleaner for Click Handlers)

```svelte
<script>
import { trackSocial, trackExternalLink } from '$lib/analytics';
</script>

<!-- Wrap onclick handlers -->
<a href="..." onclick={trackSocial('github', 'footer')}>GitHub</a>

<a href="..." onclick={trackExternalLink('tool', 'Ghostty', 'https://...')}>
  Ghostty
</a>
```

#### Option 3: Direct Analytics Manager (Advanced)

```typescript
import { analytics } from '$lib/analytics';

analytics.track('custom_event', {
  category: 'user_action',
  label: 'something_specific',
  value: 42
});
```

## Adding a New Analytics Provider

1. Create plugin file: `src/lib/analytics/plugins/PlausiblePlugin.ts`

```typescript
import type { AnalyticsPlugin } from '../types';

export class PlausiblePlugin implements AnalyticsPlugin {
  name = 'plausible';
  private domain: string;

  constructor(domain: string) {
    this.domain = domain;
  }

  init(): void {
    // Load Plausible script
    const script = document.createElement('script');
    script.defer = true;
    script.src = 'https://plausible.io/js/script.js';
    script.setAttribute('data-domain', this.domain);
    document.head.appendChild(script);
  }

  track(eventName: string, properties?: Record<string, unknown>): void {
    if (typeof window.plausible === 'function') {
      window.plausible(eventName, { props: properties });
    }
  }
}
```

2. Register the plugin:

```typescript
// src/lib/components/Analytics.svelte
import { PlausiblePlugin } from '$lib/analytics/plugins/PlausiblePlugin';

analytics.register(new PlausiblePlugin('yourdomain.com'));
analytics.init();
```

Now all events will be sent to both Google Analytics AND Plausible!

## Type Safety

All tracking functions have TypeScript types:

```typescript
// These provide autocomplete and type checking
tracker.navigate(section: string, method: 'click' | 'keyboard' | 'scroll');
tracker.social(platform: 'github' | 'linkedin' | 'email', source?: string);
tracker.externalLink(type: 'tool' | 'tech' | 'repo', name: string, url: string);
```

## Benefits

- **Easy to add providers**: Just implement `AnalyticsPlugin` interface
- **Type-safe**: Full TypeScript support
- **Clean components**: Components use simple `tracker.method()` calls
- **Testable**: Mock the analytics manager for tests
- **Maintainable**: Clear separation of concerns
- **Extensible**: Add custom events or providers without changing existing code

## Event Structure

All events follow this pattern:

```typescript
{
  eventName: string,        // e.g., 'navigate', 'theme_change', 'social_click'
  properties: {             // Optional metadata
    section?: string,
    method?: 'click' | 'keyboard',
    platform?: 'github' | 'linkedin' | 'email',
    // ... other relevant data
  }
}
```
