# AI Text Humanizer - Design System

## Design Philosophy

The AI Text Humanizer application follows a minimalist, terminal-inspired design aesthetic similar to pqoqubbw.dev. The design prioritizes:

- **Minimalism**: Clean interfaces with ample negative space
- **Typography-focused**: Content-first approach with monospaced typography
- **Dark mode**: Pure black background with subtle gray text for reduced eye strain
- **Low visual noise**: Minimal borders, subtle hover states, and restrained use of color
- **Terminal-like aesthetic**: Monospaced fonts and simple UI elements reminiscent of developer tools

## Color Palette

### Base Colors

- **Background**: Pure black (#000000)
- **Text**: Light gray (#BFBFBF, 70% white)
- **Muted Text**: Medium gray (#808080, 50% white)
- **Subtle Text**: Dark gray (#4D4D4D, 30% white)

### UI Elements

- **Borders**: Very dark gray (#262626, 15% white)
- **Input Background**: Very dark gray (#171717, 9% white)
- **Hover States**: Dark gray (#333333, 20% white)
- **Focus States**: Medium dark gray (#404040, 25% white)
- **Error**: Dark red (#7F1D1D) with red text (#F87171)

### Semantic Colors

- **Primary Action**: Dark gray (#171717) with light gray text (#BFBFBF)
- **Secondary Action**: Transparent with dark gray border (#262626)
- **Destructive Action**: Dark red background (#7F1D1D) with light red text (#FCA5A5)

## Typography

- **Primary Font**: JetBrains Mono (monospaced) for all text
- **Font Sizes**:
  - Extra Small: 0.75rem (12px)
  - Small: 0.875rem (14px)
  - Base: 1rem (16px)
  - Large: 1.125rem (18px)
  - Extra Large: 1.25rem (20px)
- **Font Weights**:
  - Regular: 400
  - Medium: 500
  - Bold: 700
- **Line Heights**:
  - Tight: 1.25
  - Normal: 1.5
  - Relaxed: 1.75

## Layout & Spacing

- **Container Width**: Max width of 48rem (768px) for content
- **Spacing Scale**:
  - 2: 0.5rem (8px)
  - 3: 0.75rem (12px)
  - 4: 1rem (16px)
  - 6: 1.5rem (24px)
  - 8: 2rem (32px)
  - 12: 3rem (48px)
  - 16: 4rem (64px)
- **Page Structure**:
  - Header: Minimal with profile info and social links
  - Main Content: Centered with full width within container
  - Footer: Minimal with copyright information

## UI Components

### Buttons

- **Primary**: Dark gray background (#171717) with light gray text (#BFBFBF)
- **Secondary/Outline**: Transparent with dark gray border (#262626)
- **Ghost**: Transparent with hover state
- **Sizes**:
  - Small: h-8 with text-xs
  - Default: h-9 with text-sm
  - Large: h-10 with text-base
- **States**:
  - Hover: Slightly lighter background
  - Focus: Ring outline in dark gray
  - Disabled: 50% opacity

### Form Elements

- **Text Inputs/Textareas**:
  - Background: Very dark gray (#171717)
  - Border: Dark gray (#262626)
  - Text: Light gray (#BFBFBF)
  - Placeholder: Medium gray (#808080)
  - Focus: Border color change to medium gray (#404040)

- **Select**:
  - Trigger: Same as text inputs
  - Dropdown: Very dark gray background (#171717) with dark gray border (#262626)
  - Options: Hover state with slightly lighter background
  - Selected: Check icon in light gray

### Cards & Containers

- **Cards**:
  - Background: Slightly lighter than page background (#0D0D0D)
  - Border: Dark gray (#262626)
  - Padding: 1rem (16px)
  - Border Radius: 0.25rem (4px)

- **Collapsible Sections**:
  - Header: Ghost button with full width
  - Content: Padded container
  - Indicator: Small triangle icon (▼/▲)

## Interaction Design

### Hover States

- **Links & Buttons**: Lighten text/background slightly
- **Interactive Elements**: Cursor pointer, subtle background change

### Focus States

- **All Elements**: Subtle ring outline in dark gray
- **No Focus Ring on Click**: Only visible when navigating with keyboard

### Transitions

- **Color Changes**: 150ms ease-in-out
- **Opacity Changes**: 200ms ease-in-out
- **Transform Effects**: 200ms ease-out

## Responsive Design

- **Breakpoints**:
  - Mobile: Default (up to 640px)
  - Small: 640px
  - Medium: 768px
  - Large: 1024px
  - Extra Large: 1280px

- **Mobile Adaptations**:
  - Single column layouts
  - Stacked elements
  - Reduced padding
  - Full-width inputs and buttons

## Accessibility Considerations

- **Color Contrast**: Maintained minimum 4.5:1 ratio for text
- **Focus Indicators**: Visible for keyboard navigation
- **Semantic HTML**: Proper heading hierarchy and landmark regions
- **Screen Reader Support**: Appropriate ARIA attributes and labels

## Design Principles

1. **Content First**: Design emphasizes the content over decorative elements
2. **Functional Minimalism**: Remove anything that doesn't serve a purpose
3. **Consistent Patterns**: Reuse the same patterns throughout the interface
4. **Progressive Disclosure**: Show only what's needed at each step
5. **Subtle Feedback**: Provide feedback through minimal visual changes

## Visual Hierarchy

1. **Primary Content**: Input and output text areas
2. **Secondary Controls**: Style selector and action buttons
3. **Tertiary Elements**: History items and metadata
4. **Supporting Elements**: Labels, hints, and status information

This design system provides a comprehensive guide for maintaining the minimalist, terminal-inspired aesthetic of the AI Text Humanizer application across all components and interactions.
