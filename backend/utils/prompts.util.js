export const blogPost = (title, tone) => `
    Write a markdown-formatted, long-form creative blog post titled "${title}" in a ${tone} tone.

    ### Structure & Requirements:
        1. **Start** with a strong, engaging introduction.
        2. Include at least one **subheading** using appropriate markdown heading levels.
        3. Use **code examples** only if the topic is related to programming or software engineering.
        4. If images are relevant to the topic:
        - Include them in markdown format: "![alt text](valid-image-url)"
        - Use **real, valid, working image URLs**. Double-check that the images render properly in browsers.
        - Do **NOT** use placeholders like "example.com" or links that return 404.
        - If you cannot find a valid image URL, **omit the image entirely** — do not include broken links.
        5. End with a compelling conclusion.

    ### Formatting Rules:
        - Use clear markdown for lists, bold text, italic text, code, links, etc.
        - The entire blog post must render properly using GitHub Flavored Markdown (GFM).
        - Return only the markdown content — no explanations, comments, or invalid content.

    ### Important:
        - For **non-tech topics**, avoid code and focus on visual storytelling using **images**.
        - For **tech or programming topics**, use code blocks, diagrams, and links to explain.
        - Every image included must come from a **valid, publicly accessible URL** 
        - **Important: Image link should finish with valid image type eg: .jpg, .png, .jpeg.**
        - **Important: Use pexels.com for get images**
        - **Important: Blog post should be minimum 400-500 words upto 1000 or more words.**

    Goal: Output a blog post that is visually engaging, correctly structured, and fully functional when rendered in a markdown viewer or parser.
`;

export const blogPostIdeasPrompt = (topic) => `
    Generate a list of 5 blog post ideas related to topic ${topic}.
    
    For each blog post idea, return: 
        - a title
        - a 2 line description about the post
        - 3 relevant tags
        - the tone (e.g., technical, casual, beginner-friendly, etc.)
    
    Return the result as array of JSON objects in this format:
        [
            {
                "title": "",
                "description": "",
                "tags": ["", "", ""],
                "tone": ""
            }
        ]
            
    Important: Do NOT add any extra text outside the JSON format. Only return valid JSON.
`;

export function generateReplyPrompt(comment) {
  const authorName = comment.author?.name || "User";
  const content = comment.content;

  return `
        You are replying to a blog post comment by ${authorName}. The comment says:
        "${content}"
        
        Please write thoughtful, concise, and relevant reply to this comment.
    `;
}

export const blogSummaryPrompt = (blogContent) => `
    You are an AI assistant that summarize blog posts.
    
    Instructions:
        - Read the below blog post content carefuly.
        - Generate a short, eye catching, SEO-Friendly title (max 12 words).
        - Write a clear, engaging summary of about 300 words.
        - At the end of the summary, add a markdown section titled **## What you'll learn**.
        - Under that heading, list 3 - 5 key takeaways or skills the reader will learn in **bullet points** using markdown (\'-\').
    
    Return the result in **Valid JSON** with the following structure:
        {
            "title": "Short SEO-Friendly title",
            "summary": "300 words summary with markdown section for what you will learn"
        }
        
    Important: Only return valid JSON. Do NOT include markdown or code blocks around the JSON
    
    Blog Post Content: ${blogContent}
`;
