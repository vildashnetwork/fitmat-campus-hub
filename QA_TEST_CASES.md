# FITMAT Institute - QA Test Cases

## Manual UI Test Cases

### Test Case 1: Hero Section Display
**Objective**: Verify hero section displays correctly with background image

**Steps**:
1. Navigate to home page (`/`)
2. Observe hero section

**Expected Results**:
- ✅ Campus aerial image visible as background
- ✅ Text is readable with proper contrast
- ✅ CTA buttons are visible and styled correctly
- ✅ Hero height is 500px on mobile, 600px on desktop
- ✅ Image has brightness filter applied

**Test on**: Desktop (1920x1080), Tablet (768x1024), Mobile (375x667)

---

### Test Case 2: Bottom Navigation (Mobile Only)
**Objective**: Verify bottom navigation appears only on mobile screens

**Steps**:
1. Open site on mobile device or resize browser to < 768px width
2. Navigate through different pages
3. Resize to desktop width (> 768px)

**Expected Results**:
- ✅ Bottom nav visible on screens < 768px
- ✅ Bottom nav hidden on screens ≥ 768px
- ✅ All pages have 80px bottom padding on mobile (pb-20)
- ✅ Active route is highlighted with primary color
- ✅ Icons and labels are clearly visible
- ✅ Glassmorphism effect visible on bottom nav

**Test on**: Mobile (375x667), Tablet (768x1024), Desktop (1920x1080)

---

### Test Case 3: Candidate Color Mapping
**Objective**: Verify each candidate has unique color across all views

**Steps**:
1. Navigate to Voting page (`/voting`)
2. Observe candidate cards
3. Check for color swatches next to names
4. Verify border colors match assigned colors

