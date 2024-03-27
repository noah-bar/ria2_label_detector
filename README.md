# Label Detector Readme
## Description
This Node.js project, built using Express.js, provides an API service for image label detection. It integrates with Google Cloud's Label Detection API through the **GoogleLabelDetector** class. The service allows clients to send images for analysis, returning labels that describe the content of the image along with their confidence scores
## Getting started
### Prerequisites
List all dependencies and their version needed by the project as :
- Node V21.1+
- Npm V10.2+
- Typescript V5.3+
## API Endpoints
### Analyze Image
- **Endpoint**: `/api/v1/analyse`
- **Method**: POST
- **Description**: This endpoint accepts an image for analysis and returns labels describing the image. The client can specify the maximum number of results to return and the minimum confidence level for the labels.
- **Request Body**:
  - `image`: (String) The image data or a URL to the image.
  - `maxResults`: (Number, optional) Maximum number of labels to return. Defaults to 7.
  - `minConfidenceLevel`: (Number, optional) Minimum confidence level for the labels. Defaults to 90.
- **Response**: A JSON object containing an array of labels and their respective confidence scores.
## Deployment
### On dev environment
1. Rename `.env.example` file to `.env`.
2. Complete the following variables in the `.env` file:
   - `GOOGLE_CREDENTIALS_PATH`: The path to the JSON file containing your Google credentials.
   - `PORT`: The port on which the application will run (default is 4000).
 3. Install dependencies:
    ```
    npm i
    ```
 5. Run tests to ensure everything is configured correctly:
    ```
    npm run test
    ```
 7. Launch the application in development mode:
    ```
    npm run dev
    ```
### On integration environment
1. Build the application:
   ```
   npm run build
   ```
   This step creates a `dist` folder.
3. Place a `.env` file with production configurations inside the `dist` folder.
4. Launch the application:
   ```
   node dist/index.js
   ```
## Docker
To containerize and run the application using Docker, use the following commands:
### On dev environment
1. Build the Docker image with the dev configuration.
   ```
   docker build . -f Dockerfile.dev -t label_detector:dev
   ```
2. Run the Docker container in detached mode, mapping the container's port 4000 to the host's port 4000.
   ```
   docker run -d -p 4000:4000 --name label_detector_dev label_detector:dev
   ```
### On integration environment
1. Build the Docker image with the production configuration.
   ```
   docker build . -f Dockerfile -t label_detector:prod
   ```
2. Run the Docker container in detached mode, mapping the container's port 4000 to the host's port 4000.
   ```
   docker run -d -p 4000:4000 --name label_detector_prod label_detector:prod
   ```
## Directory structure
```console
labelDetector
├── data                            //contains the data used by the application.
│   └── image.jpg
├── dist                            //compiled files ready for production use
│   ├── GoogleLabelDetector.d.ts
│   ├── GoogleLabelDetector.js
│   ├── ILabelDetector.d.ts
│   ├── ILabelDetector.js
│   ├── index.d.ts
│   └── index.js
├── jest.config.js
├── package-lock.json
├── package.json
├── src                              //contains the source code
│   ├── GoogleLabelDetector.ts
│   ├── ILabelDetector.ts
│   └── index.ts
├── tests                            //contains unit tests
│   └── googleLabelDetector.test.ts
└── tsconfig.json
```
## Collaborate
### Commit Message Guidelines
To maintain clarity and consistency in our repository's history, we adhere to the following commit guidelines:
- **Descriptive Messages**: Ensure each commit message clearly describes the changes made.
- **Conventional Commits**: Follow the [Conventional Commits](https://www.conventionalcommits.org/) format, using types like `feat`, `fix`, `refactor`, `style`, `docs`, `test`, `chore`, etc.
### Branching Strategy
We use [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/) as our branching strategy. Please create feature, hotfix, or release branches as appropriate and merge them back into the main branches as per Git Flow guidelines.
### Pull Requests
Open a pull request with a clear title and description for your changes. Link any relevant issues in the pull request description.
## License
This project is open source and available under the [MIT License].
