## Changes Made

### 1. Removed `color: white;` from Light Mode
- **Before:** In the light theme, the `color: white;` rule was forcing text to always display in white.  
- **Issue:** This overrode the theme color variables (`--text_color`), making the light mode inconsistent (white text on white background → unreadable).  
- **Fix:** Removed the hard-coded `color: white;`. Now the text color follows the theme variables, ensuring proper readability in both dark and light modes. 
---

### 2. Added "(Required)" text next to form field labels
- **Before:** Required fields were only marked with the `required` attribute in HTML.  
- **Issue:** Users might not immediately notice which fields are mandatory without attempting submission.  
- **Fix:** Explicitly added `(Required)` text next to labels of mandatory fields. 

---

### 3. Overrode browser autofill background color in Dark Mode
- **Before:** When users entered saved credentials (e.g., email, name), the browser applied its default autofill yellow background.  
- **Issue:** This yellow autofill background clashed with the dark mode design, making fields visually inconsistent.  
- **Fix:** Added CSS rules to override autofill background colors and match them with the dark theme (`--main_background_color`).  
