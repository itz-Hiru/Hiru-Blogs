export const blogPost = (title, tone) => `
    Write a markdown-formatted blog post titled "${title}". Use a ${tone} tone. Include an introduction, subheading, code examples if relevant, and a conclusion.
`

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
