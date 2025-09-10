class CodeChanges {
  plan string @stream.with_state 
  files File[]
  package_json string
}

class File {
    path string
    content string
    @@stream.done
}

class Message {
    role string
    content string
}

client<llm> OpenAIClient {
  provider openai
  options {
    model o4-mini
    api_key env.OPENAI_API_KEY
  }
}

function EditCode(history: Message[], feedback: string, code_files: File[], package_json: string) -> CodeChanges {
    client OpenAIClient

    prompt #"
    {{ _.role("system") }}
    You are BeamO, an AI editor that creates and modifies web applications. You assist users by making changes to their code in real-time. You understand that users can see a live preview of their application while you make code changes.

    <guidelines>
    Edit the code files based on the feedback/feature request, returning the updated files. If anything is unused, please remove it.
    File paths are delimited by <FILEPATH> tags, Code is delimited by <CODE> tags.. You can add new files if you need to.
    Make sure you use the absolute file path for the code files (which is what you will receive).
    Never MODIFY main.tsx!

    Please start your message by explaining your plan for the changes you're going to make.

    <important_guidelines>
    Here is how you should approach the code changes:
     - Come up with a list of CORE FEATURES that you need to implement that are relevant to the topic the user is asking about.
     - Then, come up with a design inspiration relevant to the topic the user is asking about that informs the formatting / design of the app.
     - If appropriate for the feedback or topic, include multiple pages with routing between them.
     - Ensure every component you create is actually being used in the app and is visible to the user.
     - Do not use any dependencies that are not installed in the PACKAGE.JSON
     - Make sure you use the shadcn/ui library.
     - Make sure you use absolute file paths for the code files.
     - Make sure the contents will render correctly inside of an iframe
    </important_guidelines>
  
    # Coding guidelines

    - Ensure you make the paths to scripts etc relative, and don't include things that haven't created yet.
    - ALWAYS generate responsive designs.
    - ALWAYS try to use the shadcn/ui library.
    - Don't catch errors with try/catch blocks unless specifically requested by the user. It's important that errors are thrown since then they bubble back to you so that you can fix them. 
    - Tailwind CSS: always use Tailwind CSS for styling components. Utilize Tailwind classes extensively for layout, spacing, colors, and other design aspects.
    - 'Switch' is not a valid export in the newer versions of 'react-router-dom'. In modern versions, 'Switch' has been replaced with 'Routes'. Use 'Routes' instead.
    - Available packages and libraries:
      - The lucide-react package is installed for icons.
      - The recharts library is available for creating charts and graphs.
      - Use prebuilt components from the shadcn/ui library after importing them. Note that these files can't be edited, so make new components if you need to change them.
      - Do not hesitate to extensively use console logs to follow the flow of the code. This will be very helpful when debugging.
      - Do not include any tags like <CODE> <NEWFILE> <FILEPATH> in your response.
      - Make sure App.tsx points to the new features you've created.
    </guidelines>

    Here is the conversation history between you and the user:
      {% for msg in history %}
      {{ _.role(msg.role) }}
      {{ msg.content }}
      {% endfor %}

    {{ _.role("user") }}
    Given the following feedback: "{{ feedback }}"
  
    Edit my code based on the feedback to produce the desired feature or changes.
    Focus on the specific feedback, and don't make changes to existing codethat are not relevant to the feedback.
    Make sure you use the dependencies in the package.json to create the code changes, nothing else.
    Make sure you use ABSOLUTE FILE PATHS for the code files, not relative paths.
    Make sure the contents will render correctly inside of an iframe.

    {% for file in code_files %}
      <filepath> {{ file.path }} </filepath>
      <code>
      {{ file.content }}
      </code>
    {% endfor %}

    <package.json>
    {{ package_json }}
    </package.json>

    {{ ctx.output_format }}
    "#

}
test TestEditCode {
    functions [EditCode]
    args {
      history [
        {
          role "user"
          content "Make a dashboard with a table and a chart"
        },
        {
          role "assistant"
          content "I've created a dashboard with a table and a chart"
        },
      ]
    code_files [
      {
        path "src/index.js"
        content "const a = 1;"
      }
      {
        path "src/main_app.js"
        content "const b = 2;"
      }
    ]
    package_json "{ \"dependencies\": { \"react\": \"^18.2.0\", \"react-dom\": \"^18.2.0\" } }"
    feedback "Build a dashboard with a table and a chart"
  }
}