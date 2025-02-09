// "use server";

// import openai from "@/lib/openai";
// import { canUseAITools } from "@/lib/permissions";
// import { getUserSubscriptionLevel } from "@/lib/subscription";
// import {
//   GenerateSummaryInput,
//   generateSummarySchema,
//   GenerateWorkExperienceInput,
//   generateWorkExperienceSchema,
//   WorkExperience,
// } from "@/lib/validation";
// import { auth } from "@clerk/nextjs/server";

// export async function generateSummary(input: GenerateSummaryInput) {
//   const { userId } = await auth();

//   if (!userId) {
//     throw new Error("Unauthorized");
//   }

//   const subscriptionLevel = await getUserSubscriptionLevel(userId);

//   if (!canUseAITools(subscriptionLevel)) {
//     throw new Error("Upgrade your subscription to use this feature");
//   }

//   const { jobTitle, workExperiences, educations, skills } =
//     generateSummarySchema.parse(input);

//   const systemMessage = `
//     You are a job resume generator AI. Your task is to write a professional introduction summary for a resume given the user's provided data.
//     Only return the summary and do not include any other information in the response. Keep it concise and professional.
//     `;

//   const userMessage = `
//     Please generate a professional resume summary from this data:

//     Job title: ${jobTitle || "N/A"}

//     Work experience:
//     ${workExperiences
//       ?.map(
//         (exp) => `
//         Position: ${exp.position || "N/A"} at ${exp.company || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}

//         Description:
//         ${exp.description || "N/A"}
//         `,
//       )
//       .join("\n\n")}

//       Education:
//     ${educations
//       ?.map(
//         (edu) => `
//         Degree: ${edu.degree || "N/A"} at ${edu.school || "N/A"} from ${edu.startDate || "N/A"} to ${edu.endDate || "N/A"}
//         `,
//       )
//       .join("\n\n")}

//       Skills:
//       ${skills}
//     `;

//   console.log("systemMessage", systemMessage);
//   console.log("userMessage", userMessage);

//   const completion = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [
//       {
//         role: "system",
//         content: systemMessage,
//       },
//       {
//         role: "user",
//         content: userMessage,
//       },
//     ],
//   });

//   const aiResponse = completion.choices[0].message.content;

//   if (!aiResponse) {
//     throw new Error("Failed to generate AI response");
//   }

//   return aiResponse;
// }

// export async function generateWorkExperience(
//   input: GenerateWorkExperienceInput,
// ) {
//   const { userId } = await auth();

//   if (!userId) {
//     throw new Error("Unauthorized");
//   }

//   const subscriptionLevel = await getUserSubscriptionLevel(userId);

//   if (!canUseAITools(subscriptionLevel)) {
//     throw new Error("Upgrade your subscription to use this feature");
//   }

//   const { description } = generateWorkExperienceSchema.parse(input);

//   const systemMessage = `
//   You are a job resume generator AI. Your task is to generate a single work experience entry based on the user input.
//   Your response must adhere to the following structure. You can omit fields if they can't be inferred from the provided data, but don't add any new ones.

//   Job title: <job title>
//   Company: <company name>
//   Start date: <format: YYYY-MM-DD> (only if provided)
//   End date: <format: YYYY-MM-DD> (only if provided)
//   Description: <an optimized description in bullet format, might be inferred from the job title>
//   `;

//   const userMessage = `
//   Please provide a work experience entry from this description:
//   ${description}
//   `;

//   const completion = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [
//       {
//         role: "system",
//         content: systemMessage,
//       },
//       {
//         role: "user",
//         content: userMessage,
//       },
//     ],
//   });

//   const aiResponse = completion.choices[0].message.content;

//   if (!aiResponse) {
//     throw new Error("Failed to generate AI response");
//   }

//   console.log("aiResponse", aiResponse);

//   return {
//     position: aiResponse.match(/Job title: (.*)/)?.[1] || "",
//     company: aiResponse.match(/Company: (.*)/)?.[1] || "",
//     description: (aiResponse.match(/Description:([\s\S]*)/)?.[1] || "").trim(),
//     startDate: aiResponse.match(/Start date: (\d{4}-\d{2}-\d{2})/)?.[1],
//     endDate: aiResponse.match(/End date: (\d{4}-\d{2}-\d{2})/)?.[1],
//   } satisfies WorkExperience;
// }

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

