"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { canUseAITools } from "@/lib/permissions";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import {
  GenerateSummaryInput,
  generateSummarySchema,
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
  WorkExperience,
} from "@/lib/validation";
import {
  GenerateProjectExperienceInput,
  generateProjectExperienceSchema,
  Project,
} from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import { env } from "@/env";

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  // model: "gemini-pro",
  model: "gemini-2.0-flash-exp",
  generationConfig: {
    temperature: 0.7,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
  },
});

export async function generateSummary(input: GenerateSummaryInput) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  if (!canUseAITools(subscriptionLevel)) {
    throw new Error("Upgrade your subscription to use this feature");
  }

  const { jobTitle, workExperiences, projects, educations, skills } =
    generateSummarySchema.parse(input);

  // Summary Prompt
  const prompt = `
  Generate a highly optimized ATS-friendly professional resume summary following these guidelines:
  
  Role: Professional Resume Writer and Career Strategist specializing in ${jobTitle}
  
  Input Data:
  Job Title: ${jobTitle || "N/A"}
  
  Work Experience:
  ${workExperiences
    ?.map(
      (exp) => `
  Position: ${exp.position || "N/A"} at ${exp.company || "N/A"}
  Duration: ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}
  Description: ${exp.description || "N/A"}
  `,
    )
    .join("\n\n")}
  
  Projects:
  ${projects
    ?.map(
      (proj) => `
  Name: ${proj.ProjectName || "N/A"}
  Tech Stack: ${proj.toolsUsed || "N/A"}
  Duration: ${proj.startDate || "N/A"} to ${proj.endDate || "Present"}
  Details: ${proj.description || "N/A"}
  `,
    )
    .join("\n\n")}
  
  Education:
  ${educations
    ?.map(
      (edu) => `
  ${edu.degree || "N/A"} - ${edu.school || "N/A"}
  Period: ${edu.startDate || "N/A"} to ${edu.endDate || "N/A"}
  `,
    )
    .join("\n\n")}
  
  Core Competencies:
  ${skills}
  
  Summary Generation Instructions:
  
  1. Format Requirements:
     - Length: 3-4 impactful sentences
     - Structure: Problem-solving capabilities → Technical expertise → Achievements → Career goals
     - Style: Modern, confident, and results-driven
  
  2. Essential Components:
     - Professional title aligned with target role
     - Years of relevant experience
     - Core technical competencies
     - Notable achievements with metrics
     - Industry-specific keywords
     - Leadership and soft skills
  
  3. ATS Optimization:
     - Include exact job title "${jobTitle}" in first sentence
     - Incorporate major technologies from skills section
     - Use industry-standard terminology
     - Include relevant certifications
     - Match keywords from common job descriptions
     - Avoid graphics, special characters, or complex formatting
  
  4. Key Metrics to Include:
     - Years of experience
     - Team sizes managed
     - Project scopes
     - Success metrics (%, $, time)
     - Impact on business outcomes
  
  5. Power Words to Use:
     - Technical: architected, developed, engineered, implemented
     - Leadership: spearheaded, led, managed, directed
     - Achievement: delivered, improved, optimized, transformed
     - Innovation: pioneered, innovated, revolutionized
  
  6. Required Elements:
     - Current career level
     - Primary technical expertise
     - Major achievements
     - Leadership experience (if applicable)
     - Industry focus
     - Career objective aligned with role
  
  Output Format:
  Return only the optimized professional summary paragraph without any additional formatting or sections.
  Ensure the summary flows naturally while maintaining keyword density for ATS systems.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error("Failed to generate AI response");
    }

    return text;
  } catch (error) {
    console.error("Error generating summary:", error);
    throw new Error("Failed to generate summary");
  }
}

export async function generateWorkExperience(
  input: GenerateWorkExperienceInput,
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  if (!canUseAITools(subscriptionLevel)) {
    throw new Error("Upgrade your subscription to use this feature");
  }

  const { description } = generateWorkExperienceSchema.parse(input);

  //  Work Experience Prompt
  const prompt = `
  Generate a single work experience entry based on this description: "${description}"
  
  Your response must follow this exact format:
  
  Job title: <Use industry-standard job title that aligns with target roles>
  
  Company: <company name>
  Start date: <YYYY-MM-DD format>
  End date: <YYYY-MM-DD format or "Present">
  Industry: <Specify industry sector>
  Technologies: <List all relevant technologies, tools, and platforms>
  
  Description:
  [Create 5 achievement-based bullet points following the enhanced STAR method:]
  
  • [Action Verb] [Technical Achievement] by [Implementation Method] resulting in [Quantifiable Business Impact]
  Example format:
  - Increased [metric] by [X%] through implementation of [specific technology/method]
  - Reduced [pain point] by [X%] by developing [specific solution]
  - Streamlined [process] using [tools/technologies] leading to [measurable outcome]
  - Led [project/initiative] utilizing [skills/technologies] achieving [specific results]
  - Architected [solution] implementing [technologies] resulting in [business impact]
  
  Instructions:
  
  1. Job Title Optimization:
     - Use industry-standard titles
     - Include level (Senior, Lead, etc.)
     - Add key technology if relevant (e.g., "Senior React Developer")
  
  2. Technical Skills Integration:
     - List all technologies used
     - Include methodologies (Agile, Scrum)
     - Specify versions of key technologies
     - Mention relevant certifications
  
  3. Achievement Formatting:
     - Start with power verbs (Engineered, Developed, Implemented)
     - Include numerical metrics (%, $, time)
     - Specify scale (team size, project scope)
     - Mention direct business impact
  
  4. Key Metrics Focus:
     - Performance improvements
     - Cost savings
     - Time reduction
     - Revenue impact
     - User/customer metrics
  
  5. ATS Keywords:
     - Include industry-specific terminology
     - Add relevant technical skills
     - Mention popular frameworks/tools
     - Use standardized abbreviations (AWS, API, CI/CD)
  
  6. Required Elements:
     - Team size/leadership aspects
     - Project scope/scale
     - Technical environment
     - Business context
     - Stakeholder management
  
  Format each bullet point to be clear, concise, and impactful, focusing on both technical expertise and business value.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiResponse = response.text();

    if (!aiResponse) {
      throw new Error("Failed to generate AI response");
    }

    return {
      position: aiResponse.match(/Job title: (.*)/)?.[1] || "",
      company: aiResponse.match(/Company: (.*)/)?.[1] || "",
      description: (
        aiResponse.match(/Description:([\s\S]*)/)?.[1] || ""
      ).trim(),
      startDate: aiResponse.match(/Start date: (\d{4}-\d{2}-\d{2})/)?.[1],
      endDate: aiResponse.match(/End date: (\d{4}-\d{2}-\d{2})/)?.[1],
    } satisfies WorkExperience;
  } catch (error) {
    console.error("Error generating work experience:", error);
    throw new Error("Failed to generate work experience");
  }
}

