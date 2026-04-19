"the obj folder is used for Intermediate Compilation Files. The .NET compiler uses this space to store temporary metadata and configuration files that make the building process faster and more efficient. It is not part of our source code and is generally ignored by version control (Git)."



"The bin folder is the output directory where the compiled application files are placed after a successful build. It contains the executable (.exe), DLLs, and other runtime dependencies needed to run the application. It is also generally ignored by version control."

properties/launchsettings.json:- This file is used to configure the launch settings for the application. It is used to configure the application to run with different settings. It is also used to configure the application to run with different settings.
It contains the Start-up Instructions for your application.
It sets the Port Number (like 5000 or 7000) where your API will run.
It tells the application to run in "Development Mode" so you can see errors for debugging.
It is only used for Local Testing and does not affect the live website on the internet.