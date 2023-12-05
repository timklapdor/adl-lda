import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({

  build: {
    outputFolder: "admin",
    publicFolder: "docs",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "docs",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "lesson",
        label: "Lessons",
        path: "src/lessons",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "datePublished",
            label: "Date Published",
              ui: {
                dateFormat: 'YYYY-MM-DD',   
              },
          },
          {
            type: "datetime",
            name: "dateEdited",
            label: "Date Edited",
              ui: {
                dateFormat: 'YYYY-MM-DD',   
              },
          },          
          {
            type: "string",
            list: true,
            name: "theme", 
            label: "Theme",
            description: "Select a theme for this lesson",
            ui: {
              component: "select",
              options: ['Synchronous', "Collaborative", "Asynchronous", "Assessment", "Course Design", "Learning Tips"],
            }
          },
          {
            type: "string",
            list: true,
            name: "stage", 
            label: "Stage",
            description: "Select which stage of the Course Lifecyle does this lesson apply to",
            ui: {
              component: "select",
              options: ["Refine", "Evaluate", "Deliver", "Prepare", "Review", "Build", "Develop", "Design", "Discover"],
            }
          },
          {
            type: "string",
            list: true,
            name: "learningTypes", 
            label: "Learning Types",
            description: "Select which type of Learning does this lesson promotes",
            ui: {
              component: "select",
              options: ["Assimilative", "Investigative", "Discursive", "Formative", "Productive", "Evaluative", "Social"],
            }
          },
          {
            type: "string",
            list: true,
            name: "scale", 
            label: "Scale",
            description: "Select the scale that this lesson applie to",
            ui: {
              component: "select",
              options: ["Program", "Praxis", "Course", "Assessment Task", "Module", "Lesson", "Activity", "Resource"],
            }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          }
        ],
      },
    ],
  },
});