// Initialize Gemini AI
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
    Please generate a professional resume summary from this data:

    You are a professional resume writer and career strategist specializing in ${jobTitle}. Using the provided data, craft a concise and impactful professional resume summary tailored for the role of ${jobTitle}.. Ensure the summary highlights key achievements, transferable skills, technical expertise, and leadership qualities. Focus on incorporating relevant keywords from the job description to make it ATS-friendly. Use power verbs, quantify impact with measurable results (e.g., numbers, percentages, or metrics), and emphasize soft skills, certifications, and problem-solving abilities where applicable. Keep the tone modern, professional, and results-oriented.

    Job title: ${jobTitle || "N/A"}

    Work experience:
    ${workExperiences
      ?.map(
        (exp) => `
        Position: ${exp.position || "N/A"} at ${exp.company || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}

        Description:
        ${exp.description || "N/A"}
        `,
      )
      .join("\n\n")}
    Projects:
    ${projects
      ?.map(
        (proj) => `
        Position: ${proj.ProjectName || "N/A"} at ${proj.toolsUsed || "N/A"} from ${proj.startDate || "N/A"} to ${proj.endDate || "Present"}

        Description:
        ${proj.description || "N/A"}
        `,
      )
      .join("\n\n")}
    Education:
    ${educations
      ?.map(
        (edu) => `
        Degree: ${edu.degree || "N/A"} at ${edu.school || "N/A"} from ${edu.startDate || "N/A"} to ${edu.endDate || "N/A"}
        `,
      )
      .join("\n\n")}

    Skills:
    ${skills}

    **Instructions:**
    1. Only return the professional summary—do not include any other sections or raw data in the response.
    2. Tailor the summary to align with the target role and industry, emphasizing adaptability, collaborative achievements, and strategic accomplishments.
    3. Ensure the summary is visually appealing, concise (no more than 4 sentences), and optimized for both human readers and applicant tracking systems (ATS).
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

  // const prompt = `
  // Generate a single work experience entry based on this description: "${description}"

  // Your response must follow this exact format, omitting fields if they can't be inferred from the data:

  // Job title: <job title>
  // Company: <company name>
  // Start date: <YYYY-MM-DD format, only if provided>
  // End date: <YYYY-MM-DD format, only if provided>
  // Description: <optimized description in bullet format>
  // `;
  //  Work Experience Prompt
  const prompt = `
  Generate a single work experience entry based on this description: "${description}"
  
  Your response must follow this exact format, omitting fields if they can't be inferred from the data:Job title: <job title>
  
  Company: <company name>
  Start date: <YYYY-MM-DD format, only if provided>
  End date: <YYYY-MM-DD format, only if provided>
  Description:
  - Accomplished X by implementing Y which led to Z.
  - Accomplished X by implementing Y which led to Z.
  - Accomplished X by implementing Y which led to Z.
  - Accomplished X by implementing Y which led to Z.
  
  - Accomplished X by implementing Y which led to Z.Instructions:
  
  1. Extract or infer the job title, company name, start date, and end date (if available) from the provided description.
  2. Rewrite the description into 5 concise bullet points using the "Accomplished X by implementing Y which led to Z" template.
  3. Focus on quantifiable achievements, technical skills, leadership qualities, and measurable outcomes where possible.
  4. If specific details like metrics, tools, or dates are not explicitly mentioned, make reasonable inferences based on common industry practices.
  5. Ensure the tone is professional, action-oriented, and optimized for both human readers and applicant tracking systems (ATS).
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
  Duration: <duration in months or years, only if provided>
  Description: <optimized description in bullet format>
  Instructions:
    1. Extract or infer the project name, role, and duration (if available) from the provided description.
    2. Write the description into 4-5 concise bullet points using the "Accomplished X by implementing Y which led to Z" template and also each line should be only of than 1 line.
    3. Focus on quantifiable achievements, technical skills, and measurable outcomes where possible.
    4. If specific details like metrics or tools are not explicitly mentioned, make reasonable inferences based on common industry practices.
    5. Ensure the tone is professional, action-oriented, and optimized for both human readers and applicant tracking systems (ATS).
  `;
  {
    /*
    const prompt = `
    Generate a single project experience entry based on this description: "${description}"

    Your response must follow this exact format, omitting fields if they can't be inferred from the data:

    Project name: <project name>
    Role: <your role in the project>
    Duration: <duration in months or years, only if provided>
    Description:
    Description:
  - Accomplished X by implementing Y which led to Z.
  - Accomplished X by implementing Y which led to Z.
  - Accomplished X by implementing Y which led to Z.
  - Accomplished X by implementing Y which led to Z.
  - Accomplished X by implementing Y which led to Z.
    <optimized description in  rounded bullet format>

    Instructions:
      1. Extract or infer the project name, role, and duration (if available) from the provided description.
      2. Rewrite the description into 5-6 concise bullet points using the "Accomplished X by implementing Y which led to Z" template.
      3. Focus on quantifiable achievements, technical skills, and measurable outcomes where possible.
      4. If specific details like metrics or tools are not explicitly mentioned, make reasonable inferences based on common industry practices.
      5. Ensure the tone is professional, action-oriented, and optimized for both human readers and applicant tracking systems (ATS).
    `; 
*/
  }

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
