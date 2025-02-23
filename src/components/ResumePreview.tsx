import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { formatDate } from "date-fns";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Badge } from "./ui/badge";

import SortableSections, { Section } from "./SortableSections";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
}

export default function ResumePreview({
  resumeData,
  contentRef,
  className,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // const { width } = useDimensions(containerRef);
  const { width } = useDimensions(containerRef as React.RefObject<HTMLElement>);

  const sections: Section[] = [
    {
      id: "personal",
      component: <PersonalInfoHeader resumeData={resumeData} />,
    },
    { id: "summary", component: <SummarySection resumeData={resumeData} /> },
    {
      id: "work",
      component: <WorkExperienceSection resumeData={resumeData} />,
    },
    { id: "project", component: <ProjectSection resumeData={resumeData} /> },
    {
      id: "education",
      component: <EducationSection resumeData={resumeData} />,
    },
    { id: "skills", component: <SkillsSection resumeData={resumeData} /> },
  ];

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-black",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn("space-y-6 p-6", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        <PersonalInfoHeader resumeData={resumeData} />
        <SummarySection resumeData={resumeData} />
        <WorkExperienceSection resumeData={resumeData} />
        <ProjectSection resumeData={resumeData} />
        <EducationSection resumeData={resumeData} />
        <SkillsSection resumeData={resumeData} />
      </div>
    </div>
    // <div
    //   className={cn(
    //     "aspect-[210/297] h-fit w-full bg-white text-black",
    //     className,
    //   )}
    //   ref={containerRef}
    // >
    //   <div
    //     className={cn("space-y-6 p-6", !width && "invisible")}
    //     style={{ zoom: (1 / 794) * width }}
    //     ref={contentRef}
    //     id="resumePreviewContent"
    //   >
    //     <SortableSections sections={sections} />
    //   </div>
    // </div>
  );
}

interface ResumeSectionProps {
  resumeData: ResumeValues;
}

function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  const {
    photo,
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    phone,
    email,
    colorHex,
    borderStyle,
  } = resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="flex items-center gap-6">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={100}
          height={100}
          alt="Author photo"
          className="aspect-square object-cover"
          style={{
            borderRadius:
              borderStyle === BorderStyles.SQUARE
                ? "0px"
                : borderStyle === BorderStyles.CIRCLE
                  ? "9999px"
                  : "10%",
          }}
        />
      )}
      <div className="space-y-2.5">
        <div className="space-y-1">
          <p
            className="text-3xl font-bold"
            style={{
              color: colorHex,
            }}
          >
            {firstName} {lastName}
          </p>
          <p
            className="font-medium"
            style={{
              color: colorHex,
            }}
          >
            {jobTitle}
          </p>
        </div>
        <p className="text-xs text-gray-500">
          {city}
          {city && country ? ", " : ""}
          {country}
          {(city || country) && (phone || email) ? " • " : ""}
          {[
            phone && (
              <span
                key="phone"
                className="cursor-pointer text-blue-500 hover:underline"
                onClick={() => (window.location.href = `tel:${phone}`)}
              >
                {phone}
              </span>
            ),
            email && (
              <span
                key="email"
                className="cursor-pointer text-blue-500 hover:underline"
                onClick={() => (window.location.href = `mailto:${email}`)}
              >
                {email}
              </span>
            ),
          ]
            .filter(Boolean)
            .map((item, index, array) => (
              <span key={index}>
                {item}
                {index < array.length - 1 ? " • " : null}
              </span>
            ))}
        </p>
      </div>
    </div>
  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary, colorHex } = resumeData;

  if (!summary) return null;

  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="break-inside-avoid space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Summary
        </p>
        <div className="whitespace-pre-line text-sm">{summary}</div>
      </div>
    </>
  );
}

// function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
//   const { workExperiences, colorHex } = resumeData;

//   const workExperiencesNotEmpty = workExperiences?.filter(
//     (exp) => Object.values(exp).filter(Boolean).length > 0,
//   );

//   if (!workExperiencesNotEmpty?.length) return null;

//   return (
//     <>
//       <hr
//         className="border-2"
//         style={{
//           borderColor: colorHex,
//         }}
//       />
//       <div className="space-y-3">
//         <p
//           className="text-lg font-semibold"
//           style={{
//             color: colorHex,
//           }}
//         >
//           Work experience
//         </p>
//         {workExperiencesNotEmpty.map((exp, index) => (
//           <div key={index} className="break-inside-avoid space-y-1">
//             <div
//               className="flex items-center justify-between text-sm font-semibold"
//               style={{
//                 color: colorHex,
//               }}
//             >
//               <span>{exp.position}</span>
//               {exp.startDate && (
//                 <span>
//                   {formatDate(exp.startDate, "MM/yyyy")} -{" "}
//                   {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
//                 </span>
//               )}
//             </div>
//             <div className="flex justify-between">
//               <p className="text-xs font-semibold">{exp.company}</p>
//               <p className="text-xs font-light">{exp.locationType}</p>
//             </div>
//             <div className="whitespace-pre-line text-xs">{exp.description}</div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// function ProjectSection({ resumeData }: ResumeSectionProps) {
//   const { projects, colorHex } = resumeData;

