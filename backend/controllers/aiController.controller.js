import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";
import {
  blogPost,
  blogPostIdeasPrompt,
  generateReplyPrompt,
  blogSummaryPrompt,
} from "../utils/prompts.util.js";

if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is not defined in environment variables");
  throw new Error("GEMINI_API_KEY is required");
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Description => Generate blog post
// Route       => POST /api/ai/generate/post
// Access      => Private
export const generateBlogPost = async (req, res) => {
  try {
    const { title, tone } = req.body;

    // Check if require fields are not empty
    if (!title || !tone) {
      res.status(400).json({ message: "Missing Required Fields" });
    }

    const prompt = blogPost(title, tone);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    let rawText = response.text;

    res.status(200).json(rawText);
  } catch (error) {
    res.status(500).json({ message: "Serer Error", error: error.message });
  }
};

// Description => Generate blog post ideas
// Route       => POST /api/ai/generate/ideas
// Access      => Private
export const generateBlogPostIdeas = async (req, res) => {
  try {
    const { topics } = req.body;

    // Check if require fields are not empty
    if (!topics) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = blogPostIdeasPrompt(topics);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    const rawText = response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Clean JSON(Remove
    const cleanedText = rawText
      .replace(/^```json\s*/, "") // Clean starting
      .replace(/```$/, "") // Clean ending
      .trim(); // Remove extra spaces

    // Parse
    const data = JSON.parse(cleanedText);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Serer Error", error: error.message });
  }
};

// Description => Generate reply for a comment
// Route       => POST /api/ai/generate/reply
// Access      => Private
export const generateCommentReply = async (req, res) => {
  try {
    const { author, content } = req.body;

    // Check missing input fields
    if (!content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = generateReplyPrompt({ author, content });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    let rawText = response.text;
    res.status(200).json(rawText);
  } catch (error) {
    res.status(500).json({ message: "Serer Error", error: error.message });
  }
};

// Description => Generate Post Summary
// Route       => POST /api/ai/generate/summary
// Access      => Public
export const generatePostSummary = async (req, res) => {
  try {
    const { content } = req.body;

    // Check missing input fields
    if (!content) {
        return res.status(400).json({ message: "Missing required fields" })
    }

    const prompt = blogSummaryPrompt(content);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    const rawText = response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Clean JSON(Remove
    const cleanedText = rawText
      .replace(/^```json\s*/, "") // Clean starting
      .replace(/```$/, "") // Clean ending
      .trim(); // Remove extra spaces

    // Parse
    const data = JSON.parse(cleanedText);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Serer Error", error: error.message });
  }
};
