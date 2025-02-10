# Frontend Specifications

## Pages

“/” indicates it’s a route. So “/home” means it’s the ‘home’ route and to access it, type in “localhost:5173/home” once naka deploy na localhost sa pc mo

### /dashboard

- Allow the user to choose a single python file upload
- Allow the user to choose a folder upload
- Allow the user to:

  - If they are logged in using email and password, paste a link to a public github repo OR LOGIN using their GitHub account to choose one from their own repositories

  - If they are logged in using GitHub, paste a link to a public github repo OR choose one from their own repositories

- Navigate to the guide documentation
- Display previous generations/prompts

### /file-upload

- Allow the user to choose a single python file to upload
- Specify which functions or classes they want to skip
- Proceed with the generation

### /folder-upload

- Allow the user to choose a folder/project to upload
- Specify which directories they want to skip
- Specify which functions or classes they want to skip
- Proceed with the generation

### /github-upload

- Allow the user to sign in with their Github
- Specify which repository to process
- Specify which directories they want to skip
- Specify which functions or classes they want to skip
- Ask the user if they want the documentation as a Markdown file AND if they want to push the documentation into the repository

### /guide

- Show the user the step by step instructions on how to use the system
- FAQs section