export async function generateProject(input: GenerateProjectExperienceInput) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  if (!canUseAITools(subscriptionLevel)) {
    throw new Error("Upgrade your subscription to use this feature");
  }

  const { description } = generateProjectExperienceSchema.parse(input);

  // Project Prompt
  const prompt = `
  Generate a single project experience entry based on this description: "${description}"
  
  Your response must follow this exact format, omitting fields if they can't be inferred from the data:
  
  Project name: <project name>
  Role: <your role in the project>
  Technologies: <list of technologies, frameworks, and tools used>
  Duration: <duration in months or years, only if provided>
  Description: <optimized description in bullet format>
  
  Instructions:
    1. Extract or infer the project name, role, technologies, and duration from the provided description.
    2. For the description, create 4-5 impactful bullet points following this enhanced format:
       - Led/Developed/Implemented [specific action] utilizing [technologies] to [achieve specific outcome], resulting in [quantifiable impact]
       - Each bullet point should highlight technical skills, problem-solving abilities, and measurable results
       - Keep each bullet point concise and limited to one line
    3. Incorporate relevant technical keywords and industry-standard terminology
    4. Emphasize:
       - Technical skills and tools used
       - Problem-solving methodologies
       - Performance improvements
       - Impact on business/user metrics
       - Team collaboration and leadership aspects
    5. Use strong action verbs at the beginning of each bullet point (e.g., Engineered, Architected, Optimized, Streamlined)
    6. Include specific metrics where possible (%, numbers, time saved, performance improvements)
    7. Ensure all content is scannable by ATS systems by using standard terminology
    8. Maintain professional tone while focusing on technical achievements and results
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiResponse = response.text();

    if (!aiResponse) {
      throw new Error("Failed to generate AI response");
    }

    return {
      ProjectName: aiResponse.match(/Project name: (.*)/)?.[1] || "",
      toolsUsed: aiResponse.match(/toolsUsed: (.*)/)?.[1] || "",
      startDate: aiResponse.match(/Duration: (.*)/)?.[1] || "",
      endDate: aiResponse.match(/Duration: (.*)/)?.[1] || "",
      description: (
        aiResponse.match(/Description:([\s\S]*)/)?.[1] || ""
      ).trim(),
    } satisfies Project;
  } catch (error) {
    console.error("Error generating project experience:", error);
    throw new Error("Failed to generate project experience");
  }
}