//   const projectsNotEmpty = projects?.filter(
//     (proj) => Object.values(proj).filter(Boolean).length > 0,
//   );

//   if (!projectsNotEmpty?.length) return null;

//   return (
//     <>
//       <hr
//         className="border-2"
//         style={{
//           borderColor: colorHex,
//         }}
//       />
//       <div className="space-y-3">
//         <p
//           className="text-lg font-semibold"
//           style={{
//             color: colorHex,
//           }}
//         >
//           Projects
//         </p>
//         {projectsNotEmpty.map((proj, index) => (
//           <div key={index} className="break-inside-avoid space-y-1">
//             <div
//               className="flex items-center justify-between text-sm font-semibold"
//               style={{
//                 color: colorHex,
//               }}
//             >
//               <span>{proj.ProjectName}</span>
//               {proj.startDate && (
//                 <span>
//                   {formatDate(proj.startDate, "MM/yyyy")} -{" "}
//                   {proj.endDate
//                     ? formatDate(proj.endDate, "MM/yyyy")
//                     : "Present"}
//                 </span>
//               )}
//             </div>
//             <p className="text-xs font-semibold">{proj.toolsUsed}</p>
//             <div className="whitespace-pre-line text-xs">
//               {proj.description}
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences, colorHex } = resumeData;

  const workExperiencesNotEmpty = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0,
  );

  if (!workExperiencesNotEmpty?.length) return null;

  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Work experience
        </p>
        {workExperiencesNotEmpty.map((exp, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div
              className="flex items-center justify-between text-sm font-semibold"
              style={{
                color: colorHex,
              }}
            >
              <span>{exp.position}</span>
              {exp.startDate && (
                <span>
                  {formatDate(exp.startDate, "MM/yyyy")} -{" "}
                  {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
                </span>
              )}
            </div>
            <div className="flex justify-between">
              <p className="text-xs font-semibold">{exp.company}</p>
              <p className="text-xs font-light">{exp.locationType}</p>
            </div>
            {/* Use dangerouslySetInnerHTML to render HTML from Rich Text Editor */}
            <div
              className="whitespace-pre-line text-xs"
              dangerouslySetInnerHTML={{ __html: exp.description || "" }}
            />
          </div>
        ))}
      </div>
    </>
  );
}

function ProjectSection({ resumeData }: ResumeSectionProps) {
  const { projects, colorHex } = resumeData;

  const projectsNotEmpty = projects?.filter(
    (proj) => Object.values(proj).filter(Boolean).length > 0,
  );

  if (!projectsNotEmpty?.length) return null;

  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Projects
        </p>
        {projectsNotEmpty.map((proj, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div
              className="flex items-center justify-between text-sm font-semibold"
              style={{
                color: colorHex,
              }}
            >
              <span>{proj.ProjectName}</span>
              {proj.startDate && (
                <span>
                  {formatDate(proj.startDate, "MM/yyyy")} -{" "}
                  {proj.endDate
                    ? formatDate(proj.endDate, "MM/yyyy")
                    : "Present"}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{proj.toolsUsed}</p>
            {/* Render project description as HTML */}
            <div
              className="whitespace-pre-line text-xs"
              dangerouslySetInnerHTML={{ __html: proj.description || "" }}
            />
          </div>
        ))}
      </div>
    </>
  );
}

function EducationSection({ resumeData }: ResumeSectionProps) {
  const { educations, colorHex } = resumeData;

  const educationsNotEmpty = educations?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0,
  );

  if (!educationsNotEmpty?.length) return null;

  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Education
        </p>
        {educationsNotEmpty.map((edu, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div
              className="flex items-center justify-between text-sm font-semibold"
              style={{
                color: colorHex,
              }}
            >
              <span>{edu.degree}</span>
              {edu.startDate && (
                <span>
                  {edu.startDate &&
                    `${formatDate(edu.startDate, "MM/yyyy")} ${edu.endDate ? `- ${formatDate(edu.endDate, "MM/yyyy")}` : ""}`}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{edu.school}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills, colorHex, borderStyle } = resumeData;

  if (!skills?.length) return null;

  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="break-inside-avoid space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Skills
        </p>
        <div className="flex break-inside-avoid flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              className="rounded-sm bg-black text-white hover:bg-black"
              style={{
                backgroundColor: colorHex,
                borderRadius:
                  borderStyle === BorderStyles.SQUARE
                    ? "0px"
                    : borderStyle === BorderStyles.CIRCLE
                      ? "9999px"
                      : "8px",
              }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}