**Expected Results**:
- ✅ Amina Hassan: Blue border and swatch (#3B82F6)
- ✅ Baba Mensah: Pink border and swatch (#EC4899)
- ✅ Chioma Okafor: Orange border and swatch (#FB923C)
- ✅ Color swatches are circular with glow effect
- ✅ Hover on card intensifies border color
- ✅ Colors remain consistent across all screen sizes

**Test on**: All screen sizes

---

### Test Case 4: Glassmorphism Bet Slip
**Objective**: Verify bet slip has glass panel styling

**Steps**:
1. Navigate to any event detail page (`/events/:id`)
2. Observe the bet slip panel on the right (desktop) or bottom (mobile)
3. Select a bet option

**Expected Results**:
- ✅ Bet slip has frosted glass appearance
- ✅ Backdrop blur is visible (elements behind are blurred)
- ✅ Border is subtle and translucent
- ✅ Sticky positioning works on desktop (stays on scroll)
- ✅ Shadow glow appears when bet is selected
- ✅ All text is readable with sufficient contrast

**Test on**: Desktop (1920x1080), Tablet (768x1024)

---

### Test Case 5: Live Event Indicator
**Objective**: Verify live events display with pulsing glow effect

**Steps**:
1. Ensure there's a live event in storage (status: 'live')
2. Navigate to home page or events page
3. Observe live event indicator

**Expected Results**:
- ✅ Red dot pulsing next to "LIVE" label
- ✅ Shadow glow effect on live indicator
- ✅ Live score prominently displayed
- ✅ Card has elevated shadow
- ✅ Hover effect adds additional glow

**Test on**: All screen sizes

---

### Test Case 6: Responsive Event Cards
**Objective**: Verify event cards layout adapts to screen size

**Steps**:
1. Navigate to Events page (`/events`)
2. Resize browser from mobile to desktop width
3. Observe card grid layout changes

**Expected Results**:
- ✅ Mobile (< 640px): 1 column
- ✅ Small tablet (640-1024px): 2 columns
- ✅ Desktop (> 1024px): 3 columns
- ✅ Cards scale on hover (1.02x)
- ✅ Shadows progress smoothly
- ✅ All content remains readable at all sizes

**Test on**: Mobile (375x667), Tablet (768x1024), Desktop (1920x1080)

---

### Test Case 7: Features Section Background
**Objective**: Verify features section has students cheering image

**Steps**:
1. Navigate to home page (`/`)
2. Scroll to features section (3 cards: Betting, Voting, Tokens)
3. Observe background image and overlay

**Expected Results**:
- ✅ Students cheering image visible as background
- ✅ Gradient overlay (primary to secondary) provides contrast
- ✅ White text is readable on all screen sizes
- ✅ Glass panel effect on feature cards
- ✅ Icons have white glow effect
- ✅ Section is responsive (1 → 2 → 3 columns)

**Test on**: All screen sizes

---

### Test Case 8: Odds Change Notification (UI Only)
**Objective**: Verify odds change indicator appears in bet slip

**Steps**:
1. Navigate to event detail page
2. Select a bet and enter amount
3. Manually simulate odds change (for UI verification)

**Expected Results**:
- ✅ Banner appears: "Odds changed — confirm new payout"
- ✅ Previous payout has strikethrough
- ✅ New payout is prominent
- ✅ Warning color used for notification
- ✅ User must confirm to proceed

**Note**: This is mock logic for UI testing. Backend WebSocket not implemented.

**Test on**: Desktop (1920x1080), Tablet (768x1024)

---

### Test Case 9: Mobile Touch Interactions
**Objective**: Verify all interactive elements work on touch devices

**Steps**:
1. Use actual mobile device or browser touch emulation
2. Navigate through all pages
3. Interact with buttons, cards, tabs, navigation

**Expected Results**:
- ✅ All buttons have minimum 44px touch target
- ✅ Tap feedback (scale/color change) is immediate
- ✅ Bottom nav tabs respond to taps
- ✅ Card tap reveals detail (no hover required)
- ✅ No double-tap zoom issues
- ✅ Swipe gestures don't interfere with navigation

**Test on**: iPhone (Safari), Android (Chrome)

---

### Test Case 10: Dark Mode Consistency
**Objective**: Verify glassmorphism and colors work in dark mode

**Steps**:
1. Enable dark mode in browser/system preferences
2. Navigate through all pages
3. Observe glass panels, shadows, colors

**Expected Results**:
- ✅ Glass panel background adjusts: `hsl(220 13% 12% / 0.7)`
- ✅ Border colors darken appropriately
- ✅ Candidate colors remain vibrant
- ✅ Shadow glow visible against dark background
- ✅ All text meets contrast requirements
- ✅ Images have appropriate overlays for readability

**Test on**: All screen sizes with dark mode enabled

---

### Test Case 11: Page Load Performance
**Objective**: Verify images and effects don't degrade performance

**Steps**:
1. Open Chrome DevTools → Performance tab
2. Record page load for home page
3. Analyze First Contentful Paint (FCP) and Largest Contentful Paint (LCP)

**Expected Results**:
- ✅ FCP < 1.5 seconds
- ✅ LCP < 2.5 seconds
- ✅ No layout shift from image loading (use aspect ratio containers)
- ✅ Glassmorphism effects use GPU acceleration
- ✅ Smooth 60fps on scroll and transitions

**Test on**: Desktop (fast connection), Mobile (3G throttling)

---

### Test Case 12: Keyboard Navigation
**Objective**: Verify all interactive elements are keyboard accessible

**Steps**:
1. Use Tab key to navigate through pages
2. Use Enter/Space to activate elements
3. Use arrow keys in component navigation (tabs, etc.)

**Expected Results**:
- ✅ Focus indicators visible on all elements
- ✅ Tab order is logical (top to bottom, left to right)
- ✅ Bottom nav items can be focused and activated
- ✅ Modal dialogs trap focus correctly
- ✅ Escape key closes modals
- ✅ No focus traps (can always exit)

**Test on**: Desktop (keyboard), Screen reader (NVDA/JAWS)

---

## Automated Test Recommendations

### Visual Regression Tests
- Capture screenshots of all pages at 3 breakpoints
- Compare against baseline images
- Use tools: Percy, Chromatic, or Playwright

### Accessibility Tests
- Run axe-core on all pages
- Verify color contrast ratios
- Check ARIA labels and roles
- Validate heading hierarchy

### Cross-Browser Tests
- Chrome, Firefox, Safari, Edge
- Mobile: Safari iOS, Chrome Android
- Use BrowserStack or Sauce Labs

### Performance Tests
- Lighthouse CI for each page
- Target scores: Performance > 90, Accessibility > 95
- Monitor bundle size (should not exceed 500KB)

---

## Test Summary Matrix

| Test Case | Mobile | Tablet | Desktop | Dark Mode | Pass/Fail |
|-----------|--------|--------|---------|-----------|-----------|
| TC1: Hero Display | ☐ | ☐ | ☐ | ☐ | ☐ |
| TC2: Bottom Nav | ☐ | ☐ | ☐ | N/A | ☐ |
| TC3: Candidate Colors | ☐ | ☐ | ☐ | ☐ | ☐ |
| TC4: Glass Bet Slip | N/A | ☐ | ☐ | ☐ | ☐ |
| TC5: Live Indicator | ☐ | ☐ | ☐ | ☐ | ☐ |
| TC6: Responsive Cards | ☐ | ☐ | ☐ | N/A | ☐ |
| TC7: Features BG | ☐ | ☐ | ☐ | ☐ | ☐ |
| TC8: Odds Change | N/A | ☐ | ☐ | N/A | ☐ |
| TC9: Touch Interact | ☐ | ☐ | N/A | N/A | ☐ |
| TC10: Dark Mode | ☐ | ☐ | ☐ | ☐ | ☐ |
| TC11: Performance | ☐ | N/A | ☐ | N/A | ☐ |
| TC12: Keyboard Nav | N/A | N/A | ☐ | N/A | ☐ |

---

## Bug Report Template

**Bug ID**: [Unique identifier]
**Test Case**: [Related test case number]
**Severity**: [Critical / High / Medium / Low]
**Environment**: [Browser, OS, Screen size]

**Description**: [Clear description of the issue]

**Steps to Reproduce**:
1. 
2. 
3. 

**Expected Result**: [What should happen]
**Actual Result**: [What actually happens]
**Screenshot**: [Attach if applicable]

**Additional Notes**: [Any relevant information]
