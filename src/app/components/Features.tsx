import { CheckCircle, Zap, Users, TrendingUp } from "lucide-react";

const features = [
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: "Task Management",
    description: "Organize and prioritize tasks with ease.",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Real-time Collaboration",
    description: "Work together seamlessly in real-time.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Team Communication",
    description: "Stay connected with built-in messaging.",
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: "Analytics Dashboard",
    description: "Track progress and gain insights with powerful analytics.",
  },
];

export default function Features() {
  return (
    <section className="features bg-gray-50 py-20" id="features">
      <div className="container mx-auto">
        <h2 className="mb-12 text-center text-3xl font-bold">Key Features</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
